'use client'

import React, { useEffect, useState, useRef } from 'react'

interface SlotMachineNumberProps {
  value: number
  className?: string
}

export default function SlotMachineNumber({ value, className = '' }: SlotMachineNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousValueRef = useRef(value)
  const animationKeyRef = useRef(0)

  useEffect(() => {
    if (previousValueRef.current !== value) {
      setIsAnimating(true)
      animationKeyRef.current += 1
      
      // Small delay to ensure animation starts
      setTimeout(() => {
        setDisplayValue(value)
        // Animation duration is handled by CSS transition
        setTimeout(() => {
          setIsAnimating(false)
        }, 400) // Match CSS transition duration
      }, 50)
      previousValueRef.current = value
    }
  }, [value])

  // Convert number to string
  const valueString = displayValue.toString()
  const digits = valueString.split('').map(d => parseInt(d))

  return (
    <span className={`inline-flex ${className}`} style={{ marginTop: '0px' }}>
      {digits.map((digit, index) => (
        <SlotDigit
          key={`${animationKeyRef.current}-${index}`}
          digit={digit}
          delay={index * 20} // Stagger animation
        />
      ))}
    </span>
  )
}

interface SlotDigitProps {
  digit: number
  delay: number
}

function SlotDigit({ digit, delay }: SlotDigitProps) {
  const [currentPosition, setCurrentPosition] = useState(digit)
  const [isAnimating, setIsAnimating] = useState(false)
  const previousDigitRef = useRef(digit)
  const digitHeight = 40

  useEffect(() => {
    if (previousDigitRef.current !== digit) {
      setIsAnimating(true)
      // Add extra rotations for slot machine effect (1-2 full rotations)
      const rotations = 1 + Math.floor(Math.random() * 2)
      const extraOffset = rotations * 10
      const startPosition = previousDigitRef.current - extraOffset
      
      // Set initial position off-screen
      setCurrentPosition(startPosition)
      
      // Trigger animation to target digit
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentPosition(digit)
          setTimeout(() => {
            setIsAnimating(false)
          }, 400)
        })
      })
      previousDigitRef.current = digit
    }
  }, [digit])

  // Generate all digits 0-9 for the rolling effect (extend for smooth scrolling)
  const allDigits = Array.from({ length: 30 }, (_, i) => i % 10)

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{
        height: `${digitHeight}px`,
        lineHeight: `${digitHeight}px`,
        width: '0.6em',
      }}
    >
      <span
        className="inline-block"
        style={{
          transform: `translateY(${-currentPosition * digitHeight}px)`,
          transition: isAnimating 
            ? `transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`
            : 'none',
        }}
      >
        {allDigits.map((d, index) => (
          <span
            key={index}
            className="block"
            style={{
              height: `${digitHeight}px`,
              lineHeight: `${digitHeight}px`,
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}
