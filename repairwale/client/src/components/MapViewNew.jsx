import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Fix Leaflet's default icon paths when bundling (so markers show correctly)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const bangaloreCenter = { lat: 12.9716, lng: 77.5946 }

export default function MapView({ mechanics = [], onRequest }) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const [center, setCenter] = useState(bangaloreCenter)
  const [hasLocation, setHasLocation] = useState(false)
  const [useGoogleMap, setUseGoogleMap] = useState(false)

  // Leaflet Map Setup
  useEffect(() => {
    if (useGoogleMap) return // skip Leaflet init if using Google Map
    if (!mapContainerRef.current) return

    mapRef.current = L.map(mapContainerRef.current, { zoomControl: true }).setView([center.lat, center.lng], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)
    mapRef.current.on('move', () => {
      const c = mapRef.current.getCenter()
      setCenter({ lat: c.lat, lng: c.lng })
    })

    // move zoom controls to top-right for better UI
    if (mapRef.current.zoomControl && typeof mapRef.current.zoomControl.setPosition === 'function') {
      mapRef.current.zoomControl.setPosition('topright')
    }

    return () => mapRef.current && mapRef.current.remove()
  }, [useGoogleMap])

  // Update Markers for Leaflet
  useEffect(() => {
    if (useGoogleMap) return
    if (!mapRef.current) return
    // clear existing markers
    if (mapRef.current._markerGroup) mapRef.current.removeLayer(mapRef.current._markerGroup)
    const g = L.layerGroup()
    mechanics.forEach(m => {
      const mk = L.marker([m.lat, m.lng]).bindPopup(`<b>${m.name}</b><br/>${m.rating} ★`)
      g.addLayer(mk)
    })
    g.addTo(mapRef.current)
    mapRef.current._markerGroup = g
  }, [mechanics, useGoogleMap])

  // Handle "Go To My Location" for both maps
  const goToMyLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setHasLocation(true)
        setCenter({ lat: latitude, lng: longitude })
        if (useGoogleMap) {
          // Google Maps will update via center state
        } else {
          mapRef.current.setView([latitude, longitude], 15)
        }
      },
      err => alert('Could not get location: ' + err.message)
    )
  }

  // Google Maps container style
  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '' // add your key here or via env variable

  return (
    <div className="mapWrap" style={{ position: 'relative' }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setUseGoogleMap(false)} disabled={!useGoogleMap}>
          Leaflet Map
        </button>
        <button onClick={() => setUseGoogleMap(true)} disabled={useGoogleMap}>
          Google Map
        </button>
      </div>

      {!useGoogleMap ? (
        <>
          <div ref={mapContainerRef} style={{ height: '100%', minHeight: 400 }} />

          {/* center marker overlay */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-100%)',
              pointerEvents: 'none',
              zIndex: 1000
            }}
          >
            <img
              alt="center"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'><path fill='%23d00' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/><circle cx='12' cy='9' r='2.5' fill='white'/></svg>"
            />
          </div>
        </>
      ) : googleMapsApiKey ? (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
            {mechanics.map(m => (
              <Marker key={m.id} position={{ lat: m.lat, lng: m.lng }} />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div style={{ minHeight: 400, padding: 20, border: '1px solid #ccc' }}>
          <p>Google Maps API key missing. Please provide the API key to display the map.</p>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <button onClick={() => onRequest && onRequest('Assistance needed', center)}>Request Here</button>
        <button onClick={goToMyLocation}>Go To My Location</button>
      </div>
    </div>
  )
}
