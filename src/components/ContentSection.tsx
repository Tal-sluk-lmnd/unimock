'use client'

import React from 'react'

interface ContentSectionProps {
  children: React.ReactNode
  className?: string
  show?: boolean
}

export default function ContentSection({ 
  children, 
  className = "", 
  show = true 
}: ContentSectionProps) {
  if (!show) return null

  return (
    <div className={`px-6 pb-32 section-entrance ${className}`}>
      {children}
    </div>
  )
}
