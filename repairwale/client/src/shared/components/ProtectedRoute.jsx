import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function getHomeRouteByRole(role) {
  if (role === 'mechanic') return '/mechanic/dashboard'
  if (role === 'customer') return '/customer'
  return '/role-selection'
}

export function ProtectedRoute({ children, requireRole = null, allowWithoutRole = false }) {
  const { isAuthenticated, role, loading } = useAuth()
  // Fallback to localStorage if context role hasn't updated yet
  const effectiveRole = role || localStorage.getItem('rw_role_locked')

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0f172a'
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: 'rgba(255,255,255,0.6)',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 0.8s linear infinite'
          }}/>
          <div style={{marginTop: 16, color: '#94a3b8', fontSize: 14}}>Loading…</div>
        </div>
      </div>
    )
  }

  // Not authenticated - redirect to role selection first
  if (!isAuthenticated) {
    return <Navigate to="/role-selection" replace />
  }

  // Authenticated but no role - redirect to role selection (except when allowWithoutRole is true)
  if (!effectiveRole && !allowWithoutRole) {
    return <Navigate to="/role-selection" replace />
  }

  // Check if specific role is required
  if (requireRole && effectiveRole !== requireRole) {
    return <Navigate to={getHomeRouteByRole(effectiveRole)} replace />
  }

  return children
}

export function PublicRoute({ children, requireRoleSelection = false }) {
  const { isAuthenticated, role } = useAuth()
  // Fallback to localStorage if context role hasn't updated yet
  const effectiveRole = role || localStorage.getItem('rw_role_locked')

  // If route requires role to be selected first (e.g., login), enforce it
  if (!isAuthenticated && requireRoleSelection && !effectiveRole) {
    return <Navigate to="/role-selection" replace />
  }

  // Already logged in AND role selected - go to service home
  if (isAuthenticated && effectiveRole) {
    return <Navigate to={getHomeRouteByRole(effectiveRole)} replace />
  }

  // Logged in but no role - allow to access login/role-selection (shouldn't happen but safety check)
  return children
}
