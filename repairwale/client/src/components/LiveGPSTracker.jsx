import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const mechanicIcon = L.divIcon({
  html: `<div style="background:#10b981;color:#fff;padding:6px 10px;border-radius:50%;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(16,185,129,0.4)">🔧</div>`,
  iconSize: [32, 32],
  className: 'mechanic-marker'
})

const customerIcon = L.divIcon({
  html: `<div style="background:#3b82f6;color:#fff;padding:6px 10px;border-radius:50%;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(59,130,246,0.4)">📍</div>`,
  iconSize: [32, 32],
  className: 'customer-marker'
})

export default function LiveGPSTracker({ orderId, mechanicId }) {
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

  useEffect(() => {
    // Get customer location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCustomerLocation(loc)
        },
        (error) => {
          console.error('Location error:', error)
          // Fallback to default location
          setCustomerLocation({ lat: 28.6139, lng: 77.2090 }) // Delhi
        }
      )
    }

    // Connect to socket for real-time updates
    const socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    })
    
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('✅ GPS Tracker connected')
      socket.emit('track-mechanic', { orderId, mechanicId })
      setIsTracking(true)
    })

    socket.on('mechanic-location-update', (data) => {
      setMechanicLocation(data.location)
      setEta(data.eta)
      setDistance(data.distance)
      if (data.route) setRoute(data.route)
    })

    socket.on('disconnect', () => {
      setIsTracking(false)
    })

    return () => {
      socket.emit('stop-tracking', { orderId })
      socket.disconnect()
    }
  }, [orderId, mechanicId])

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
      attribution: '© OpenStreetMap contributors',
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

    // Remove old mechanic marker
    if (mechanicMarkerRef.current) {
      leafletMapRef.current.removeLayer(mechanicMarkerRef.current)
    }

    // Add new mechanic marker
    mechanicMarkerRef.current = L.marker([mechanicLocation.lat, mechanicLocation.lng], {
      icon: mechanicIcon,
      title: 'Mechanic Location'
    }).addTo(leafletMapRef.current)

    // Remove old route
    if (routeLineRef.current) {
      leafletMapRef.current.removeLayer(routeLineRef.current)
    }

    // Draw route line
    if (customerLocation) {
      routeLineRef.current = L.polyline(
        [
          [customerLocation.lat, customerLocation.lng],
          [mechanicLocation.lat, mechanicLocation.lng]
        ],
        {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.8,
          dashArray: '8, 4'
        }
      ).addTo(leafletMapRef.current)

      // Fit map to show both markers
      const bounds = L.latLngBounds(
        [customerLocation.lat, customerLocation.lng],
        [mechanicLocation.lat, mechanicLocation.lng]
      )
      leafletMapRef.current.fitBounds(bounds, { padding: [80, 80] })
    }
  }, [mechanicLocation, customerLocation])

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
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
            background: isTracking ? '#ffffff' : '#ef4444',
            boxShadow: isTracking ? '0 0 8px #ffffff' : 'none',
            animation: isTracking ? 'pulse 2s infinite' : 'none'
          }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>📍 Live GPS Tracking</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>
              {isTracking ? 'Tracking in real-time' : 'Waiting for location...'}
            </div>
          </div>
        </div>
        {eta && (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
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
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10b981' }}>
            {mechanicLocation ? '🚗 En Route' : '⏳ Pending'}
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
                📍
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
          📡 Live Updates
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
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 8,
                fontSize: 12,
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <span>✅</span>
                <span>GPS tracking active</span>
              </div>
              {mechanicLocation && (
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span>🚗</span>
                  <span>Mechanic location updated {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}
            </>
          ) : (
            <div style={{
              padding: '8px 12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 8,
              fontSize: 12,
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>⚠️</span>
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
