'use client'

import React, { useState } from 'react'
import AvatarText from './AvatarText'
import VerticalPackages from './VerticalPackages'
import ContentSection from './ContentSection'
import MarketingCard from './MarketingCard'
import SimpleForm from './SimpleForm'
import UserTextBubble from './UserTextBubble'
import Button from './Button'
import Spinner from './Spinner'
import { packageConfigs } from '../data/packageData'

interface Step2Props {
  onNext: (avatarMessage?: string, userResponse?: string) => void
  onPrevious: () => void
  showBottomButtons?: boolean
  disableHistory?: boolean
}

export default function Step2({ onNext, onPrevious, showBottomButtons = true, disableHistory = false }: Step2Props) {
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
    }, 300)
    
    // Start bubble shooting up animation
    setTimeout(() => {
      setIsBubbleShootingUp(true)
    }, 2000)
    
    // Complete transition and move to next step
    setTimeout(() => {
      onNext(
        "Great choice! Now let's get some additional information from you.",
        "Perfect! Let me fill out the form"
      )
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Avatar Content */}
      <div className="pt-16 pb-4">
        <AvatarText 
          onTypingComplete={handleTypingComplete} 
          isShootingUp={isBubbleShootingUp}
          message="Great choice! Now let's get some additional information from you."
        />
      </div>

      {/* Content Section - Only render after typing is complete */}
      <ContentSection show={isTypingComplete}>
        <div className="relative">
          {/* User Text Bubble */}
          <UserTextBubble 
            text="Perfect! Let me fill out the form"
            isVisible={showUserBubble}
            isShootingUp={isBubbleShootingUp}
          />
          
          {/* Main Content with transition animations */}
          <div className={`flex flex-col gap-6 w-full transition-all duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
            {/* Different content for Step 2 - Form example */}
            <div className="py-4">
              <SimpleForm />
            </div>
            
            <VerticalPackages 
              packages={packageConfigs} 
              selectedPackage={selectedPackage}
              onPackageSelect={handlePackageSelect}
            />
            
            {/* Marketing Card Example with different content */}
            <div className="py-4">
              <MarketingCard
                title="Step 2: Additional Information"
                content="This is the second step where you can provide additional information and see different components. Notice how the form appears above the packages now."
                primaryButtonText="Continue"
                secondaryButtonText="Back to Step 1"
                tag="Step 2"
                primaryButtonOnClick={() => console.log('Continue clicked')}
                secondaryButtonOnClick={() => console.log('Back clicked')}
              />
            </div>
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
