import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import LiveGPSTracker from '../components/LiveGPSTracker'
import TrackingSimulator from '../../shared/components/TrackingSimulator'
import { getCustomerDispatchStatus } from '../../shared/services/api'
import { connectRealtimeWithFallback } from '../../shared/services/realtime'

function formatTime(date) {
  if (!date) return '--:--'
  try {
    return new Date(date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return '--:--'
  }
}

function formatDate(date) {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return date
  }
}

function formatCoords(location) {
  if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') return 'Location unavailable'
  return `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
}

export default function ServiceTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [order, setOrder] = useState(null)
  const [tracking, setTracking] = useState(null)
  const [demoStatus, setDemoStatus] = useState('')
  const [demoLocation, setDemoLocation] = useState(null)
  const [demoMechanic, setDemoMechanic] = useState(null)
  const [demoAcceptedAt, setDemoAcceptedAt] = useState(null)
  const [demoFlowStatus, setDemoFlowStatus] = useState('')
  const [userLiveLocation, setUserLiveLocation] = useState(null)
  const [nearbyMechanics, setNearbyMechanics] = useState([])
  const [acceptedMechanicId, setAcceptedMechanicId] = useState(null)
  const [routePoints, setRoutePoints] = useState([])
  const [mechanicStartLocation, setMechanicStartLocation] = useState(null)
  const [workProgress, setWorkProgress] = useState(0)

  const [autoStart, setAutoStart] = useState(Boolean(location.state?.autoDemo))
  const [forceDemoRunning, setForceDemoRunning] = useState(null)

  useEffect(() => {
    const fallback = order?.customerLocation?.lat && order?.customerLocation?.lng
      ? { lat: order.customerLocation.lat, lng: order.customerLocation.lng }
      : null

    setUserLiveLocation(fallback)

    if (!navigator.geolocation) return undefined

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLiveLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    )

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLiveLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      () => {},
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
    )

    return () => {
      try {
        navigator.geolocation.clearWatch(watchId)
      } catch {}
    }
  }, [order?.customerLocation?.lat, order?.customerLocation?.lng])

  useEffect(() => {
    loadOrder()

    const currentUser = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
    const realtime = connectRealtimeWithFallback({
      onConnect: (socket) => {
        socket.emit('dispatch:join', {
          role: 'customer',
          id: currentUser.id || 'guest-customer',
          requestId: orderId
        })

        socket.on('dispatch:created', () => loadOrder())
        socket.on('dispatch:accepted', (payload) => {
          if (payload?.id === orderId) loadOrder()
        })
        socket.on('dispatch:rebroadcast', (payload) => {
          if (payload?.id === orderId) loadOrder()
        })
        socket.on('dispatch:expired', (payload) => {
          if (payload?.id === orderId) loadOrder()
        })
      }
    })

    return () => realtime.disconnect()
  }, [orderId])

  const loadOrder = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rw_orders') || '[]')
      const found = stored.find((o) => o.id === orderId)
      if (found) {
        setOrder(found)
        setTracking(found.tracking || {})
        return
      }

      const dispatchResp = await getCustomerDispatchStatus(orderId)
      if (dispatchResp?.ok && dispatchResp?.request) {
        const req = dispatchResp.request
        const mappedStatus = req.status === 'accepted' ? 'in_progress' : req.status === 'completed' ? 'completed' : 'pending'
        setOrder({
          id: req.id,
          status: mappedStatus,
          total: req.estimatedPrice || 0,
          date: req.createdAt,
          customerId: req.customerId,
          customerLocation: req.location || null,
          mechanicId: req.assignedMechanicId,
          mechanicName: req.assignedMechanicName,
          assignedMechanicName: req.assignedMechanicName,
          items: req.serviceItems || []
        })

        setTracking({
          estimatedTime: req.status === 'accepted' ? 'Mechanic en route' : 'Finding nearby mechanic',
          eta: req.status === 'accepted' ? formatTime(Date.now() + 25 * 60000) : '--:--',
          distance: req.status === 'accepted' ? 'Live' : 'Searching'
        })
      }
    } catch {}
  }

  const stages = useMemo(
    () => [
      { id: 'pending', label: 'Order Placed', detail: 'Request received and being matched' },
      { id: 'in_progress', label: 'Mechanic En Route', detail: 'Mechanic accepted and is on the way' },
      { id: 'working', label: 'Service In Progress', detail: 'Mechanic is working on your service' },
      { id: 'completed', label: 'Service Completed', detail: 'Mechanic completed and service ended' }
    ],
    []
  )

  const resolvedStatus =
    demoFlowStatus === 'completed'
      ? 'completed'
      : demoFlowStatus === 'working'
        ? 'working'
        : demoFlowStatus === 'arrived'
          ? 'working'
          : demoFlowStatus === 'accepted' || demoFlowStatus === 'en_route'
            ? 'in_progress'
            : order?.status

  const currentStageIndex = stages.findIndex((s) => s.id === resolvedStatus)
  const currentStage = stages[currentStageIndex]

  const handleStartDemo = () => {
    setAutoStart(false)
    setForceDemoRunning(true)
  }

  const handleStopDemo = () => {
    setAutoStart(false)
    setForceDemoRunning(false)
    setDemoFlowStatus('')
    setDemoStatus('Demo stopped')
    setDemoLocation(null)
    setDemoMechanic(null)
    setDemoAcceptedAt(null)
    setNearbyMechanics([])
    setAcceptedMechanicId(null)
    setRoutePoints([])
    setMechanicStartLocation(null)
    setWorkProgress(0)
    setTracking((prev) => ({
      ...(prev || {}),
      eta: '--:--',
      distance: 'Stopped',
      estimatedTime: 'Demo stopped'
    }))
  }

  if (!order) {
    return (
      <div className="tracking-page">
        <div className="panel">
          <h3>Order not found</h3>
          <p className="muted">The tracking request is not available.</p>
          <button onClick={() => navigate('/orders')} className="btn btn-primary">Back to Orders</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  return (
    <div className="tracking-page">
      <div className="top-bar">
        <button onClick={() => navigate('/orders')} className="btn btn-secondary">Back</button>
        <h1>Service Tracking</h1>
      </div>

      <section className="tracking-grid">
        <article className="panel panel-map">
          <TrackingSimulator
            autoStart={autoStart}
            forceRunning={forceDemoRunning}
            userLocation={userLiveLocation}
            showControls={false}
            onDemoStop={() => {
              setForceDemoRunning(false)
            }}
            onStatusChange={(message, state, data) => {
              setDemoFlowStatus(state)
              setDemoStatus(message)
              if (data?.location) setDemoLocation(data.location)
              if (data?.mechanic) setDemoMechanic(data.mechanic)
              if (data?.acceptedAt) setDemoAcceptedAt(data.acceptedAt)
              if (Array.isArray(data?.nearbyMechanics)) setNearbyMechanics(data.nearbyMechanics)
              if (data?.acceptedMechanicId) setAcceptedMechanicId(data.acceptedMechanicId)
              if (Array.isArray(data?.routePoints)) setRoutePoints(data.routePoints)
              if (data?.mechanicStartLocation) setMechanicStartLocation(data.mechanicStartLocation)
              if (typeof data?.workProgress === 'number') setWorkProgress(data.workProgress)

              if (typeof data?.eta === 'number' || typeof data?.distance === 'number') {
                setTracking((prev) => ({
                  ...(prev || {}),
                  eta: typeof data?.eta === 'number' ? `${data.eta} min` : prev?.eta,
                  distance: typeof data?.distance === 'number' ? `${data.distance.toFixed(1)} km` : prev?.distance,
                  estimatedTime: message || prev?.estimatedTime
                }))
              }
            }}
            onLocationUpdate={(nextLocation) => setDemoLocation(nextLocation)}
            onDemoStart={(payload) => {
              setAutoStart(false)
              setForceDemoRunning(true)
              if (Array.isArray(payload?.nearbyMechanics)) setNearbyMechanics(payload.nearbyMechanics)
              if (payload?.acceptedMechanicId) setAcceptedMechanicId(payload.acceptedMechanicId)
              if (payload?.mechanic) setDemoMechanic(payload.mechanic)
            }}
          />
          <LiveGPSTracker
            orderId={orderId}
            mechanicId={order.mechanicId || 'm1'}
            customerId={order.customerId}
            initialCustomerLocation={userLiveLocation || order.customerLocation}
            simulatedMechanicLocation={demoLocation}
            demoStatusText={demoStatus}
            nearbyMechanics={nearbyMechanics}
            acceptedMechanicId={acceptedMechanicId}
            routePoints={routePoints}
            mechanicStartLocation={mechanicStartLocation}
            userLiveLocation={userLiveLocation}
          />
        </article>

        <article className="panel panel-realtime-tracker">
          <div className="tracker-header">
            <h2>Live Tracking</h2>
            <div className="demo-controls">
              <button onClick={handleStartDemo} className="btn btn-sm btn-primary">Start</button>
              <button onClick={handleStopDemo} className="btn btn-sm btn-secondary">Stop</button>
            </div>
          </div>

          {/* Searching Mechanics Phase */}
          {demoFlowStatus === 'searching' && (
            <div className="phase-card">
              <div className="phase-icon">🔍</div>
              <div className="phase-title">Searching Mechanics</div>
              <div className="phase-desc">Finding nearby mechanics in your area</div>
              <div className="phase-status">
                <div className="spinner"></div>
                <span>Searching...</span>
              </div>
            </div>
          )}

          {/* Mechanic Found Phase */}
          {demoFlowStatus === 'accepted' && demoMechanic && (
            <div className="phase-card">
              <div className="phase-icon">✓</div>
              <div className="phase-title">Mechanic Found</div>
              <div className="phase-desc">Mechanic accepted your request</div>
              <div className="mechanic-card">
                <div className="mechanic-info">
                  <div className="mechanic-name">{demoMechanic.name}</div>
                  <div className="mechanic-vehicle">{demoMechanic.vehicle}</div>
                  <div className="mechanic-rating">⭐ {demoMechanic.rating} • {demoMechanic.jobs} jobs</div>
                  <div className="mechanic-phone">📞 {demoMechanic.phone}</div>
                </div>
              </div>
            </div>
          )}

          {/* On the Way Phase */}
          {demoFlowStatus === 'en_route' && demoMechanic && (
            <div className="phase-card">
              <div className="phase-icon">🚗</div>
              <div className="phase-title">Mechanic on the Way</div>
              <div className="phase-desc">Heading to your location</div>
              <div className="mechanic-card">
                <div className="mechanic-info">
                  <div className="mechanic-name">{demoMechanic.name}</div>
                  <div className="mechanic-vehicle">{demoMechanic.vehicle}</div>
                </div>
              </div>
              <div className="time-tracking">
                <div className="time-item">
                  <span className="time-label">ETA</span>
                  <span className="time-value">{tracking?.eta || '--:--'}</span>
                </div>
                <div className="time-item">
                  <span className="time-label">Distance</span>
                  <span className="time-value">{tracking?.distance || '--'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Service In Progress Phase */}
          {(demoFlowStatus === 'arrived' || demoFlowStatus === 'working') && demoMechanic && (
            <div className="phase-card">
              <div className="phase-icon">🔧</div>
              <div className="phase-title">Service In Progress</div>
              <div className="phase-desc">Mechanic is working on your vehicle</div>
              <div className="mechanic-card">
                <div className="mechanic-info">
                  <div className="mechanic-name">{demoMechanic.name}</div>
                  <div className="mechanic-vehicle">{demoMechanic.vehicle}</div>
                </div>
              </div>
              {workProgress > 0 && (
                <div className="progress-container">
                  <div className="progress-label">Work Progress</div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${workProgress}%` }}></div>
                  </div>
                  <div className="progress-text">{Math.round(workProgress)}%</div>
                </div>
              )}
            </div>
          )}

          {/* Completed Phase */}
          {demoFlowStatus === 'completed' && (
            <div className="phase-card completed">
              <div className="phase-icon">✅</div>
              <div className="phase-title">Task Completed</div>
              <div className="phase-desc">Your service has been completed</div>
              <div className="completion-message">Thank you for using RepairWale!</div>
            </div>
          )}

          {/* Order Details */}
          <div className="order-summary">
            <div className="summary-row">
              <span>Order ID</span>
              <strong>{order.id?.slice(-8).toUpperCase()}</strong>
            </div>
            <div className="summary-row">
              <span>Total</span>
              <strong>₹ {order.total?.toLocaleString('en-IN') || '0'}</strong>
            </div>
            <div className="summary-row">
              <span>Status</span>
              <strong>{currentStage?.label || 'Pending'}</strong>
            </div>
          </div>
        </article>
      </section>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
  .tracking-page {
    max-width: 1600px;
    margin: 0 auto;
    padding: 16px;
    background: #0B1F3B;
    min-height: 100vh;
    color: #ffffff;
  }

  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }

  .top-bar h1 {
    margin: 0;
    font-size: 28px;
  }

  .tracking-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 14px;
    align-items: start;
  }

  .panel {
    border: 1px solid #1f3f6b;
    border-radius: 12px;
    background: #0f172a;
    padding: 0;
  }

  .panel-map {
    grid-column: span 1;
    padding: 0;
    overflow: hidden;
  }

  .panel-map > * {
    height: 600px;
    border-radius: 12px;
  }

  .panel-realtime-tracker {
    grid-column: span 1;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 600px;
    overflow-y: auto;
  }

  .tracker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .tracker-header h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }

  .demo-controls {
    display: flex;
    gap: 6px;
  }

  .btn {
    border-radius: 8px;
    border: 1px solid #1f3f6b;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-sm {
    padding: 6px 10px;
    font-size: 12px;
  }

  .btn-primary {
    background: #0B1F3B;
    color: #ffffff;
    border-color: #315b94;
  }

  .btn-primary:hover {
    background: #1a2a50;
  }

  .btn-secondary {
    background: #0f172a;
    color: #ffffff;
    border-color: #1f3f6b;
  }

  .btn-secondary:hover {
    background: #1a2a50;
  }

  .phase-card {
    border: 1px solid #1f3f6b;
    border-radius: 12px;
    background: #0B1F3B;
    padding: 14px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .phase-card.completed {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }

  .phase-icon {
    font-size: 32px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .phase-title {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
  }

  .phase-desc {
    font-size: 12px;
    color: #9ec1e8;
  }

  .phase-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #9ec1e8;
    font-size: 13px;
  }

  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid #1f3f6b;
    border-top-color: #9ec1e8;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .mechanic-card {
    border: 1px solid #1f3f6b;
    border-radius: 10px;
    background: #0f172a;
    padding: 10px;
    text-align: left;
  }

  .mechanic-info {
    display: grid;
    gap: 4px;
  }

  .mechanic-name {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }

  .mechanic-vehicle {
    font-size: 12px;
    color: #9ec1e8;
  }

  .mechanic-rating {
    font-size: 12px;
    color: #b5c8e3;
  }

  .mechanic-phone {
    font-size: 12px;
    color: #b5c8e3;
  }

  .time-tracking {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .time-item {
    border: 1px solid #1f3f6b;
    border-radius: 8px;
    background: #0f172a;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .time-label {
    font-size: 11px;
    color: #9ec1e8;
    font-weight: 600;
  }

  .time-value {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }

  .progress-container {
    display: grid;
    gap: 6px;
  }

  .progress-label {
    font-size: 12px;
    color: #9ec1e8;
    font-weight: 600;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 20px;
    background: #0f172a;
    border-radius: 6px;
    border: 1px solid #1f3f6b;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #06b6d4);
    border-radius: 5px;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
  }

  .completion-message {
    font-size: 14px;
    color: #10b981;
    font-weight: 600;
  }

  .order-summary {
    border-top: 1px solid #1f3f6b;
    padding-top: 12px;
    display: grid;
    gap: 8px;
  }

  .summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }

  .summary-row span {
    color: #9ec1e8;
  }

  .summary-row strong {
    color: #ffffff;
    font-weight: 700;
  }

  .muted {
    color: #b5c8e3;
    font-size: 12px;
    margin: 0;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    border: 1px solid #1f3f6b;
    border-radius: 8px;
    background: #0B1F3B;
    padding: 10px;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .timeline {
    display: grid;
    gap: 10px;
  }

  .timeline-row {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 10px;
    border: 1px solid #1f3f6b;
    border-radius: 8px;
    background: #0B1F3B;
    padding: 10px;
  }

  .dot {
    width: 30px;
    height: 30px;
    border: 1px solid #315b94;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }

  .title {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .subtitle {
    font-size: 12px;
    color: #b5c8e3;
  }

  .is-done .dot,
  .is-current .dot {
    border-color: #ffffff;
  }

  .tracking-page * {
    box-shadow: none !important;
    text-shadow: none !important;
    filter: none !important;
  }

  @media (max-width: 1200px) {
    .tracking-grid {
      grid-template-columns: 1fr 1fr;
    }

    .panel-map > * {
      height: 400px;
    }

    .panel-realtime-tracker {
      max-height: 400px;
    }
  }

  @media (max-width: 768px) {
    .tracking-grid {
      grid-template-columns: 1fr;
    }

    .panel-map > * {
      height: 300px;
    }

    .panel-realtime-tracker {
      max-height: none;
    }

    .top-bar h1 {
      font-size: 22px;
    }
  }
`