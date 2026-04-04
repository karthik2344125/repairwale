import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RealTimeChat from '../../shared/components/RealTimeChat'
import LiveGPSTracker from '../components/LiveGPSTracker'
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

export default function ServiceTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [tracking, setTracking] = useState(null)
  const [selectedUpdate, setSelectedUpdate] = useState(null)

  useEffect(() => {
    loadOrder()

    const currentUser = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
    const realtime = connectRealtimeWithFallback({
      onConnect: (socket) => {
        socket.emit('dispatch:join', { role: 'customer', id: currentUser.id || 'guest-customer', requestId: orderId })

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
      const found = stored.find(o => o.id === orderId)
      if (found) {
        setOrder(found)
        setTracking(found.tracking || {})
        return
      }

      // Fallback to dispatch lifecycle request tracking
      const dispatchResp = await getCustomerDispatchStatus(orderId)
      if (dispatchResp?.ok && dispatchResp?.request) {
        const req = dispatchResp.request
        const mappedStatus = req.status === 'accepted' ? 'in_progress' : req.status === 'completed' ? 'completed' : 'pending'
        const mappedOrder = {
          id: req.id,
          status: mappedStatus,
          total: req.estimatedPrice || 0,
          date: req.createdAt,
          location: req.location?.text || 'Customer location',
          customerId: req.customerId,
          customerLocation: req.location || null,
          customerName: req.customerName,
          mechanicId: req.assignedMechanicId,
          mechanicName: req.assignedMechanicName,
          assignedMechanicName: req.assignedMechanicName,
          items: req.serviceItems || []
        }

        const updates = (req.events || []).map((event) => ({
          time: formatTime(event.at),
          status: event.type === 'accepted' ? 'in_progress' : 'pending',
          message: event.message,
          icon: event.type === 'accepted' ? 'A' : 'P'
        }))

        setOrder(mappedOrder)
        setTracking({
          statusUpdates: updates,
          estimatedTime: req.status === 'accepted' ? 'Mechanic en route' : 'Finding nearby mechanic',
          eta: req.status === 'accepted' ? formatTime(Date.now() + 25 * 60000) : '--:--',
          distance: req.status === 'accepted' ? 'Live' : 'Searching'
        })
      }
    } catch {}
  }

  if (!order) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}></div>
          <h3>Order not found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/orders')}
            style={{
              marginTop: 20,
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: '#0B1F3B',
              color: '#FFFFFF',
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
    { id: 'pending', label: 'Order Placed', icon: '📦', color: '#0B1F3B' },
    { id: 'in_progress', label: 'In Progress', icon: '🛠️', color: '#FFFFFF' },
    { id: 'completed', label: 'Completed', icon: '✅', color: '#FFFFFF' }
  ]

  const currentStageIndex = stages.findIndex(s => s.id === order.status)
  const currentStage = stages[currentStageIndex]

  // Sample status updates (in real app, this would come from backend)
  const statusUpdates = tracking?.statusUpdates || [
    {
      time: '14:30',
      status: 'pending',
      message: 'Order placed',
      icon: '🧾'
    },
    {
      time: '14:32',
      status: 'pending',
      message: 'Looking for nearby mechanics',
      icon: '🔎'
    }
  ]

  const premiumStyles = `
    /* ===== TRACKING PREMIUM THEME ===== */
    
    /* Container */
    .tracking-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0;
      background: #0B1F3B;
      min-height: 100vh;
      position: relative;
    }

    /* ===== HERO SECTION ===== */
    .tracking-hero {
      background: #0B1F3B;
      border-bottom: 1px solid #0B1F3B;
      box-shadow: none;
      padding: 44px 24px;
      position: relative;
      overflow: hidden;
    }

    .tracking-hero::before {
      content: '';
      position: absolute;
      top: -40%;
      right: -20%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.24) 0%, rgba(96, 165, 250, 0) 72%);
      filter: blur(18px);
      animation: tracking-float 20s ease-in-out infinite;
    }

    .tracking-hero::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -15%;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(139, 92, 246, 0) 68%);
      filter: blur(24px);
      animation: tracking-float 22s ease-in-out infinite reverse;
    }

    .tracking-back-btn {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid rgba(96, 165, 250, 0.14);
      background: rgba(96, 165, 250, 0.08);
      color: #FFFFFF;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .tracking-back-btn:hover {
      background: rgba(96, 165, 250, 0.1);
      border-color: rgba(96, 165, 250, 0.6);
      transform: translateX(-2px);
    }

    .tracking-hero-content {
      position: relative;
      z-index: 2;
      margin-bottom: 32px;
      text-align: center;
    }

    .tracking-title {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.8px;
      color: #FFFFFF;
      margin: 0;
    }

    .tracking-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.75);
      margin: 8px 0 0 0;
      font-weight: 500;
    }

    .tracking-header-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      position: relative;
      z-index: 2;
    }

    .tracking-header-item {
      background: rgba(16, 32, 58, 0.4);
      backdrop-filter: blur(12px);
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid rgba(96, 165, 250, 0.16);
      transition: all 0.3s ease;
    }

    .tracking-header-item:hover {
      border-color: rgba(96, 165, 250, 0.16);
      background: rgba(16, 32, 58, 0.6);
    }

    .tracking-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .tracking-value {
      font-size: 16px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.3px;
    }

    .tracking-value-date {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .tracking-value-amount {
      font-size: 18px;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: -0.3px;
    }

    .tracking-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
      font-weight: 700;
    }

    /* ===== PROGRESS SECTION ===== */
    .tracking-progress-section {
      padding: 32px 24px;
      position: relative;
    }

    .section-title {
      font-size: 20px;
      font-weight: 900;
      color: #FFFFFF;
      margin: 0 0 16px 0;
      letter-spacing: -0.4px;
    }

    .tracking-timeline {
      display: grid;
      gap: 24px;
      margin-bottom: 32px;
      background: rgba(16, 32, 58, 0.25);
      backdrop-filter: blur(8px);
      padding: 24px;
      border-radius: 14px;
      border: 1px solid rgba(96, 165, 250, 0.12);
    }

    .tracking-stage {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      position: relative;
      animation: tracking-slide-up 0.6s var(--delay, 0s) ease-out both;
    }

    @keyframes tracking-slide-up {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tracking-stage:nth-child(1) { --delay: 0.1s; }
    .tracking-stage:nth-child(2) { --delay: 0.2s; }
    .tracking-stage:nth-child(3) { --delay: 0.3s; }

    .tracking-completed .tracking-stage-circle {
      background: rgba(16, 185, 129, 0.15);
      border-color: #FFFFFF;
      color: #FFFFFF;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
    }

    .tracking-current .tracking-stage-circle {
      background: rgba(96, 165, 250, 0.1);
      border-color: #FFFFFF;
      color: #FFFFFF;
      box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
      animation: tracking-pulse 2s ease-in-out infinite;
    }

    @keyframes tracking-pulse {
      0%, 100% { box-shadow: 0 0 12px rgba(96, 165, 250, 0.18); }
      50% { box-shadow: 0 0 16px rgba(96, 165, 250, 0.1); }
    }

    .tracking-next .tracking-stage-circle {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.16);
      color: rgba(166, 173, 186, 0.6);
    }

    .tracking-stage-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      border: 2px solid;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }

    .tracking-stage-content {
      flex: 1;
      padding-top: 2px;
    }

    .tracking-stage-label {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 4px;
      transition: color 0.3s ease;
    }

    .tracking-completed .tracking-stage-label {
      color: #FFFFFF;
    }

    .tracking-current .tracking-stage-label {
      color: #FFFFFF;
    }

    .tracking-next .tracking-stage-label {
      color: rgba(166, 173, 186, 0.6);
    }

    .tracking-stage-desc {
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      margin-top: 4px;
    }

    .tracking-connector {
      position: absolute;
      left: 21px;
      top: 44px;
      width: 2px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 1;
    }

    .tracking-connector-done {
      background: linear-gradient(180deg, #0B1F3B 0%, rgba(16, 185, 129, 0.3) 100%);
    }

    /* Metrics Cards */
    .tracking-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
    }

    .tracking-metric-card {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(96, 165, 250, 0.14);
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .tracking-metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
      transition: left 0.6s ease;
    }

    .tracking-metric-card:hover {
      border-color: rgba(96, 165, 250, 0.16);
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
      box-shadow: 0 4px 16px rgba(96, 165, 250, 0.1);
    }

    .tracking-metric-card:hover::before {
      left: 100%;
    }

    .metric-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 6px;
    }

    .metric-value {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.3px;
    }

    /* ===== SERVICES SECTION ===== */
    .tracking-services-section {
      padding: 28px 24px;
      background: rgba(16, 32, 58, 0.2);
      border-top: 1px solid rgba(96, 165, 250, 0.08);
      border-bottom: 1px solid rgba(96, 165, 250, 0.08);
    }

    .tracking-services-list {
      display: grid;
      gap: 10px;
    }

    .tracking-service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: rgba(16, 32, 58, 0.3);
      border-radius: 8px;
      border: 1px solid rgba(96, 165, 250, 0.1);
      font-size: 13px;
      transition: all 0.2s ease;
    }

    .tracking-service-item:hover {
      border-color: rgba(96, 165, 250, 0.12);
      background: rgba(16, 32, 58, 0.45);
    }

    .service-name {
      color: #a5d6ff;
      font-weight: 600;
    }

    .service-price {
      color: #7dd3fc;
      font-weight: 700;
    }

    /* ===== MECHANIC SECTION ===== */
    .tracking-mechanic-section {
      padding: 28px 24px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%);
      border-top: 1px solid rgba(16, 185, 129, 0.12);
      border-bottom: 1px solid rgba(16, 185, 129, 0.08);
    }

    .tracking-mechanic-grid {
      display: grid;
      gap: 14px;
    }

    .mechanic-info-item {
      background: rgba(30, 58, 138, 0.16);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .mechanic-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 4px;
    }

    .mechanic-value {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .mechanic-value-rating {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .mechanic-contact-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .mechanic-btn {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
      color: #FFFFFF;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mechanic-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    /* ===== UPDATES SECTION ===== */
    .tracking-updates-section {
      padding: 28px 24px;
    }

    .tracking-updates-list {
      display: grid;
      gap: 12px;
      margin-bottom: 16px;
    }

    .tracking-update-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px;
      padding: 14px;
      border-radius: 10px;
      background: rgba(30, 58, 138, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.08);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      animation: tracking-update-enter 0.5s ease-out backwards;
    }

    @keyframes tracking-update-enter {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .tracking-update-card:nth-child(1) { animation-delay: 0.1s; }
    .tracking-update-card:nth-child(2) { animation-delay: 0.2s; }
    .tracking-update-card:nth-child(3) { animation-delay: 0.3s; }

    .tracking-update-selected {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.18);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .update-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
    }

    .update-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .update-message {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
    }

    .update-time {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.65);
      margin-top: 2px;
    }

    .tracking-live-indicator {
      padding: 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px dashed rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      font-size: 12px;
      text-align: center;
      font-weight: 600;
    }

    /* ===== ACTION BUTTONS ===== */
    .tracking-action-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 24px;
    }

    .tracking-btn-primary {
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.28);
      position: relative;
      overflow: hidden;
    }

    .tracking-btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.14);
      transition: left 0.5s ease;
    }

    .tracking-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(15, 23, 42, 0.34);
    }

    .tracking-btn-primary:hover::before {
      left: 100%;
    }

    .tracking-btn-secondary {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.04);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tracking-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.24);
      transform: translateY(-2px);
    }

    /* ===== GPS & CHAT CONTAINERS ===== */
    .tracking-gps-container,
    .tracking-chat-container {
      padding: 24px;
      background: rgba(15, 23, 42, 0.18);
      margin: 0;
    }

    .tracking-gps-container {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tracking-chat-container {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 40px;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes tracking-float {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(20px, -10px); }
      66% { transform: translate(-10px, 20px); }
    }

    /* ===== FLOW LOCK: NAVY + WHITE, LOW MOTION ===== */
    .tracking-container,
    .tracking-content,
    .tracking-section,
    .tracking-card,
    .tracking-panel,
    .tracking-status-timeline,
    .tracking-update,
    .tracking-meta,
    .tracking-gps-container,
    .tracking-chat-container {
      background: #0B1F3B !important;
      color: #FFFFFF !important;
      border-color: #0B1F3B !important;
      box-shadow: none !important;
    }

    .tracking-hero,
    .tracking-back-btn,
    .tracking-btn-primary,
    .tracking-stage.active,
    .tracking-badge,
    .tracking-pill,
    .tracking-kpi-value {
      background: #0B1F3B !important;
      color: #FFFFFF !important;
      border-color: #0B1F3B !important;
      box-shadow: none !important;
    }

    .tracking-title,
    .tracking-order-id,
    .tracking-stage-label,
    .tracking-label,
    .tracking-value,
    .tracking-subtitle,
    .tracking-time,
    .tracking-message,
    .tracking-helper,
    .tracking-btn-secondary {
      color: #FFFFFF !important;
      background: transparent !important;
      border-color: #0B1F3B !important;
      -webkit-text-fill-color: #FFFFFF !important;
    }

    .tracking-hero .tracking-title,
    .tracking-hero .tracking-subtitle,
    .tracking-hero .tracking-label,
    .tracking-hero .tracking-value {
      color: #FFFFFF !important;
      -webkit-text-fill-color: #FFFFFF !important;
    }

    .tracking-container *,
    .tracking-container *::before,
    .tracking-container *::after {
      animation: none !important;
      transition: none !important;
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .tracking-hero {
        padding: 32px 16px;
      }

      .tracking-title {
        font-size: 24px;
      }

      .tracking-header-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      .tracking-back-btn {
        font-size: 12px;
        padding: 6px 12px;
      }

      .section-title {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .tracking-metrics {
        grid-template-columns: 1fr;
      }

      .tracking-action-buttons {
        padding: 16px;
      }

      .mechanic-contact-buttons {
        grid-template-columns: 1fr;
      }

      .tracking-timeline {
        padding: 16px;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      .tracking-container {
        padding: 0;
      }

      .tracking-hero {
        padding: 24px 12px;
      }

      .tracking-progress-section,
      .tracking-services-section,
      .tracking-mechanic-section,
      .tracking-updates-section,
      .tracking-action-buttons,
      .tracking-gps-container,
      .tracking-chat-container {
        padding: 16px 12px;
      }

      .tracking-back-btn {
        top: 12px;
        left: 12px;
        font-size: 11px;
      }

      .tracking-title {
        font-size: 20px;
      }

      .tracking-subtitle {
        font-size: 12px;
      }

      .tracking-header-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .section-title {
        font-size: 16px;
      }

      .tracking-stage-circle {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }

      .tracking-connector {
        left: 17px;
        height: 50px;
        top: 36px;
      }

      .tracking-action-buttons {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .metric-value {
        font-size: 16px;
      }

      .update-message {
        font-size: 12px;
      }
    }
  `

  return (
    <div className="tracking-container">
      {/* Premium Hero Section */}
      <div className="tracking-hero">
        <button 
          onClick={() => navigate('/orders')}
          className="tracking-back-btn"
        >
           Back
        </button>
        
        <div className="tracking-hero-content">
          <h1 className="tracking-title">Tracking Your Service</h1>
          <p className="tracking-subtitle">Real-time updates for order #{order.id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="tracking-header-grid">
          <div className="tracking-header-item">
            <div className="tracking-label">Order #</div>
            <div className="tracking-value">{order.id?.slice(-8).toUpperCase()}</div>
          </div>
          <div className="tracking-header-item">
            <div className="tracking-label">Status</div>
            <div className="tracking-status" style={{ color: currentStage?.color }}>
              <span>{currentStage?.icon}</span>
              {currentStage?.label}
            </div>
          </div>
          <div className="tracking-header-item">
            <div className="tracking-label">Date</div>
            <div className="tracking-value-date">{formatDate(order.date)}</div>
          </div>
          <div className="tracking-header-item">
            <div className="tracking-label">Total</div>
            <div className="tracking-value-amount">₹ {order.total?.toLocaleString('en-IN') || '0'}</div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="tracking-progress-section">
        <h2 className="section-title">Service Progress</h2>

        {/* Stages Timeline */}
        <div className="tracking-timeline">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex
            const isCurrent = idx === currentStageIndex
            const isNext = idx > currentStageIndex

            return (
              <div key={stage.id} className={`tracking-stage ${isCompleted ? 'tracking-completed' : isCurrent ? 'tracking-current' : 'tracking-next'}`}>
                <div className="tracking-stage-circle">
                  {isCompleted ? '' : stage.icon}
                </div>
                <div className="tracking-stage-content">
                  <div className="tracking-stage-label">{stage.label}</div>
                  <div className="tracking-stage-desc">
                    {stage.id === 'pending' && 'Waiting for mechanic assignment'}
                    {stage.id === 'in_progress' && 'Mechanic is on the way or working on your service'}
                    {stage.id === 'completed' && 'Service finished and ready for pickup'}
                  </div>
                </div>
                {idx < stages.length - 1 && <div className={`tracking-connector ${isCompleted ? 'tracking-connector-done' : ''}`} />}
              </div>
            )
          })}
        </div>

        {/* Key Metrics */}
        <div className="tracking-metrics">
          <div className="tracking-metric-card">
            <div className="metric-label">Est. Time</div>
            <div className="metric-value">{tracking?.estimatedTime || '45 mins'}</div>
          </div>
          <div className="tracking-metric-card">
            <div className="metric-label">Distance</div>
            <div className="metric-value">{tracking?.distance || '8.5 km'}</div>
          </div>
          <div className="tracking-metric-card">
            <div className="metric-label">ETA</div>
            <div className="metric-value">{tracking?.eta || '15:15'}</div>
          </div>
        </div>
      </div>

      {/* Services Summary */}
      <div className="tracking-services-section">
        <h2 className="section-title">Services</h2>
        <div className="tracking-services-list">
          {order.items?.map((item, idx) => (
            <div key={idx} className="tracking-service-item">
              <span className="service-name">{item.title} x {item.qty}</span>
              <strong className="service-price">₹ {(item.price * item.qty).toLocaleString('en-IN')}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Mechanic Info */}
      {order.status !== 'pending' && (
        <div className="tracking-mechanic-section">
          <h2 className="section-title">Assigned Mechanic</h2>
          <div className="tracking-mechanic-grid">
            <div className="mechanic-info-item">
              <div className="mechanic-label">Name</div>
              <div className="mechanic-value">{order.assignedMechanicName || order.mechanicName || 'Assigned Mechanic'}</div>
            </div>
            <div className="mechanic-info-item">
              <div className="mechanic-label">Rating</div>
              <div className="mechanic-value-rating"> 4.8 (245 reviews)</div>
            </div>
            <div className="mechanic-contact-buttons">
              <button className="mechanic-btn mechanic-btn-call">📞 Call</button>
              <button className="mechanic-btn mechanic-btn-chat">💬 Chat</button>
            </div>
          </div>
        </div>
      )}

      {/* Status Updates */}
      <div className="tracking-updates-section">
        <h2 className="section-title">Status Updates</h2>
        <div className="tracking-updates-list">
          {statusUpdates.map((update, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedUpdate(selectedUpdate === idx ? null : idx)}
              className={`tracking-update-card ${selectedUpdate === idx ? 'tracking-update-selected' : ''}`}
            >
              <div className="update-icon">{update.icon}</div>
              <div className="update-content">
                <div className="update-message">{update.message}</div>
                <div className="update-time">{update.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="tracking-live-indicator">
           Live updates - Refreshes every 5 seconds
        </div>
      </div>

      {/* Action Buttons */}
      <div className="tracking-action-buttons">
        <button
          onClick={() => navigate('/orders')}
          className="tracking-btn-secondary"
        >
           Back to Orders
        </button>
        <button
          onClick={loadOrder}
          className="tracking-btn-primary"
        >
           Refresh Tracking
        </button>
      </div>

      {/* Live GPS Tracker */}
      <div className="tracking-gps-container">
        <LiveGPSTracker 
          orderId={orderId} 
          mechanicId={order.mechanicId || 'm1'}
          customerId={order.customerId}
          initialCustomerLocation={order.customerLocation}
        />
      </div>

      {/* Real-Time Chat */}
      <div className="tracking-chat-container">
        <RealTimeChat 
          orderId={orderId}
          userRole="customer"
          mechanicName={order.assignedMechanicName || order.mechanicName || 'Assigned Mechanic'}
        />
      </div>

      <style>{premiumStyles}</style>
    </div>
  )
}