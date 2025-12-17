import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import SignIn from './SignIn'
import { getTheme, setTheme, applyTheme } from '../services/theme'
import { ensureDefaults, getCustomer, saveCustomer, getMechanic, saveMechanic, getGarage, saveGarage } from '../services/roleData'
import { showSuccess, showError } from '../services/toast'

export default function UserPage(){
  const [user,setUser]=useState(null)
  const [role,setRole]=useState('customer')
  const [theme,setThemeState]=useState('dark')
  const navigate = useNavigate()

  useEffect(()=>{
    try{
      const stored=localStorage.getItem('repairwale_user')
      if(stored) setUser(JSON.parse(stored))
      const r = sessionStorage.getItem('userRole')
      if(r) setRole(r)
      const t = getTheme()
      setThemeState(t)
      applyTheme(t)
      ensureDefaults(r || 'customer')
    }catch{}
  },[])

  const handleTheme = (next) => {
    setThemeState(next)
    setTheme(next)
  }

  const handleSignOut = () => {
    try{
      sessionStorage.removeItem('userRole')
      sessionStorage.removeItem('userAuth')
      localStorage.removeItem('repairwale_user')
      // Clear role-specific session and avoid lingering credentials unless user chooses
      localStorage.removeItem('rw_cart')
      localStorage.removeItem('rw_billing')
    }catch{}
    navigate('/')
  }

  const initials=(user?.fullName||'User').split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()
  const joinedDate=user?.joinedDate? new Date(user.joinedDate):null
  const membershipDays= joinedDate? Math.max(0, Math.floor((Date.now()-joinedDate.getTime())/(1000*60*60*24))):0

  // Load role data on role change
  const [cust,setCust]=useState(null)
  const [mech,setMech]=useState(null)
  const [gar,setGar]=useState(null)

  useEffect(()=>{
    if(role==='customer'){ setCust(getCustomer()) }
    if(role==='mechanic'){ setMech(getMechanic()) }
    if(role==='garage'){ setGar(getGarage()) }
  },[role])

  // Quick helpers — prototype interactions via prompt/confirm
  const addVehicle = () => {
    const brand = prompt('Vehicle brand?')
    if(!brand) return
    const model = prompt('Model?') || ''
    const plate = prompt('Plate number?') || ''
    const v = { id: `VH-${Date.now()}`, brand, model, plate, primary: false }
    const next = { ...cust, vehicles: [...cust.vehicles, v] }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Added ${brand} ${model} to your vehicles`)
  }
  const editVehicle = (id) => {
    const v = cust.vehicles.find(x=>x.id===id); if(!v) return
    const brand = prompt('Vehicle brand?', v.brand) || v.brand
    const model = prompt('Model?', v.model) || v.model
    const plate = prompt('Plate?', v.plate) || v.plate
    const next = { ...cust, vehicles: cust.vehicles.map(x=>x.id===id? { ...x, brand, model, plate }: x) }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Updated vehicle details`)
  }
  const removeVehicle = (id) => {
    if(!confirm('Remove vehicle?')) return
    const next = { ...cust, vehicles: cust.vehicles.filter(x=>x.id!==id) }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Vehicle removed`)
  }
  const makePrimary = (id) => {
    const next = { ...cust, vehicles: cust.vehicles.map(x=>({ ...x, primary: x.id===id })) }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Vehicle set as primary`)
  }

  const addAddress = () => {
    const label = prompt('Address label (Home/Office)?')
    if(!label) return
    const line = prompt('Line 1?') || ''
    const city = prompt('City?') || ''
    const pincode = prompt('Pincode?') || ''
    const a = { id: `ADDR-${Date.now()}`, label, line, city, pincode }
    const next = { ...cust, addresses: [...cust.addresses, a] }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Added ${label} address`)
  }
  const removeAddress = (id) => {
    if(!confirm('Remove address?')) return
    const next = { ...cust, addresses: cust.addresses.filter(x=>x.id!==id) }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Address removed`)
  }

  const addSkill = () => {
    const skill = prompt('Add skill?'); if(!skill) return
    const next = { ...mech, skills: [...new Set([...(mech?.skills||[]), skill])] }
    setMech(next); saveMechanic(next)
  }
  const removeSkill = (s) => {
    const next = { ...mech, skills: (mech?.skills||[]).filter(x=>x!==s) }
    setMech(next); saveMechanic(next)
  }
  const toggleDay = (day) => {
    const next = { ...mech, availability: { ...(mech?.availability||{}), [day]: !(mech?.availability?.[day]) } }
    setMech(next); saveMechanic(next)
  }
  const addCertification = () => {
    const name = prompt('Certification name?'); if(!name) return
    const year = parseInt(prompt('Year?')||`${new Date().getFullYear()}`,10)
    const next = { ...mech, certifications: [...(mech?.certifications||[]), { id:`CERT-${Date.now()}`, name, year }] }
    setMech(next); saveMechanic(next)
  }
  const addArea = () => {
    const area = prompt('Service area name?'); if(!area) return
    const km = parseInt(prompt('Radius (km)?')||'5',10)
    const next = { ...mech, serviceAreas: [...(mech?.serviceAreas||[]), { id:`AREA-${Date.now()}`, area, km }] }
    setMech(next); saveMechanic(next)
  }
  const removeArea = (id) => {
    const next = { ...mech, serviceAreas: (mech?.serviceAreas||[]).filter(x=>x.id!==id) }
    setMech(next); saveMechanic(next)
  }

  const addTeam = () => {
    const name = prompt('Member name?'); if(!name) return
    const roleName = prompt('Role?')||'Staff'
    const next = { ...gar, team: [...(gar?.team||[]), { id:`TM-${Date.now()}`, name, role: roleName }] }
    setGar(next); saveGarage(next)
  }
  const removeTeam = (id) => {
    const next = { ...gar, team: (gar?.team||[]).filter(x=>x.id!==id) }
    setGar(next); saveGarage(next)
  }
  const toggleBay = (id) => {
    const next = { ...gar, bays: (gar?.bays||[]).map(b=> b.id===id ? { ...b, status: b.status==='Active'?'Busy':'Active' } : b) }
    setGar(next); saveGarage(next)
  }
  const addInventory = () => {
    const name = prompt('Item name?'); if(!name) return
    const unit = prompt('Unit (L/sets/etc)?')||'pcs'
    const stock = parseInt(prompt('Initial stock?')||'0',10)
    const next = { ...gar, inventory: [...(gar?.inventory||[]), { id:`INV-${Date.now()}`, name, stock, unit }] }
    setGar(next); saveGarage(next)
  }
  const updateStock = (id, delta) => {
    const next = { ...gar, inventory: (gar?.inventory||[]).map(i=> i.id===id ? { ...i, stock: Math.max(0, (i.stock||0)+delta) } : i) }
    setGar(next); saveGarage(next)
  }
  const addGarageService = () => {
    const category = prompt('Category?')||'General'
    const name = prompt('Service name?'); if(!name) return
    const price = parseInt(prompt('Price (INR)?')||'0',10)
    const next = { ...gar, services: [...(gar?.services||[]), { id:`SRV-${Date.now()}`, category, name, price }] }
    setGar(next); saveGarage(next)
  }

  return (
    <div className="user-wrapper">
      <div className="user-container">
        <div className="user-header">
          <div className="user-avatar">{initials}</div>
          <div>
            <h2 className="user-title">Your Account</h2>
            <div className="user-sub">Manage profile, preferences & security</div>
          </div>
        </div>

        {user ? (
          <div className="user-grid">
            <div className="card user-profile-card">
              <div className="user-profile-row">
                <div className="user-bio">
                  <div className="user-avatar large">{initials}</div>
                  <div>
                    <div className="user-name">{user.fullName || 'User'}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-badges">
                      <span className="user-badge">{role.charAt(0).toUpperCase()+role.slice(1)}</span>
                      <span className="user-badge">Verified Email</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>Sign out</Button>
              </div>

              <div className="user-stat-bar">
                <div className="user-stat">
                  <div className="label">MEMBERSHIP DAYS</div>
                  <div className="num">{membershipDays}</div>
                </div>
                <div className="user-stat">
                  <div className="label">REQUESTS</div>
                  <div className="num">0</div>
                </div>
                <div className="user-stat">
                  <div className="label">SAVED VEHICLES</div>
                  <div className="num">0</div>
                </div>
              </div>

              <div className="user-meta-grid">
                <div className="user-meta-card">
                  <h4>CONTACT</h4>
                  <div className="value">{user.phone || 'Add phone number'}</div>
                  <div className="hint">Used for urgent updates.</div>
                </div>
                <div className="user-meta-card">
                  <h4>PREFERENCES</h4>
                  <div className="value">Default notifications</div>
                  <div className="hint">Manage alerts & payment mode.</div>
                </div>
              </div>
            </div>

            <div className="card user-actions-card">
              <div className="user-actions-title">QUICK ACTIONS</div>
              <div className="user-actions">
                <Button size="sm">Update Profile</Button>
                {role==='customer' && (
                  <>
                    <Button size="sm" variant="ghost">Saved Vehicles</Button>
                    <Button size="sm" variant="ghost">Payment Methods</Button>
                  </>
                )}
                {role==='mechanic' && (
                  <>
                    <Button size="sm" variant="ghost">Service Areas</Button>
                    <Button size="sm" variant="ghost">Availability</Button>
                  </>
                )}
                {role==='garage' && (
                  <>
                    <Button size="sm" variant="ghost">Team Management</Button>
                    <Button size="sm" variant="ghost">Partnerships</Button>
                  </>
                )}
                <Button size="sm" variant="ghost" onClick={()=>navigate('/terms')}>Terms & Conditions</Button>
                <Button size="sm" variant="ghost" onClick={handleSignOut}>Sign out</Button>
              </div>
            </div>

            {/* Role-specific section */}
            {role==='customer' && cust && (
              <div className="card" id="cust-vehicles">
                <h4>Vehicles</h4>
                <div style={{display:'grid',gap:10,marginTop:10}}>
                  {cust.vehicles.map(v=> (
                    <div key={v.id} className="user-meta-card" style={{display:'grid',gridTemplateColumns:'1fr auto auto auto',gap:8,alignItems:'center'}}>
                      <div>
                        <div style={{fontWeight:800,color:'#fff'}}>{v.brand} {v.model}</div>
                        <div style={{fontSize:12,color:'#9aa0a6'}}>{v.plate}</div>
                        {v.primary && <span className="user-badge">Primary</span>}
                      </div>
                      <Button size="sm" variant="ghost" onClick={()=>makePrimary(v.id)}>Make Primary</Button>
                      <Button size="sm" variant="ghost" onClick={()=>editVehicle(v.id)}>Edit</Button>
                      <Button size="sm" variant="ghost" onClick={()=>removeVehicle(v.id)}>Remove</Button>
                    </div>
                  ))}
                  <Button size="sm" onClick={addVehicle}>Add Vehicle</Button>
                </div>
                <div className="user-meta-grid" style={{marginTop:14}}>
                  <div className="user-meta-card" style={{flex:1}}>
                    <h4>Addresses</h4>
                    {cust.addresses.map(a=> (
                      <div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                        <div>
                          <div style={{fontWeight:800,color:'#fff'}}>{a.label}</div>
                          <div style={{fontSize:12,color:'#9aa0a6'}}>{a.line}, {a.city} {a.pincode}</div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={()=>removeAddress(a.id)}>Remove</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addAddress}>Add Address</Button>
                  </div>
                  <div className="user-meta-card" style={{flex:1}}>
                    <h4>Favorites</h4>
                    {(cust.favorites||[]).map(f=> (
                      <div key={f.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{f.name} • ⭐ {f.rating}</span>
                        <Button size="sm" variant="ghost" onClick={()=>{
                          const next = { ...cust, favorites: cust.favorites.filter(x=>x.id!==f.id) }
                          setCust(next); saveCustomer(next)
                        }}>Remove</Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="user-meta-card" style={{marginTop:14}}>
                  <h4>Order History</h4>
                  {(cust.orders||[]).map(o=> (
                    <div key={o.id} style={{display:'flex',justifyContent:'space-between'}}>
                      <span>{o.id} • {new Date(o.date).toLocaleDateString()} • {o.items} item(s)</span>
                      <span style={{fontWeight:800}}>{`₹${o.total}`}</span>
                      <span>{o.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {role==='mechanic' && mech && (
              <div className="card" id="mech-profile">
                <h4>Mechanic Profile</h4>
                <div className="user-meta-grid" style={{marginTop:10}}>
                  <div className="user-meta-card">
                    <h4>Skills</h4>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {(mech.skills||[]).map(s=> (
                        <span key={s} className="user-badge" style={{display:'inline-flex',gap:8,alignItems:'center'}}>{s}
                          <button className="qty-btn" onClick={()=>removeSkill(s)}>✕</button>
                        </span>
                      ))}
                    </div>
                    <Button size="sm" onClick={addSkill}>Add Skill</Button>
                  </div>
                  <div className="user-meta-card">
                    <h4>Certifications</h4>
                    {(mech.certifications||[]).map(c=> (
                      <div key={c.id} style={{display:'flex',justifyContent:'space-between'}}>
                        <span>{c.name} • {c.year}</span>
                      </div>
                    ))}
                    <Button size="sm" onClick={addCertification}>Add Certification</Button>
                  </div>
                </div>
                <div className="user-meta-grid" style={{marginTop:10}}>
                  <div className="user-meta-card">
                    <h4>Service Areas</h4>
                    {(mech.serviceAreas||[]).map(a=> (
                      <div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{a.area} • {a.km} km</span>
                        <Button size="sm" variant="ghost" onClick={()=>removeArea(a.id)}>Remove</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addArea}>Add Area</Button>
                  </div>
                  <div className="user-meta-card">
                    <h4>Availability</h4>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6}}>
                      {['mon','tue','wed','thu','fri','sat','sun'].map(d=> (
                        <button key={d} className="qty-btn" style={{background: mech.availability?.[d]?'#0b1220':'#181818'}} onClick={()=>toggleDay(d)}>{d.toUpperCase()}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {role==='garage' && gar && (
              <div className="card" id="garage-profile">
                <h4>Garage Profile</h4>
                <div className="user-meta-grid" style={{marginTop:10}}>
                  <div className="user-meta-card">
                    <h4>Team</h4>
                    {(gar.team||[]).map(m=> (
                      <div key={m.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{m.name} • {m.role}</span>
                        <Button size="sm" variant="ghost" onClick={()=>removeTeam(m.id)}>Remove</Button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addTeam}>Add Member</Button>
                  </div>
                  <div className="user-meta-card">
                    <h4>Bays</h4>
                    {(gar.bays||[]).map(b=> (
                      <div key={b.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{b.name} • {b.status}</span>
                        <Button size="sm" variant="ghost" onClick={()=>toggleBay(b.id)}>Toggle</Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="user-meta-grid" style={{marginTop:10}}>
                  <div className="user-meta-card">
                    <h4>Inventory</h4>
                    {(gar.inventory||[]).map(i=> (
                      <div key={i.id} style={{display:'grid',gridTemplateColumns:'1fr auto auto',gap:8,alignItems:'center'}}>
                        <span>{i.name} • {i.stock} {i.unit}</span>
                        <button className="qty-btn" onClick={()=>updateStock(i.id,-1)}>–</button>
                        <button className="qty-btn" onClick={()=>updateStock(i.id,1)}>+</button>
                      </div>
                    ))}
                    <Button size="sm" onClick={addInventory}>Add Item</Button>
                  </div>
                  <div className="user-meta-card">
                    <h4>Services</h4>
                    {(gar.services||[]).map(s=> (
                      <div key={s.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <span>{s.category} • {s.name}</span>
                        <span style={{fontWeight:800}}>₹{s.price}</span>
                      </div>
                    ))}
                    <Button size="sm" onClick={addGarageService}>Add Service</Button>
                  </div>
                </div>
                <div className="user-meta-card" style={{marginTop:10}}>
                  <h4>Working Hours</h4>
                  <div>Weekdays: {gar.hours?.weekdays || '—'}</div>
                  <div>Weekends: {gar.hours?.weekends || '—'}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card" style={{padding:0}}><SignIn /></div>
        )}
      </div>
    </div>
  )
}
