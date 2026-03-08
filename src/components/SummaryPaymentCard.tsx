'use client'

import React from 'react'
import Image from 'next/image'
import Button from './Button'

interface CarUsage {
  name: string
  rate: string
  rateBreakdown: string
}

interface SummaryPaymentCardProps {
  basePrice?: string
  cars?: CarUsage[]
  totalBasePrice?: string
  totalUsage?: string
  estimatedTotal?: string
  totalMiles?: number
  onCheckout?: () => void
  onCustomizeCoverages?: () => void
  hideActions?: boolean
  compactPadding?: boolean
  className?: string
}

export default function SummaryPaymentCard({
  basePrice = '$45.48',
  cars = [
    { name: "23' Tesla model S", rate: '$20.45/mo', rateBreakdown: '($0.024 x 500mi)' },
    { name: "'25 Hyundai Tuscon", rate: '$20.45/mo', rateBreakdown: '($0.024 x 500mi)' },
  ],
  totalBasePrice = '$20.45',
  totalUsage = '$41.45',
  estimatedTotal = '$141.45',
  totalMiles,
  onCheckout,
  onCustomizeCoverages,
  hideActions = false,
  compactPadding = false,
  className = '',
}: SummaryPaymentCardProps) {
  return (
    <div
      className={`flex flex-col items-center overflow-hidden w-full ${
        hideActions ? '' : 'bg-white border border-[#ececec] rounded-xl shadow-[0px_9px_49px_2px_rgba(32,32,32,0.07)]'
      } ${className}`}
    >
      {/* Marketing banner */}
      <div className="bg-white border border-[#ececec] grid grid-cols-2 grid-rows-1 h-[188px] items-start overflow-hidden rounded-3xl shadow-[0px_12px_32px_-8px_rgba(32,32,32,0.08)] w-full">
        <div className="flex flex-col h-full items-start justify-center pl-6 pr-4 py-6 w-full">
          <div className="flex flex-col gap-1 w-full">
            <p className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a]">
              Lemonade Autonomous Car!
            </p>
            <p className="font-lato text-sm leading-[1.47] text-[#4a4a4a]">
              Here&apos;s how we calculate your usage and apply discounts on a monthly basis.
            </p>
          </div>
        </div>
        <div className="w-full h-full bg-[#f7f7f7] rounded-tr-2xl rounded-br-2xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/Tesla23FSD.png"
              alt="Tesla FSD"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col items-start pt-6 px-6 w-full ${compactPadding ? 'pb-6' : 'pb-[124px]'}`}>
        <div className="flex flex-col gap-4 items-start w-full">
          {/* Base price */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center w-full">
              <div className="font-lato text-base text-[#4a4a4a]">
                <p className="leading-[1.47]">
                  <span className="font-bold">Your base price </span>
                  <span className="text-[#949494]">(when cars are stationary)</span>
                </p>
                <p className="leading-[1.47]">{basePrice}</p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="bg-[#ececec] h-px w-full" />

          {/* Usage rates */}
          <div className="flex flex-col items-start w-full">
            <p className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a] mb-1">
              Usage rates
            </p>
            {cars.map((car, index) => (
              <div key={index} className="w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                    {car.name}
                  </span>
                  <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                    {car.rate}
                  </span>
                </div>
                <p className="font-lato text-base leading-[1.47] text-[#8c8c8c]">
                  {car.rateBreakdown}
                </p>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="bg-[#ececec] h-px w-full" />

          {/* Summary totals */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-between w-full">
              <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">Base price</span>
              <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">{totalBasePrice}</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">Usage ({totalMiles !== undefined ? `${totalMiles.toLocaleString()}mi` : '1,000mi'})</span>
              <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">{totalUsage}</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a]">Estimated total</span>
              <span className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a]">{estimatedTotal}</span>
            </div>
          </div>

          {!hideActions && (
            <div className="flex flex-col items-center gap-4 w-full">
              <Button
                onClick={onCheckout}
                variant="primary"
                className="w-full"
              >
                To checkout
              </Button>
              <button
                onClick={onCustomizeCoverages}
                className="font-lato text-base leading-[1.47] text-[#4a4a4a] underline decoration-[#b7b7b7] underline-offset-2 hover:text-[#ff0083] hover:decoration-[#ff0083] transition-colors duration-200"
              >
                Customize coverages
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
