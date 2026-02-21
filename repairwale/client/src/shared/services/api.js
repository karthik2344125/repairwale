import { getAPIBase } from './apiConfig'

export async function apiCall(endpoint, options = {}) {
  const API_BASE = getAPIBase()
  const url = `${API_BASE}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('API request timeout:', endpoint)
      throw new Error('Request timeout - backend may not be running on port 3000')
    }
    console.error('API call failed:', endpoint, error.message)
    throw error
  }
}

export function getMechanics() {
  return apiCall('/mechanics')
}

export function getServices() {
  return apiCall('/services')
}

export function createOrder(orderData) {
  return apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  })
}

export function getOrderStatus(orderId) {
  return apiCall(`/orders/${orderId}`)
}

export function submitReview(orderId, reviewData) {
  return apiCall(`/orders/${orderId}/review`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  })
}
