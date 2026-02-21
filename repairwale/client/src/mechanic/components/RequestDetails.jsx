import React from 'react'

export default function RequestDetails({ request, onClose, onPay }){
  return (
    <div className="requestDetails">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <strong>Request Details</strong>
        <button onClick={onClose} style={{ background:'transparent', color:'#111', border:0 }}>Close</button>
      </div>
      <div style={{ marginTop:8 }}>
        <div style={{ marginBottom:6 }}><strong>Customer:</strong> {request.customerName}</div>
        <div style={{ marginBottom:6 }}><strong>Problem:</strong> {request.problem}</div>
        <div style={{ marginBottom:6 }}><strong>Status:</strong> {request.status}</div>
        <div className="actions">
          <button onClick={onPay} style={{ background:'#111', color:'#fff' }}>Pay ₹100</button>
          <button onClick={() => alert('Contact/Call (prototype)')} style={{ background:'#fff', color:'#111', border:'1px solid #e6e6e6' }}>Contact</button>
        </div>
      </div>
    </div>
  )
}
