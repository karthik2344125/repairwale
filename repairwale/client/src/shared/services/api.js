import { getAPIBase } from './apiConfig'
import { showError } from './toast'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeApiErrorPayload(payload) {
  if (!payload || typeof payload !== 'object') return ''
  return payload.error || payload.message || payload.detail || ''
}

function toReadableError(error) {
  if (error?.name === 'AbortError') return 'Request timed out. Please try again.'
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'You appear to be offline. Check your internet connection.'
  }
  return error?.message || 'Unexpected network error'
}

export async function apiCall(endpoint, options = {}) {
  const API_BASE = getAPIBase()
  const url = `${API_BASE}${endpoint}`
  const {
    retries = 2,
    retryDelay = 350,
    timeoutMs = 10000,
    suppressErrorToast = false,
    skipAuth = false,
    ...fetchOptions
  } = options

  const token = !skipAuth ? localStorage.getItem('repairwale_token') : null
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...fetchOptions.headers,
  }

  let lastError = null
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        const message = normalizeApiErrorPayload(payload) || `Request failed (${response.status})`
        const error = new Error(message)
        error.status = response.status

        if (response.status >= 500 && attempt < retries) {
          await sleep(retryDelay * (attempt + 1))
          continue
        }

        throw error
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeout)
      lastError = error
      const retriableNetworkFailure = error?.name === 'AbortError' || error instanceof TypeError

      if (retriableNetworkFailure && attempt < retries) {
        await sleep(retryDelay * (attempt + 1))
        continue
      }

      break
    }
  }

  const finalMessage = toReadableError(lastError)
  console.error('API call failed:', endpoint, finalMessage)
  if (!suppressErrorToast) {
    showError(finalMessage)
  }
  throw new Error(finalMessage)
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

export function createDispatchRequest(payload) {
  return apiCall('/dispatch/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getCustomerDispatchStatus(requestId) {
  return apiCall(`/dispatch/customer/${requestId}`)
}

export function getMechanicRequests(mechanicId) {
  return apiCall(`/mechanic/requests?mechanicId=${encodeURIComponent(mechanicId)}`)
}

export function acceptMechanicRequest(mechanicId, requestId) {
  return apiCall('/mechanic/accept-request', {
    method: 'POST',
    body: JSON.stringify({ mechanicId, requestId }),
  })
}

export function rejectMechanicRequest(mechanicId, requestId) {
  return apiCall('/mechanic/reject-request', {
    method: 'POST',
    body: JSON.stringify({ mechanicId, requestId }),
  })
}

export function updateMechanicPresence(payload) {
  return apiCall('/mechanic/presence/update', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getRazorpayKey() {
  return apiCall('/razorpay-key', { skipAuth: true })
}

export function getAvailablePaymentMethods(userId) {
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : ''
  return apiCall(`/payment-methods/available${query}`, { skipAuth: true })
}

export function createRazorpayOrder(amount) {
  return apiCall('/create-order', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ amount }),
  })
}

export function verifyRazorpayPayment({ order_id, payment_id, signature }) {
  return apiCall('/verify-payment', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ order_id, payment_id, signature }),
  })
}

export function createUpiOrder({ amount, phone }) {
  return apiCall('/create-upi-order', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ amount, phone }),
  })
}

export function verifyUpiPayment({ orderId, transactionId, phone }) {
  return apiCall('/verify-upi-payment', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ orderId, transactionId, phone }),
  })
}

export function getWalletBalance(userId) {
  return apiCall(`/wallet/balance?userId=${encodeURIComponent(userId)}`, { skipAuth: true })
}

export function processWalletPayment({ amount, userId }) {
  return apiCall('/process-wallet-payment', {
    method: 'POST',
    skipAuth: true,
    body: JSON.stringify({ amount, userId }),
  })
}


