import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function GarageDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('userAuth')
    const userRole = sessionStorage.getItem('userRole')
    
    if (!isAuthenticated || userRole !== 'garage') {
      navigate('/')
      return
    }
  }, [])
  const [stats, setStats] = useState({
    team: 8,
    revenue: 156800,
    jobsCompleted: 342,
    rating: 4.7
  })

  const teamMembers = [
    { id: 1, name: 'Raj Sharma', role: 'Senior Mechanic', rating: 4.9, jobs: 87, status: 'active' },
    { id: 2, name: 'Priya Singh', role: 'Electrical Specialist', rating: 4.8, jobs: 65, status: 'active' },
    { id: 3, name: 'Amit Patel', role: 'General Mechanic', rating: 4.6, jobs: 54, status: 'active' },
    { id: 4, name: 'Vikram Kumar', role: 'Trainee', rating: 4.3, jobs: 23, status: 'offline' }
  ]

  const partnerships = [
    { id: 1, name: 'AutoCare Plus', type: 'Parts Supplier', status: 'active', since: 'Jan 2024' },
    { id: 2, name: 'Quick Towing Co.', type: 'Towing Partner', status: 'active', since: 'Mar 2024' },
    { id: 3, name: 'Wheel Specialists', type: 'Tire & Wheels', status: 'pending', since: 'Requested' }
  ]

  const pendingRequests = [
    { id: 1, customer: 'Arjun Singh', service: 'Full Service', assigned: 'Not Assigned', priority: 'high' },
    { id: 2, customer: 'Neha Gupta', service: 'AC Repair', assigned: 'Raj Sharma', priority: 'medium' },
    { id: 3, customer: 'Vishal Kumar', service: 'Diagnostics', assigned: 'Not Assigned', priority: 'high' }
  ]

  return (
    <div className="garage-dashboard-wrapper">
      <style>{`
        .garage-dashboard-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, #080809 0%, #0f0f10 100%);
          padding: 40px 20px;
        }

        .garage-header {
          max-width: 1400px;
          margin: 0 auto 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .garage-title-group h1 {
          font-size: 36px;
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: -0.8px;
          color: #fff;
        }

        .garage-title-group p {
          font-size: 14px;
          color: #9aa0a6;
          margin: 0;
        }

        .garage-header-actions {
          display: flex;
          gap: 12px;
        }

        .garage-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 28px;
        }

        .garage-main {
          display: grid;
          gap: 28px;
        }

        .garage-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .garage-card:before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .garage-card h2 {
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
          background: linear-gradient(135deg, rgba(64, 250, 254, 0.1), rgba(79, 172, 254, 0.1));
          border: 1px solid rgba(64, 250, 254, 0.2);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
        }

        .stat-card.revenue {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(56, 142, 60, 0.1));
          border-color: rgba(76, 175, 80, 0.2);
        }

        .stat-card.jobs {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
          border-color: rgba(255, 193, 7, 0.2);
        }

        .stat-card.rating {
          background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(233, 30, 99, 0.1));
          border-color: rgba(244, 67, 54, 0.2);
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

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .team-member-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.2s;
        }

        .team-member-card:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border-color: rgba(255,255,255,0.1);
        }

        .team-member-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .team-member-info h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          color: #fff;
        }

        .team-member-role {
          font-size: 12px;
          color: #9aa0a6;
          margin: 2px 0 0;
        }

        .team-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .team-status-badge.active {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }

        .team-status-badge.offline {
          background: rgba(158, 158, 158, 0.2);
          color: #9e9e9e;
        }

        .team-member-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #9aa0a6;
          padding: 8px 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          margin-bottom: 8px;
        }

        .team-member-stat {
          text-align: center;
          flex: 1;
        }

        .team-member-stat-value {
          display: block;
          font-weight: 700;
          color: #fff;
          font-size: 14px;
        }

        .partnership-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .partnership-info h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 4px;
          color: #fff;
        }

        .partnership-info p {
          font-size: 12px;
          color: #9aa0a6;
          margin: 0;
        }

        .partnership-badge {
          background: rgba(100, 200, 255, 0.2);
          color: #64c8ff;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }

        .partnership-badge.pending {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        .request-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
        }

        .request-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .request-customer {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .request-priority {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .request-priority.high {
          background: rgba(244, 67, 54, 0.2);
          color: #ff6b6b;
        }

        .request-priority.medium {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        .request-details {
          font-size: 12px;
          color: #9aa0a6;
          margin: 6px 0;
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

        .action-btn-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .action-btn {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px;
          font-size: 12px;
          font-weight: 700;
          color: #d4d4d4;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .action-btn:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          border-color: rgba(255,255,255,0.12);
          color: #fff;
        }

        @media(max-width: 1200px) {
          .garage-container {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 640px) {
          .garage-title-group h1 {
            font-size: 28px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="garage-header">
        <div className="garage-title-group">
          <h1>🏢 Garage Dashboard</h1>
          <p>Manage your garage, team & partnerships</p>
        </div>
        <div className="garage-header-actions">
          <Button variant="ghost" size="sm" onClick={() => navigate('/user')}>
            Settings
          </Button>
          <Button variant="primary" size="sm" onClick={() => {}}>
            Add Team Member
          </Button>
        </div>
      </div>

      <div className="garage-container">
        <div className="garage-main">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-number">{stats.team}</div>
              <div className="stat-card-label">Team Members</div>
            </div>
            <div className="stat-card revenue">
              <div className="stat-card-number">₹{(stats.revenue / 1000).toFixed(0)}K</div>
              <div className="stat-card-label">Monthly Revenue</div>
            </div>
            <div className="stat-card jobs">
              <div className="stat-card-number">{stats.jobsCompleted}</div>
              <div className="stat-card-label">Jobs Completed</div>
            </div>
            <div className="stat-card rating">
              <div className="stat-card-number">{stats.rating}</div>
              <div className="stat-card-label">Rating (⭐)</div>
            </div>
          </div>

          {/* Team Members */}
          <div className="garage-card">
            <h2>👥 Team Members ({teamMembers.length})</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-card">
                  <div className="team-member-header">
                    <div className="team-member-info">
                      <h4>{member.name}</h4>
                      <p className="team-member-role">{member.role}</p>
                    </div>
                    <span className={`team-status-badge ${member.status}`}>
                      {member.status === 'active' ? '●' : '○'} {member.status}
                    </span>
                  </div>
                  <div className="team-member-stats">
                    <div className="team-member-stat">
                      <span className="team-member-stat-value">{member.jobs}</span>
                      <span>Jobs</span>
                    </div>
                    <div className="team-member-stat">
                      <span className="team-member-stat-value">⭐{member.rating}</span>
                      <span>Rating</span>
                    </div>
                  </div>
                  <button className="action-btn" onClick={() => {}}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div className="garage-card">
            <h2>🤝 Partnerships & Tie-ups</h2>
            {partnerships.map((partner) => (
              <div key={partner.id} className="partnership-item">
                <div className="partnership-info">
                  <h4>{partner.name}</h4>
                  <p>{partner.type} • Since {partner.since}</p>
                </div>
                <span className={`partnership-badge ${partner.status}`}>
                  {partner.status.toUpperCase()}
                </span>
              </div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              full 
              onClick={() => {}}
              style={{ marginTop: 16 }}
            >
              Browse Partnerships →
            </Button>
          </div>

          {/* Pending Requests */}
          <div className="garage-card">
            <h2>📋 Pending Requests</h2>
            {pendingRequests.map((request) => (
              <div key={request.id} className="request-item">
                <div className="request-header">
                  <div className="request-customer">{request.customer}</div>
                  <span className={`request-priority ${request.priority}`}>
                    {request.priority}
                  </span>
                </div>
                <div className="request-details">
                  Service: {request.service}
                </div>
                <div className="request-details">
                  Assigned: {request.assigned}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-card">
            <h3>🎯 Performance</h3>
            <div style={{ fontSize: 13, color: '#9aa0a6', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 8px' }}>
                <strong style={{ color: '#4caf50' }}>Efficiency:</strong> 94%
              </p>
              <p style={{ margin: '0 0 8px' }}>
                <strong style={{ color: '#2196f3' }}>Avg Response:</strong> 3 mins
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#ff9800' }}>Completion Rate:</strong> 97%
              </p>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>⚙️ Quick Actions</h3>
            <div className="action-btn-group">
              <button className="action-btn">📊 View Analytics</button>
              <button className="action-btn">💰 Payment Requests</button>
              <button className="action-btn">📝 Manage Services</button>
              <button className="action-btn">👤 Team Invitations</button>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📢 Announcements</h3>
            <p style={{ fontSize: 12, color: '#9aa0a6', margin: '0 0 12px', lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>New Feature:</strong> Team analytics now available!
            </p>
            <p style={{ fontSize: 12, color: '#9aa0a6', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: '#fff' }}>Update:</strong> Bulk assign jobs feature live.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
