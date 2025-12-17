import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function CustomerDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userAuth')
    const userRole = sessionStorage.getItem('userRole')
    
    if (!isAuthenticated || userRole !== 'customer') {
      navigate('/')
      return
    }
  }, [])
  const [recentRequests, setRecentRequests] = useState([
    { id: 101, service: 'Oil Change', mechanic: 'Raj Sharma', status: 'completed', date: '2025-12-05', amount: 500 },
    { id: 102, service: 'Tire Repair', mechanic: 'Priya Singh', status: 'completed', date: '2025-12-03', amount: 800 },
    { id: 103, service: 'Battery Check', mechanic: 'Amit Patel', status: 'in-progress', date: '2025-12-07', amount: 300 }
  ])
  const [stats, setStats] = useState({ 
    requests: 3, 
    completed: 2, 
    savings: 2100,
    activeRequests: 1 
  })
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Honda City', plate: 'DL-01-XX-1234', type: 'Car', year: 2020 },
    { id: 2, name: 'Royal Enfield', plate: 'DL-02-YY-5678', type: 'Bike', year: 2021 }
  ])
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [vehicleForm, setVehicleForm] = useState({ name: '', plate: '', type: 'Car', year: '' })
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I\'m your RepairWale AI assistant. How can I help you today?', time: new Date().toLocaleTimeString() }
  ])
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    try {
      const userData = localStorage.getItem('repairwale_user')
      if (userData) setUser(JSON.parse(userData))
      
      const cartData = localStorage.getItem('rw_cart')
      if (cartData) {
        const cart = JSON.parse(cartData)
        setStats(prev => ({ ...prev, requests: cart.length }))
      }
    } catch (e) {
      console.error('Failed to load customer data', e)
    }
  }, [])

  const handleAddVehicle = () => {
    setEditingVehicle(null)
    setVehicleForm({ name: '', plate: '', type: 'Car', year: '' })
    setShowVehicleModal(true)
  }

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setVehicleForm({ name: vehicle.name, plate: vehicle.plate, type: vehicle.type, year: vehicle.year })
    setShowVehicleModal(true)
  }

  const handleDeleteVehicle = (vehicleId) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId))
    }
  }

  const handleSaveVehicle = () => {
    if (!vehicleForm.name || !vehicleForm.plate || !vehicleForm.year) {
      alert('Please fill in all fields')
      return
    }

    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? { ...v, ...vehicleForm } : v))
    } else {
      const newVehicle = { id: Date.now(), ...vehicleForm }
      setVehicles([...vehicles, newVehicle])
    }
    setShowVehicleModal(false)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage = { id: Date.now(), sender: 'user', text: chatInput, time: new Date().toLocaleTimeString() }
    setChatMessages([...chatMessages, userMessage])
    const userQuery = chatInput.toLowerCase()
    setChatInput('')

    setTimeout(() => {
      let botResponse = ''
      
      if (userQuery.includes('mechanic') || userQuery.includes('find') || userQuery.includes('near')) {
        botResponse = `I found 3 highly-rated mechanics near you:\n\n Raj Sharma (4.9) - 2.3 km away\n Priya Singh (4.8) - 3.1 km away\n Amit Patel (4.7) - 5.2 km away\n\nWould you like to request service?`
      } else if (userQuery.includes('emergency') || userQuery.includes('sos') || userQuery.includes('urgent')) {
        botResponse = ' For emergency assistance, click the red "EMERGENCY SOS" button in the header. It will immediately alert nearest mechanics and roadside assistance.'
      } else if (userQuery.includes('service') || userQuery.includes('repair') || userQuery.includes('maintenance')) {
        botResponse = `Based on your ${vehicles[0]?.name || 'vehicle'}, I recommend:\n\n Oil Change - Due in 500 km\n Tire Rotation - Overdue\n Battery Check - Good\n\nSchedule service?`
      } else if (userQuery.includes('price') || userQuery.includes('cost') || userQuery.includes('charge')) {
        botResponse = ' Our pricing:\n\n Oil Change: ?500-800\n Tire Repair: ?300-600\n Battery Check: ?200-400\n Full Service: ?2000-3500'
      } else if (userQuery.includes('vehicle') || userQuery.includes('car') || userQuery.includes('bike')) {
        botResponse = `You have ${vehicles.length} vehicle(s):\n\n${vehicles.map((v, i) => `${i + 1}. ${v.name} (${v.plate}) - ${v.year}`).join('\n')}`
      } else if (userQuery.includes('hello') || userQuery.includes('hi') || userQuery.includes('hey')) {
        botResponse = `Hello ${user?.name || 'there'}!  I'm your RepairWale AI assistant. I can help you find mechanics, schedule services, and more!`
      } else {
        botResponse = `I can help you with finding mechanics, booking services, checking history, or emergency assistance. What do you need?`
      }
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString()
      }
      setChatMessages(prev => [...prev, botMessage])
    }, 800)
  }

  const quickActions = [
    { label: 'Request Service', icon: '🚨', color: '#667eea', action: () => navigate('/service') },
    { label: 'Track Mechanic', icon: '📍', color: '#f5576c', action: () => navigate('/map') },
    { label: 'View History', icon: '📋', color: '#00f2fe', action: () => setActiveTab('history') },
    { label: 'My Vehicles', icon: '🚗', color: '#4facfe', action: () => setActiveTab('vehicles') },
    { label: 'Payment Methods', icon: '💳', color: '#ffc107', action: () => setActiveTab('payments') },
    { label: 'Saved Mechanics', icon: '⭐', color: '#4caf50', action: () => setActiveTab('favorites') }
  ]

  const savedMechanics = [
    { id: 1, name: 'Raj Sharma', rating: 4.9, services: 12, speciality: 'Engine Expert' },
    { id: 2, name: 'Priya Singh', rating: 4.8, services: 8, speciality: 'Electrical' }
  ]

  const paymentMethods = [
    { id: 1, type: 'UPI', details: 'user@paytm', default: true },
    { id: 2, type: 'Card', details: '**** **** **** 4532', default: false }
  ]

  const nearbyMechanics = [
    { id: 1, name: 'Raj Sharma', rating: 4.8, distance: '2.3 km', services: 'General Repair' },
    { id: 2, name: 'Priya Singh', rating: 4.9, distance: '3.1 km', services: 'Battery & Electrical' },
    { id: 3, name: 'Amit Patel', rating: 4.7, distance: '5.2 km', services: 'Towing & Recovery' }
  ]

  return (
    <div className="customer-dashboard-wrapper">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(255, 68, 68, 0); }
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .customer-dashboard-wrapper {
          min-height: 100vh;
          background: #0a0b0d;
          background-image: 
            radial-gradient(at 20% 30%, rgba(102, 126, 234, 0.05) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(245, 87, 108, 0.05) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(79, 172, 254, 0.03) 0px, transparent 50%);
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }

        .luxury-header {
          background: linear-gradient(180deg, rgba(20,20,22,0.95) 0%, rgba(15,15,17,0.8) 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 24px 40px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .header-content {
          max-width: 1600px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: white;
          border: 2px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .header-info h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .header-info p {
          font-size: 13px;
          color: #8b92a7;
          margin: 0;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .sos-button {
          background: linear-gradient(135deg, #ff4444, #cc0000);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          animation: pulse 2s infinite;
          box-shadow: 0 4px 16px rgba(255, 68, 68, 0.4);
          transition: all 0.3s;
        }

        .sos-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 68, 68, 0.6);
        }

        .icon-button {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 18px;
        }

        .icon-button:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        .dashboard-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          animation: fadeIn 0.6s ease-out;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--card-gradient);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--card-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          margin: 8px 0;
          letter-spacing: -1px;
        }

        .stat-label {
          font-size: 13px;
          color: #8b92a7;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-card {
          background: linear-gradient(135deg, rgba(20,20,22,0.95) 0%, rgba(15,15,17,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: fadeIn 0.6s ease-out 0.1s backwards;
        }

        .section-header {
          padding: 28px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-content {
          padding: 32px;
        }

        .tab-navigation {
          display: flex;
          gap: 8px;
          padding: 8px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          overflow-x: auto;
        }

        .tab-button {
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #8b92a7;
          font-size: 14px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .tab-button:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .quick-action-btn {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .quick-action-btn:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .quick-action-icon {
          font-size: 32px;
        }

        .quick-action-label {
          font-size: 13px;
          font-weight: 700;
          color: #d4d4d4;
        }

        .mechanics-list {
          display: grid;
          gap: 12px;
        }

        .mechanic-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
        }

        .mechanic-item:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-color: rgba(255,255,255,0.1);
        }

        .mechanic-info h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #fff;
        }

        .mechanic-info p {
          font-size: 12px;
          color: #9aa0a6;
          margin: 0;
        }

        .mechanic-rating {
          background: rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 12px;
          padding: 18px;
          text-align: center;
        }

        .stat-card.savings {
          background: linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1));
          border-color: rgba(245, 87, 108, 0.2);
        }

        .stat-card.completed {
          background: linear-gradient(135deg, rgba(64, 250, 254, 0.1), rgba(79, 172, 254, 0.1));
          border-color: rgba(79, 172, 254, 0.2);
        }

        .stat-card-number {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
        }

        .stat-card-label {
          font-size: 12px;
          color: #9aa0a6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .sidebar-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .sidebar-card:before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 140px;
          height: 140px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .sidebar-card h3 {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 16px;
          color: #fff;
          letter-spacing: -0.3px;
        }

        @media(max-width: 900px) {
          .customer-container {
            grid-template-columns: 1fr;
          }

          .customer-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .stats-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media(max-width: 640px) {
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .customer-title-group h1 {
            font-size: 28px;
          }
        }
        .quick-action-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--action-bg, rgba(102, 126, 234, 0.15));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 8px;
        }

        .quick-action-label {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sidebar-card {
          background: linear-gradient(135deg, rgba(20,20,22,0.95) 0%, rgba(15,15,17,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        .sidebar-card h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 20px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media(max-width: 1200px) {
          .dashboard-container {
            grid-template-columns: 1fr;
          }
          .stats-overview {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 640px) {
          .stats-overview {
            grid-template-columns: 1fr;
          }
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* Luxury Header */}
      <div className="luxury-header">
        <div className="header-content">
          <div className="header-left">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="header-info">
              <h1>Welcome back, {user?.name || 'Guest'}!</h1>
              <p>Premium Customer • Member since {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="sos-button" onClick={() => alert('🚨 Emergency services contacted! Help is on the way.')}>
              🆘 EMERGENCY SOS
            </button>
            <button className="icon-button" onClick={() => navigate('/user')}>
              👤
            </button>
            <button className="icon-button" onClick={() => navigate('/service')}>
              🚨
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        <div className="main-content">
          {/* Stats Overview */}
          <div className="stats-overview">
            <div className="stat-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea, #764ba2)', '--card-bg': 'rgba(102, 126, 234, 0.15)' }}>
              <div className="stat-icon">🚨</div>
              <div className="stat-value">{stats.requests}</div>
              <div className="stat-label">Active Requests</div>
            </div>
            <div className="stat-card" style={{ '--card-gradient': 'linear-gradient(135deg, #4facfe, #00f2fe)', '--card-bg': 'rgba(79, 172, 254, 0.15)' }}>
              <div className="stat-icon">✓</div>
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card" style={{ '--card-gradient': 'linear-gradient(135deg, #43e97b, #38f9d7)', '--card-bg': 'rgba(67, 233, 123, 0.15)' }}>
              <div className="stat-icon">💰</div>
              <div className="stat-value">₹{stats.savings}</div>
              <div className="stat-label">Total Savings</div>
            </div>
            <div className="stat-card" style={{ '--card-gradient': 'linear-gradient(135deg, #fa709a, #fee140)', '--card-bg': 'rgba(250, 112, 154, 0.15)' }}>
              <div className="stat-icon">🚗</div>
              <div className="stat-value">{vehicles.length}</div>
              <div className="stat-label">My Vehicles</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="section-card">
            <div className="section-header">
              <div className="tab-navigation">
                {['overview', 'requests', 'history', 'vehicles', 'favorites', 'payments'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'overview' && '📊'}
                    {tab === 'requests' && '📋'}
                    {tab === 'history' && '🕐'}
                    {tab === 'vehicles' && '🚗'}
                    {tab === 'favorites' && '⭐'}
                    {tab === 'payments' && '💳'}
                    {' '}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-content">
              {/* Active Tab Content */}
              {activeTab === 'overview' && (
                <>
                  <div className="quick-actions-grid">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        className="quick-action-btn"
                        onClick={action.action}
                        style={{ '--action-bg': `${action.color}33` }}
                      >
                        <div className="quick-action-icon" style={{ background: `${action.color}33` }}>{action.icon}</div>
                        <div className="quick-action-label">{action.label}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

          {activeTab === 'requests' && (
            <div className="customer-card">
              <h2>Active Requests</h2>
              {recentRequests.filter(r => r.status === 'in-progress').length === 0 ? (
                <p style={{ color: '#9aa0a6', fontSize: 14, margin: 0 }}>No active requests at the moment.</p>
              ) : (
                recentRequests.filter(r => r.status === 'in-progress').map(request => (
                  <div key={request.id} style={{ background: 'rgba(100,200,255,0.1)', border: '1px solid rgba(100,200,255,0.2)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <h4 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>{request.service}</h4>
                        <p style={{ color: '#9aa0a6', fontSize: 12, margin: 0 }}>with {request.mechanic}</p>
                      </div>
                      <div style={{ background: 'rgba(100,200,255,0.3)', padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: '#4cf3f4' }}>
                        In Progress
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#9aa0a6' }}>Started on {request.date}</div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="customer-card">
              <h2>Request History</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {recentRequests.map(request => (
                  <div key={request.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#fff', fontWeight: 700, margin: '0 0 4px' }}>{request.service}</h4>
                      <p style={{ color: '#9aa0a6', fontSize: 12, margin: 0 }}>{request.mechanic} • {request.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#4caf50', marginBottom: 4 }}>₹{request.amount}</div>
                      <div style={{ fontSize: 11, background: request.status === 'completed' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(100,200,255,0.2)', color: request.status === 'completed' ? '#4caf50' : '#4cf3f4', padding: '2px 8px', borderRadius: 4, textTransform: 'capitalize', fontWeight: 700 }}>
                        {request.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vehicles' && (
            <div className="customer-card">
              <h2>🚗 My Vehicles</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: 12, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <h4 style={{ color: '#fff', fontWeight: 700, margin: '0 0 6px', fontSize: 16 }}>{vehicle.name}</h4>
                        <p style={{ color: '#9aa0a6', fontSize: 13, margin: '0 0 4px' }}>{vehicle.plate}</p>
                        <p style={{ color: '#667eea', fontSize: 12, margin: 0 }}>{vehicle.type} • {vehicle.year}</p>
                      </div>
                      <div style={{ fontSize: 32 }}>{vehicle.type === 'Car' ? '🚗' : '🏍️'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleEditVehicle(vehicle)} style={{ flex: 1, background: 'rgba(102, 126, 234, 0.2)', border: '1px solid rgba(102, 126, 234, 0.3)', color: '#667eea', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteVehicle(vehicle.id)} style={{ flex: 1, background: 'rgba(255, 68, 68, 0.2)', border: '1px solid rgba(255, 68, 68, 0.3)', color: '#ff4444', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="primary" size="sm" full onClick={handleAddVehicle}>
                + Add New Vehicle
              </Button>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="customer-card">
              <h2>⭐ Saved Mechanics</h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {savedMechanics.map(mechanic => (
                  <div key={mechanic.id} style={{ background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(56, 142, 60, 0.1))', border: '1px solid rgba(76, 175, 80, 0.2)', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <h4 style={{ color: '#fff', fontWeight: 700, margin: '0 0 6px' }}>{mechanic.name}</h4>
                        <p style={{ color: '#4caf50', fontSize: 12, margin: '0 0 4px', fontWeight: 600 }}>{mechanic.speciality}</p>
                        <p style={{ color: '#9aa0a6', fontSize: 12, margin: 0 }}>{mechanic.services} services completed</p>
                      </div>
                      <div style={{ fontSize: 14, color: '#ffd700', fontWeight: 700 }}>⭐ {mechanic.rating}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      <button style={{ flex: 1, background: 'rgba(76, 175, 80, 0.2)', border: '1px solid rgba(76, 175, 80, 0.3)', color: '#4caf50', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/map')}>
                        View on Map
                      </button>
                      <button style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#9aa0a6', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        Request Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="customer-card">
              <h2>💳 Payment Methods</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                {paymentMethods.map(method => (
                  <div key={method.id} style={{ background: 'rgba(255,255,255,0.03)', border: method.default ? '2px solid rgba(255, 193, 7, 0.5)' : '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <h4 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: 14 }}>{method.type}</h4>
                          {method.default && <span style={{ background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>DEFAULT</span>}
                        </div>
                        <p style={{ color: '#9aa0a6', fontSize: 13, margin: 0 }}>{method.details}</p>
                      </div>
                      <div style={{ fontSize: 28 }}>{method.type === 'UPI' ? '📱' : '💳'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                      {!method.default && (
                        <button style={{ flex: 1, background: 'rgba(255, 193, 7, 0.2)', border: '1px solid rgba(255, 193, 7, 0.3)', color: '#ffc107', padding: '8px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                          Set as Default
                        </button>
                      )}
                      <button style={{ flex: 1, background: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244, 67, 54, 0.2)', color: '#f44336', padding: '8px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="primary" size="sm" full onClick={() => alert('Add Payment Method feature coming soon!')}>
                + Add Payment Method
              </Button>
            </div>
          )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-card">
            <h3>💳 Active Requests</h3>
            <p style={{ fontSize: 13, color: '#9aa0a6', margin: 0 }}>
              You have no active requests at the moment.
            </p>
            <Button 
              variant="primary" 
              size="sm" 
              full 
              onClick={() => navigate('/service')}
              style={{ marginTop: 16 }}
            >
              Start Now
            </Button>
          </div>

          <div className="sidebar-card" style={{ height: 500, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: 16 }}>🤖 AI Assistant</h3>
            
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16, padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{ marginBottom: 12, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  <div style={{ 
                    display: 'inline-block', 
                    maxWidth: '80%',
                    padding: '8px 12px', 
                    borderRadius: 12,
                    background: msg.sender === 'user' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.05)',
                    border: msg.sender === 'bot' ? '1px solid rgba(255,255,255,0.1)' : 'none'
                  }}>
                    <p style={{ fontSize: 13, color: '#fff', margin: '0 0 4px', lineHeight: 1.5 }}>{msg.text}</p>
                    <p style={{ fontSize: 10, color: '#9aa0a6', margin: 0 }}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                style={{ 
                  flex: 1, 
                  padding: '10px 14px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8, 
                  color: '#fff', 
                  fontSize: 13 
                }}
              />
              <button 
                onClick={handleSendMessage}
                style={{ 
                  padding: '10px 16px', 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  border: 'none', 
                  borderRadius: 8, 
                  color: '#fff', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  fontSize: 18
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVehicleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'linear-gradient(180deg, #1a1a1b 0%, #0f0f10 100%)', borderRadius: 16, padding: 32, maxWidth: 500, width: '90%', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 800, marginBottom: 24 }}>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Vehicle Name</label>
              <input 
                type="text" 
                value={vehicleForm.name}
                onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                placeholder="e.g., Honda City"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Plate Number</label>
              <input 
                type="text" 
                value={vehicleForm.plate}
                onChange={(e) => setVehicleForm({ ...vehicleForm, plate: e.target.value })}
                placeholder="e.g., DL-01-XX-1234"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Type</label>
              <select 
                value={vehicleForm.type}
                onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 6, fontWeight: 600 }}>Year</label>
              <input 
                type="number" 
                value={vehicleForm.year}
                onChange={(e) => setVehicleForm({ ...vehicleForm, year: e.target.value })}
                placeholder="e.g., 2020"
                style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 14 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                onClick={handleSaveVehicle}
                style={{ flex: 1, background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', color: '#fff', padding: '12px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                {editingVehicle ? 'Update' : 'Add'} Vehicle
              </button>
              <button 
                onClick={() => setShowVehicleModal(false)}
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#9aa0a6', padding: '12px', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
