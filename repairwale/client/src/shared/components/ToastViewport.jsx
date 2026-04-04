import React, { useEffect, useMemo, useState } from 'react'
import { addToastListener } from '../services/toast'

const MAX_TOASTS = 4

export default function ToastViewport() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const removeById = (id) => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }

    const unsubscribe = addToastListener((toast) => {
      setToasts((prev) => {
        const next = [...prev, toast]
        return next.slice(Math.max(0, next.length - MAX_TOASTS))
      })

      const duration = Number(toast.duration) > 0 ? Number(toast.duration) : 3000
      window.setTimeout(() => removeById(toast.id), duration)
    })

    return unsubscribe
  }, [])

  const toneClass = useMemo(() => ({
    success: 'toast-success',
    error: 'toast-error',
    warning: 'toast-warning',
    info: 'toast-info'
  }), [])

  if (!toasts.length) {
    return null
  }

  return (
    <div className="toast-viewport" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card ${toneClass[toast.type] || 'toast-info'}`}>
          <div className="toast-message">{toast.message}</div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

