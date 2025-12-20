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
  html: `<div style="background:#10b981;color:#fff;padding:8px 12px;border-radius:50%;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(16,185,129,0.6)">🔧</div>`,
  iconSize: [40, 40],
  className: 'mechanic-marker'
})

const customerIcon = L.divIcon({
  html: `<div style="background:#3b82f6;color:#fff;padding:8px 12px;border-radius:50%;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(59,130,246,0.6)">👤</div>`,
  iconSize: [40, 40],
  className: 'customer-marker'
})

export default function RealtimeMapTracker({ mechanics = [], userLoc = null, onMechanicSelect = null }) {
  const mapContainerRef = useRef(null)
  const leafletMapRef = useRef(null)
  const markersRef = useRef({})
  const socketRef = useRef(null)
  const [activeMechanics, setActiveMechanics] = useState({})
  const [connectionStatus, setConnectionStatus] = useState('connecting')

  // Initialize map
  useEffect(() => {
    if (!userLoc || !mapContainerRef.current || leafletMapRef.current) return

    leafletMapRef.current = L.map(mapContainerRef.current).setView(
      [userLoc.lat, userLoc.lng],
      14
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(leafletMapRef.current)

    // Add customer marker
    markersRef.current.customer = L.marker([userLoc.lat, userLoc.lng], {
      icon: customerIcon,
      title: 'Your Location',
      zIndexOffset: 1000
    }).addTo(leafletMapRef.current).bindPopup('<b>📍 Your Location</b>')

    // Add accuracy circle
    L.circle([userLoc.lat, userLoc.lng], {
      radius: 500,
      color: '#3b82f6',
      fillColor: '#93c5fd',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '5, 5'
    }).addTo(leafletMapRef.current)

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [userLoc])

  // Connect to Socket.io for real-time updates
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnectionStatus('connected')
      console.log('✅ Realtime map connected')

      // Subscribe to all mechanics locations
      mechanics.forEach(mechanic => {
        socket.emit('track-mechanic', {
          orderId: `map-${mechanic.id}`,
          mechanicId: mechanic.id
        })
      })
    })

    socket.on('mechanic-location-update', (data) => {
      const { orderId, location, mechanicId, eta, distance } = data

      setActiveMechanics(prev => ({
        ...prev,
        [mechanicId]: { location, eta, distance }
      }))

      if (leafletMapRef.current && location) {
        // Remove old marker
        if (markersRef.current[mechanicId]) {
          leafletMapRef.current.removeLayer(markersRef.current[mechanicId])
        }

        // Add new marker with popup
        const marker = L.marker([location.lat, location.lng], {
          icon: mechanicIcon,
          title: `Mechanic ${mechanicId}`
        }).addTo(leafletMapRef.current)

        marker.bindPopup(`
          <div style="font-size:12px;font-weight:700;color:#1f2937">
            <div>🔧 Mechanic ${mechanicId}</div>
            <div>📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</div>
            <div>📏 ${distance ? distance.toFixed(1) : '--'} km away</div>
            <div>⏱️ ETA: ${eta || '--'}</div>
          </div>
        `)

        markersRef.current[mechanicId] = marker
      }
    })

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    return () => {
      socket.disconnect()
    }
  }, [mechanics])

  // Update markers on map when mechanics change
  useEffect(() => {
    if (!leafletMapRef.current) return

    mechanics.forEach(mechanic => {
      const active = activeMechanics[mechanic.id]
      if (active && active.location) {
        // Marker already added via Socket.io
        return
      }

      // Add static marker for mechanics without live tracking
      if (!markersRef.current[mechanic.id]) {
        const marker = L.circleMarker([mechanic.lat, mechanic.lng], {
          radius: 8,
          color: '#f59e0b',
          fillColor: '#fbbf24',
          fillOpacity: 0.8,
          weight: 2
        }).addTo(leafletMapRef.current)

        marker.bindPopup(`
          <div style="font-size:12px;font-weight:700;color:#1f2937">
            <div>${mechanic.name}</div>
            <div>⭐ ${mechanic.rating || '4.5'}</div>
            <div style="margin-top:8px">
              <button onclick="alert('Click on mechanic to chat')" style="background:#3b82f6;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:11px;font-weight:700">
                Chat 💬
              </button>
            </div>
          </div>
        `)

        markersRef.current[mechanic.id] = marker
      }
    })
  }, [mechanics, activeMechanics])

  return (
    <div style={{
      position: 'relative',
      height: '100%',
      minHeight: 500,
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />

      {/* Connection Status Badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: connectionStatus === 'connected' ? '#10b981' : '#ef4444',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          animation: connectionStatus === 'connected' ? 'pulse-dot 2s infinite' : 'none'
        }} />
        {connectionStatus === 'connected' ? '🟢 Live' : '🔴 Offline'}
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '12px 16px',
        borderRadius: 8,
        fontSize: 12,
        zIndex: 999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: '#1f2937' }}>Legend</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>👤</div>
            <span>Your Location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🔧</div>
            <span>Live Mechanic</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 20, height: 20, background: '#fbbf24', borderRadius: '50%' }} />
            <span>Available</span>
          </div>
        </div>
      </div>

      {/* Active Mechanics Counter */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#1f2937',
        padding: '10px 16px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        📍 {Object.keys(activeMechanics).length} mechanics tracking • {mechanics.length} nearby
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
