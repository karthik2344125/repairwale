import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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

export default function ServiceTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [tracking, setTracking] = useState(null)
  const [selectedUpdate, setSelectedUpdate] = useState(null)

  useEffect(() => {
    loadOrder()
    // Simulate real-time updates
    const interval = setInterval(loadOrder, 5000)
    return () => clearInterval(interval)
  }, [orderId])

  const loadOrder = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rw_orders') || '[]')
      const found = stored.find(o => o.id === orderId)
      if (found) {
        setOrder(found)
        setTracking(found.tracking || {})
      }
    } catch {}
  }

  if (!order) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
          <h3>Order not found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/orders')}
            style={{
              marginTop: 20,
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: '#60a5fa',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  const stages = [
    { id: 'pending', label: 'Order Placed', icon: '📝', color: '#fbbf24' },
    { id: 'in_progress', label: 'In Progress', icon: '⚙️', color: '#60a5fa' },
    { id: 'completed', label: 'Completed', icon: '✅', color: '#10b981' }
  ]

  const currentStageIndex = stages.findIndex(s => s.id === order.status)
  const currentStage = stages[currentStageIndex]

  // Sample status updates (in real app, this would come from backend)
  const statusUpdates = tracking?.statusUpdates || [
    {
      time: '14:30',
      status: 'pending',
      message: 'Order placed',
      icon: '📝'
    },
    {
      time: '14:32',
      status: 'pending',
      message: 'Looking for nearby mechanics',
      icon: '🔍'
    }
  ]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '12px 8px' }}>
      <h2 style={{ marginTop: 0, fontWeight: 900, letterSpacing: '-0.5px' }}>Service Tracking</h2>

      {/* Order Header */}
      <div style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(96,165,250,0.08)',
        border: '1px solid rgba(96,165,250,0.2)',
        marginBottom: 20
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Order #
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#60a5fa' }}>
              {order.id.slice(-8).toUpperCase()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Status
            </div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: currentStage?.color,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>{currentStage?.icon}</span>
              {currentStage?.label}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Date
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {formatDate(order.date)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Total Amount
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>
              ₹{order.total?.toLocaleString('en-IN') || '0'}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div style={{
        padding: 20,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 20
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: 16, fontWeight: 800 }}>Service Progress</h3>

        {/* Stages Timeline */}
        <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex
            const isCurrent = idx === currentStageIndex
            const isNext = idx > currentStageIndex

            return (
              <div key={stage.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                {/* Timeline Circle */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  background: isCompleted ? '#10b98120' : isCurrent ? '#60a5fa20' : '#ffffff08',
                  border: `2px solid ${isCompleted ? '#10b981' : isCurrent ? '#60a5fa' : '#ffffff20'}`,
                  minWidth: 40,
                  position: 'relative'
                }}>
                  {isCompleted ? '✓' : stage.icon}
                </div>

                {/* Stage Details */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isCompleted ? '#10b981' : isCurrent ? '#60a5fa' : 'var(--text-secondary)'
                  }}>
                    {stage.label}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    marginTop: 4
                  }}>
                    {stage.id === 'pending' && 'Waiting for mechanic assignment'}
                    {stage.id === 'in_progress' && 'Mechanic is on the way or working on your service'}
                    {stage.id === 'completed' && 'Service finished and ready for pickup'}
                  </div>
                </div>

                {/* Connector Line */}
                {idx < stages.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 60,
                    top: 40,
                    width: 2,
                    height: 60,
                    background: isCompleted ? '#10b981' : '#ffffff10'
                  }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Key Metrics */}
        <div style={{
          padding: 16,
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Est. Time
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>
              {tracking?.estimatedTime || '45 mins'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Distance
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>
              {tracking?.distance || '8.5 km'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
              ETA
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>
              {tracking?.eta || '15:15'}
            </div>
          </div>
        </div>
      </div>

      {/* Services Summary */}
      <div style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 20
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 800 }}>Services</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {order.items?.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              paddingBottom: 8,
              borderBottom: idx < order.items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none'
            }}>
              <span>{item.title} × {item.qty}</span>
              <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Mechanic Info */}
      {order.status !== 'pending' && (
        <div style={{
          padding: 16,
          borderRadius: 12,
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.2)',
          marginBottom: 20
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 800 }}>Assigned Mechanic</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                Name
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                Priya Sharma
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                Rating
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24' }}>
                ⭐ 4.8 (245 reviews)
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                Contact
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13
                }}>
                  📞 Call
                </button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13
                }}>
                  💬 Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Updates */}
      <div style={{
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: 20
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 800 }}>Status Updates</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {statusUpdates.map((update, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedUpdate(selectedUpdate === idx ? null : idx)}
              style={{
                padding: 12,
                borderRadius: 8,
                background: selectedUpdate === idx ? 'rgba(96,165,250,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selectedUpdate === idx ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.08)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{update.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {update.message}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                    {update.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 12,
          padding: 12,
          borderRadius: 8,
          background: 'rgba(96,165,250,0.1)',
          border: '1px dashed rgba(96,165,250,0.3)',
          color: '#60a5fa',
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 600
        }}>
          🔄 Live updates - Refreshes every 5 seconds
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <button
          onClick={() => navigate('/orders')}
          style={{
            padding: '12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'transparent',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 14,
            transition: 'all 0.2s'
          }}
        >
          ← Back to Orders
        </button>
        <button
          style={{
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: '#60a5fa',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 14,
            transition: 'all 0.2s'
          }}
        >
          🔄 Refresh Tracking
        </button>
      </div>
    </div>
  )
}
