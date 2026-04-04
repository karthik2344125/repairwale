import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/components/Button'
import { apiCall } from '../../shared/services/api'

function formatINR(value) {
  return `₹ ${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function PageIcon({ name, size = 14 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true'
  }

  switch (name) {
    case 'orders':
      return <svg {...props}><path d="M7 4h10l3 3v13H4V4h3z" stroke="currentColor" strokeWidth="1.8"/><path d="M14 4v4h4" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    case 'completed':
      return <svg {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="m8.5 12 2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'live':
      return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/></svg>
    case 'spent':
      return <svg {...props}><path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8"/></svg>
    case 'date':
      return <svg {...props}><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    case 'location':
      return <svg {...props}><path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.8"/></svg>
    case 'services':
      return <svg {...props}><path d="M14.8 4.7a3 3 0 0 1 4.2 4.2l-2.3 2.3-4.2-4.2 2.3-2.3zM11.3 8.2l4.2 4.2-6.8 6.8H4.5v-4.2l6.8-6.8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
    case 'total':
      return <svg {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v10M9.2 9.2h4a2 2 0 1 1 0 4h-2.4a2 2 0 1 0 0 4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    case 'view':
      return <svg {...props}><path d="M2.8 12s3.4-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.4 5.5-9.2 5.5S2.8 12 2.8 12z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.8"/></svg>
    case 'pending':
      return <svg {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    case 'cancelled':
      return <svg {...props}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8"/><path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    default:
      return null
  }
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  const sampleOrders = [
    {
      id: 'ord_20260301_001',
      status: 'in_progress',
      date: '2026-03-01T08:40:00.000Z',
      location: 'Banjara Hills, Hyderabad',
      items: [
        { title: 'Engine Oil Change', qty: 1, price: 1800 },
        { title: 'Brake Inspection', qty: 1, price: 700 }
      ],
      total: 2500
    },
    {
      id: 'ord_20260227_014',
      status: 'completed',
      date: '2026-02-27T15:10:00.000Z',
      location: 'Madhapur, Hyderabad',
      items: [
        { title: 'Battery Replacement', qty: 1, price: 5200 },
        { title: 'On-site Installation', qty: 1, price: 500 }
      ],
      total: 5700
    },
    {
      id: 'ord_20260222_031',
      status: 'pending',
      date: '2026-02-22T11:30:00.000Z',
      location: 'Gachibowli, Hyderabad',
      items: [
        { title: 'Tyre Puncture Repair', qty: 2, price: 450 },
        { title: 'Wheel Balancing', qty: 1, price: 900 },
        { title: 'Nitrogen Air Fill', qty: 1, price: 250 }
      ],
      total: 2050
    },
    {
      id: 'ord_20260218_044',
      status: 'cancelled',
      date: '2026-02-18T09:25:00.000Z',
      location: 'Kukatpally, Hyderabad',
      items: [{ title: 'AC Cooling Check', qty: 1, price: 1200 }],
      total: 1200
    }
  ]

  const mapServerOrder = (order) => {
    const sourceItems = Array.isArray(order.items) ? order.items : []
    const normalizedItems = sourceItems.map((item) => {
      const qty = Number(item.qty || item.quantity || 1)
      const price = Number(item.price || item.amount || item.unitPrice || 0)
      return {
        title: item.title || item.name || item.serviceName || 'Service item',
        qty: Number.isFinite(qty) && qty > 0 ? qty : 1,
        price: Number.isFinite(price) && price >= 0 ? price : 0
      }
    })

    const locationFromBilling = [
      order?.billing?.locality,
      order?.billing?.city,
      order?.billing?.state
    ].filter(Boolean).join(', ')

    const totalAmount = Number(
      order.total || order.amount || order.amountInRupees || order.subtotal || 0
    )

    return {
      id: String(order.id || `ord_${Date.now()}`),
      status: String(order.status || 'pending').toLowerCase(),
      date: order.createdAt || order.date || new Date().toISOString(),
      location: locationFromBilling || order.location || 'Your Location',
      items: normalizedItems,
      total: Number.isFinite(totalAmount) ? totalAmount : 0
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    let fallbackOrders = sampleOrders

    try {
      const stored = JSON.parse(localStorage.getItem('rw_orders') || '[]')
      if (Array.isArray(stored) && stored.length > 0) {
        fallbackOrders = stored
      }
    } catch {}

    setOrders([...fallbackOrders].sort((a, b) => new Date(b.date) - new Date(a.date)))

    try {
      const user = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
      const userId = user?.id || user?._id
      if (!userId) return

      const listResponse = await apiCall(`/orders?userId=${encodeURIComponent(userId)}`, {
        suppressErrorToast: true
      })

      const orderList = Array.isArray(listResponse?.orders) ? listResponse.orders : []
      if (orderList.length === 0) return

      const detailedOrders = await Promise.all(
        orderList.map(async (order) => {
          try {
            const detailResponse = await apiCall(`/orders/${encodeURIComponent(order.id)}`, {
              suppressErrorToast: true
            })
            return detailResponse?.order ? { ...order, ...detailResponse.order } : order
          } catch {
            return order
          }
        })
      )

      const normalized = detailedOrders
        .map(mapServerOrder)
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      if (normalized.length > 0) {
        setOrders(normalized)
        localStorage.setItem('rw_orders', JSON.stringify(normalized))
      }
    } catch {}
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'completed') return order.status === 'completed'
    if (filter === 'pending') return ['pending', 'in_progress'].includes(order.status)
    if (filter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => ['pending', 'in_progress'].includes(o.status)).length,
    totalSpent: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.total || 0), 0)
  }

  const cancelledCount = orders.filter(o => o.status === 'cancelled').length

  const getStatusColor = (status) => {
    const colors = {
      pending: ['#A16207', 'rgba(245, 158, 11, 0.15)'],
      in_progress: ['#1D4ED8', 'rgba(37, 99, 235, 0.14)'],
      completed: ['#047857', 'rgba(16, 185, 129, 0.16)'],
      cancelled: ['#B91C1C', 'rgba(239, 68, 68, 0.15)']
    }
    return colors[status] || ['#0B1F3B', '#FFFFFF']
  }

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    }
    return labels[status] || status
  }

  const premiumStyles = `
    .orders-page {
      min-height: 100vh;
      background: radial-gradient(1200px 500px at 10% -10%, rgba(37,99,235,0.2), transparent), linear-gradient(180deg, #0B1F3B 0%, #0E274A 58%, #102E58 100%);
      color: #EAF1FF;
      padding-bottom: 32px;
    }

    .orders-hero {
      background: linear-gradient(135deg, rgba(11,31,59,0.96), rgba(14,39,74,0.94));
      color: #FFFFFF;
      padding: 32px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .orders-hero-inner,
    .orders-main {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
    }

    .orders-top {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 20px;
    }

    .orders-logo {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 0.4px;
      border: 1px solid #FFFFFF;
      color: #FFFFFF;
      background: #0B1F3B;
    }

    .orders-title {
      margin: 0;
      font-size: 34px;
      line-height: 1.1;
      font-weight: 900;
      color: #FFFFFF;
    }

    .orders-subtitle {
      margin: 6px 0 0;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 600;
      opacity: 0.95;
    }

    .orders-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    .orders-stat-card {
      display: flex;
      align-items: center;
      gap: 12px;
      border-radius: 12px;
      padding: 14px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.14);
      color: #EAF1FF;
      box-shadow: 0 12px 26px rgba(0,0,0,0.2);
    }

    .orders-stat-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,0.2);
      color: #FFFFFF;
      background: rgba(255,255,255,0.14);
    }

    .orders-stat-label {
      margin: 0 0 4px;
      color: rgba(234,241,255,0.82);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .orders-stat-value {
      margin: 0;
      color: #FFFFFF;
      font-size: 20px;
      font-weight: 900;
      line-height: 1;
    }

    .orders-main {
      padding: 22px 20px;
    }

    .orders-filters {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .orders-filter-btn {
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.08);
      color: #EAF1FF;
      padding: 10px 14px;
      cursor: pointer;
      font-weight: 800;
      font-size: 13px;
    }

    .orders-filter-btn.active {
      background: rgba(255,255,255,0.92);
      color: #FFFFFF;
    }

    .orders-badge {
      border-radius: 999px;
      min-width: 22px;
      height: 22px;
      padding: 0 7px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      background: #0B1F3B;
      color: #FFFFFF;
    }

    .orders-filter-btn.active .orders-badge {
      background: #0B1F3B;
      color: #0B1F3B;
    }

    .orders-empty {
      text-align: center;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(255,255,255,0.08);
      padding: 42px 20px;
    }

    .orders-empty-icon {
      margin-bottom: 12px;
      color: #EAF1FF;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 0.5px;
    }

    .orders-empty h3 {
      margin: 0 0 8px;
      font-size: 22px;
      font-weight: 800;
      color: #FFFFFF;
    }

    .orders-empty p {
      max-width: 420px;
      margin: 0 auto;
      color: rgba(234,241,255,0.85);
      font-size: 14px;
      line-height: 1.5;
    }

    .orders-list {
      display: grid;
      gap: 14px;
    }

    .order-card {
      border-radius: 14px;
      border: 1px solid rgba(15,23,42,0.08);
      background: #F7FAFF;
      padding: 16px;
      cursor: pointer;
      display: grid;
      gap: 10px;
      box-shadow: 0 14px 30px rgba(7, 20, 40, 0.16);
      transition: transform 0.18s ease, box-shadow 0.2s ease;
    }

    .order-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 18px 34px rgba(7, 20, 40, 0.2);
    }

    .order-segment {
      border-radius: 10px;
      border: 1px solid #D6E2F5;
      background: #FFFFFF;
      padding: 10px 12px;
    }

    .order-top,
    .order-meta,
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .order-top {
      margin-bottom: 0;
      align-items: center;
    }

    .order-caption {
      margin: 0;
      font-size: 11px;
      font-weight: 800;
      color: #5B6B84;
      letter-spacing: 0.6px;
    }

    .order-id {
      margin: 4px 0 0;
      font-size: 18px;
      font-weight: 900;
      color: #10233F;
      letter-spacing: 0.4px;
    }

    .order-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid #D7E1F0;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }

    .order-meta {
      margin-bottom: 0;
      padding: 0;
      border: 0;
      background: transparent;
    }

    .order-services-block {
      margin: 0;
    }

    .order-meta-item {
      flex: 1;
      min-width: 0;
    }

    .order-meta-label {
      margin: 0 0 4px;
      font-size: 10px;
      font-weight: 800;
      color: #5E6E87;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .order-meta-value {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      color: #10233F;
      line-height: 1.4;
    }

    .order-services-title {
      margin: 0 0 8px;
      font-size: 12px;
      font-weight: 800;
      color: #2B3D58;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .order-services-list {
      display: grid;
      gap: 8px;
      margin-bottom: 12px;
    }

    .order-service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid #DAE4F3;
      background: #F8FBFF;
      padding: 9px 10px;
    }

    .order-service-name {
      font-size: 13px;
      color: #10233F;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .order-service-right {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }

    .order-qty {
      font-size: 11px;
      border-radius: 999px;
      padding: 2px 8px;
      background: #10233F;
      color: #FFFFFF;
      font-weight: 800;
    }

    .order-service-price {
      font-size: 12px;
      color: #153158;
      font-weight: 800;
    }

    .order-more {
      margin: 8px 0 0;
      font-size: 12px;
      color: #4C5E79;
      font-weight: 700;
    }

    .order-footer {
      padding-top: 0;
      border-top: 0;
    }

    .order-total-label {
      margin: 0 0 3px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: #4C5E79;
      letter-spacing: 0.7px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .order-total-value {
      margin: 0;
      font-size: 21px;
      font-weight: 900;
      color: #0C2244;
    }

    @media (max-width: 1024px) {
      .orders-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .orders-hero,
      .orders-main {
        padding-left: 14px;
        padding-right: 14px;
      }

      .orders-title {
        font-size: 28px;
      }

      .orders-stats {
        grid-template-columns: 1fr;
      }

      .order-top,
      .order-footer,
      .order-meta {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 480px) {
      .order-card {
        padding: 14px;
      }

      .order-service-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .order-service-right {
        width: 100%;
        justify-content: space-between;
      }
    }
  `

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <div className="orders-hero-inner">
          <div className="orders-top">
            <div className="orders-logo">Rw</div>
            <div>
              <h1 className="orders-title">My Orders</h1>
              <p className="orders-subtitle">Track your service bookings and history</p>
            </div>
          </div>

          <div className="orders-stats">
            {[
              { label: 'Total Orders', value: stats.total, icon: 'orders' },
              { label: 'Completed', value: stats.completed, icon: 'completed' },
              { label: 'In Progress', value: stats.pending, icon: 'live' },
              { label: 'Total Spent', value: formatINR(stats.totalSpent), icon: 'spent' }
            ].map((stat, idx) => (
              <div key={idx} className="orders-stat-card">
                <div className="orders-stat-icon"><PageIcon name={stat.icon} size={18} /></div>
                <div>
                  <p className="orders-stat-label">{stat.label}</p>
                  <p className="orders-stat-value">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="orders-main">
        <div className="orders-filters">
          {[
            { id: 'all', label: 'All Orders', badge: stats.total },
            { id: 'pending', label: 'Pending', badge: stats.pending },
            { id: 'completed', label: 'Completed', badge: stats.completed },
            { id: 'cancelled', label: 'Cancelled', badge: cancelledCount }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`orders-filter-btn ${filter === tab.id ? 'active' : ''}`}
            >
              {tab.label}
              {tab.badge > 0 && <span className="orders-badge">{tab.badge}</span>}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">No orders</div>
            <h3>No {filter !== 'all' ? filter : 'orders'} found</h3>
            <p style={{ marginBottom: 24 }}>
              {filter !== 'all'
                ? `You don't have any ${filter} orders yet.`
                : 'Start booking services to see your order history here'}
            </p>
            <Button variant="primary" size="md" onClick={() => navigate('/service')} style={{ marginTop: 16 }}>
              Browse Services
            </Button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => {
              const [statusColor, statusBg] = getStatusColor(order.status)
              return (
                <div
                  key={order.id}
                  className="order-card"
                  onClick={() => navigate(`/tracking/${order.id}`)}
                >
                  <div className="order-top order-segment">
                    <div>
                      <p className="order-caption">Order id</p>
                      <p className="order-id">#{order.id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="order-status" style={{ background: statusBg, borderColor: `${statusColor}55`, color: statusColor }}>
                      {order.status === 'completed' && <PageIcon name="completed" size={14} />}
                      {order.status === 'in_progress' && <PageIcon name="live" size={14} />}
                      {order.status === 'pending' && <PageIcon name="pending" size={14} />}
                      {order.status === 'cancelled' && <PageIcon name="cancelled" size={14} />}
                      <span>{getStatusLabel(order.status)}</span>
                    </div>
                  </div>

                  <div className="order-meta order-segment">
                    <div className="order-meta-item">
                      <p className="order-meta-label"><PageIcon name="date" size={12} /> Date</p>
                      <p className="order-meta-value">{formatDate(order.date)}</p>
                    </div>
                    <div className="order-meta-item">
                      <p className="order-meta-label"><PageIcon name="location" size={12} /> Location</p>
                      <p className="order-meta-value">{order.location || 'Your Location'}</p>
                    </div>
                  </div>

                  <div className="order-services-block order-segment">
                    <p className="order-services-title"><PageIcon name="services" size={13} /> Services ({order.items?.length || 0})</p>
                    <div className="order-services-list">
                      {order.items?.slice(0, 3).map((item, itemIdx) => (
                        <div key={itemIdx} className="order-service-item">
                          <span className="order-service-name">{item.title}</span>
                          <div className="order-service-right">
                            <span className="order-qty">Qty {item.qty}</span>
                            <span className="order-service-price">{formatINR(item.price * item.qty)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {order.items?.length > 3 && (
                      <p className="order-more">
                        +{order.items.length - 3} more service{order.items.length - 3 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div className="order-footer order-segment">
                    <div>
                      <p className="order-total-label"><PageIcon name="total" size={12} /> Total Amount</p>
                      <p className="order-total-value">{formatINR(order.total)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{premiumStyles}</style>
    </div>
  )
}


