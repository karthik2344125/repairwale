import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, hasFirebase } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Button from '../components/Button'

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!hasFirebase || !auth) {
      setError('Firebase is not configured. Add your Firebase keys to enable authentication.')
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/user')
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try signing in instead.')
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password')
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format')
      } else {
        setError(err.message || 'Authentication failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      padding: 16
    }}>
      <div style={{ 
        maxWidth: 460, 
        width: '100%',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 48,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 64, 
            height: 64, 
            margin: '0 auto 16px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, var(--accent), #1e5128)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 900,
            color: '#fff'
          }}>
            RW
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
            {isSignUp ? 'Join RepairWale for instant mechanic assistance' : 'Sign in to your RepairWale account'}
          </p>
        </div>

        {error && (
          <div style={{ 
            padding: 14, 
            marginBottom: 20, 
            borderRadius: 10, 
            background: 'rgba(134, 45, 45, 0.2)', 
            border: '1px solid rgba(134, 45, 45, 0.4)',
            color: '#ff6b6b',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{ 
                width: 'calc(100% - 32px)',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                fontSize: 15,
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              style={{ 
                width: 'calc(100% - 32px)',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                fontSize: 15,
                boxSizing: 'border-box'
              }}
            />
          </div>

          {isSignUp && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                style={{ 
                  width: 'calc(100% - 32px)',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'inherit',
                  fontSize: 15,
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: 8,
              borderRadius: 10,
              border: 'none',
              background: loading ? '#555' : 'linear-gradient(135deg, var(--accent), #1e5128)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{ marginTop: 24 }}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            Continue as Guest
          </button>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError(null)
              setPassword('')
              setConfirmPassword('')
            }}
            style={{
              marginTop: 8,
              background: 'none',
              border: 'none',
              color: 'var(--accent)',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }}
          >
            {isSignUp ? 'Sign In Instead' : 'Create New Account'}
          </button>
        </div>

        {!hasFirebase && (
          <div style={{ 
            marginTop: 24, 
            padding: 12, 
            borderRadius: 8,
            background: 'rgba(255,193,7,0.1)',
            border: '1px solid rgba(255,193,7,0.3)',
            fontSize: 13,
            color: '#ffc107',
            textAlign: 'center'
          }}>
            ⚠️ Firebase not configured. Add config to enable authentication.
          </div>
        )}
      </div>
    </div>
  )
}
