import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showSuccess } from '../services/toast'
import MechanicList from '../../customer/components/MechanicList'
import RequestList from '../../mechanic/components/RequestList'
import Chat from '../components/Chat'
import SimpleMapView from '../../customer/components/SimpleMapView'
import { db, hasFirebase } from '../../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Button from '../components/Button'

export default function MapPage(){
  const navigate = useNavigate()
  const { role } = useAuth()
  const effectiveRole = role || localStorage.getItem('rw_role_locked')
  const [mechanics, setMechanics] = useState([])
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('all')
  const [userLoc, setUserLoc] = useState(null)
  const [radiusKm, setRadiusKm] = useState(10)
  const [useDemo, setUseDemo] = useState(true)
  const [randomMechs, setRandomMechs] = useState([])
  const [sortBy, setSortBy] = useState('distance')
  const [liveRefresh, setLiveRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const [useServerNearby, setUseServerNearby] = useState(true)
  const [nearbyServerMechs, setNearbyServerMechs] = useState([])
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [toast, setToast] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const defaultCenter = { lat: 28.6139, lng: 77.2090 } // Delhi
  const navigateToMechanic = () => navigate('/service')

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    if (effectiveRole === 'mechanic') {
      navigate('/mechanic/dashboard', { replace: true })
    }
  }, [effectiveRole, navigate])

  useEffect(() => {
    fetch('/api/mechanics').then(r => r.json()).then(setMechanics).catch(console.warn)

    // Detect mobile view
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (navigator.geolocation){
      setIsLoadingLocation(true)
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude })
          setIsLoadingLocation(false)
          showToast('📍 Location detected successfully!', 'success')
        },
        () => {
          setUserLoc(null)
          setIsLoadingLocation(false)
          showToast('⚠️ Location access denied. Showing demo mechanics.', 'warning')
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
    }

    if (hasFirebase && db) {
      const q = query(collection(db,'requests'), orderBy('createdAt','desc'))
      const unsub = onSnapshot(q, snap => {
        const arr = []
        snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
        setRequests(arr)
      })
      return () => {
        unsub()
        window.removeEventListener('resize', checkMobile)
      }
    } else {
      setRequests([])
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Helpers
  function haversineKm(a, b){
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLng = toRad(b.lng - a.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }

  function jitterAround(loc, distKm){
    // random bearing and small distance in km -> lat/lng
    const bearing = Math.random() * 2 * Math.PI
    const R = 6371
    const d = distKm / R
    const lat1 = (loc.lat * Math.PI) / 180
    const lng1 = (loc.lng * Math.PI) / 180
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing))
    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2))
    return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI }
  }

  function randomName(){
    const shops = ['AutoCare','QuickFix','SpeedyWrench','TurboAuto','Metro Motors','Prime Auto','Street Mechanics','GearUp','AutoCure','Reliable Motors']
    const owners = ['Ravi','Aman','Sanjay','Vikas','Imran','Arjun','Prakash','Nikhil','Deepak','Karan']
    return `${owners[Math.floor(Math.random()*owners.length)]} ${shops[Math.floor(Math.random()*shops.length)]}`
  }

  function requestLocationOnce(){
    if (!navigator.geolocation) {
      showToast('❌ Geolocation not supported', 'error')
      return
    }
    setIsLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setIsLoadingLocation(false)
        showToast('📍 Location updated!', 'success')
      },
      err => {
        console.warn('Geolocation denied', err?.message || err)
        setIsLoadingLocation(false)
        showToast('⚠️ Location denied. Please enable in settings.', 'warning')
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  function generateRandomMechanics(center){
    if (!center) return []
    // Rings with different distance ranges and counts
    const rings = [
      { min: 1, max: 2, count: 4 },
      { min: 3, max: 6, count: 5 },
      { min: 8, max: 15, count: 5 }
    ]
    const out = []
    let id = 1000
    for (const ring of rings){
      for (let i=0;i<ring.count;i++){
        const dist = ring.min + Math.random() * (ring.max - ring.min)
        const p = jitterAround(center, dist)
        const rating = Math.round((3.8 + Math.random()*1.2) * 10) / 10
        out.push({ id: `r${id++}`, name: randomName(), lat: p.lat, lng: p.lng, rating })
      }
    }
    return out
  }

  useEffect(() => {
    const center = userLoc || defaultCenter
    if (useDemo && center){
      setRandomMechs(generateRandomMechanics(center))
      setLastUpdate(new Date())
    }
  }, [userLoc, useDemo])

  // Live tick: drift demo mechanics every few seconds to simulate movement
  useEffect(() => {
    const center = userLoc || defaultCenter
    if (!useDemo || !center || !liveRefresh) return
    const id = setInterval(() => {
      setRandomMechs(prev => prev.map(m => {
        const jitter = jitterAround({ lat: m.lat, lng: m.lng }, 0.6 + Math.random() * 0.4)
        const rating = m.rating ?? (3.8 + Math.random() * 1.2)
        return { ...m, lat: jitter.lat, lng: jitter.lng, rating }
      }))
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(id)
  }, [useDemo, userLoc, liveRefresh])

  function haversineKm(a, b){
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLng = toRad(b.lng - a.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }

  const mapLoc = userLoc || defaultCenter

  const sourceList = (useServerNearby && nearbyServerMechs.length > 0)
    ? nearbyServerMechs
    : (useDemo && mapLoc ? randomMechs : mechanics)

  const withDistance = sourceList.map(m => {
    if (!mapLoc) return { ...m }
    const distanceKm = haversineKm(mapLoc, { lat: m.lat, lng: m.lng })
    return { ...m, distanceKm: Math.round(distanceKm * 10) / 10 }
  })

  const nearby = withDistance
    .filter(m => (typeof m.distanceKm === 'number' ? m.distanceKm <= radiusKm : true))
    .sort((a,b) => {
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      return (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9)
    })

  // Apply filters: rating filter, search query
  const filteredMechanics = nearby
    .filter(m => {
      // Rating filter
      if (ratingFilter === 'high' && (m.rating < 4.5)) return false
      if (ratingFilter === 'medium' && (m.rating < 3.5 || m.rating >= 4.5)) return false
      
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const name = (m.name || '').toLowerCase()
        const rating = (m.rating || 0).toString()
        const distance = (m.distanceKm || 0).toString()
        return name.includes(query) || rating.includes(query) || distance.includes(query)
      }
      
      return true
    })

  // Connection status from RealtimeMapViewer
  const [connectionStatus, setConnectionStatus] = useState('disconnected')

  const findNearestMechanic = () => {
    if (filteredMechanics.length === 0) {
      showToast('❌ No mechanics nearby', 'error')
      return
    }
    const nearest = filteredMechanics[0]
    setSelectedMechanic(nearest)
    showToast(`🚗 Nearest: ${nearest.name} (${nearest.distanceKm}km away)`, 'success')
  }

  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh', color: '#e5e7eb' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: toast.type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                      toast.type === 'warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                      'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out',
          fontWeight: '600'
        }}>
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .luxury-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .luxury-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(96, 165, 250, 0.15);
        }
        .luxury-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .luxury-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
        }
        @media (max-width: 768px) {
          .mobile-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-hide {
            display: none !important;
          }
          .mobile-full {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2847 0%, #0f1729 100%)',
        padding: isMobileView ? '20px 16px' : '32px 24px',
        borderBottom: '1px solid rgba(96, 165, 250, 0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobileView ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobileView ? 'flex-start' : 'center', marginBottom: '16px', gap: isMobileView ? '16px' : '0' }}>
            <div>
              <h1 style={{ 
                margin: '0 0 8px 0', 
                fontSize: isMobileView ? '24px' : '36px', 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>🗺️ Live Mechanics Map</h1>
              <p style={{ margin: 0, color: 'rgba(229,231,235,0.6)', fontSize: isMobileView ? '13px' : '15px', fontWeight: '500' }}>
                {userLoc ? '📍 Your location detected • ' : '⚠️ Demo mode • '}
                {filteredMechanics.length} mechanics within {radiusKm}km
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: isMobileView ? '100%' : 'auto' }}>
              <button
                onClick={requestLocationOnce}
                disabled={isLoadingLocation}
                className="luxury-button"
                style={{
                  padding: isMobileView ? '10px 18px' : '12px 24px',
                  background: isLoadingLocation ? '#374151' : 'rgba(30, 58, 138, 0.8)',
                  color: 'white',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '10px',
                  cursor: isLoadingLocation ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: isMobileView ? '1' : 'initial'
                }}
              >
                {isLoadingLocation ? '⏳' : '📍'} {isLoadingLocation ? 'Locating...' : 'GPS'}
              </button>
              <button
                onClick={() => navigate('/service')}
                className="luxury-button"
                style={{
                  padding: isMobileView ? '10px 18px' : '12px 24px',
                  background: 'transparent',
                  color: '#60a5fa',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  flex: isMobileView ? '1' : 'initial'
                }}
              >
                ← Service Home
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexDirection: isMobileView ? 'column' : 'row', alignItems: 'stretch' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Search mechanics by name, rating, or distance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 44px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '10px',
                  color: '#e5e7eb',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none'
                }}
              />
              <span style={{ 
                position: 'absolute', 
                left: '16px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                fontSize: '18px' 
              }}>🔍</span>
            </div>
            
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="luxury-button mobile-show"
              style={{
                padding: '14px 24px',
                background: 'rgba(30, 58, 138, 0.8)',
                color: 'white',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: isMobileView ? 'flex' : 'none',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'center'
              }}
            >
              ⚙️ Filters {showMobileFilters ? '▲' : '▼'}
            </button>
          </div>

          {/* Filter Controls */}
          <div style={{ 
            display: (isMobileView && !showMobileFilters) ? 'none' : 'flex', 
            gap: '12px', 
            marginTop: '16px', 
            flexWrap: 'wrap' 
          }}>
            <select 
              value={radiusKm} 
              onChange={(e)=>setRadiusKm(Number(e.target.value))}
              style={{
                padding: '10px 16px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                color: '#e5e7eb',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: isMobileView ? '1' : 'initial'
              }}
            >
              <option value={5}>📏 5 km radius</option>
              <option value={10}>📏 10 km radius</option>
              <option value={15}>📏 15 km radius</option>
              <option value={20}>📏 20 km radius</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e)=>setSortBy(e.target.value)}
              style={{
                padding: '10px 16px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                color: '#e5e7eb',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: isMobileView ? '1' : 'initial'
              }}
            >
              <option value="distance">📍 Nearest First</option>
              <option value="rating">⭐ Highest Rated</option>
            </select>

            <select 
              value={ratingFilter} 
              onChange={(e)=>setRatingFilter(e.target.value)}
              style={{
                padding: '10px 16px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                color: '#e5e7eb',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                flex: isMobileView ? '1' : 'initial'
              }}
            >
              <option value="all">⭐ All Ratings</option>
              <option value="high">⭐ 4.5+ Stars</option>
              <option value="medium">⭐ 3.5 - 4.5 Stars</option>
            </select>

            <button
              onClick={findNearestMechanic}
              className="luxury-button"
              style={{
                padding: '10px 20px',
                background: 'rgba(30, 58, 138, 0.8)',
                color: 'white',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: isMobileView ? '1' : 'initial'
              }}
            >
              🎯 Find Nearest
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobileView ? '20px 16px' : '32px 24px' }}>
        <div className={isMobileView ? 'mobile-grid' : ''} style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '2fr 1fr', gap: '24px' }}>
          {/* Map Section */}
          <div className="luxury-card" style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: isMobileView ? '16px' : '24px', borderBottom: '1px solid rgba(96, 165, 250, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: isMobileView ? '16px' : '20px', fontWeight: '800', color: '#60a5fa' }}>
                    🌍 Live Map View
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                    OpenStreetMap • India coverage
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ height: isMobileView ? '400px' : '600px', background: '#000', position: 'relative' }}>
              <SimpleMapView 
                mechanics={filteredMechanics}
                userLocation={mapLoc}
                onMechanicSelect={(mechanic) => {
                  setSelectedMechanic(mechanic)
                  showToast(`Selected: ${mechanic.name}`, 'success')
                }}
                searchRadius={radiusKm}
              />
            </div>
          </div>

          {/* Mechanics List */}
          <div>
            <div className="luxury-card" style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}>
              <div style={{ padding: isMobileView ? '16px' : '24px', borderBottom: '1px solid rgba(96, 165, 250, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: isMobileView ? '16px' : '18px', fontWeight: '800', color: '#60a5fa' }}>
                      👨‍🔧 Nearby Mechanics
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                      {filteredMechanics.length} available now
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={{ maxHeight: isMobileView ? '400px' : '600px', overflowY: 'auto', padding: '16px' }}>
                {filteredMechanics.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>No mechanics found in this area</p>
                    <p style={{ fontSize: '13px', marginTop: '8px' }}>Try increasing the search radius</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {filteredMechanics.map(mechanic => (
                      <div 
                        key={mechanic.id}
                        onClick={() => {
                          setSelectedMechanic(mechanic)
                          showToast(`Selected: ${mechanic.name}`, 'success')
                        }}
                        style={{
                          background: selectedMechanic?.id === mechanic.id ? 'rgba(96, 165, 250, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                          padding: '16px',
                          borderRadius: '12px',
                          border: selectedMechanic?.id === mechanic.id ? '2px solid #60a5fa' : '1px solid rgba(96, 165, 250, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedMechanic?.id !== mechanic.id) {
                            e.currentTarget.style.background = 'rgba(96, 165, 250, 0.08)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedMechanic?.id !== mechanic.id) {
                            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.6)'
                          }
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ fontWeight: '700', fontSize: '15px', color: '#e5e7eb' }}>
                            {mechanic.name}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            fontWeight: '700',
                            color: '#10b981',
                            background: 'rgba(16, 185, 129, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '6px'
                          }}>
                            ⭐ {mechanic.rating?.toFixed(1) || '4.5'}
                          </div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
                          📍 {mechanic.distanceKm ? `${mechanic.distanceKm} km away` : 'Distance calculating...'}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              showToast(`📞 Calling ${mechanic.name}...`, 'success')
                            }}
                            style={{
                              flex: 1,
                              padding: '8px',
                              background: 'rgba(30, 58, 138, 0.8)',
                              color: 'white',
                              border: '1px solid rgba(96, 165, 250, 0.3)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '12px'
                            }}
                          >
                            📞 Call
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowChat(true)
                              showToast(`💬 Chat opened with ${mechanic.name}`, 'success')
                            }}
                            style={{
                              flex: 1,
                              padding: '8px',
                              background: 'rgba(30, 58, 138, 0.6)',
                              color: 'white',
                              border: '1px solid rgba(96, 165, 250, 0.3)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '12px'
                            }}
                          >
                            💬 Chat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Assisted Chat with Mechanic */}
      {showChat && selectedMechanic && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: isMobileView ? '100%' : '500px',
          height: isMobileView ? '70vh' : '700px',
          background: 'var(--surface)',
          borderRadius: isMobileView ? '16px 16px 0 0' : '16px',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 1000,
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <Chat 
            requestId={`instant-${selectedMechanic.id}`}
            serviceName={selectedMechanic.name}
          />
          <button
            onClick={() => setShowChat(false)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
