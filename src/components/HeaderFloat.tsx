'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'

// Custom hook to track viewport width
function useViewportWidth() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth)

    // Update width on resize
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

// Progress Circles Component
function ProgressCircles() {
  return (
    <div className="relative w-7 h-7 flex-shrink-0">
      {/* Base circle */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute inset-0">
        <circle cx="14" cy="14" r="12" stroke="#DADADA" strokeWidth="4" fill="none"/>
      </svg>
      {/* Progress circle (pink) */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute inset-0 transform -rotate-90">
        <circle 
          cx="14" 
          cy="14" 
          r="12" 
          stroke="#FF0083" 
          strokeWidth="4" 
          fill="none"
          strokeDasharray="75.4"
          strokeDashoffset="56.55"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Badge Component with number and GIF
function Badge({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div 
      className="absolute -top-2 -right-2 bg-[#ffebf5] border border-[#f9cfe4] rounded-[19px] px-1.5 py-1 flex items-center gap-1 z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: isVisible ? 0.01 : 0 // Delay when appearing to match overflow timing
      }}
    >
      {/* Number */}
      <span className="text-[#ff0083] text-sm font-bold leading-3">3</span>
      {/* GIF */}
      <div className="w-3 h-3 relative overflow-hidden rounded-sm">
        <img 
          src="/Intro_Loop%20big.gif" 
          alt="" 
          className="absolute inset-0 object-cover"
          style={{ 
            mixBlendMode: 'darken',
            transform: 'scale(2.5) rotate(7deg)',
            transformOrigin: 'center'
          }}
        />
      </div>
    </motion.div>
  );
}

// Benefit Item Component
function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="#FF0083" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-[#4a4a4a] text-base leading-[1.47]">{text}</p>
    </div>
  );
}

// Discount Banner Component
function DiscountBanner() {
  return (
    <div className="bg-[#ffebf5] border border-[#f9cfe4] rounded-2xl p-4 relative">
      {/* Celebration GIFs positioned around the banner */}
      {/* Top-left large diamond */}
      <div className="absolute bottom-[-6px] left-4 w-8 h-8 flex items-center justify-center mix-blend-darken">
        <img 
          src="/Intro_Loop%20big.gif" 
          alt="celebration" 
          className="w-full h-full object-cover rounded-full"
          style={{ 
            transform: 'scale(4) rotate(-7deg)',
            transformOrigin: 'center'
          }}
        />
      </div>
      
      {/* Top-right large diamond */}
      <div className="absolute top-[-6px] right-4 w-8 h-8 flex items-center justify-center mix-blend-darken">
        <img 
          src="/Intro_Loop%20big.gif" 
          alt="celebration" 
          className="w-full h-full object-cover rounded-full"
          style={{ 
            transform: 'scale(4) rotate(7deg)',
            transformOrigin: 'center'
          }}
        />
      </div>
      
      {/* Left side medium diamond */}
      <div className="absolute top-[3px] left-4 w-6 h-6 flex items-center justify-center transform -translate-y-1/2 mix-blend-darken">
        <img 
          src="/Intro_Loop%20big.gif" 
          alt="celebration" 
          className="w-full h-full object-cover rounded-full"
          style={{ 
            transform: 'scale(2) rotate(15deg)',
            transformOrigin: 'center'
          }}
        />
      </div>
      
      {/* Right side medium diamond */}
      <div className="absolute top-[60px] right-6 w-6 h-6 flex items-center justify-center transform -translate-y-1/2 mix-blend-darken">
        <img 
          src="/Intro_Loop%20big.gif" 
          alt="celebration" 
          className="w-full h-full object-cover rounded-full"
          style={{ 
            transform: 'scale(2) rotate(-15deg)',
            transformOrigin: 'center'
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-[#ff0083] text-base font-regular leading-[15px]">3 Discounts unlocked!</p>
        <p className="text-[#ff0083] text-2xl font-bold leading-[1.34] tracking-[-0.8px]">
          -$24.45<span className="tracking-[-0.48px]">/mo</span>
        </p>
      </div>
    </div>
  );
}

// Discount Item Component
function DiscountItem({ title, amount }: { title: string; amount: string }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="#FF0083" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-[#4a4a4a] text-base leading-[1.47] flex-1">{title}</p>
      <p className="text-[#4a4a4a] text-xl font-bold leading-[1.34] tracking-[-0.8px]">{amount}</p>
    </div>
  );
}

// Progress Steps Component
function ProgressSteps() {
  const steps = [
    { id: 1, name: "Your pet", isActive: true, isPast: false },
    { id: 2, name: "Coverage", isActive: false, isPast: false },
    { id: 3, name: "Payment", isActive: false, isPast: false },
    { id: 4, name: "Review", isActive: false, isPast: false },
    { id: 5, name: "Confirm", isActive: false, isPast: false },
    { id: 6, name: "Complete", isActive: false, isPast: false }
  ];

  const currentStep = steps.findIndex(step => step.isActive) + 1;
  const totalSteps = steps.length;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to center the active step
  useEffect(() => {
    if (activeStepRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = activeStepRef.current;
      
      // Calculate the center position
      const containerWidth = container.clientWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.clientWidth;
      
      // Scroll to center the active element
      const scrollLeft = elementLeft - (containerWidth / 2) + (elementWidth / 2);
      
      // Ensure we don't scroll to negative values
      const finalScrollLeft = Math.max(0, scrollLeft);
      
      container.scrollTo({
        left: finalScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);


  // Calculate padding to ensure first step can be centered
  const getPaddingForCentering = () => {
    const activeStepIndex = steps.findIndex(step => step.isActive);
    
    // Add substantial left padding so first steps can be centered
    // This creates space on the left for centering early steps
    return 'pl-32 pr-5';
  };

  return (
    <div className="flex flex-col items-center gap-1.5 relative">
      {/* Left gradient overlay - fixed to parent container */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
      
      {/* Right gradient overlay - fixed to parent container */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
      
      {/* Scrollable progress container */}
      <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-hide">
        <div className={`relative flex items-center justify-start min-w-max py-2 gap-8 ${getPaddingForCentering()}`}>
          {/* Background line - calculated based on step positions */}
          <div 
            className="absolute top-4 h-[3px] bg-gray-300"
            style={{
              left: '150px', // Account for pl-32 padding
              width: `${(steps.length - 1) * 84}px` // 6 steps = 5 gaps * 80px per gap
            }}
          ></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              ref={step.isActive ? activeStepRef : null}
              className="flex flex-col items-center relative z-10 flex-shrink-0"
            >
              {/* Step dot */}
              <div className={`w-4 h-4 rounded-full flex items-center justify-center mb-2 ${
                step.isActive 
                  ? 'bg-[#FF0083]' 
                  : step.isPast
                  ? 'bg-gray-300'
                  : 'bg-gray-300'
              }`}>
                {step.isPast ? (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </div>
              
              {/* Step label */}
              <span className={`text-sm leading-3 whitespace-nowrap ${
                step.isActive ? 'font-bold' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step counter */}
      <span className="text-xs mr-1.5 text-gray-400">Step {currentStep} of {totalSteps}</span>
    </div>
  );
}

// Floating Island Component
function FloatingIsland({ isExpanded, onClick, showDiscounts, onFullDetailsClick, onBackClick }: { 
  isExpanded: boolean; 
  onClick: () => void;
  showDiscounts: boolean;
  onFullDetailsClick: () => void;
  onBackClick: () => void;
}) {
  const viewportWidth = useViewportWidth()
  const expandedWidth = viewportWidth - 32 // 100vw - 32px
  const [allowOverflow, setAllowOverflow] = useState(false)

  // Log viewport width for debugging
  useEffect(() => {
    if (viewportWidth > 0) {
      console.log('Viewport width:', viewportWidth, 'px')
      console.log('Expanded width will be:', expandedWidth, 'px')
    }
  }, [viewportWidth, expandedWidth])

  // Handle overflow visibility with delay
  useEffect(() => {
    if (isExpanded) {
      // When expanding, immediately hide overflow
      setAllowOverflow(false)
    } else {
      // When collapsing, delay allowing overflow until animation completes
      const timer = setTimeout(() => {
        setAllowOverflow(true)
      }, 400) // Slightly longer than the closing animation duration
      
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  return (
    <motion.div
      className="absolute bg-white left-1/2 transform -translate-x-1/2 rounded-full shadow-special border border-gray-100/50 cursor-pointer pointer-events-auto"
      style={{ zIndex: isExpanded ? 120 : 100, top: 12, overflow: allowOverflow ? 'visible' : 'hidden' }}
      onClick={onClick}
      initial={{
        width: 240,
        height: 56,
        borderRadius: 26,
        padding: 12,
      }}
      animate={{
        width: isExpanded ? expandedWidth : 240,
        height: isExpanded ? (showDiscounts ? 312 : 470) : 56,
        borderRadius: isExpanded ? 24 : 26,
        padding: isExpanded ? 20 : 12,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Collapsed Content - fades out when expanded */}
      <motion.div 
        className="flex items-center justify-between h-full w-full"
        animate={{
          opacity: isExpanded ? 0 : 1,
          y: isExpanded ? -10 : 0,
          display: isExpanded ? "none" : "flex",
        }}
        transition={{
          duration: 0.1,
          ease: "easeInOut"
        }}
      >
        {/* Left side - Progress Circles and Step Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center">
            <ProgressCircles />
          </div>
          <div className="min-w-0 flex-1 flex flex-col items-start">
            <span className="text-[11px] text-[#8c8c8c] leading-[0.87] font-bold">1 of 6</span>
            <span className="text-sm font-bold text-[#4a4a4a] leading-[1.47] whitespace-nowrap">Your pet</span>
          </div>
        </div>
        
        {/* Right side - Price */}
        <div className="text-right flex-shrink-0 ml-4 flex items-center">
          <span className="text-sm font-bold text-[#4a4a4a] whitespace-nowrap">
            $13.09<span className="font-normal">/mo</span>
          </span>
        </div>
      </motion.div>

      {/* Expanded Content - fades in when expanded */}
      <motion.div
        className="w-full h-full flex flex-col justify-start"
        style={{ overflow: 'hidden' }}
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : 5,
          display: isExpanded ? "flex" : "none",
        }}
        transition={{
          duration: isExpanded ? 0.3 : 0.05,
          ease: "easeOut",
          delay: isExpanded ? 0.1 : 0,
          opacity: {
            duration: isExpanded ? 0.3 : 0.02,
            delay: isExpanded ? 0.1 : 0
          }
        }}
      >
        {/* Static Header - doesn't fade */}
        <div className="flex items-center justify-between w-full mb-4">
          {showDiscounts ? (
            /* Back button for discount view */
            <button 
              className="w-5 h-5 flex items-center justify-center flex-shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onBackClick();
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            /* Empty space for plan view */
            <div className="opacity-0 w-5 h-5 flex-shrink-0"></div>
          )}
          
          {/* Title */}
          <p className="text-sm font-bold text-[#4a4a4a] leading-[1.47] flex-1 text-center">
            {showDiscounts ? "Discounts" : "Fluffy's plan"}
          </p>
          
          {/* Close button */}
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Divider - only show in plan view */}
        {!showDiscounts && <div className="h-[1px] bg-gray-200 w-full mb-4"></div>}

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          {!showDiscounts ? (
            /* Fluffy's Plan Content */
            <motion.div 
              key="plan-view"
              className="flex flex-col gap-4 max-h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Pricing section */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col items-start">
                  <div className="text-[#7b7b7b] text-md text-base line-through">
                    $34.18
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-[#4a4a4a] font-bold text-3xl">$13.09/</span>
                    <span className="text-[#4a4a4a] text-base text-lg">month</span>
                  </div>
                </div>
                
                {/* Benefits list */}
                <div className="flex flex-col gap-1">
                  <BenefitItem text="Diagnostics" />
                  <BenefitItem text="Procedures" />
                  <BenefitItem text="Medications" />
                  <BenefitItem text="Vet visits fee" />
                </div>
              </div>
              
              {/* Discount notification */}
              <div className="bg-[#ffebf5] border border-[#f9cfe4] rounded-2xl p-4 flex items-center justify-between cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onFullDetailsClick();
              }}>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[#ff0083] text-md font-bold text-base leading-[15px]">3 Discounts unlocked!</p>
                  <p className="text-[#ff0083] text-sm leading-[15px] underline">Full details</p>
                </div>
                <div className="w-7 h-7 flex items-center justify-center mr-1">
                  <img 
                    src="/Intro_Loop%20big.gif" 
                    alt="celebration" 
                    className="w-full h-full object-cover rounded-full"
                    style={{ 
                      mixBlendMode: 'darken',
                      transform: 'scale(4) rotate(7deg)',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gray-200 w-full"></div>
              
              {/* Progress Steps */}
              <ProgressSteps />
            </motion.div>
          ) : (
            /* Discounts Content */
            <motion.div 
              key="discount-view"
              className="flex flex-col gap-4 max-h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Discount Banner */}
              <DiscountBanner />
              
              {/* Divider */}
              <div className="h-[1px] bg-gray-200 w-full"></div>
              
              {/* Discount List */}
              <div className="flex flex-col gap-3 w-full">
                <DiscountItem title="First pet parent" amount="-$7.45/mo" />
                <DiscountItem title="No previous claims" amount="-$11.45/mo" />
                <DiscountItem title="Vet clinic nearby" amount="-$6.45/mo" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Badge - only show when collapsed */}
      {!isExpanded && <Badge isVisible={allowOverflow} />}
    </motion.div>
  )
}

interface HeaderFloatProps {
  currentStep?: number
  onPrevious?: () => void
}

export default function HeaderFloat({ currentStep = 1, onPrevious }: HeaderFloatProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDiscounts, setShowDiscounts] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    // Reset discount view when collapsing
    if (isExpanded) {
      setShowDiscounts(false)
    }
  }

  const handleFullDetailsClick = () => {
    setShowDiscounts(true)
  }

  const handleBackClick = () => {
    setShowDiscounts(false)
  }

  const showBackButton = currentStep > 1 && onPrevious

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/40 backdrop-blur-sm bg-white/90">
        <div className="flex items-center justify-between px-3 h-20">
          {/* Logo Button or Back Button */}
          <div className="flex items-center">
            {showBackButton ? (
              <button 
                className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={onPrevious}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ) : (
              <button className="w-10 h-10 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M16.6602 1.68115C18.9385 1.7291 20.0313 3.98147 19.2598 6.62451C17.9411 11.1408 14.0836 11.1413 14.04 11.1411C14.0374 11.16 13.7934 12.9103 13.4951 14.7476C13.2119 16.4928 12.9521 17.5688 12.9521 17.5688C12.9787 17.5793 14.0583 18.0082 15.6094 19.6138C16.9972 21.0504 17.7473 22.1777 17.4072 22.5005C17.1727 22.7228 16.7244 22.3086 15.874 21.522C15.5986 21.2672 15.2804 20.9728 14.9141 20.6489C13.5706 19.461 12.6219 19.0017 12.6113 18.9966C12.6113 18.9966 11.6955 22.311 6.84863 21.8315C2.71606 21.4223 3.08759 17.2817 6.46484 16.5835C8.66286 16.1295 10.7295 16.7749 10.7295 16.7749C10.7333 16.7554 11.0674 15.0227 11.2627 13.644C11.4645 12.2193 11.5997 11.0546 11.6006 11.0474C11.5659 11.0428 8.32223 10.6082 7.58691 7.98486C7.36873 7.20535 8.06951 6.82385 8.53418 7.64404C9.51667 9.37853 11.7412 9.66846 11.7412 9.66846C12.5765 3.64737 14.3593 1.63306 16.6602 1.68115ZM10.3516 18.1489C10.3399 18.1441 8.87389 17.5398 7.11719 17.9194C5.18695 18.3367 5.30263 19.9527 7.4043 20.0298C9.88302 20.1208 10.3431 18.1855 10.3516 18.1489ZM16.7383 3.69482C14.9867 3.5525 14.2526 9.61957 14.2461 9.67334C14.2821 9.67173 16.5695 9.55771 17.5303 6.51123C17.8607 5.46387 17.9522 3.79389 16.7383 3.69482Z" fill="#4A4A4A"/>
                </svg>
              </button>
            )}
          </div>

          {/* Menu Button */}
          <div className="flex items-center">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Island Container - Fixed to viewport */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none" style={{ zIndex: isExpanded ? 110 : 60 }}>
        <div className="relative w-full h-full">
          <FloatingIsland 
            isExpanded={isExpanded} 
            onClick={toggleExpanded}
            showDiscounts={showDiscounts}
            onFullDetailsClick={handleFullDetailsClick}
            onBackClick={handleBackClick}
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/40"
            style={{ zIndex: 90 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleExpanded}
          />
        )}
      </AnimatePresence>
    </>
  )
}
