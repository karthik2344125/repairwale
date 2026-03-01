/**
 * API Configuration - Smart Backend Detection
 * Works with: Vite dev server, Live Server, or direct file opening
 */

let API_BASE = 'http://localhost:3000/api'

// Detect environment automatically
function detectBackendURL() {
  const envApiUrl = import.meta.env?.VITE_API_URL
  if (envApiUrl) {
    return envApiUrl
  }

  // Check if we're in a web server environment
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  
  // If running on localhost with a port (Vite dev server)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Always connect to port 3000 for backend
    return `${protocol}//localhost:3000/api`
  }
  
  // Default fallback
  return `${protocol}//localhost:3000/api`
}

// Initialize API base URL
export function initializeAPI() {
  API_BASE = detectBackendURL()
  console.log('[API] Connected to backend:', API_BASE)
  return API_BASE
}

export function getAPIBase() {
  return API_BASE
}

export function setAPIBase(url) {
  API_BASE = url
  console.log('[API] Backend URL updated to:', API_BASE)
}
