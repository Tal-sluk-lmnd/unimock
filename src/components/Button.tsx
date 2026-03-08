'use client'

import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  // Base button classes
  const baseClasses = "font-lato font-bold transition-all duration-200 flex items-center justify-center border-none outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return "h-10 px-4 text-sm leading-[1.47] rounded-md"
      case 'lg':
        return "h-16 px-6 text-lg leading-[1.47] rounded-lg"
      case 'md':
      default:
        return "h-14 px-5 text-base leading-[1.47] rounded-lg"
    }
  }
  
  // Variant classes
  const getVariantClasses = () => {
    if (disabled) {
      return "bg-gray-100 text-gray-400 cursor-not-allowed"
    }
    
    switch (variant) {
      case 'secondary':
        return "bg-white button-border-important hover:button-border-important-hover hover:bg-gray-100 shadow-sm hover:shadow-lg active:bg-gray-400 focus:ring-gray-500"
      case 'outline':
        return "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:ring-gray-500"
      case 'primary':
      default:
        return "bg-[#ff0083] text-white shadow-glow hover:shadow-glow-lg active:shadow-glow focus:ring-gray-500"
    }
  }
  
  const buttonClasses = `${baseClasses} ${getSizeClasses()} ${getVariantClasses()} ${className}`.trim()
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  )
}
