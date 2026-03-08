'use client'

import React, { useState } from 'react'

interface InputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'number'
  className?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  required?: boolean
  icon?: React.ReactNode
  placeholder?: string
}

export default function Input({
  label = "Enter text",
  value,
  onChange,
  type = "text",
  className = "",
  disabled = false,
  error = false,
  errorMessage = "",
  required = false,
  icon,
  placeholder
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  // Check if label should be floating (focused or has value)
  const isLabelFloating = isFocused || value.length > 0

  // Determine border color based on state
  const getBorderColor = () => {
    if (disabled) return "border-gray-200"
    if (error) return "border-red-500"
    if (isFocused) return "border-gray-400"
    return "border-gray-300"
  }

  // Determine background color based on state
  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-50"
    return "bg-white"
  }

  // Determine text color based on state
  const getTextColor = () => {
    if (disabled) return "text-gray-400"
    if (error) return "text-red-600"
    return "text-[#4a4a4a]"
  }

  // Determine label color based on state
  const getLabelColor = () => {
    if (disabled) return "text-gray-300"
    if (error) return "text-red-500"
    if (isFocused) return "text-gray-600"
    return "text-gray-400"
  }

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className={`${getBackgroundColor()} relative flex h-14 ${icon ? 'pl-12' : 'pl-5'} pr-3 py-2 rounded-md border ${getBorderColor()} w-full transition-colors duration-200 ${!disabled ? 'hover:border-gray-400' : ''}`}>
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {/* Floating Label */}
        <label 
          className={`absolute ${icon ? 'left-12' : 'left-5'} transition-all duration-200 ease-in-out pointer-events-none font-lato ${
            isLabelFloating 
              ? 'top-2 text-xs transform -translate-y-0' 
              : 'top-1/2 text-base transform -translate-y-1/2'
          } ${getLabelColor()}`}
        >
          {label}
          {error && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full h-full ${getTextColor()} text-base bg-transparent border-none outline-none font-lato disabled:opacity-50 disabled:cursor-not-allowed ${
            isLabelFloating ? 'pt-4' : 'pt-0'
          }`}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      {error && errorMessage && (
        <div className="text-red-500 text-xs mt-1">
          <p className="leading-[1.47]">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}
