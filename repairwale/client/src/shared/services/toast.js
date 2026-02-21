let toastListeners = []

export function addToastListener(callback) {
  toastListeners.push(callback)
  return () => {
    toastListeners = toastListeners.filter(cb => cb !== callback)
  }
}

export function showToast(message, type = 'info', duration = 3000) {
  const id = Date.now()
  toastListeners.forEach(callback => {
    callback({ id, message, type, duration })
  })
  return id
}

export function showSuccess(message) {
  return showToast(message, 'success', 3000)
}

export function showError(message) {
  return showToast(message, 'error', 4000)
}

export function showInfo(message) {
  return showToast(message, 'info', 3000)
}

export function showWarning(message) {
  return showToast(message, 'warning', 3500)
}
