import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/components/Button'

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

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => ['pending', 'in_progress'].includes(o.status)).length,
    totalSpent: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.total || 0), 0)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: ['#fbbf24', 'rgba(251, 191, 36, 0.1)'],
      in_progress: ['#3b82f6', 'rgba(59, 130, 246, 0.1)'],
      completed: ['#10b981', 'rgba(16, 185, 129, 0.1)'],
      cancelled: ['#ef4444', 'rgba(239, 68, 68, 0.1)']
    }
    return colors[status] || ['#9aa0a6', 'rgba(154, 160, 166, 0.1)']
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      in_progress: '🔄',
      completed: '✅',
      cancelled: '❌'
    }
    return icons[status] || '•'
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
    <div style={{ background: '#0a0e27', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2847 0%, #0f1729 100%)',
        padding: '40px 24px',
        borderBottom: '1px solid rgba(96, 165, 250, 0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
            }}>
              📦
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: 36,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                My Orders
              </h1>
              <p style={{ margin: '8px 0 0 0', color: 'rgba(229,231,235,0.7)', fontSize: 14, fontWeight: 500 }}>
                Track your service bookings and history
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16
          }}>
            {[
              { label: 'Total Orders', value: stats.total, icon: '📊', color: '#3b82f6' },
              { label: 'Completed', value: stats.completed, icon: '✅', color: '#10b981' },
              { label: 'In Progress', value: stats.pending, icon: '🔄', color: '#f59e0b' },
              { label: 'Total Spent', value: formatINR(stats.totalSpent), icon: '💰', color: '#8b5cf6' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
                borderRadius: 12,
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
                <div style={{
                  fontSize: 32,
                  background: `${stat.color}20`,
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <p style={{ margin: '0 0 4px 0', fontSize: 12, color: 'rgba(229,231,235,0.6)' }}>
                    {stat.label}
                  </p>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 32,
          overflowX: 'auto',
          paddingBottom: 12,
          borderBottom: '1px solid rgba(96, 165, 250, 0.1)'
        }}>
          {[
            { id: 'all', label: '📋 All Orders', badge: stats.total },
            { id: 'pending', label: '⏳ Pending', badge: stats.pending },
            { id: 'completed', label: '✅ Completed', badge: stats.completed },
            { id: 'cancelled', label: '❌ Cancelled', badge: orders.filter(o => o.status === 'cancelled').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: filter === tab.id ? '2px solid #3b82f6' : '1px solid rgba(96, 165, 250, 0.2)',
                background: filter === tab.id ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.1))' : 'transparent',
                color: filter === tab.id ? '#60a5fa' : 'var(--text-secondary)',
                fontWeight: filter === tab.id ? 700 : 600,
                cursor: 'pointer',
                fontSize: 13,
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (filter !== tab.id) {
                  e.target.style.borderColor = 'rgba(96, 165, 250, 0.4)'
                  e.target.style.background = 'rgba(59, 130, 246, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab.id) {
                  e.target.style.borderColor = 'rgba(96, 165, 250, 0.2)'
                  e.target.style.background = 'transparent'
                }
              }}
            >
              {tab.label}
              {tab.badge > 0 && (
                <span style={{
                  marginLeft: 8,
                  background: filter === tab.id ? '#3b82f6' : 'rgba(96, 165, 250, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={{
            padding: 60,
            textAlign: 'center',
            borderRadius: 16,
            border: '1px dashed rgba(96, 165, 250, 0.2)',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))'
          }}>
            <div style={{ fontSize: 64, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>📦</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 20, fontWeight: 700, color: '#e5e7eb' }}>
              No {filter !== 'all' ? filter : 'orders'} found
            </h3>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)', fontSize: 14, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              {filter !== 'all' 
                ? `You don't have any ${filter} orders yet.` 
                : 'Start booking services to see your order history here'}
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/service')}
              style={{ marginTop: 16 }}
            >
              🚀 Browse Services
            </Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {filteredOrders.map((order, idx) => {
              const [statusColor, statusBg] = getStatusColor(order.status)
              return (
                <div
                  key={order.id}
                  style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: 16,
                    border: '1px solid rgba(96, 165, 250, 0.2)',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    animation: `slideUp 0.5s ease-out ${idx * 0.05}s both`
                  }}
                  onClick={() => navigate(`/tracking/${order.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.2)'
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
                    e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.2)'
                  }}
                >
                  {/* Top Section - Order ID and Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(229,231,235,0.6)', letterSpacing: 1 }}>
                        ORDER ID
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#60a5fa', marginTop: 4 }}>
                        #{order.id.slice(-8).toUpperCase()}
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      background: statusBg,
                      border: `1px solid ${statusColor}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span style={{ fontSize: 14 }}>{getStatusIcon(order.status)}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: statusColor }}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(96, 165, 250, 0.1)' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: 11, fontWeight: 600, color: 'rgba(229,231,235,0.5)', textTransform: 'uppercase' }}>Date</p>
                      <p style={{ margin: 0, fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>📅 {formatDate(order.date)}</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: 11, fontWeight: 600, color: 'rgba(229,231,235,0.5)', textTransform: 'uppercase' }}>Location</p>
                      <p style={{ margin: 0, fontSize: 13, color: '#e5e7eb', fontWeight: 600 }}>📍 {order.location || 'Your Location'}</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ margin: '0 0 12px 0', fontSize: 12, fontWeight: 700, color: 'rgba(229,231,235,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Services ({order.items?.length || 0})
                    </p>
                    <div style={{ display: 'grid', gap: 8 }}>
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: 8,
                          border: '1px solid rgba(96, 165, 250, 0.1)'
                        }}>
                          <span style={{ fontSize: 13, color: '#e5e7eb' }}>
                            {item.title}
                          </span>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: 'rgba(229,231,235,0.6)', background: 'rgba(96, 165, 250, 0.2)', padding: '2px 8px', borderRadius: 4 }}>
                              ×{item.qty}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>
                              {formatINR(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {order.items?.length > 3 && (
                      <p style={{ margin: '12px 0 0 0', fontSize: 12, color: 'rgba(96, 165, 250, 0.7)', fontWeight: 600 }}>
                        +{order.items.length - 3} more service{order.items.length - 3 !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  {/* Footer - Total and Action */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid rgba(96, 165, 250, 0.1)' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', fontSize: 11, fontWeight: 600, color: 'rgba(229,231,235,0.5)', textTransform: 'uppercase' }}>
                        Total Amount
                      </p>
                      <p style={{ margin: 0, fontSize: 20, fontWeight: 800, background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {formatINR(order.total)}
                      </p>
                    </div>
                    <div style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                      borderRadius: 8,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 12,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateX(4px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
                    >
                      View Details →
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
