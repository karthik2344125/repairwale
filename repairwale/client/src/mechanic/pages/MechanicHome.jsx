import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import Button from '../../shared/components/Button'
import { IconChat, IconMapPin, IconMoney, IconPhone, IconUser } from '../../icons'
import { showSuccess, showError } from '../../shared/services/toast'
import { getMechanic } from '../../shared/services/roleData'
import { acceptMechanicRequest, getMechanicRequests, rejectMechanicRequest, updateMechanicPresence } from '../../shared/services/api'
import { connectRealtimeWithFallback } from '../../shared/services/realtime'
import { startMechanicLiveTracking } from '../../shared/services/liveTracking'

const DEMO_MODE_KEY = 'rw_demo_mode'
const DEMO_REQUESTS_KEY = 'rw_demo_mechanic_requests'

function buildDemoRequests(mechanicId) {
  const now = Date.now()
  return [
    {
      id: `DEMO-REQ-${mechanicId}-1`,
      customerName: 'Rahul Sharma',
      location: 'Kothrud, Pune',
      distance: '1.2 km',
      price: 549,
      createdAt: now - 8 * 60000,
      problem: 'Car stalled after engine warning light came on near home.',
      status: 'pending',
      customerPhone: '+91 98765 43210'
    },
    {
      id: `DEMO-REQ-${mechanicId}-2`,
      customerName: 'Priya Nair',
      location: 'Baner, Pune',
      distance: '2.8 km',
      price: 399,
      createdAt: now - 16 * 60000,
      problem: 'Flat tyre on the way to office and needs quick roadside assist.',
      status: 'pending',
      customerPhone: '+91 99887 76655'
    },
    {
      id: `DEMO-REQ-${mechanicId}-3`,
      customerName: 'Amit Patil',
      location: 'Wakad, Pune',
      distance: '4.6 km',
      price: 299,
      createdAt: now - 24 * 60000,
      problem: 'Battery died after the car sat parked overnight.',
      status: 'pending',
      customerPhone: '+91 91234 56789'
    },
    {
      id: `DEMO-REQ-${mechanicId}-4`,
      customerName: 'Sneha Kulkarni',
      location: 'Hinjawadi, Pune',
      distance: '6.1 km',
      price: 1299,
      createdAt: now - 31 * 60000,
      problem: 'Needs a basic service slot today before a long drive tomorrow.',
      status: 'pending',
      customerPhone: '+91 90123 45678'
    }
  ]
}

function readDemoRequests(mechanicId) {
  try {
    const raw = localStorage.getItem(DEMO_REQUESTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch {}

  const seeded = buildDemoRequests(mechanicId)
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

const styles = `
.mechanic-home {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
  padding: 40px 20px;
}

.mechanic-container {
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.4);
}

.welcome-content h1 {
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.welcome-content p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 24px rgba(30, 58, 138, 0.4);
  border-color: rgba(30, 58, 138, 0.5);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
}

.stat-label {
  color: #9aa7bf;
  font-size: 14px;
  font-weight: 500;
}

.stat-change {
  font-size: 12px;
  margin-top: 8px;
}

.stat-change.positive {
  color: #22c55e;
}

.stat-change.negative {
  color: #FFFFFF;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mechanic-home {
    padding: 24px 16px;
  }
  
  .welcome-banner {
    padding: 24px;
    margin-bottom: 24px;
    border-radius: 12px;
  }
  
  .welcome-content h1 {
    font-size: 24px;
  }
  
  .welcome-content p {
    font-size: 14px;
  }
  
  .stats-grid {
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-icon {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .stat-value {
    font-size: 24px;
  }
  
  .stat-label {
    font-size: 12px;
  }
  
  .content-grid {
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 18px;
  }
  
  .request-item {
    padding: 14px;
  }
  
  .request-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .request-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .request-actions button {
    width: 100%;
  }
  
  .chart-bars {
    height: 100px;
    gap: 6px;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .mechanic-home {
    padding: 16px 12px;
  }
  
  .welcome-banner {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .welcome-content h1 {
    font-size: 20px;
  }
  
  .welcome-content p {
    font-size: 13px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .stat-card {
    padding: 16px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .stat-icon {
    font-size: 32px;
    margin-bottom: 0;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .content-grid {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .card {
    padding: 16px;
    border-radius: 10px;
  }
  
  .card-title {
    font-size: 16px;
    gap: 8px;
  }
  
  .request-item {
    padding: 12px;
  }
  
  .customer-info h4 {
    font-size: 14px;
  }
  
  .customer-info p {
    font-size: 12px;
  }
  
  .request-details {
    font-size: 13px;
  }
  
  .chart-bars {
    height: 80px;
    gap: 4px;
  }
  
  .chart-labels {
    font-size: 10px;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .action-btn {
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
  }
  
  .action-btn-icon {
    font-size: 24px;
    margin-bottom: 0;
  }
  
  .action-btn-label {
    font-size: 14px;
  }
}

.card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.request-item {
  background: rgba(30, 58, 138, 0.1);
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.request-item:hover {
  border-color: rgba(30, 58, 138, 0.4);
  background: rgba(30, 58, 138, 0.15);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.customer-info h4 {
  color: #ffffff;
  margin: 0 0 4px 0;
  font-size: 16px;
}

.customer-info p {
  color: #9aa7bf;
  margin: 0;
  font-size: 13px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-badge.completed {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.request-details {
  color: #9aa7bf;
  font-size: 14px;
  margin-bottom: 12px;
}

.request-actions {
  display: flex;
  gap: 8px;
}

.earnings-chart {
  background: rgba(30, 58, 138, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 120px;
  gap: 8px;
  margin-bottom: 12px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #1e3a8a, #3b82f6);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s;
}

.chart-bar:hover {
  background: linear-gradient(to top, #1e40af, #0B1F3B);
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  color: #9aa7bf;
  font-size: 11px;
}

.reviews-list {
  max-height: 400px;
  overflow-y: auto;
}

.review-item {
  background: rgba(30, 58, 138, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reviewer-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
}

.rating-stars {
  color: #fbbf24;
  font-size: 14px;
}

.review-text {
  color: #9aa7bf;
  font-size: 13px;
  line-height: 1.5;
}

.review-date {
  color: #6b7280;
  font-size: 11px;
  margin-top: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9aa7bf;
}

.empty-state-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.action-btn {
  background: rgba(30, 58, 138, 0.2);
  border: 1px solid rgba(30, 58, 138, 0.3);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(30, 58, 138, 0.3);
  border-color: rgba(30, 58, 138, 0.5);
  transform: translateY(-2px);
}

.action-btn-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.action-btn-label {
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.dashboard-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0B1F3B;
  color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.22);
  flex-shrink: 0;
}

/* ===== MECHANIC HOME NAVY LOCK ===== */
.mechanic-home {
  background: linear-gradient(180deg, #0B1F3B 0%, #08162B 100%) !important;
}

.welcome-banner,
.stat-card,
.card,
.request-item,
.earnings-chart,
.review-item,
.action-btn {
  background: #0B1F3B !important;
  border-color: rgba(255,255,255,0.22) !important;
}

.welcome-banner {
  box-shadow: 0 10px 28px rgba(0,0,0,0.28) !important;
}

.welcome-content h1,
.card-title,
.customer-info h4,
.reviewer-name,
.action-btn-label,
.empty-state p,
.request-details,
.review-text,
.review-date,
.stat-value,
.stat-label,
.chart-labels,
.customer-info p {
  color: #FFFFFF !important;
}

.welcome-content p,
.stat-change,
.review-date,
.chart-labels {
  color: rgba(255,255,255,0.74) !important;
}

.stat-value {
  background: none !important;
  -webkit-text-fill-color: #FFFFFF !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
}

.stat-card:hover,
.card:hover,
.request-item:hover,
.action-btn:hover {
  border-color: rgba(255,255,255,0.34) !important;
  box-shadow: 0 12px 36px rgba(0,0,0,0.28) !important;
}

.status-badge.pending {
  background: #0B1F3B;
  color: #FFFFFF;
}

.status-badge.active,
.status-badge.completed {
  background: #0B1F3B;
  color: #FFFFFF;
}

.earnings-chart,
.review-item {
  background: #0B1F3B !important;
}

.chart-bar {
  background: linear-gradient(to top, #08162B, #0B1F3B) !important;
}

.action-btn {
  background: #0B1F3B !important;
  border: 1px solid rgba(255,255,255,0.22) !important;
}

.action-btn:hover {
  background: rgba(255,255,255,0.08) !important;
}

.action-btn-icon,
.empty-state-icon,
.stat-icon {
  color: #FFFFFF;
}

.icon-row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.request-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== PREMIUM THEME WITH HIGHLIGHTS ===== */
.mechanic-home {
  background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
}

.welcome-banner {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #4A9EFF !important;
  box-shadow: 0 8px 32px rgba(74, 158, 255, 0.1), 0 0 100px rgba(74, 158, 255, 0.05) !important;
}

.welcome-content h1 {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.welcome-content p {
  color: rgba(230, 237, 247, 0.7) !important;
}

.stat-card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #4A9EFF, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 16px 48px rgba(74, 158, 255, 0.1);
}

.stat-value {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(74, 158, 255, 0.18));
}

.stat-label {
  color: rgba(230, 237, 247, 0.7) !important;
}

.stat-change.positive {
  color: #FFFFFF !important;
}

.stat-change.negative {
  color: #FF6B6B !important;
}

.card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #4A9EFF, #60A5FF);
  border-radius: 12px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.card:hover::after {
  opacity: 0.15;
}

.card:hover {
  box-shadow: 0 12px 40px rgba(74, 158, 255, 0.12);
}

.card-title {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.request-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
}

.request-item:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 4px 16px rgba(74, 158, 255, 0.12);
}

.customer-info h4 {
  color: #E6EDF7 !important;
}

.customer-info p {
  color: rgba(230, 237, 247, 0.7) !important;
}

.status-badge.pending {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%) !important;
  color: #0B1220 !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.status-badge.active {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.status-badge.completed {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(74, 158, 255, 0.18);
}

.request-details {
  color: rgba(230, 237, 247, 0.7) !important;
}

.earnings-chart {
  background: rgba(26, 58, 92, 0.3) !important;
  border: 1px solid #2A4368;
}

.chart-bar {
  background: linear-gradient(to top, #1A3A5C, #4A9EFF) !important;
}

.chart-bar:hover {
  background: linear-gradient(to top, #2A4368, #60A5FF) !important;
}

.chart-labels {
  color: rgba(230, 237, 247, 0.7) !important;
}

.review-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
}

.reviewer-name {
  color: #E6EDF7 !important;
}

.rating-stars {
  color: #FBBF24 !important;
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
}

.review-text {
  color: rgba(230, 237, 247, 0.7) !important;
}

.review-date {
  color: rgba(230, 237, 247, 0.5) !important;
}

.empty-state {
  color: rgba(230, 237, 247, 0.7) !important;
}

.action-btn {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  transition: all 0.2s;
}

.action-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  border-color: #60A5FF !important;
  box-shadow: 0 8px 24px rgba(74, 158, 255, 0.12);
}

.action-btn-label {
  color: #4A9EFF !important;
  font-weight: 700;
}

.action-btn:hover .action-btn-label {
  color: #FFFFFF !important;
}
`

export default function MechanicHome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const trackingRef = useRef({ stop: () => {} })
  const trackingOrderRef = useRef(null)
  const [mechData, setMechData] = useState(null)
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState({
    todayJobs: 0,
    todayEarnings: 0,
    monthlyJobs: 0,
    monthlyEarnings: 0,
    rating: 4.7,
    totalReviews: 0
  })
  const [mechanicId, setMechanicId] = useState('m1')
  const [isLiveTracking, setIsLiveTracking] = useState(false)
  const [liveTrackingOrderId, setLiveTrackingOrderId] = useState(null)
  const [lastTrackUpdateAt, setLastTrackUpdateAt] = useState(null)

  useEffect(() => {
    // Load mechanic data from localStorage
    const data = getMechanic()
    setMechData(data)

    const storedId = localStorage.getItem('rw_mechanic_id')
    const resolvedId = data?.id || storedId || 'm1'
    setMechanicId(resolvedId)
    localStorage.setItem('rw_mechanic_id', resolvedId)

    const isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'mechanic'

    // Generate mock data for demonstration
    generateMockData()

    loadRequests(resolvedId, isDemoMode)

    if (isDemoMode) {
      const seededRequests = readDemoRequests(resolvedId)
      setRequests(seededRequests)
    }

    const realtime = connectRealtimeWithFallback({
      onConnect: (socket) => {
        socket.emit('dispatch:join', { role: 'mechanic', id: resolvedId })

        socket.on('dispatch:new-request', (request) => {
          setRequests((prev) => {
            const exists = prev.find((item) => item.id === request.id)
            if (exists) {
              return prev.map((item) => item.id === request.id ? request : item)
            }
            return [request, ...prev]
          })
          showSuccess(' New nearby service request received')
        })

        socket.on('dispatch:accepted', (request) => {
          setRequests((prev) => prev.map((item) => item.id === request.id ? { ...item, status: 'active' } : item))
        })

        socket.on('dispatch:expired', (request) => {
          setRequests((prev) => prev.filter((item) => item.id !== request.id))
        })
      }
    })

    const publishPresence = async (lat, lng) => {
      try {
        await updateMechanicPresence({
          mechanicId: resolvedId,
          name: user?.fullName || mechData?.businessName || 'Mechanic',
          lat,
          lng,
          rating: Number(stats.rating) || 4.5,
          isAvailable: true,
          serviceAreaKm: 15
        })
      } catch (e) {
        console.error('Presence update failed:', e)
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          publishPresence(position.coords.latitude, position.coords.longitude)
        },
        () => {
          publishPresence(28.6139, 77.2090)
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      )
    } else {
      publishPresence(28.6139, 77.2090)
    }

    return () => {
      realtime.disconnect()
    }
  }, [])

  const generateMockData = () => {
    // Mock stats
    const mockStats = {
      todayJobs: Math.floor(Math.random() * 5) + 2,
      todayEarnings: Math.floor(Math.random() * 3000) + 1500,
      monthlyJobs: Math.floor(Math.random() * 50) + 30,
      monthlyEarnings: Math.floor(Math.random() * 50000) + 25000,
      rating: '4.7',
      totalReviews: 87
    }
    setStats(mockStats)
  }

  const loadRequests = async (id = mechanicId, allowDemoFallback = false) => {
    try {
      const response = await getMechanicRequests(id)
      if (response?.ok && Array.isArray(response.requests)) {
        if (response.requests.length > 0) {
          setRequests(response.requests)
          if (allowDemoFallback) {
            writeDemoRequests(response.requests)
          }
          return
        }
      }

      if (allowDemoFallback) {
        setRequests(readDemoRequests(id))
      }
    } catch (e) {
      console.error('Failed to load mechanic requests:', e)
      if (allowDemoFallback) {
        setRequests(readDemoRequests(id))
      }
    }
  }

  useEffect(() => {
    const activeRequest = requests.find((r) => ['active', 'accepted'].includes(r.status))
    const nextOrderId = activeRequest?.id || null

    if (trackingOrderRef.current === nextOrderId) return

    trackingRef.current.stop()
    trackingOrderRef.current = nextOrderId
    setIsLiveTracking(false)
    setLiveTrackingOrderId(nextOrderId)

    if (!nextOrderId || !mechanicId) {
      return
    }

    trackingRef.current = startMechanicLiveTracking({
      mechanicId,
      orderId: nextOrderId,
      onConnect: () => {
        setIsLiveTracking(true)
      },
      onDisconnect: () => {
        setIsLiveTracking(false)
      },
      onLocation: () => {
        setLastTrackUpdateAt(Date.now())
      },
      onError: () => {
        setIsLiveTracking(false)
      }
    })

    return () => {
      trackingRef.current.stop()
    }
  }, [requests, mechanicId])

  const handleAcceptRequest = async (requestId) => {
    try {
      const isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'mechanic'
      if (isDemoMode) {
        const nextRequests = readDemoRequests(mechanicId).map((request) => (
          request.id === requestId
            ? { ...request, status: 'active', acceptedAt: Date.now(), assignedMechanicName: user?.fullName || 'Demo Mechanic' }
            : request.status === 'active'
              ? request
              : request
        ))
        writeDemoRequests(nextRequests)
        setRequests(nextRequests)
        showSuccess(' Request accepted! Customer has been notified.')
        return
      }

      const response = await acceptMechanicRequest(mechanicId, requestId)
      if (!response?.ok) {
        showError(response?.error || 'Could not accept request')
        return
      }
      showSuccess(' Request accepted! Customer has been notified.')
      await loadRequests(mechanicId)
    } catch (e) {
      showError(e.message || 'Could not accept request')
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      const isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'mechanic'
      if (isDemoMode) {
        const nextRequests = readDemoRequests(mechanicId).filter((request) => request.id !== requestId)
        writeDemoRequests(nextRequests)
        setRequests(nextRequests)
        showSuccess('Request declined')
        return
      }

      const response = await rejectMechanicRequest(mechanicId, requestId)
      if (!response?.ok) {
        showError(response?.error || 'Could not reject request')
        return
      }
      showSuccess('Request declined')
      await loadRequests(mechanicId)
    } catch (e) {
      showError(e.message || 'Could not reject request')
    }
  }

  const weeklyEarnings = [2800, 3200, 2500, 3800, 3100, 2900, 3500]
  const maxEarning = Math.max(...weeklyEarnings)

  const mockReviews = [
    { id: 1, name: 'Amit Kumar', rating: 5, text: 'Excellent service! Very professional and quick.', date: '2 days ago' },
    { id: 2, name: 'Sneha Reddy', rating: 4, text: 'Good work, but could be faster. Overall satisfied.', date: '5 days ago' },
    { id: 3, name: 'Vikram Singh', rating: 5, text: 'Best mechanic in the area. Highly recommended!', date: '1 week ago' }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  }

  const getTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="mechanic-home">
      <style>{styles}</style>
      <div className="mechanic-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1> Welcome back, {user?.fullName || 'Mechanic'}!</h1>
            <p>You have {requests.filter(r => r.status === 'pending').length} pending requests today</p>
            {liveTrackingOrderId && (
              <p style={{ marginTop: 8, color: isLiveTracking ? '#FFFFFF' : '#FFFFFF' }}>
                {isLiveTracking
                  ? `Live tracking ON for ${liveTrackingOrderId}${lastTrackUpdateAt ? ` - updated ${getTimeAgo(lastTrackUpdateAt)}` : ''}`
                  : `Live tracking reconnecting for ${liveTrackingOrderId}`}
              </p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><IconUser size={22} /></div>
            <div className="stat-value">{stats.todayJobs}</div>
            <div className="stat-label">Jobs Today</div>
            <div className="stat-change positive"> +2 from yesterday</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><IconMoney size={22} /></div>
            <div className="stat-value">{formatCurrency(stats.todayEarnings)}</div>
            <div className="stat-label">Today's Earnings</div>
            <div className="stat-change positive"> +15% from average</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><IconMapPin size={22} /></div>
            <div className="stat-value">{stats.monthlyJobs}</div>
            <div className="stat-label">Monthly Jobs</div>
            <div className="stat-change positive"> +18% from last month</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><IconMoney size={22} /></div>
            <div className="stat-value">{formatCurrency(stats.monthlyEarnings)}</div>
            <div className="stat-label">Monthly Earnings</div>
            <div className="stat-change positive"> +22% from last month</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">★</div>
            <div className="stat-value">{stats.rating}</div>
            <div className="stat-label">Average Rating</div>
            <div className="stat-change positive">Based on {stats.totalReviews} reviews</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div className="stat-value">98%</div>
            <div className="stat-label">Completion Rate</div>
            <div className="stat-change positive"> Excellent performance</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Pending Requests */}
          <div className="card">
            <div className="card-header">
              <div className="card-title icon-row"><IconMapPin size={18} /> Pending Service Requests</div>
              <Button size="sm" variant="ghost" onClick={() => loadRequests(mechanicId)}>Refresh</Button>
            </div>

            {requests.filter(r => r.status === 'pending').length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><IconMapPin size={44} /></div>
                <p>No pending requests</p>
                <p style={{fontSize: 12, marginTop: 8}}>New requests will appear here</p>
              </div>
            ) : (
              requests.filter(r => r.status === 'pending').map(request => (
                <div key={request.id} className="request-item">
                  <div className="request-header">
                    <div className="customer-info">
                      <h4>{request.customerName}</h4>
                      <p className="request-location"><IconMapPin size={14} /> {request.location} - {request.distance} away</p>
                    </div>
                    <div className="status-badge pending">PENDING</div>
                  </div>
                  
                  <div className="request-details">
                    <strong>Problem:</strong> {request.problem}
                    <div style={{marginTop: 4}}>
                      <strong>Estimated:</strong> {formatCurrency(request.price)} - {getTimeAgo(request.createdAt)}
                    </div>
                  </div>

                  <div className="request-actions">
                    <Button 
                      onClick={() => handleAcceptRequest(request.id)}
                      style={{flex: 1}}
                    >
                      Accept Job
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            )}

            {/* Active Jobs */}
            {requests.filter(r => r.status === 'active').length > 0 && (
              <>
                <div style={{marginTop: 32, marginBottom: 16}}>
                  <div className="card-title" style={{fontSize: 18}}>Active Jobs</div>
                </div>
                
                {requests.filter(r => r.status === 'active').map(request => (
                  <div key={request.id} className="request-item">
                    <div className="request-header">
                      <div className="customer-info">
                        <h4>{request.customerName}</h4>
                        <p className="request-location"><IconMapPin size={14} /> {request.location}</p>
                      </div>
                      <div className="status-badge active">IN PROGRESS</div>
                    </div>
                    
                    <div className="request-details">
                      <strong>Problem:</strong> {request.problem}
                    </div>

                    <div className="request-actions">
                      <Button onClick={() => showSuccess('Job details coming soon')}>View Job</Button>
                      <Button variant="ghost" onClick={() => showSuccess('Chat coming soon')}>Chat</Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Weekly Earnings Chart */}
            <div className="card" style={{marginBottom: 24}}>
              <div className="card-title">Weekly Earnings</div>
              
              <div className="earnings-chart">
                <div className="chart-bars">
                  {weeklyEarnings.map((amount, index) => (
                    <div 
                      key={index}
                      className="chart-bar"
                      style={{height: `${(amount / maxEarning) * 100}%`}}
                      title={formatCurrency(amount)}
                    />
                  ))}
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="card">
              <div className="card-title icon-row">
                <IconChat size={18} />
                Recent Reviews
              </div>

              <div className="reviews-list">
                {mockReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.name}</span>
                      <span className="rating-stars">{'★'.repeat(review.rating)}</span>
                    </div>
                    <div className="review-text">{review.text}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-title icon-row">
            <IconPhone size={18} />
            Quick Actions
          </div>
          
          <div className="quick-actions">
            <div className="action-btn" onClick={() => navigate('/mechanic/services')}>
              <div className="action-btn-icon"><IconMapPin size={20} /></div>
              <div className="action-btn-label">My Services</div>
            </div>

            <div className="action-btn" onClick={() => navigate('/mechanic/profile')}>
              <div className="action-btn-icon"><IconUser size={20} /></div>
              <div className="action-btn-label">My Profile</div>
            </div>

            <div className="action-btn" onClick={() => showSuccess('Analytics coming soon')}> 
              <div className="action-btn-icon"><IconMoney size={20} /></div>
              <div className="action-btn-label">Analytics</div>
            </div>

            <div className="action-btn" onClick={() => showSuccess('Settings coming soon')}> 
              <div className="action-btn-icon">⚙</div>
              <div className="action-btn-label">Settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
