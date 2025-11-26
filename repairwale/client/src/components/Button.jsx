import React from 'react'

export default function Button({ children, variant = 'primary', size = 'md', full = false, className = '', ...props }){
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
  const fullClass = full ? 'btn-full' : ''
  return (
    <button className={`btn btn-${variant} ${sizeClass} ${fullClass} ${className}`.trim()} {...props}>{children}</button>
  )
}
