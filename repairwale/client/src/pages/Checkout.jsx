import React, { useEffect, useState } from 'react'

function loadRazorpayScript(){
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')){
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Checkout(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [method, setMethod] = useState('razorpay')

  useEffect(() => {
    try{
      const raw = sessionStorage.getItem('rw_checkout')
      if (!raw){
        setError('No checkout data found. Please start again.')
        setLoading(false)
        return
      }
      const parsed = JSON.parse(raw)
      setData(parsed)
      setLoading(false)
    } catch(e){
      setError('Could not read checkout data')
      setLoading(false)
    }
  }, [])

  async function startPayment(){
    if (!data) return

    const ok = await loadRazorpayScript()
    if (!ok){
      alert('Failed to load payment SDK. Please retry.')
      return
    }

    try{
      const resp = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: data.total })
      })
      const json = await resp.json()
      const order = json?.order || json
      if (!order || !order.id){
        alert('Could not initialize payment')
        return
      }

      const options = {
        key: json?.key || (import.meta?.env?.VITE_RAZORPAY_KEY_ID || ''), // prefer backend key, fallback env
        amount: order.amount.toString(),
        currency: 'INR',
        name: 'RepairWale',
        description: 'Service Booking',
        order_id: order.id,
        prefill: {
          name: data.details?.fullName || 'Guest',
          email: '',
          contact: data.details?.phone || ''
        },
        notes: {
          bookingRequestId: data.bookingRequestId,
        },
        theme: { color: '#111' },
        handler: async function (response){
          try{
            const verify = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: response.razorpay_order_id || order.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                bookingRequestId: data.bookingRequestId
              })
            })
            const v = await verify.json()
            if (v && v.ok){
              alert('Payment successful!')
              sessionStorage.removeItem('rw_checkout')
              window.location.href = '/map'
            }else{
              alert('Payment verification failed')
            }
          }catch(err){
            alert('Payment verification error')
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    }catch(err){
      alert('Payment initialization failed')
    }
  }

  if (loading){
    return <div className="container"><div className="card">Loading checkout...</div></div>
  }
  if (error){
    return <div className="container"><div className="card" style={{color:'var(--text-danger)'}}>{error}</div></div>
  }

  const total = data?.total || 0
  const details = data?.details || {}

  return (
    <div className="container" style={{maxWidth:'960px'}}>
      <div className="card" style={{marginBottom:'16px'}}>
        <h2 style={{margin:'0 0 8px 0', color:'var(--text-primary)'}}>Checkout</h2>
        <p className="muted">Review billing details and complete payment</p>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:'16px'}}>
        <div className="card">
          <h3 style={{margin:'0 0 12px 0', color:'var(--text-primary)'}}>Billing Address</h3>
          <div className="muted">{details.fullName}</div>
          <div className="muted">{details.phone}</div>
          <div className="muted">{details.addressLine1}</div>
          {details.addressLine2 ? (<div className="muted">{details.addressLine2}</div>) : null}
          <div className="muted">{details.city} - {details.pincode}</div>
        </div>
        <div className="card">
          <h3 style={{margin:'0 0 12px 0', color:'var(--text-primary)'}}>Payment Method</h3>
          <div style={{display:'flex', gap:'12px'}}>
            <label style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <input type="radio" name="paymethod" value="razorpay" checked={method==='razorpay'} onChange={()=>setMethod('razorpay')} /> Razorpay
            </label>
            {/* Future methods can be listed here */}
          </div>
          <div style={{marginTop:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:800, color:'var(--text-primary)'}}>Total: ₹{total}</div>
            <button className="btn btn-primary" onClick={startPayment}>Pay with Razorpay</button>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:'16px'}}>
        <h3 style={{margin:'0 0 12px 0', color:'var(--text-primary)'}}>Order Summary</h3>
        {(data.cart || []).map((item, idx) => (
          <div key={idx} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)'}}>
            <div className="muted">{item.name}</div>
            <div style={{color:'var(--text-primary)'}}>₹{item.price}</div>
          </div>
        ))}
        <div style={{display:'flex', justifyContent:'space-between', fontWeight:800, marginTop:'12px'}}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  )
}
