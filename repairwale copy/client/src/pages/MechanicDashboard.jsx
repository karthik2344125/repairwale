import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function MechanicDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userAuth')
    const userRole = sessionStorage.getItem('userRole')
    
    if (!isAuthenticated || userRole !== 'mechanic') {
      navigate('/')
      return
    }
  }, [])
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState('requests')
  const [stats, setStats] = useState({
    pending: 3,
    completed: 127,
    rating: 4.8,
    earnings: 45200
  })

  const handleAcceptJob = (jobId) => {
    alert(`Job ${jobId} accepted! You're now assigned to this request.`)
    // In a real app, this would update the backend
  }

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
    alert(isOnline ? 'You are now offline' : 'You are now online and accepting requests')
  }

  const jobRequests = [
    { 
      id: 1, 
      customer: 'Arjun Sharma', 
      service: 'Engine Oil Change', 
      distance: '1.2 km',
      time: '20 mins',
      pay: '₹500',
      status: 'new'
    },
    { 
      id: 2, 
      customer: 'Neha Gupta', 
      service: 'Brake Pad Replacement', 
      distance: '2.8 km',
      time: '45 mins',
      pay: '₹1,200',
      status: 'new'
    },
    { 
      id: 3, 
      customer: 'Vishal Kumar', 
      service: 'Battery Replacement', 
      distance: '3.5 km',
      time: '30 mins',
      pay: '₹2,800',
      status: 'new'
    }
  ]

  const activeJobs = [
    { id: 101, customer: 'Priya Singh', service: 'General Service', progress: 75, eta: '15 mins' },
    { id: 102, customer: 'Rahul Patel', service: 'AC Recharge', progress: 45, eta: '25 mins' }
  ]

  const recentReviews = [
    { customer: 'Ankit Roy', rating: 5, comment: 'Excellent service, very professional!' },
    { customer: 'Sanjana Nair', rating: 5, comment: 'Quick and reliable. Highly recommended!' },
    { customer: 'Vikram Singh', rating: 4, comment: 'Good work. Minor delay but overall satisfied.' }
  ]

  return (
    <div className="mechanic-dashboard-wrapper">
      <style>{`
        .mechanic-dashboard-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, #080809 0%, #0f0f10 100%);
          padding: 40px 20px;
        }

        .mechanic-header {
          max-width: 1400px;
          margin: 0 auto 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .mechanic-title-group h1 {
          font-size: 36px;
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: -0.8px;
          color: #fff;
        }

        .mechanic-title-group p {
          font-size: 14px;
          color: #9aa0a6;
          margin: 0;
        }

        .mechanic-header-actions {
          display: flex;
          gap: 12px;
        }

        .mechanic-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
        }

        .mechanic-main {
          display: grid;
          gap: 28px;
        }

        .mechanic-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .mechanic-card:before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .mechanic-card h2 {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 24px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(245, 87, 108, 0.1), rgba(255, 159, 124, 0.1));
          border: 1px solid rgba(245, 87, 108, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .stat-card.completed {
          background: linear-gradient(135deg, rgba(64, 250, 254, 0.1), rgba(79, 172, 254, 0.1));
          border-color: rgba(79, 172, 254, 0.2);
        }

        .stat-card.rating {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
          border-color: rgba(255, 193, 7, 0.2);
        }

        .stat-card.earnings {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(56, 142, 60, 0.1));
          border-color: rgba(76, 175, 80, 0.2);
        }

        .stat-card-number {
          font-size: 28px;
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

        .job-request-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(245, 87, 108, 0.2);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
        }

        .job-request-item:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-color: rgba(245, 87, 108, 0.3);
        }

        .job-request-info h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #fff;
        }

        .job-request-info p {
          font-size: 12px;
          color: #9aa0a6;
          margin: 0;
        }

        .job-request-meta {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .job-badge {
          background: rgba(245, 87, 108, 0.2);
          color: #ff5757;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .job-pay {
          font-size: 14px;
          font-weight: 800;
          color: #4caf50;
          min-width: 80px;
          text-align: right;
        }

        .job-accept-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .job-accept-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .active-job-item {
          background: linear-gradient(135deg, rgba(64, 250, 254, 0.05), rgba(79, 172, 254, 0.05));
          border: 1px solid rgba(64, 250, 254, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .active-job-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .active-job-name {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .active-job-eta {
          font-size: 12px;
          color: #4cf3f4;
          font-weight: 600;
        }

        .progress-bar {
          background: rgba(255,255,255,0.1);
          height: 6px;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          background: linear-gradient(90deg, #4cf3f4, #00f2fe);
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s;
        }

        .review-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .review-name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
        }

        .review-rating {
          color: #ffd700;
          font-size: 12px;
        }

        .review-text {
          font-size: 12px;
          color: #9aa0a6;
          line-height: 1.5;
          margin: 0;
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

        .availability-toggle {
          display: flex;
          gap: 8px;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.02);
          color: #9aa0a6;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-color: #667eea;
          color: #fff;
        }

        @media(max-width: 1200px) {
          .mechanic-container {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 640px) {
          .mechanic-title-group h1 {
            font-size: 28px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .job-request-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .job-request-meta {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="mechanic-header">
        <div className="mechanic-title-group">
          <h1>🔧 Mechanic Dashboard</h1>
          <p>Manage your jobs and grow your business</p>
        </div>
        <div className="mechanic-header-actions">
          <Button variant="ghost" size="sm" onClick={() => navigate('/user')}>
            Profile
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setIsOnline(!isOnline)}
            style={{ background: isOnline ? 'rgba(76, 175, 80, 0.3)' : 'rgba(158, 158, 158, 0.3)' }}
          >
            {isOnline ? '🟢 Online' : '⚫ Offline'}
          </Button>
        </div>
      </div>

      <div className="mechanic-container">
        <div className="mechanic-main">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-number">{stats.pending}</div>
              <div className="stat-card-label">Pending Jobs</div>
            </div>
            <div className="stat-card completed">
              <div className="stat-card-number">{stats.completed}</div>
              <div className="stat-card-label">Jobs Completed</div>
            </div>
            <div className="stat-card rating">
              <div className="stat-card-number">{stats.rating}</div>
              <div className="stat-card-label">Rating (⭐)</div>
            </div>
            <div className="stat-card earnings">
              <div className="stat-card-number">₹{(stats.earnings / 1000).toFixed(0)}K</div>
              <div className="stat-card-label">This Month</div>
            </div>
          </div>

          {/* New Job Requests */}
          <div className="mechanic-card">
            <h2>🔴 New Job Requests ({jobRequests.length})</h2>
            {jobRequests.map((job) => (
              <div key={job.id} className="job-request-item">
                <div className="job-request-info">
                  <h4>{job.customer}</h4>
                  <p>{job.service} • {job.distance} • {job.time}</p>
                </div>
                <div className="job-request-meta">
                  <div className="job-pay">{job.pay}</div>
                  <button 
                    className="job-accept-btn"
                    onClick={() => handleAcceptJob(job.id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Active Jobs */}
          <div className="mechanic-card">
            <h2>⚡ Active Jobs ({activeJobs.length})</h2>
            {activeJobs.map((job) => (
              <div key={job.id} className="active-job-item">
                <div className="active-job-header">
                  <div className="active-job-name">{job.customer}</div>
                  <div className="active-job-eta">ETA: {job.eta}</div>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9aa0a6', margin: '0 0 8px' }}>
                    {job.service}
                  </p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                  <p style={{ fontSize: 11, color: '#9aa0a6', margin: 0 }}>
                    {job.progress}% Complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-card">
            <h3>📍 Availability</h3>
            <div className="availability-toggle">
              <button 
                className={`toggle-btn ${isOnline ? 'active' : ''}`}
                onClick={handleToggleOnline}
              >
                Online
              </button>
              <button 
                className={`toggle-btn ${!isOnline ? 'active' : ''}`}
                onClick={handleToggleOnline}
              >
                Offline
              </button>
            </div>
            <p style={{ fontSize: 12, color: '#9aa0a6', margin: '16px 0 0' }}>
              You're currently {isOnline ? 'accepting' : 'not accepting'} new jobs
            </p>
          </div>

          <div className="sidebar-card">
            <h3>⭐ Recent Reviews</h3>
            {recentReviews.map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <div className="review-name">{review.customer}</div>
                  <div className="review-rating">{'⭐'.repeat(review.rating)}</div>
                </div>
                <p className="review-text">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="sidebar-card">
            <h3>📊 Quick Stats</h3>
            <div style={{ fontSize: 13, color: '#9aa0a6', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 8px' }}>
                <strong style={{ color: '#4caf50' }}>Acceptance Rate:</strong> 94%
              </p>
              <p style={{ margin: '0 0 8px' }}>
                <strong style={{ color: '#2196f3' }}>Avg Response:</strong> 2 mins
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#ff9800' }}>On-time Rate:</strong> 98%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
