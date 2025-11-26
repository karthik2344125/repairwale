import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MiniMap({ mechanics = [], center = { lat: 28.6139, lng: 77.2090 }, zoom = 13 }){
  const ref = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    mapRef.current = L.map(ref.current, { zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false, tap:false, touchZoom: false }).setView([center.lat, center.lng], zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)
    return () => mapRef.current && mapRef.current.remove()
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    if (mapRef.current._markerGroup) mapRef.current.removeLayer(mapRef.current._markerGroup)
    const g = L.layerGroup()
    mechanics.forEach(m => {
      const mk = L.marker([m.lat, m.lng])
      g.addLayer(mk)
    })
    g.addTo(mapRef.current)
    mapRef.current._markerGroup = g
  }, [mechanics])

  return (
    <div style={{ width: '100%', height: 220, borderRadius: 10, overflow: 'hidden' }}>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
