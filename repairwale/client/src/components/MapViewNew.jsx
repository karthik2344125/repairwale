import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api'

// Fix Leaflet's default icon paths when bundling (so markers show correctly)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const bangaloreCenter = { lat: 12.9716, lng: 77.5946 }

export default function MapView({ mechanics = [], onRequest, initialCenter, userLoc, radiusKm }) {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const [center, setCenter] = useState(bangaloreCenter)
  const [hasLocation, setHasLocation] = useState(false)
  const [useGoogleMap, setUseGoogleMap] = useState(false)
  const overlayRef = useRef({})

  // Leaflet Map Setup
  useEffect(() => {
    if (useGoogleMap) return // skip Leaflet init if using Google Map
    if (!mapContainerRef.current) return

    mapRef.current = L.map(mapContainerRef.current, { zoomControl: true }).setView([center.lat, center.lng], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)
    // Update center only after the user completes interaction to reduce re-renders
    mapRef.current.on('moveend', () => {
      const c = mapRef.current.getCenter()
      setCenter({ lat: c.lat, lng: c.lng })
    })

    // move zoom controls to top-right for better UI
    if (mapRef.current.zoomControl && typeof mapRef.current.zoomControl.setPosition === 'function') {
      mapRef.current.zoomControl.setPosition('topright')
    }

    return () => mapRef.current && mapRef.current.remove()
  }, [useGoogleMap])

  // Recenter map when initialCenter changes
  useEffect(() => {
    if (!initialCenter) return
    setCenter(initialCenter)
    if (!useGoogleMap && mapRef.current){
      mapRef.current.setView([initialCenter.lat, initialCenter.lng], 14)
    }
  }, [initialCenter, useGoogleMap])

  // Update Markers for Leaflet
  useEffect(() => {
    if (useGoogleMap) return
    if (!mapRef.current) return
    // clear existing markers
    if (mapRef.current._markerGroup) mapRef.current.removeLayer(mapRef.current._markerGroup)
    const g = L.layerGroup()
    mechanics.forEach(m => {
      const mk = L.marker([m.lat, m.lng]).bindPopup(`<b>${m.name}</b><br/>${m.rating ?? ''} ★`)
      mk.on('click', () => {
        if (onRequest) onRequest(`Request to ${m.name}`, { lat: m.lat, lng: m.lng, mechanic: m })
      })
      g.addLayer(mk)
    })
    g.addTo(mapRef.current)
    mapRef.current._markerGroup = g
  }, [mechanics, useGoogleMap])

  // Leaflet overlays for user location and radius
  useEffect(() => {
    if (useGoogleMap) return
    if (!mapRef.current) return
    const { circle, me } = overlayRef.current
    if (circle) mapRef.current.removeLayer(circle)
    if (me) mapRef.current.removeLayer(me)
    if (userLoc){
      const meMarker = L.circleMarker([userLoc.lat, userLoc.lng], { radius: 6, color: '#3b82f6', fillColor: '#60a5fa', fillOpacity: 0.9 })
      meMarker.addTo(mapRef.current)
      overlayRef.current.me = meMarker
      if (radiusKm){
        const c = L.circle([userLoc.lat, userLoc.lng], { radius: radiusKm * 1000, color: '#444', fillColor: '#888', fillOpacity: 0.08 })
        c.addTo(mapRef.current)
        overlayRef.current.circle = c
      }
    }
  }, [userLoc, radiusKm, useGoogleMap])

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
    <div className="mapWrap" style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', background: '#0b1220' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setUseGoogleMap(false)} disabled={!useGoogleMap} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: useGoogleMap ? 'transparent' : '#111827', color: '#e5e7eb', cursor: useGoogleMap ? 'pointer' : 'default' }}>
            Leaflet
          </button>
          <button onClick={() => setUseGoogleMap(true)} disabled={useGoogleMap} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid var(--border)', background: useGoogleMap ? '#111827' : 'transparent', color: '#e5e7eb', cursor: useGoogleMap ? 'default' : 'pointer' }}>
            Google
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onRequest && onRequest('Assistance needed', center)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>Request here</button>
          <button onClick={goToMyLocation} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: '#e5e7eb', cursor: 'pointer' }}>My location</button>
        </div>
      </div>

      {!useGoogleMap ? (
        <>
          <div ref={mapContainerRef} style={{ height: '100%', minHeight: 420 }} />

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
          <GoogleMap mapContainerStyle={{ ...containerStyle, height: '420px' }} center={center} zoom={13} options={{ disableDefaultUI: false, zoomControl: true, streetViewControl: false, mapTypeControl: false }}>
            {mechanics.map(m => (
              <Marker key={m.id} position={{ lat: m.lat, lng: m.lng }} onClick={() => onRequest && onRequest(`Request to ${m.name}`, { lat: m.lat, lng: m.lng, mechanic: m })} />
            ))}
            {userLoc ? (
              <>
                <Marker position={{ lat: userLoc.lat, lng: userLoc.lng }} />
                {radiusKm ? (
                  <Circle center={{ lat: userLoc.lat, lng: userLoc.lng }} radius={radiusKm * 1000} options={{ strokeColor: '#38bdf8', fillColor: '#38bdf8', fillOpacity: 0.08 }} />
                ) : null}
              </>
            ) : null}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div style={{ minHeight: 420, padding: 20, border: '1px solid var(--border)', color: '#e5e7eb' }}>
          <p>Google Maps API key missing. Please provide the API key to display the map.</p>
        </div>
      )}
    </div>
  )
}
