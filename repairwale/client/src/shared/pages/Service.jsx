import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Reviews from '../components/Reviews'
import { getCart as loadCart, saveCart } from '../services/cart'
import { isFavorite, toggleFavorite } from '../services/favorites'
import { showSuccess } from '../services/toast'
import { useAuth } from '../context/AuthContext'

// Service catalogue with numeric pricing
const catalog = [
  {
    id: 'emergency',
    title: 'Emergency Roadside',
    subtitle: 'Quick dispatch within 30-45 mins',
    color: '#FFFFFF',
    items: [
      { id: 'breakdown_fix', title: 'Breakdown Quick Fix', desc: 'Minor repairs on-spot (belts, fuses, hoses)', price: 549, sla: '30-60 mins', badge: 'Most booked' },
      { id: 'flat_tyre', title: 'Flat Tyre Assist', desc: 'Tyre change or puncture patching', price: 399, sla: '30 mins' },
      { id: 'jump_start', title: 'Battery Jump-Start', desc: 'Portable booster start with diagnostics', price: 299, sla: '20-30 mins' },
      { id: 'fuel_topup', title: 'Emergency Fuel Delivery', desc: '25 litres delivered (fuel cost extra)', price: 249, sla: '40 mins' },
      { id: 'locked_keys', title: 'Locked Keys Support', desc: 'Non-destructive unlock for most models', price: 749, sla: '45-60 mins' },
      { id: 'winch_recovery', title: 'Winch & Pull-out', desc: 'Mud/sand recovery with trained crew', price: 1299, sla: '60-90 mins' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Scheduled Maintenance',
    subtitle: 'At-home service with OEM parts',
    color: '#0B1F3B',
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
    color: '#FFFFFF',
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
    color: '#0B1F3B',
    items: [
      { id: 'city_tow', title: 'City Tow (10 km)', desc: 'For breakdowns or accidents within city limits', price: 1199, sla: '45-90 mins', badge: 'Quick' },
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
  return `₹ ${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

function getAccentColor(color){
  if (!color) return '#0B1F3B'
  return color.toUpperCase() === '#FFFFFF' ? '#0B1F3B' : color
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
  const [recentlyAddedId, setRecentlyAddedId] = useState(null)

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
        return prev.map(i => i.id === svc.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { id: svc.id, title: svc.title, price: svc.price, qty: 1, badge: svc.badge }]
    })

    setRecentlyAddedId(svc.id)
    setTimeout(() => {
      setRecentlyAddedId(prev => (prev === svc.id ? null : prev))
    }, 1200)
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.id !== id))
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
              const accentColor = getAccentColor(cat.color)
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  style={{
                    textAlign:'left',
                    padding:'14px 14px 12px',
                    borderRadius:12,
                    border:`1px solid ${active ? accentColor : 'var(--border)'}`,
                    background: active ? `linear-gradient(135deg, ${accentColor}22, transparent)` : 'var(--bg)',
                    color:'var(--text)',
                    cursor:'pointer',
                    transition:'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { if(!active){ e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                  onMouseLeave={(e) => { if(!active){ e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' } }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <span style={{width:10,height:10,borderRadius:999,background:accentColor}} />
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
              {activeCategory?.items.map(item => {
                const accentColor = getAccentColor(activeCategory?.color)
                const qtyInCart = cart.find(i => i.id === item.id)?.qty || 0
                return (
                <div key={item.id} style={{
                  position:'relative',
                  border:'1px solid var(--border)',
                  borderRadius:16,
                  background:'var(--surface)',
                  transition:'all 0.25s ease',
                  overflow:'hidden',
                  display:'flex',
                  flexDirection:'column'
                }} onMouseEnter={(e) => {e.currentTarget.style.borderColor=accentColor; e.currentTarget.style.boxShadow='0 18px 44px rgba(0,0,0,0.12)'; e.currentTarget.style.transform='translateY(-4px)'}} onMouseLeave={(e) => {e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform='translateY(0)'}}>

                  <div style={{
                    padding:'14px 18px',
                    background:`linear-gradient(135deg, ${accentColor}1a, transparent)`
                  }}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
                      <div style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>{activeCategory?.title}</div>
                      {item.badge && (
                        <div style={{
                          padding:'4px 10px',
                          borderRadius:999,
                          fontSize:11,
                          fontWeight:700,
                          background:accentColor,
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
                        <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:accentColor}}/>
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
                          color:'var(--text)',
                          fontWeight:700,
                          display:'flex',
                          alignItems:'center',
                          gap:4,
                          padding:'4px 8px',
                          borderRadius:6,
                          transition:'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(11,31,59,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                      >
                        <span style={{fontSize:10,color:'var(--text-secondary)'}}>Rating</span>
                        <span>{SERVICE_RATINGS[item.id]?.rating || '4.7'}</span>
                        <span style={{color:'var(--text-secondary)'}}>({SERVICE_RATINGS[item.id]?.reviews || '50'})</span>
                      </button>
                    </div>

                    <div style={{
                      marginTop:'auto',
                      paddingTop:12,
                      borderTop:'1px solid rgba(11,31,59,0.16)',
                      marginInline:'-18px',
                      marginBottom:'-18px',
                      paddingInline:'18px',
                      paddingBottom:'18px',
                      background:'linear-gradient(160deg, rgba(11,31,59,0.08) 0%, rgba(11,31,59,0.03) 100%)'
                    }}>
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
                          border:'1px solid rgba(11,31,59,0.32)',
                          background:'rgba(11,31,59,0.06)',
                          color:'#0B1F3B',
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
                          e.currentTarget.style.background = 'rgba(11,31,59,0.12)'
                          e.currentTarget.style.borderColor = '#0B1F3B'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(11,31,59,0.06)'
                          e.currentTarget.style.borderColor = 'rgba(11,31,59,0.32)'
                        }}
                      >
                        <span>View Reviews</span>
                      </button>

                      <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:8}}>
                        {qtyInCart > 0 ? (
                          <div style={{
                            display:'grid',
                            gridTemplateColumns:'42px 1fr 42px',
                            alignItems:'center',
                            borderRadius:10,
                            border:'1px solid rgba(11,31,59,0.35)',
                            background:'rgba(11,31,59,0.08)',
                            overflow:'hidden'
                          }}>
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              style={{height:40,border:'none',background:'rgba(11,31,59,0.14)',color:'#0B1F3B',fontWeight:900,fontSize:20,cursor:'pointer'}}
                            >
                              -
                            </button>
                            <div style={{textAlign:'center',fontSize:14,fontWeight:800,color:'#0B1F3B'}}>{qtyInCart}</div>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              style={{height:40,border:'none',background:'#0B1F3B',color:'#FFFFFF',fontWeight:900,fontSize:18,cursor:'pointer'}}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => addToCart(item)}
                            style={{
                              padding:'10px 12px',
                              fontSize:14,
                              fontWeight:800,
                              borderRadius:10,
                              background:'linear-gradient(160deg, #0B1F3B 0%, #18406F 100%)',
                              color:'#FFFFFF',
                              border:'1px solid #0B1F3B',
                              boxShadow:'0 10px 24px rgba(11,31,59,0.3)'
                            }}
                          >
                            {recentlyAddedId === item.id ? 'Added' : 'Add to Cart'}
                          </Button>
                        )}
                        <button
                          onClick={() => {
                            const wasFavorite = isFavorite(item.id)
                            toggleFavorite({ ...item, category: activeCategory?.id })
                            window.dispatchEvent(new Event('favoritesUpdated'))
                            showSuccess(wasFavorite ? 'Removed from favourites' : 'Saved to favourites')
                          }}
                          style={{
                            padding:'10px 12px',
                            borderRadius:10,
                            border:'1px solid rgba(11,31,59,0.34)',
                            background:isFavorite(item.id)?'#0B1F3B':'rgba(11,31,59,0.08)',
                            color:isFavorite(item.id)?'#FFFFFF':'#0B1F3B',
                            cursor:'pointer',
                            fontSize:12,
                            fontWeight:700,
                            minWidth:72,
                            transition:'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = isFavorite(item.id)?'#0B1F3B':'rgba(11,31,59,0.15)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = isFavorite(item.id)?'#0B1F3B':'rgba(11,31,59,0.08)'}
                        >
                          {isFavorite(item.id) ? 'Saved' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Cart Sidebar */}
          <aside style={{
            position:'sticky',
            top:40,
            height:'fit-content',
            background:'linear-gradient(165deg, #081a32 0%, #0B1F3B 55%, #12325B 100%)',
            border:'1px solid rgba(255,255,255,0.18)',
            borderRadius:16,
            padding:24,
            boxShadow:'0 20px 48px rgba(0,0,0,0.34)'
          }}>
            <h3 style={{margin:0,fontSize:18,fontWeight:800,color:'#FFFFFF',marginBottom:16}}>Cart</h3>

            {cart.length === 0 ? (
              <div style={{textAlign:'center',padding:'32px 12px',color:'rgba(255,255,255,0.78)'}}>
                <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Cart is empty</div>
                <div style={{fontSize:13}}>Select services to get started</div>
              </div>
            ) : (
              <>
                <p style={{margin:'0 0 12px',fontSize:12,color:'rgba(255,255,255,0.8)',fontWeight:600}}>{cart.length} service{cart.length !== 1 ? 's' : ''}</p>
                
                <div style={{display:'grid',gap:10,marginBottom:16,maxHeight:'280px',overflowY:'auto'}}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'space-between',
                      gap:8,
                      padding:10,
                      borderRadius:10,
                      border:'1px solid rgba(255,255,255,0.2)',
                      background:'rgba(255,255,255,0.08)',
                      fontSize:13
                    }}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,color:'#FFFFFF',marginBottom:4,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:13}}>{item.title}</div>
                        <div style={{display:'grid',gridTemplateColumns:'34px 1fr 34px',alignItems:'center',gap:6,maxWidth:120}}>
                          <button onClick={() => updateQty(item.id,-1)} style={{height:34,borderRadius:8,border:'1px solid rgba(255,255,255,0.28)',background:'rgba(7,19,36,0.65)',color:'#FFFFFF',fontWeight:900,cursor:'pointer',fontSize:18,padding:0,lineHeight:1}}> - </button>
                          <span style={{fontWeight:800,minWidth:20,textAlign:'center',fontSize:13,color:'#FFFFFF'}}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id,1)} style={{height:34,borderRadius:8,border:'1px solid rgba(255,255,255,0.28)',background:'#0B1F3B',color:'#FFFFFF',fontWeight:900,cursor:'pointer',fontSize:16,padding:0,lineHeight:1}}> + </button>
                        </div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontWeight:800,color:'#FFFFFF',fontSize:13,marginBottom:4}}>{formatINR(item.price * item.qty)}</div>
                        <button onClick={() => removeItem(item.id)} style={{minWidth:78,height:34,borderRadius:8,border:'1px solid rgba(255,255,255,0.4)',background:'#FFFFFF',color:'#0B1F3B',fontWeight:700,cursor:'pointer',fontSize:11,padding:'0 8px',transition:'all 0.2s'}} onMouseEnter={(e) => {e.currentTarget.style.background='rgba(255,255,255,0.9)'}} onMouseLeave={(e) => {e.currentTarget.style.background='#FFFFFF'}}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{borderRadius:12,padding:14,background:'rgba(6,16,30,0.58)',border:'1px solid rgba(255,255,255,0.16)',display:'grid',gap:8,marginBottom:16,fontSize:13}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'rgba(255,255,255,0.76)'}}>Subtotal</span>
                    <strong style={{color:'#FFFFFF'}}>{formatINR(subtotal)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'rgba(255,255,255,0.76)'}}>Fee</span>
                    <strong style={{color:'#FFFFFF'}}>{formatINR(serviceFee)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'rgba(255,255,255,0.76)'}}>Tax (5%)</span>
                    <strong style={{color:'#FFFFFF'}}>{formatINR(tax)}</strong>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',paddingTop:10,borderTop:'1px solid rgba(255,255,255,0.18)',fontWeight:800,fontSize:15,color:'#FFFFFF'}}>
                    <span>Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>

                <div style={{marginBottom:12}}>
                  <label style={{display:'block',fontSize:12,fontWeight:700,color:'#FFFFFF',marginBottom:6}}>Notes for mechanic</label>
                  <textarea 
                    value={notes} 
                    onChange={e=>setNotes(e.target.value)}
                    placeholder="Special requests or location info" 
                    style={{width:'100%',minHeight:56,padding:10,borderRadius:10,border:'1px solid rgba(255,255,255,0.24)',background:'rgba(7,18,34,0.64)',color:'#FFFFFF',fontSize:12,resize:'vertical',fontFamily:'inherit'}}
                  />
                </div>

                <Button variant="primary" style={{width:'100%',padding:'12px 16px',fontSize:14,fontWeight:700,marginBottom:8,borderRadius:10,background:'#FFFFFF',color:'#0B1F3B',border:'1px solid #FFFFFF'}} onClick={proceedCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="ghost" style={{width:'100%',padding:'10px 16px',fontSize:13,fontWeight:600,color:'#FFFFFF',border:'1px solid rgba(255,255,255,0.24)',background:'rgba(255,255,255,0.05)'}} onClick={clearCart}>
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
              <button onClick={() => setReviewService(null)} style={{background:'none',border:'none',fontSize:14,cursor:'pointer',color:'var(--text)',padding:'4px 8px',borderRadius:8}}>Close</button>
            </div>
            <Reviews serviceId={reviewService.id} serviceName={reviewService.title} />
          </div>
        </div>
      )}

    </div>
  )
}


