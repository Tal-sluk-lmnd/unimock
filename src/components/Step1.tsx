'use client'

import React, { useState } from 'react'
import AvatarText from './AvatarText'
import VerticalPackages from './VerticalPackages'
import SimpleForm from './SimpleForm'
import ContentSection from './ContentSection'
import UserTextBubble from './UserTextBubble'
import Button from './Button'
import Spinner from './Spinner'
import { packageConfigs } from '../data/packageData'

interface Step1Props {
  onNext: (avatarMessage?: string, userResponse?: string) => void
  showBottomButtons?: boolean
  disableHistory?: boolean
}

export default function Step1({ onNext, showBottomButtons = true, disableHistory = false }: Step1Props) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<number | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showUserBubble, setShowUserBubble] = useState(false)
  const [isBubbleShootingUp, setIsBubbleShootingUp] = useState(false)

  const handleTypingComplete = () => {
    setIsTypingComplete(true)
  }

  const handlePackageSelect = (index: number) => {
    setSelectedPackage(index)
  }

  const handleNextClick = () => {
    // Start the transition animation
    setIsTransitioning(true)
    
    // Show user bubble after a short delay
    setTimeout(() => {
      setShowUserBubble(true)
    }, 100)
    
    // Start bubble shooting up animation
    setTimeout(() => {
      setIsBubbleShootingUp(true)
    }, 1000)
    
    // Complete transition and move to next step
    setTimeout(() => {
      onNext(
        "Hey Keren, I'm Maya. I'll get you insured in no time. What would you like?",
        "I'll go with the Premium package"
      )
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Avatar Content */}
      <div className="pt-16">
        <AvatarText 
          onTypingComplete={handleTypingComplete} 
          isShootingUp={isBubbleShootingUp}
          message="Hey Keren, I'm Maya. I'll get you insured in no time. What would you like?"
        />
      </div>

      {/* Content Section - Only render after typing is complete */}
      <ContentSection show={isTypingComplete}>
        <div className="relative">
          {/* User Text Bubble */}
          <UserTextBubble 
            text="I'll go with the Premium package"
            isVisible={showUserBubble}
            isShootingUp={isBubbleShootingUp}
          />
          
          {/* Main Content with transition animations */}
          <div className={`flex flex-col gap-6 w-full transition-all duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
              <SimpleForm />
          </div>
        </div>
      </ContentSection>

      {/* Fixed Bottom Button - Only show if showBottomButtons is true */}
      {showBottomButtons && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-gradient-to-b from-transparent via-white/80 to-white px-6 py-7">
            <div className="flex flex-col gap-6 items-center w-full">
              <Button
                onClick={handleNextClick}
                disabled={isTransitioning}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {isTransitioning ? (
                  <div className="flex items-center justify-center">
                    <Spinner size="md" color="white" />
                  </div>
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
