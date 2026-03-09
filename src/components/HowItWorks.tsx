'use client'

import React, { useState, useEffect } from 'react'
import Button from './Button'

interface HowItWorksProps {
  onNext: () => void
}

const FEATURES = [
  {
    title: 'No driving',
    description: 'Stay covered for the unexpected like falling branches or hail while parked',
  },
  {
    title: 'Human driving',
    description: 'Every mile gets priced individually, so you only pay for what you drive',
  },
  {
    title: 'FSD driving',
    description: 'Autonomous systems cut crashes way down, so you get 50% off those miles',
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
      style={{ paddingTop: '71px', paddingBottom: '160px', backgroundColor: '#FFFFFF' }}
    >
      <div className="container mx-auto px-6 py-8 max-w-2xl flex flex-col gap-10 absolute top-[60px] left-0 right-0">
        {/* Intro text */}
        <p
          className="font-lato text-[17px] leading-[1.6] text-[#4a4a4a] transition-all duration-500"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          We seamlessly connect through pairing or smart device and price your
          entire policy based on how each car is actually used:
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
                <p className="font-lato text-[15px] leading-[1.5] text-[#7b7b7b]">
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
