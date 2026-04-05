import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/components/Button'
import { getFallbackCompletedOrders } from '../data/mechanicDemoData'

const ORDER_HISTORY_KEY = 'rw_mechanic_order_history'
const DEMO_REQUESTS_KEY = 'rw_demo_mechanic_requests'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function buildMapsUrl(locationText) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText || '')}`
}

export default function MechanicOrdersPage() {
  const navigate = useNavigate()
  const [refreshSeed, setRefreshSeed] = useState(0)

  const orders = useMemo(() => {
    const fallbackOrders = getFallbackCompletedOrders(Date.now())
    const history = readJson(ORDER_HISTORY_KEY, [])
    const demoRequests = readJson(DEMO_REQUESTS_KEY, [])
      .filter((item) => item.status === 'completed')
      .map((item) => ({ ...item, completedAt: item.completedAt || Date.now() - 86400000 }))

    const combined = [...history, ...demoRequests, ...fallbackOrders]
    const unique = combined.reduce((acc, order) => {
      if (!acc.find((item) => item.id === order.id)) acc.push(order)
      return acc
    }, [])

    return unique.sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0))
  }, [refreshSeed])

  const summary = useMemo(() => {
    const total = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0)
    const avgRevenue = total ? Math.round(totalRevenue / total) : 0
    const avgDistance = total ? (orders.reduce((sum, order) => sum + Number(order.distanceKm || 0), 0) / total).toFixed(1) : '0.0'

    return {
      total,
      totalRevenue,
      avgRevenue,
      avgDistance
    }
  }, [orders])

  return (
    <div className="mechanic-orders-page">
      <style>{styles}</style>
      <div className="orders-shell">
        <div className="orders-topbar">
          <div>
            <div className="orders-eyebrow">Mechanic History</div>
            <h1 className="orders-title">Old Orders</h1>
            <p className="orders-text">Completed service requests with customer and job details.</p>
          </div>
          <div className="orders-actions">
            <Button variant="ghost" onClick={() => setRefreshSeed((value) => value + 1)}>Refresh</Button>
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-label">Completed Orders</div>
            <div className="summary-value">{summary.total}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Total Revenue</div>
            <div className="summary-value">₹ {summary.totalRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Avg Ticket</div>
            <div className="summary-value">₹ {summary.avgRevenue.toLocaleString('en-IN')}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Avg Distance</div>
            <div className="summary-value">{summary.avgDistance} km</div>
          </div>
        </div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-head">
                <div>
                  <div className="order-id">{order.id}</div>
                  <div className="order-name">{order.customerName}</div>
                </div>
                <div className="order-status">COMPLETED</div>
              </div>

              <div className="order-detail"><span>Phone</span><strong>{order.customerPhone || 'Not shared'}</strong></div>
              <div className="order-detail"><span>Location</span><strong>{order.location}</strong></div>
              <div className="order-detail"><span>Vehicle</span><strong>{order.vehicle || 'Car/Bike'}</strong></div>
              <div className="order-detail"><span>Issue</span><strong>{order.problem}</strong></div>
              <div className="order-detail"><span>Amount</span><strong>₹ {Number(order.amount || 0).toLocaleString('en-IN')}</strong></div>
              <div className="order-detail"><span>Completed</span><strong>{order.completedAt ? new Date(order.completedAt).toLocaleString('en-IN') : 'N/A'}</strong></div>

              <div className="order-foot">
                <Button variant="ghost" onClick={() => window.open(buildMapsUrl(order.location), '_blank', 'noopener,noreferrer')}>Open Maps</Button>
                <Button variant="ghost" onClick={() => navigate('/mechanic/job/' + order.id, { state: { request: order } })}>Open Job</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{styles}</style>
    </div>
  )
}

const styles = `
.mechanic-orders-page {
  min-height: 100vh;
  background: #0b1220;
  color: #e2e8f0;
  padding: 20px;
}

.orders-shell {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 16px;
}

.orders-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.orders-eyebrow {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.orders-title {
  margin: 4px 0 6px;
  font-size: 28px;
}

.orders-text {
  margin: 0;
  color: #94a3b8;
}

.orders-actions,
.order-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
  font-size: 20px;
  font-weight: 700;
  color: #e2e8f0;
}

.order-card {
  background: #0f172a;
  border: 1px solid #233248;
  padding: 16px;
  display: grid;
  gap: 10px;
}

.order-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.order-id {
  font-size: 12px;
  color: #94a3b8;
}

.order-name {
  font-size: 18px;
  font-weight: 700;
}

.order-status {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #86efac;
}

.order-detail {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px solid #233248;
  font-size: 13px;
}

.order-detail:first-of-type {
  border-top: 0;
}

.order-detail span {
  color: #94a3b8;
}

.order-detail strong {
  color: #e2e8f0;
  text-align: right;
}

@media (max-width: 800px) {
  .summary-grid,
  .orders-grid {
    grid-template-columns: 1fr;
  }

  .orders-title {
    font-size: 24px;
  }
}
`
