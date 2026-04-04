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

export const IconWrench = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M22 7.5a6.5 6.5 0 0 1-8.75 6.1L7.6 19.25a2.2 2.2 0 0 1-3.11 0L4 18.76a2.2 2.2 0 0 1 0-3.11l5.64-5.65A6.5 6.5 0 0 1 17.5 2a6.3 6.3 0 0 0-1.02 3.5c0 .64.1 1.25.28 1.82l1.75 1.75c.57.18 1.18.28 1.82.28A6.3 6.3 0 0 0 22 7.5z" fill="currentColor"/>
  </svg>
)

export const IconShield = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3z" fill="currentColor"/>
    <path d="M10.5 12.2l1.5 1.5 3.5-3.5" fill="none" stroke="var(--panel)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const IconTruck = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 7h12v8H3V7zm12 3h3l3 3v2h-6v-5z" fill="currentColor"/>
    <circle cx="7" cy="17.5" r="2" fill="var(--panel)"/>
    <circle cx="17" cy="17.5" r="2" fill="var(--panel)"/>
  </svg>
)

export const IconSpark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2z" fill="currentColor"/>
    <path d="M5 16l1 2.7L9 20l-2.9 1.3L5 24l-1.1-2.7L1 20l2.9-1.3L5 16z" fill="currentColor" opacity="0.7"/>
  </svg>
)

export const IconCompass = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M15.7 8.3l-2.1 5.6-5.6 2.1 2.1-5.6 5.6-2.1z" fill="currentColor" />
    <circle cx="12" cy="12" r="1.6" fill="var(--panel)" />
  </svg>
)

export const IconList = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="4" y="5" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="4" y="10.5" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="4" y="16" width="3" height="3" rx="1" fill="currentColor" />
    <rect x="9" y="5.7" width="11" height="1.6" rx="0.8" fill="currentColor" />
    <rect x="9" y="11.2" width="11" height="1.6" rx="0.8" fill="currentColor" />
    <rect x="9" y="16.7" width="11" height="1.6" rx="0.8" fill="currentColor" />
  </svg>
)

export const IconStar = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 17.3l-6.2 3.6 1.7-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.5 4.7 1.7 7z" fill="currentColor"/>
  </svg>
)

export const IconCard = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor"/>
    <rect x="4" y="8" width="16" height="3" rx="1.5" fill="var(--panel)"/>
    <rect x="5" y="14" width="5" height="2" rx="1" fill="var(--panel)"/>
  </svg>
)

export const IconCart = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 4h2l2.2 9.2A2 2 0 0 0 9.15 15h7.7a2 2 0 0 0 1.95-1.6L20 7H7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="20" r="1.8" fill="currentColor"/>
    <circle cx="17" cy="20" r="1.8" fill="currentColor"/>
  </svg>
)

export const IconBot = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="4" y="7" width="16" height="12" rx="4" fill="currentColor"/>
    <circle cx="9" cy="13" r="1.4" fill="var(--panel)"/>
    <circle cx="15" cy="13" r="1.4" fill="var(--panel)"/>
    <path d="M12 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="2" r="1.2" fill="currentColor"/>
  </svg>
)


