import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Layout({ children }){
  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div className="logoMark">RW</div>
            <div>
              <div>RepairWale</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>Roadside assistance • Premium</div>
            </div>
          </div>
          <nav className="main-nav">
            <NavLink to="/" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Home</NavLink>
            <NavLink to="/service" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Services</NavLink>
            <NavLink to="/map" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>Map</NavLink>
            <NavLink to="/user" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>User</NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div className="container">{children}</div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>© {new Date().getFullYear()} RepairWale</div>
            <div className="muted">Fast roadside assistance • Prototype</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
