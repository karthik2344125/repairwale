import React, { useEffect, useState } from 'react'
import Button from '../../shared/components/Button'
import { useNavigate } from 'react-router-dom'
import { showSuccess, showError, showInfo } from '../../shared/services/toast'
import {
  createDispatchRequest,
  createRazorpayOrder,
  createUpiOrder,
  getAvailablePaymentMethods,
  getRazorpayKey,
  getWalletBalance,
  processWalletPayment,
  verifyRazorpayPayment,
  verifyUpiPayment
} from '../../shared/services/api'

function formatINR(value){
  return `₹ ${Number(value||0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function Checkout(){
  const navigate = useNavigate()
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(false)
  const [key, setKey] = useState(null)
  const [razorpayMode, setRazorpayMode] = useState('mock')
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
    razorpay: { enabled: true, name: 'Razorpay', desc: 'Credit/Debit Card, Net Banking' },
    upi: { enabled: true, name: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
    wallet: { enabled: true, name: 'Wallet', desc: 'RepairWale Credits' }
  })

  // Sample promo codes - can be expanded
  const validPromoCodes = {
    'SAVE10': { discount: 0.10, label: '10% off' },
    'SAVE20': { discount: 0.20, label: '20% off' },
    'FREESHIP': { discount: 0.05, label: '5% off' },
    'WELCOME': { discount: 0.15, label: '15% off' }
  }

  useEffect(() => {
    let mounted = true

    const bootstrap = async () => {
      try {
        const stored = sessionStorage.getItem('rw_checkout')
        if (stored && mounted) {
          const parsed = JSON.parse(stored)
          setPayload(parsed)
          if (parsed.billing) {
            setBilling((prev) => ({ ...prev, ...parsed.billing }))
          }
        }
      } catch {}

      try {
        const keyResp = await getRazorpayKey()
        if (!mounted) return
        setKey(keyResp?.key || null)
        setRazorpayMode(keyResp?.mode || 'mock')
      } catch {
        if (mounted) {
          setKey(null)
          setRazorpayMode('mock')
        }
      }

      try {
        const user = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
        const methodsResp = await getAvailablePaymentMethods(user.id)
        if (!mounted || !methodsResp?.ok || !methodsResp?.methods) return

        const methods = {}
        Object.keys(methodsResp.methods).forEach((methodKey) => {
          methods[methodKey] = {
            enabled: methodsResp.methods[methodKey].enabled,
            name: methodsResp.methods[methodKey].name,
            desc: methodsResp.methods[methodKey].description,
            balance: methodsResp.methods[methodKey].balance
          }
        })
        setPaymentMethods(methods)
        if (methodsResp.methods.wallet?.balance !== null) {
          setWalletBalance(methodsResp.methods.wallet.balance)
        }
      } catch (e) {
        console.log('Could not fetch payment methods:', e)
      }
    }

    bootstrap()

    return () => {
      mounted = false
    }
  }, [])

  function loadRazorpayScript(){
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        console.log(' Razorpay already loaded')
        return resolve(true)
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        console.log(' Razorpay script loaded successfully')
        resolve(true)
      }
      script.onerror = () => {
        console.error('- Failed to load Razorpay script')
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
      showSuccess(` Promo code applied! ${validPromoCodes[code].label}`)
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
      showError(' ' + e.message)
      setLoading(false)
    }
  }

  async function createPostPaymentDispatch(totalAmount) {
    const customer = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
    const serviceNames = (payload?.items || []).map((it) => it.title).filter(Boolean)
    const issueSummary = serviceNames.length ? serviceNames.slice(0, 2).join(', ') : 'Service request'

    let geoLat = 28.6139
    let geoLng = 77.2090

    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 30000
          })
        })
        geoLat = pos.coords.latitude
        geoLng = pos.coords.longitude
      } catch {}
    }

    const dispatchPayload = {
      customerId: customer.id || 'guest-customer',
      customerName: billing.fullName || customer.fullName || 'Customer',
      customerPhone: billing.phone || '',
      lat: geoLat,
      lng: geoLng,
      serviceItems: payload?.items || [],
      problem: issueSummary,
      locationText: `${billing.address1 || ''} ${billing.city || ''}`.trim() || billing.dropLocation || 'Customer location',
      estimatedPrice: totalAmount || 0,
      orderId: payload?.id || null
    }

    const dispatch = await createDispatchRequest(dispatchPayload)
    if (dispatch?.ok && dispatch?.request?.id) {
      localStorage.setItem('rw_active_dispatch', JSON.stringify(dispatch.request))
      return dispatch.request.id
    }

    return null
  }

  async function handleRazorpayPayment({ total, subtotal, discount, tax }){
    try {
      console.log(' Starting Razorpay payment...')
      const isLiveRazorpay = Boolean(key) && razorpayMode === 'live'
      if (isLiveRazorpay) {
        await loadRazorpayScript()
        console.log(' Razorpay script loaded')
      }
      
      // Send only amount - simple & safe
      const orderPayload = {
        amount: total
      }
      
      console.log(' Creating order:', orderPayload)
      const orderData = await createRazorpayOrder(orderPayload.amount)
      console.log(' Order data:', orderData)
      
      if(!orderData.ok){ throw new Error(orderData.error || 'Order creation failed') }
      
      const order = orderData.order
      console.log(' Order created:', order.id)
      
      if (!isLiveRazorpay) {
        const verifyData = await verifyRazorpayPayment({
          order_id: order.id,
          payment_id: `pay_mock_${Date.now()}`,
          signature: null
        })

        if (!(verifyData?.ok && verifyData?.verified)) {
          throw new Error('Mock payment verification failed')
        }

        setSuccess(true)
        const dispatchId = await createPostPaymentDispatch(order.amount)
        showSuccess('... Payment successful! Request sent to nearby mechanics')
        try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
        if (dispatchId) navigate(`/tracking/${dispatchId}`)
        else navigate('/map')
        return
      }

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
        theme: { color: '#0B1F3B' },
        handler: async (resp) => {
          try {
            console.log(' Payment response received:', resp.razorpay_payment_id)
            const verifyData = await verifyRazorpayPayment({
              order_id: order.id,
              payment_id: resp.razorpay_payment_id,
              signature: resp.razorpay_signature
            })
            console.log(' Verification response:', verifyData)
            
            if(verifyData.ok && verifyData.verified){
              setSuccess(true)
              const dispatchId = await createPostPaymentDispatch(order.amount)
              showSuccess('... Payment successful! Request sent to nearby mechanics')
              try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
              if (dispatchId) {
                navigate(`/tracking/${dispatchId}`)
              } else {
                navigate('/map')
              }
            } else {
              throw new Error('Payment verification failed')
            }
          } catch(e){
            console.error(' Verification error:', e)
            setError(e.message || 'Verification failed')
            showError(' ' + (e.message || 'Verification failed'))
            setLoading(false)
          }
        }
      }
      
      console.log(' Creating Razorpay instance...')
      if (!window.Razorpay) {
        throw new Error('Razorpay not loaded. Please refresh and try again.')
      }
      
      const rz = new window.Razorpay(options)
      console.log(' Razorpay instance created')
      
      rz.on('payment.failed', (resp) => {
        console.error(' Payment failed:', resp.error)
        const errMsg = resp.error && resp.error.description ? resp.error.description : 'Payment failed'
        setError(errMsg)
        showError(' ' + errMsg)
        setLoading(false)
      })
      
      console.log(' Opening Razorpay modal...')
      rz.open()
      console.log(' Modal opened')
    } catch(e) {
      console.error(' Razorpay error:', e)
      setError(e.message)
      showError(' ' + e.message)
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

    const orderData = await createUpiOrder(orderPayload)
    if (!orderData.ok) throw new Error(orderData.error || 'UPI order failed')

    showInfo(` UPI Payment Ready for ${billing.phone}`)
    
    const transactionId = `UPI${Date.now()}`
    const verifyData = await verifyUpiPayment({
      orderId: orderData.order.id,
      transactionId: transactionId,
      phone: billing.phone
    })
    if (!verifyData.ok) throw new Error('UPI verification failed')

    setSuccess(true)
    const dispatchId = await createPostPaymentDispatch(total)
    showSuccess('... UPI payment successful! Request sent to nearby mechanics')
    try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
    if (dispatchId) {
      navigate(`/tracking/${dispatchId}`)
    } else {
      navigate('/map')
    }
  }

  async function handleWalletPayment({ total, subtotal, discount, tax }){
    const mockUserId = 'user_' + Math.random().toString(36).substr(2, 9)

    const balanceData = await getWalletBalance(mockUserId)
    if (!balanceData.ok) throw new Error('Could not check wallet balance')

    const balance = balanceData.balance
    if (balance < total) {
      throw new Error(`Insufficient balance. Available: ${formatINR(balance)}`)
    }

    showInfo(` Processing wallet payment...`)

    const paymentPayload = {
      amount: total,
      userId: mockUserId
    }

    const paymentData = await processWalletPayment(paymentPayload)
    if (!paymentData.ok) {
      if (paymentData.error === 'insufficient_balance') {
        throw new Error(`Insufficient balance`)
      }
      throw new Error(paymentData.error || 'Wallet payment failed')
    }

    setSuccess(true)
    const dispatchId = await createPostPaymentDispatch(total)
    showSuccess('... Wallet payment successful! Request sent to nearby mechanics')
    try { localStorage.removeItem('rw_cart'); sessionStorage.removeItem('rw_checkout') } catch {}
    if (dispatchId) {
      navigate(`/tracking/${dispatchId}`)
    } else {
      navigate('/map')
    }
  }

  if(!payload){
    return (
      <div className="card" style={{padding:32}}>
        <h3>Checkout</h3>
        <p className="muted">No checkout session found.</p>
        <Button variant="primary" size="sm" onClick={() => navigate('/service')}>Go to Services</Button>
      </div>
    )
  }

  // If items missing (stale session), redirect back
  if(!payload.items || !payload.items.length){
    return (
      <div className="card" style={{padding:32}}>
        <h3>Checkout</h3>
        <p className="muted">Cart is empty.</p>
        <Button variant="primary" size="sm" onClick={() => navigate('/service')}>Return to Services</Button>
      </div>
    )
  }

  return (
    <div className="checkout-page" style={{maxWidth:960,margin:'0 auto',padding:'12px 8px'}}>
      <h2 style={{marginTop:0,fontWeight:900,letterSpacing:'-0.5px'}}>Checkout</h2>
      <div style={{display:'grid',gap:16,gridTemplateColumns:'1fr',marginTop:8}}>
        <div className="card" style={{padding:20,display:'flex',gap:10,flexWrap:'wrap'}}>
          {['1. Details','2. Confirm','3. Pay'].map((label, idx)=>{
            const active = step === idx+1
            return <div key={label} style={{padding:'10px 14px',borderRadius:10,border:`1px solid ${active?'#0B1F3B':'var(--border)'}`,background:active?'#0B1F3B':'#FFFFFF',color:active?'#FFFFFF':'#0B1F3B',fontWeight:700}}>{label}</div>
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
            {error && <div style={{marginTop:12,color:'#0B1F3B',fontSize:13,fontWeight:700}}>{error}</div>}
            <div style={{marginTop:18,display:'flex',gap:10}}>
              <Button variant="primary" size="md" onClick={()=>{
                if(!canProceedStep1()){ 
                  const msg = 'Please fill all required fields'
                  setError(msg)
                  showError(msg)
                  return 
                }
                const nextPayload = { ...payload, billing }
                setPayload(nextPayload)
                sessionStorage.setItem('rw_checkout', JSON.stringify(nextPayload))
                setError('')
                showInfo('Address saved')
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
                  <span style={{maxWidth:260,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{it.title} - {it.qty}</span>
                  <strong>{formatINR(it.unitPrice * it.qty)}</strong>
                </div>
              ))}
              <div style={{height:1,background:'var(--border)',margin:'4px 0 6px'}} />
              
              {/* Promo Code Section */}
              <div style={{marginTop:16,padding:16,borderRadius:12,background:'#FFFFFF',border:'1px solid #0B1F3B'}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:10,color:'#0B1F3B'}}>Apply Promo Code</div>
                {promoApplied ? (
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',background:'#FFFFFF',borderRadius:8,border:'1px solid #0B1F3B',marginBottom:8}}>
                    <div style={{fontSize:13}}>
                      <strong>{promoApplied.code}</strong> - {promoApplied.label}
                    </div>
                    <button onClick={removePromoCode} style={{background:'none',border:'none',color:'#0B1F3B',cursor:'pointer',fontSize:14,fontWeight:700}}>Remove</button>
                  </div>
                ) : (
                  <div style={{display:'flex',gap:8}}>
                    <input
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      style={{flex:1,padding:'10px 12px',borderRadius:8,border:'1px solid #0B1F3B',background:'#FFFFFF',color:'#0B1F3B',fontSize:13}}
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
                    {discount > 0 && <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:'#0B1F3B'}}><span className="muted">Discount</span><span>{formatINR(discount)}</span></div>}
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}><span className="muted">Tax (18%)</span><span>{formatINR(tax)}</span></div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:16,fontWeight:800,color:'#0B1F3B'}}><span>Total</span><span>{formatINR(total)}</span></div>
                  </>
                )
              })()}
            </div>
            <div style={{marginTop:14,fontSize:12,color:'var(--text-secondary)'}}>
              {billing.fullName} | {billing.phone} | {billing.email}<br/>
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
                { id: 'razorpay', label: 'Razorpay', desc: 'Credit/Debit Card, Net Banking' },
                { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
                { id: 'wallet', label: 'Wallet', desc: `RepairWale Credits${walletBalance !== null ? ` (${formatINR(walletBalance)} available)` : ''}` }
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
                      border: paymentMethod === method.id ? '2px solid #0B1F3B' : '1px solid var(--border)',
                      background: paymentMethod === method.id ? '#0B1F3B' : '#FFFFFF',
                      color: paymentMethod === method.id ? '#FFFFFF' : '#0B1F3B',
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
                      <div style={{fontSize:12,color: paymentMethod === method.id ? '#FFFFFF' : 'var(--text-secondary)',marginTop:4}}>{method.desc}</div>
                      {disabled && <div style={{fontSize:11,color: paymentMethod === method.id ? '#FFFFFF' : '#0B1F3B',marginTop:4}}>Insufficient balance</div>}
                    </div>
                    <div style={{width:20,height:20,borderRadius:'50%',border:'2px solid',borderColor: paymentMethod === method.id ? '#FFFFFF' : '#0B1F3B',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {paymentMethod === method.id && <div style={{width:10,height:10,borderRadius:'50%',background:'#FFFFFF'}}/>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Total */}
            {(() => {
              const { subtotal, discount, tax, total } = calculateTotal()
              return (
                <div style={{padding:16,borderRadius:12,background:'#FFFFFF',border:'1px solid #0B1F3B',marginBottom:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:8}}>
                    <span className="muted">Order Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                  {promoApplied && <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#0B1F3B'}}>
                    <span>Savings with {promoApplied.code}</span>
                    <span>{formatINR(discount)}</span>
                  </div>}
                </div>
              )
            })()}

            {error && <div style={{marginTop:12,padding:12,borderRadius:8,background:'#FFFFFF',border:'1px solid #0B1F3B',color:'#0B1F3B',fontSize:13,fontWeight:700}}>{error}</div>}
            {success && <div style={{marginTop:12,padding:12,borderRadius:8,background:'#0B1F3B',border:'1px solid #0B1F3B',color:'#FFFFFF',fontSize:13,fontWeight:700}}>Payment verified. Redirecting...</div>}
            
            {/* Payment Method Info */}
            <div style={{marginTop:16,padding:12,borderRadius:8,background:'#FFFFFF',border:'1px solid #0B1F3B',fontSize:12}}>
              {paymentMethod === 'razorpay' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#0B1F3B'}}>Razorpay</strong><br/>
                  Supports credit/debit cards and net banking<br/>
                  Secure PCI-DSS Level 1 compliant<br/>
                  {!key && 'Currently in mock mode (test payment)'}
                </div>
              )}
              {paymentMethod === 'upi' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#0B1F3B'}}>UPI Payment</strong><br/>
                  Instant payment via phone number<br/>
                  Works with all major UPI apps<br/>
                  Transaction ID: {billing.phone ? billing.phone.slice(-4) + 'XXXX' : 'Enter phone to proceed'}
                </div>
              )}
              {paymentMethod === 'wallet' && (
                <div style={{color:'var(--text-secondary)'}}>
                  <strong style={{color:'#0B1F3B'}}>RepairWale Wallet</strong><br/>
                  Available balance: <strong style={{color:'#0B1F3B'}}>{walletBalance !== null ? formatINR(walletBalance) : 'Loading...'}</strong><br/>
                  Instant transaction with no fees<br/>
                  {walletBalance !== null && walletBalance > 0 ? 'Enough balance for this order' : 'Insufficient balance to proceed'}
                </div>
              )}
            </div>
            
            <div style={{marginTop:18,display:'flex',gap:10}}>
              <Button variant="primary" size="md" disabled={loading || (paymentMethod === 'wallet' && walletBalance !== null && walletBalance <= 0)} onClick={startPayment}>
                {loading ? 'Processing...' : `Pay ${formatINR(calculateTotal().total)}`}
              </Button>
              <Button variant="ghost" size="sm" onClick={()=>setStep(2)}>Back</Button>
            </div>
            {!key && <div style={{marginTop:12,fontSize:11,color:'var(--text-secondary)'}}>Using mock Razorpay mode (set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET for live gateway)</div>}
          </div>
        )}
      </div>
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
        style={{width:'100%',padding:'12px',borderRadius:10,border:'1px solid #0B1F3B',background:'#FFFFFF',color:'#0B1F3B'}}
      />
    </div>
  )
}


