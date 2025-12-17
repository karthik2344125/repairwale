import React, { memo } from 'react'
import Button from './Button'
import { IconMapPin } from '../icons'

function MechanicList({ mechanics = [], onCall, onRequest }){
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Mechanics Nearby</h3>
      <div>
        {mechanics.map(m => (
          <div key={m.id} className="mechanicItem card">
            <div className="mechanicRow">
              <div className="mechanicInfo">
                <div className="iconWrap"><IconMapPin size={20} /></div>
                <div>
                  <div className="mechanicName">{m.name}</div>
                  <div className="muted"><small>{m.rating} ★{typeof m.distanceKm === 'number' ? ` • ${m.distanceKm} km away` : ''}</small></div>
                </div>
              </div>
              <div className="mechanicActions">
                <Button variant="ghost" size="sm" onClick={() => onRequest && onRequest(m)}>Request</Button>
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
