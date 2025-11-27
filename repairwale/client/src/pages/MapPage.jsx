import React, { useState, useEffect } from 'react'
import MapView from '../components/MapViewNew'
import MechanicList from '../components/MechanicList'
import RequestList from '../components/RequestList'
import { db, hasFirebase } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Button from '../components/Button'

export default function MapPage(){
  const [mechanics, setMechanics] = useState([])
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('all')
  const [userLoc, setUserLoc] = useState(null)
  const [radiusKm, setRadiusKm] = useState(10)
  const [useDemo, setUseDemo] = useState(true)
  const [randomMechs, setRandomMechs] = useState([])
  const [sortBy, setSortBy] = useState('distance') // distance | rating

  useEffect(() => {
    fetch('/api/mechanics').then(r => r.json()).then(setMechanics).catch(console.warn)

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        pos => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLoc(null),
        { enableHighAccuracy: true, timeout: 8000 }
      )
    }

    if (hasFirebase && db) {
      const q = query(collection(db,'requests'), orderBy('createdAt','desc'))
      const unsub = onSnapshot(q, snap => {
        const arr = []
        snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
        setRequests(arr)
      })
      return () => unsub()
    } else {
      setRequests([])
      return () => {}
    }
  }, [])

  // Helpers
  function haversineKm(a, b){
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLng = toRad(b.lng - a.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }

  function jitterAround(loc, distKm){
    // random bearing and small distance in km -> lat/lng
    const bearing = Math.random() * 2 * Math.PI
    const R = 6371
    const d = distKm / R
    const lat1 = (loc.lat * Math.PI) / 180
    const lng1 = (loc.lng * Math.PI) / 180
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(bearing))
    const lng2 = lng1 + Math.atan2(Math.sin(bearing) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2))
    return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI }
  }

  function randomName(){
    const shops = ['AutoCare','QuickFix','SpeedyWrench','TurboGarage','Metro Motors','Prime Auto','Street Mechanics','GearUp','AutoCure','Reliable Motors']
    const owners = ['Ravi','Aman','Sanjay','Vikas','Imran','Arjun','Prakash','Nikhil','Deepak','Karan']
    return `${owners[Math.floor(Math.random()*owners.length)]} ${shops[Math.floor(Math.random()*shops.length)]}`
  }

  function generateRandomMechanics(center){
    if (!center) return []
    // Rings with different distance ranges and counts
    const rings = [
      { min: 1, max: 2, count: 4 },
      { min: 3, max: 6, count: 5 },
      { min: 8, max: 15, count: 5 }
    ]
    const out = []
    let id = 1000
    for (const ring of rings){
      for (let i=0;i<ring.count;i++){
        const dist = ring.min + Math.random() * (ring.max - ring.min)
        const p = jitterAround(center, dist)
        const rating = Math.round((3.8 + Math.random()*1.2) * 10) / 10
        out.push({ id: `r${id++}`, name: randomName(), lat: p.lat, lng: p.lng, rating })
      }
    }
    return out
  }

  useEffect(() => {
    if (userLoc && useDemo){
      setRandomMechs(generateRandomMechanics(userLoc))
    }
  }, [userLoc, useDemo])

  function haversineKm(a, b){
    const toRad = (x) => (x * Math.PI) / 180
    const R = 6371
    const dLat = toRad(b.lat - a.lat)
    const dLng = toRad(b.lng - a.lng)
    const lat1 = toRad(a.lat)
    const lat2 = toRad(b.lat)
    const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
    return 2 * R * Math.asin(Math.sqrt(h))
  }

  const sourceList = useDemo && userLoc ? randomMechs : mechanics

  const withDistance = sourceList.map(m => {
    if (!userLoc) return { ...m }
    const distanceKm = haversineKm(userLoc, { lat: m.lat, lng: m.lng })
    return { ...m, distanceKm: Math.round(distanceKm * 10) / 10 }
  })

  const nearby = withDistance
    .filter(m => (typeof m.distanceKm === 'number' ? m.distanceKm <= radiusKm : true))
    .sort((a,b) => {
      if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      return (a.distanceKm ?? 1e9) - (b.distanceKm ?? 1e9)
    })

  const filteredMechanics = nearby.filter(m => filter === 'all' ? true : (m.rating >= 4.5))

  return (
    <div className="map-page">
      <div className="map-column card">
        <div className="mapHeader" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:8}}>
          <div>
            <div style={{fontWeight:800}}>Live Map</div>
            <div className="muted">Find mechanics near you and request service instantly</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <Button variant={filter==='all'?'ghost':'ghost'} size="sm" onClick={()=>setFilter('all')}>All</Button>
            <Button variant={filter==='top'?'primary':'ghost'} size="sm" onClick={()=>setFilter('top')}>Top Rated</Button>
            <div style={{width:1,height:24,background:'var(--border)'}} />
            <label className="muted" style={{display:'flex',alignItems:'center',gap:6}}>
              <input type="checkbox" checked={useDemo} onChange={(e)=>setUseDemo(e.target.checked)} /> Demo Nearby
            </label>
            <Button variant="secondary" size="sm" onClick={()=> userLoc && setRandomMechs(generateRandomMechanics(userLoc))}>Refresh</Button>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div className="muted">{userLoc ? `Center: ${userLoc.lat.toFixed(3)}, ${userLoc.lng.toFixed(3)} • ${radiusKm} km radius` : 'Location off — showing all'}</div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <label className="muted">Radius</label>
            <select value={radiusKm} onChange={(e)=>setRadiusKm(Number(e.target.value))}>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
        </div>
        <MapView mechanics={filteredMechanics} initialCenter={userLoc || undefined} userLoc={userLoc || undefined} radiusKm={radiusKm} onRequest={(p,c)=>{ /* use map request handler */ }} />

        <div className="card" style={{marginTop:12}}>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <div className="muted">• Blue dot = your location</div>
            <div className="muted">• Grey circle = search radius</div>
            <div className="muted">• Pins = available mechanics</div>
          </div>
        </div>
      </div>
      <aside className="sidebar-column">
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{margin:0}}>Mechanics</h3>
            <div className="muted">{filteredMechanics.length} nearby</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center',margin:'8px 0'}}>
            <label className="muted">Sort</label>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <MechanicList mechanics={filteredMechanics} />
        </div>
        <div className="card" style={{marginTop:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{margin:0}}>Recent Requests</h3>
            <div className="muted">{(hasFirebase && db) ? 'live' : 'offline'}</div>
          </div>
          <RequestList requests={requests} onSelect={()=>{}} />
        </div>
      </aside>
    </div>
  )
}
