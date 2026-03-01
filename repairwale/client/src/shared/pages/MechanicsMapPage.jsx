import React, { useState, useEffect } from 'react'
import MechanicsMap from '../components/MechanicsMap'

const defaultCenter = { lat: 28.6139, lng: 77.209 } // Delhi

export default function MechanicsMapPage() {
  const [mechanics, setMechanics] = useState([])
  const [userLoc, setUserLoc] = useState(null)
  const [radiusKm, setRadiusKm] = useState(10)
  const [randomMechs, setRandomMechs] = useState([])
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [locationError, setLocationError] = useState(null)
  const [sortBy, setSortBy] = useState('distance')

  // Auto-detect user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser')
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setUserLoc(loc)
        setIsLoadingLocation(false)
        setLocationError(null)
      },
      (error) => {
        console.error('Geolocation error:', error)
        setLocationError('Location access denied. Using default location.')
        setIsLoadingLocation(false)
        // Use default location if denied
        setUserLoc(defaultCenter)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [])

  // Generate random mechanics near user location
  const jitterAround = (loc, distKm) => {
    const bearing = Math.random() * 2 * Math.PI
    const R = 6371
    const d = distKm / R
    const lat1 = (loc.lat * Math.PI) / 180
    const lng1 = (loc.lng * Math.PI) / 180
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing))
    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2))
    return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI }
  }

  const randomName = () => {
    const shops = ['AutoCare', 'QuickFix', 'SpeedyWrench', 'Metro Motors', 'Prime Auto', 'Elite Garage', 'Swift Fix']
    const owners = ['Ravi', 'Aman', 'Sanjay', 'Vikas', 'Arjun', 'Rajesh', 'Kumar']
    return `${owners[Math.floor(Math.random() * owners.length)]} ${shops[Math.floor(Math.random() * shops.length)]}`
  }

  const generateRandomMechanics = (center) => {
    if (!center) return []
    const out = []
    const services = ['Engine Repair', 'Brake Service', 'AC Repair', 'General Maintenance', 'Oil Change', 'Battery Replacement']
    const fixedRatings = [4.8, 4.6, 4.9, 4.5, 4.7, 4.4, 4.8, 4.6, 4.5, 4.7]
    for (let i = 0; i < 10; i++) {
      const dist = 1 + Math.random() * (radiusKm - 1)
      const p = jitterAround(center, dist)
      const rating = fixedRatings[i]
      out.push({ 
        id: `mech_${i}`, 
        name: randomName(), 
        lat: p.lat, 
        lng: p.lng, 
        rating,
        distance: Math.round(dist * 10) / 10,
        services: [services[Math.floor(Math.random() * services.length)]]
      })
    }
    return out.sort((a, b) => a.distance - b.distance)
  }

  useEffect(() => {
    const center = userLoc || defaultCenter
    setRandomMechs(generateRandomMechanics(center))
  }, [userLoc, radiusKm])

  const displayMechanics = mechanics.length > 0 ? mechanics : randomMechs

  const sortedMechanics = [...displayMechanics].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
    return (a.distance || 999) - (b.distance || 999)
  })

  const getServiceText = (serviceValue) => {
    if (Array.isArray(serviceValue)) return serviceValue.join(', ')
    if (typeof serviceValue === 'string') return serviceValue
    return ''
  }

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#1a2a4a',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#243a5a',
        borderBottom: '1px solid #3a5a8a',
        padding: '14px 18px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff'
          }}>
            Nearby Mechanics
          </h1>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        overflow: 'hidden',
        gap: 0,
        flexDirection: 'row'
      }}>
        {/* Map */}
        <div style={{ 
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#1a2a4a',
          display: 'flex'
        }}>
          <MechanicsMap
            mechanics={sortedMechanics}
            userLocation={userLoc || defaultCenter}
            onMechanicSelect={(m) => setSelectedMechanic(m)}
            searchRadius={radiusKm}
            enableRealTime={false}
            showRadius={true}
            height="100%"
          />

          {isLoadingLocation && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(33, 150, 243, 0.95)',
              color: 'white',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              backdropFilter: 'blur(8px)',
              zIndex: 500
            }}>
              📍 Getting location...
            </div>
          )}

          {!isLoadingLocation && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: locationError ? 'rgba(245, 158, 11, 0.95)' : 'rgba(76, 175, 80, 0.95)',
              color: 'white',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              backdropFilter: 'blur(8px)',
              zIndex: 500,
              maxWidth: '260px'
            }}>
              {locationError ? '📍 Using default location' : '📍 Location active'}
            </div>
          )}
        </div>

        {/* Mechanics Sidebar */}
        <div style={{ 
          width: '360px',
          minWidth: '320px',
          maxWidth: '40%',
          height: '100%',
          background: '#1a2a4a',
          borderLeft: '1px solid #3a5a8a',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
              padding: '14px',
              borderBottom: '1px solid #3a5a8a',
              background: '#162240',
              flex: '0 0 auto',
              minHeight: '70px'
            }}>
              <h2 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '14px',
                fontWeight: '600',
                color: '#fff'
              }}>
                {sortedMechanics.length} Near You
              </h2>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#aaa', flex: '0 0 auto' }}>Sort:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '5px 8px',
                    border: '1px solid #3a5a8a',
                    borderRadius: '5px',
                    fontSize: '11px',
                    background: '#243a5a',
                    color: '#fff',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  <option value="distance">📍 Distance</option>
                  <option value="rating">⭐ Rating</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div style={{ 
              flex: 1,
              overflowY: 'auto',
              padding: '10px',
              background: '#1a2a4a'
            }}>
              {sortedMechanics.length === 0 ? (
                <div style={{ 
                  padding: '30px 16px',
                  textAlign: 'center',
                  color: '#888'
                }}>
                  <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>No mechanics found</p>
                  <p style={{ margin: 0, fontSize: '11px' }}>Increase radius</p>
                </div>
              ) : (
                sortedMechanics.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMechanic(m)}
                    style={{
                      padding: '12px',
                      marginBottom: '8px',
                      borderRadius: '10px',
                      background: selectedMechanic?.id === m.id ? '#2a5a9a' : '#223050',
                      border: selectedMechanic?.id === m.id ? '2px solid #2196f3' : '1px solid #3a5a8a',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      minHeight: '110px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedMechanic?.id !== m.id) {
                        e.currentTarget.style.background = '#2a3a5a'
                        e.currentTarget.style.borderColor = '#5a7aaa'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMechanic?.id !== m.id) {
                        e.currentTarget.style.background = '#223050'
                        e.currentTarget.style.borderColor = '#3a5a8a'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', gap: '8px' }}>
                      <h3 style={{ 
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#fff',
                        flex: 1,
                        wordBreak: 'break-word',
                        lineHeight: '1.3'
                      }}>
                        {m.name}
                      </h3>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#ffd700',
                        background: 'rgba(255, 215, 0, 0.15)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        ⭐ {m.rating}
                      </span>
                    </div>
                    
                    <p style={{ 
                      margin: '0 0 6px 0',
                      fontSize: '11px',
                      color: '#aaa'
                    }}>
                      📍 {m.distance} km
                    </p>

                    {m.services && (
                      <p style={{ 
                        margin: '0 0 8px 0',
                        fontSize: '10px',
                        color: '#999',
                        fontStyle: 'italic'
                      }}>
                        🔧 {getServiceText(m.services)}
                      </p>
                    )}
                    
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                      marginTop: 'auto'
                    }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`Calling ${m.name}...`)
                        }}
                        style={{
                          padding: '6px 8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          border: 'none',
                          borderRadius: '5px',
                          background: '#2196f3',
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#1976d2'}
                        onMouseLeave={(e) => e.target.style.background = '#2196f3'}
                      >
                        📞 Call
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`Chat with ${m.name}`)
                        }}
                        style={{
                          padding: '6px 8px',
                          fontSize: '11px',
                          fontWeight: '600',
                          border: '1px solid #2196f3',
                          borderRadius: '5px',
                          background: 'transparent',
                          color: '#2196f3',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#2196f3'
                          e.target.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent'
                          e.target.style.color = '#2196f3'
                        }}
                      >
                        💬 Chat
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
        </div>
      </div>
    </div>
  )
}



