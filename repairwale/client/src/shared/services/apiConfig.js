/**
 * API Configuration - Smart Backend Detection
 * Works with: Vite dev server, Live Server, or direct file opening
 */

const API_CACHE_KEY = 'rw_api_base'
const PROBE_PORTS = [3000, 3001, 3002, 3003, 3010, 3020]

let API_BASE = localStorage.getItem(API_CACHE_KEY) || 'http://localhost:3000/api'

function uniq(values) {
  return values.filter((value, idx) => value && values.indexOf(value) === idx)
}

// Detect environment automatically
function detectBackendURL() {
  const envApiUrl = import.meta.env?.VITE_API_URL
  if (envApiUrl) {
    return envApiUrl
  }

  // Check if we're in a web server environment
  const hostname = window.location.hostname
  const protocol = window.location.protocol

  // If opening directly via file://, use localhost backend explicitly
  if (protocol === 'file:') {
    return 'http://localhost:3000/api'
  }
  
  const cached = localStorage.getItem(API_CACHE_KEY)
  if (cached) {
    return cached
  }

  // If running on localhost with a port (Vite dev server)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Prefer backend default port used by local server.
    return `${protocol}//localhost:3000/api`
  }
  
  // Default fallback
  return `${protocol}//localhost:3000/api`
}

export function getAPICandidates() {
  const envApiUrl = import.meta.env?.VITE_API_URL
  if (envApiUrl) return [envApiUrl]

  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
  const host = window.location.hostname || 'localhost'
  const fromDetected = detectBackendURL()
  const fromHost = PROBE_PORTS.map((port) => `${protocol}//${host}:${port}/api`)
  const fromLocalhost = PROBE_PORTS.map((port) => `${protocol}//localhost:${port}/api`)

  return uniq([fromDetected, ...fromHost, ...fromLocalhost])
}

async function isBackendReachable(baseUrl) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1200)
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal
    })
    clearTimeout(timeout)
    return response.ok
  } catch {
    return false
  }
}

// Initialize API base URL
export async function initializeAPI() {
  const initial = detectBackendURL()
  API_BASE = initial

  const candidates = getAPICandidates()
  for (const candidate of candidates) {
    // Probe known backend ports and lock onto the first reachable API.
    // This prevents frontend/backend mismatch when server falls back from 3000.
    // eslint-disable-next-line no-await-in-loop
    const reachable = await isBackendReachable(candidate)
    if (reachable) {
      API_BASE = candidate
      localStorage.setItem(API_CACHE_KEY, API_BASE)
      break
    }
  }

  console.log('[API] Connected to backend:', API_BASE)
  return API_BASE
}

export function getAPIBase() {
  return API_BASE
}

export function setAPIBase(url) {
  API_BASE = url
  localStorage.setItem(API_CACHE_KEY, API_BASE)
  console.log('[API] Backend URL updated to:', API_BASE)
}


