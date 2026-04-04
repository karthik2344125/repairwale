import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BrandLogo from '../components/BrandLogo'
import { getAPIBase } from '../services/apiConfig'

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

      const response = await fetch(`${getAPIBase().replace(/\/api\/?$/, '')}${endpoint}`, {
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
      
      setSuccessMsg(isSignup ? ' Account created successfully!' : ' Welcome back!')
      
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
      
      if (preSelectedRole === 'mechanic') {
        navigate('/mechanic/dashboard', { replace: true })
      } else if (preSelectedRole === 'customer') {
        navigate('/customer', { replace: true })
      } else {
        // No role selected yet, send to role selection
        navigate('/role-selection', { replace: true })
      }

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
      background: 'linear-gradient(145deg, #07111f 0%, #0f172a 50%, #0B1F3B 100%)',
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
          background: 'radial-gradient(circle, rgba(79,140,255,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-150px',
          left: '-100px',
          animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(134,183,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-120px',
          right: '-80px',
          animation: 'float 25s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)',
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
          border: 1.5px solid rgba(79,140,255,0.2);
          border-radius: 10px;
          background: #0B1F3B;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          outline: none;
          backdrop-filter: blur(10px);
        }
        
        .input-field:focus {
          border-color: #FFFFFF;
          background: #0B1F3B;
          box-shadow: 0 0 0 3px rgba(29,99,255,0.15);
        }
        
        .input-field::placeholder { color: rgba(255,255,255,0.5); }
        
        .btn-submit {
          width: 100%; padding: 14px 24px;
          border: none; border-radius: 10px;
          background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
          color: white; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(29,99,255,0.35);
          text-transform: none; letter-spacing: 0;
          overflow: hidden; position: relative;
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(29,99,255,0.5);
        }
        
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        
      `}</style>

      {/* Main Card */}
      <div className="login-container" style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(29,99,255,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(29,99,255,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        borderRadius: '24px',
        padding: '40px 36px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <BrandLogo size="lg" compact />
          </div>
          <h1 className="branding-title" style={{
            fontSize: '32px',
            fontWeight: '900',
            margin: '0 0 8px',
            color: '#ffffff'
          }}>
            Repairwale
          </h1>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            margin: '0',
            fontWeight: '500'
          }}>
            {isSignup ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        {/* Role Badge - Show selected role */}
        {localStorage.getItem('rw_role_locked') && (
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.28)',
            color: '#FFFFFF',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {localStorage.getItem('rw_role_locked') === 'customer' ? 'Customer' : 'Mechanic'} Account
          </div>
        )}

        {/* Messages */}
        {successMsg && (
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.28)',
            color: '#FFFFFF',
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
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.28)',
            color: '#FFFFFF',
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
             {errors.form}
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
                color: 'rgba(255,255,255,0.7)',
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
              {errors.fullName && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.fullName}</div>}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.7)',
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
            {errors.email && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.email}</div>}
          </div>

          {/* Phone - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.7)',
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
              {errors.phone && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.phone}</div>}
            </div>
          )}

          {/* Password */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.7)',
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
                placeholder=""
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
                    color: 'var(--accent-light)',
                  cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '6px 8px'
                }}
              >
                  {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.password}</div>}
          </div>

          {/* Confirm Password - Signup */}
          {isSignup && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.7)',
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
                  placeholder=""
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
                      color: 'var(--accent-light)',
                    cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '700',
                      padding: '6px 8px'
                  }}
                >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.confirmPassword}</div>}
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
                color: 'rgba(255,255,255,0.7)'
              }}>
                <input type="checkbox" style={{ accentColor: '#0B1F3B' }} />
                Remember me
              </label>
              <button type="button" onClick={() => setSuccessMsg('Password reset flow will be available soon.')} style={{
                color: '#FFFFFF',
                background: 'transparent',
                border: 0,
                padding: 0,
                textDecoration: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Forgot?
              </button>
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
                color: 'rgba(255,255,255,0.7)'
              }}>
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                  disabled={loading}
                  style={{ accentColor: '#0B1F3B', marginTop: '3px' }}
                />
                I agree to Terms & Conditions
              </label>
              {errors.acceptTerms && <div style={{ color: '#FFFFFF', fontSize: '12px', marginTop: '6px' }}> {errors.acceptTerms}</div>}
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
                isSignup ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        {/* Mode Toggle */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '20px'
        }}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={toggleMode}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
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
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline'
            }}
          >
            Change Role
          </button>
        </div>

      </div>
    </div>
  )
}


