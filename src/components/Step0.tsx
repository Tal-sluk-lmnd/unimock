'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import EstimationCard, {
  type MilesOption,
  type FsdUsageOption,
  type EstimationCardMode,
} from './EstimationCard'
import SummaryPaymentCard from './SummaryPaymentCard'
import Button from './Button'
import CoveragesContent, { type CoveragePriceAdjustment } from './CoveragesContent'

const MILES_LABELS: Record<MilesOption, string> = {
  'not-a-lot': 'Low mileage',
  'about-average': 'Average mileage',
  'kind-of-a-lot': 'High mileage',
  'custom': 'Custom mileage',
}

const FSD_LABELS: Record<FsdUsageOption, string> = {
  'almost-never': 'low FSD usage',
  'sometimes': 'moderate FSD usage',
  'all-the-time': 'high FSD usage',
}

const BASE_PRICE = 45.48
const PER_MILE_RATE = 0.024

const MILES_DEFAULTS: Record<MilesOption, number> = {
  'not-a-lot': 200,
  'about-average': 550,
  'kind-of-a-lot': 1000,
  'custom': 500,
}

const FSD_DISCOUNT_SHARE: Record<FsdUsageOption, number> = {
  'almost-never': 0.1,
  'sometimes': 0.4,
  'all-the-time': 0.8,
}

function getMilesForSelection(miles: MilesOption | null, customMileage: number): number {
  if (!miles) return 0
  if (miles === 'custom') return customMileage
  return MILES_DEFAULTS[miles]
}

function getCarUsageCost(miles: number, fsd: FsdUsageOption | null, hasFsd: boolean, rateAddon: number = 0): number {
  const rate = PER_MILE_RATE + rateAddon
  if (!hasFsd || !fsd) return miles * rate
  const fsdShare = FSD_DISCOUNT_SHARE[fsd]
  const fsdMiles = miles * fsdShare
  const normalMiles = miles - fsdMiles
  return normalMiles * rate + fsdMiles * rate * 0.5
}

function getSummarySubtitle(
  miles: MilesOption | null,
  fsd: FsdUsageOption | null,
  showFsd: boolean,
  customMileage?: number
): string {
  if (!miles) return 'How much do you drive a month?'
  const milesLabel = miles === 'custom' && customMileage !== undefined
    ? `${customMileage.toLocaleString()} miles`
    : MILES_LABELS[miles]
  if (showFsd && fsd) {
    return `${milesLabel}, ${FSD_LABELS[fsd]}`
  }
  return milesLabel
}

interface CarCardConfig {
  id: string
  carName: string
  showFsd: boolean
}

const CAR_CARDS: CarCardConfig[] = [
  { id: 'car-1', carName: "'25 Tesla Model S", showFsd: true },
  { id: 'car-2', carName: "'25 Hyundai Tuscon", showFsd: false },
]

interface CardSelections {
  miles: MilesOption | null
  fsd: FsdUsageOption | null
  customMileage: number
}

interface Step0Props {
  onNext: (avatarMessage?: string, userResponse?: string) => void
  showBottomButtons?: boolean
  disableHistory?: boolean
}

export default function Step0({ onNext }: Step0Props) {
  const [entered, setEntered] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [completedSet, setCompletedSet] = useState<Set<number>>(() => new Set())
  const [quoteRevealed, setQuoteRevealed] = useState(false)
  const [customizeCoverages, setCustomizeCoverages] = useState(false)
  const [coverageAdj, setCoverageAdj] = useState<CoveragePriceAdjustment>({ baseAddon: 0, rateAddon: 0 })
  const coveragesRef = useRef<HTMLDivElement>(null)
  const [selections, setSelections] = useState<CardSelections[]>(
    CAR_CARDS.map(() => ({ miles: null, fsd: null, customMileage: 500 }))
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntered(true)
      setTimeout(() => setActiveIndex(0), 500)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleMilesSelect = useCallback((index: number, option: MilesOption) => {
    setSelections((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], miles: option }
      return next
    })
  }, [])

  const handleFsdSelect = useCallback((index: number, option: FsdUsageOption) => {
    setSelections((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], fsd: option }
      return next
    })
  }, [])

  const handleCustomMileageChange = useCallback((index: number, value: number) => {
    setSelections((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], customMileage: value }
      return next
    })
  }, [])

  const handleComplete = useCallback((index: number) => {
    setCompletedSet((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })

    const nextCarIndex = index + 1
    if (nextCarIndex < CAR_CARDS.length) {
      setActiveIndex(nextCarIndex)
    } else {
      setActiveIndex(null)
      setQuoteRevealed(true)
    }
  }, [])

  const handleCardTap = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const summaryData = useMemo(() => {
    let totalUsage = 0
    let totalMiles = 0

    const cars = CAR_CARDS.map((card, i) => {
      const sel = selections[i]
      const miles = getMilesForSelection(sel.miles, sel.customMileage)
      const cost = getCarUsageCost(miles, sel.fsd, card.showFsd, coverageAdj.rateAddon)
      totalUsage += cost
      totalMiles += miles

      const effectiveRate = miles > 0 ? cost / miles : PER_MILE_RATE + coverageAdj.rateAddon

      return {
        name: card.carName,
        rate: `$${cost.toFixed(2)}/mo`,
        rateBreakdown: `($${effectiveRate.toFixed(3)} x ${miles.toLocaleString()}mi)`,
      }
    })

    const adjustedBase = BASE_PRICE + coverageAdj.baseAddon

    return {
      cars,
      totalUsage,
      totalMiles,
      estimatedTotal: adjustedBase + totalUsage,
    }
  }, [selections, coverageAdj])

  const getCardMode = (index: number): EstimationCardMode => {
    if (index === activeIndex) return 'interactive'
    if (completedSet.has(index)) return 'completed'
    return 'pending'
  }

  const getSubtitle = (index: number): string => {
    const mode = getCardMode(index)
    if (mode === 'completed') {
      return getSummarySubtitle(
        selections[index].miles,
        selections[index].fsd,
        CAR_CARDS[index].showFsd,
        selections[index].customMileage
      )
    }
    if (mode === 'interactive' || mode === 'readonly') {
      return 'How much do you drive a month?'
    }
    return 'Waiting for estimation...'
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        paddingTop: '71px',
        paddingBottom: quoteRevealed ? '160px' : '71px',
      }}
    >
      <div className="container mx-auto px-2 py-6 max-w-2xl flex flex-col gap-4 absolute top-[240px] left-0 right-0 bg-[#f7f7f7]">
        {CAR_CARDS.map((card, i) => (
          <div
            key={card.id}
            className="transition-all duration-300"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <EstimationCard
              carName={card.carName}
              subtitle={getSubtitle(i)}
              mode={getCardMode(i)}
              showFsd={card.showFsd}
              selectedMiles={selections[i].miles}
              selectedFsd={selections[i].fsd}
              customMileage={selections[i].customMileage}
              onMilesSelect={(opt) => handleMilesSelect(i, opt)}
              onFsdSelect={(opt) => handleFsdSelect(i, opt)}
              onCustomMileageChange={(val) => handleCustomMileageChange(i, val)}
              onComplete={() => handleComplete(i)}
              onClick={() => handleCardTap(i)}
            />
          </div>
        ))}

        {/* Quote card shell */}
        <div
          className="transition-all duration-300"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: `${CAR_CARDS.length * 150}ms`,
          }}
        >
          <div
            className={`bg-white border border-[#ececec] flex flex-col relative rounded-[24px] shadow-[0px_9px_49px_2px_rgba(32,32,32,0.07)] w-full transition-all duration-300 ${
              !quoteRevealed ? 'opacity-60' : ''
            }`}
          >
            {/* Pending header — collapses away when quote is revealed */}
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-in-out"
              style={{ gridTemplateRows: quoteRevealed ? '0fr' : '1fr' }}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 p-6 pb-5">
                  <p className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a]">
                    Quote
                  </p>
                  <p className="font-lato text-base leading-[1.47] text-[#7b7b7b]">
                    Waiting for estimation...
                  </p>
                </div>
              </div>
            </div>

            {/* Summary content — expands when quote is revealed */}
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-in-out"
              style={{ gridTemplateRows: quoteRevealed ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className={`transition-opacity duration-500 ${quoteRevealed ? 'opacity-100' : 'opacity-0'}`}>
                  <SummaryPaymentCard
                    hideActions
                    compactPadding={customizeCoverages}
                    basePrice={`$${(BASE_PRICE + coverageAdj.baseAddon).toFixed(2)}`}
                    cars={summaryData.cars}
                    totalBasePrice={`$${(BASE_PRICE + coverageAdj.baseAddon).toFixed(2)}`}
                    totalUsage={`$${summaryData.totalUsage.toFixed(2)}`}
                    estimatedTotal={`$${summaryData.estimatedTotal.toFixed(2)}`}
                    totalMiles={summaryData.totalMiles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coverages — revealed when "Customize coverages" is clicked */}
        <div
          ref={coveragesRef}
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: customizeCoverages ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div
              className={`mt-4 transition-opacity duration-500 ${
                customizeCoverages ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <CoveragesContent onPriceChange={setCoverageAdj} />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA bar */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 pt-[72px] pb-6 flex flex-col items-center transition-transform duration-400 ease-in-out z-50"
        style={{
          transform: quoteRevealed ? 'translateY(0)' : 'translateY(100%)',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 41.67%)',
        }}
      >
        <div className="w-full max-w-2xl">
          {customizeCoverages ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col font-lato text-base text-[#4a4a4a]">
                <p className="leading-[1.55]">
                  Usage ({summaryData.totalMiles.toLocaleString()}mi)
                </p>
                <p className="font-bold leading-[1.55]">
                  Estimated ${summaryData.estimatedTotal.toFixed(2)}/mo
                </p>
              </div>
              <Button
                onClick={() => onNext()}
                variant="primary"
                className="w-[137px] shrink-0"
              >
                To checkout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={() => onNext()}
                variant="primary"
                className="w-full"
              >
                To checkout
              </Button>
              <button
                type="button"
                onClick={() => {
                  setCustomizeCoverages(true)
                  setTimeout(() => {
                    window.scrollBy({ top: 200, behavior: 'smooth' })
                  }, 350)
                }}
                className="font-lato text-base leading-[1.47] text-[#4a4a4a] underline decoration-[#b7b7b7] underline-offset-2 hover:text-[#ff0083] hover:decoration-[#ff0083] transition-colors duration-200 pb-1"
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
