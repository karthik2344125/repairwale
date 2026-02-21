import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const allowedRoles = ['customer', 'mechanic']

  // Load auth state from storage on mount (persist across page refreshes)
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('repairwale_user')
      const storedRole = localStorage.getItem('rw_role_locked')

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
        
        if (storedRole && allowedRoles.includes(storedRole)) {
          setRole(storedRole)
        } else if (storedRole) {
          localStorage.removeItem('rw_role_locked')
        }
      }
    } catch (e) {
      console.error('Failed to restore auth:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = (email, password, name = '') => {
    // Simulate login - in real app, this would call a backend API
    const userData = {
      email,
      fullName: name || email.split('@')[0],
      loginTime: new Date().toISOString(),
      id: `user_${Date.now()}`
    }

    // Store in localStorage - persists across page refreshes
    localStorage.setItem('repairwale_user', JSON.stringify(userData))

    setUser(userData)
    setIsAuthenticated(true)

    return userData
  }

  const selectRole = async (selectedRole) => {
    return new Promise(async (resolve) => {
      try {
        if (!allowedRoles.includes(selectedRole)) {
          console.warn('Invalid role selection:', selectedRole)
          localStorage.removeItem('rw_role_locked')
          setRole(null)
          setTimeout(() => resolve(), 50)
          return
        }

        const token = localStorage.getItem('repairwale_token')
        
        if (token) {
          // Call backend to update role
          const response = await fetch('http://localhost:3000/api/auth/set-role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ role: selectedRole })
          })

          const data = await response.json()
          
          if (data.ok) {
            // Update local storage with the role from backend
            const storedUser = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
            storedUser.role = selectedRole
            localStorage.setItem('repairwale_user', JSON.stringify(storedUser))
          }
        }

        // Lock role permanently in localStorage - persists across refreshes
        localStorage.setItem('rw_role_locked', selectedRole)
        setRole(selectedRole)
        
        // Small delay to ensure React state update completes
        setTimeout(() => resolve(), 50)
      } catch (error) {
        console.error('Error setting role:', error)
        // Still set role locally even if backend fails
        localStorage.setItem('rw_role_locked', selectedRole)
        setRole(selectedRole)
        setTimeout(() => resolve(), 50)
      }
    })
  }

  const logout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('repairwale_user')
    localStorage.removeItem('rw_role_locked')
    localStorage.removeItem('repairwale_token')
    
    setUser(null)
    setRole(null)
    setIsAuthenticated(false)
  }

  const completeLogout = () => {
    // Same as logout - completely clear all auth data
    localStorage.removeItem('repairwale_user')
    localStorage.removeItem('rw_role_locked')
    localStorage.removeItem('repairwale_token')
    
    setUser(null)
    setRole(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    role,
    isAuthenticated,
    loading,
    login,
    selectRole,
    logout,
    completeLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
