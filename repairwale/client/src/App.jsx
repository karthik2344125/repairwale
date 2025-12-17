import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./pages/Home'))
const RoleSelector = lazy(() => import('./pages/RoleSelector'))
const Service = lazy(() => import('./pages/Service'))
const MapPage = lazy(() => import('./pages/MapPage'))
const UserPage = lazy(() => import('./pages/UserPage'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderHistory = lazy(() => import('./pages/OrderHistory'))
const ServiceTracking = lazy(() => import('./pages/ServiceTracking'))
const Favorites = lazy(() => import('./pages/Favorites'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'))
const MechanicDashboard = lazy(() => import('./pages/MechanicDashboard'))
const GarageDashboard = lazy(() => import('./pages/GarageDashboard'))
const OnboardingCustomer = lazy(() => import('./pages/OnboardingCustomer'))
import Layout from './components/Layout'
import './App.css'

const LoadingFallback = () => (
  <div style={{padding:'60px 20px',textAlign:'center',minHeight:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div>
      <div style={{width:48,height:48,border:'3px solid rgba(255,255,255,0.1)',borderTopColor:'rgba(255,255,255,0.6)',borderRadius:'50%',margin:'0 auto',animation:'spin 0.8s linear infinite'}}/>
      <div style={{marginTop:16,color:'var(--muted)',fontSize:14}}>Loading…</div>
    </div>
  </div>
)

export default function App(){
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback/>}>
          <Routes>
            <Route path="/" element={<RoleSelector/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/service" element={<Service/>} />
            <Route path="/map" element={<MapPage/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/orders" element={<OrderHistory/>} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/tracking/:orderId" element={<ServiceTracking/>} />
            <Route path="/terms" element={<TermsAndConditions/>} />
            <Route path="/onboarding" element={<OnboardingCustomer/>} />
            <Route path="/customer-dashboard" element={<CustomerDashboard/>} />
            <Route path="/mechanic-dashboard" element={<MechanicDashboard/>} />
            <Route path="/garage-dashboard" element={<GarageDashboard/>} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

