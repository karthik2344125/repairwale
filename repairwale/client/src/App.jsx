import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './shared/context/AuthContext'
import { initializeAPI } from './shared/services/apiConfig'
import { ProtectedRoute, PublicRoute } from './shared/components/ProtectedRoute'
import Layout from './shared/components/Layout'
import './App.css'

// Lazy load shared pages
const Login = lazy(() => import('./shared/pages/Login'))
const RoleSelectionPage = lazy(() => import('./shared/pages/RoleSelectionPage'))
const MapPage = lazy(() => import('./shared/pages/MapPage'))
const UserPage = lazy(() => import('./shared/pages/UserPage'))
const Service = lazy(() => import('./shared/pages/Service'))
const TermsAndConditions = lazy(() => import('./shared/pages/TermsAndConditions'))

// Lazy load customer pages
const OrderHistory = lazy(() => import('./customer/pages/OrderHistory'))
const ServiceTracking = lazy(() => import('./customer/pages/ServiceTracking'))
const Checkout = lazy(() => import('./customer/pages/Checkout'))
const Favorites = lazy(() => import('./customer/pages/Favorites'))
const OnboardingCustomer = lazy(() => import('./customer/pages/OnboardingCustomer'))

// Lazy load mechanic pages
const MechanicHome = lazy(() => import('./mechanic/pages/MechanicHome'))
const MechanicServices = lazy(() => import('./mechanic/pages/MechanicServices'))

const LoadingFallback = () => (
  <div style={{padding:'60px 20px',textAlign:'center',minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div>
      <div style={{width:48,height:48,border:'3px solid rgba(255,255,255,0.1)',borderTopColor:'rgba(255,255,255,0.6)',borderRadius:'50%',margin:'0 auto',animation:'spin 0.8s linear infinite'}}/>
      <div style={{marginTop:16,color:'var(--muted)',fontSize:14}}>Loading…</div>
    </div>
  </div>
)

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: 'monospace',
          color: '#ff6b6b',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h2 style={{color: '#ff8787'}}>❌ App Error</h2>
          <pre style={{overflow: 'auto', padding: '10px', backgroundColor: '#0a0a0a', borderRadius: '4px', fontSize: '12px'}}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function RoleRedirect(){
  const { role, isAuthenticated } = useAuth()
  const effectiveRole = role || localStorage.getItem('rw_role_locked')

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (effectiveRole === 'mechanic') return <Navigate to="/mechanic/dashboard" replace />
  if (effectiveRole === 'customer') return <Navigate to="/service" replace />
  return <Navigate to="/role-selection" replace />
}

export default function App(){
  useEffect(() => {
    initializeAPI()
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback/>}>
            <Routes>
              {/* Redirects - FIRST TO MATCH - ensures login is always the starting point */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/signin" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={<RoleRedirect />} />
              
              {/* Authentication Routes - NO LAYOUT */}
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
              <Route path="/role-selection" element={<ProtectedRoute allowWithoutRole={true}><RoleSelectionPage/></ProtectedRoute>} />
              <Route path="/onboarding" element={<ProtectedRoute allowWithoutRole={true}><OnboardingCustomer/></ProtectedRoute>} />

              {/* All other routes WITH LAYOUT */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    {/* Core Features - Protected */}
                    <Route path="/map" element={<ProtectedRoute><MapPage/></ProtectedRoute>} />
                    <Route path="/service" element={<ProtectedRoute><Service/></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><Favorites/></ProtectedRoute>} />
                    <Route path="/tracking/:orderId" element={<ProtectedRoute><ServiceTracking/></ProtectedRoute>} />
                    <Route path="/user" element={<ProtectedRoute><UserPage/></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><OrderHistory/></ProtectedRoute>} />
                    
                    {/* Mechanic Routes */}
                    <Route path="/mechanic/dashboard" element={<ProtectedRoute><MechanicHome/></ProtectedRoute>} />
                    <Route path="/mechanic/services" element={<ProtectedRoute><MechanicServices/></ProtectedRoute>} />
                    
                    {/* Public Pages */}
                    <Route path="/terms" element={<TermsAndConditions/>} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

