import React from 'react'

export default function BrandLogo({ size = 'md', showWordmark = true, compact = false }) {
  const sizeMap = {
    sm: { box: 30, text: 16, mark: 11 },
    md: { box: 36, text: 20, mark: 12 },
    lg: { box: 80, text: 32, mark: 15 }
  }

  const s = sizeMap[size] || sizeMap.md

  return (
    <div className={`brand-logo ${compact ? 'compact' : ''}`}>
      <div
        className="brand-logo-mark"
        style={{ width: s.box, height: s.box, fontSize: s.mark }}
        aria-hidden="true"
      >
        RW
      </div>
      {showWordmark && (
        <span className="brand-logo-wordmark" style={{ fontSize: s.text }}>
          Repairwale
        </span>
      )}
    </div>
  )
}
