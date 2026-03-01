import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  {
    id: 'customer',
    icon: '👤',
    title: 'Customer',
    subtitle: 'Need vehicle assistance?',
    description: 'Request roadside help, browse mechanics, track repairs, and manage your vehicle services in one place.',
    features: ['SOS dispatch in minutes', 'Live tracking updates', 'Digital payments & invoices', 'Full history & notes'],
    accent: '#6dd5ed',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    darkGradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
  },
  {
    id: 'mechanic',
    icon: '🔧',
    title: 'Mechanic',
    subtitle: 'Offer your expertise?',
    description: 'Join our network of certified professionals. Receive customer requests, manage your schedule, and grow your business.',
    features: ['Instant leads near you', 'Smart scheduling', 'Transparent payouts', 'Build public reputation'],
    accent: '#f093fb',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    darkGradient: 'linear-gradient(135deg, #ec4899, #dc2626)',
  }
]

export default function RoleSelection() {
  const navigate = useNavigate()
  const { isAuthenticated, selectRole } = useAuth()
  const isDistFileEntry = typeof window !== 'undefined' && window.location.protocol === 'file:'
  const [selectedRole, setSelectedRole] = useState(isDistFileEntry ? 'customer' : null)
  const [loading, setLoading] = useState(false)

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
    
    console.log('🎯 Role selected:', roleId)
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
      console.log('✅ Role saved, redirecting to login')
      navigate('/login', { replace: true })
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
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
          color: #f1f5f9;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-subtitle {
          font-size: 16px;
          color: #94a3b8;
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
          background: #1e293b;
          border: 1px solid #334155;
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
          background: var(--gradient, linear-gradient(135deg, #3b82f6, #8b5cf6));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .role-card:hover {
          border-color: #475569;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .role-card:hover::before {
          opacity: 1;
        }

        .role-card.selected {
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
          box-shadow: 0 0 24px rgba(59, 130, 246, 0.2);
        }

        .role-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: inline-block;
        }

        .role-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 8px;
        }

        .role-card-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .role-card-description {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .role-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 0;
          border-top: 1px solid #334155;
          border-bottom: 1px solid #334155;
          margin-bottom: 20px;
        }

        .role-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
        }

        .role-feature::before {
          content: '✓';
          color: #10b981;
          font-weight: bold;
          flex-shrink: 0;
        }

        .role-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: var(--gradient, linear-gradient(135deg, #3b82f6, #8b5cf6));
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .role-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
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
          <h1 className="role-title">Welcome to RepairWale</h1>
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
          background: '#1e293b',
          borderRadius: '8px',
          border: '1px solid #334155'
        }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>
            Each role gets a personalized dashboard with features tailored for you.
          </p>
          <p style={{
            color: '#64748b',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: '500',
            margin: 0
          }}>
            You can switch roles anytime from your account settings.
          </p>
        </div>
      </div>

      <style>{`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        [style*="background: '#0f172a'"],
        [style*="background:#0f172a"] {
          background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
        }

        /* Role Cards */
        [style*="borderRadius: 24"][style*="padding: 32"] {
          background: linear-gradient(135deg, #0F1728 0%, #162844 100%) !important;
          border: 2px solid #2A4368 !important;
          box-shadow: 0 8px 32px rgba(74, 158, 255, 0.1) !important;
          position: relative !important;
          overflow: hidden !important;
        }

        [style*="borderRadius: 24"][style*="padding: 32"]::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 4px !important;
          background: linear-gradient(90deg, transparent, #4A9EFF, transparent) !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
        }

        [style*="borderRadius: 24"][style*="padding: 32"]:hover::before {
          opacity: 1 !important;
        }

        [style*="borderRadius: 24"][style*="padding: 32"]:hover {
          border-color: #4A9EFF !important;
          box-shadow: 0 12px 48px rgba(74, 158, 255, 0.1) !important;
          transform: translateY(-8px) !important;
        }

        /* Role Buttons */
        [style*="background: 'linear-gradient(135deg, #4facfe"],
        [style*="background: 'linear-gradient(135deg, #f093fb"] {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          box-shadow: 0 4px 16px rgba(74, 158, 255, 0.18) !important;
        }

        /* Title Heading */
        [style*="fontSize: '48px'"] {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          filter: drop-shadow(0 4px 16px rgba(74, 158, 255, 0.18)) !important;
        }

        /* Feature Items */
        [style*="fontSize: '14px'"][style*="color: '#cbd5e1'"] {
          color: #E6EDF7 !important;
        }

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
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}
