import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export default function SimpleMapTracker({ mechanics = [], userLoc = null, radiusKm = 10, onSelectMechanic = null }) {
  const [liveMechanics, setLiveMechanics] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  // Calculate distance
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

  // Connect to Socket.io
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      mechanics.forEach(m => {
        socket.emit('track-mechanic', { orderId: `map-${m.id}`, mechanicId: m.id })
      })
    })

    socket.on('mechanic-location-update', (data) => {
      setLiveMechanics(prev => ({
        ...prev,
        [data.mechanicId]: { location: data.location, eta: data.eta, distance: data.distance }
      }))
    })

    socket.on('disconnect', () => setIsConnected(false))

    return () => socket.disconnect()
  }, [mechanics])

  const filteredMechanics = mechanics.filter(m => {
    if (!userLoc) return true
    const dist = getDistance(userLoc, { lat: m.lat, lng: m.lng })
    return dist <= radiusKm
  })

  const googleMapsUrl = userLoc 
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6729${userLoc.lat}${userLoc.lng}!2d${userLoc.lng}!3d${userLoc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRepairWale!5e0!3m2!1sen!2sin!4v1`
    : ''

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 500, borderRadius: 12, overflow: 'hidden', background: '#f0f0f0' }}>
      {/* Embedded Google Map */}
      {userLoc && (
        <iframe
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          loading="lazy"
          allowFullScreen=""
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d248.84476${Math.random()}!2d${userLoc.lng}!3d${userLoc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1735766400000`}
        />
      )}

      {/* Overlay Info */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '14px 18px',
        borderRadius: 10,
        fontSize: 13,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        maxWidth: '280px'
      }}>
        <div style={{ fontWeight: 700, color: '#1f2937', marginBottom: 10 }}>
          📍 {filteredMechanics.length} Mechanics Nearby
        </div>
        <div style={{ color: '#6b7280', lineHeight: '1.8', fontSize: 12 }}>
          <div>🔵 Your location: {userLoc?.lat.toFixed(3)}, {userLoc?.lng.toFixed(3)}</div>
          <div>🟢 Mechanics: {filteredMechanics.length} within {radiusKm}km</div>
          <div>📡 Live: {isConnected ? '✅ Connected' : '❌ Offline'}</div>
          <div style={{ marginTop: 8, fontSize: 11, opacity: 0.8 }}>
            Tap a marker to view details
          </div>
        </div>
      </div>

      {/* Connection Badge */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <span>{isConnected ? '🟢 Live' : '🔴 Offline'}</span>
      </div>

      {/* Quick Mechanics List */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 10,
        zIndex: 999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        border: '1px solid #e5e7eb',
        maxHeight: 300,
        overflowY: 'auto',
        maxWidth: 250
      }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', fontWeight: 700, fontSize: 13, color: '#1f2937' }}>
          🔧 Nearby Mechanics
        </div>
        {filteredMechanics.slice(0, 5).map(m => {
          const dist = userLoc ? getDistance(userLoc, { lat: m.lat, lng: m.lng }) : 0
          const live = liveMechanics[m.id]
          return (
            <div
              key={m.id}
              onClick={() => onSelectMechanic && onSelectMechanic(m)}
              style={{
                padding: '10px 14px',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                fontSize: 12,
                transition: 'background 0.2s',
                background: '#f9fafb'
              }}
              onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
              onMouseOut={(e) => e.target.style.background = '#f9fafb'}
            >
              <div style={{ fontWeight: 700, color: '#1f2937' }}>
                {live ? '🟢' : '🟠'} {m.name}
              </div>
              <div style={{ color: '#6b7280', fontSize: 11, marginTop: 4 }}>
                ⭐ {m.rating || '4.5'} • {dist.toFixed(1)}km
              </div>
              {live?.eta && (
                <div style={{ color: '#3b82f6', fontSize: 11, marginTop: 2 }}>
                  ⏱️ ETA: {live.eta}
                </div>
              )}
            </div>
          )
        })}
        {filteredMechanics.length > 5 && (
          <div style={{ padding: '10px 14px', textAlign: 'center', fontSize: 11, color: '#6b7280', borderTop: '1px solid #f3f4f6' }}>
            +{filteredMechanics.length - 5} more
          </div>
        )}
      </div>
    </div>
  )
}
