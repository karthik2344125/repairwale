import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Button from './Button'

// Fix Leaflet icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function NearbyMechanicsMap({ mechanics = [], userLoc = null, radiusKm = 10, onSelectMechanic = null }) {
  const mapContainerRef = useRef(null)
  const leafletMapRef = useRef(null)
  const markersRef = useRef({})
  const socketRef = useRef(null)
  const [liveMechanics, setLiveMechanics] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [selectedMechanic, setSelectedMechanic] = useState(null)

  // Calculate distance between two coordinates
  const getDistance = (loc1, loc2) => {
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(loc2.lat - loc1.lat)
    const dLng = toRad(loc2.lng - loc1.lng)
    const lat1 = toRad(loc1.lat)
    const lat2 = toRad(loc2.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }

  // Initialize map only once
  useEffect(() => {
    if (!userLoc || !mapContainerRef.current || leafletMapRef.current) return

    try {
      leafletMapRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        dragging: true,
        tap: true
      }).setView([userLoc.lat, userLoc.lng], 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
      }).addTo(leafletMapRef.current)

      // Add customer location marker
      L.marker([userLoc.lat, userLoc.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        }),
        title: 'Your Location'
      }).addTo(leafletMapRef.current).bindPopup('<b>📍 Your Location</b>')

      // Add radius circle
      L.circle([userLoc.lat, userLoc.lng], {
        radius: radiusKm * 1000,
        color: '#3b82f6',
        fillColor: '#93c5fd',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5'
      }).addTo(leafletMapRef.current)
    } catch (error) {
      console.error('Map init error:', error)
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
        markersRef.current = {}
      }
    }
  }, [userLoc, radiusKm])

  // Add/update mechanic markers
  useEffect(() => {
    if (!leafletMapRef.current || !mechanics.length) return

    mechanics.forEach(mechanic => {
      try {
        // Remove old marker if exists
        if (markersRef.current[mechanic.id]) {
          leafletMapRef.current.removeLayer(markersRef.current[mechanic.id])
        }

        // Check if within radius
        if (userLoc) {
          const dist = getDistance(userLoc, { lat: mechanic.lat, lng: mechanic.lng })
          if (dist > radiusKm) return // Skip if outside radius
        }

        // Get live data if available
        const liveData = liveMechanics[mechanic.id] || {}
        const mechLat = liveData.location?.lat || mechanic.lat
        const mechLng = liveData.location?.lng || mechanic.lng

        // Create marker with green color for live tracking
        const iconUrl = liveData.location 
          ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
          : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'

        const marker = L.marker([mechLat, mechLng], {
          icon: L.icon({
            iconUrl: iconUrl,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          }),
          title: mechanic.name
        }).addTo(leafletMapRef.current)

        const distance = userLoc ? getDistance(userLoc, { lat: mechLat, lng: mechLng }) : 0
        const popupContent = `
          <div style="font-weight:700;font-size:12px">
            <div>${mechanic.name}</div>
            <div>⭐ ${mechanic.rating || '4.5'} • ${distance.toFixed(1)}km</div>
            ${liveData.eta ? `<div>⏱️ ETA: ${liveData.eta}</div>` : ''}
            <button id="chat-btn-${mechanic.id}" style="margin-top:8px;background:#3b82f6;color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:700;width:100%">
              Chat 💬
            </button>
          </div>
        `
        marker.bindPopup(popupContent)
        marker.on('popupopen', () => {
          const btn = document.getElementById(`chat-btn-${mechanic.id}`)
          if (btn) {
            btn.onclick = () => {
              setSelectedMechanic(mechanic)
              if (onSelectMechanic) onSelectMechanic(mechanic)
            }
          }
        })

        markersRef.current[mechanic.id] = marker
      } catch (error) {
        console.error(`Error adding marker for ${mechanic.id}:`, error)
      }
    })
  }, [mechanics, liveMechanics, userLoc, radiusKm])

  // Connect to Socket.io for real-time updates
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('✅ Map connected to server')
      setIsConnected(true)

      // Start tracking all mechanics
      mechanics.forEach(mechanic => {
        socket.emit('track-mechanic', {
          orderId: `map-${mechanic.id}`,
          mechanicId: mechanic.id
        })
      })
    })

    socket.on('mechanic-location-update', (data) => {
      const { mechanicId, location, eta, distance } = data
      setLiveMechanics(prev => ({
        ...prev,
        [mechanicId]: { location, eta, distance }
      }))
    })

    socket.on('disconnect', () => {
      console.log('❌ Map disconnected')
      setIsConnected(false)
    })

    socket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    return () => {
      if (socket) socket.disconnect()
    }
  }, [mechanics])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden' }}>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 500,
          background: '#f0f0f0'
        }}
      />

      {/* Connection Status */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: isConnected ? '#10b981' : '#ef4444',
        color: '#fff',
        padding: '8px 14px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          animation: isConnected ? 'pulse-map 2s infinite' : 'none'
        }} />
        {isConnected ? '🟢 Live' : '🔴 Offline'}
      </div>

      {/* Info Box */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '12px 16px',
        borderRadius: 8,
        fontSize: 12,
        zIndex: 999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontWeight: 700, color: '#1f2937', marginBottom: 6 }}>📍 Info</div>
        <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <div>🟢 = Live tracking</div>
          <div>🟠 = Available nearby</div>
          <div style={{ marginTop: 6 }}>
            {Object.keys(liveMechanics).length} mechanics tracking
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-map {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
