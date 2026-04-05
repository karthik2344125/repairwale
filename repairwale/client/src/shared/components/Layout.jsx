import React, { useEffect, useState, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AISupport from './AISupport'
import BrandLogo from './BrandLogo'
import { getAPIBase } from '../services/apiConfig'

export default function Layout({ children }){
  const [cartCount, setCartCount] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [backendStatus, setBackendStatus] = useState('checking')
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

  useEffect(() => {
    const onOnline = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const checkBackend = async () => {
      if (!navigator.onLine) {
        if (isMounted) setBackendStatus('offline')
        return
      }

      try {
        const response = await fetch(`${getAPIBase()}/status`, { cache: 'no-store' })
        const payload = await response.json().catch(() => null)

        if (!isMounted) return

        if (response.ok && payload?.ok) {
          setBackendStatus('up')
          return
        }
        setBackendStatus('down')
      } catch {
        if (isMounted) setBackendStatus('down')
      }
    }

    checkBackend()
    const intervalId = window.setInterval(checkBackend, 25000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [isOnline])

  const backendStatusLabel = {
    checking: 'Connecting',
    up: 'Online',
    down: 'Backend issue',
    offline: 'Offline'
  }[backendStatus]

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <BrandLogo size="md" />
            <div>
              <div className="brand-heading">Service platform</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>
                  {effectiveRole === 'customer' && 'Customer | roadside assistance'}
                  {effectiveRole === 'mechanic' && 'Mechanic | service provider'}
                  {!effectiveRole && 'Please select role to continue'}
              </div>
            </div>
            <span className={`status-pill status-${backendStatus}`}>{backendStatusLabel}</span>
          </div>
          
          {/* Navigation changes based on role */}
          <nav className="main-nav">
            {!effectiveRole && (
              <>
                <NavLink to="/login" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Login / Signup</NavLink>
              </>
            )}
            
            {effectiveRole === 'customer' && (
              <>
                <NavLink to="/service" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Services</NavLink>
                <NavLink to="/map" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Find Mechanics</NavLink>
                <NavLink to="/orders" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>My Orders</NavLink>
                <NavLink to="/customer/profile" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>My Profile</NavLink>
              </>
            )}
            
            {effectiveRole === 'mechanic' && (
              <>
                <NavLink to="/mechanic/dashboard" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📊 Dashboard</NavLink>
                <NavLink to="/mechanic/orders" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📦 Orders</NavLink>
                <NavLink to="/mechanic/order-history" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🕘 Order History</NavLink>
                <NavLink to="/mechanic/profile" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>👤 Profile</NavLink>
              </>
            )}
            
            {effectiveRole && (
              <button onClick={handleLogout} className="navlink navlink-btn">⎋ Logout</button>
            )}
          </nav>

        </div>
      </header>

      <main>
        {!isOnline && (
          <div className="network-banner" role="status">
            You are offline. Some features may not work until connection is restored.
          </div>
        )}
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>{new Date().getFullYear()} Repairwale {effectiveRole && `| ${effectiveRole.charAt(0).toUpperCase() + effectiveRole.slice(1)}`}</div>
          <div className="footer-links">
            <NavLink to="/terms" className="footer-link">Terms & Conditions</NavLink>
            <div className="muted">Fast roadside assistance</div>
          </div>
        </div>
      </footer>

      {/* AI Support Chat - Always Available */}
      <AISupport />
    </div>
  )
}


