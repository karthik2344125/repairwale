import React, { useState } from 'react'

function formatINR(value){
  return `₹${Number(value||0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function PaymentTest(){
  const [step, setStep] = useState('select') // select, payment, success
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Mock order data for testing
  const mockOrder = {
    orderId: 'order_' + Math.random().toString(36).substr(2, 9),
    amount: 1500,
    currency: 'INR',
    items: [
      { id: 1, title: 'Engine Checkup', qty: 1, unitPrice: 500 },
      { id: 2, title: 'Brake Service', qty: 2, unitPrice: 500 }
    ],
    billing: {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+919876543210',
      address: '123 Main Street, New Delhi'
    }
  }

  const handleRazorpay = async () => {
    setLoading(true)
    setError('')
    setMessage('Loading Razorpay...')

    try {
      // Simulate load Razorpay script
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage('✓ Razorpay script loaded. Opening payment modal...')
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simulate Razorpay modal
      const options = {
        key: 'rzp_test_dummy',
        amount: mockOrder.amount * 100,
        currency: 'INR',
        name: 'RepairWale',
        description: `${mockOrder.items.length} services`,
        order_id: mockOrder.orderId,
        prefill: {
          name: mockOrder.billing.fullName,
          email: mockOrder.billing.email,
          contact: mockOrder.billing.phone
        },
        theme: { color: '#38bdf8' }
      }

      setMessage('💳 Razorpay Modal Opened')
      setMessage(prev => prev + '\n\nEnter test card: 4111 1111 1111 1111\nExpiry: Any future date\nCVV: Any 3 digits')

      // Simulate payment completion
      await new Promise(resolve => setTimeout(resolve, 2000))

      const paymentId = 'pay_' + Math.random().toString(36).substr(2, 9)
      const signature = 'sig_' + Math.random().toString(36).substr(2, 20)

      setMessage(prev => prev + '\n\n✅ Payment successful!\nPayment ID: ' + paymentId)

      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500))

      setOrderData({
        orderId: mockOrder.orderId,
        paymentId: paymentId,
        amount: mockOrder.amount,
        status: 'paid',
        method: 'razorpay',
        timestamp: new Date().toLocaleString()
      })

      setStep('success')
      setLoading(false)
    } catch (e) {
      setError('❌ ' + (e.message || 'Payment failed'))
      setLoading(false)
    }
  }

  const handleUPI = async () => {
    setLoading(true)
    setError('')
    setMessage('Creating UPI payment...')

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const upiLink = `upi://pay?pa=repairwale@bank&pn=RepairWale&am=${mockOrder.amount}&tr=${mockOrder.orderId}`
      setMessage('📱 UPI Payment Ready\n\nUPI Link: ' + upiLink)

      await new Promise(resolve => setTimeout(resolve, 1500))

      const transactionId = 'UPI' + Date.now()
      setMessage(prev => prev + '\n\n✅ UPI Payment Verified!\nTransaction ID: ' + transactionId)

      await new Promise(resolve => setTimeout(resolve, 1500))

      setOrderData({
        orderId: mockOrder.orderId,
        transactionId: transactionId,
        amount: mockOrder.amount,
        status: 'paid',
        method: 'upi',
        phone: mockOrder.billing.phone,
        timestamp: new Date().toLocaleString()
      })

      setStep('success')
      setLoading(false)
    } catch (e) {
      setError('❌ ' + (e.message || 'UPI payment failed'))
      setLoading(false)
    }
  }

  const handleWallet = async () => {
    setLoading(true)
    setError('')
    setMessage('Checking wallet balance...')

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const walletBalance = 10000
      setMessage(`👛 Wallet Balance: ${formatINR(walletBalance)}`)

      if (walletBalance < mockOrder.amount) {
        throw new Error(`Insufficient balance. Need ₹${mockOrder.amount - walletBalance} more`)
      }

      setMessage(prev => prev + `\n✓ Processing payment of ${formatINR(mockOrder.amount)}...`)

      await new Promise(resolve => setTimeout(resolve, 1500))

      const newBalance = walletBalance - mockOrder.amount

      setMessage(prev => prev + `\n\n✅ Wallet Payment Successful!\nNew Balance: ${formatINR(newBalance)}`)

      await new Promise(resolve => setTimeout(resolve, 1500))

      setOrderData({
        orderId: mockOrder.orderId,
        amount: mockOrder.amount,
        status: 'paid',
        method: 'wallet',
        previousBalance: walletBalance,
        newBalance: newBalance,
        timestamp: new Date().toLocaleString()
      })

      setStep('success')
      setLoading(false)
    } catch (e) {
      setError('❌ ' + (e.message || 'Wallet payment failed'))
      setLoading(false)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') handleRazorpay()
    else if (paymentMethod === 'upi') handleUPI()
    else if (paymentMethod === 'wallet') handleWallet()
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(180deg, #070b14 0%, #0b1220 50%, #0f1d34 100%)',padding:20}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <h1 style={{color:'#38bdf8',marginBottom:32,textAlign:'center',fontSize:28,fontWeight:900}}>
          💳 Payment Methods Demo
        </h1>

        {/* Order Summary */}
        <div style={{background:'linear-gradient(135deg, #0b1220 0%, #0f1d34 100%)',border:'1px solid #2A4368',borderRadius:12,padding:24,marginBottom:24}}>
          <h2 style={{margin:'0 0 16px 0',color:'#fff',fontSize:18}}>Order Summary</h2>
          {mockOrder.items.map(item => (
            <div key={item.id} style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:14,color:'#9aa0a6'}}>
              <span>{item.title} × {item.qty}</span>
              <strong style={{color:'#fff'}}>{formatINR(item.unitPrice * item.qty)}</strong>
            </div>
          ))}
          <div style={{height:1,background:'#2A4368',margin:'12px 0'}}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:18,fontWeight:800,color:'#38bdf8'}}>
            <span>Total</span>
            <span>{formatINR(mockOrder.amount)}</span>
          </div>
        </div>

        {step === 'select' && (
          <>
            {/* Payment Method Selection */}
            <div style={{marginBottom:24}}>
              <h3 style={{color:'#fff',marginBottom:12,fontSize:16}}>Select Payment Method</h3>
              <div style={{display:'grid',gap:12}}>
                {[
                  { id: 'razorpay', name: '💳 Razorpay', desc: 'Credit/Debit Card, Net Banking', testInfo: 'Test: 4111 1111 1111 1111' },
                  { id: 'upi', name: '📱 UPI', desc: 'Google Pay, PhonePe, Paytm', testInfo: 'Test: Any UPI ID' },
                  { id: 'wallet', name: '👛 Wallet', desc: 'RepairWale Credits (Balance: ₹10,000)', testInfo: 'Test: Auto-deducted' }
                ].map(method => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    style={{
                      padding:16,
                      borderRadius:12,
                      border: paymentMethod === method.id ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                      background: paymentMethod === method.id ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.03)',
                      cursor:'pointer',
                      transition:'all 0.2s'
                    }}
                  >
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14,color:'#fff'}}>{method.name}</div>
                        <div style={{fontSize:12,color:'#9aa0a6',marginTop:4}}>{method.desc}</div>
                        <div style={{fontSize:11,color:'#38bdf8',marginTop:6}}>ℹ️ {method.testInfo}</div>
                      </div>
                      <div style={{width:20,height:20,borderRadius:'50%',border:'2px solid',borderColor: paymentMethod === method.id ? '#38bdf8' : 'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {paymentMethod === method.id && <div style={{width:10,height:10,borderRadius:'50%',background:'#38bdf8'}}/>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width:'100%',
                padding:'14px 24px',
                borderRadius:10,
                border:'none',
                background:'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)',
                color:'#000',
                fontWeight:700,
                fontSize:16,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow:'0 4px 16px rgba(56, 189, 248, 0.3)'
              }}
            >
              {loading ? 'Processing...' : `Pay ${formatINR(mockOrder.amount)}`}
            </button>
          </>
        )}

        {step === 'payment' && (
          <div style={{background:'rgba(56,189,248,0.1)',border:'1px solid #38bdf8',borderRadius:12,padding:24,textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:16}}>⏳</div>
            <p style={{color:'#9aa0a6',fontSize:14,marginBottom:12}}>Processing {paymentMethod === 'razorpay' ? 'Razorpay' : paymentMethod === 'upi' ? 'UPI' : 'Wallet'} payment...</p>
            {message && <div style={{whiteSpace:'pre-wrap',color:'#38bdf8',fontSize:12,fontFamily:'monospace',background:'rgba(0,0,0,0.3)',padding:12,borderRadius:8}}>{message}</div>}
            {error && <div style={{color:'#ff6b6b',marginTop:12,fontSize:12}}>{error}</div>}
          </div>
        )}

        {step === 'success' && orderData && (
          <div style={{background:'rgba(16,185,129,0.15)',border:'1px solid #10b981',borderRadius:12,padding:24}}>
            <div style={{fontSize:48,textAlign:'center',marginBottom:16}}>✅</div>
            <h2 style={{color:'#10b981',textAlign:'center',marginBottom:12}}>Payment Successful!</h2>
            
            <div style={{background:'rgba(255,255,255,0.05)',borderRadius:8,padding:16,marginBottom:16}}>
              <div style={{display:'grid',gap:10,fontSize:13,color:'#9aa0a6'}}>
                <div><strong style={{color:'#fff'}}>Order ID:</strong> {orderData.orderId}</div>
                <div><strong style={{color:'#fff'}}>Amount:</strong> {formatINR(orderData.amount)}</div>
                <div><strong style={{color:'#fff'}}>Method:</strong> {paymentMethod.toUpperCase()}</div>
                {orderData.paymentId && <div><strong style={{color:'#fff'}}>Payment ID:</strong> {orderData.paymentId}</div>}
                {orderData.transactionId && <div><strong style={{color:'#fff'}}>Transaction ID:</strong> {orderData.transactionId}</div>}
                {orderData.newBalance !== undefined && (
                  <>
                    <div><strong style={{color:'#fff'}}>Previous Balance:</strong> {formatINR(orderData.previousBalance)}</div>
                    <div><strong style={{color:'#fff'}}>New Balance:</strong> {formatINR(orderData.newBalance)}</div>
                  </>
                )}
                <div><strong style={{color:'#fff'}}>Status:</strong> <span style={{color:'#10b981'}}>PAID</span></div>
                <div><strong style={{color:'#fff'}}>Time:</strong> {orderData.timestamp}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('select')
                setPaymentMethod('razorpay')
                setError('')
                setMessage('')
              }}
              style={{
                width:'100%',
                padding:'12px 24px',
                borderRadius:10,
                border:'1px solid #10b981',
                background:'rgba(16,185,129,0.1)',
                color:'#10b981',
                fontWeight:700,
                fontSize:14,
                cursor:'pointer'
              }}
            >
              Try Another Payment
            </button>
          </div>
        )}
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          color: #fff;
        }
      `}</style>
    </div>
  )
}
