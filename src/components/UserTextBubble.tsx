'use client'

import React from 'react'

interface UserTextBubbleProps {
  text: string
  isVisible: boolean
  isShootingUp: boolean
}

export default function UserTextBubble({ text, isVisible, isShootingUp }: UserTextBubbleProps) {
  return (
    <div 
      className={`absolute top-4 right-4 z-40 transition-all duration-700 ease-inout ${
        isShootingUp 
          ? ' -translate-y-[190px] scale-100' 
          : isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-100'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{text}</p>
        </div>
      </div>
    </div>
  )
}
