'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import mayaImage from '../../public/maya2.png'

// Custom hook for typewriter effect - character by character typing
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Start typing after 300ms delay
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, 300)

    return () => clearTimeout(startTimeout)
  }, [])

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (hasStarted && currentIndex >= text.length) {
      // Typing finished
      setIsTyping(false)
    }
  }, [currentIndex, text, speed, hasStarted])

  // Reset when text changes
  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setIsTyping(true)
    setHasStarted(false)
  }, [text])

  return { displayText, isTyping }
}

// Avatar Text Component that can be animated
interface AvatarTextProps {
  onTypingComplete?: () => void
  isShootingUp?: boolean
  message?: string
}

export default function AvatarText({ onTypingComplete, isShootingUp = false, message = "Hey Keren, I'm Maya. I'll get you insured in no time. What would you like?" }: AvatarTextProps) {
  const { displayText, isTyping } = useTypewriter(message, 3) // 30ms delay between characters

  // Call onTypingComplete when typing finishes
  React.useEffect(() => {
    if (!isTyping && displayText === message) {
      onTypingComplete?.()
    }
  }, [isTyping, displayText, message, onTypingComplete])

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ease-in-out ${
      isShootingUp ? 'transform -translate-y-[200px] opacity-0 scale-100' : 'transform translate-y-0 opacity-100 scale-100'
    }`}>
      <div className="flex flex-col gap-3 pb-6 pt-8 px-6 w-full">
        {/* Avatar */}
        <div className="flex gap-2 items-start">
          <div className="relative shrink-0 w-8 h-8">
            <div className="absolute inset-0 rounded-[36px] overflow-hidden">
              <Image
                src={mayaImage}
                alt="Maya"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div className="font-lato font-bold text-[#4a4a4a] text-base relative">
          <p className="leading-[1.47]">
            {displayText}
            {isTyping && (
              <span 
                className="absolute w-[2px] h-5 ml-1 animate-pulse"
                style={{ backgroundColor: '#ff0083' }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
