import React from 'react'

export default function RequestList({ requests = [], onSelect }){
  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={{ marginTop: 0 }}>Requests</h3>
      <div>
        {requests.map(r => (
          <div key={r.id} className="requestListItem" onClick={() => onSelect(r)}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <strong>{r.customerName}</strong>
                <div style={{ fontSize: 13, color: '#666' }}>{r.problem}</div>
              </div>
              <div style={{ textAlign: 'right' }}><small style={{ color:'#666' }}>{r.status}</small></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
