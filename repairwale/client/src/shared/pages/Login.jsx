import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    acceptTerms: false
  })

  const validateForm = () => {
    const newErrors = {}

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (isSignup) {
      if (!form.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }

      if (!form.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone must be 10 digits'
      }

      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }

      if (!form.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccessMsg('')
    setErrors({})

    try {
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login'
      const payload = isSignup 
        ? { email: form.email, password: form.password, fullName: form.fullName }
        : { email: form.email, password: form.password }

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!data.ok) {
        setErrors({ form: data.error || 'Authentication failed' })
        setLoading(false)
        return
      }

      // Store token and user data
      localStorage.setItem('repairwale_token', data.token)
      localStorage.setItem('repairwale_user', JSON.stringify(data.user))

      // Update auth context
      login(form.email, form.password, form.fullName)
      
      setSuccessMsg(isSignup ? '🎉 Account created successfully!' : '✓ Welcome back!')
      
      setForm({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        acceptTerms: false
      })

      // Check if user has pre-selected a role
      const preSelectedRole = localStorage.getItem('rw_role_locked')
      
      setTimeout(() => {
        if (preSelectedRole === 'mechanic') {
          navigate('/mechanic/dashboard', { replace: true })
        } else if (preSelectedRole === 'customer') {
          navigate('/customer', { replace: true })
        } else {
          // No role selected yet, send to role selection
          navigate('/role-selection', { replace: true })
        }
      }, 800)

    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ form: 'Server connection failed. Please check if the backend is running.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setErrors({})
    setSuccessMsg('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-150px',
          left: '-100px',
          animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(245, 87, 108, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-120px',
          right: '-80px',
          animation: 'float 25s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          animation: 'float 30s ease-in-out infinite'
        }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .login-container { animation: slideInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        @media (max-width: 768px) {
          .login-container { padding: 32px 24px !important; }
        }
        @media (max-width: 480px) {
          .login-container { padding: 28px 20px !important; border-radius: 20px !important; }
          .branding-title { font-size: 24px !important; }
        }
        
        .input-field {
          width: 100%; padding: 13px 15px;
          border: 1.5px solid rgba(102, 126, 234, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          outline: none;
          backdrop-filter: blur(10px);
        }
        
        .input-field:focus {
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
        }
        
        .input-field::placeholder { color: rgba(255, 255, 255, 0.5); }
        
        .btn-submit {
          width: 100%; padding: 14px 24px;
          border: none; border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
          text-transform: uppercase; letter-spacing: 0.8px;
          overflow: hidden; position: relative;
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
        
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        
      `}</style>

      {/* Main Card */}
      <div className="login-container" style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(30, 30, 46, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
        borderRadius: '24px',
        padding: '40px 36px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transform: 'rotate(-5deg)'
          }}>
            🔧
          </div>
          <h1 className="branding-title" style={{
            fontSize: '32px',
            fontWeight: '900',
            margin: '0 0 8px',
            color: '#ffffff'
          }}>
            RepairWale
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '0',
            fontWeight: '500'
          }}>
            {isSignup ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        {/* Role Badge - Show selected role */}
        {localStorage.getItem('rw_role_locked') && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.4)',
            color: '#c7d2fe',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {localStorage.getItem('rw_role_locked') === 'customer' ? '👤 Customer' : '🔧 Mechanic'} Account
          </div>
        )}

        {/* Messages */}
        {successMsg && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#a7f3d0',
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            {successMsg}
          </div>
        )}
        {errors.form && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            ⚠️ {errors.form}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          {/* Full Name - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}>
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                disabled={loading}
              />
              {errors.fullName && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.fullName}</div>}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              disabled={loading}
            />
            {errors.email && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.email}</div>}
          </div>

          {/* Phone - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                className="input-field"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9876543210"
                disabled={loading}
              />
              {errors.phone && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.phone}</div>}
            </div>
          )}

          {/* Password */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.8px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '4px'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.password}</div>}
          </div>

          {/* Confirm Password - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input-field"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  style={{ paddingRight: '45px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '4px'
                  }}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.confirmPassword}</div>}
            </div>
          )}

          {/* Remember & Forgot - Login Only */}
          {!isSignup && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <input type="checkbox" style={{ accentColor: '#667eea' }} />
                Remember me
              </label>
              <a href="#" style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Forgot?
              </a>
            </div>
          )}

          {/* Terms - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                  disabled={loading}
                  style={{ accentColor: '#667eea', marginTop: '3px' }}
                />
                I agree to Terms & Conditions
              </label>
              {errors.acceptTerms && <div style={{ color: '#ff6b6b', fontSize: '12px', marginTop: '6px' }}>⚠️ {errors.acceptTerms}</div>}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Processing...</span>
              </div>
            ) : (
              isSignup ? '✨ Create Account' : '🚀 Sign In'
            )}
          </button>
        </form>

        {/* Mode Toggle */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '20px'
        }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={toggleMode}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px'
            }}
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </div>

        {/* Back to Role Selection */}
        <div style={{
          textAlign: 'center',
          marginTop: '16px'
        }}>
          <button
            onClick={() => navigate('/role-selection')}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
          >
            ← Change Role
          </button>
        </div>

      </div>

      <style>{`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        [style*="background: 'linear-gradient(145deg, #0f0c29"] {
          background: linear-gradient(145deg, #0B1220 0%, #0F1728 50%, #162844 100%) !important;
        }

        /* Form Container */
        [style*="background: 'rgba(15, 23, 40"],
        [style*="background: 'rgba(255, 255, 255, 0.05)"] {
          background: linear-gradient(135deg, #0F1728 0%, #162844 100%) !important;
          border: 1px solid #2A4368 !important;
          box-shadow: 0 8px 32px rgba(74, 158, 255, 0.1) !important;
        }

        /* Input Fields */
        [style*="background: '#1e293b'"],
        [style*="background:#1e293b"] {
          background: rgba(15, 23, 40, 0.8) !important;
          border: 1px solid #2A4368 !important;
          color: #E6EDF7 !important;
        }

        [style*="background: '#1e293b'"]:focus,
        [style*="background:#1e293b"]:focus {
          border-color: #4A9EFF !important;
          box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.1) !important;
          outline: none !important;
        }

        /* Primary Button */
        [style*="background: 'linear-gradient(135deg, #667eea"] {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          box-shadow: 0 4px 16px rgba(74, 158, 255, 0.18) !important;
        }

        [style*="background: 'linear-gradient(135deg, #667eea"]:hover {
          background: linear-gradient(135deg, #60A5FF 0%, #4A9EFF 100%) !important;
          box-shadow: 0 6px 24px rgba(74, 158, 255, 0.22) !important;
        }

        /* Heading Gradients */
        h1, h2 {
          background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }

        /* Error Messages */
        [style*="color: '#ef4444'"],
        [style*="color:#ef4444"] {
          color: #FF6B6B !important;
        }

        /* Success Messages */
        [style*="color: '#10b981'"],
        [style*="color:#10b981"] {
          color: #10B981 !important;
        }

        /* Labels */
        label {
          color: #E6EDF7 !important;
        }
      `}</style>
    </div>
  )
}
