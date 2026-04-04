import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './shared/context/AuthContext'
import { initializeAPI } from './shared/services/apiConfig'
import { ProtectedRoute, PublicRoute } from './shared/components/ProtectedRoute'
import Layout from './shared/components/Layout'
import ToastViewport from './shared/components/ToastViewport'
import BackNavButton from './shared/components/BackNavButton'
import Login from './shared/pages/Login'
import RoleSelectionPage from './shared/pages/RoleSelectionPage'
import PaymentTest from './PAYMENT_TEST'
import './App.css'

// Lazy load shared pages
const MechanicsMapPage = lazy(() => import('./shared/pages/MechanicsMapPage'))
const Service = lazy(() => import('./shared/pages/Service'))
const TermsAndConditions = lazy(() => import('./shared/pages/TermsAndConditions'))

// Lazy load customer pages
const CustomerHome = lazy(() => import('./customer/pages/CustomerHome'))
const OrderHistory = lazy(() => import('./customer/pages/OrderHistory'))
const ServiceTracking = lazy(() => import('./customer/pages/ServiceTracking'))
const Checkout = lazy(() => import('./customer/pages/Checkout'))
const Favorites = lazy(() => import('./customer/pages/Favorites'))
const OnboardingCustomer = lazy(() => import('./customer/pages/OnboardingCustomer'))
const CustomerProfile = lazy(() => import('./customer/pages/CustomerProfile'))

// Lazy load mechanic pages
const MechanicHome = lazy(() => import('./mechanic/pages/MechanicHome'))
const MechanicServices = lazy(() => import('./mechanic/pages/MechanicServices'))
const MechanicProfile = lazy(() => import('./mechanic/pages/MechanicProfile'))

const LoadingFallback = () => (
  <div style={{padding:'60px 20px',textAlign:'center',minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div>
      <div style={{width:48,height:48,border:'3px solid rgba(255,255,255,0.1)',borderTopColor:'rgba(255,255,255,0.6)',borderRadius:'50%',margin:'0 auto',animation:'spin 0.8s linear infinite'}}/>
      <div style={{marginTop:16,color:'var(--muted)',fontSize:14}}>Loading</div>
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
          color: '#FFFFFF',
          backgroundColor: '#000000',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h2 style={{color: '#FFFFFF'}}> App Error</h2>
          <pre style={{overflow: 'auto', padding: '10px', backgroundColor: '#000000', borderRadius: '4px', fontSize: '12px'}}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#0B1F3B',
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

function RoleBasedRedirect(){
  const { role, isAuthenticated } = useAuth()
  const effectiveRole = role || localStorage.getItem('rw_role_locked')

  // If not authenticated, send to role selection first
  if (!isAuthenticated) return <Navigate to="/role-selection" replace />
  
  // If authenticated but no role, continue onboarding flow
  if (!effectiveRole) return <Navigate to="/onboarding" replace />
  
  // If authenticated with role, redirect based on role
  if (effectiveRole === 'mechanic') return <Navigate to="/mechanic/dashboard" replace />
  if (effectiveRole === 'customer') return <Navigate to="/customer" replace />
  
  return <Navigate to="/role-selection" replace />
}

function OnboardingRoute() {
  const { role, isAuthenticated } = useAuth()
  const effectiveRole = role || localStorage.getItem('rw_role_locked')

  if (!isAuthenticated) return <Navigate to="/role-selection" replace />

  // No dedicated mechanic onboarding screen currently, so mechanics go straight to dashboard.
  if (effectiveRole === 'mechanic') return <Navigate to="/mechanic/dashboard" replace />

  return <OnboardingCustomer />
}

export default function App(){
  useEffect(() => {
    initializeAPI()
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <BackNavButton />
          <Suspense fallback={<LoadingFallback/>}>
            <Routes>
              {/* Entry routes */}
              <Route path="/" element={<RoleSelectionPage/>} />
              <Route path="/signin" element={<Navigate to="/role-selection" replace />} />
              <Route path="/home" element={<RoleBasedRedirect />} />
              
              {/* PAYMENT TEST - Standalone Demo */}
              <Route path="/payment-test" element={<PaymentTest/>} />
              
              {/* Authentication Routes - NO LAYOUT */}
              {/* Step 1: Select role (no auth required) */}
              <Route path="/role-selection" element={<RoleSelectionPage/>} />
              
              {/* Step 2: Login/Signup (requires role selection first) */}
              <Route path="/login" element={<PublicRoute requireRoleSelection={true}><Login/></PublicRoute>} />
              
              {/* Step 3: Onboarding (after auth, before role-based workflow) */}
              <Route path="/onboarding" element={<ProtectedRoute allowWithoutRole={true}><OnboardingRoute/></ProtectedRoute>} />

              {/* All other routes WITH LAYOUT */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    {/* Core Features - Protected */}
                    <Route path="/map" element={<ProtectedRoute><MechanicsMapPage/></ProtectedRoute>} />
                    <Route path="/service" element={<ProtectedRoute><Service/></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><Favorites/></ProtectedRoute>} />
                    <Route path="/tracking/:orderId" element={<ProtectedRoute><ServiceTracking/></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><OrderHistory/></ProtectedRoute>} />
                    
                    {/* Customer Routes */}
                    <Route path="/customer" element={<ProtectedRoute><CustomerHome/></ProtectedRoute>} />
                    <Route path="/customer/profile" element={<ProtectedRoute><CustomerProfile/></ProtectedRoute>} />
                    
                    {/* Mechanic Routes */}
                    <Route path="/mechanic/dashboard" element={<ProtectedRoute><MechanicHome/></ProtectedRoute>} />
                    <Route path="/mechanic/services" element={<ProtectedRoute><MechanicServices/></ProtectedRoute>} />
                    <Route path="/mechanic/profile" element={<ProtectedRoute><MechanicProfile/></ProtectedRoute>} />
                    
                    {/* Public Pages */}
                    <Route path="/terms" element={<TermsAndConditions/>} />

                    {/* Safety fallback for unknown routes inside layout */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Suspense>
          <ToastViewport />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}



