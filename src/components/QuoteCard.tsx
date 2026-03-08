'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Button from './Button'
import SlotMachineNumber from './SlotMachineNumber'

type BadgeAnimationType = 'scale' | 'line'

interface QuoteCardProps {
  onContinue?: () => void
  badgeAnimation?: BadgeAnimationType
}

export default function QuoteCard({ onContinue, badgeAnimation = 'line' }: QuoteCardProps) {
  const [miles, setMiles] = useState(0)
  const [committedMiles, setCommittedMiles] = useState(0) // Only updates when slider is released
  const [isSliderComplete, setIsSliderComplete] = useState(false)
  const [hasShownBadge, setHasShownBadge] = useState(false)
  const [showShimmer, setShowShimmer] = useState(false)
  const maxMiles = 1400
  const shimmerTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sliderContainerRef = useRef<HTMLDivElement | null>(null)

  // Price calculation constants
  const basePrice = 113
  const baseDiscount = 40 // Base discount applied from the start
  const pricePerMile = 0.24
  const fsdPricePerMile = 0.12 // Half of pricePerMile

  // Calculate regular price based on miles
  const calculatePrice = (milesValue: number): number => {
    const calculatedPrice = basePrice + (milesValue * pricePerMile)
    return Math.round(calculatedPrice)
  }

  // Calculate FSD-adjusted price based on miles
  const calculateFSDPrice = (milesValue: number): number => {
    const calculatedPrice = basePrice + (milesValue * fsdPricePerMile)
    return Math.round(calculatedPrice)
  }

  // Calculate FSD savings
  const calculateFSDSavings = (milesValue: number): number => {
    return calculatePrice(milesValue) - calculateFSDPrice(milesValue)
  }

  // Calculate the crossed-out original price (regular price + base discount + FSD savings)
  // This shows the total price before all discounts are applied
  const calculateOriginalPrice = (milesValue: number): number => {
    const regularPriceValue = calculatePrice(milesValue)
    const fsdSavingsValue = calculateFSDSavings(milesValue)
    return regularPriceValue + baseDiscount + fsdSavingsValue
  }

  // Memoized price calculations - only update when slider is released (committedMiles)
  const regularPrice = useMemo(() => calculatePrice(committedMiles), [committedMiles])
  const fsdPrice = useMemo(() => calculateFSDPrice(committedMiles), [committedMiles])
  const fsdSavings = useMemo(() => calculateFSDSavings(committedMiles), [committedMiles])
  const originalPrice = useMemo(() => calculateOriginalPrice(committedMiles), [committedMiles])
  
  // Display FSD-adjusted price
  const price = fsdPrice

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(2000, Number(e.target.value)))
    setMiles(value)
  }

  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(2000, Number(e.target.value)))
    setMiles(value)
  }

  const handleSliderMouseDown = () => {
    setIsSliderComplete(false)
  }

  const handleSliderMouseUp = () => {
    setIsSliderComplete(true)
    setCommittedMiles(miles) // Commit the miles value when slider is released
    // Mark badge as shown once slider completes for the first time
    if (miles > 0 && !hasShownBadge) {
      triggerBadgeAppear()
    }
  }

  const handleSliderTouchStart = () => {
    setIsSliderComplete(false)
  }

  const handleSliderTouchEnd = () => {
    setIsSliderComplete(true)
    setCommittedMiles(miles) // Commit the miles value when slider is released
    // Mark badge as shown once slider completes for the first time
    if (miles > 0 && !hasShownBadge) {
      triggerBadgeAppear()
    }
  }

  const handleSliderKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Commit the value on keyboard navigation (arrow keys, etc.)
    const value = Number((e.target as HTMLInputElement).value)
    if (value > 0) {
      setIsSliderComplete(true)
      setCommittedMiles(value)
      if (!hasShownBadge) {
        triggerBadgeAppear()
      }
    }
  }

  // Trigger badge appearance animation
  const triggerBadgeAppear = () => {
    setHasShownBadge(true)
  }

  // Effect to show badge when slider completes for the first time
  useEffect(() => {
    if (isSliderComplete && miles > 0 && !hasShownBadge) {
      triggerBadgeAppear()
    }
  }, [isSliderComplete, miles, hasShownBadge])

  // Effect to trigger shimmer when slider finishes moving and price updates
  useEffect(() => {
    // Trigger shimmer every time slider finishes moving and badge is shown
    if (hasShownBadge && isSliderComplete && committedMiles > 0 && fsdSavings > 0) {
      // Clear any existing timer
      if (shimmerTimerRef.current) {
        clearTimeout(shimmerTimerRef.current)
      }
      
      // Reset shimmer first to allow animation to restart
      setShowShimmer(false)
      
      // Use requestAnimationFrame to ensure state reset happens before setting to true
      const frameId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowShimmer(true)
          // Reset shimmer after animation completes (3s)
          shimmerTimerRef.current = setTimeout(() => {
            setShowShimmer(false)
            shimmerTimerRef.current = null
          }, 3000)
        })
      })
      
      return () => {
        cancelAnimationFrame(frameId)
        if (shimmerTimerRef.current) {
          clearTimeout(shimmerTimerRef.current)
          shimmerTimerRef.current = null
        }
      }
    }
  }, [committedMiles, hasShownBadge, isSliderComplete, fsdSavings])

  const sliderPercentage = (miles / maxMiles) * 100

  return (
    <div className="bg-white border border-[#ececec] flex flex-col gap-6 items-start overflow-hidden p-8 relative rounded-xl shadow-[0px_9px_49px_2px_rgba(32,32,32,0.07)] w-full">
      <div className="flex flex-col gap-5 items-start justify-center relative shrink-0 w-full">
        <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-1 items-start relative shrink-0 w-full">
            <div className="flex flex-col gap-1 items-start relative shrink-0">
              <p className="font-lato leading-[1.47] line-through relative shrink-0 text-base text-[#7b7b7b]">
                ${originalPrice.toFixed(2)}
              </p>
              <div className="flex items-baseline relative shrink-0 text-[#4a4a4a] w-[216px]">
                <div className="font-lato font-bold leading-[40px] relative shrink-0 text-[32px] flex items-start justify-end">
                  <span className="leading-[40px]">$</span>
                  <SlotMachineNumber value={price} className="leading-[40px]" />
                  <img 
                    src="/Intro_Loop big.gif" 
                    alt="Intro loop" 
                    className="absolute"
                    style={{
                      left: '100%',
                      marginLeft: '16px',
                      top: '50%',
                      transform: 'translateY(-50%) scale(0.8)'
                    }}
                  />
                </div>
                <p className="font-lato leading-6 relative shrink-0 text-base">
                  /mo.
                </p>
              </div>
            </div>
            <p className="font-lato leading-6 relative shrink-0 text-[#4a4a4a] text-base w-full">
              Estimate how your miles impact your price:
            </p>
          </div>
          <div className="flex flex-col gap-0 items-start relative shrink-0 w-full" ref={sliderContainerRef}>
            <div className="flex items-center gap-4 px-0 py-1 relative shrink-0 w-full h-10">
              <div className="basis-0 grow min-h-[32px] min-w-px relative shrink-0 flex items-center">
                {/* Slider track background */}
                <div className="absolute bg-[#ececec] h-1.5 left-0 right-0 rounded-full top-1/2 -translate-y-1/2" />
                {/* Slider track fill */}
                <div 
                  className="absolute bg-[#4a4a4a] h-1.5 left-0 rounded-full top-1/2 -translate-y-1/2"
                  style={{ width: `${sliderPercentage}%` }}
                />
                {/* Slider handle */}
                <div className="relative w-full h-full min-h-[32px]">
                  <input
                    type="range"
                    min="0"
                    max={maxMiles}
                    value={miles}
                    onChange={handleSliderChange}
                    onInput={handleSliderInput}
                    onMouseDown={handleSliderMouseDown}
                    onMouseUp={handleSliderMouseUp}
                    onTouchStart={handleSliderTouchStart}
                    onTouchEnd={handleSliderTouchEnd}
                    onKeyUp={handleSliderKeyUp}
                    className="absolute w-full opacity-0 cursor-pointer z-50"
                    style={{ 
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      touchAction: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      height: '80px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      margin: 0,
                      padding: 0,
                    }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-[#dadada] shadow-sm pointer-events-none"
                    style={{ 
                      left: `calc(${sliderPercentage}% - 12px)`,
                    }}
                  />
                </div>
              </div>
              {/* Miles counter - to the right of slider */}
              <div className="font-lato font-bold text-[#4a4a4a] text-base whitespace-nowrap shrink-0">
                <p className="leading-[1.47]">{miles.toLocaleString()} miles</p>
              </div>
            </div>
            {/* FSD Savings Text - outside badge, with swipe animation */}
            <div className="relative w-full">
              {/* Celebratory Stars - left side, positioned outside overflow container */}
              {hasShownBadge && committedMiles > 0 && (
                <img 
                  src="/starss.svg" 
                  alt="" 
                  className="celebration-stars w-10 h-10 absolute z-10 pointer-events-none"
                  style={{
                    left: '-2%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              {/* Celebratory Stars - right side, flipped horizontally and vertically */}
              {hasShownBadge && committedMiles > 0 && (
                <img 
                  src="/starss.svg" 
                  alt="" 
                  className="celebration-stars-flipped w-10 h-10 absolute z-10 pointer-events-none"
                  style={{
                    left: '38%',
                    top: '50%',
                  }}
                />
              )}
              <div 
                className="overflow-hidden w-full"
                style={{
                  height: hasShownBadge && committedMiles > 0 ? 'auto' : '0px',
                  opacity: hasShownBadge && committedMiles > 0 ? 1 : 0,
                  transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
                }}
              >
                <div 
                  className={`flex items-center gap-2 ${hasShownBadge && committedMiles > 0 ? 'fsd-text-swipe-in' : ''}`}
                >
                  {/* Text with shimmer effect - gradient animates through text only */}
                  <p className={`font-lato leading-[1.47] text-base flex items-center gap-1 ${showShimmer ? 'shimmer-text-effect' : 'text-[#4a4a4a]'}`}>
                    <span className="font-bold">${fsdSavings}/mo</span>
                    <span className="font-normal"> less with FSD</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="bg-[#dadada] h-px shrink-0 w-full"
          style={{
            marginTop: hasShownBadge && committedMiles > 0 && isSliderComplete ? '4px' : '0px',
            transition: 'margin 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
          }}
        />
        <div className="flex flex-col items-start relative shrink-0">
          <div className="flex gap-3 items-center relative shrink-0">
            <div className="flex flex-col font-lato justify-center leading-none relative shrink-0 text-base text-[#7b7b7b]">
              <p className="leading-[1.47]">2 cars, 2 drivers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center relative shrink-0">
        <div className="flex flex-col font-lato justify-center leading-none relative shrink-0 text-base text-[#4a4a4a]">
          <p className="leading-[1.47] underline cursor-pointer">
            Customize coverage
          </p>
        </div>
      </div>
      <Button
        onClick={onContinue}
        variant="primary"
        size="lg"
        className="w-full"
      >
        Continue to checkout
      </Button>
    </div>
  )
}
