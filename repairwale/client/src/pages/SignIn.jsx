import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn(){
  const navigate = useNavigate()
  const [mode,setMode] = useState('signin') // 'signin' | 'signup'
  const [loading,setLoading] = useState(false)
  const [msg,setMsg] = useState('')
  const [form,setForm] = useState({ fullName:'', email:'', phone:'', password:'', confirmPassword:'', accept:false })
  const [errors,setErrors] = useState({})

  function validate(){
    const e={}
    if(mode==='signup' && !form.fullName.trim()) e.fullName='Full name required'
    if(!form.email.trim()) e.email='Email required'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email='Invalid email'
    if(mode==='signup'){
      if(!form.phone.trim()) e.phone='Phone required'
      else if(!/^\d{10}$/.test(form.phone.replace(/\D/g,''))) e.phone='10 digits required'
    }
    if(!form.password) e.password='Password required'
    else if(form.password.length<6) e.password='Min 6 characters'
    if(mode==='signup' && form.password!==form.confirmPassword) e.confirmPassword='Passwords mismatch'
    if(mode==='signup' && !form.accept) e.accept='Accept terms required'
    setErrors(e)
    return Object.keys(e).length===0
  }

  function submit(e){
    e.preventDefault()
    if(!validate()) return
    setLoading(true); setMsg('')
    setTimeout(()=>{
      if(mode==='signup'){
        const user={ fullName:form.fullName, email:form.email, phone:form.phone, joinedDate:new Date().toISOString() }
        localStorage.setItem('repairwale_user', JSON.stringify(user))
        setMsg('Account created. Redirecting…')
      }else{
        const existing=localStorage.getItem('repairwale_user')
        if(!existing){
          const demo={ fullName:'Demo User', email:form.email, phone:'9876543210', joinedDate:new Date().toISOString() }
          localStorage.setItem('repairwale_user', JSON.stringify(demo))
        }
        setMsg('Signed in. Redirecting…')
      }
      setTimeout(()=>{ setLoading(false); navigate('/user') }, 600)
    },400)
  }

  function change(field,val){
    setForm(f=>({...f,[field]:val}))
    if(errors[field]) setErrors(er=>({...er,[field]:''}))
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">RW</div>
        <h1 className="auth-title">{mode==='signup'? 'Create Account':'Sign In'}</h1>
        <p className="auth-sub">{mode==='signup' ? 'Join RepairWale to request and track assistance quickly.' : 'Access your profile, history and saved preferences.'}</p>
        {msg && <div style={{marginTop:24,background:'linear-gradient(135deg,#10b981,#059669)',padding:'14px 18px',borderRadius:14,fontSize:13,fontWeight:600,textAlign:'center'}}>✓ {msg}</div>}
        <form onSubmit={submit} className="auth-form">
          {mode==='signup' && (
            <div className="auth-field">
              <label>FULL NAME *</label>
              <input type="text" value={form.fullName} onChange={e=>change('fullName',e.target.value)} className="input" placeholder="John Doe" disabled={loading} />
              {errors.fullName && <div className="auth-error">{errors.fullName}</div>}
            </div>
          )}

          <div className="auth-field">
            <label>EMAIL ADDRESS *</label>
            <input type="email" value={form.email} onChange={e=>change('email',e.target.value)} className="input" placeholder="you@example.com" disabled={loading} />
            {errors.email && <div className="auth-error">{errors.email}</div>}
          </div>

          {mode==='signup' && (
            <div className="auth-field">
              <label>PHONE NUMBER *</label>
              <input type="tel" value={form.phone} onChange={e=>change('phone',e.target.value)} className="input" placeholder="9876543210" disabled={loading} />
              {errors.phone && <div className="auth-error">{errors.phone}</div>}
            </div>
          )}

          <div className="auth-field">
            <label>PASSWORD *</label>
            <input type="password" value={form.password} onChange={e=>change('password',e.target.value)} className="input" placeholder="Minimum 6 characters" disabled={loading} />
            {errors.password && <div className="auth-error">{errors.password}</div>}
          </div>

          {mode==='signup' && (
            <div className="auth-field">
              <label>CONFIRM PASSWORD *</label>
              <input type="password" value={form.confirmPassword} onChange={e=>change('confirmPassword',e.target.value)} className="input" placeholder="Re-enter password" disabled={loading} />
              {errors.confirmPassword && <div className="auth-error">{errors.confirmPassword}</div>}
            </div>
          )}

          {mode==='signup' && (
            <div className="auth-check-row">
              <input type="checkbox" checked={form.accept} onChange={e=>change('accept', e.target.checked)} disabled={loading} />
              <span>I agree to RepairWale Terms & Privacy Policy.</span>
              {errors.accept && <div className="auth-error" style={{marginLeft:4}}>{errors.accept}</div>}
            </div>
          )}

          <div className="auth-actions">
            <button type="submit" disabled={loading} className="auth-btn-primary">
              {loading ? <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8}}><span className="spinner"/>Processing…</span> : (mode==='signup'?'Create Account':'Sign In')}
            </button>
          </div>
        </form>
        <div className="auth-switch">{mode==='signup' ? 'Already have an account?' : 'Need an account?'} <button type="button" className="auth-link-btn" onClick={()=>{setMode(mode==='signup'?'signin':'signup'); setErrors({}); setMsg('')}}>{mode==='signup'?'Sign In':'Sign Up'}</button></div>
        <div className="auth-meta-footer">
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:10}}>Just browsing?</div>
          <button type="button" className="auth-guest-btn" onClick={()=> navigate('/service')}>Continue as Guest</button>
        </div>
      </div>
    </div>
  )
}
