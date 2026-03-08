'use client'

import React from 'react'
import Button from './Button'

interface ButtonConfig {
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

interface StackedButtonsProps {
  buttons: ButtonConfig[] 
  className?: string
}

export default function StackedButtons({ buttons, className = '' }: StackedButtonsProps) {

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          disabled={button.disabled}
          onClick={button.onClick}
          className="w-full"
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}
