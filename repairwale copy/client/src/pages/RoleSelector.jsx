import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function RoleSelector() {
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [isSignup, setIsSignup] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' })

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password || (isSignup && !loginForm.name)) {
      alert('Please fill in all fields')
      return
    }

    sessionStorage.setItem('userRole', selectedRole.id)
    sessionStorage.setItem('userAuth', 'true')
    localStorage.setItem('repairwale_user', JSON.stringify({ 
      email: loginForm.email, 
      name: loginForm.name || loginForm.email.split('@')[0],
      role: selectedRole.id 
    }))
    
    const dashboardRoute = `/${selectedRole.id}-dashboard`
    navigate(dashboardRoute)
  }

  const roles = [
    {
      id: 'customer',
      icon: '👤',
      title: 'Customer',
      subtitle: 'Need vehicle assistance?',
      description: 'Request roadside help, browse mechanics, track repairs, and manage your vehicle services in one place.',
      features: ['Quick assistance', 'Track mechanics', 'View history', 'Secure payments'],
      cta: 'Continue as Customer',
      action: () => {
        setSelectedRole(roles[0])
        setShowLoginModal(true)
      },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'mechanic',
      icon: '🔧',
      title: 'Mechanic',
      subtitle: 'Offer your expertise?',
      description: 'Join our network of certified professionals. Receive customer requests, manage your schedule, and grow your business.',
      features: ['Get requests', 'Manage schedule', 'Track earnings', 'Build reputation'],
      cta: 'Continue as Mechanic',
      action: () => {
        setSelectedRole(roles[1])
        setShowLoginModal(true)
      },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'garage',
      icon: '🏢',
      title: 'Garage/Workshop',
      subtitle: 'Expand your services?',
      description: 'Partner with us to reach more customers. Manage multiple mechanics, track jobs, and scale your operations efficiently.',
      features: ['Team management', 'Analytics dashboard', 'Bulk operations', 'API access'],
      cta: 'Continue as Garage',
      action: () => {
        setSelectedRole(roles[2])
        setShowLoginModal(true)
      },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ]

  return (
    <div className="role-selector-wrapper">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        
        .role-selector-wrapper {
          min-height: 100vh;
          background: linear-gradient(180deg, #080809 0%, #0f0f10 100%);
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .role-selector-container {
          max-width: 1200px;
          width: 100%;
          animation: slideIn 0.6s ease-out;
        }

        .role-selector-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .role-selector-header h1 {
          font-size: 54px;
          font-weight: 900;
          margin: 0 0 18px;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #fff, #bdbdbd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .role-selector-header p {
          font-size: 18px;
          color: #9aa0a6;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .role-selector-subtitle {
          font-size: 14px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #9aa0a6;
          margin-bottom: 12px;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
          margin-top: 60px;
        }

        .role-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px 32px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .role-card:nth-child(1) { animation-delay: 0.1s; }
        .role-card:nth-child(2) { animation-delay: 0.2s; }
        .role-card:nth-child(3) { animation-delay: 0.3s; }

        .role-card:before {
          content: '';
          position: absolute;
          top: -140px;
          right: -140px;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .role-card:hover {
          transform: translateY(-12px);
          border-color: rgba(255,255,255,0.15);
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .role-card-icon {
          font-size: 56px;
          margin-bottom: 24px;
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .role-card-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 8px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .role-card-subtitle {
          font-size: 14px;
          color: #9aa0a6;
          margin: 0 0 16px;
          font-weight: 600;
        }

        .role-card-description {
          font-size: 15px;
          color: #d4d4d4;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        .role-card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: grid;
          gap: 12px;
        }

        .role-card-features li {
          font-size: 13px;
          color: #9aa0a6;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .role-card-features li:before {
          content: '✓';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          flex-shrink: 0;
          font-weight: 700;
          font-size: 12px;
        }

        .role-card-cta {
          display: block;
          width: 100%;
        }

        .role-card-highlight {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 24px 24px 0 0;
          opacity: 0.6;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .hero-section h2 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -0.5px;
        }

        .hero-section p {
          font-size: 14px;
          color: #9aa0a6;
          margin: 0;
        }

        @media(max-width: 768px) {
          .role-selector-header h1 {
            font-size: 36px;
          }

          .role-selector-header p {
            font-size: 15px;
          }

          .roles-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .role-card {
            padding: 32px 24px;
          }

          .role-card-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="role-selector-container">
        <div className="role-selector-header">
          <p className="role-selector-subtitle">Welcome to RepairWale</p>
          <h1>Choose Your Role</h1>
          <p>Join as a customer, mechanic, or garage. Find the perfect fit for your needs and start today.</p>
        </div>

        <div className="roles-grid">
          {roles.map((role) => (
            <div key={role.id} className="role-card">
              <div className="role-card-highlight" style={{ background: role.gradient }} />
              <div className="role-card-icon">{role.icon}</div>
              <h3 className="role-card-title">{role.title}</h3>
              <p className="role-card-subtitle">{role.subtitle}</p>
              <p className="role-card-description">{role.description}</p>
              
              <ul className="role-card-features">
                {role.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <Button 
                className="role-card-cta"
                variant="primary" 
                size="md"
                onClick={role.action}
              >
                {role.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="hero-section" style={{marginTop: 80}}>
          <h2>One Platform, Multiple Opportunities</h2>
          <p>Whether you're looking for help or want to offer your services, RepairWale connects you with the right people.</p>
        </div>
      </div>

      {showLoginModal && selectedRole && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'linear-gradient(180deg, #1a1a1b 0%, #0f0f10 100%)', borderRadius: 20, padding: 40, maxWidth: 480, width: '90%', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{selectedRole.icon}</div>
              <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
              <p style={{ color: '#9aa0a6', fontSize: 14 }}>Continue as {selectedRole.title}</p>
            </div>
            
            {isSignup && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 8, fontWeight: 600 }}>Full Name</label>
                <input 
                  type="text" 
                  value={loginForm.name}
                  onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 15 }}
                />
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 8, fontWeight: 600 }}>Email Address</label>
              <input 
                type="email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="Enter your email"
                style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 15 }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#9aa0a6', fontSize: 13, display: 'block', marginBottom: 8, fontWeight: 600 }}>Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter your password"
                style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 15 }}
              />
            </div>

            <button 
              onClick={handleLogin}
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: selectedRole.gradient, 
                border: 'none', 
                borderRadius: 10, 
                color: '#fff', 
                fontSize: 15, 
                fontWeight: 700, 
                cursor: 'pointer',
                marginBottom: 16
              }}
            >
              {isSignup ? 'Create Account' : 'Login'} & Continue
            </button>

            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setIsSignup(!isSignup)}
                style={{ background: 'none', border: 'none', color: '#667eea', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {isSignup ? 'Already have an account? Login' : 'New here? Create Account'}
              </button>
            </div>

            <button 
              onClick={() => setShowLoginModal(false)}
              style={{ 
                position: 'absolute', 
                top: 20, 
                right: 20, 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#9aa0a6', 
                width: 36, 
                height: 36, 
                borderRadius: 8, 
                fontSize: 18, 
                cursor: 'pointer' 
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
