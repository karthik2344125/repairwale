import React, { useEffect, useState } from 'react'
import Button from '../../shared/components/Button'
import { useNavigate } from 'react-router-dom'
import { showSuccess, showError, showInfo } from '../../shared/services/toast'

function formatINR(value){
  return `₹${Number(value||0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function Checkout(){
  const navigate = useNavigate()
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [billing, setBilling] = useState({
    fullName: '', email: '', phone: '', address1: '', address2: '', city: '', pincode: '', dropLocation: ''
  })
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [walletBalance, setWalletBalance] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState({
    razorpay: { enabled: true, name: '💳 Razorpay', desc: 'Credit/Debit Card, Net Banking' },
    upi: { enabled: true, name: '📱 UPI', desc: 'Google Pay, PhonePe, Paytm' },
    wallet: { enabled: true, name: '👛 Wallet', desc: 'RepairWale Credits' }
  })

  // Sample promo codes - can be expanded
  const validPromoCodes = {
    'SAVE10': { discount: 0.10, label: '10% off' },
    'SAVE20': { discount: 0.20, label: '20% off' },
    'FREESHIP': { discount: 0.05, label: '5% off' },
    'WELCOME': { discount: 0.15, label: '15% off' }
  }

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('rw_checkout')
      if (stored) {
        const parsed = JSON.parse(stored)
        setPayload(parsed)
        if(parsed.billing){ setBilling({...billing, ...parsed.billing}) }
      }
    } catch {}
    fetch('/api/razorpay-key').then(r=>r.json()).then(d=>{ if(d.ok) setKey(d.key) })
    
    // Fetch available payment methods
    fetch('/api/payment-methods/available').then(r=>r.json()).then(d=>{
      if(d.ok && d.methods){
        const methods = {}
        Object.keys(d.methods).forEach(key => {
          methods[key] = { 
            enabled: d.methods[key].enabled, 
            name: `${d.methods[key].icon} ${d.methods[key].name}`, 
            desc: d.methods[key].description,
            balance: d.methods[key].balance 
          }
        })
        setPaymentMethods(methods)
        if(d.methods.wallet?.balance !== null) setWalletBalance(d.methods.wallet.balance)
      }
    }).catch(e => console.log('Could not fetch payment methods:', e))
  }, [])

  function loadRazorpayScript(){
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        console.log('✓ Razorpay already loaded')
        return resolve(true)
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        console.log('✓ Razorpay script loaded successfully')
        resolve(true)
      }
      script.onerror = () => {
        console.error('✗ Failed to load Razorpay script')
        reject(new Error('Failed to load Razorpay payment gateway'))
      }
      document.body.appendChild(script)
    })
  }

  const canProceedStep1 = () => {
    const required = ['fullName','email','phone','address1','city','pincode','dropLocation']
    for(const f of required){ if(!billing[f] || !`${billing[f]}`.trim()) return false }
    return true
  }

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase().trim()
    if (!code) {
      showError('Enter a promo code')
      return
    }
    if (validPromoCodes[code]) {
      setPromoApplied({ code, ...validPromoCodes[code] })
      showSuccess(`✓ Promo code applied! ${validPromoCodes[code].label}`)
      setPromoCode('')
    } else {
      showError('Invalid promo code')
      setPromoApplied(null)
    }
  }

  const removePromoCode = () => {
    setPromoApplied(null)
    setPromoCode('')
    showInfo('Promo code removed')
  }

  const calculateTotal = () => {
    if (!payload) return { subtotal: 0, discount: 0, tax: 0, total: 0 }
    const subtotal = payload.subtotal || 0
    const discount = promoApplied ? Math.round(subtotal * promoApplied.discount) : 0
    const afterDiscount = subtotal - discount
    const tax = Math.round(afterDiscount * 0.18) // 18% GST
    const total = afterDiscount + tax
    return { subtotal, discount, tax, total }
  }

  async function startPayment(){
    if(!payload){ setError('Nothing to checkout'); return }
    if(!canProceedStep1()){ setError('Fill contact & address before paying'); setStep(1); return }
    
    setError('')
    setLoading(true)
    const { total, subtotal, discount, tax } = calculateTotal()
    
    try {
      if(paymentMethod === 'razorpay'){
        await handleRazorpayPayment({ total, subtotal, discount, tax })
      } else if(paymentMethod === 'upi'){
        await handleUPIPayment({ total, subtotal, discount, tax })
      } else if(paymentMethod === 'wallet'){
        await handleWalletPayment({ total, subtotal, discount, tax })
      }
    } catch(e){
      setError(e.message)
      showError('❌ ' + e.message)
      setLoading(false)
    }
  }

  async function handleRazorpayPayment({ total, subtotal, discount, tax }){
    try {
      console.log('🚀 Starting Razorpay payment...')
      await loadRazorpayScript()
      console.log('✓ Razorpay script loaded')
      
      // Send only amount - simple & safe
      const orderPayload = {
        amount: total
      }
      
      console.log('📝 Creating order:', orderPayload)
      const orderRes = await fetch('/api/create-order', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify(orderPayload) 
      })
      console.log('📦 Order response:', orderRes.status)
      
      const orderData = await orderRes.json()
      console.log('🎁 Order data:', orderData)
      
      if(!orderData.ok){ throw new Error(orderData.error || 'Order creation failed') }
      
      const order = orderData.order
      console.log('✓ Order created:', order.id)
      
      const options = {
        key: key || 'rzp_test_dummy',
        amount: order.amount * 100,
        currency: 'INR',
        name: 'RepairWale',
        description: 'Service Payment',
        order_id: order.razorpayOrderId,
        prefill: {
          name: billing.fullName,
          email: billing.email,
          contact: billing.phone
        },
        theme: { color: '#38bdf8' },
        handler: async (resp) => {
          try {
            console.log('✓ Payment response received:', resp.razorpay_payment_id)
            const verifyRes = await fetch('/api/verify-payment', { 
              method:'POST', 
              headers:{'Content-Type':'application/json'}, 
              body: JSON.stringify({ 
                order_id: order.id, 
                payment_id: resp.razorpay_payment_id, 
                signature: resp.razorpay_signature
              }) 
            })
            const verifyData = await verifyRes.json()
            console.log('✓ Verification response:', verifyData)
            
            if(verifyData.ok && verifyData.verified){
              setSuccess(true)
              showSuccess('✅ Payment successful! Redirecting...')
              try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
              setTimeout(()=> navigate('/map'), 1500)
            } else {
              throw new Error('Payment verification failed')
            }
          } catch(e){
            console.error('❌ Verification error:', e)
            setError(e.message || 'Verification failed')
            showError('❌ ' + (e.message || 'Verification failed'))
            setLoading(false)
          }
        }
      }
      
      console.log('🔄 Creating Razorpay instance...')
      if (!window.Razorpay) {
        throw new Error('Razorpay not loaded. Please refresh and try again.')
      }
      
      const rz = new window.Razorpay(options)
      console.log('✓ Razorpay instance created')
      
      rz.on('payment.failed', (resp) => {
        console.error('❌ Payment failed:', resp.error)
        const errMsg = resp.error && resp.error.description ? resp.error.description : 'Payment failed'
        setError(errMsg)
        showError('❌ ' + errMsg)
        setLoading(false)
      })
      
      console.log('📱 Opening Razorpay modal...')
      rz.open()
      console.log('✓ Modal opened')
    } catch(e) {
      console.error('❌ Razorpay error:', e)
      setError(e.message)
      showError('❌ ' + e.message)
      setLoading(false)
    }
  }

  async function handleUPIPayment({ total, subtotal, discount, tax }){
    if (!billing.phone || billing.phone.length < 10) {
      throw new Error('Valid phone number required for UPI')
    }

    const orderPayload = {
      amount: total,
      phone: billing.phone
    }

    const orderRes = await fetch('/api/create-upi-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
    const orderData = await orderRes.json()
    if (!orderData.ok) throw new Error(orderData.error || 'UPI order failed')

    showInfo(`📱 UPI Payment Ready for ${billing.phone}`)
    
    // Simulate UPI confirmation
    await new Promise(resolve => setTimeout(resolve, 2000))

    const transactionId = `UPI${Date.now()}`
    const verifyRes = await fetch('/api/verify-upi-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: orderData.order.id,
        transactionId: transactionId,
        phone: billing.phone
      })
    })
    const verifyData = await verifyRes.json()
    if (!verifyData.ok) throw new Error('UPI verification failed')

    setSuccess(true)
    showSuccess('✅ UPI payment successful!')
    try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
    setTimeout(() => navigate('/map'), 1500)
  }

  async function handleWalletPayment({ total, subtotal, discount, tax }){
    const mockUserId = 'user_' + Math.random().toString(36).substr(2, 9)

    const balanceRes = await fetch(`/api/wallet/balance?userId=${mockUserId}`)
    const balanceData = await balanceRes.json()
    if (!balanceData.ok) throw new Error('Could not check wallet balance')

    const balance = balanceData.balance
    if (balance < total) {
      throw new Error(`Insufficient balance. Available: ${formatINR(balance)}`)
    }

    showInfo(`👛 Processing wallet payment...`)

    const paymentPayload = {
      amount: total,
      userId: mockUserId
    }

    const paymentRes = await fetch('/api/process-wallet-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentPayload)
    })
    const paymentData = await paymentRes.json()
    if (!paymentData.ok) {
      if (paymentData.error === 'insufficient_balance') {
        throw new Error(`Insufficient balance`)
      }
      throw new Error(paymentData.error || 'Wallet payment failed')
    }

    setSuccess(true)
    showSuccess(`✅ Wallet payment successful!`)
    try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
    setTimeout(() => navigate('/map'), 1500)
  }

  if(!payload){
    return <div className="card" style={{padding:32}}><h3>Checkout</h3><p className="muted">No checkout session found. Go back to <a href="/service">Services</a>.</p></div>
  }

  // If items missing (stale session), redirect back
  if(!payload.items || !payload.items.length){
    return <div className="card" style={{padding:32}}><h3>Checkout</h3><p className="muted">Cart is empty. Return to <a href="/service">Services</a> to add items.</p></div>
  }

  return (
    <div style={{maxWidth:960,margin:'0 auto',padding:'12px 8px'}}>
      <h2 style={{marginTop:0,fontWeight:900,letterSpacing:'-0.5px'}}>Checkout</h2>
      <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr',marginTop:8}}>
        <div className="card" style={{padding:20,display:'flex',gap:10,flexWrap:'wrap'}}>
          {['1. Details','2. Confirm','3. Pay'].map((label, idx)=>{
            const active = step === idx+1
            return <div key={label} style={{padding:'8px 12px',borderRadius:10,border:`1px solid ${active?'#60a5fa':'rgba(255,255,255,0.08)'}`,background:active?'rgba(96,165,250,0.12)':'rgba(255,255,255,0.03)',color:active?'#fff':'#9aa0a6',fontWeight:700}}>{label}</div>
          })}
        </div>

        {step===1 && (
          <div className="card" style={{padding:28}}>
            <h3 style={{marginTop:0}}>Contact & Address</h3>
            <div style={{display:'grid',gap:12}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <Field label="Full Name" value={billing.fullName} onChange={v=>setBilling({...billing, fullName:v})} />
                <Field label="Email" value={billing.email} onChange={v=>setBilling({...billing, email:v})} />
              </div>
              <Field label="Phone" value={billing.phone} onChange={v=>setBilling({...billing, phone:v})} placeholder="+91 98765 43210" />
              <Field label="Address line 1" value={billing.address1} onChange={v=>setBilling({...billing, address1:v})} />
              <Field label="Address line 2" value={billing.address2} onChange={v=>setBilling({...billing, address2:v})} />
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                <Field label="City" value={billing.city} onChange={v=>setBilling({...billing, city:v})} />
                <Field label="Pincode" value={billing.pincode} onChange={v=>setBilling({...billing, pincode:v})} />
              </div>
              <Field label="Pickup / Drop location" value={billing.dropLocation} onChange={v=>setBilling({...billing, dropLocation:v})} placeholder="Landmark, gate, floor" />
            </div>
            {error && <div style={{marginTop:12,color:'#ff6b6b',fontSize:13,fontWeight:600}}>⚠ {error}</div>}
            <div style={{marginTop:18,display:'flex',gap:10}}>
              <Button variant="primary" size="md" onClick={()=>{
                if(!canProceedStep1()){ 
                  const msg = 'Please fill all required fields'
                  setError(msg)
                  showError('❌ ' + msg)
                  return 
                }
                const nextPayload = { ...payload, billing }
                setPayload(nextPayload)
                sessionStorage.setItem('rw_checkout', JSON.stringify(nextPayload))
                setError('')
                showInfo('✓ Address saved')
                setStep(2)
              }}>Continue</Button>
              <Button variant="ghost" size="sm" onClick={()=>navigate('/service')}>Back to Services</Button>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="card" style={{padding:28}}>
            <h3 style={{marginTop:0}}>Confirm Order & Promo</h3>
            <div style={{display:'grid',gap:12}}>
              {payload.items.map(it => (
                <div key={it.id} style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                  <span style={{maxWidth:260,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.title} × {it.qty}</span>
                  <strong>{formatINR(it.unitPrice * it.qty)}</strong>
                </div>
              ))}
              <div style={{height:1,background:'var(--border)',margin:'4px 0 6px'}} />
              
              {/* Promo Code Section */}
              <div style={{marginTop:16,padding:16,borderRadius:12,background:'rgba(96,165,250,0.08)',border:'1px solid rgba(96,165,250,0.2)'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:'#60a5fa'}}>💰 Apply Promo Code</div>
                {promoApplied ? (
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:'rgba(16,185,129,0.15)',borderRadius:8,border:'1px solid rgba(16,185,129,0.3)',marginBottom:8}}>
                    <div style={{fontSize:13}}>
                      <strong>{promoApplied.code}</strong> - {promoApplied.label}
                    </div>
                    <button onClick={removePromoCode} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:14,fontWeight:700}}>×</button>
                  </div>
                ) : (
                  <div style={{display:'flex',gap:8}}>
                    <input
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      style={{flex:1,padding:'10px 12px',borderRadius:8,border:'1px solid rgba(255,255,255,0.12)',background:'#101010',color:'#fff',fontSize:13}}
                      onKeyPress={e => e.key === 'Enter' && applyPromoCode()}
                    />
                    <Button size="sm" variant="primary" onClick={applyPromoCode}>Apply</Button>
                  </div>
                )}
                <div style={{fontSize:11,color:'var(--text-secondary)',marginTop:8}}>Try: SAVE10, SAVE20, WELCOME, FREESHIP</div>
              </div>

              {/* Pricing Summary */}
              {(() => {
                const { subtotal, discount, tax, total } = calculateTotal()
                return (
                  <>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span className="muted">Subtotal</span><span>{formatINR(subtotal)}</span></div>
                    {discount > 0 && <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'#10b981'}}><span className="muted">Discount</span><span>−{formatINR(discount)}</span></div>}
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span className="muted">Tax (18%)</span><span>{formatINR(tax)}</span></div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:16,fontWeight:800,color:'#60a5fa'}}><span>Total</span><span>{formatINR(total)}</span></div>
                  </>
                )
              })()}
            </div>
            <div style={{marginTop:14,fontSize:12,color:'var(--text-secondary)'}}>
              {billing.fullName} · {billing.phone} · {billing.email}<br/>
              {billing.address1}{billing.address2 ? ', '+billing.address2 : ''}, {billing.city} - {billing.pincode}<br/>
              Pickup/Drop: {billing.dropLocation}
            </div>
            <div style={{marginTop:18,display:'flex',gap:10}}>
              <Button variant="ghost" size="sm" onClick={()=>setStep(1)}>Edit details</Button>
              <Button variant="primary" size="md" onClick={()=>setStep(3)}>Choose Payment</Button>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="card" style={{padding:28}}>
            <h3 style={{marginTop:0}}>Select Payment Method</h3>
            <p style={{color:'var(--text-secondary)',fontSize:13,marginBottom:16}}>Choose your preferred payment option</p>
            
            {/* Payment Method Options */}
            <div style={{display:'grid',gap:12,marginBottom:24}}>
              {[
                { id: 'razorpay', label: '💳 Razorpay', desc: 'Credit/Debit Card, Net Banking' },
                { id: 'upi', label: '📱 UPI', desc: 'Google Pay, PhonePe, Paytm' },
                { id: 'wallet', label: '👛 Wallet', desc: `RepairWale Credits${walletBalance !== null ? ` (${formatINR(walletBalance)} available)` : ''}` }
              ].filter(m => paymentMethods[m.id]?.enabled !== false).map(method => {
                const isWallet = method.id === 'wallet'
                const walletAvailable = !isWallet || (walletBalance !== null && walletBalance > 0)
                const disabled = isWallet && walletBalance !== null && walletBalance <= 0
                
                return (
                  <div 
                    key={method.id}
                    onClick={() => { if(!disabled) setPaymentMethod(method.id) }}
                    style={{
                      padding:16,
                      borderRadius:12,
                      border: paymentMethod === method.id ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0.12)',
                      background: paymentMethod === method.id ? 'rgba(96,165,250,0.1)' : 'rgba(255,255,255,0.03)',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.5 : 1,
                      transition:'all 0.2s',
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center'
                    }}
                  >
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{method.label}</div>
                      <div style={{fontSize:12,color:'var(--text-secondary)',marginTop:4}}>{method.desc}</div>
                      {disabled && <div style={{fontSize:11,color:'#ff6b6b',marginTop:4}}>❌ Insufficient balance</div>}
                    </div>
                    <div style={{width:20,height:20,borderRadius:'50%',border:'2px solid',borderColor: paymentMethod === method.id ? '#60a5fa' : 'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {paymentMethod === method.id && <div style={{width:10,height:10,borderRadius:'50%',background:'#60a5fa'}}/>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Total */}
            {(() => {
              const { subtotal, discount, tax, total } = calculateTotal()
              return (
                <div style={{padding:16,borderRadius:12,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:8}}>
                    <span className="muted">Order Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                  {promoApplied && <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#10b981'}}>
                    <span>Savings with {promoApplied.code}</span>
                    <span>−{formatINR(discount)}</span>
                  </div>}
                </div>
              )
            })()}

            {error && <div style={{marginTop:12,padding:12,borderRadius:8,background:'rgba(255,107,107,0.1)',color:'#ff6b6b',fontSize:13,fontWeight:600}}>⚠ {error}</div>}
            {success && <div style={{marginTop:12,padding:12,borderRadius:8,background:'rgba(16,185,129,0.1)',color:'#10b981',fontSize:13,fontWeight:600}}>✓ Payment verified. Redirecting...</div>}
            
            {/* Payment Method Info */}
            <div style={{marginTop:16,padding:12,borderRadius:8,background:'rgba(96,165,250,0.05)',border:'1px solid rgba(96,165,250,0.2)',fontSize:12}}>
              {paymentMethod === 'razorpay' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#60a5fa'}}>💳 Razorpay</strong><br/>
                  • Supports credit/debit cards and net banking<br/>
                  • Secure PCI-DSS Level 1 compliant<br/>
                  {!key && '• Currently in mock mode (test payment)'}
                </div>
              )}
              {paymentMethod === 'upi' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#60a5fa'}}>📱 UPI Payment</strong><br/>
                  • Instant payment via phone number<br/>
                  • Works with all major UPI apps<br/>
                  • Transaction ID: {billing.phone ? billing.phone.slice(-4) + 'XXXX' : 'Enter phone to proceed'}
                </div>
              )}
              {paymentMethod === 'wallet' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#60a5fa'}}>👛 RepairWale Wallet</strong><br/>
                  • Available balance: <strong style={{color: walletBalance !== null && walletBalance > 0 ? '#10b981' : '#ff6b6b'}}>{walletBalance !== null ? formatINR(walletBalance) : 'Loading...'}</strong><br/>
                  • Instant transaction with no fees<br/>
                  {walletBalance !== null && walletBalance > 0 ? `• Enough balance for this order ✓` : `• Insufficient balance to proceed`}
                </div>
              )}
            </div>
            
            <div style={{marginTop:18,display:'flex',gap:10}}>
              <Button variant="primary" size="md" disabled={loading || (paymentMethod === 'wallet' && walletBalance !== null && walletBalance <= 0)} onClick={startPayment}>
                {loading ? 'Processing...' : `Pay ${formatINR(calculateTotal().total)}`}
              </Button>
              <Button variant="ghost" size="sm" onClick={()=>setStep(2)}>Back</Button>
            </div>
            {!key && <div style={{marginTop:12,fontSize:11,color:'var(--text-secondary)'}}>🧪 Using mock Razorpay key (set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET for live payments)</div>}
          </div>
        )}
      </div>

      <style>{`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        body {
          background: linear-gradient(180deg, #070b14 0%, #0b1220 50%, #0f1d34 100%) !important;
        }

        .page-container {
          background: #070b14 !important;
        }

        /* Card Enhancements */
        .card {
          background: linear-gradient(135deg, #0b1220 0%, #0f1d34 100%) !important;
          border: 1px solid #2A4368 !important;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1) !important;
        }

        /* Input Fields */
        [style*="background:'#101010'"],
        [style*="background:#101010"] {
          background: rgba(11, 18, 32, 0.8) !important;
          border: 1px solid #2A4368 !important;
        }

        [style*="background:'#101010'"]:focus,
        [style*="background:#101010"]:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1) !important;
        }

        /* Primary Buttons */
        [style*="background:'#60a5fa'"],
        [style*="background:#60a5fa"] {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          box-shadow: 0 4px 16px rgba(56, 189, 248, 0.18) !important;
        }

        /* Success/Error Messages */
        [style*="background:'rgba(16,185,129"] {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.15)) !important;
          border: 1px solid #10B981 !important;
        }

        [style*="background:'rgba(255,107,107"] {
          background: linear-gradient(135deg, rgba(255, 107, 107, 0.15), rgba(255, 135, 135, 0.15)) !important;
          border: 1px solid #FF6B6B !important;
        }

        /* Text Colors */
        input, select, textarea {
          color: #e6edf7 !important;
        }
      `}</style>
    </div>
  )
}

function Field({label,value,onChange,placeholder=''}){
  return (
    <div style={{display:'grid',gap:6}}>
      <label className="rw-label">{label}</label>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{width:'100%',padding:'12px',borderRadius:10,border:'1px solid rgba(255,255,255,0.12)',background:'#101010',color:'#fff'}}
      />
    </div>
  )
}
