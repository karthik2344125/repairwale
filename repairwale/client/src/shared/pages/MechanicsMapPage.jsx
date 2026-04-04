import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MechanicsMap from '../components/MechanicsMap'
import { IconCompass, IconList, IconMapPin, IconMoney, IconPhone, IconSpark, IconStar, IconUser, IconWrench } from '../../icons'

export default function MechanicsMapPage() {
  const navigate = useNavigate()
  const [mechanics, setMechanics] = useState([])
  const [userLoc, setUserLoc] = useState(null)
  const [radiusKm, setRadiusKm] = useState(10)
  const [randomMechs, setRandomMechs] = useState([])
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [locationError, setLocationError] = useState(null)
  const [sortBy, setSortBy] = useState('distance')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCompact, setIsCompact] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 860
  })
  const [mobileView, setMobileView] = useState('map')
  const watchIdRef = useRef(null)

  const formatINR = (value) => `₹ ${Number(value || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

  const estimateEtaMinutes = (distanceKm) => {
    const trafficFactor = 3.4
    return Math.max(10, Math.round(distanceKm * trafficFactor + 6))
  }

  const getMechanicPhone = (mechanic) => {
    const source = String(mechanic?.id || mechanic?.name || 'repairwale')
    let hash = 0
    for (let i = 0; i < source.length; i += 1) {
      hash = ((hash << 5) - hash) + source.charCodeAt(i)
      hash |= 0
    }
    const localNumber = 9000000000 + (Math.abs(hash) % 1000000000)
    const localText = String(localNumber)
    return {
      display: `+91 ${localText.slice(0, 5)} ${localText.slice(5)}`,
      dial: `+91${localText}`
    }
  }

  // Keep the user's location updated in real time while the page is open.
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser')
      setIsLoadingLocation(false)
      return
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
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
        setLocationError('Location access denied. Enable location to load nearby mechanics.')
        setIsLoadingLocation(false)
        setUserLoc(null)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      }
    )

    return () => {
      if (watchIdRef.current !== null && navigator.geolocation?.clearWatch) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
      watchIdRef.current = null
    }
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
    const pricePool = [299, 399, 499, 699, 899, 999, 1299]
    const fixedRatings = [4.8, 4.6, 4.9, 4.5, 4.7, 4.4, 4.8, 4.6, 4.5, 4.7]
    for (let i = 0; i < 10; i++) {
      const dist = 1 + Math.random() * (radiusKm - 1)
      const p = jitterAround(center, dist)
      const rating = fixedRatings[i]
      const etaMinutes = estimateEtaMinutes(dist)
      const startingPrice = pricePool[Math.floor(Math.random() * pricePool.length)]
      const availability = etaMinutes <= 20 ? 'available now' : etaMinutes <= 35 ? 'arriving soon' : 'limited availability'
      out.push({ 
        id: `mech_${i}`, 
        name: randomName(), 
        lat: p.lat, 
        lng: p.lng, 
        rating,
        distance: Math.round(dist * 10) / 10,
        etaMinutes,
        startingPrice,
        availability,
        services: [services[Math.floor(Math.random() * services.length)], services[Math.floor(Math.random() * services.length)]]
      })
    }
    return out.sort((a, b) => a.distance - b.distance)
  }

  useEffect(() => {
    if (!userLoc) {
      setRandomMechs([])
      return
    }

    setRandomMechs(generateRandomMechanics(userLoc))
  }, [userLoc, radiusKm])

  useEffect(() => {
    const onResize = () => {
      const compact = window.innerWidth <= 860
      setIsCompact(compact)
      if (!compact) setMobileView('map')
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const displayMechanics = mechanics.length > 0 ? mechanics : randomMechs

  const sortedMechanics = [...displayMechanics].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
    if (sortBy === 'eta') return (a.etaMinutes || 999) - (b.etaMinutes || 999)
    if (sortBy === 'price') return (a.startingPrice || 99999) - (b.startingPrice || 99999)
    return (a.distance || 999) - (b.distance || 999)
  })

  const getServiceText = (serviceValue) => {
    if (Array.isArray(serviceValue)) return serviceValue.join(', ')
    if (typeof serviceValue === 'string') return serviceValue
    return ''
  }

  const getPrimaryService = (serviceValue) => {
    if (Array.isArray(serviceValue) && serviceValue.length > 0) return serviceValue[0]
    if (typeof serviceValue === 'string') return serviceValue
    return 'general service'
  }

  const filteredMechanics = sortedMechanics.filter((mechanic) => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return true

    const name = String(mechanic.name || '').toLowerCase()
    const servicesText = getServiceText(mechanic.services).toLowerCase()
    return name.includes(query) || servicesText.includes(query)
  })

  const avgRating = filteredMechanics.length
    ? (filteredMechanics.reduce((sum, m) => sum + (m.rating || 0), 0) / filteredMechanics.length).toFixed(1)
    : '0.0'
  const nearestDistance = filteredMechanics.length
    ? Math.min(...filteredMechanics.map((m) => Number(m.distance || 999))).toFixed(1)
    : '--'
  const fastestEta = filteredMechanics.length
    ? Math.min(...filteredMechanics.map((m) => Number(m.etaMinutes || 999)))
    : '--'
  const layoutClass = `rw-map-layout ${isCompact ? `mobile-${mobileView}` : ''}`

  return (
    <section className="rw-map-shell">
      <div className="rw-map-header">
        <div>
          <h1 className="rw-map-title">nearby mechanics</h1>
        </div>
        <div className="rw-map-stats">
          <div className="rw-map-stat">
            <span className="rw-map-stat-label"><IconWrench size={12} /> nearby</span>
            <span className="rw-map-stat-value">{filteredMechanics.length}</span>
          </div>
          <div className="rw-map-stat">
            <span className="rw-map-stat-label"><IconStar size={12} /> rating</span>
            <span className="rw-map-stat-value">{avgRating}</span>
          </div>
          <div className="rw-map-stat">
            <span className="rw-map-stat-label"><IconMapPin size={12} /> nearest</span>
            <span className="rw-map-stat-value">{nearestDistance === '--' ? nearestDistance : `${nearestDistance} km`}</span>
          </div>
          <div className="rw-map-stat">
            <span className="rw-map-stat-label"><IconSpark size={12} /> eta</span>
            <span className="rw-map-stat-value">{fastestEta === '--' ? fastestEta : `${fastestEta} min`}</span>
          </div>
        </div>
      </div>

      <div className="rw-map-controls">
        <div className="rw-map-control-group">
          <div className="rw-map-icon-input">
            <IconWrench size={14} />
            <input
              id="rw-map-search"
              type="text"
              value={searchQuery}
              aria-label="search mechanic or service"
              placeholder="search mechanic or service"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rw-map-search"
            />
          </div>
        </div>
        <div className="rw-map-control-group">
          <label htmlFor="rw-map-radius"><IconMapPin size={12} /> radius {radiusKm} km</label>
          <input
            id="rw-map-radius"
            type="range"
            min={3}
            max={25}
            step={1}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
          />
        </div>
        <div className="rw-map-control-group rw-map-sort">
          <label htmlFor="rw-map-sort"><IconSpark size={12} /> sort</label>
          <select id="rw-map-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="eta">ETA</option>
            <option value="price">Price</option>
          </select>
        </div>
        {isCompact && (
          <div className="rw-map-control-group">
            <label>Mobile View</label>
            <div className="rw-map-view-toggle">
              <button
                type="button"
                className={`rw-toggle-btn ${mobileView === 'map' ? 'active' : ''}`}
                onClick={() => setMobileView('map')}
              >
                <IconCompass size={14} />
                Map
              </button>
              <button
                type="button"
                className={`rw-toggle-btn ${mobileView === 'list' ? 'active' : ''}`}
                onClick={() => setMobileView('list')}
              >
                <IconList size={14} />
                List
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={layoutClass}>
        <div className="rw-map-canvas-wrap">
          <MechanicsMap
            mechanics={filteredMechanics}
            userLocation={userLoc}
            onMechanicSelect={(m) => setSelectedMechanic(m)}
            searchRadius={radiusKm}
            enableRealTime={true}
            showRadius={true}
            height="100%"
            className="rw-map-canvas"
          />
        </div>

        <aside className="rw-map-sidebar">
          <div className="rw-map-sidebar-head">
            <h2><IconWrench size={16} /> mechanics</h2>
            <p>{filteredMechanics.length} results</p>
          </div>

          {selectedMechanic && (
            <div className="rw-selected-panel">
              <div className="rw-selected-head">
                <h3>{selectedMechanic.name}</h3>
                <span className="rw-mech-rating"><IconStar size={11} /> {selectedMechanic.rating}</span>
              </div>
              <div className="rw-selected-metrics">
                <span className="rw-mech-chip"><IconMapPin size={10} /> {selectedMechanic.distance} km</span>
                <span className="rw-mech-chip"><IconSpark size={10} /> {selectedMechanic.etaMinutes} min</span>
                <span className="rw-mech-chip"><IconMoney size={10} /> {formatINR(selectedMechanic.startingPrice)}</span>
              </div>
              <p className="rw-selected-status">{selectedMechanic.availability}</p>
              <div className="rw-selected-services"><IconWrench size={11} /> {getPrimaryService(selectedMechanic.services)}</div>
              <div className="rw-selected-services"><IconPhone size={11} /> {getMechanicPhone(selectedMechanic).display}</div>
              <div className="rw-mech-actions">
                <button
                  type="button"
                  onClick={() => window.location.href = `tel:${getMechanicPhone(selectedMechanic).dial}`}
                  className="rw-mech-btn rw-mech-btn-primary"
                  aria-label="call mechanic"
                  title="call"
                >
                  <IconPhone size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="rw-map-list">
              {filteredMechanics.length === 0 ? (
                <div className="rw-map-empty">
                  <p>No mechanics found in this area.</p>
                  <span>Try adjusting search text or increasing radius.</span>
                </div>
              ) : (
                filteredMechanics.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMechanic(m)}
                    className={`rw-mech-card ${selectedMechanic?.id === m.id ? 'is-active' : ''}`}
                  >
                    <div className="rw-mech-card-top">
                      <h3>{m.name}</h3>
                      <span className="rw-mech-rating"><IconStar size={11} /> {m.rating}</span>
                    </div>

                    <div className="rw-mech-chips">
                      <span className="rw-mech-chip"><IconMapPin size={10} /> {m.distance} km</span>
                      <span className="rw-mech-chip"><IconSpark size={10} /> {m.etaMinutes} min</span>
                      <span className="rw-mech-chip"><IconMoney size={10} /> {formatINR(m.startingPrice)}</span>
                    </div>

                    <p className="rw-mech-status">{m.availability}</p>

                    <p className="rw-mech-service"><IconWrench size={11} /> {getPrimaryService(m.services)}</p>
                    <p className="rw-mech-service"><IconPhone size={11} /> {getMechanicPhone(m).display}</p>

                    <div className="rw-mech-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `tel:${getMechanicPhone(m).dial}`
                        }}
                        className="rw-mech-btn rw-mech-btn-primary"
                        aria-label="call mechanic"
                        title="call"
                      >
                        <IconPhone size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </aside>
      </div>
    </section>
  )
}





