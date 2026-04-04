import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HIDE_ON_PATHS = new Set(['/'])

export default function BackNavButton() {
  const navigate = useNavigate()
  const location = useLocation()

  if (HIDE_ON_PATHS.has(location.pathname)) return null

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/home', { replace: true })
  }

  return (
    <button
      type="button"
      className="global-back-btn"
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
    >
      <span aria-hidden>←</span>
      Back
    </button>
  )
}
