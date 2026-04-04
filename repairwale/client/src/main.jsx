import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'
import { applyTheme } from './shared/services/theme'

console.log('RepairWale app starting...')

// Apply saved theme on initial load
try {
  applyTheme()
  console.log('Theme applied')
} catch (e) {
  console.error('Theme error:', e)
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found')
} else {
  console.log('Root element found')
  try {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  } catch (e) {
    console.error('Render error:', e)
    rootElement.innerHTML = `<div style="padding:20px;color:red;font-family:monospace;"><pre>${e.message}</pre></div>`
  }
}


