import React from 'react'

// Icons use currentColor so their color matches surrounding text or link color.
export const IconMapPin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
    <circle cx="12" cy="9" r="2.5" fill="var(--panel)" />
  </svg>
)

export const IconUser = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" fill="currentColor"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="rgba(0,0,0,0.45)"/>
  </svg>
)

export const IconChat = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M21 6h-18v9a2 2 0 0 0 2 2h3v3l4-3h9a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" fill="currentColor"/>
  </svg>
)

export const IconPhone = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.85.74a1 1 0 011 1V20a1 1 0 01-1 1C9.16 21 3 14.84 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.65.74 3.85a1 1 0 01-.21 1.11l-2.41 2.83z" fill="currentColor"/>
  </svg>
)

export const IconMoney = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" />
    <circle cx="12" cy="12" r="3" fill="var(--panel)" />
  </svg>
)
