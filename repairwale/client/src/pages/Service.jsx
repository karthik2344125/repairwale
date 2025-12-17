import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Reviews from '../components/Reviews'
import { getCart as loadCart, saveCart } from '../services/cart'
import { showSuccess, showError } from '../services/toast'
import { isFavorite, toggleFavorite } from '../services/favorites'

// Structured catalogue with numeric pricing for accurate cart math
const heroImages = {
  emergency: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=70',
  maintenance: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=70',
  repairs: 'https://images.unsplash.com/photo-1517167685286-3084788c5f17?auto=format&fit=crop&w=1400&q=70',
  towing: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=70',
  wheels: 'https://images.unsplash.com/photo-1515923166481-9f56f1babaed?auto=format&fit=crop&w=1400&q=70',
  digital: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=70',
}
const catalog = [
  {
    id: 'emergency',
    title: 'Emergency Roadside',
    subtitle: '30–45 min dispatch',
    image: heroImages.emergency,
    items: [
      { id: 'breakdown_fix', title: 'Breakdown Quick Fix', desc: 'Minor repairs on-spot (belts, fuses, hoses)', price: 549, sla: '30-60 mins', badge: 'Most booked', image: 'https://images.unsplash.com/photo-1530047520930-dce1309622b1?auto=format&fit=crop&w=800&q=70' },
      { id: 'flat_tyre', title: 'Flat Tyre Assist', desc: 'Tyre change or puncture patching', price: 399, sla: '30 mins', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'jump_start', title: 'Battery Jump-Start', desc: 'Portable booster start with diagnostics', price: 299, sla: '20-30 mins', image: 'https://images.unsplash.com/photo-1519580906315-3eaf7ee34d91?auto=format&fit=crop&w=800&q=70' },
      { id: 'fuel_topup', title: 'Emergency Fuel Delivery', desc: '2–5 litres delivered (fuel cost extra)', price: 249, sla: '40 mins', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=70' },
      { id: 'locked_keys', title: 'Locked Keys Support', desc: 'Non-destructive unlock for most models', price: 749, sla: '45-60 mins', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=70' },
      { id: 'winch_recovery', title: 'Winch & Pull-out', desc: 'Mud/sand recovery with trained crew', price: 1299, sla: '60-90 mins', image: 'https://images.unsplash.com/photo-1527416876370-f2cf8c3da1e8?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Scheduled Maintenance',
    subtitle: 'At-home service with OEM parts',
    image: heroImages.maintenance,
    items: [
      { id: 'basic_service', title: 'Basic Service', desc: 'Engine oil, filters check, brake inspection', price: 1299, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'comprehensive_service', title: 'Comprehensive Service', desc: 'Full engine check, coolant & AC inspection', price: 2299, sla: 'Same-day', badge: 'Full check', image: 'https://images.unsplash.com/photo-1515923166481-9f56f1babaed?auto=format&fit=crop&w=800&q=70' },
      { id: 'pickup_drop', title: 'Pickup & Drop', desc: 'Vehicle picked, serviced at partner garage, returned', price: 399, sla: 'Next-day', badge: 'Convenience', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'detailing', title: 'Detailing & Wash', desc: 'Exterior foam wash, interior vacuum & polish', price: 899, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'ac_service', title: 'AC Service', desc: 'Cooling restoration, gas top-up, cabin filter', price: 1499, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70' },
      { id: 'interior_detail', title: 'Interior Deep Clean', desc: 'Steam, upholstery shampoo, odor removal', price: 1699, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'repairs',
    title: 'Mechanical & Electrical',
    subtitle: 'Specialist diagnostics with warranty',
    image: heroImages.repairs,
    items: [
      { id: 'engine_tune', title: 'Engine Tune-up', desc: 'Diagnostics, plugs, throttle body clean', price: 1799, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1517167685286-3084788c5f17?auto=format&fit=crop&w=800&q=70' },
      { id: 'brake_service', title: 'Brake Service', desc: 'Pads/cleaning + fluid top-up (parts extra)', price: 999, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'battery_replace', title: 'Battery Replacement', desc: 'Installation + testing (battery cost extra)', price: 499, sla: '30-60 mins', image: 'https://images.unsplash.com/photo-1519580906315-3eaf7ee34d91?auto=format&fit=crop&w=800&q=70' },
      { id: 'clutch_work', title: 'Clutch & Gear', desc: 'Labour for clutch/gear overhauls', price: 2499, sla: '1-2 days', image: 'https://images.unsplash.com/photo-1530047520930-dce1309622b1?auto=format&fit=crop&w=800&q=70' },
      { id: 'ecu_scan', title: 'ECU Scan & Reset', desc: 'Sensor scan, fault code clear, report shared', price: 599, sla: '60 mins', badge: 'Diagnostic', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70' },
      { id: 'suspension', title: 'Suspension & Steering', desc: 'Shocks, struts, alignment assistance', price: 1899, sla: '1 day', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=70' },
      { id: 'alternator', title: 'Alternator & Charging', desc: 'Charging system diagnostics and repair', price: 1299, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=70' },
      { id: 'radiator', title: 'Radiator & Cooling', desc: 'Leak check, flush, hose replacement labor', price: 1499, sla: '1 day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'diagnostics', title: 'Full Diagnostics Pack', desc: 'OBD scan, road test, written report', price: 899, sla: 'Same-day', badge: 'Popular', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70' },
      { id: 'paint_touch', title: 'Paint Touch-up', desc: 'Minor panel touch-up and polish', price: 1299, sla: '1 day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'towing',
    title: 'Towing & Transport',
    subtitle: 'Insured flatbed partners',
    image: heroImages.towing,
    items: [
      { id: 'city_tow', title: 'City Tow (≤10 km)', desc: 'For breakdowns or accidents', price: 1199, sla: '45-90 mins', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=70' },
      { id: 'flatbed', title: 'Flatbed Tow', desc: 'Low-floor flatbed for premium cars/bikes', price: 1899, sla: '60-120 mins', image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=70' },
      { id: 'long_haul', title: 'Long-Distance (per km)', desc: 'Beyond 10 km, billed per km', price: 45, sla: 'Scheduled', badge: 'Metered', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'wheels',
    title: 'Tyres & Wheels',
    subtitle: 'Grip, balance, and alignment',
    image: heroImages.wheels,
    items: [
      { id: 'wheel_alignment', title: 'Wheel Alignment', desc: '4-wheel alignment with report', price: 699, sla: '60 mins', image: 'https://images.unsplash.com/photo-1515923166481-9f56f1babaed?auto=format&fit=crop&w=800&q=70' },
      { id: 'wheel_balancing', title: 'Wheel Balancing', desc: 'Weights + balancing for smooth ride', price: 599, sla: '60 mins', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'tyre_replacement', title: 'Tyre Replacement', desc: 'Premium tyres with fitment', price: 1299, sla: '90 mins', badge: 'Value', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'alloy_repair', title: 'Alloy Repair', desc: 'Curb rash fix and refinishing', price: 1599, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1515923166481-9f56f1babaed?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'digital',
    title: 'Digital Add-ons',
    subtitle: 'Included with every booking',
    image: heroImages.digital,
    items: [
      { id: 'estimates', title: 'Digital Estimates', desc: 'Transparent breakdown with approvals', price: 0, sla: 'Instant', badge: 'Free', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70' },
      { id: 'tracking', title: 'Live Tracking', desc: 'Mechanic ETA + live location', price: 0, sla: 'Live', badge: 'Free', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=70' },
      { id: 'chat_support', title: 'In-app Chat', desc: 'Secure chat + voice with assigned mechanic', price: 0, sla: 'Live', badge: 'Free', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=70' },
    ],
  },
  {
    id: 'bodycare',
    title: 'Body & Care',
    subtitle: 'Protection and cosmetic refresh',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=70',
    items: [
      { id: 'ppf_partial', title: 'PPF Partial', desc: 'Partial paint protection film (front bumper/bonnet)', price: 4999, sla: '1-2 days', badge: 'Premium', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=70' },
      { id: 'ceramic_coat', title: 'Ceramic Coating', desc: '5H/9H coating with 12-month hydrophobic protection', price: 7999, sla: '2 days', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=70' },
      { id: 'windshield_replace', title: 'Windshield Replacement', desc: 'Laminated glass replacement (glass extra)', price: 2199, sla: '1 day', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=70' },
      { id: 'headlight_restore', title: 'Headlight Restoration', desc: 'Oxidation removal + UV sealant', price: 1199, sla: 'Same-day', image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=70' },
    ],
  },
]

function formatINR(value){
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

function Stat({ label, value }){
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
    </div>
  )
}

export default function Service(){
  const navigate = useNavigate()
  const [cart, setCart] = useState(() => {
    const stored = loadCart()
    return Array.isArray(stored.items) ? stored.items : []
  })
  const [selectedCat, setSelectedCat] = useState(catalog[0].id)
  const [notes, setNotes] = useState('')
  const [query, setQuery] = useState('')
  const [vehicleType, setVehicleType] = useState(sessionStorage.getItem('rw_vehicle_type') || 'Car')

  useEffect(() => {
    saveCart({ items: cart, currency: 'INR' })
  }, [cart])

  useEffect(() => {
    sessionStorage.setItem('rw_vehicle_type', vehicleType)
  }, [vehicleType])

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0), [cart])
  const serviceFee = cart.length ? 49 : 0
  const tax = Math.round((subtotal + serviceFee) * 0.05)
  const total = subtotal + serviceFee + tax

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase()
    if(!q) return catalog
    return catalog.map(cat => ({
      ...cat,
      items: cat.items.filter(it =>
        it.title.toLowerCase().includes(q) ||
        (it.desc || '').toLowerCase().includes(q)
      )
    })).filter(cat => cat.items.length)
  }, [query])

  const addToCart = (svc) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === svc.id)
      if(existing){
        showSuccess(`Updated quantity for ${svc.title}`)
        return prev.map(i => i.id === svc.id ? { ...i, qty: i.qty + 1 } : i)
      }
      showSuccess(`✓ Added ${svc.title} to cart`)
      return [...prev, { id: svc.id, title: svc.title, price: svc.price, qty: 1, badge: svc.badge }]
    })
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }

  const removeItem = (id) => {
    const item = cart.find(i => i.id === id)
    setCart(prev => prev.filter(i => i.id !== id))
    if(item) showSuccess(`Removed ${item.title} from cart`)
  }

  const clearCart = () => setCart([])

  const proceedCheckout = () => {
    if(!cart.length){
      alert('Cart is empty')
      return
    }
    const payload = {
      items: cart.map(it => ({ ...it, unitPrice: it.price })),
      subtotal,
      serviceFee,
      tax,
      total,
      notes,
      createdAt: Date.now()
    }
    sessionStorage.setItem('rw_checkout', JSON.stringify(payload))
    navigate('/checkout')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🛠️ Services & Pricing</h1>
        <p className="page-subtitle">Curated packages with transparent pricing • 50+ services • Same-day service available</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:12}}>
          <span className="item-chip">🔒 Secure cart</span>
          <span className="item-chip">⚡ Live dispatch</span>
          <span className="item-chip">⭐ 4.8 rated</span>
          <span className="item-chip">🛠️ OEM parts</span>
          <span className="item-chip">💳 Transparent estimates</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card" style={{marginBottom:24}}>
        <div className="grid grid-2" style={{gap:20,alignItems:'end'}}>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label">🔍 Search Services</label>
            <input
              className="form-input"
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Search by service name or issue (e.g. brake, battery, tow)"
              style={{fontSize:15}}
            />
          </div>
          <div className="flex" style={{gap:12,alignItems:'center'}}>
            <label className="form-label" style={{margin:0,minWidth:70}}>Vehicle Type</label>
            <select className="form-select" value={vehicleType} onChange={e=>setVehicleType(e.target.value)} style={{fontSize:15,flex:1}}>
              <option>Bike</option>
              <option>Car</option>
              <option>SUV</option>
              <option>EV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-grid" style={{marginBottom:24,gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))'}}>
        <Stat label="Average ETA" value="32 mins" />
        <Stat label="Coverage" value="14 cities" />
        <Stat label="Support" value="24/7" />
        <Stat label="Rating" value="4.8/5 ⭐" />
      </div>

      {/* Category Tabs */}
      <div style={{marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div style={{fontSize:15,color:'var(--muted)'}}>Browse by category • Tap to switch</div>
        <div style={{fontSize:13,color:'var(--muted)'}}>{(filteredCatalog.length? filteredCatalog : catalog).find(c=>c.id===selectedCat)?.items.length || 0} services shown</div>
      </div>
      <div style={{marginBottom:24,overflowX:'auto',paddingBottom:8}}>
        <div style={{display:'flex',gap:10,minWidth:'max-content'}}>
          {(filteredCatalog.length? filteredCatalog : catalog).map(cat => (
            <button
              key={cat.id}
              onClick={()=>setSelectedCat(cat.id)}
              style={{
                padding:'12px 24px',
                borderRadius:12,
                border:`2px solid ${selectedCat===cat.id ? 'var(--accent)' : 'var(--border)'}`,
                background: selectedCat===cat.id ? 'var(--accent)' : 'var(--surface)',
                color: selectedCat===cat.id ? '#ffffff' : 'var(--text)',
                cursor:'pointer',
                fontWeight:selectedCat===cat.id ? 800 : 600,
                fontSize:15,
                transition:'all 0.2s',
                whiteSpace:'nowrap',
                boxShadow: selectedCat===cat.id ? '0 4px 12px rgba(30,58,138,0.3)' : 'none'
              }}
            >
              {cat.title}
              <span style={{marginLeft:8,opacity:0.7,fontSize:13}}>({cat.items.length})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-2" style={{alignItems:'start',gap:24}}>
        <div>

          {/* Service Items */}
          {(filteredCatalog.length? filteredCatalog : catalog).filter(c=>c.id===selectedCat).map(cat => (
            <div key={cat.id}>
              <div style={{marginBottom:16,padding:'16px 0',borderBottom:'2px solid var(--border)'}}>
                <h3 style={{margin:0,fontSize:22,fontWeight:800,color:'var(--text)'}}>{cat.title}</h3>
                {cat.subtitle && <p style={{margin:'4px 0 0',fontSize:14,color:'var(--muted)'}}>{cat.subtitle}</p>}
              </div>
              
              <div style={{display:'grid',gap:16}}>
                {cat.items.map(item => (
                  <div key={item.id} style={{
                    border:'1px solid var(--border)',
                    borderRadius:14,
                    padding:16,
                    background:'var(--surface)',
                    transition:'all 0.2s',
                    boxShadow:'var(--shadow-sm)',
                    position:'relative'
                  }}>
                    <div style={{display:'grid',gridTemplateColumns:'100px 1fr auto',gap:16,alignItems:'start'}}>
                      <img 
                        src={item.image || heroImages[cat.id]} 
                        alt={item.title} 
                        loading="lazy"
                        style={{
                          width:100,
                          height:100,
                          borderRadius:12,
                          objectFit:'cover',
                          border:'1px solid var(--border)',
                          background:'var(--bg-tertiary)'
                        }}
                      />
                      <div style={{minWidth:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                          <h4 style={{margin:0,fontSize:17,fontWeight:800,color:'var(--text)'}}>{item.title}</h4>
                          {item.badge && (
                            <span style={{
                              padding:'4px 10px',
                              borderRadius:6,
                              fontSize:11,
                              fontWeight:700,
                              background:'rgba(30,58,138,0.15)',
                              color:'var(--accent-light)',
                              border:'1px solid rgba(30,58,138,0.3)'
                            }}>{item.badge}</span>
                          )}
                        </div>
                        <p style={{margin:'2px 0 10px',fontSize:14,color:'var(--text-secondary)',lineHeight:1.5}}>{item.desc}</p>
                        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                          <span style={{
                            padding:'5px 10px',
                            borderRadius:8,
                            fontSize:12,
                            background:'var(--bg-tertiary)',
                            border:'1px solid var(--border)',
                            color:'var(--text-secondary)'
                          }}>⏱️ {item.sla}</span>
                          <span style={{
                            padding:'5px 10px',
                            borderRadius:8,
                            fontSize:12,
                            background:'var(--bg-tertiary)',
                            border:'1px solid var(--border)',
                            color:'var(--text-secondary)'
                          }}>🚗 {vehicleType}</span>
                        </div>
                      </div>
                      <div style={{textAlign:'right',minWidth:120}}>
                        <div style={{fontSize:24,fontWeight:900,color:'var(--accent-light)',marginBottom:12}}>
                          {formatINR(item.price)}
                        </div>
                        <div style={{display:'flex',flexDirection:'column',gap:8}}>
                          <Button variant="primary" size="sm" onClick={() => addToCart(item)} style={{width:'100%'}}>
                            ➕ Add to Cart
                          </Button>
                          <button
                            aria-label="Toggle favorite"
                            onClick={() => {
                              const wasFav = isFavorite(item.id)
                              toggleFavorite({ ...item, category: cat.id })
                              showSuccess(wasFav ? 'Removed from favorites' : 'Added to favorites')
                              window.dispatchEvent(new Event('favoritesUpdated'))
                            }}
                            style={{
                              padding:'8px',
                              borderRadius:8,
                              border:'1px solid var(--border)',
                              background:'var(--surface)',
                              color:isFavorite(item.id)?'#ef4444':'var(--muted)',
                              cursor:'pointer',
                              fontSize:18,
                              transition:'all 0.2s'
                            }}
                          >
                            {isFavorite(item.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <aside className="card" style={{position:'sticky',top:110,maxHeight:'calc(100vh - 140px)',overflowY:'auto'}}>
          <div style={{marginBottom:16,paddingBottom:16,borderBottom:'2px solid var(--border)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <h3 style={{margin:0,fontSize:20,fontWeight:800,color:'var(--text)'}}>🛒 Your Cart</h3>
              <Button size="sm" variant="ghost" onClick={clearCart} disabled={!cart.length}>Clear All</Button>
            </div>
            <p style={{margin:'4px 0 0',fontSize:13,color:'var(--muted)'}}>{cart.length ? `${cart.length} item(s) in cart` : 'No items added yet'}</p>
          </div>

          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <div className="empty-text">Cart is empty</div>
              <div style={{fontSize:12,marginTop:4,color:'var(--muted)'}}>Add services to view totals</div>
            </div>
          ) : (
            <div className="item-list">
              {cart.map(item => (
                <div key={item.id} style={{
                  display:'grid',
                  gridTemplateColumns:'1fr auto auto auto',
                  gap:10,
                  alignItems:'center',
                  border:'1px solid var(--border)',
                  borderRadius:12,
                  padding:12,
                  background:'var(--bg-tertiary)'
                }}>
                  <h4 style={{margin:0,fontWeight:800,fontSize:14}}>{item.title}</h4>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <button 
                      onClick={() => updateQty(item.id,-1)}
                      style={{
                        width:28,
                        height:28,
                        borderRadius:8,
                        border:'1px solid var(--border)',
                        background:'var(--bg-tertiary)',
                        color:'var(--text)',
                        fontWeight:800,
                        cursor:'pointer'
                      }}
                    >–</button>
                    <span style={{fontWeight:800,minWidth:20,textAlign:'center'}}>{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id,1)}
                      style={{
                        width:28,
                        height:28,
                        borderRadius:8,
                        border:'1px solid var(--border)',
                        background:'var(--bg-tertiary)',
                        color:'var(--text)',
                        fontWeight:800,
                        cursor:'pointer'
                      }}
                    >+</button>
                  </div>
                  <div style={{fontWeight:800}}>{formatINR(item.price * item.qty)}</div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove"
                    style={{
                      width:28,
                      height:28,
                      borderRadius:8,
                      border:'1px solid var(--border)',
                      background:'var(--bg-tertiary)',
                      color:'var(--text)',
                      fontWeight:800,
                      cursor:'pointer'
                    }}
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <>
              <div style={{
                border:'1px solid var(--border)',
                borderRadius:12,
                padding:'12px 14px',
                background:'var(--bg-tertiary)',
                display:'grid',
                gap:6,
                marginTop:14
              }}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                  <span className="muted">Subtotal</span>
                  <strong>{formatINR(subtotal)}</strong>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                  <span className="muted">Service fee</span>
                  <strong>{formatINR(serviceFee)}</strong>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
                  <span className="muted">Tax (5%)</span>
                  <strong>{formatINR(tax)}</strong>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:15,fontWeight:800,paddingTop:6,borderTop:'1px solid var(--border)'}}>
                  <span>Total</span>
                  <strong>{formatINR(total)}</strong>
                </div>
              </div>

              <div className="form-group" style={{marginTop:14}}>
                <label className="form-label">Notes for mechanic</label>
                <textarea 
                  className="form-input" 
                  placeholder="Describe symptoms, location landmarks, or time preference" 
                  value={notes} 
                  onChange={e=>setNotes(e.target.value)}
                  style={{minHeight:70,resize:'vertical'}}
                />
              </div>

              <Button variant="primary" size="lg" style={{marginTop:14,width:'100%'}} onClick={proceedCheckout}>
                Proceed to checkout →
              </Button>
              <div style={{fontSize:11,color:'var(--muted)',marginTop:8,textAlign:'center'}}>
                We'll hold your cart for 60 minutes. Secure payments on next step.
              </div>
            </>
          )}
        </aside>
      </div>
      
      {/* Reviews Section */}
      <div className="card" style={{marginTop:40}}>
        <Reviews serviceId="repairwale-services" serviceName="RepairWale Services" />
      </div>
    </div>
  )
}
