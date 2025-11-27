import React, { useState } from 'react'
import Button from './Button'
import { IconMapPin } from '../icons'

export default function MechanicList({ mechanics = [] }){
  const [selectedMechanic, setSelectedMechanic] = useState(null)

  const mechanicReviews = {
    default: [
      { name: 'Arjun S.', rating: 5, text: 'Quick and professional service. Fixed my car within 30 minutes!' },
      { name: 'Priya K.', rating: 4, text: 'Good work, fair pricing. Would recommend.' },
      { name: 'Rahul M.', rating: 5, text: 'Very knowledgeable and explained everything clearly.' }
    ]
  }

  function openMechanicDetails(mechanic){
    setSelectedMechanic(mechanic)
  }

  function closeMechanicDetails(){
    setSelectedMechanic(null)
  }

  function handleVideoCall(){
    alert(`Initiating video call triage with ${selectedMechanic.name}...`)
    closeMechanicDetails()
  }

  function handleChat(){
    alert(`Opening chat with ${selectedMechanic.name}...`)
    closeMechanicDetails()
  }

  function handleRequestCall(){
    alert(`Call request sent to ${selectedMechanic.name}. They will call you shortly.`)
    closeMechanicDetails()
  }

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
                  <div className="mechanicName">
                    {m.name}
                    <span style={{
                      marginLeft: 8,
                      fontSize: 11,
                      padding: '4px 8px',
                      borderRadius: 100,
                      background: 'var(--surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontWeight: 600
                    }}>
                      📹 Video Triage
                    </span>
                  </div>
                  <div className="muted"><small>{m.rating} ★{typeof m.distanceKm === 'number' ? ` • ${m.distanceKm} km away` : ''}</small></div>
                </div>
              </div>
              <div className="mechanicActions">
                <Button variant="primary" size="sm" onClick={() => openMechanicDetails(m)}>View</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mechanic Details Modal */}
      {selectedMechanic && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 16
        }} onClick={closeMechanicDetails}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: 'var(--shadow-lg)'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div style={{ 
              padding: '24px 24px 16px', 
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start'
            }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: 24 }}>{selectedMechanic.name}</h2>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: '#FFD700', fontSize: 16 }}>{selectedMechanic.rating} ★</span>
                  {typeof selectedMechanic.distanceKm === 'number' && (
                    <span className="muted">• {selectedMechanic.distanceKm} km away</span>
                  )}
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}>
                    📹 Video Triage Available
                  </span>
                </div>
              </div>
              <button onClick={closeMechanicDetails} style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: 4
              }}>×</button>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <button onClick={handleVideoCall} style={{
                padding: '16px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: 28 }}>📹</span>
                Video Call Triage
              </button>
              
              <button onClick={handleRequestCall} style={{
                padding: '16px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: 28 }}>📞</span>
                Request Call
              </button>

              <button onClick={handleChat} style={{
                padding: '16px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: 28 }}>💬</span>
                Chat
              </button>

              <button onClick={() => alert(`Opening map for ${selectedMechanic.name}...`)} style={{
                padding: '16px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: 28 }}>📍</span>
                Location
              </button>
            </div>

            {/* Reviews Section */}
            <div style={{ padding: '0 24px 24px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 18 }}>Customer Reviews</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mechanicReviews.default.map((review, idx) => (
                  <div key={idx} className="card" style={{ 
                    padding: 16,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{review.name}</span>
                      <span style={{ color: '#FFD700', fontSize: 14 }}>{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
