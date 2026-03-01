import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Reviews from '../components/Reviews'
import { getCart as loadCart, saveCart } from '../services/cart'
import { showSuccess, showError } from '../services/toast'
import { isFavorite, toggleFavorite } from '../services/favorites'
import { useAuth } from '../context/AuthContext'

// Service catalogue with numeric pricing
const catalog = [
  {
    id: 'emergency',
    title: 'Emergency Roadside',
    subtitle: 'Quick dispatch within 30-45 mins',
    color: '#ef4444',
    items: [
      { id: 'breakdown_fix', title: 'Breakdown Quick Fix', desc: 'Minor repairs on-spot (belts, fuses, hoses)', price: 549, sla: '30-60 mins', badge: 'Most booked' },
      { id: 'flat_tyre', title: 'Flat Tyre Assist', desc: 'Tyre change or puncture patching', price: 399, sla: '30 mins' },
      { id: 'jump_start', title: 'Battery Jump-Start', desc: 'Portable booster start with diagnostics', price: 299, sla: '20-30 mins' },
      { id: 'fuel_topup', title: 'Emergency Fuel Delivery', desc: '2–5 litres delivered (fuel cost extra)', price: 249, sla: '40 mins' },
      { id: 'locked_keys', title: 'Locked Keys Support', desc: 'Non-destructive unlock for most models', price: 749, sla: '45-60 mins' },
      { id: 'winch_recovery', title: 'Winch & Pull-out', desc: 'Mud/sand recovery with trained crew', price: 1299, sla: '60-90 mins' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Scheduled Maintenance',
    subtitle: 'At-home service with OEM parts',
    color: '#3b82f6',
    items: [
      { id: 'basic_service', title: 'Basic Service', desc: 'Engine oil, filters check, brake inspection', price: 1299, sla: 'Same-day' },
      { id: 'comprehensive_service', title: 'Comprehensive Service', desc: 'Full engine check, coolant & AC inspection', price: 2299, sla: 'Same-day', badge: 'Full check' },
      { id: 'pickup_drop', title: 'Pickup & Drop', desc: 'Vehicle picked, serviced at partner workshop, returned', price: 399, sla: 'Next-day', badge: 'Convenience' },
      { id: 'detailing', title: 'Detailing & Wash', desc: 'Exterior foam wash, interior vacuum & polish', price: 899, sla: 'Same-day' },
      { id: 'ac_service', title: 'AC Service', desc: 'Cooling restoration, gas top-up, cabin filter', price: 1499, sla: 'Same-day' },
      { id: 'interior_detail', title: 'Interior Deep Clean', desc: 'Steam, upholstery shampoo, odor removal', price: 1699, sla: 'Same-day' },
    ],
  },
  {
    id: 'repairs',
    title: 'Mechanical & Electrical',
    subtitle: 'Specialist diagnostics with warranty',
    color: '#f59e0b',
    items: [
      { id: 'engine_tune', title: 'Engine Tune-up', desc: 'Diagnostics, plugs, throttle body clean', price: 1799, sla: 'Same-day' },
      { id: 'brake_service', title: 'Brake Service', desc: 'Pads/cleaning + fluid top-up (parts extra)', price: 999, sla: 'Same-day' },
      { id: 'battery_replace', title: 'Battery Replacement', desc: 'Installation + testing (battery cost extra)', price: 499, sla: '30-60 mins' },
      { id: 'clutch_work', title: 'Clutch & Gear', desc: 'Labour for clutch/gear overhauls', price: 2499, sla: '1-2 days' },
      { id: 'ecu_scan', title: 'ECU Scan & Reset', desc: 'Sensor scan, fault code clear, report shared', price: 599, sla: '60 mins', badge: 'Diagnostic' },
      { id: 'suspension', title: 'Suspension & Steering', desc: 'Shocks, struts, alignment assistance', price: 1899, sla: '1 day' },
      { id: 'alternator', title: 'Alternator & Charging', desc: 'Charging system diagnostics and repair', price: 1299, sla: 'Same-day' },
      { id: 'radiator', title: 'Radiator & Cooling', desc: 'Leak check, flush, hose replacement labor', price: 1499, sla: '1 day' },
      { id: 'diagnostics', title: 'Full Diagnostics Pack', desc: 'OBD scan, road test, written report', price: 899, sla: 'Same-day', badge: 'Popular' },
      { id: 'paint_touch', title: 'Paint Touch-up', desc: 'Minor panel touch-up and polish', price: 1299, sla: '1 day' },
    ],
  },
  {
    id: 'towing',
    title: 'Towing & Transport',
    subtitle: 'Insured flatbed partners',
    color: '#8b5cf6',
    items: [
      { id: 'city_tow', title: 'City Tow (≤10 km)', desc: 'For breakdowns or accidents within city limits', price: 1199, sla: '45-90 mins', badge: 'Quick' },
      { id: 'flatbed', title: 'Flatbed Tow', desc: 'Low-floor flatbed for premium cars/bikes with full protection', price: 1899, sla: '60-120 mins', badge: 'Premium' },
      { id: 'long_haul', title: 'Long-Distance Towing', desc: 'Towing beyond 10 km, safe and insured', price: 45, sla: 'Per km', badge: 'Metered' },
      { id: 'crane_tow', title: 'Crane-Assisted Towing', desc: 'Heavy vehicles & recovery from difficult spots', price: 2999, sla: '90-120 mins' },
      { id: 'bike_transport', title: 'Bike Transport', desc: 'Secure bike towing with professional handling', price: 899, sla: '60 mins' },
      { id: 'vehicle_relocation', title: 'Vehicle Relocation', desc: 'Safe transportation of unused vehicles', price: 3499, sla: 'Scheduled' },
    ],
  },
  {
    id: 'wheels',
    title: 'Tyres & Wheels',
    subtitle: 'Grip, balance, and alignment',
    color: '#10b981',
    items: [
      { id: 'wheel_alignment', title: '4-Wheel Alignment', desc: '4-wheel alignment with detailed alignment report', price: 699, sla: '60 mins', badge: 'Popular' },
      { id: 'wheel_balancing', title: 'Wheel Balancing', desc: 'Dynamic wheel balancing for smooth ride', price: 599, sla: '60 mins' },
      { id: 'tyre_replacement', title: 'Tyre Replacement', desc: 'MRF, CEAT, Goodyear tyres with fitment', price: 1299, sla: '90 mins', badge: 'Value' },
      { id: 'alloy_repair', title: 'Alloy Wheel Repair', desc: 'Curb rash fix and professional refinishing', price: 1599, sla: 'Same-day' },
      { id: 'tyre_puncture', title: 'Puncture Repair', desc: 'Quick puncture patching service', price: 299, sla: '30 mins', badge: 'Fast' },
      { id: 'wheel_sensor', title: 'Wheel Sensor Replacement', desc: 'TPMS sensor replacement and calibration', price: 799, sla: 'Same-day' },
    ],
  },
  {
    id: 'bodycare',
    title: 'Body & Care',
    subtitle: 'Protection and cosmetic refresh',
    color: '#ec4899',
    items: [
      { id: 'ppf_partial', title: 'PPF Partial Coverage', desc: 'Paint protection film on front bumper, bonnet & hood', price: 4999, sla: '1-2 days', badge: 'Premium' },
      { id: 'ppf_full', title: 'PPF Full Coverage', desc: 'Complete paint protection film for full body', price: 12999, sla: '3 days', badge: 'Ultimate' },
      { id: 'ceramic_coat', title: 'Ceramic Coating 9H', desc: '9H ceramic coating with 12-month hydrophobic protection', price: 7999, sla: '2 days', badge: 'Popular' },
      { id: 'windshield_replace', title: 'Windshield Replacement', desc: 'OEM laminated glass replacement', price: 2199, sla: '1 day' },
      { id: 'headlight_restore', title: 'Headlight Restoration', desc: 'Oxidation removal + UV sealant + polish', price: 1199, sla: 'Same-day' },
      { id: 'dent_removal', title: 'Dent Removal', desc: 'Paintless dent removal service', price: 1499, sla: 'Same-day' },
      { id: 'scratch_removal', title: 'Scratch Removal', desc: 'Deep scratch repair and touch-up', price: 999, sla: 'Same-day', badge: 'Value' },
      { id: 'glass_coating', title: 'Glass Protective Coating', desc: 'Water-repellent coating for windows and windshield', price: 1599, sla: 'Same-day' },
      { id: 'undercoat', title: 'Undercoating & Rustproof', desc: 'Rust protection and undercoat application', price: 2499, sla: '1 day' },
      { id: 'seat_leather', title: 'Seat Leather Treatment', desc: 'Leather conditioning and protection', price: 3999, sla: '1 day' },
    ],
  },
]

// Fixed ratings for each service (consistent across all views)
const SERVICE_RATINGS = {
  'breakdown_fix': { rating: 4.8, reviews: 156 },
  'flat_tyre': { rating: 4.9, reviews: 203 },
  'jump_start': { rating: 4.7, reviews: 187 },
  'fuel_topup': { rating: 4.6, reviews: 89 },
  'locked_keys': { rating: 4.8, reviews: 112 },
  'winch_recovery': { rating: 4.7, reviews: 67 },
  'basic_service': { rating: 4.8, reviews: 245 },
  'comprehensive_service': { rating: 4.9, reviews: 198 },
  'pickup_drop': { rating: 4.7, reviews: 156 },
  'detailing': { rating: 4.8, reviews: 223 },
  'ac_service': { rating: 4.9, reviews: 189 },
  'interior_detail': { rating: 4.7, reviews: 134 },
  'engine_tune': { rating: 4.8, reviews: 167 },
  'brake_service': { rating: 4.9, reviews: 234 },
  'battery_replace': { rating: 4.8, reviews: 201 },
  'clutch_work': { rating: 4.7, reviews: 98 },
  'ecu_scan': { rating: 4.8, reviews: 145 },
  'coolant_service': { rating: 4.7, reviews: 112 },
  'suspension': { rating: 4.8, reviews: 156 },
  'tyre_align': { rating: 4.9, reviews: 178 },
  'ceramic_coat': { rating: 4.9, reviews: 89 },
  'paint_restore': { rating: 4.8, reviews: 76 },
  'headlight_tint': { rating: 4.7, reviews: 134 },
  'ppf': { rating: 4.9, reviews: 67 },
  'window_tint': { rating: 4.8, reviews: 198 },
  'undercoat': { rating: 4.7, reviews: 102 },
  'seat_leather': { rating: 4.8, reviews: 84 }
}

function formatINR(value){
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function Service(){
  const navigate = useNavigate()
  const { role } = useAuth()
  const effectiveRole = role || localStorage.getItem('rw_role_locked')
  
  // Redirect mechanics to their dashboard
  useEffect(() => {
    if (effectiveRole === 'mechanic') {
      navigate('/mechanic/dashboard', { replace: true })
    }
  }, [effectiveRole, navigate])
  
  const [cart, setCart] = useState(() => {
    const stored = loadCart()
    return Array.isArray(stored.items) ? stored.items : []
  })
  const [selectedCat, setSelectedCat] = useState(catalog[0].id)
  const [notes, setNotes] = useState('')
  const [query, setQuery] = useState('')
  const [reviewService, setReviewService] = useState(null)

  useEffect(() => {
    saveCart({ items: cart, currency: 'INR' })
  }, [cart])

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

  useEffect(() => {
    const list = filteredCatalog.length ? filteredCatalog : catalog
    if (!list.find(cat => cat.id === selectedCat)) {
      setSelectedCat(list[0]?.id || catalog[0].id)
    }
  }, [filteredCatalog, selectedCat])

  const activeCatalog = filteredCatalog.length ? filteredCatalog : catalog
  const activeCategory = activeCatalog.find(cat => cat.id === selectedCat) || activeCatalog[0]

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
    <div style={{minHeight:'100vh',background:'var(--bg)'}}>
      <div style={{maxWidth:1400,margin:'0 auto',padding:'40px 24px'}}>
        
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h1 style={{margin:0,fontSize:40,fontWeight:900,color:'var(--text)',letterSpacing:'-0.5px'}}>Services</h1>
          <p style={{margin:'8px 0 0',fontSize:16,color:'var(--text-secondary)',fontWeight:500}}>Professional automotive care at your doorstep</p>
        </div>

        {/* Search & Category Boxes */}
        <div style={{
          padding:'20px',
          borderRadius:16,
          border:'1px solid var(--border)',
          background:'var(--surface)',
          marginBottom:32
        }}>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:16,marginBottom:16}}>
            <div>
              <label style={{display:'block',fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:8}}>Search services</label>
              <input
                className="form-input"
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="e.g. brake, battery, tow..."
                style={{fontSize:14,padding:'12px 16px',borderRadius:12,border:'1px solid var(--border)',background:'var(--bg)',color:'var(--text)',width:'100%'}}
              />
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',gap:12}}>
            {activeCatalog.map(cat => {
              const active = selectedCat === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  style={{
                    textAlign:'left',
                    padding:'14px 14px 12px',
                    borderRadius:12,
                    border:`1px solid ${active ? cat.color : 'var(--border)'}`,
                    background: active ? `linear-gradient(135deg, ${cat.color}22, transparent)` : 'var(--bg)',
                    color:'var(--text)',
                    cursor:'pointer',
                    transition:'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { if(!active){ e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                  onMouseLeave={(e) => { if(!active){ e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' } }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <span style={{width:10,height:10,borderRadius:999,background:cat.color}} />
                    <div style={{fontSize:14,fontWeight:800}}>{cat.title}</div>
                  </div>
                  <div style={{fontSize:12,color:'var(--text-secondary)',lineHeight:1.4}}>{cat.subtitle}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:32}}>
          {/* Services Boxes */}
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))',gap:20}}>
              {activeCategory?.items.map(item => (
                <div key={item.id} style={{
                  position:'relative',
                  border:'1px solid var(--border)',
                  borderRadius:16,
                  background:'var(--surface)',
                  transition:'all 0.25s ease',
                  overflow:'hidden',
                  display:'flex',
                  flexDirection:'column'
                }} onMouseEnter={(e) => {e.currentTarget.style.borderColor=activeCategory?.color; e.currentTarget.style.boxShadow='0 18px 44px rgba(0,0,0,0.12)'; e.currentTarget.style.transform='translateY(-4px)'}} onMouseLeave={(e) => {e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform='translateY(0)'}}>

                  <div style={{
                    padding:'14px 18px',
                    background:`linear-gradient(135deg, ${activeCategory?.color}1a, transparent)`
                  }}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                      <div style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>{activeCategory?.title}</div>
                      {item.badge && (
                        <div style={{
                          padding:'4px 10px',
                          borderRadius:999,
                          fontSize:11,
                          fontWeight:700,
                          background:activeCategory?.color,
                          color:'#fff'
                        }}>
                          {item.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{padding:'18px',display:'flex',flexDirection:'column',gap:10,flex:1}}>
                    <div>
                      <h3 style={{margin:0,fontSize:18,fontWeight:800,color:'var(--text)',marginBottom:6}}>{item.title}</h3>
                      <p style={{margin:0,fontSize:14,color:'var(--text-secondary)',lineHeight:1.6}}>{item.desc}</p>
                    </div>

                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'var(--text-secondary)',fontWeight:700}}>
                        <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:activeCategory?.color}}/>
                        {item.sla}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setReviewService({ ...item, category: activeCategory?.id })
                        }}
                        style={{
                          background:'none',
                          border:'none',
                          cursor:'pointer',
                          fontSize:11,
                          color:'#fbbf24',
                          fontWeight:700,
                          display:'flex',
                          alignItems:'center',
                          gap:4,
                          padding:'4px 8px',
                          borderRadius:6,
                          transition:'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(251,191,36,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                      >
                        <span>⭐</span>
                        <span>{SERVICE_RATINGS[item.id]?.rating || '4.7'}</span>
                        <span style={{color:'var(--text-secondary)'}}>({SERVICE_RATINGS[item.id]?.reviews || '50'})</span>
                      </button>
                    </div>

                    <div style={{marginTop:'auto',paddingTop:12,borderTop:'1px solid var(--border)'}}>
                      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:12}}>
                        <div style={{fontSize:22,fontWeight:900,color:'var(--text)'}}>{formatINR(item.price)}</div>
                        {item.price > 0 && <div style={{fontSize:12,color:'var(--text-secondary)'}}>per service</div>}
                      </div>

                      {/* Reviews Button */}
                      <button
                        onClick={() => setReviewService({ ...item, category: activeCategory?.id })}
                        style={{
                          width:'100%',
                          padding:'8px 12px',
                          marginBottom:10,
                          borderRadius:8,
                          border:'1px solid var(--border)',
                          background:'transparent',
                          color:'var(--text)',
                          cursor:'pointer',
                          fontSize:13,
                          fontWeight:600,
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'center',
                          gap:6,
                          transition:'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(251,191,36,0.1)'
                          e.currentTarget.style.borderColor = '#fbbf24'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        <span>⭐</span>
                        <span>View Reviews</span>
                      </button>

                      <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:8}}>
                        <Button 
                          variant="primary"
                          onClick={() => addToCart(item)}
                          style={{padding:'10px 12px',fontSize:14,fontWeight:700,borderRadius:10}}
                        >
                          Add to cart
                        </Button>
                        <button
                          onClick={() => {
                            const wasFav = isFavorite(item.id)
                            toggleFavorite({ ...item, category: activeCategory?.id })
                            showSuccess(wasFav ? 'Removed' : 'Saved')
                            window.dispatchEvent(new Event('favoritesUpdated'))
                          }}
                          style={{
                            padding:'10px 12px',
                            borderRadius:10,
                            border:'1px solid var(--border)',
                            background:'var(--bg)',
                            color:isFavorite(item.id)?'#ef4444':'var(--muted)',
                            cursor:'pointer',
                            fontSize:16,
                            transition:'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}
                        >
                          {isFavorite(item.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <aside style={{
            position:'sticky',
            top:40,
            height:'fit-content',
            background:'var(--surface)',
            border:'1px solid var(--border)',
            borderRadius:16,
            padding:24,
            boxShadow:'0 8px 24px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{margin:0,fontSize:18,fontWeight:800,color:'var(--text)',marginBottom:16}}>Cart</h3>

            {cart.length === 0 ? (
              <div style={{textAlign:'center',padding:'32px 12px',color:'var(--text-secondary)'}}>
                <div style={{fontSize:44,marginBottom:12}}>🛒</div>
                <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Empty</div>
                <div style={{fontSize:13}}>Select services to get started</div>
              </div>
            ) : (
              <>
                <p style={{margin:'0 0 12px',fontSize:12,color:'var(--text-secondary)',fontWeight:600}}>{cart.length} service{cart.length !== 1 ? 's' : ''}</p>
                
                <div style={{display:'grid',gap:10,marginBottom:16,maxHeight:'280px',overflowY:'auto'}}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'space-between',
                      gap:8,
                      padding:10,
                      borderRadius:10,
                      border:'1px solid var(--border)',
                      background:'var(--bg)',
                      fontSize:13
                    }}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,color:'var(--text)',marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:13}}>{item.title}</div>
                        <div style={{display:'flex',alignItems:'center',gap:4}}>
                          <button onClick={() => updateQty(item.id,-1)} style={{width:22,height:22,borderRadius:5,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)',fontWeight:700,cursor:'pointer',fontSize:11,padding:0}}>-</button>
                          <span style={{fontWeight:700,minWidth:16,textAlign:'center',fontSize:12}}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id,1)} style={{width:22,height:22,borderRadius:5,border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)',fontWeight:700,cursor:'pointer',fontSize:11,padding:0}}>+</button>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontWeight:800,color:'var(--accent)',fontSize:13,marginBottom:4}}>{formatINR(item.price * item.qty)}</div>
                        <button onClick={() => removeItem(item.id)} style={{width:20,height:20,borderRadius:5,border:'1px solid #ef4444',background:'rgba(239,68,68,0.1)',color:'#ef4444',fontWeight:700,cursor:'pointer',fontSize:11,padding:0,transition:'all 0.2s'}} onMouseEnter={(e) => {e.currentTarget.style.background='#ef4444'; e.currentTarget.style.color='#fff'}} onMouseLeave={(e) => {e.currentTarget.style.background='rgba(239,68,68,0.1)'; e.currentTarget.style.color='#ef4444'}}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{borderRadius:12,padding:14,background:'var(--bg)',display:'grid',gap:8,marginBottom:16,fontSize:13}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'var(--text-secondary)'}}>Subtotal</span>
                    <strong style={{color:'var(--text)'}}>{formatINR(subtotal)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'var(--text-secondary)'}}>Fee</span>
                    <strong style={{color:'var(--text)'}}>{formatINR(serviceFee)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'var(--text-secondary)'}}>Tax (5%)</span>
                    <strong style={{color:'var(--text)'}}>{formatINR(tax)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',paddingTop:10,borderTop:'1px solid var(--border)',fontWeight:800,fontSize:15,color:'var(--text)'}}>
                    <span>Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>

                <div style={{marginBottom:12}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'var(--text)',marginBottom:6}}>Notes for mechanic</label>
                  <textarea 
                    value={notes} 
                    onChange={e=>setNotes(e.target.value)}
                    placeholder="Special requests or location info" 
                    style={{width:'100%',minHeight:56,padding:10,borderRadius:10,border:'1px solid var(--border)',background:'var(--bg)',color:'var(--text)',fontSize:12,resize:'vertical',fontFamily:'inherit'}}
                  />
                </div>

                <Button variant="primary" style={{width:'100%',padding:'12px 16px',fontSize:14,fontWeight:700,marginBottom:8,borderRadius:10}} onClick={proceedCheckout}>
                  Proceed to checkout
                </Button>
                <Button variant="ghost" style={{width:'100%',padding:'10px 16px',fontSize:13,fontWeight:600}} onClick={clearCart}>
                  Clear cart
                </Button>
              </>
            )}
          </aside>
        </div>
      </div>

      {/* Review Modal */}
      {reviewService && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={() => setReviewService(null)}>
          <div style={{background:'var(--surface)',borderRadius:16,padding:28,maxWidth:520,maxHeight:'80vh',overflowY:'auto',boxShadow:'0 24px 64px rgba(0,0,0,0.2)'}} onClick={(e) => e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{margin:0,fontSize:22,fontWeight:800,color:'var(--text)'}}>Reviews</h2>
              <button onClick={() => setReviewService(null)} style={{background:'none',border:'none',fontSize:24,cursor:'pointer',color:'var(--text)',padding:0}}>✕</button>
            </div>
            <Reviews serviceId={reviewService.id} serviceName={reviewService.title} />
          </div>
        </div>
      )}

      <style>{`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        :root {
          --surface: linear-gradient(135deg, #0F1728 0%, #162844 100%) !important;
          --text: #E6EDF7 !important;
        }

        body {
          background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
        }

        /* Service Category Cards */
        .svc-card {
          background: linear-gradient(135deg, #0F1728 0%, #162844 100%) !important;
          border: 1px solid #2A4368 !important;
          box-shadow: 0 4px 20px rgba(74, 158, 255, 0.1) !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
        }

        .svc-card::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 3px !important;
          background: linear-gradient(90deg, transparent, #4A9EFF, transparent) !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
        }

        .svc-card:hover::before {
          opacity: 1 !important;
        }

        .svc-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 32px rgba(74, 158, 255, 0.12) !important;
          border-color: #4A9EFF !important;
        }

        /* Service Items */
        .svc-item {
          background: rgba(15, 23, 40, 0.5) !important;
          border: 1px solid #2A4368 !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
        }

        .svc-item:hover {
          border-color: #4A9EFF !important;
          box-shadow: 0 4px 16px rgba(74, 158, 255, 0.1) !important;
          transform: translateX(4px) !important;
        }

        /* Titles */
        .svc-title {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }

        /* Prices */
        .svc-price {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 800 !important;
        }

        /* Badges */
        .svc-badge {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          color: white !important;
          padding: 4px 12px !important;
          border-radius: 12px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
        }

        /* Buttons */
        button[style*="background: '#60a5fa'"],
        button[style*="background:#60a5fa"] {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          box-shadow: 0 4px 16px rgba(74, 158, 255, 0.18) !important;
        }

        /* Favorite Heart Icon */
        .fav-icon {
          transition: all 0.3s ease !important;
          filter: drop-shadow(0 2px 8px rgba(74, 158, 255, 0.18)) !important;
        }

        .fav-icon:hover {
          transform: scale(1.2) !important;
        }

        /* Modal */
        [style*="background:'var(--surface)'"] {
          background: linear-gradient(135deg, #0F1728 0%, #162844 100%) !important;
          border: 1px solid #2A4368 !important;
        }
      `}</style>
    </div>
  )
}
