import React, { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { io } from 'socket.io-client'

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Custom styled icons
const createCustomIcon = (emoji, color, size = 40) => {
  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, ${color}dd 0%, ${color} 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg) translateX(-50%);
          border: 3px solid white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3), 0 0 0 2px ${color}33;
        "></div>
        <div style="
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: ${size * 0.5}px;
          z-index: 1;
        ">${emoji}</div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  })
}

const mechanicIcon = createCustomIcon('🔧', '#10b981', 44)
const userIcon = createCustomIcon('📍', '#3b82f6', 36)
const selectedIcon = createCustomIcon('⭐', '#f59e0b', 48)

export default function MechanicsMap({
  mechanics = [],
  userLocation = null,
  onMechanicSelect = null,
  searchRadius = 10,
  enableRealTime = false,
  enableClustering = false,
  showRadius = true,
  height = '600px',
  className = ''
}) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const markersRef = useRef([])
  const userMarkerRef = useRef(null)
  const radiusCircleRef = useRef(null)
  const selectedMarkerRef = useRef(null)
  const routeLineRef = useRef(null)
  const socketRef = useRef(null)
  
  const [isLocating, setIsLocating] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(userLocation)
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [livePositions, setLivePositions] = useState({})
  const [isConnected, setIsConnected] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter = currentLocation || { lat: 28.6139, lng: 77.2090 }
    
    // Create map with enhanced options
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true,
      minZoom: 3,
      maxZoom: 19,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true
    }).setView([initialCenter.lat, initialCenter.lng], 13)

    mapRef.current = map

    // Add standard tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map)

    // Custom zoom control (bottom right)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Add scale control
    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)

    setMapReady(true)

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Real-time connection
  useEffect(() => {
    if (!enableRealTime) return

    const socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('🟢 Map: Real-time connection established')
      setIsConnected(true)
      
      // Subscribe to location updates
      if (currentLocation) {
        socket.emit('user:location', {
          userId: 'current-user',
          lat: currentLocation.lat,
          lng: currentLocation.lng,
          timestamp: Date.now()
        })
      }
    })

    socket.on('mechanic:location-update', (data) => {
      setLivePositions(prev => ({
        ...prev,
        [data.mechanicId]: {
          lat: data.lat,
          lng: data.lng,
          timestamp: data.timestamp
        }
      }))
    })

    socket.on('disconnect', () => {
      console.log('🔴 Map: Real-time connection lost')
      setIsConnected(false)
    })

    return () => {
      if (socket) socket.disconnect()
    }
  }, [enableRealTime, currentLocation])

  // Update user marker and radius
  useEffect(() => {
    if (!mapRef.current || !mapReady) return

    // Remove old user marker
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current)
      userMarkerRef.current = null
    }

    // Remove old radius circle
    if (radiusCircleRef.current) {
      mapRef.current.removeLayer(radiusCircleRef.current)
      radiusCircleRef.current = null
    }

    const location = currentLocation || userLocation
    if (!location) return

    // Add user marker with popup
    userMarkerRef.current = L.marker([location.lat, location.lng], {
      icon: userIcon,
      zIndexOffset: 1000,
      riseOnHover: true
    }).addTo(mapRef.current)

    userMarkerRef.current.bindPopup(`
      <div style="min-width: 180px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          📍 Your Location
        </div>
        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">
          📌 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
        </div>
        <div style="font-size: 12px; color: #94a3b8;">
          ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `, { className: 'custom-popup' })

    // Add search radius circle
    if (showRadius && searchRadius > 0) {
      radiusCircleRef.current = L.circle([location.lat, location.lng], {
        radius: searchRadius * 1000,
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.08,
        weight: 2,
        opacity: 0.5,
        dashArray: '10, 10'
      }).addTo(mapRef.current)
    }

    // Center map on user location
    mapRef.current.setView([location.lat, location.lng], 13, { animate: true, duration: 1 })
  }, [currentLocation, userLocation, searchRadius, showRadius, mapReady])

  // Calculate distance between two points
  const calculateDistance = useCallback((loc1, loc2) => {
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(loc2.lat - loc1.lat)
    const dLng = toRad(loc2.lng - loc1.lng)
    const lat1 = toRad(loc1.lat)
    const lat2 = toRad(loc2.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }, [])

  // Update mechanic markers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return

    // Clear old markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker))
    markersRef.current = []

    // Add mechanic markers
    mechanics.forEach(mechanic => {
      // Use live position if available
      const livePos = livePositions[mechanic.id]
      const position = livePos || { lat: mechanic.lat, lng: mechanic.lng }

      const distance = (currentLocation || userLocation) 
        ? calculateDistance(currentLocation || userLocation, position)
        : null

      const isSelected = selectedMechanic?.id === mechanic.id
      const icon = isSelected ? selectedIcon : mechanicIcon

      const marker = L.marker([position.lat, position.lng], {
        icon: icon,
        riseOnHover: true,
        riseOffset: 250
      }).addTo(mapRef.current)

      const serviceList = Array.isArray(mechanic.services)
        ? mechanic.services
        : typeof mechanic.services === 'string' && mechanic.services.trim()
          ? [mechanic.services]
          : []

      // Create rich popup content
      const popupContent = `
        <div style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            🔧 ${mechanic.name}
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
            <div style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 6px;">
              ⭐ <span style="font-weight: 700; color: #f59e0b;">${(mechanic.rating || 4.5).toFixed(1)}</span>
              ${mechanic.reviewCount ? `<span style="font-size: 11px;">(${mechanic.reviewCount} reviews)</span>` : ''}
            </div>
            ${distance ? `
              <div style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 6px;">
                📍 <span style="font-weight: 600; color: #3b82f6;">${distance.toFixed(2)} km</span> away
              </div>
            ` : ''}
            ${livePos ? `
              <div style="font-size: 12px; color: #10b981; display: flex; align-items: center; gap: 6px;">
                🟢 <span style="font-weight: 600;">Live Tracking</span>
              </div>
            ` : ''}
            ${serviceList.length > 0 ? `
              <div style="font-size: 12px; color: #8b5cf6; margin-top: 4px;">
                ${serviceList.slice(0, 2).join(', ')}${serviceList.length > 2 ? '...' : ''}
              </div>
            ` : ''}
          </div>
          <button 
            id="select-mechanic-${mechanic.id}"
            style="
              width: 100%;
              padding: 10px 16px;
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 700;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              transition: all 0.2s;
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(59, 130, 246, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'"
          >
            ${isSelected ? '✓ Selected' : 'Select Mechanic'}
          </button>
        </div>
      `

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
        maxWidth: 280,
        closeButton: true
      })

      // Handle marker click
      marker.on('click', () => {
        handleMechanicSelect(mechanic)
      })

      // Add tooltip on hover
      marker.bindTooltip(`
        <div style="font-weight: 700; font-size: 13px;">
          ${mechanic.name}<br/>
          <span style="font-size: 11px; font-weight: 500;">⭐ ${(mechanic.rating || 4.5).toFixed(1)} ${distance ? `• ${distance.toFixed(1)}km` : ''}</span>
        </div>
      `, {
        direction: 'top',
        offset: [0, -20],
        opacity: 0.95
      })

      markersRef.current.push(marker)
    })

    // Fit bounds to show all markers if we have mechanics
    if (mechanics.length > 0 && (currentLocation || userLocation)) {
      const bounds = L.latLngBounds([
        [(currentLocation || userLocation).lat, (currentLocation || userLocation).lng],
        ...mechanics.map(m => {
          const livePos = livePositions[m.id]
          return livePos ? [livePos.lat, livePos.lng] : [m.lat, m.lng]
        })
      ])
      mapRef.current.fitBounds(bounds, { 
        padding: [80, 80], 
        maxZoom: 15,
        animate: true,
        duration: 1
      })
    }
  }, [mechanics, livePositions, currentLocation, userLocation, selectedMechanic, mapReady, calculateDistance])

  // Handle mechanic selection
  const handleMechanicSelect = useCallback((mechanic) => {
    setSelectedMechanic(mechanic)
    
    // Draw route if user location exists
    if (routeLineRef.current && mapRef.current) {
      mapRef.current.removeLayer(routeLineRef.current)
      routeLineRef.current = null
    }

    const userLoc = currentLocation || userLocation
    if (userLoc && mapRef.current) {
      const livePos = livePositions[mechanic.id]
      const mechanicPos = livePos || { lat: mechanic.lat, lng: mechanic.lng }

      routeLineRef.current = L.polyline(
        [
          [userLoc.lat, userLoc.lng],
          [mechanicPos.lat, mechanicPos.lng]
        ],
        {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.7,
          dashArray: '12, 8',
          lineJoin: 'round',
          lineCap: 'round'
        }
      ).addTo(mapRef.current)

      // Fit bounds to show route
      const bounds = L.latLngBounds(
        [userLoc.lat, userLoc.lng],
        [mechanicPos.lat, mechanicPos.lng]
      )
      mapRef.current.fitBounds(bounds, { padding: [100, 100], animate: true })
    }

    if (onMechanicSelect) {
      onMechanicSelect(mechanic)
    }

    // Trigger button update via DOM
    setTimeout(() => {
      const button = document.getElementById(`select-mechanic-${mechanic.id}`)
      if (button) {
        button.textContent = '✓ Selected'
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      }
    }, 100)
  }, [currentLocation, userLocation, livePositions, onMechanicSelect])

  // Get current location
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert('❌ Geolocation not supported by your browser')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentLocation(newLocation)
        setIsLocating(false)

        // Send location to server if real-time enabled
        if (enableRealTime && socketRef.current?.connected) {
          socketRef.current.emit('user:location', {
            userId: 'current-user',
            ...newLocation,
            timestamp: Date.now()
          })
        }

        // Show success popup
        if (mapRef.current) {
          L.popup()
            .setLatLng([newLocation.lat, newLocation.lng])
            .setContent('📍 <strong>Location updated!</strong>')
            .openOn(mapRef.current)
          
          setTimeout(() => mapRef.current?.closePopup(), 2000)
        }
      },
      (error) => {
        console.error('Location error:', error)
        setIsLocating(false)
        alert('⚠️ Unable to get your location. Please check permissions.')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    )
  }, [enableRealTime])

  // Recenter map
  const handleRecenter = useCallback(() => {
    if (!mapRef.current) return
    
    const location = currentLocation || userLocation
    if (location) {
      mapRef.current.setView([location.lat, location.lng], 13, { animate: true, duration: 1 })
    }
  }, [currentLocation, userLocation])

  // Show all mechanics in view
  const handleShowAll = useCallback(() => {
    if (!mapRef.current || mechanics.length === 0) return

    const location = currentLocation || userLocation
    if (!location) return

    const bounds = L.latLngBounds([
      [location.lat, location.lng],
      ...mechanics.map(m => {
        const livePos = livePositions[m.id]
        return livePos ? [livePos.lat, livePos.lng] : [m.lat, m.lng]
      })
    ])
    
    mapRef.current.fitBounds(bounds, { 
      padding: [60, 60], 
      animate: true,
      duration: 1 
    })
  }, [mechanics, livePositions, currentLocation, userLocation])

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: height,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      border: '1px solid rgba(255,255,255,0.1)'
    }} className={className}>
      
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          background: '#e5e7eb'
        }} 
      />

      {/* Control Panel - Top Left */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 1000
      }}>
          {/* Locate Me Button */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            title="Find My Location"
            style={{
              width: '48px',
              height: '48px',
              background: isLocating ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              cursor: isLocating ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isLocating ? 'scale(0.95)' : 'scale(1)'
            }}
            onMouseEnter={(e) => !isLocating && (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => !isLocating && (e.target.style.transform = 'scale(1)')}
          >
            {isLocating ? '⏳' : '📍'}
          </button>

          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            title="Recenter Map"
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(147, 197, 253, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎯
          </button>

          {/* Show All Button */}
          <button
            onClick={handleShowAll}
            title="Show All Mechanics"
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(147, 197, 253, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🗺️
          </button>
      </div>

      {/* Status Badge - Top Right */}
      {enableRealTime && (
        <div style={{
          position: 'absolute',
          top: '72px',
          right: '16px',
          padding: '10px 14px',
          background: isConnected 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          animation: 'slideIn 0.5s ease-out'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: 'white',
            borderRadius: '50%',
            animation: isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          {isConnected ? '🟢 Live' : '🔴 Offline'}
        </div>
      )}



      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border: 1px solid rgba(147, 197, 253, 0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.98);
        }
        .leaflet-tooltip {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          padding: 8px 12px;
          color: white;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(30, 41, 59, 0.95);
        }
        .custom-marker {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-marker:hover {
          z-index: 1000 !important;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .custom-popup .leaflet-popup-content-wrapper {
            min-width: 200px !important;
          }
        }
      `}</style>
    </div>
  )
}
