'use client'

import React, { useState, useEffect, useRef } from 'react'

export type MilesOption = 'not-a-lot' | 'about-average' | 'kind-of-a-lot' | 'custom'
export type FsdUsageOption = 'almost-never' | 'sometimes' | 'all-the-time'
export type EstimationCardMode = 'pending' | 'readonly' | 'interactive' | 'completed'

interface MilesChoice {
  id: MilesOption
  label: string
  range: string
}

interface FsdChoice {
  id: FsdUsageOption
  label: string
}

interface EstimationCardProps {
  carName?: string
  subtitle?: string
  mode?: EstimationCardMode
  showFsd?: boolean
  selectedMiles?: MilesOption | null
  selectedFsd?: FsdUsageOption | null
  customMileage?: number
  onMilesSelect?: (option: MilesOption) => void
  onFsdSelect?: (option: FsdUsageOption) => void
  onCustomMileageChange?: (value: number) => void
  onComplete?: () => void
  onClick?: () => void
}

const MILES_OPTIONS: MilesChoice[] = [
  { id: 'not-a-lot', label: 'Not a lot', range: '(100 - 300 miles)' },
  { id: 'about-average', label: 'About average', range: '(300 - 800 miles)' },
  { id: 'kind-of-a-lot', label: 'Kind of a lot', range: '(800 - 1,200+ miles)' },
  { id: 'custom', label: 'Custom', range: '(estimate on your own)' },
]

const FSD_OPTIONS: FsdChoice[] = [
  { id: 'almost-never', label: 'Almost never' },
  { id: 'sometimes', label: 'Sometimes' },
  { id: 'all-the-time', label: 'All the time' },
]

export default function EstimationCard({
  carName = "'25 Hyundai Tuscon",
  subtitle = 'How much do you drive a month?',
  mode = 'readonly',
  showFsd = true,
  selectedMiles: controlledMiles,
  selectedFsd: controlledFsd,
  customMileage: controlledCustomMileage,
  onMilesSelect,
  onFsdSelect,
  onCustomMileageChange,
  onComplete,
  onClick,
}: EstimationCardProps) {
  const [internalMiles, setInternalMiles] = useState<MilesOption | null>(null)
  const [internalFsd, setInternalFsd] = useState<FsdUsageOption | null>(null)
  const [internalCustomMileage, setInternalCustomMileage] = useState(500)
  const completeFiredRef = useRef(false)

  const customMileage = controlledCustomMileage !== undefined ? controlledCustomMileage : internalCustomMileage

  const selectedMiles = controlledMiles !== undefined ? controlledMiles : internalMiles
  const selectedFsd = controlledFsd !== undefined ? controlledFsd : internalFsd

  const handleMilesSelect = (option: MilesOption) => {
    if (mode !== 'interactive') return
    setInternalMiles(option)
    onMilesSelect?.(option)
  }

  const handleFsdSelect = (option: FsdUsageOption) => {
    if (mode !== 'interactive') return
    setInternalFsd(option)
    onFsdSelect?.(option)
  }

  const handleCustomMileageChange = (value: number) => {
    setInternalCustomMileage(value)
    onCustomMileageChange?.(value)
  }

  const customIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (mode !== 'interactive' || completeFiredRef.current) return

    if (selectedMiles === 'custom' && !showFsd) return

    const isComplete = showFsd
      ? selectedMiles !== null && selectedFsd !== null
      : selectedMiles !== null

    if (isComplete && onComplete) {
      const timer = setTimeout(() => {
        completeFiredRef.current = true
        onComplete()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [mode, selectedMiles, selectedFsd, showFsd, onComplete])

  useEffect(() => {
    if (mode !== 'interactive' || completeFiredRef.current) return
    if (selectedMiles !== 'custom' || showFsd) return

    if (customIdleTimerRef.current) clearTimeout(customIdleTimerRef.current)

    customIdleTimerRef.current = setTimeout(() => {
      if (!completeFiredRef.current) {
        completeFiredRef.current = true
        onComplete?.()
      }
    }, 1500)

    return () => {
      if (customIdleTimerRef.current) clearTimeout(customIdleTimerRef.current)
    }
  }, [customMileage, mode, selectedMiles, showFsd, onComplete])

  useEffect(() => {
    if (mode === 'interactive') {
      completeFiredRef.current = false
    }
  }, [mode])

  const isCollapsed = mode !== 'interactive'
  const isClickable = isCollapsed && mode !== 'pending'
  const isExpanded = mode === 'interactive'

  return (
    <div
      className={`bg-white border border-[#ececec] flex flex-col relative rounded-3xl shadow-[0px_9px_49px_2px_rgba(32,32,32,0.07)] w-full transition-all duration-300 ${
        isClickable ? 'cursor-pointer hover:shadow-[0px_12px_52px_4px_rgba(32,32,32,0.10)]' : ''
      } ${mode === 'pending' ? 'opacity-60' : ''}`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-center gap-3 p-6 pb-5">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <p className="font-lato font-bold text-base leading-[1.47] text-[#4a4a4a]">
            {carName}
          </p>
          <p className="font-lato text-base leading-[1.47] text-[#7b7b7b]">
            {subtitle}
          </p>
        </div>
        {isCollapsed && showFsd && selectedFsd && (
          <span className="shrink-0 font-lato text-xs font-bold leading-[1.47] text-[#ff0083] border border-[#ff0083] rounded-full px-2.5 py-0.5 whitespace-nowrap">
            50% off FSD miles
          </span>
        )}
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className={`transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col gap-3 px-6 pb-5">
              {MILES_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => handleMilesSelect(option.id)}
                >
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedMiles === option.id
                          ? 'border-[#4a4a4a]'
                          : 'border-[#dadada] group-hover:border-[#b7b7b7]'
                      }`}
                    >
                      {selectedMiles === option.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a]" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                      {option.label}
                    </span>
                    <span className="font-lato text-sm leading-[1.47] text-[#7b7b7b]">
                      {option.range}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Custom mileage slider */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: selectedMiles === 'custom' ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden flex justify-center items-start">
                <div className={`px-6 pb-3 pt-3 flex flex-row gap-3 justify-center items-start w-full transition-opacity duration-300 ${
                  selectedMiles === 'custom' ? 'opacity-100' : 'opacity-0'
                }`}>
                  <input
                    type="range"
                    min={100}
                    max={1500}
                    step={10}
                    value={customMileage}
                    onChange={(e) => handleCustomMileageChange(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-[#ececec]
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4a4a4a] [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.2)]
                      [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-[#ececec]
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#4a4a4a] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.2)]"
                  />
                  <p className="font-lato text-sm leading-[1.47] text-[#7b7b7b] text-center w-[100px] box-content">
                    {customMileage.toLocaleString()} miles
                  </p>
                </div>
              </div>
            </div>

            {showFsd && (
              <>
                <div className="mx-6 h-px bg-[#ececec]" />

                <div className="flex flex-col gap-3 px-6 py-5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                      Whats your FSD usage?
                    </p>
                    <span className="font-lato text-xs font-bold leading-[1.47] text-[#ff0083] border border-[#ff0083] rounded-full px-2.5 py-0.5">
                      50% off FSD miles
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {FSD_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleFsdSelect(option.id)}
                        className={`flex-1 whitespace-nowrap font-lato text-sm leading-[1.47] px-4 py-2 rounded-full border transition-colors ${
                          selectedFsd === option.id
                            ? 'border-[#4a4a4a] bg-[#4a4a4a] text-white'
                            : 'border-[#dadada] bg-white text-[#4a4a4a] hover:border-[#b7b7b7]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
