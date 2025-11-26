import React, { useState } from 'react'
import { auth } from '../firebase'
import { signInAnonymously } from 'firebase/auth'
import Button from '../components/Button'

export default function UserPage(){
  const [user, setUser] = useState(null)

  async function loginAnon(){
    try{
      const cred = await signInAnonymously(auth)
      setUser(cred.user)
      alert('Signed in anonymously')
    }catch(e){ console.warn(e); alert('Sign-in failed') }
  }

  return (
    <div>
      <h2 style={{marginTop:0}}>Your Account</h2>

      <div className="card profileCard">
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <div style={{width:76,height:76,borderRadius:12,background:'linear-gradient(135deg,#2b2b2b,#141414)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,color:'var(--accent)'}}>RW</div>
          <div style={{flex:1}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:800}}>{user ? user.uid.substring(0,8) : 'Guest'}</div>
                <div className="muted">{user ? 'Signed in' : 'Not signed in'}</div>
              </div>
              <div>
                {user ? (
                  <Button variant="ghost" size="sm" onClick={()=>{ auth.signOut(); setUser(null) }}>Sign out</Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={loginAnon}>Sign in</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section style={{marginTop:16}} className="card">
        <h3>Profile & Preferences</h3>
        <p className="muted">Add phone number, vehicle details, default payment method and notification preferences here.</p>
      </section>
    </div>
  )
}
