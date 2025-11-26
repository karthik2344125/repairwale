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

  useEffect(() => {
    fetch('/api/mechanics').then(r => r.json()).then(setMechanics).catch(console.warn)

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

  const filteredMechanics = mechanics.filter(m => filter === 'all' ? true : (m.rating >= 4.5))

  return (
    <div className="map-page">
      <div className="map-column card">
        <div className="mapHeader" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:8}}>
          <div>
            <div style={{fontWeight:800}}>Live Map</div>
            <div className="muted">Find mechanics near you and request service instantly</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <Button variant={filter==='all'?'ghost':'ghost'} size="sm" onClick={()=>setFilter('all')}>All</Button>
            <Button variant={filter==='top'?'primary':'ghost'} size="sm" onClick={()=>setFilter('top')}>Top Rated</Button>
          </div>
        </div>

        <MapView mechanics={filteredMechanics} onRequest={(p,c)=>{ /* use map request handler */ }} />
      </div>
      <aside className="sidebar-column">
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{margin:0}}>Mechanics</h3>
            <div className="muted">{filteredMechanics.length} nearby</div>
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
