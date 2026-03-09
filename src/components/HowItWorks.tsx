'use client'

import React, { useState, useEffect } from 'react'
import Button from './Button'

interface HowItWorksProps {
  onNext: () => void
}

const FEATURES = [
  {
    title: 'Sync your Tesla',
    description: "Connect to your car's ecosystem seamlessly with Lemonade API.",
  },
  {
    title: 'When not driving',
    description: 'Stay covered for the unexpected like falling branches or hail while parked',
  },
  {
    title: 'When driving',
    description: 'Your price adjusts to your actual mileage, with a 50% off for FSD miles.',
  },
]

export default function HowItWorks({ onNext }: HowItWorksProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen relative"
      style={{ paddingTop: '0px', paddingBottom: '160px', backgroundColor: '#FFFFFF' }}
    >
        <div className="container mx-auto px-6 py-8 max-w-2xl flex flex-col gap-10 relative mt-[60px]">
        {/* Intro text */}
        <p
          className="font-lato font-bold text-[16px] leading-[1.47] text-[#4a4a4a] transition-all duration-500"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          Your coverage is powered by how you actually use your Tesla, Here's how it works:
        </p>

        {/* Feature rows */}
        <div className="flex flex-col gap-8">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="flex items-start gap-5 transition-all duration-500"
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: `${(i + 1) * 150}ms`,
              }}
            >
              <div className="w-[64px] h-[64px] rounded-full bg-[#ececec] shrink-0" />
              <div className="flex flex-col gap-1 pt-1">
                <p className="font-lato font-bold text-[16px] leading-[1.47] text-[#4a4a4a]">
                  {feature.title}
                </p>
                <p className="font-lato text-[14px] leading-[1.47] text-[#4a4a4a]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 pt-[72px] pb-6 flex flex-col items-center z-50 transition-opacity duration-500"
        style={{
          opacity: entered ? 1 : 0,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 41.67%)',
        }}
      >
        <div className="w-full max-w-2xl">
          <Button onClick={onNext} variant="secondary" className="w-full">
            Sounds amazing
          </Button>
        </div>
      </div>
    </div>
  )
}
