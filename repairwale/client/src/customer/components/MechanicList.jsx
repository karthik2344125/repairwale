import React, { memo } from 'react'
import Button from '../../shared/components/Button'
import { IconMapPin } from '../../icons'

function MechanicList({ mechanics = [], onCall, onRequest, onChat }){
  if (!mechanics.length) {
    return (
      <div className="card" style={{padding:16, textAlign:'center', color:'var(--text-muted)'}}>
        <div style={{fontWeight:600, marginBottom:6}}>No mechanics found in this radius.</div>
        <div style={{fontSize:13}}>Try widening the radius or enable location to improve accuracy.</div>
      </div>
    )
  }

  return (
    <div>
      <h3 style={{ marginTop: 0, display:'flex', alignItems:'center', gap:8 }}>
        <span>Mechanics Nearby</span>
        <span style={{fontSize:12, color:'var(--muted)'}}>({mechanics.length})</span>
      </h3>
      <div>
        {mechanics.map(m => (
          <div key={m.id} className="mechanicItem card" style={{marginBottom:10}}>
            <div className="mechanicRow" style={{alignItems:'center'}}>
              <div className="mechanicInfo">
                <div className="iconWrap"><IconMapPin size={20} /></div>
                <div>
                  <div className="mechanicName" style={{fontWeight:600}}>{m.name}</div>
                  <div className="muted" style={{fontSize:12}}>
                    <small>
                      {m.rating ? `${m.rating} ★` : 'Rating N/A'}
                      {typeof m.distanceKm === 'number' ? ` • ${m.distanceKm} km away` : ''}
                    </small>
                  </div>
                </div>
              </div>
              <div className="mechanicActions" style={{display:'flex',gap:8,alignItems:'center'}}>
                <Button variant="ghost" size="sm" onClick={() => onRequest && onRequest(m)}>Request</Button>
                {onChat && (
                  <Button variant="ghost" size="sm" onClick={() => onChat(m)} style={{background:'rgba(59,130,246,0.1)',color:'#3b82f6'}}>
                    💬
                  </Button>
                )}
                <Button variant="primary" size="sm" onClick={() => {
                  const phone = m.phone || `9${String(m.id).replace(/\D/g,'').slice(-9).padStart(9,'5')}`
                  if(onCall){ onCall(m, phone) } else { window.open(`tel:${phone}`) }
                }}>Call</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(MechanicList)
