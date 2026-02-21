import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Custom mechanic icon (wrench)
const mechanicIcon = L.divIcon({
  html: '<div style="background: rgba(30, 58, 138, 0.9); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-size: 18px;">🔧</div>',
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18]
})

// User location icon
const userIcon = L.divIcon({
  html: '<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.3);"></div>',
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
})

export default function SimpleMapView({ 
  mechanics = [], 
  userLocation, 
  onMechanicSelect,
  searchRadius = 10
}) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const markersRef = useRef([])
  const userMarkerRef = useRef(null)
  const radiusCircleRef = useRef(null)
  const [isLocating, setIsLocating] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter = userLocation || { lat: 28.6139, lng: 77.2090 } // Delhi
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false // We'll add custom controls
    }).setView([initialCenter.lat, initialCenter.lng], 13)

    // Clean, simple tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(mapRef.current)

    // Custom zoom control (bottom right)
    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update center when user location changes
  useEffect(() => {
    if (!mapRef.current || !userLocation) return
    mapRef.current.setView([userLocation.lat, userLocation.lng], 13, { animate: true })
  }, [userLocation])

  // Update user marker and radius
  useEffect(() => {
    if (!mapRef.current) return

    // Remove old user marker and circle
    if (userMarkerRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current)
      userMarkerRef.current = null
    }
    if (radiusCircleRef.current) {
      mapRef.current.removeLayer(radiusCircleRef.current)
      radiusCircleRef.current = null
    }

    if (userLocation) {
      // Add user marker
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000
      }).addTo(mapRef.current)
      userMarkerRef.current.bindPopup('<b>📍 Your Location</b>')

      // Add search radius circle
      if (searchRadius > 0) {
        radiusCircleRef.current = L.circle([userLocation.lat, userLocation.lng], {
          radius: searchRadius * 1000,
          color: 'rgba(30, 58, 138, 0.6)',
          fillColor: 'rgba(30, 58, 138, 0.1)',
          fillOpacity: 0.3,
          weight: 2
        }).addTo(mapRef.current)
      }
    }
  }, [userLocation, searchRadius])

  // Update mechanic markers
  useEffect(() => {
    if (!mapRef.current) return

    // Clear old markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker))
    markersRef.current = []

    // Add new markers
    mechanics.forEach(mechanic => {
      const marker = L.marker([mechanic.lat, mechanic.lng], {
        icon: mechanicIcon
      }).addTo(mapRef.current)

      const popupContent = `
        <div style="min-width: 200px;">
          <div style="font-weight: 700; font-size: 15px; color: #1e293b; margin-bottom: 8px;">
            ${mechanic.name}
          </div>
          <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">
            ⭐ ${mechanic.rating?.toFixed(1) || '4.5'} • 
            📍 ${mechanic.distanceKm ? `${mechanic.distanceKm} km away` : 'Nearby'}
          </div>
          <button 
            onclick="window.selectMechanic('${mechanic.id}')"
            style="
              width: 100%;
              padding: 8px 12px;
              background: rgba(30, 58, 138, 0.9);
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              font-size: 13px;
            ">
            Select Mechanic
          </button>
        </div>
      `
      marker.bindPopup(popupContent)

      marker.on('click', () => {
        if (onMechanicSelect) onMechanicSelect(mechanic)
      })

      markersRef.current.push(marker)
    })

    // Fit bounds to show all markers
    if (mechanics.length > 0 && userLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        ...mechanics.map(m => [m.lat, m.lng])
      ])
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [mechanics, onMechanicSelect])

  // Handle "My Location" button
  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15, { animate: true })
        }
        setIsLocating(false)
      },
      (error) => {
        console.error('Location error:', error)
        alert('Unable to get your location')
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map Container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }} />

      {/* Simple Floating Controls */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 1000
      }}>
        {/* My Location Button */}
        <button
          onClick={handleMyLocation}
          disabled={isLocating}
          style={{
            width: '44px',
            height: '44px',
            background: 'white',
            border: '2px solid rgba(30, 58, 138, 0.3)',
            borderRadius: '8px',
            cursor: isLocating ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            opacity: isLocating ? 0.6 : 1,
            transition: 'all 0.2s'
          }}
          title="My Location"
        >
          {isLocating ? '⏳' : '📍'}
        </button>
      </div>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        background: 'white',
        border: '2px solid rgba(30, 58, 138, 0.2)',
        borderRadius: '8px',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontSize: '12px',
        fontWeight: '600'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '16px' }}>🔧</span>
          <span>Mechanics ({mechanics.length})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '50%', border: '2px solid white' }}></div>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  )
}
