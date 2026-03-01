import React, { useEffect, useState, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AISupport from './AISupport'

export default function Layout({ children }){
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const { completeLogout, role: userRole } = useAuth()
  const effectiveRole = userRole || localStorage.getItem('rw_role_locked')
  
  const handleLogout = () => {
    completeLogout()
    navigate('/login', { replace: true })
  }
  
  const computeCount = useCallback((arr) => {
    if(!Array.isArray(arr)) return 0
    return arr.reduce((sum,i)=> sum + (i.qty || 0), 0)
  }, [])
  
  const updateCartCount = useCallback(() => {
    try {
      const raw = localStorage.getItem('rw_cart')
      const count = raw ? computeCount(JSON.parse(raw)) : 0
      setCartCount(prev => prev === count ? prev : count)
    } catch {}
  }, [computeCount])
  
  useEffect(() => {
    updateCartCount()
    
    // Custom event listener for cart updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
    }
  }, [updateCartCount])

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <div className="logoMark">RW</div>
            <div>
              <div>RepairWale</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>
                  {effectiveRole === 'customer' && 'Customer • Roadside Assistance'}
                  {effectiveRole === 'mechanic' && 'Mechanic • Service Provider'}
                  {!effectiveRole && 'Please select role to continue'}
              </div>
            </div>
          </div>
          
          {/* Navigation changes based on role */}
          <nav className="main-nav">
            {!effectiveRole && (
              <>
                <NavLink to="/login" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🔒 Login / Signup</NavLink>
              </>
            )}
            
            {effectiveRole === 'customer' && (
              <>
                <NavLink to="/service" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📋 Services</NavLink>
                <NavLink to="/map" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🗺️ Find Mechanics</NavLink>
                <NavLink to="/orders" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📦 My Orders</NavLink>
                <NavLink to="/customer/profile" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>👤 My Profile</NavLink>
              </>
            )}
            
            {effectiveRole === 'mechanic' && (
              <>
                <NavLink to="/mechanic/dashboard" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📊 Dashboard</NavLink>
                <NavLink to="/mechanic/services" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🧰 Services</NavLink>
                <NavLink to="/mechanic/profile" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>👤 Profile</NavLink>
              </>
            )}
            
            {effectiveRole && (
              <button onClick={handleLogout} className="navlink" style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)'}}>🚪 Logout</button>
            )}
          </nav>

        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} RepairWale {effectiveRole && `• ${effectiveRole.charAt(0).toUpperCase() + effectiveRole.slice(1)}`}</div>
          <div className="footer-links">
            <NavLink to="/terms" className="footer-link">Terms & Conditions</NavLink>
            <div className="muted">Fast roadside assistance • Prototype</div>
          </div>
        </div>
      </footer>

      {/* AI Support Chat - Always Available */}
      <AISupport />
    </div>
  )
}
