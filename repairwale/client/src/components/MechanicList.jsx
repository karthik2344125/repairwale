import React from 'react'
import Button from './Button'
import { IconMapPin } from '../icons'

export default function MechanicList({ mechanics = [] }){
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
                  <div className="muted"><small>{m.rating} ★</small></div>
                </div>
              </div>
              <div className="mechanicActions">
                <Button variant="primary" size="sm">Call</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
