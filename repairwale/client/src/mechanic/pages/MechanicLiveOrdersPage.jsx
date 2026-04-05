import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/components/Button'
import { useAuth } from '../../shared/context/AuthContext'
import { showError, showSuccess } from '../../shared/services/toast'
import { getMechanic } from '../../shared/services/roleData'
import { acceptMechanicRequest, getMechanicRequests, rejectMechanicRequest } from '../../shared/services/api'
import { connectRealtimeWithFallback } from '../../shared/services/realtime'
import { getMechanicNearbyRequests } from '../data/mechanicDemoData'

const DEMO_MODE_KEY = 'rw_demo_mode'
const DEMO_REQUESTS_KEY = 'rw_demo_mechanic_requests'
const CURRENT_JOB_KEY = 'rw_mechanic_current_job'

function buildMapsUrl(locationText) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText || '')}`
}

function readDemoRequests(mechanicId) {
  try {
    const raw = localStorage.getItem(DEMO_REQUESTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch {}

  const seeded = getMechanicNearbyRequests(mechanicId)
  try {
    localStorage.setItem(DEMO_REQUESTS_KEY, JSON.stringify(seeded))
  } catch {}
  return seeded
}

function writeDemoRequests(requests) {
  try {
    localStorage.setItem(DEMO_REQUESTS_KEY, JSON.stringify(requests))
  } catch {}
}

function setCurrentJob(job) {
  try {
    localStorage.setItem(CURRENT_JOB_KEY, JSON.stringify(job))
  } catch {}
}

function toMinutesAgo(timestamp) {
  if (!timestamp) return 'now'
  const mins = Math.max(1, Math.floor((Date.now() - timestamp) / 60000))
  return `${mins} min ago`
}

export default function MechanicLiveOrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [mechanicId, setMechanicId] = useState('m1')
  const [requests, setRequests] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  const isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'mechanic'

  useEffect(() => {
    const data = getMechanic()
    const storedId = localStorage.getItem('rw_mechanic_id')
    const resolvedId = data?.id || storedId || 'm1'
    setMechanicId(resolvedId)
    localStorage.setItem('rw_mechanic_id', resolvedId)

    const init = async () => {
      await loadRequests(resolvedId, isDemoMode)
      if (isDemoMode) {
        const seeded = readDemoRequests(resolvedId)
        setRequests(seeded)
        if (!selectedId && seeded[0]) setSelectedId(seeded[0].id)
      }
    }

    init()

    const realtime = connectRealtimeWithFallback({
      onConnect: (socket) => {
        socket.emit('dispatch:join', { role: 'mechanic', id: resolvedId })

        socket.on('dispatch:new-request', (request) => {
          setRequests((prev) => {
            const exists = prev.some((item) => item.id === request.id)
            const next = exists
              ? prev.map((item) => (item.id === request.id ? { ...item, ...request } : item))
              : [request, ...prev]
            return next
          })
          setSelectedId((prev) => prev || request.id)
          showSuccess('New nearby order available')
        })

        socket.on('dispatch:expired', (request) => {
          setRequests((prev) => prev.filter((item) => item.id !== request.id))
        })

        socket.on('dispatch:accepted', (request) => {
          setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, status: 'active' } : item)))
        })
      }
    })

    return () => {
      realtime.disconnect()
    }
  }, [])

  const loadRequests = async (id = mechanicId, allowDemoFallback = false) => {
    setLoading(true)
    try {
      const response = await getMechanicRequests(id)
      if (response?.ok && Array.isArray(response.requests)) {
        const nearby = response.requests.filter((req) => ['pending', 'active', 'accepted'].includes(req.status))
        setRequests(nearby)
        if (nearby[0]) {
          setSelectedId((prev) => prev || nearby[0].id)
        }
        if (allowDemoFallback) {
          writeDemoRequests(response.requests)
        }
      } else if (allowDemoFallback) {
        const fallback = readDemoRequests(id)
        setRequests(fallback)
        if (fallback[0]) setSelectedId((prev) => prev || fallback[0].id)
      }
    } catch (error) {
      if (allowDemoFallback) {
        const fallback = readDemoRequests(id)
        setRequests(fallback)
        if (fallback[0]) setSelectedId((prev) => prev || fallback[0].id)
      } else {
        showError(error?.message || 'Unable to load nearby orders')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      const selectedRequest = requests.find((request) => request.id === requestId)
      if (!selectedRequest) return

      if (isDemoMode) {
        const nextRequests = readDemoRequests(mechanicId).map((request) => (
          request.id === requestId
            ? {
                ...request,
                status: 'active',
                acceptedAt: Date.now(),
                assignedMechanicName: user?.fullName || 'Demo Mechanic',
                workflowStage: 'travel_to_customer',
                progress: 25,
                progressUpdatedAt: Date.now()
              }
            : request
        ))

        writeDemoRequests(nextRequests)
        setRequests(nextRequests)
        setCurrentJob({
          ...selectedRequest,
          status: 'active',
          acceptedAt: Date.now(),
          assignedMechanicName: user?.fullName || 'Demo Mechanic',
          workflowStage: 'travel_to_customer',
          progress: 25,
          progressUpdatedAt: Date.now()
        })

        showSuccess('Order accepted. Start navigation to customer.')
        navigate(`/mechanic/job/${requestId}`, { state: { request: selectedRequest } })
        return
      }

      const response = await acceptMechanicRequest(mechanicId, requestId)
      if (!response?.ok) {
        showError(response?.error || 'Could not accept request')
        return
      }

      setCurrentJob({
        ...selectedRequest,
        status: 'active',
        acceptedAt: Date.now(),
        assignedMechanicName: user?.fullName || 'Mechanic',
        workflowStage: 'travel_to_customer',
        progress: 25,
        progressUpdatedAt: Date.now()
      })

      showSuccess('Order accepted. Start navigation to customer.')
      navigate(`/mechanic/job/${requestId}`, { state: { request: selectedRequest } })
    } catch (error) {
      showError(error?.message || 'Could not accept request')
    }
  }

  const handleDeclineRequest = async (requestId) => {
    try {
      if (isDemoMode) {
        const nextRequests = readDemoRequests(mechanicId).filter((request) => request.id !== requestId)
        writeDemoRequests(nextRequests)
        setRequests(nextRequests)
        if (selectedId === requestId) {
          setSelectedId(nextRequests[0]?.id || null)
        }
        showSuccess('Order declined')
        return
      }

      const response = await rejectMechanicRequest(mechanicId, requestId)
      if (!response?.ok) {
        showError(response?.error || 'Could not decline request')
        return
      }

      const nextRequests = requests.filter((request) => request.id !== requestId)
      setRequests(nextRequests)
      if (selectedId === requestId) {
        setSelectedId(nextRequests[0]?.id || null)
      }
      showSuccess('Order declined')
    } catch (error) {
      showError(error?.message || 'Could not decline request')
    }
  }

  const pendingOrders = useMemo(() => requests.filter((request) => request.status === 'pending'), [requests])

  const selectedOrder = useMemo(
    () => requests.find((request) => request.id === selectedId) || pendingOrders[0] || requests[0] || null,
    [requests, pendingOrders, selectedId]
  )

  const summary = useMemo(() => {
    const pendingCount = pendingOrders.length
    const avgEta = pendingCount
      ? Math.round(
          pendingOrders.reduce((sum, request) => sum + Number(request.etaMinutes || 0), 0) / pendingCount
        )
      : 0

    return {
      total: requests.length,
      pendingCount,
      avgEta
    }
  }, [requests, pendingOrders])

  return (
    <div className="mechanic-live-orders-page">
      <style>{styles}</style>
      <div className="live-orders-shell">
        <div className="live-orders-topbar">
          <div>
            <div className="live-orders-eyebrow">Mechanic Orders</div>
            <h1 className="live-orders-title">Nearby Real-Time Orders</h1>
            <p className="live-orders-text">Review request details, open customer location in maps, then accept or decline.</p>
          </div>
          <div className="live-orders-actions">
            <Button variant="ghost" onClick={() => navigate('/mechanic/dashboard')}>Dashboard</Button>
            <Button variant="ghost" onClick={() => navigate('/mechanic/order-history')}>Order History</Button>
            <Button variant="ghost" onClick={() => loadRequests(mechanicId, isDemoMode)}>{loading ? 'Refreshing...' : 'Refresh'}</Button>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Total Nearby</div>
            <div className="summary-value">{summary.total}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Pending</div>
            <div className="summary-value">{summary.pendingCount}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Average ETA</div>
            <div className="summary-value">{summary.avgEta} min</div>
          </div>
        </div>

        <div className="orders-layout-grid">
          <section className="orders-list-panel">
            <div className="panel-title">Live Requests</div>
            {loading && requests.length === 0 && <div className="empty-text">Loading nearby jobs...</div>}
            {!loading && requests.length === 0 && <div className="empty-text">No nearby orders right now. Keep this page open for real-time updates.</div>}

            <div className="orders-list">
              {requests.map((request) => {
                const isSelected = selectedOrder?.id === request.id
                return (
                  <button
                    key={request.id}
                    type="button"
                    className={`order-item ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setSelectedId(request.id)}
                  >
                    <div className="order-item-head">
                      <div>
                        <div className="order-customer">{request.customerName || 'Customer'}</div>
                        <div className="order-id">{request.id}</div>
                      </div>
                      <div className={`order-status status-${request.status || 'pending'}`}>{(request.status || 'pending').toUpperCase()}</div>
                    </div>
                    <div className="order-item-meta">{request.location || 'Location unavailable'}</div>
                    <div className="order-item-meta">{request.distance || `${request.distanceKm || 0} km`} • {request.etaMinutes || 0} min ETA • {toMinutesAgo(request.createdAt)}</div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="order-detail-panel">
            {!selectedOrder ? (
              <div className="empty-text">Select an order to view details.</div>
            ) : (
              <>
                <div className="panel-title">Order Details</div>
                <div className="detail-grid">
                  <div className="detail-row"><span>Request ID</span><strong>{selectedOrder.id}</strong></div>
                  <div className="detail-row"><span>Customer</span><strong>{selectedOrder.customerName || 'Not available'}</strong></div>
                  <div className="detail-row"><span>Phone</span><strong>{selectedOrder.customerPhone || 'Not shared'}</strong></div>
                  <div className="detail-row"><span>Vehicle</span><strong>{selectedOrder.vehicle || 'Car/Bike'}</strong></div>
                  <div className="detail-row"><span>Issue</span><strong>{selectedOrder.problem || 'Not provided'}</strong></div>
                  <div className="detail-row"><span>Location</span><strong>{selectedOrder.location || 'Not available'}</strong></div>
                  <div className="detail-row"><span>Distance</span><strong>{selectedOrder.distance || `${selectedOrder.distanceKm || 0} km`}</strong></div>
                  <div className="detail-row"><span>Estimated Payout</span><strong>₹ {Number(selectedOrder.price || selectedOrder.amount || 0).toLocaleString('en-IN')}</strong></div>
                </div>

                <div className="map-frame-wrap">
                  <iframe
                    title="Order location map"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedOrder.location || 'Bengaluru')}&output=embed`}
                    className="map-frame"
                    loading="lazy"
                  />
                </div>

                <div className="detail-actions">
                  <Button variant="ghost" onClick={() => window.open(buildMapsUrl(selectedOrder.location), '_blank', 'noopener,noreferrer')}>
                    Open in Maps
                  </Button>
                  <Button variant="ghost" onClick={() => handleDeclineRequest(selectedOrder.id)}>Decline</Button>
                  <Button onClick={() => handleAcceptRequest(selectedOrder.id)}>Accept Job</Button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

const styles = `
.mechanic-live-orders-page {
  min-height: 100vh;
  background: #0b1220;
  color: #e2e8f0;
  padding: 20px;
}

.live-orders-shell {
  max-width: 1220px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.live-orders-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.live-orders-eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.live-orders-title {
  margin: 4px 0 6px;
  font-size: 30px;
}

.live-orders-text {
  margin: 0;
  color: #94a3b8;
}

.live-orders-actions,
.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.summary-card {
  background: #0f172a;
  border: 1px solid #233248;
  padding: 14px;
  display: grid;
  gap: 6px;
}

.summary-label {
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
}

.orders-layout-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.3fr;
  gap: 16px;
}

.orders-list-panel,
.order-detail-panel {
  background: #0f172a;
  border: 1px solid #233248;
  padding: 16px;
  display: grid;
  align-content: start;
  gap: 12px;
}

.panel-title {
  font-size: 14px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.orders-list {
  display: grid;
  gap: 10px;
}

.order-item {
  border: 1px solid #233248;
  background: #111c30;
  color: #e2e8f0;
  text-align: left;
  padding: 12px;
  display: grid;
  gap: 6px;
  cursor: pointer;
}

.order-item.is-selected {
  border-color: #22c55e;
  background: #10261d;
}

.order-item-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.order-customer {
  font-size: 16px;
  font-weight: 700;
}

.order-id,
.order-item-meta {
  font-size: 12px;
  color: #94a3b8;
}

.order-status {
  font-size: 11px;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.status-pending {
  color: #facc15;
}

.status-active,
.status-accepted {
  color: #86efac;
}

.detail-grid {
  display: grid;
  gap: 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-top: 1px solid #233248;
  font-size: 13px;
}

.detail-row:first-child {
  border-top: 0;
}

.detail-row span {
  color: #94a3b8;
}

.detail-row strong {
  text-align: right;
}

.map-frame-wrap {
  border: 1px solid #233248;
  min-height: 180px;
}

.map-frame {
  width: 100%;
  min-height: 180px;
  border: 0;
}

.empty-text {
  color: #94a3b8;
  font-size: 14px;
}

@media (max-width: 980px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .orders-layout-grid {
    grid-template-columns: 1fr;
  }
}
`;
