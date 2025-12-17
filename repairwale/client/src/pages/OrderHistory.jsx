import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

function formatDate(dateStr) {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rw_orders') || '[]')
      setOrders(stored.sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch {}
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'completed') return order.status === 'completed'
    if (filter === 'pending') return ['pending', 'in_progress'].includes(order.status)
    if (filter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  const getStatusColor = (status) => {
    const colors = {
      pending: '#fbbf24',
      in_progress: '#60a5fa',
      completed: '#10b981',
      cancelled: '#ef4444'
    }
    return colors[status] || '#9aa0a6'
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

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '12px 8px' }}>
      <h2 style={{ marginTop: 0, fontWeight: 900, letterSpacing: '-0.5px' }}>Order History</h2>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 8 }}>
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'pending', label: 'Pending' },
          { id: 'in_progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: filter === tab.id ? '#60a5fa' : 'rgba(255,255,255,0.08)',
              color: filter === tab.id ? '#fff' : 'var(--text-secondary)',
              fontWeight: filter === tab.id ? 700 : 500,
              cursor: 'pointer',
              fontSize: 13,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)'
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <h3 style={{ margin: 0, marginBottom: 8 }}>No orders yet</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14 }}>
            Start booking services to see your order history
          </p>
          <Button
            variant="primary"
            size="md"
            style={{ marginTop: 16 }}
            onClick={() => navigate('/service')}
          >
            Browse Services
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filteredOrders.map(order => (
            <div
              key={order.id}
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                hover: { background: 'rgba(255,255,255,0.05)' }
              }}
              onClick={() => navigate(`/tracking/${order.id}`)}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>
                    Order #{order.id.slice(-8).toUpperCase()}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {formatDate(order.date)}
                  </div>
                </div>
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: 6,
                    background: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status),
                    fontSize: 12,
                    fontWeight: 700
                  }}
                >
                  {getStatusLabel(order.status)}
                </div>
              </div>

              {/* Items Summary */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {order.items?.length || 0} service{order.items?.length !== 1 ? 's' : ''}
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  {order.items?.slice(0, 2).map((item, idx) => (
                    <div key={idx} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      • {item.title} ×{item.qty}
                    </div>
                  ))}
                  {order.items?.length > 2 && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      • +{order.items.length - 2} more
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    Total Amount
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#60a5fa' }}>
                    {formatINR(order.total)}
                  </div>
                </div>
                <div style={{ fontSize: 16 }}>→</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
