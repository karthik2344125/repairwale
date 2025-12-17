// Lightweight profile service for consistent storage access
export const USER_KEY = 'repairwale_user'
export const ROLE_KEY = 'userRole'
export const AUTH_KEY = 'userAuth'

export function getProfile(){
  try{ const v = localStorage.getItem(USER_KEY); return v? JSON.parse(v): null }catch{ return null }
}

export function setProfile(profile){
  try{ localStorage.setItem(USER_KEY, JSON.stringify(profile)) }catch{}
}

export function getRole(){
  try{ return sessionStorage.getItem(ROLE_KEY) || 'customer' }catch{ return 'customer' }
}

export function setRole(role){
  try{ sessionStorage.setItem(ROLE_KEY, role) }catch{}
}

export function isAuthed(){
  try{ return sessionStorage.getItem(AUTH_KEY) === 'true' }catch{ return false }
}

export function setAuthed(flag){
  try{ sessionStorage.setItem(AUTH_KEY, flag ? 'true' : 'false') }catch{}
}

// Initialize a default profile for first-time users
export function ensureDefaultProfile(role){
  const existing = getProfile()
  if(existing) return existing
  const now = new Date().toISOString()
  const profile = {
    fullName: 'Guest User',
    email: 'guest@example.com',
    joinedDate: now,
    role: role || 'customer',
    phone: '',
    preferences: {}
  }
  setProfile(profile)
  return profile
}
