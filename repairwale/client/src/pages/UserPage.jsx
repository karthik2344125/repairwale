import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db, hasFirebase } from '../firebase'
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import Button from '../components/Button'

export default function UserPage(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicles, setVehicles] = useState([{ type: 'Bike', number: '', model: '' }])
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const uidShort = useMemo(() => (user ? user.uid.substring(0,8) : 'Guest'), [user])

  useEffect(() => {
    if (!hasFirebase || !auth) return
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser)
      if (fbUser && db) {
        try {
          const docRef = doc(db, 'users', fbUser.uid)
          const snap = await getDoc(docRef)
          if (snap.exists()) {
            const p = snap.data()
            setName(p.name || '')
            setEmail(p.email || '')
            setPhone(p.phone || '')
            if (Array.isArray(p.vehicles) && p.vehicles.length) {
              setVehicles(p.vehicles.map(v => ({ type: v.type || 'Bike', number: v.number || '', model: v.model || '' })))
            }
          }
        } catch (e) {
          console.warn('Could not load profile from Firestore:', e)
        }
      }
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('rw_profile')
    if (stored) {
      try {
        const p = JSON.parse(stored)
        setName(p.name || '')
        setEmail(p.email || '')
        setPhone(p.phone || '')
        if (Array.isArray(p.vehicles) && p.vehicles.length) {
          setVehicles(p.vehicles.map(v => ({ type: v.type || 'Bike', number: v.number || '', model: v.model || '' })))
        } else {
          setVehicles([{ type: p.vehicleType || 'Bike', number: p.vehicleNumber || '', model: p.vehicleModel || '' }])
        }
      } catch {}
    }
  }, [])

  function showToast(message, type = 'info'){
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  async function loginAnon(){
    try{
      const cred = await signInAnonymously(auth)
      setUser(cred.user)
      alert('Signed in anonymously')
    }catch(e){ console.warn(e); alert('Sign-in failed') }
  }

  function validate(){
    if (!name.trim()) return 'Please enter your name'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email'
    if (phone && !/^\+?\d{7,15}$/.test(phone.replace(/\s|-/g,''))) return 'Please enter a valid phone number'
    for (let i=0;i<vehicles.length;i++){
      const v = vehicles[i]
      if (v.number.trim().length === 0 && v.model.trim().length === 0) continue
      if (!v.number.trim()) return `Vehicle #${i+1}: enter a registration number`
    }
    return null
  }

  async function saveProfile(){
    const error = validate()
    if (error){ showToast(error, 'error'); return }
    const cleanVehicles = vehicles.filter(v => v.number.trim() || v.model.trim()).map(v => ({
      type: v.type || 'Bike',
      number: v.number.trim(),
      model: v.model.trim()
    }))
    const profile = { name: name.trim(), email: email.trim(), phone: phone.trim(), vehicles: cleanVehicles, updatedAt: Date.now() }
    setSaving(true)
    try {
      localStorage.setItem('rw_profile', JSON.stringify(profile))
      if (hasFirebase && db && user) {
        try {
          await setDoc(doc(db, 'users', user.uid), profile, { merge: true })
        } catch (e) {
          console.warn('Firestore save failed (continuing with local only):', e)
        }
      }
      showToast('Profile saved', 'success')
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 540, margin: '60px auto', textAlign: 'center', padding: 16 }}>
        <div className="card" style={{ padding: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🔒</div>
          <h2 style={{ margin: 0, fontSize: 24 }}>Sign In Required</h2>
          <p className="muted" style={{ marginTop: 8, marginBottom: 24 }}>
            Please sign in to view and manage your profile
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button variant="ghost" onClick={loginAnon}>Continue as Guest</Button>
            <Button variant="primary" onClick={() => navigate('/signin')}>Sign In</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      {/* Header Card */}
      <div className="card" style={{ 
        padding: 32, 
        marginBottom: 24,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ 
            width: 96, 
            height: 96, 
            borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), #1e5128)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 900,
            color: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
              {name || 'User Profile'}
            </h1>
            <div className="muted" style={{ marginTop: 4, fontSize: 15 }}>
              {user.email || `ID: ${uidShort}`}
            </div>
            <div style={{ marginTop: 12, display: 'inline-block', padding: '6px 12px', borderRadius: 20, background: 'rgba(46,213,115,0.15)', color: '#2ed573', fontSize: 13, fontWeight: 600 }}>
              ✓ Verified Account
            </div>
          </div>
          <Button variant="ghost" onClick={() => { auth.signOut(); setUser(null) }}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <section className="card" style={{ marginBottom: 24, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Personal Information</h2>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>Manage your contact details</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
              Full Name <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Enter your full name"
              style={{ 
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 15
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
              Email Address
            </label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              placeholder="you@example.com"
              style={{ 
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 15
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
              Phone Number
            </label>
            <input 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="+91 XXXXX XXXXX"
              style={{ 
                width: '100%',
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 15
              }}
            />
          </div>
        </div>
      </section>

      {/* Vehicle Information */}
      <section className="card" style={{ marginBottom: 24, padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Registered Vehicles</h2>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: 14 }}>Add and manage your vehicles for faster service requests</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setVehicles([...vehicles, { type: 'Bike', number: '', model: '' }])}>
            + Add Vehicle
          </Button>
        </div>

        {vehicles.map((v, idx) => (
          <div key={idx} style={{ 
            padding: 20,
            marginBottom: 16,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Vehicle #{idx + 1}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  if (vehicles.length === 1) {
                    setVehicles([{ type: 'Bike', number: '', model: '' }])
                    return
                  }
                  setVehicles(vehicles.filter((_, i) => i !== idx))
                }}
              >
                Remove
              </Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, opacity: 0.7 }}>
                  Vehicle Type
                </label>
                <select 
                  value={v.type} 
                  onChange={e => {
                    const arr = [...vehicles]
                    arr[idx] = { ...arr[idx], type: e.target.value }
                    setVehicles(arr)
                  }}
                  style={{ 
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    fontSize: 14
                  }}
                >
                  <option>Bike</option>
                  <option>Car</option>
                  <option>Auto</option>
                  <option>Truck</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, opacity: 0.7 }}>
                  Registration Number
                </label>
                <input 
                  value={v.number} 
                  onChange={e => {
                    const arr = [...vehicles]
                    arr[idx] = { ...arr[idx], number: e.target.value }
                    setVehicles(arr)
                  }} 
                  placeholder="DL 01 AB 1234"
                  style={{ 
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    fontSize: 14,
                    textTransform: 'uppercase'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600, opacity: 0.7 }}>
                  Make & Model
                </label>
                <input 
                  value={v.model} 
                  onChange={e => {
                    const arr = [...vehicles]
                    arr[idx] = { ...arr[idx], model: e.target.value }
                    setVehicles(arr)
                  }} 
                  placeholder="e.g., Honda Activa 6G"
                  style={{ 
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    fontSize: 14
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {vehicles.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, opacity: 0.5 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
            <p className="muted">No vehicles added yet. Click "Add Vehicle" to get started.</p>
          </div>
        )}
      </section>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 24 }}>
        <Button 
          variant="ghost" 
          onClick={() => {
            setName('')
            setEmail('')
            setPhone('')
            setVehicles([{ type: 'Bike', number: '', model: '' }])
          }}
        >
          Reset All
        </Button>
        <Button 
          variant="primary" 
          onClick={saveProfile} 
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Info Banner */}
      <div style={{ 
        padding: 16,
        borderRadius: 10,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        fontSize: 13,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center'
      }}>
        💾 Your data is automatically saved locally. {hasFirebase ? 'Cloud sync enabled.' : 'Enable Firebase for cloud backup.'}
      </div>

      {toast && (
        <div style={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '14px 20px',
          borderRadius: 12,
          background: toast.type === 'error' ? 'rgba(134, 45, 45, 0.95)' : 'rgba(46, 213, 115, 0.95)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000
        }}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
