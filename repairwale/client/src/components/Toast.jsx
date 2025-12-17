import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const colors = {
    success: { bg: '#10b981', icon: '✓' },
    error: { bg: '#ef4444', icon: '✕' },
    info: { bg: '#3b82f6', icon: 'ℹ' },
    warning: { bg: '#f59e0b', icon: '⚠' }
  }

  const color = colors[type] || colors.info

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: color.bg,
      color: '#fff',
      padding: '16px 20px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 10000,
      animation: 'slideInRight 0.3s ease-out',
      maxWidth: '400px',
      fontSize: '14px',
      fontWeight: '600',
      fontFamily: 'Inter, system-ui, Arial'
    }}>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100px); }
        }
      `}</style>
      <span style={{ fontSize: '18px' }}>{color.icon}</span>
      <span>{message}</span>
    </div>
  )
}
