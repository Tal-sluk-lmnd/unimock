'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Button from './Button'

interface CarUsage {
  name: string
  rate: string
  rateBreakdown: string
}

const DISCOUNTS = [
  { title: 'Safe driver', amount: '-$7.45/mo' },
  { title: 'No previous claims', amount: '-$11.45/mo' },
  { title: 'Multi-car bundle', amount: '-$5.55/mo' },
]

const TOTAL_DISCOUNT = '-$24.45'

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
  const [discountsExpanded, setDiscountsExpanded] = useState(false)

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
              Lemonade Autonomous Car
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
      <div className={`flex flex-col items-start pt-8 px-6 w-full ${compactPadding ? 'pb-6' : 'pb-[124px]'}`}>
        <div className="flex flex-col gap-4 items-start w-full">
          {/* Base price */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center w-full">
              <div className="font-lato text-base text-[#4a4a4a]">
                <p className="leading-[1.47]">
                  <span className="font-bold">Your base price </span>
                  <span className="text-[#949494]">(when no one is driving)</span>
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

          {/* Discounts (collapsible) */}
          <div className="flex flex-col items-start w-full">
            <button
              type="button"
              onClick={() => setDiscountsExpanded(!discountsExpanded)}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                  {DISCOUNTS.length} Discounts
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-300 ${discountsExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-lato text-base leading-[1.47] text-[#ff0083]">
                {TOTAL_DISCOUNT}
              </span>
            </button>

            <div
              className="grid w-full transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: discountsExpanded ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-2.5 pt-3">
                  {DISCOUNTS.map((discount) => (
                    <div key={discount.title} className="flex items-center gap-2 w-full">
                      <div className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="#FF0083" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-lato text-base leading-[1.47] text-[#4a4a4a] flex-1">
                        {discount.title}
                      </span>
                      <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                        {discount.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
