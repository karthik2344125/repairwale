import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ensureDefaults } from '../services/roleData'
import BrandLogo from '../components/BrandLogo'

const ROLES = [
  {
    id: 'customer',
    icon: '👤',
    title: 'Customer',
    subtitle: 'Need vehicle assistance?',
    description: 'Request roadside help, browse mechanics, track repairs, and manage your vehicle services in one place.',
    features: ['SOS dispatch in minutes', 'Live tracking updates', 'Digital payments & invoices', 'Full history & notes'],
    accent: '#0B1F3B',
    gradient: 'linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%)',
    darkGradient: 'linear-gradient(135deg, #0B1F3B, #0B1F3B)',
  },
  {
    id: 'mechanic',
    icon: '🔧',
    title: 'Mechanic',
    subtitle: 'Offer your expertise?',
    description: 'Join our network of certified professionals. Receive customer requests, manage your schedule, and grow your business.',
    features: ['Instant leads near you', 'Smart scheduling', 'Transparent payouts', 'Build public reputation'],
    accent: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)',
    darkGradient: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
  }
]

export default function RoleSelection() {
  const navigate = useNavigate()
  const { isAuthenticated, login, selectRole } = useAuth()
  const isDistFileEntry = typeof window !== 'undefined' && window.location.protocol === 'file:'
  const [selectedRole, setSelectedRole] = useState(isDistFileEntry ? 'customer' : null)
  const [loading, setLoading] = useState(false)

  const goToDashboard = (roleId) => {
    if (roleId === 'mechanic') {
      navigate('/mechanic/dashboard', { replace: true })
    } else {
      navigate('/customer', { replace: true })
    }
  }

  const startDemoSession = async (roleId) => {
    if (loading) return

    setSelectedRole(roleId)
    setLoading(true)

    try {
      localStorage.removeItem('repairwale_token')
      localStorage.removeItem('repairwale_user')
      localStorage.removeItem('rw_role_locked')
      localStorage.setItem('rw_demo_mode', roleId)

      const demoName = roleId === 'mechanic' ? 'Demo Mechanic' : 'Demo Customer'
      const demoEmail = roleId === 'mechanic' ? 'mechanic@repairwale.demo' : 'customer@repairwale.demo'

      login(demoEmail, 'demo123', demoName)
      await selectRole(roleId)
      ensureDefaults(roleId)
      goToDashboard(roleId)
    } catch (error) {
      console.error('Demo session failed:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if user already selected role and is authenticated
  useEffect(() => {
    if (isDistFileEntry) return

    const storedRole = localStorage.getItem('rw_role_locked')
    if (isAuthenticated && storedRole) {
      // User is authenticated and has role, redirect to appropriate page
      if (storedRole === 'mechanic') {
        navigate('/mechanic/dashboard', { replace: true })
      } else if (storedRole === 'customer') {
        navigate('/customer', { replace: true })
      }
    }
  }, [isAuthenticated, navigate, isDistFileEntry])

  const handleRoleSelect = async (roleId) => {
    if (loading) return // Prevent double-clicks
    
    console.log('Role selected:', roleId)
    setSelectedRole(roleId)
    setLoading(true)

    // Store role selection in localStorage (pre-authentication)
    localStorage.setItem('rw_role_locked', roleId)
    
    // If user is already authenticated, set role in context
    if (isAuthenticated) {
      await selectRole(roleId)
      // Navigate to appropriate page based on role
      if (roleId === 'mechanic') {
        navigate('/mechanic/dashboard', { replace: true })
      } else {
        navigate('/customer', { replace: true })
      }
    } else {
      // User not authenticated yet, send to login
      console.log('Role saved, redirecting to login')
      navigate('/login', { replace: true })
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0B1F3B',
      padding: '48px 20px 80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .role-container {
          width: 100%;
          max-width: 1200px;
          animation: fadeInUp 0.5s ease-out;
        }

        .role-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .role-title {
          font-size: 40px;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #0B1F3B, #0B1F3B);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-subtitle {
          font-size: 16px;
          color: #FFFFFF;
          max-width: 500px;
          margin: 0 auto;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .role-card {
          background: #0B1F3B;
          border: 1px solid #0B1F3B;
          border-radius: 12px;
          padding: 32px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .role-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient, linear-gradient(135deg, #0B1F3B, #0B1F3B));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .role-card:hover {
          border-color: #FFFFFF;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }

        .role-card:hover::before {
          opacity: 1;
        }

        .role-card.selected {
          border-color: #0B1F3B;
          background: linear-gradient(135deg, rgba(29,99,255,0.8), rgba(29,99,255,0.8));
          box-shadow: 0 0 24px rgba(29,99,255,0.2);
        }

        .role-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.24);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 16px;
          background: #0B1F3B;
        }

        .role-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .role-card-subtitle {
          font-size: 13px;
          color: #FFFFFF;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .role-card-description {
          font-size: 14px;
          color: #FFFFFF;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .role-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 0;
          border-top: 1px solid #0B1F3B;
          border-bottom: 1px solid #0B1F3B;
          margin-bottom: 20px;
        }

        .role-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #FFFFFF;
        }

        .role-feature::before {
          content: '✓';
          color: #FFFFFF;
          font-weight: bold;
          flex-shrink: 0;
        }

        .role-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: var(--gradient, linear-gradient(135deg, #0B1F3B, #0B1F3B));
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .role-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        }

        .role-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .role-btn.loading {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .role-title {
            font-size: 28px;
          }

          .roles-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .role-card {
            padding: 24px 16px;
          }
        }
      `}</style>

      <div className="role-container">
        {/* Header */}
        <div className="role-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <BrandLogo size="md" />
          </div>
          <h1 className="role-title">Welcome to Repairwale</h1>
          <p className="role-subtitle">
            Choose your role to get started. You'll login or create an account in the next step.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="roles-grid">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              style={{ '--gradient': role.gradient }}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="role-icon">{role.icon}</div>
              <h3 className="role-card-title">{role.title}</h3>
              <p className="role-card-subtitle">{role.subtitle}</p>
              <p className="role-card-description">{role.description}</p>

              <div className="role-features">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="role-feature">
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={`role-btn ${selectedRole === role.id && loading ? 'loading' : ''}`}
                style={{ background: role.gradient }}
                disabled={loading && selectedRole !== role.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleRoleSelect(role.id)
                }}
              >
                {selectedRole === role.id && loading ? 'Setting up...' : `Continue as ${role.title}`}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#0B1F3B',
          borderRadius: '8px',
          border: '1px solid #0B1F3B'
        }}>
          <p style={{ fontSize: '13px', color: '#FFFFFF', margin: '0 0 8px 0' }}>
            Each role gets a personalized dashboard with features tailored for you.
          </p>
          <p style={{
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: '500',
            margin: 0
          }}>
            You can switch roles anytime from your account settings.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => startDemoSession('customer')}
              disabled={loading}
              style={{
                padding: '10px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 206, 50, 0.6)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Launch Customer Demo
            </button>
            <button
              type="button"
              onClick={() => startDemoSession('mechanic')}
              disabled={loading}
              style={{
                padding: '10px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 206, 50, 0.6)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Launch Mechanic Demo
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}


