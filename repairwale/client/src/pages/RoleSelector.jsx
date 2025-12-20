import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function RoleSelector() {
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [isSignup, setIsSignup] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' })

  // Optional: Check if user is already authenticated
  React.useEffect(() => {
    // Allow users to logout and return to role selector by clearing session
    // No automatic redirect - user controls navigation
  }, [navigate])

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password || (isSignup && !loginForm.name)) {
      alert('Please fill in all fields')
      return
    }

    // Role-specific credentials storage and validation
    const credKey = `rw_auth_${selectedRole.id}`
    const existing = localStorage.getItem(credKey)
    if(existing && isSignup){
      alert('Account already exists for this role. Please login.')
      setIsSignup(false)
      return
    }
    if(existing && !isSignup){
      try{
        const parsed = JSON.parse(existing)
        if(parsed.email !== loginForm.email || parsed.password !== loginForm.password){
          alert('Invalid credentials for this role')
          return
        }
      }catch{
        alert('Invalid credentials data')
        return
      }
    }
    if(!existing && !isSignup){
      alert('No account found for this role. Please sign up.')
      setIsSignup(true)
      return
    }
    if(!existing && isSignup){
      localStorage.setItem(credKey, JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
        name: loginForm.name || loginForm.email.split('@')[0]
      }))
    }

    sessionStorage.setItem('userRole', selectedRole.id)
    sessionStorage.setItem('userAuth', 'true')
    localStorage.setItem('repairwale_user', JSON.stringify({ 
      email: loginForm.email, 
      fullName: loginForm.name || loginForm.email.split('@')[0],
      role: selectedRole.id,
    }))

    if(selectedRole.id === 'customer'){
      try{
        const existingProfile = localStorage.getItem('rw_customer')
        if(!existingProfile){
          navigate('/onboarding')
        }else{
          navigate('/map')
        }
      }catch{
        navigate('/onboarding')
      }
    } else {
      const dashboardRoute = `/${selectedRole.id}-dashboard`
      navigate(dashboardRoute)
    }
  }

  const roles = [
    {
      id: 'customer',
      icon: '👤',
      title: 'Customer',
      subtitle: 'Need vehicle assistance?',
      description: 'Request roadside help, browse mechanics, track repairs, and manage your vehicle services in one place.',
      features: ['SOS dispatch in minutes', 'Live tracking updates', 'Digital payments & invoices', 'Full history & notes'],
      cta: 'Continue as Customer',
      badge: 'Most booked',
      stat: '4.9 • 12k+ jobs',
      accent: '#6dd5ed',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      action: () => {
        setSelectedRole(roles[0])
        setShowLoginModal(true)
      }
    },
    {
      id: 'mechanic',
      icon: '🔧',
      title: 'Mechanic',
      subtitle: 'Offer your expertise?',
      description: 'Join our network of certified professionals. Receive customer requests, manage your schedule, and grow your business.',
      features: ['Instant leads near you', 'Smart scheduling', 'Transparent payouts', 'Build public reputation'],
      cta: 'Continue as Mechanic',
      badge: 'High demand',
      stat: '₹18k avg weekly',
      accent: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      action: () => {
        setSelectedRole(roles[1])
        setShowLoginModal(true)
      }
    },
    {
      id: 'garage',
      icon: '🏢',
      title: 'Garage / Workshop',
      subtitle: 'Expand your services?',
      description: 'Partner with us to reach more customers. Manage multiple mechanics, track jobs, and scale your operations efficiently.',
      features: ['Team workload view', 'Bulk work orders', 'Inventory-ready', 'API + analytics'],
      cta: 'Continue as Garage',
      badge: 'Partner ready',
      stat: '32% lift in jobs',
      accent: '#a18cd1',
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      action: () => {
        setSelectedRole(roles[2])
        setShowLoginModal(true)
      }
    }
  ]

  return (
    <div className="role-selector-wrapper">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .role-selector-wrapper {
          min-height: 100vh;
          background: #0f172a;
          padding: 48px 18px 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-selector-shell {
          width: 100%;
          max-width: 1200px;
          position: relative;
        }

        .role-hero {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 28px;
          padding: 32px 28px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          background: rgba(255,255,255,0.06);
          box-shadow: 0 30px 70px rgba(0,0,0,0.35);
        }

        .hero-left h1 {
          margin: 0 0 10px;
          font-size: 44px;
          letter-spacing: -1.4px;
          font-weight: 900;
          color: #fff;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          color: #cfd2ff;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 14px;
        }

        .hero-copy {
          margin: 0 0 16px;
          color: #b7bcc7;
          font-size: 16px;
          line-height: 1.7;
          max-width: 600px;
        }

        .hero-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .chip {
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #e7ebf2;
          font-weight: 600;
          font-size: 13px;
        }

        .hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .hero-note { color: #8e94a7; font-size: 13px; }

        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-top: 14px;
        }

        .metric-card {
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
        }

        .metric-value { color: #fff; font-size: 20px; font-weight: 800; }
        .metric-label { color: #a4a9b7; font-size: 12px; }
        .metric-tag { color: #7dd3fc; font-size: 12px; font-weight: 700; }

        .roles-grid {
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .role-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 26px 24px;
          background: rgba(255,255,255,0.06);
          transition: all 0.25s ease;
          cursor: pointer;
          overflow: hidden;
          animation: fadeInUp 0.5s ease-out backwards;
        }

        .role-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 18px 36px rgba(0,0,0,0.35);
        }

        .role-card-highlight {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background: linear-gradient(120deg, rgba(255,255,255,0.28), transparent 45%);
        }

        .role-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 14px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .role-card-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .role-card-icon { font-size: 48px; animation: floaty 3s ease-in-out infinite; }
        .role-card-stat { color: #c5d3ff; font-weight: 700; font-size: 13px; }

        .role-card-title { margin: 6px 0 4px; font-size: 24px; font-weight: 800; color: #fff; letter-spacing: -0.6px; }
        .role-card-subtitle { margin: 0 0 10px; font-size: 14px; color: #aeb4c3; font-weight: 700; }
        .role-card-description { margin: 0 0 16px; color: #d6d8df; line-height: 1.6; font-size: 14px; }

        .role-card-features { list-style: none; padding: 0; margin: 0 0 18px; display: grid; gap: 10px; }
        .role-card-features li { display: flex; align-items: center; gap: 10px; color: #a9b0c2; font-size: 13px; }
        .role-card-features li:before { content: '•'; color: #7dd3fc; font-weight: 900; }

        .role-card-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 4px; }
        .role-card-cta { flex: 1; }
        .role-card-ghost { color: #8ea0c7; font-size: 12px; font-weight: 700; }

        .support-bar {
          margin-top: 24px;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.06);
          color: #c8d6ff;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 900px) {
          .role-hero { grid-template-columns: 1fr; padding: 24px; }
          .hero-left h1 { font-size: 34px; }
          .roles-grid { grid-template-columns: 1fr; }
          .hero-metrics { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }
        }
      `}</style>

      <div className="role-selector-shell">
        <div className="role-hero">
          <div className="hero-left">
            <div className="hero-eyebrow">RepairWale • Live 24/7</div>
            <h1>Pick your lane. We’ll tailor everything else.</h1>
            <p className="hero-copy">Single platform for urgent roadside help, professional gigs, and garage expansion. Choose how you want to experience RepairWale, and we set up the right workspace instantly.</p>
            <div className="hero-chips">
              <span className="chip">⚡ 18 min avg dispatch</span>
              <span className="chip">🛡️ Verified partners</span>
              <span className="chip">📍 Live tracking</span>
              <span className="chip">₹ Secure payments</span>
            </div>
            <div className="hero-cta-row">
              <Button variant="primary" size="md" onClick={() => document?.getElementById('role-grid')?.scrollIntoView({ behavior: 'smooth' })}>Choose a role</Button>
              <span className="hero-note">Need help deciding? Tap a card to preview perks.</span>
            </div>
            <div className="hero-metrics">
              <div className="metric-card"><div className="metric-value">4.9★</div><div className="metric-label">Avg session rating</div><div className="metric-tag">12k+ jobs</div></div>
              <div className="metric-card"><div className="metric-value">450+</div><div className="metric-label">Cities & towns</div><div className="metric-tag">Pan-India</div></div>
              <div className="metric-card"><div className="metric-value">24/7</div><div className="metric-label">Live support</div><div className="metric-tag">Human + AI</div></div>
            </div>
          </div>
          <div className="hero-right">
            <div className="metric-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="metric-label" style={{ marginBottom: 6 }}>Flow preview</div>
                <div className="metric-value">Pick → Sign-in → Dashboard</div>
                <p style={{ color: '#a9b0c2', fontSize: 13, lineHeight: 1.6 }}>You keep the same clean UI, but tailored navigation, data, and actions for your role. Switch anytime from settings.</p>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div className="chip" style={{ width: '100%' }}>🔒 Session remembered securely</div>
                <div className="chip" style={{ width: '100%' }}>🎯 No clutter—only relevant actions</div>
              </div>
            </div>
          </div>
        </div>

        <div id="role-grid" className="roles-grid">
          {roles.map((role, idx) => (
            <div key={role.id} className="role-card" style={{ animationDelay: `${0.08 * (idx + 1)}s` }} onClick={role.action}>
              <div className="role-card-highlight" style={{ background: role.gradient }} />
              <div className="role-card-badge" style={{ borderColor: role.accent, color: '#fff' }}>{role.badge}</div>
              <div className="role-card-meta">
                <span className="role-card-icon">{role.icon}</span>
                <span className="role-card-stat">{role.stat}</span>
              </div>
              <h3 className="role-card-title">{role.title}</h3>
              <p className="role-card-subtitle">{role.subtitle}</p>
              <p className="role-card-description">{role.description}</p>
              <ul className="role-card-features">
                {role.features.map((feature, idx2) => (
                  <li key={idx2}>{feature}</li>
                ))}
              </ul>
              <div className="role-card-footer">
                <Button className="role-card-cta" variant="primary" size="md" onClick={(e) => { e.stopPropagation(); role.action(); }}>
                  {role.cta}
                </Button>
                <span className="role-card-ghost">Tap to preview →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="support-bar">
          <span>✨ Tip: Your selection saves to this device. You can always switch roles later from settings.</span>
          <span style={{ color: '#d8e7ff', fontWeight: 700 }}>Ready? Pick a card to continue.</span>
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
