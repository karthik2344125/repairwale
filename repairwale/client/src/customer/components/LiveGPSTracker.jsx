import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { connectRealtimeWithFallback } from '../../shared/services/realtime'
import { watchDeviceLocation } from '../../shared/services/liveTracking'

// Fix Leaflet default icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const mechanicIcon = L.divIcon({
  html: `<div style="width:28px;height:28px;background:#1e3a8a;color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3)"><span>🚗</span></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
  className: 'mechanic-marker'
})

const customerIcon = L.divIcon({
  html: `<div style="width:32px;height:32px;background:#f59e0b;color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #d97706,0 2px 6px rgba(0,0,0,0.3)"><span>📍</span></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
  className: 'customer-marker'
})

function calculateDistanceKm(pointA, pointB) {
  if (!pointA || !pointB) return null
  const toRadians = (value) => (value * Math.PI) / 180
  const earthRadius = 6371
  const dLat = toRadians(pointB.lat - pointA.lat)
  const dLng = toRadians(pointB.lng - pointA.lng)
  const lat1 = toRadians(pointA.lat)
  const lat2 = toRadians(pointB.lat)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadius * c
}

export default function LiveGPSTracker({
  orderId,
  mechanicId,
  customerId,
  initialCustomerLocation = null,
  simulatedMechanicLocation = null,
  demoStatusText = '',
  nearbyMechanics = [],
  acceptedMechanicId = null,
  routePoints = [],
  mechanicStartLocation = null,
  userLiveLocation = null
}) {
  const [mechanicLocation, setMechanicLocation] = useState(null)
  const [customerLocation, setCustomerLocation] = useState(null)
  const [eta, setEta] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isTracking, setIsTracking] = useState(false)
  const socketRef = useRef(null)
  const leafletMapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const mechanicMarkerRef = useRef(null)
  const customerMarkerRef = useRef(null)
  const routePolylineRef = useRef(null)
  const nearbyMechanicMarkersRef = useRef(new Map())
  const hasInitialFitRef = useRef(false)
  const lastLocationRef = useRef(null)

  const createNearbyMechanicIcon = (isAccepted = false) => L.divIcon({
    html: `<div style="width:30px;height:30px;background:${isAccepted ? '#1e3a8a' : '#0f172a'};color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center"><span>🔧</span></div>`,
    iconSize: [34, 34],
    className: isAccepted ? 'mechanic-marker accepted-mechanic' : 'mechanic-marker nearby-mechanic'
  })

  useEffect(() => {
    if (initialCustomerLocation?.lat && initialCustomerLocation?.lng) {
      setCustomerLocation(initialCustomerLocation)
      lastLocationRef.current = initialCustomerLocation
    }

    const updateCustomerLocation = (loc) => {
      lastLocationRef.current = loc
      setCustomerLocation(loc)
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateCustomerLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now()
          })
        },
        (error) => {
          console.error('Location error:', error)
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      )
    }

    const realtime = connectRealtimeWithFallback({
      onConnect: (socket) => {
        socketRef.current = socket
        setIsTracking(true)
        socket.emit('track-mechanic', { orderId, mechanicId })

        const activeCustomerId = customerId || JSON.parse(localStorage.getItem('repairwale_user') || '{}')?.id || 'guest-customer'
        if (lastLocationRef.current) {
          socket.emit('user:location', {
            userId: activeCustomerId,
            lat: lastLocationRef.current.lat,
            lng: lastLocationRef.current.lng,
            timestamp: lastLocationRef.current.timestamp || Date.now()
          })
        }

        socket.on('mechanic-location-update', (data) => {
          if (!data?.location) return
          setMechanicLocation(data.location)
          setEta(data.eta)
          setDistance(data.distance)
        })

        socket.on('mechanic:location-update', (data) => {
          if (!data || (data.orderId && data.orderId !== orderId)) return
          const location = { lat: data.lat, lng: data.lng, timestamp: data.timestamp }
          setMechanicLocation(location)
        })

        socket.on('disconnect', () => {
          setIsTracking(false)
        })
      }
    })

    const stopWatch = watchDeviceLocation({
      options: { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 },
      onError: () => {},
      onLocation: (location) => {
        updateCustomerLocation(location)
        if (!socketRef.current) return
        const activeCustomerId = customerId || JSON.parse(localStorage.getItem('repairwale_user') || '{}')?.id || 'guest-customer'
        socketRef.current.emit('user:location', {
          userId: activeCustomerId,
          lat: location.lat,
          lng: location.lng,
          timestamp: location.timestamp
        })
      }
    })

    return () => {
      try {
        stopWatch()
      } catch {}
      try {
        if (socketRef.current) socketRef.current.emit('stop-tracking', { orderId })
      } catch {}
      realtime.disconnect()
    }
  }, [orderId, mechanicId, customerId, initialCustomerLocation])

  // Sync userLiveLocation prop to customerLocation
  useEffect(() => {
    if (userLiveLocation?.lat && userLiveLocation?.lng) {
      setCustomerLocation(userLiveLocation)
      lastLocationRef.current = userLiveLocation
    }
  }, [userLiveLocation])

  useEffect(() => {
    if (!simulatedMechanicLocation?.lat || !simulatedMechanicLocation?.lng) return

    setMechanicLocation({
      lat: simulatedMechanicLocation.lat,
      lng: simulatedMechanicLocation.lng,
      timestamp: Date.now()
    })
    setIsTracking(true)

    if (customerLocation?.lat && customerLocation?.lng) {
      const liveDistance = calculateDistanceKm(simulatedMechanicLocation, customerLocation)
      setDistance(liveDistance)

      if (liveDistance !== null) {
        const etaMinutes = Math.max(1, Math.round((liveDistance / 35) * 60))
        setEta(etaMinutes)
      }
    }
  }, [simulatedMechanicLocation, customerLocation])

  // Initialize Leaflet map - only once
  useEffect(() => {
    if (!mapContainerRef.current || leafletMapRef.current) return
    
    // Initialize map with default center
    const initialLoc = customerLocation || initialCustomerLocation || { lat: 28.6139, lng: 77.2090 }
    
    leafletMapRef.current = L.map(mapContainerRef.current).setView(
      [initialLoc.lat, initialLoc.lng],
      15
    )

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(leafletMapRef.current)

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, []) // Empty dependency array - only run once

  // Update mechanic marker position and customer marker
  useEffect(() => {
    if (!leafletMapRef.current) return

    // Update or create customer marker (always visible on top)
    if (customerLocation) {
      if (!customerMarkerRef.current) {
        customerMarkerRef.current = L.marker([customerLocation.lat, customerLocation.lng], {
          icon: customerIcon,
          title: 'Your Location',
          zIndexOffset: 1000
        }).addTo(leafletMapRef.current)
        customerMarkerRef.current.bindPopup('📍 Your Location')
      } else {
        customerMarkerRef.current.setLatLng([customerLocation.lat, customerLocation.lng])
      }
    }

    // Update or create mechanic marker
    if (mechanicLocation) {
      if (!mechanicMarkerRef.current) {
        mechanicMarkerRef.current = L.marker([mechanicLocation.lat, mechanicLocation.lng], {
          icon: mechanicIcon,
          title: 'Mechanic Location',
          zIndexOffset: 999
        }).addTo(leafletMapRef.current)
        mechanicMarkerRef.current.bindPopup('🚗 Mechanic')
      } else {
        mechanicMarkerRef.current.setLatLng([mechanicLocation.lat, mechanicLocation.lng])
      }

      // Only fit bounds once on initial mechanic appearance
      if (customerLocation && !hasInitialFitRef.current) {
        const bounds = L.latLngBounds([
          [mechanicLocation.lat, mechanicLocation.lng],
          [customerLocation.lat, customerLocation.lng]
        ])
        leafletMapRef.current.fitBounds(bounds, { padding: [80, 80], animate: true, duration: 0.8 })
        hasInitialFitRef.current = true
      }
    } else if (customerLocation && !hasInitialFitRef.current) {
      // When only customer location available, set center once
      leafletMapRef.current.setView([customerLocation.lat, customerLocation.lng], 15, { animate: false })
      hasInitialFitRef.current = true
    }
  }, [mechanicLocation, customerLocation])

  // Draw route polyline when route points are available
  useEffect(() => {
    if (!leafletMapRef.current || !Array.isArray(routePoints) || routePoints.length === 0) {
      // Remove polyline if no route points
      if (routePolylineRef.current) {
        try {
          leafletMapRef.current.removeLayer(routePolylineRef.current)
        } catch {}
        routePolylineRef.current = null
      }
      return
    }

    // Create or update polyline
    const latLngs = routePoints.map((point) => [point[0], point[1]])
    
    if (!routePolylineRef.current) {
      routePolylineRef.current = L.polyline(latLngs, {
        color: '#22c55e',
        weight: 6,
        opacity: 0.95,
        dashArray: null,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'route-polyline'
      }).addTo(leafletMapRef.current)
    } else {
      routePolylineRef.current.setLatLngs(latLngs)
    }
  }, [routePoints])

  useEffect(() => {
    if (!leafletMapRef.current) return

    const validNearby = (Array.isArray(nearbyMechanics) ? nearbyMechanics : []).filter(
      (item) => item?.id && item?.currentLocation?.lat && item?.currentLocation?.lng
    )

    const activeIds = new Set(validNearby.map((item) => item.id))

    nearbyMechanicMarkersRef.current.forEach((marker, markerId) => {
      if (!activeIds.has(markerId)) {
        try {
          leafletMapRef.current.removeLayer(marker)
        } catch {}
        nearbyMechanicMarkersRef.current.delete(markerId)
      }
    })

    validNearby.forEach((item) => {
      const isAccepted = item.id === acceptedMechanicId
      const existing = nearbyMechanicMarkersRef.current.get(item.id)
      const latLng = [item.currentLocation.lat, item.currentLocation.lng]

      if (!existing) {
        const marker = L.marker(latLng, {
          icon: createNearbyMechanicIcon(isAccepted),
          title: item.name || 'Mechanic'
        })
        marker.addTo(leafletMapRef.current)
        marker.bindTooltip(`${item.name || 'Mechanic'}${typeof item.etaMinutes === 'number' ? ` • ${item.etaMinutes} min` : ''}`)
        nearbyMechanicMarkersRef.current.set(item.id, marker)
      } else {
        existing.setLatLng(latLng)
        existing.setIcon(createNearbyMechanicIcon(isAccepted))
      }
    })
  }, [nearbyMechanics, acceptedMechanicId])

  const calculateETA = () => {
    if (!distance) return 'Calculating...'
    const avgSpeed = 40 // km/h
    const timeInMinutes = Math.round((distance / avgSpeed) * 60)
    return `${timeInMinutes} min`
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden'
    }}>
      {/* Status Bar */}
      <div style={{
        padding: '18px 20px',
        background: '#0f172a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: isTracking ? '#10b981' : 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.35)'
          }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.3px' }}>📍 Live GPS Tracking</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
              {isTracking ? '✓ Real-time tracking active' : '⏳ Connecting...'}
            </div>
          </div>
        </div>
        {eta && (
          <div style={{
            background: '#11233f',
            border: '1px solid #1f3f6b',
            padding: '10px 16px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '-0.2px'
          }}>
            ETA: {eta || calculateETA()}
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        background: 'var(--border)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          padding: '14px 16px',
          background: 'var(--surface)',
          textAlign: 'center',
          borderRight: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Distance</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '-0.5px' }}>
            {distance ? `${distance.toFixed(1)} km` : '--'}
          </div>
        </div>
        <div style={{
          padding: '14px 16px',
          background: 'var(--surface)',
          textAlign: 'center',
          borderRight: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>ETA</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--accent-light)', letterSpacing: '-0.5px' }}>
            {eta ? `${eta} min` : calculateETA()}
          </div>
        </div>
        <div style={{
          padding: '14px 16px',
          background: 'var(--surface)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#10b981', letterSpacing: '-0.5px' }}>
            {mechanicLocation ? '🚗' : '🔍'}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div style={{
        position: 'relative',
        height: 400,
        background: '#0b1f3b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div 
          ref={mapContainerRef}
          id="gps-map" 
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: '0 0 0 0'
          }}
        >
          {!customerLocation && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{
                fontSize: 48,
                marginBottom: 16,
                animation: 'bounce 2s infinite'
              }}>
                
              </div>
              <div style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: 8
              }}>
                Getting your location...
              </div>
            </div>
          )}
        </div>

        {/* Center on Me Button */}
        {leafletMapRef.current && customerLocation && (
          <button
            onClick={() => {
              if (leafletMapRef.current && customerLocation) {
                leafletMapRef.current.setView([customerLocation.lat, customerLocation.lng], 15, { animate: true })
              }
            }}
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              zIndex: 1000,
              background: '#1e3a8a',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              fontSize: 20,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease',
              hover: { background: '#2d5aa3' }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2d5aa3'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e3a8a'
            }}
            title="Center on your location"
          >
            📍
          </button>
        )}
      </div>

      {/* Live Updates */}
      <div style={{
        padding: '18px 20px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 14,
          color: 'var(--text)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>●</span>
          Live Updates
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
          {demoStatusText ? (
            <div style={{
              padding: '12px 14px',
              background: '#0f172a',
              border: '1px solid #1f3f6b',
              borderRadius: 10,
              fontSize: 12,
              color: '#dbeafe',
              fontWeight: 600
            }}>
              {demoStatusText}
            </div>
          ) : null}
          {isTracking ? (
            <>
              <div style={{
                padding: '12px 14px',
                background: '#0f172a',
                border: '1px solid #1f3f6b',
                borderRadius: 10,
                fontSize: 12,
                color: '#10b981',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span>🛰️</span>
                <span>GPS signal acquired & tracking active</span>
              </div>
              {mechanicLocation && (
                <div style={{
                  padding: '12px 14px',
                  background: '#0f172a',
                  border: '1px solid #1f3f6b',
                  borderRadius: 10,
                  fontSize: 12,
                  color: '#3b82f6',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <span>🚗</span>
                  <span>Mechanic location updated {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
              )}
              <div style={{
                padding: '12px 14px',
                background: '#0f172a',
                border: '1px solid #1f3f6b',
                borderRadius: 10,
                fontSize: 12,
                color: '#d1d5db',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span>✓</span>
                <span>Real-time connection stable</span>
              </div>
            </>
          ) : (
            <div style={{
              padding: '12px 14px',
              background: '#0f172a',
              border: '1px solid #1f3f6b',
              borderRadius: 10,
              fontSize: 12,
              color: '#6b7280',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <span>⏳</span>
              <span>Establishing connection...</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .mechanic-marker {
          filter: none;
        }
      `}</style>
    </div>
  )
}
