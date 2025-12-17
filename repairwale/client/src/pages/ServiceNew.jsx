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

// Import catalog from original Service.jsx
// Placeholder - copy full catalog array here
const catalog = [
  { id: 'emergency', title: 'Emergency Roadside', subtitle: '30–45 min dispatch', image: heroImages.emergency, items: [] },
  { id: 'maintenance', title: 'Scheduled Maintenance', subtitle: 'At-home service with OEM parts', image: heroImages.maintenance, items: [] },
]

function formatINR(value){
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export default function ServiceNew(){
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
        <p className="page-subtitle">Transparent pricing • {cart.length} items in cart</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">32 min</div>
          <div className="stat-label">Average ETA</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">14</div>
          <div className="stat-label">Cities Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Support</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">4.8/5</div>
          <div className="stat-label">Satisfaction</div>
        </div>
      </div>

      <div className="card mb-16">
        <div className="flex-between">
          <div className="form-group" style={{flex:1,marginBottom:0}}>
            <label className="form-label">Search Services</label>
            <input
              className="form-input"
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Search by name or symptom (e.g. brake, battery, tow)"
            />
          </div>
          <div className="form-group" style={{width:150,marginBottom:0,marginLeft:16}}>
            <label className="form-label">Vehicle Type</label>
            <select className="form-select" value={vehicleType} onChange={e=>setVehicleType(e.target.value)}>
              <option>Bike</option>
              <option>Car</option>
              <option>SUV</option>
              <option>EV</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div>
          <div className="card">
            <h3 className="card-title">Service Categories</h3>
            <div className="grid grid-2" style={{marginTop:16}}>
              {(filteredCatalog.length? filteredCatalog : catalog).map(cat => (
                <div 
                  key={cat.id} 
                  className="item" 
                  onClick={()=>setSelectedCat(cat.id)}
                  style={{
                    cursor:'pointer',
                    borderColor: selectedCat===cat.id ? 'var(--accent-light)' : 'var(--border)',
                    background: selectedCat===cat.id ? 'rgba(30,58,138,0.15)' : 'rgba(30,58,138,0.05)'
                  }}
                >
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{fontSize:32}}>🔧</div>
                    <div>
                      <div className="item-title">{cat.title}</div>
                      <div className="item-desc">{cat.subtitle}</div>
                      <div className="item-chip" style={{marginTop:6}}>{cat.items.length} services</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-16">
            {(filteredCatalog.length? filteredCatalog : catalog).filter(c=>c.id===selectedCat).map(cat => (
              <div key={cat.id}>
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{cat.title}</h3>
                    <p className="card-subtitle">{cat.subtitle}</p>
                  </div>
                  <div className="item-chip">{cat.items.length} options</div>
                </div>
                <div className="item-list">
                  {cat.items.map(item => (
                    <div key={item.id} className="item">
                      <div className="item-row">
                        <img className="item-thumb" src={item.image || heroImages[cat.id]} alt={item.title} loading="lazy" />
                        <div className="item-content">
                          <h4 className="item-title">{item.title}</h4>
                          <p className="item-desc">{item.desc}</p>
                          <div className="item-meta">
                            <span className="item-chip">⏱️ {item.sla}</span>
                            {item.badge && <span className="item-chip">{item.badge}</span>}
                            <span className="item-chip">{vehicleType} ready</span>
                          </div>
                        </div>
                        <div className="item-actions">
                          <div className="item-price">{formatINR(item.price)}</div>
                          <Button size="sm" variant="primary" onClick={() => addToCart(item)}>Add to Cart</Button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                              const wasFav = isFavorite(item.id)
                              toggleFavorite({ ...item, category: cat.id })
                              showSuccess(wasFav ? 'Removed from favorites' : 'Added to favorites')
                              window.dispatchEvent(new Event('favoritesUpdated'))
                            }}
                            style={{color:isFavorite(item.id)?'#ef4444':'var(--muted)'}}
                          >
                            {isFavorite(item.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{position:'sticky',top:24}}>
            <div className="card-header">
              <div>
                <h3 className="card-title">Your Cart</h3>
                <p className="card-subtitle">{cart.length ? `${cart.length} item(s)` : 'No items yet'}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={clearCart} disabled={!cart.length}>Clear</Button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <p className="empty-text">Cart is empty. Add services to continue.</p>
              </div>
            ) : (
              <>
                <div className="item-list">
                  {cart.map(item => (
                    <div key={item.id} className="item">
                      <div className="flex-between">
                        <div style={{flex:1,minWidth:0}}>
                          <h4 className="item-title">{item.title}</h4>
                          <div className="item-price" style={{marginTop:4}}>{formatINR(item.price * item.qty)}</div>
                        </div>
                        <div className="flex gap-8" style={{alignItems:'center'}}>
                          <button className="btn btn-sm btn-ghost" onClick={() => updateQty(item.id,-1)}>–</button>
                          <span style={{fontWeight:700,minWidth:20,textAlign:'center'}}>{item.qty}</span>
                          <button className="btn btn-sm btn-ghost" onClick={() => updateQty(item.id,1)}>+</button>
                          <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{marginTop:20,padding:16,background:'rgba(30,58,138,0.05)',borderRadius:12}}>
                  <div className="flex-between" style={{marginBottom:8}}>
                    <span className="muted">Subtotal</span>
                    <span style={{fontWeight:700}}>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex-between" style={{marginBottom:8}}>
                    <span className="muted">Service fee</span>
                    <span style={{fontWeight:700}}>{formatINR(serviceFee)}</span>
                  </div>
                  <div className="flex-between" style={{marginBottom:12}}>
                    <span className="muted">Tax (5%)</span>
                    <span style={{fontWeight:700}}>{formatINR(tax)}</span>
                  </div>
                  <div className="flex-between" style={{paddingTop:12,borderTop:'1px solid var(--border)'}}>
                    <span style={{fontWeight:800,fontSize:18}}>Total</span>
                    <span style={{fontWeight:800,fontSize:18}}>{formatINR(total)}</span>
                  </div>
                </div>

                <div className="form-group mt-16">
                  <label className="form-label">Notes for Mechanic</label>
                  <textarea 
                    className="form-input" 
                    placeholder="Describe symptoms, location landmarks, or time preference" 
                    value={notes} 
                    onChange={e=>setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button variant="primary" size="lg" className="btn-full" onClick={proceedCheckout}>
                  Proceed to Checkout →
                </Button>
                <div className="muted text-center" style={{fontSize:11,marginTop:12}}>
                  Cart held for 60 minutes • Secure payments
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card mt-16">
        <Reviews serviceId="repairwale-services" serviceName="RepairWale Services" />
      </div>
    </div>
  )
}
