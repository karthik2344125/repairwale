import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'
import { applyTheme } from './services/theme'

// Apply saved theme on initial load
applyTheme()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
