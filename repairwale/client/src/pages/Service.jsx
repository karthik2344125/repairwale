import React, { useRef, useState } from 'react'
import RequestForm from '../components/RequestForm'
import Button from '../components/Button'

// Professional service catalogue (industry-style) with pricing tiers
const catalog = [
  {
    id: 'emergency',
    title: 'Emergency Roadside Assistance',
    items: [
      { id: 'breakdown', title: 'Breakdown Quick Fix', desc: 'Minor repairs done on spot (belts, fuses)', price: 599, priceRange: '₹299–699' },
      { id: 'flat_tyre', title: 'Flat Tyre Assistance', desc: 'Tyre change or puncture patching', price: 399, priceRange: '₹249–499' },
      { id: 'jump_start', title: 'Battery Jump-Start', desc: 'Start the vehicle with portable booster', price: 299, priceRange: '₹199–399' },
      { id: 'fuel_delivery', title: 'Emergency Fuel Delivery', desc: '2–5 litres of fuel delivered (fuel cost extra)', price: 249, priceRange: '₹149–299' },
      { id: 'locked_keys', title: 'Keys Locked Assistance', desc: 'Unlock support (non-destructive)', price: 699, priceRange: '₹399–899' },
    ],
  },
  {
    id: 'maintenance',
    title: 'At-Home Vehicle Maintenance',
    items: [
      { id: 'standard_service', title: 'Standard Service', desc: 'Oil change, filters check, brake inspection', price: 1299, priceRange: '₹999–1,599' },
      { id: 'comprehensive', title: 'Comprehensive Service', desc: 'Full engine check, coolant & AC inspection', price: 2399, priceRange: '₹1,699–2,999' },
      { id: 'pickup_drop', title: 'Pickup & Drop Servicing', desc: 'Mechanic collects and returns vehicle', price: 349, priceRange: '₹199–499' },
      { id: 'detailing', title: 'Car/Bike Wash & Detailing', desc: 'Exterior & interior cleaning', price: 999, priceRange: '₹399–1,999' },
    ],
  },
  {
    id: 'repairs',
    title: 'Mechanical & Electrical Repairs',
    items: [
      { id: 'engine', title: 'Engine Repair', desc: 'Diagnostics, tune-ups, minor component fix', price: 2999, priceRange: '₹699–4,999' },
      { id: 'brake', title: 'Brake Service', desc: 'Pads replacement & alignment', price: 1199, priceRange: '₹399–1,999' },
      { id: 'battery_replace', title: 'Battery Replacement', desc: 'Installation + testing (battery cost extra)', price: 299, priceRange: '₹199–399' },
      { id: 'clutch', title: 'Clutch & Gear Work', desc: 'Labour & parts replacement', price: 4499, priceRange: '₹1,499–6,999' },
      { id: 'ecu', title: 'ECU Scanning & Reset', desc: 'Sensor scan & code clearing', price: 799, priceRange: '₹399–1,099' },
    ],
  },
  {
    id: 'parts',
    title: 'Spare Parts & Accessories',
    items: [
      { id: 'tyres', title: 'Tyres', desc: 'Branded tyres + fitting charges', price: 4500, priceRange: '₹1,000–8,000' },
      { id: 'oils', title: 'Engine Oils & Fluids', desc: 'Top brands (Synthetic/Mineral)', price: 1199, priceRange: '₹299–1,999' },
      { id: 'filters', title: 'Filters & Consumables', desc: 'Air/Oil filters, spark plugs, brake fluid', price: 499, priceRange: '₹99–899' },
      { id: 'batteries', title: 'Batteries', desc: 'Car/bike batteries with warranty', price: 4999, priceRange: '₹900–8,999' },
    ],
  },
  {
    id: 'towing',
    title: 'Towing & Vehicle Transport',
    items: [
      { id: 'city_tow', title: 'City Towing (Up to 10 km)', desc: 'For accident or full breakdown', price: 1199, priceRange: '₹799–1,499' },
      { id: 'flatbed', title: 'Flatbed Towing', desc: 'Premium towing for cars & superbikes', price: 2799, priceRange: '₹1,499–3,999' },
      { id: 'long_distance', title: 'Long Distance Transport', desc: 'Cost per kilometer (after 10 km)', price: 45, priceRange: '₹30–60 per km' },
    ],
  },
  {
    id: 'digital',
    title: 'Digital & Support Services',
    items: [
      { id: 'estimates', title: 'Digital Estimate & Billing', desc: 'Automated breakdown of charges', price: 0, priceRange: 'Free' },
      { id: 'tracking', title: 'Real-Time Mechanic Tracking', desc: 'Live location + ETA updates', price: 0, priceRange: 'Free' },
      { id: 'chat', title: 'In-App Chat & Support', desc: 'Voice/text chat with mechanic', price: 0, priceRange: 'Free' },
      { id: 'history', title: 'Service History & Warranty Tracking', desc: 'Records all repairs & invoices', price: 0, priceRange: 'Free' },
    ],
  },
]

export default function Service(){
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState('review') // review -> details -> confirm
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    pincode: '',
  })
  const formRef = useRef(null)

  function addToCart(service){
    const exists = cart.find(item => item.id === service.id)
    if (exists) {
      alert('Service already in cart!')
      return
    }
    setCart([...cart, { ...service }])
    setShowCart(true)
  }

  function removeFromCart(serviceId){
    setCart(cart.filter(item => item.id !== serviceId))
  }

  function clearCart(){
    setCart([])
  }

  function calculateTotal(){
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  function scrollToCheckout(){
    setTimeout(() => {
      const el = document.getElementById('request-form')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
  }

  function formatCurrency(amount){
    return `₹${amount}`
  }

  // no local order id; handled by payment gateway

  async function handleSubmit(problem){
    if (cart.length === 0) {
      alert('Please add at least one service to cart before booking!')
      return
    }

    // basic validation of user details
    if (!checkoutDetails.fullName || !checkoutDetails.phone || !checkoutDetails.addressLine1 || !checkoutDetails.city || !checkoutDetails.pincode){
      alert('Please fill your name, phone, address, city and pincode before confirming.')
      setCheckoutStep('details')
      scrollToCheckout()
      return
    }

    // attempt to get user's location
    let lat = 28.6139, lng = 77.2090
    try{
      const pos = await new Promise((res, rej) => {
        if (!navigator.geolocation) return rej(new Error('no geo'))
        navigator.geolocation.getCurrentPosition(p => res(p), e => rej(e), { timeout: 5000 })
      })
      lat = pos.coords.latitude; lng = pos.coords.longitude
    }catch(e){ /* ignore and use default */ }

    const payload = { 
      customerName: checkoutDetails.fullName || 'Guest', 
      lat, 
      lng, 
      problem, 
      services: cart,
      totalAmount: calculateTotal(),
      phone: checkoutDetails.phone,
      address: {
        line1: checkoutDetails.addressLine1,
        line2: checkoutDetails.addressLine2,
        city: checkoutDetails.city,
        pincode: checkoutDetails.pincode,
      },
      // orderId will be created by Razorpay on checkout
    }
    try{
      const r = await fetch('/api/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await r.json()
      if (data && data.ok) {
        // stash booking data and redirect to checkout page for payment
        const checkoutData = {
          bookingRequestId: data.request.id,
          cart,
          total: calculateTotal(),
          details: checkoutDetails,
          problem
        }
        sessionStorage.setItem('rw_checkout', JSON.stringify(checkoutData))
        window.location.href = '/checkout'
      } else {
        alert('Could not create request')
      }
    }catch(err){
      console.warn(err)
      alert('Request failed: ' + err.message)
    }
  }

  const isInCart = (serviceId) => cart.some(item => item.id === serviceId)

  return (
    <div style={{position:'relative'}}>
      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div style={{
          position:'fixed',
          top:'20px',
          right:'20px',
          zIndex:1000,
          background:'var(--text-primary)',
          borderRadius:'50px',
          padding:'14px 28px',
          boxShadow:'var(--shadow-lg)',
          cursor:'pointer',
          display:'flex',
          alignItems:'center',
          gap:'12px',
          border:'1px solid var(--border)'
        }} onClick={() => setShowCart(!showCart)}>
          <span style={{fontSize:'24px',color:'var(--bg-primary)'}}>🛒</span>
          <div>
            <div style={{fontSize:'14px',fontWeight:'700',color:'var(--bg-primary)'}}>{cart.length} Service{cart.length > 1 ? 's' : ''}</div>
            <div style={{fontSize:'12px',color:'var(--accent-dark)'}}>₹{calculateTotal()}</div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div style={{
          position:'fixed',
          top:'0',
          left:'0',
          right:'0',
          bottom:'0',
          background:'rgba(0,0,0,0.85)',
          backdropFilter:'blur(8px)',
          zIndex:2000,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          padding:'20px'
        }} onClick={() => setShowCart(false)}>
          <div style={{
            background:'var(--surface)',
            border:'1px solid var(--border)',
            borderRadius:'20px',
            maxWidth:'650px',
            width:'100%',
            maxHeight:'85vh',
            overflow:'auto',
            padding:'32px',
            boxShadow:'var(--shadow-lg)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{margin:0,color:'var(--text-primary)'}}>🛒 Your Cart</h2>
              <button onClick={() => setShowCart(false)} style={{
                background:'transparent',
                border:'1px solid var(--border)',
                color:'var(--text-primary)',
                fontSize:'20px',
                cursor:'pointer',
                padding:'4px',
                width:'36px',
                height:'36px',
                borderRadius:'8px'
              }}>×</button>
            </div>

            {cart.length === 0 ? (
              <div style={{textAlign:'center',padding:'40px 20px',color:'var(--text-muted)'}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>🛒</div>
                <p style={{color:'var(--text-secondary)'}}>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div style={{marginBottom:'20px'}}>
                  {cart.map((item, index) => (
                    <div key={item.id} style={{
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center',
                      padding:'16px',
                      background:'var(--bg-secondary)',
                      border:'1px solid var(--border-subtle)',
                      borderRadius:'12px',
                      marginBottom:'12px'
                    }}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:'700',marginBottom:'6px',color:'var(--text-primary)'}}>{item.title}</div>
                        <div style={{fontSize:'14px',color:'var(--text-secondary)'}}>{item.desc}</div>
                        <div style={{fontSize:'16px',fontWeight:'700',color:'var(--text-primary)',marginTop:'8px'}}>
                          {item.priceRange}
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{
                        background:'transparent',
                        color:'var(--text-primary)',
                        border:'1px solid var(--border)',
                        borderRadius:'10px',
                        padding:'10px 16px',
                        cursor:'pointer',
                        fontSize:'14px',
                        fontWeight:'700'
                      }}>Remove</button>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop:'2px solid var(--border)',
                  paddingTop:'18px',
                  marginBottom:'20px'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'18px',fontWeight:'800',color:'var(--text-primary)'}}>
                    <span>Estimated Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'8px',textAlign:'right'}}>
                    *Final amount may vary based on actual service requirements
                  </div>
                </div>

                <div style={{display:'flex',gap:'12px'}}>
                  <button onClick={clearCart} style={{
                    flex:1,
                    background:'transparent',
                    border:'1px solid var(--border)',
                    color:'var(--text-primary)',
                    borderRadius:'10px',
                    padding:'12px',
                    cursor:'pointer',
                    fontSize:'15px',
                    fontWeight:'700'
                  }}>Clear Cart</button>
                  <button onClick={() => {setShowCart(false); scrollToCheckout()}} style={{
                    flex:2,
                    background:'var(--text-primary)',
                    border:'none',
                    color:'var(--bg-primary)',
                    borderRadius:'10px',
                    padding:'12px',
                    cursor:'pointer',
                    fontSize:'15px',
                    fontWeight:'700',
                    boxShadow:'var(--shadow-md)'
                  }}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
        <h2 style={{margin:0,color:'var(--text-primary)'}}>Our Services</h2>
        {cart.length > 0 && (
          <div style={{fontSize:'14px',color:'var(--text-secondary)'}}>
            <span style={{fontWeight:'700',color:'var(--text-primary)'}}>{cart.length}</span> service{cart.length > 1 ? 's' : ''} in cart
          </div>
        )}
      </div>

      {catalog.map(cat => (
        <section key={cat.id} style={{marginBottom:'32px'}}>
          <h3 className="category-title" style={{
            fontSize:'20px',
            fontWeight:'700',
            marginBottom:'16px',
            color:'var(--text-primary)'
          }}>{cat.title}</h3>
          <div className="services-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',
            gap:'16px'
          }}>
            {cat.items.map(s => (
              <div key={s.id} className="card service-card" style={{
                border:'1px solid var(--border)',
                borderRadius:'12px',
                padding:'20px',
                background: isInCart(s.id) ? 'var(--bg-tertiary)' : 'var(--surface)',
                transition:'all 0.3s ease',
                position:'relative'
              }}>
                {isInCart(s.id) && (
                  <div style={{
                    position:'absolute',
                    top:'12px',
                    right:'12px',
                    background:'var(--text-primary)',
                    color:'var(--bg-primary)',
                    borderRadius:'20px',
                    padding:'4px 12px',
                    fontSize:'12px',
                    fontWeight:'600'
                  }}>✓ In Cart</div>
                )}
                <div style={{marginBottom:'12px'}}>
                  <div className="service-title" style={{
                    fontSize:'18px',
                    fontWeight:'700',
                    marginBottom:'8px',
                    color:'var(--text-primary)'
                  }}>{s.title}</div>
                  <div className="muted" style={{
                    fontSize:'14px',
                    color:'var(--text-secondary)',
                    lineHeight:'1.5'
                  }}>{s.desc}</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'16px'}}>
                  <div style={{
                    fontSize:'18px',
                    fontWeight:'800',
                    color:'var(--text-primary)'
                  }}>{s.priceRange}</div>
                  <Button 
                    variant={isInCart(s.id) ? "secondary" : "primary"} 
                    size="sm" 
                    onClick={() => isInCart(s.id) ? removeFromCart(s.id) : addToCart(s)}
                    style={{
                      background: isInCart(s.id) ? 'transparent' : undefined,
                      borderColor: isInCart(s.id) ? 'var(--border)' : undefined,
                      color: isInCart(s.id) ? 'var(--text-primary)' : undefined
                    }}
                  >
                    {isInCart(s.id) ? 'Remove' : 'Add to Cart'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section id="request-form" className="card" style={{
        marginTop:'40px',
        background:'var(--surface)',
        borderRadius:'16px',
        padding:'32px',
        border:'1px solid var(--border)'
      }}>
        <h3 style={{marginTop:0,marginBottom:'8px',color:'var(--text-primary)'}}>📋 Complete Your Booking</h3>
        <p className="muted" style={{marginTop:0}}>Step: {checkoutStep === 'review' ? 'Review Cart' : checkoutStep === 'details' ? 'Enter Details' : 'Proceed to Payment'}</p>
        {cart.length === 0 ? (
          <div style={{textAlign:'center',padding:'40px 20px',color:'#666'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🛒</div>
            <p style={{color:'var(--text-secondary)'}}>Add services to cart to proceed with booking</p>
          </div>
        ) : (
          <>
            <div style={{
              background:'var(--bg-secondary)',
              borderRadius:'12px',
              padding:'20px',
              marginBottom:'20px'
            }}>
              <h4 style={{margin:'0 0 12px 0',color:'#333'}}>Selected Services:</h4>
              {cart.map((item, index) => (
                <div key={item.id} style={{
                  display:'flex',
                  justifyContent:'space-between',
                  padding:'8px 0',
                  borderBottom: index < cart.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                }}>
                  <span style={{fontSize:'14px',color:'var(--text-primary)'}}>{item.title}</span>
                  <span style={{fontSize:'14px',fontWeight:'700',color:'var(--text-primary)'}}>{item.priceRange}</span>
                </div>
              ))}
              <div style={{
                display:'flex',
                justifyContent:'space-between',
                marginTop:'16px',
                paddingTop:'16px',
                borderTop:'2px solid var(--border)',
                fontSize:'18px',
                fontWeight:'800',
                color:'var(--text-primary)'
              }}>
                <span>Estimated Total:</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
            {/* Customer Details */}
            <div className="card" style={{marginBottom:'20px'}}>
              <h4 style={{margin:'0 0 12px 0',color:'var(--text-primary)'}}>Customer Details</h4>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'12px'}}>
                <input type="text" placeholder="Full Name" value={checkoutDetails.fullName} onChange={(e)=>setCheckoutDetails({...checkoutDetails, fullName:e.target.value})} />
                <input type="tel" placeholder="Phone Number" value={checkoutDetails.phone} onChange={(e)=>setCheckoutDetails({...checkoutDetails, phone:e.target.value})} />
                <input type="text" placeholder="Address Line 1" value={checkoutDetails.addressLine1} onChange={(e)=>setCheckoutDetails({...checkoutDetails, addressLine1:e.target.value})} />
                <input type="text" placeholder="Address Line 2 (Optional)" value={checkoutDetails.addressLine2} onChange={(e)=>setCheckoutDetails({...checkoutDetails, addressLine2:e.target.value})} />
                <input type="text" placeholder="City" value={checkoutDetails.city} onChange={(e)=>setCheckoutDetails({...checkoutDetails, city:e.target.value})} />
                <input type="text" placeholder="Pincode" value={checkoutDetails.pincode} onChange={(e)=>setCheckoutDetails({...checkoutDetails, pincode:e.target.value})} />
              </div>
              <div style={{marginTop:'12px'}} className="muted">Order ID will be created during payment.</div>
            </div>
            <RequestForm onSubmit={handleSubmit} initialProblem={`Booking ${cart.length} service(s)`} submitLabel="Confirm Booking" ref={formRef} />
          </>
        )}
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
      `}</style>
    </div>
  )
}
