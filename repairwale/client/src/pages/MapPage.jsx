import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MapView from '../components/MapViewNew'
import { showSuccess } from '../services/toast'
import MechanicList from '../components/MechanicList'
import RequestList from '../components/RequestList'
import { db, hasFirebase } from '../firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Button from '../components/Button'

export default function MapPage(){
  const navigate = useNavigate()
  const [mechanics, setMechanics] = useState([])
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('all')
  const [userLoc, setUserLoc] = useState(null)
  const [radiusKm, setRadiusKm] = useState(10)
  const [useDemo, setUseDemo] = useState(true)
  const [randomMechs, setRandomMechs] = useState([])
  const [sortBy, setSortBy] = useState('distance') // distance | rating
  const [liveRefresh, setLiveRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)

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
      setLastUpdate(new Date())
    }
  }, [userLoc, useDemo])

  // Live tick: drift demo mechanics every few seconds to simulate movement
  useEffect(() => {
    if (!useDemo || !userLoc || !liveRefresh) return
    const id = setInterval(() => {
      setRandomMechs(prev => prev.map(m => {
        const jitter = jitterAround({ lat: m.lat, lng: m.lng }, 0.6 + Math.random() * 0.4)
        const rating = m.rating ?? (3.8 + Math.random() * 1.2)
        return { ...m, lat: jitter.lat, lng: jitter.lng, rating }
      }))
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(id)
  }, [useDemo, userLoc, liveRefresh])

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
    <div className="page-container">
      {/* Action Buttons */}
      <div style={{display:'flex',gap:16,marginBottom:24,padding:20,background:'var(--bg-tertiary)',borderRadius:12,border:'1px solid var(--border)'}}>
        <Button variant="primary" size="lg" style={{flex:1,fontSize:16,padding:'14px 24px'}}>
          🔍 Search Mechanics Nearby
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate('/service')} style={{flex:1,fontSize:16,padding:'14px 24px'}}>
          🛠️ Browse Services
        </Button>
      </div>

      <div className="page-header">
        <h1 className="page-title">📍 Find Mechanics Nearby</h1>
        <p className="page-subtitle">Real-time map • {filteredMechanics.length} mechanics within {radiusKm}km • Live tracking {liveRefresh ? 'ON' : 'OFF'}</p>
      </div>

      <div className="grid grid-2">
        <div>
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Live Location Map</h3>
                <p className="card-subtitle">Click markers to request service instantly</p>
              </div>
              <div className="flex gap-8">
                <Button variant={filter==='all'?'primary':'ghost'} size="sm" onClick={()=>setFilter('all')}>All</Button>
                <Button variant={filter==='top'?'primary':'ghost'} size="sm" onClick={()=>setFilter('top')}>Top Rated</Button>
              </div>
            </div>

            <div className="flex-between mb-16">
              <div className="flex gap-8">
                <label className="muted flex gap-8" style={{alignItems:'center'}}>
                  <input type="checkbox" checked={useDemo} onChange={(e)=>setUseDemo(e.target.checked)} /> Demo Mode
                </label>
                <Button variant={liveRefresh ? 'primary' : 'ghost'} size="sm" onClick={()=> setLiveRefresh(v=>!v)}>
                  {liveRefresh ? '🔴 Live' : '⚪ Paused'}
                </Button>
              </div>
              <div className="flex gap-8" style={{alignItems:'center'}}>
                <label className="muted" style={{fontSize:13}}>Radius:</label>
                <select className="form-select" value={radiusKm} onChange={(e)=>setRadiusKm(Number(e.target.value))} style={{width:'auto',padding:'6px 12px',fontSize:13}}>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={20}>20 km</option>
                  <option value={50}>50 km</option>
                </select>
              </div>
            </div>

            <MapView 
              mechanics={filteredMechanics} 
              initialCenter={userLoc || undefined} 
              userLoc={userLoc || undefined} 
              radiusKm={radiusKm} 
              onRequest={(p,c)=>{ 
                try {
                  const raw = localStorage.getItem('rw_requests')
                  const arr = raw ? JSON.parse(raw) : []
                  arr.unshift({ id: `REQ-${Date.now()}`, title: p, loc: c, status: 'pending', createdAt: Date.now() })
                  localStorage.setItem('rw_requests', JSON.stringify(arr))
                  showSuccess('Request placed for selected location')
                } catch {}
              }} 
            />

            <div style={{marginTop:16,padding:12,background:'rgba(30,58,138,0.05)',borderRadius:10,fontSize:12,color:'var(--muted)',display:'flex',flexWrap:'wrap',gap:16}}>
              <span>🔵 Your location</span>
              <span>⭕ Search radius</span>
              <span>📍 Available mechanics</span>
              {lastUpdate && <span>⏱️ Updated {lastUpdate.toLocaleTimeString()}</span>}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Nearby Mechanics</h3>
                <p className="card-subtitle">{filteredMechanics.length} available now</p>
              </div>
              <select className="form-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)} style={{width:'auto',padding:'6px 12px',fontSize:13}}>
                <option value="distance">By Distance</option>
                <option value="rating">By Rating</option>
              </select>
            </div>
            {/* Scrollable mechanics list container */}
            <div style={{maxHeight:'500px',overflowY:'auto',paddingRight:'8px'}}>
              <MechanicList 
                mechanics={filteredMechanics} 
                onRequest={(m)=>{
                  try{
                    const raw = localStorage.getItem('rw_requests')
                    const arr = raw ? JSON.parse(raw) : []
                    const center = userLoc || (m ? {lat:m.lat,lng:m.lng} : null)
                    arr.unshift({ id: `REQ-${Date.now()}`, title: `Request to ${m.name}`, loc: center, status: 'pending', createdAt: Date.now() })
                    localStorage.setItem('rw_requests', JSON.stringify(arr))
                    showSuccess('Request placed for selected mechanic')
                  }catch{}
                }}
                onCall={(m, phone)=>{
                  showSuccess(`Calling ${m.name} at ${phone}`)
                  window.open(`tel:${phone}`)
                }}
              />
            </div>
          </div>

          <div className="card mt-16">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recent Requests</h3>
                <p className="card-subtitle">{(hasFirebase && db) ? 'Live updates' : 'Offline mode'}</p>
              </div>
            </div>
            <RequestList requests={requests} onSelect={()=>{}} />
          </div>
        </div>
      </div>

      <div className="flex-between mt-16">
        <Button variant="ghost" onClick={()=> navigate('/customer-dashboard')}>← Back to Dashboard</Button>
        <Button variant="primary" onClick={()=> navigate('/service')}>Browse Services →</Button>
      </div>
    </div>
  )
}
