import React, { useEffect, useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import Toast from './Toast'
import { addToastListener } from '../services/toast'

export default function Layout({ children }){
  const [cartCount, setCartCount] = useState(0)
  const [userRole, setUserRole] = useState(null)
  const [toasts, setToasts] = useState([])
  
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
    // Get user role from sessionStorage
    const role = sessionStorage.getItem('userRole')
    setUserRole(role)
    
    // Listen for role changes
    const handleStorageChange = () => {
      const newRole = sessionStorage.getItem('userRole')
      setUserRole(newRole)
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  useEffect(() => {
    updateCartCount()
    
    // Custom event listener for cart updates (better than polling)
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)
    
    // Setup toast listener
    const removeToastListener = addToastListener(({ id, message, type, duration }) => {
      setToasts(prev => [...prev, { id, message, type, duration }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    })
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
      removeToastListener()
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
                    {userRole === 'customer' && 'Customer • Roadside Assistance'}
                    {userRole === 'mechanic' && 'Mechanic • Service Provider'}
                    {userRole === 'garage' && 'Garage • Business Partner'}
                    {!userRole && 'Please select role to continue'}
              </div>
            </div>
          </div>
          
          {/* Navigation changes based on role */}
          <nav className="main-nav">
            {!userRole && (
              <>
                <NavLink to="/" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Home</NavLink>
                <NavLink to="/service" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Services</NavLink>
              </>
            )}
            
            {userRole === 'customer' && (
              <>
                <NavLink to="/" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🏠 Home</NavLink>
                <NavLink to="/customer-dashboard" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📊 Dashboard</NavLink>
                <NavLink to="/service" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>
                  🛒 Services
                  {cartCount>0 && <span className="cart-badge">{cartCount}</span>}
                </NavLink>
                <NavLink to="/favorites" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>♥ Favorites</NavLink>
                <NavLink to="/map" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📍 Find Mechanic</NavLink>
                <NavLink to="/orders" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📦 Orders</NavLink>
                <NavLink to="/user" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>👤 Profile</NavLink>
              </>
            )}
            
            {userRole === 'mechanic' && (
              <>
                <NavLink to="/" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🏠 Home</NavLink>
                <NavLink to="/mechanic-dashboard" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🔧 My Dashboard</NavLink>
                <NavLink to="/map" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>📍 Service Area</NavLink>
                <NavLink to="/user" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>👤 Profile</NavLink>
              </>
            )}
            
            {userRole === 'garage' && (
              <>
                <NavLink to="/" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🏠 Home</NavLink>
                <NavLink to="/garage-dashboard" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>🏢 Garage Hub</NavLink>
                <NavLink to="/user" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>⚙️ Settings</NavLink>
              </>
            )}
          </nav>

        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>© {new Date().getFullYear()} RepairWale {userRole && `• ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}</div>
          <div className="footer-links">
            <NavLink to="/terms" className="footer-link">Terms & Conditions</NavLink>
            <div className="muted">Fast roadside assistance • Prototype</div>
          </div>
        </div>
      </footer>

      {/* Toast notifications */}
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          message={toast.message} 
          type={toast.type} 
          duration={toast.duration}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}
    </div>
  )
}
