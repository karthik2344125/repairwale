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
  html: `<div style="width:32px;height:32px;background:#1e3a8a;color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(15,23,42,0.35)">M</div>`,
  iconSize: [32, 32],
  className: 'mechanic-marker'
})

const customerIcon = L.divIcon({
  html: `<div style="width:32px;height:32px;background:#0f172a;color:#FFFFFF;border:2px solid #FFFFFF;border-radius:50%;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(15,23,42,0.35)">You</div>`,
  iconSize: [32, 32],
  className: 'customer-marker'
})

export default function LiveGPSTracker({ orderId, mechanicId, customerId, initialCustomerLocation = null }) {
  const [mechanicLocation, setMechanicLocation] = useState(null)
  const [customerLocation, setCustomerLocation] = useState(null)
  const [eta, setEta] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isTracking, setIsTracking] = useState(false)
  const [route, setRoute] = useState([])
  const socketRef = useRef(null)
  const leafletMapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const mechanicMarkerRef = useRef(null)
  const customerMarkerRef = useRef(null)
  const routeLineRef = useRef(null)
  const hasInitialFitRef = useRef(false)
  const lastLocationRef = useRef(null)

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
          if (!initialCustomerLocation) {
            updateCustomerLocation({ lat: 28.6139, lng: 77.2090, timestamp: Date.now() })
          }
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
          if (data.route) setRoute(data.route)
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

  // Initialize Leaflet map
  useEffect(() => {
    if (!customerLocation || !mapContainerRef.current || leafletMapRef.current) return

    // Create map centered on customer location
    leafletMapRef.current = L.map(mapContainerRef.current).setView(
      [customerLocation.lat, customerLocation.lng],
      15
    )

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(leafletMapRef.current)

    // Add customer marker
    customerMarkerRef.current = L.marker([customerLocation.lat, customerLocation.lng], {
      icon: customerIcon,
      title: 'Your Location'
    }).addTo(leafletMapRef.current)

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [customerLocation])

  // Update mechanic marker and route
  useEffect(() => {
    if (!leafletMapRef.current || !mechanicLocation) return

    // Create once, then update position for smoother tracking.
    if (!mechanicMarkerRef.current) {
      mechanicMarkerRef.current = L.marker([mechanicLocation.lat, mechanicLocation.lng], {
        icon: mechanicIcon,
        title: 'Mechanic Location'
      }).addTo(leafletMapRef.current)
    } else {
      mechanicMarkerRef.current.setLatLng([mechanicLocation.lat, mechanicLocation.lng])
    }

    // Remove old route
    if (routeLineRef.current) {
      leafletMapRef.current.removeLayer(routeLineRef.current)
    }

    // Draw route line (use server route when available)
    if (customerLocation) {
      const routePoints = Array.isArray(route) && route.length > 1
        ? route
            .map((point) => {
              if (Array.isArray(point) && point.length >= 2) {
                return [point[0], point[1]]
              }
              if (point && typeof point === 'object') {
                if (typeof point.lat === 'number' && typeof point.lng === 'number') {
                  return [point.lat, point.lng]
                }
                if (typeof point.latitude === 'number' && typeof point.longitude === 'number') {
                  return [point.latitude, point.longitude]
                }
              }
              return null
            })
            .filter(Boolean)
        : [
            [customerLocation.lat, customerLocation.lng],
            [mechanicLocation.lat, mechanicLocation.lng]
          ]

      routeLineRef.current = L.polyline(
        routePoints,
        {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.8,
          dashArray: '8, 4'
        }
      ).addTo(leafletMapRef.current)

      // Fit bounds only once, then preserve current zoom/interaction while panning softly.
      const bounds = L.latLngBounds(routePoints)
      if (!hasInitialFitRef.current) {
        leafletMapRef.current.fitBounds(bounds, { padding: [80, 80] })
        hasInitialFitRef.current = true
      } else if (!leafletMapRef.current.getBounds().contains([mechanicLocation.lat, mechanicLocation.lng])) {
        leafletMapRef.current.panTo([mechanicLocation.lat, mechanicLocation.lng], { animate: true })
      }
    }
  }, [mechanicLocation, customerLocation, route])

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
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Status Bar */}
      <div style={{
        padding: '16px 20px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: isTracking ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
            boxShadow: isTracking ? '0 0 8px rgba(255,255,255,0.8)' : 'none',
            animation: isTracking ? 'pulse 2s infinite' : 'none'
          }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}> Live GPS Tracking</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>
              {isTracking ? 'Tracking in real-time' : 'Waiting for location...'}
            </div>
          </div>
        </div>
        {eta && (
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            padding: '8px 16px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700
          }}>
            ETA: {eta || calculateETA()}
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        background: 'var(--border)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          padding: '12px 16px',
          background: 'var(--surface)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Distance</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-light)' }}>
            {distance ? `${distance.toFixed(1)} km` : '--'}
          </div>
        </div>
        <div style={{
          padding: '12px 16px',
          background: 'var(--surface)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>ETA</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-light)' }}>
            {eta || calculateETA()}
          </div>
        </div>
        <div style={{
          padding: '12px 16px',
          background: 'var(--surface)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Status</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
            {mechanicLocation ? ' En Route' : ' Pending'}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div style={{
        position: 'relative',
        height: 400,
        background: 'linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(30,58,138,0.1) 100%)',
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
      </div>

      {/* Live Updates */}
      <div style={{
        padding: '16px 20px',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 12,
          color: 'var(--text)'
        }}>
           Live Updates
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          {isTracking ? (
            <>
              <div style={{
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                fontSize: 12,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span></span>
                <span>GPS tracking active</span>
              </div>
              {mechanicLocation && (
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span></span>
                  <span>Mechanic location updated {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </>
          ) : (
            <div style={{
              padding: '8px 12px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8,
              fontSize: 12,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span></span>
              <span>Connecting to GPS...</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
