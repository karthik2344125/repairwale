import React, { useEffect, useRef, useState, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { connectRealtimeWithFallback } from '../services/realtime'

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const markerGlyph = (kind, size) => {
  const iconSize = Math.max(14, Math.round(size * 0.38))

  if (kind === 'user') {
    return `
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2.4c-4.3 0-7.8 3.5-7.8 7.8 0 5.2 7.8 11.4 7.8 11.4s7.8-6.2 7.8-11.4c0-4.3-3.5-7.8-7.8-7.8z" fill="#1D4ED8"/>
        <circle cx="12" cy="10.2" r="5.2" fill="#FFFFFF"/>
        <circle cx="12" cy="10.2" r="2.4" fill="#1E3A8A"/>
        <circle cx="12" cy="10.2" r="6.3" fill="none" stroke="rgba(125,211,252,0.95)" stroke-width="1.5"/>
        <path d="M12 4.1v2.2M12 14.1v2.2M5.9 10.2h2.2M15.9 10.2h2.2" stroke="rgba(125,211,252,0.95)" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
    `
  }

  if (kind === 'selected') {
    return `
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2.5 14.8 8l6 .8-4.4 4 1.2 5.8L12 15.9 6.4 18.6l1.2-5.8-4.4-4 6-.8L12 2.5z" fill="#FFFFFF"/>
      </svg>
    `
  }

  return `
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2.4c-4.3 0-7.8 3.5-7.8 7.8 0 5.2 7.8 11.6 7.8 11.6s7.8-6.4 7.8-11.6c0-4.3-3.5-7.8-7.8-7.8z" fill="#14B8A6"/>
      <path d="M15.7 6.8c-.5-.5-1.3-.5-1.8 0l-.7.7-1.1-1.1c-.3-.3-.8-.3-1.1 0l-.8.8c-.3.3-.3.8 0 1.1l1.1 1.1L9.2 11.4l-1.1-1.1c-.3-.3-.8-.3-1.1 0l-.8.8c-.5.5-.5 1.3 0 1.8l1.1 1.1-1 1c-.5.5-.5 1.3 0 1.8l.7.7c.5.5 1.3.5 1.8 0l1-1 1.1 1.1c.5.5 1.3.5 1.8 0l.8-.8c.3-.3.3-.8 0-1.1l-1.1-1.1 2.5-2.5 1.1 1.1c.3.3.8.3 1.1 0l.8-.8c.3-.3.3-.8 0-1.1l-1.1-1.1.7-.7c.5-.5.5-1.3 0-1.8l-.8-.8z" fill="#0B1F3B"/>
    </svg>
  `
}

// Custom styled icons
const createCustomIcon = (kind, color, size = 40) => {
  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        display: grid;
        place-items: center;
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.32));
      ">${markerGlyph(kind, size)}</div>
    `,
    className: `custom-marker custom-marker-${kind}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  })
}

const mechanicIcon = createCustomIcon('mechanic', '#14B8A6', 50)
const userIcon = createCustomIcon('user', '#2563EB', 58)
const selectedIcon = createCustomIcon('selected', '#0B1F3B', 52)

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
  const routeRequestRef = useRef(0)
  const socketRef = useRef(null)
  const hasAutoFittedRef = useRef(false)
  const lastFitSignatureRef = useRef('')
  const suppressAutoFitUntilRef = useRef(0)
  
  const [isLocating, setIsLocating] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(userLocation)
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [livePositions, setLivePositions] = useState({})
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (userLocation) {
      setCurrentLocation(userLocation)
    }
  }, [userLocation])

  const getMechanicPhone = useCallback((mechanic) => {
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
  }, [])

  const getMechanicPosition = useCallback((mechanic) => {
    const livePos = livePositions[mechanic.id]
    return livePos ? { lat: livePos.lat, lng: livePos.lng } : { lat: mechanic.lat, lng: mechanic.lng }
  }, [livePositions])

  const getBoundsSignature = useCallback((location, data) => {
    const items = data
      .map((m) => {
        const pos = getMechanicPosition(m)
        return `${m.id}:${pos.lat.toFixed(4)},${pos.lng.toFixed(4)}`
      })
      .sort()
      .join('|')
    return `${location.lat.toFixed(4)},${location.lng.toFixed(4)}::${items}`
  }, [getMechanicPosition])

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter = currentLocation || userLocation || { lat: 20, lng: 0 }
    
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
      attribution: ' OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map)

    // Custom zoom control (bottom right)
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Pause auto-fit briefly when user interacts with the map.
    const markUserInteraction = () => {
      suppressAutoFitUntilRef.current = Date.now() + 20000
    }
    map.on('dragstart zoomstart', markUserInteraction)

    setMapReady(true)

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
      if (mapRef.current) {
        map.off('dragstart zoomstart', markUserInteraction)
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Real-time connection
  useEffect(() => {
    if (!enableRealTime) return

    const realtime = connectRealtimeWithFallback({
      options: {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 10
      },
      onConnect: (socket) => {
        socketRef.current = socket
        console.log(' Map: Real-time connection established')
        setIsConnected(true)

        if (currentLocation) {
          socket.emit('user:location', {
            userId: 'current-user',
            lat: currentLocation.lat,
            lng: currentLocation.lng,
            timestamp: Date.now()
          })
        }

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
          console.log(' Map: Real-time connection lost')
          setIsConnected(false)
        })
      },
      onError: () => {
        setIsConnected(false)
      }
    })

    return () => {
      realtime.disconnect()
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
      zIndexOffset: 2000,
      riseOnHover: true
    }).addTo(mapRef.current)

    userMarkerRef.current.bindTooltip('Live location', {
      permanent: true,
      direction: 'top',
      offset: [0, -14],
      className: 'rw-user-tooltip',
      opacity: 1
    })

    // Add search radius circle
    if (showRadius && searchRadius > 0) {
      radiusCircleRef.current = L.circle([location.lat, location.lng], {
        radius: searchRadius * 1000,
        color: '#0B1F3B',
        fillColor: '#0B1F3B',
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

  const drawRoadRoute = useCallback(async (mechanic) => {
    const map = mapRef.current
    const userLoc = currentLocation || userLocation
    if (!map || !mechanic || !userLoc) return

    const mechanicPos = getMechanicPosition(mechanic)

    if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current)
      routeLineRef.current = null
    }

    const requestId = routeRequestRef.current + 1
    routeRequestRef.current = requestId

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLoc.lng},${userLoc.lat};${mechanicPos.lng},${mechanicPos.lat}?overview=full&geometries=geojson&alternatives=false&steps=false`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Routing API error ${response.status}`)
      }

      const data = await response.json()
      if (routeRequestRef.current !== requestId) return

      const route = data?.routes?.[0]
      const coords = route?.geometry?.coordinates
      if (!route || !Array.isArray(coords) || coords.length < 2) {
        throw new Error('Route geometry unavailable')
      }

      const latLngs = coords.map(([lng, lat]) => [lat, lng])
      const roadDistanceKm = (route.distance || 0) / 1000
      const roadEtaMin = Math.max(1, Math.round((route.duration || 0) / 60))
      const arriveBy = new Date(Date.now() + roadEtaMin * 60000)
      const arriveByText = arriveBy.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

      routeLineRef.current = L.polyline(latLngs, {
        color: '#0B1F3B',
        weight: 4,
        opacity: 0.85,
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(map)

      routeLineRef.current.bindTooltip(
        `<div style="font-size:11px;font-weight:700;line-height:1.35;">Road: ${roadDistanceKm.toFixed(1)} km • ETA ${roadEtaMin} min<br/>Arrive by ${arriveByText}</div>`,
        {
          permanent: true,
          direction: 'center',
          className: 'custom-popup',
          opacity: 0.95
        }
      )

      map.fitBounds(routeLineRef.current.getBounds(), { padding: [90, 90], animate: true })
    } catch (error) {
      console.warn('Road routing unavailable, falling back to straight line.', error)
      if (routeRequestRef.current !== requestId) return

      routeLineRef.current = L.polyline(
        [
          [userLoc.lat, userLoc.lng],
          [mechanicPos.lat, mechanicPos.lng]
        ],
        {
          color: '#0B1F3B',
          weight: 4,
          opacity: 0.7,
          dashArray: '12, 8',
          lineJoin: 'round',
          lineCap: 'round'
        }
      ).addTo(map)

      const bounds = L.latLngBounds(
        [userLoc.lat, userLoc.lng],
        [mechanicPos.lat, mechanicPos.lng]
      )
      map.fitBounds(bounds, { padding: [100, 100], animate: true })
    }
  }, [currentLocation, userLocation, getMechanicPosition])

  // Update mechanic markers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return

    // Clear old markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker))
    markersRef.current = []

    // Add mechanic markers
    mechanics.forEach(mechanic => {
      const position = getMechanicPosition(mechanic)

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

      // Handle marker click
      marker.on('click', () => {
        handleMechanicSelect(mechanic)
      })

      // Show only mechanic identity + distance on map.
      marker.bindTooltip(`
        <div style="font-weight:700;font-size:12px;line-height:1.2;">
          ${mechanic.name}<br/>
          <span style="font-size:11px;font-weight:600;opacity:0.95;">${distance ? `${distance.toFixed(1)} km away` : 'distance unavailable'}</span>
        </div>
      `, {
        direction: 'top',
        offset: [0, -18],
        opacity: 0.96
      })

      markersRef.current.push(marker)
    })

    // Fit bounds to show all markers, but avoid fighting with active user interactions.
    if (mechanics.length > 0 && (currentLocation || userLocation) && !selectedMechanic) {
      const location = currentLocation || userLocation
      const signature = getBoundsSignature(location, mechanics)
      const isWithinSuppressWindow = Date.now() < suppressAutoFitUntilRef.current
      const shouldFit = (!hasAutoFittedRef.current || signature !== lastFitSignatureRef.current) && !isWithinSuppressWindow

      if (shouldFit) {
        const bounds = L.latLngBounds([
          [location.lat, location.lng],
          ...mechanics.map((m) => {
            const pos = getMechanicPosition(m)
            return [pos.lat, pos.lng]
          })
        ])

        mapRef.current.fitBounds(bounds, {
          padding: [80, 80],
          maxZoom: 15,
          animate: true,
          duration: 1
        })

        hasAutoFittedRef.current = true
        lastFitSignatureRef.current = signature
      }
    }
  }, [mechanics, livePositions, currentLocation, userLocation, selectedMechanic, mapReady, calculateDistance, getMechanicPosition, getBoundsSignature])

  // Handle mechanic selection
  const handleMechanicSelect = useCallback((mechanic) => {
    setSelectedMechanic(mechanic)

    void drawRoadRoute(mechanic)

    if (onMechanicSelect) {
      onMechanicSelect(mechanic)
    }

  }, [onMechanicSelect, drawRoadRoute])

  useEffect(() => {
    if (!selectedMechanic) return
    void drawRoadRoute(selectedMechanic)
  }, [selectedMechanic, currentLocation, userLocation, livePositions, drawRoadRoute])

  // Get current location
  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      alert(' Geolocation not supported by your browser')
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
            .setContent(' <strong>Location updated!</strong>')
            .openOn(mapRef.current)
          
          setTimeout(() => mapRef.current?.closePopup(), 2000)
        }
      },
      (error) => {
        console.error('Location error:', error)
        setIsLocating(false)
        alert(' Unable to get your location. Please check permissions.')
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
      ...mechanics.map((m) => {
        const pos = getMechanicPosition(m)
        return [pos.lat, pos.lng]
      })
    ])
    
    mapRef.current.fitBounds(bounds, { 
      padding: [60, 60], 
      animate: true,
      duration: 1 
    })
  }, [mechanics, livePositions, currentLocation, userLocation, getMechanicPosition])

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: height,
      borderRadius: '0px',
      overflow: 'hidden',
      boxShadow: 'none',
      border: 'none'
    }} className={className}>
      
      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          background: '#0B1F3B'
        }} 
      />

      {/* Recenter Icon */}
      <button
        onClick={handleRecenter}
        title="Recenter Map"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '44px',
          height: '44px',
          zIndex: 1000,
          background: 'rgba(8,23,42,0.88)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.24)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      </button>

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
          background: #0B1F3B;
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .custom-popup .leaflet-popup-tip {
          background: #0B1F3B;
        }
        .custom-popup .leaflet-popup-close-button {
          color: rgba(255,255,255,0.8);
        }
        .leaflet-tooltip {
          background: rgba(11,31,59,0.95);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          padding: 8px 12px;
          color: white;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(11,31,59,0.95);
        }
        .custom-marker {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent !important;
          border: 0 !important;
        }
        .custom-marker:hover {
          z-index: 1000 !important;
          transform: scale(1.1);
        }
        .custom-marker-user {
          animation: livePulse 2.2s ease-in-out infinite;
        }
        .custom-marker-mechanic svg {
          transform-origin: center;
        }
        .custom-marker-mechanic:hover svg {
          transform: scale(1.04);
        }
        .rw-user-tooltip.leaflet-tooltip {
          background: rgba(37, 99, 235, 0.96);
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 10px 24px rgba(0,0,0,0.28);
          border-radius: 999px;
          padding: 6px 10px;
          backdrop-filter: blur(8px);
        }
        .rw-user-tooltip.leaflet-tooltip::before {
          border-top-color: rgba(37, 99, 235, 0.96);
        }
        @keyframes livePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .leaflet-bottom .leaflet-control {
          margin-bottom: 12px;
        }
        .leaflet-left .leaflet-control {
          margin-left: 10px;
        }
        .leaflet-right .leaflet-control {
          margin-right: 12px;
        }
        .leaflet-control-container .leaflet-bottom.leaflet-right {
          margin: 0;
          padding: 0;
        }
        .leaflet-bottom.leaflet-right .leaflet-control {
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,0.18) !important;
          border-radius: 20px !important;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.24) !important;
          background: rgba(8,23,42,0.88) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(8,23,42,0.94) !important;
          color: #FFFFFF !important;
          border-bottom: 1px solid rgba(255,255,255,0.14) !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(14,42,77,1) !important;
          color: #FFFFFF !important;
        }
        .leaflet-control-zoom a:last-child {
          border-bottom: none !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          font-weight: 700 !important;
        }
        @media (max-width: 768px) {
          .custom-popup .leaflet-popup-content-wrapper {
            min-width: 200px !important;
          }
          .leaflet-control-zoom {
            margin-bottom: 8px !important;
            margin-right: 8px !important;
          }
        }
        @media (max-width: 980px) {
          .rw-map-selected-panel {
            left: 14px !important;
            right: 14px !important;
          }
        }
      `}</style>
    </div>
  )
}


