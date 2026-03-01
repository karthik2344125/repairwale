import React, { useState, useEffect } from 'react'
import Button from '../../shared/components/Button'
import { showSuccess, showError } from '../../shared/services/toast'

export default function OnboardingCustomer(){
  const [form, setForm] = useState({ fullName: '', phone: '', vehicleType: 'Car', vehicleNumber: '' })

  useEffect(() => {
    try{
      const saved = JSON.parse(localStorage.getItem('rw_customer') || 'null')
      if(saved){
        setForm({
          fullName: saved.fullName || '',
          phone: saved.phone || '',
          vehicleType: saved.vehicleType || 'Car',
          vehicleNumber: saved.vehicleNumber || ''
        })
      }
    }catch{}
  }, [])

  const save = () => {
    if(!form.fullName || !form.phone){
      showError('Please enter your name and phone')
      return
    }
    try{
      localStorage.setItem('rw_customer', JSON.stringify(form))
      sessionStorage.setItem('rw_vehicle_type', form.vehicleType)
      showSuccess('Profile saved. You can now request help!')
      window.location.href = '/map'
    }catch{
      showError('Could not save. Please retry')
    }
  }

  return (
    <div className="svc-card" style={{maxWidth: 640, margin: '24px auto'}}>
      <div className="svc-head">
        <div>
          <div className="svc-title">Quick Setup</div>
          <div className="svc-sub">Help us get you the best experience</div>
        </div>
      </div>

      <div style={{display:'grid',gap:12}}>
        <div>
          <label className="rw-label">Full Name</label>
          <input className="rw-input" value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} placeholder="Enter your name" />
        </div>
        <div>
          <label className="rw-label">Phone</label>
          <input className="rw-input" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="10-digit number" />
        </div>
        <div>
          <label className="rw-label">Vehicle Type</label>
          <select className="rw-input" value={form.vehicleType} onChange={e=>setForm({...form, vehicleType: e.target.value})}>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="EV">EV</option>
          </select>
        </div>
        <div>
          <label className="rw-label">Vehicle Number (optional)</label>
          <input className="rw-input" value={form.vehicleNumber} onChange={e=>setForm({...form, vehicleNumber: e.target.value})} placeholder="e.g., KA01 AB 1234" />
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:8}}>
          <Button variant="ghost" onClick={()=> window.history.back()}>Cancel</Button>
          <Button variant="primary" onClick={save}>Save & Continue</Button>
        </div>
      </div>

      <style>{`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        body {
          background: linear-gradient(180deg, #070b14 0%, #0b1220 100%) !important;
        }

        .svc-card {
          background: linear-gradient(135deg, #0b1220 0%, #0f1d34 100%) !important;
          border: 1px solid #243449 !important;
          box-shadow: 0 8px 32px rgba(56, 189, 248, 0.1) !important;
          border-radius: 16px !important;
          padding: 32px !important;
        }

        .svc-title {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 800 !important;
        }

        .rw-input {
          background: rgba(11, 18, 32, 0.8) !important;
          border: 1px solid #243449 !important;
          color: #e6edf7 !important;
          transition: all 0.3s ease !important;
        }

        .rw-input:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1) !important;
          outline: none !important;
        }

        .rw-label {
          color: #e6edf7 !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  )
}
