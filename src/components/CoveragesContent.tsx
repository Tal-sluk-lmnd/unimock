'use client'

import React, { useState, useEffect, useMemo } from 'react'

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#4A4A4A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BulletIcon() {
  return (
    <svg
      className="shrink-0 mt-[3px]"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="8" cy="8" r="3" fill="#4A4A4A" />
    </svg>
  )
}

function Toggle({
  enabled,
  onToggle,
  color = 'pink',
}: {
  enabled: boolean
  onToggle: () => void
  color?: 'pink' | 'grey'
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex h-[30px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled
          ? color === 'pink'
            ? 'bg-[#ff0083]'
            : 'bg-[#4a4a4a]'
          : 'bg-[#ececec]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-white shadow-[0px_4px_12px_-2px_rgba(32,32,32,0.08)] transition-transform duration-200 ease-in-out ${
          enabled ? 'translate-x-[18px]' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function IncludedTag({ label = 'Included' }: { label?: string }) {
  return (
    <span className="inline-flex h-8 items-center justify-center rounded-full bg-[#ffebf5] px-3">
      <span className="font-lato text-sm font-bold text-[#ff0083]">
        {label}
      </span>
    </span>
  )
}

function Dropdown({ value }: { value: string }) {
  return (
    <div className="mt-4 flex h-14 w-full items-center justify-between rounded-lg border border-[#b7b7b7] bg-white px-5">
      <span className="font-lato text-base text-[#4a4a4a] leading-[1.47]">
        {value}
      </span>
      <ChevronDown className="shrink-0 -rotate-90" />
    </div>
  )
}

interface CoverageItemProps {
  title: string
  description?: React.ReactNode
  bullets?: string[]
  action?: React.ReactNode
  dropdown?: string
  borderBottom?: boolean
}

function CoverageItem({
  title,
  description,
  bullets,
  action,
  dropdown,
  borderBottom = true,
}: CoverageItemProps) {
  return (
    <div
      className={`flex gap-2 py-6 ${
        borderBottom ? 'border-b border-[#ececec]' : ''
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-center">
          <div className="flex flex-1 flex-col gap-1">
            <p className="font-lato text-base font-bold leading-[1.47] text-[#4a4a4a]">
              {title}
            </p>
          </div>
          {action && <div className="shrink-0 pl-5">{action}</div>}
        </div>
        {description && (
          <div className="mt-2 pr-6">
            <p className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
              {description}
            </p>
          </div>
        )}
        {bullets && bullets.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 pr-6">
            {bullets.map((b) => (
              <div key={b} className="flex gap-2 items-start">
                <BulletIcon />
                <span className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
                  {b}
                </span>
              </div>
            ))}
          </div>
        )}
        {dropdown && <Dropdown value={dropdown} />}
      </div>
    </div>
  )
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col gap-2 px-4 text-center">
      <p className="font-lato text-2xl font-bold leading-[1.45] text-[#4a4a4a]">
        {title}
      </p>
      <p className="font-lato text-base leading-[1.47] text-[#7b7b7b]">
        {subtitle}
      </p>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white border border-[#ececec] rounded-xl shadow-[0px_7px_12px_0px_rgba(0,0,0,0.07)]">
      {children}
    </div>
  )
}

function CarHeader({
  name,
  expanded,
  onToggle,
}: {
  name: string
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between p-6 text-left"
    >
      <p className="font-lato text-base font-bold leading-[1.47] text-[#4a4a4a] truncate">
        {name}
      </p>
      <div
        className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ececec] transition-transform duration-200 ${
          expanded ? 'rotate-180' : ''
        }`}
      >
        <ChevronDown className="h-3 w-3" />
      </div>
    </button>
  )
}

interface FeatureItemProps {
  icon: React.ReactNode
  title: string
  description: string
  borderBottom?: boolean
}

function FeatureItem({
  icon,
  title,
  description,
  borderBottom = true,
}: FeatureItemProps) {
  return (
    <div
      className={`flex gap-3 py-6 ${
        borderBottom ? 'border-b border-[#ececec]' : ''
      }`}
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-lato text-base font-bold leading-[1.47] text-[#4a4a4a]">
          {title}
        </p>
        <p className="font-lato text-base leading-[1.47] text-[#4a4a4a]">
          {description}
        </p>
      </div>
    </div>
  )
}

function FeatureIcon({ emoji }: { emoji: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-[#f7f7f7] text-2xl">
      {emoji}
    </div>
  )
}

function FaqItem({
  question,
  answer,
  borderBottom = true,
}: {
  question: string
  answer?: string
  borderBottom?: boolean
}) {
  const [open, setOpen] = useState(!!answer)

  return (
    <div
      className={`py-6 ${borderBottom ? 'border-b border-[#ececec]' : ''}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <p className="font-lato text-base font-bold leading-[1.47] text-[#4a4a4a] pr-5">
          {question}
        </p>
        <div
          className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#ececec] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown className="h-3 w-3" />
        </div>
      </button>
      {open && answer && (
        <p className="mt-2 font-lato text-base leading-[1.47] text-[#4a4a4a] pr-6">
          {answer}
        </p>
      )}
    </div>
  )
}

const CAR_COVERAGES = [
  {
    name: "'25 Tesla Model S",
    items: [
      {
        title: 'Comprehensive coverage',
        description: "Coverage for damages caused by things you can't control. For example:",
        bullets: ['Weather', 'Theft & vandalism', 'Hitting an animal', 'Falling objects (trees)', 'Fire'],
        enabled: true,
        dropdown: '$500 Deductible',
        baseAddon: 1.74,
        rateAddon: 0.008,
      },
      {
        title: 'Collision coverage',
        description: 'Covers you by paying for damage to your vehicle caused by:',
        bullets: ['Hitting another vehicle or object', 'Another vehicle hitting you', 'Your vehicle rolling over'],
        enabled: false,
        dropdown: '$500 Deductible',
        baseAddon: 1.92,
        rateAddon: 0.006,
      },
      {
        title: 'Uninsured driver property damage',
        description:
          'Covers you for repairs and related expenses from damage caused by someone without insurance.',
        enabled: true,
        dropdown: '$15K Per incident / $250 Deductible',
        baseAddon: 0.63,
        rateAddon: 0.003,
      },
      {
        title: 'Temporary transportation coverage',
        description:
          "If your car is a total loss, we'll reimburse any transportation expenses such as Lyft, Uber, or rental car for a full month.",
        enabled: false,
        dropdown: '$60 Per day / $1,800 Max',
        baseAddon: 0.48,
        rateAddon: 0.002,
      },
      {
        title: 'Roadside assistance',
        tag: 'On us!',
      },
    ],
  },
  {
    name: "'25 Hyundai Tuscon",
    items: [],
  },
]

const PERSON_COVERAGES = [
  {
    title: 'Medical payments',
    description:
      'Cover medical expenses for others injured when you cause an accident.',
    enabled: true,
    dropdown: '$100K Per person / $300K Per incident',
    baseAddon: 1.35,
    rateAddon: 0.005,
  },
  {
    title: 'Uninsured/Under-insured driver bodily injury',
    description:
      'Covers you for medical bills and related expenses from injuries caused by someone without or too little insurance.',
    tag: 'Included',
    dropdown: '$50K Per person / $100K Per incident',
  },
]

const SUED_COVERAGES = [
  {
    title: 'Bodily injury',
    description:
      'Cover medical expenses for others injured when you cause an accident.',
    tag: 'Included',
    dropdown: '$100K Per person / $300K Per incident',
  },
  {
    title: 'Property damage',
    description:
      'Covers damage to other cars or property when you cause an accident',
    tag: 'Included',
    dropdown: '$100K Per incident',
  },
]

const FEATURES = [
  {
    emoji: '🛣️',
    title: 'Free roadside assistance',
    description:
      'Tows, jump starts, tire changes, key replacement, winching - on us!',
  },
  {
    emoji: '🚨',
    title: 'Emergency crash assistance',
    description:
      "We'll know if you're in an accident and get you the help you need.",
  },
  {
    emoji: '📱',
    title: 'Fair prices, based on how you drive',
    description:
      'Get a discount, and earn a lower premium as you drive better.',
  },
]

const FAQ_ITEMS = [
  { question: 'How do you help me clean up CO₂?' },
  { question: 'Can I trust you guys?' },
  {
    question: 'Do all drivers need the Lemonade app on their phone? (Yep!)',
    answer:
      "They do. We use 'telematics' to price our policies fairly, to help with fast claims, provide on-site emergency services, and to calculate your CO₂ emissions so we can plant trees in your name.",
  },
  { question: 'Is it okay to disable location services for the Lemonade app? (Nope.)' },
  { question: "Can I switch now if I'm currently insured elsewhere?" },
  { question: "What happens if I'm in an accident?" },
  { question: "I'm an Uber/Lyft driver, can I use your insurance?" },
  { question: "I'm buying a new car, how do I insure it?" },
  { question: 'Can I edit my coverage after purchase?' },
  { question: "What happens if someone who's not insured hits my car?" },
  { question: 'How do you calculate my price?' },
  { question: 'What discounts do you have for eco-friendly cars?' },
]

export interface CoveragePriceAdjustment {
  baseAddon: number
  rateAddon: number
}

interface CoveragesContentProps {
  onPriceChange?: (adjustment: CoveragePriceAdjustment) => void
}

export default function CoveragesContent({ onPriceChange }: CoveragesContentProps) {
  const [expandedCar, setExpandedCar] = useState(0)
  const [carToggles, setCarToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    CAR_COVERAGES.forEach((car, ci) => {
      car.items.forEach((item, ii) => {
        if ('enabled' in item) {
          initial[`${ci}-${ii}`] = item.enabled ?? false
        }
      })
    })
    return initial
  })
  const [personToggles, setPersonToggles] = useState<Record<number, boolean>>(
    () => {
      const initial: Record<number, boolean> = {}
      PERSON_COVERAGES.forEach((item, i) => {
        if ('enabled' in item) {
          initial[i] = item.enabled ?? false
        }
      })
      return initial
    }
  )

  const toggleCar = (key: string) =>
    setCarToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  const togglePerson = (key: number) =>
    setPersonToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  const priceAdjustment = useMemo(() => {
    let baseAddon = 0
    let rateAddon = 0

    CAR_COVERAGES.forEach((car, ci) => {
      car.items.forEach((item, ii) => {
        const key = `${ci}-${ii}`
        if (carToggles[key] && 'baseAddon' in item) {
          baseAddon += item.baseAddon ?? 0
          rateAddon += item.rateAddon ?? 0
        }
      })
    })

    PERSON_COVERAGES.forEach((item, i) => {
      if (personToggles[i] && 'baseAddon' in item) {
        baseAddon += item.baseAddon ?? 0
        rateAddon += item.rateAddon ?? 0
      }
    })

    return { baseAddon, rateAddon }
  }, [carToggles, personToggles])

  useEffect(() => {
    onPriceChange?.(priceAdjustment)
  }, [priceAdjustment, onPriceChange])

  return (
    <div className="flex flex-col gap-12">
      {/* Section 1: Car coverages */}
      <div className="flex flex-col gap-6 items-center">
        <SectionTitle
          title="Let's talk about your cars"
          subtitle="Coverage related to car damage and servicing"
        />
        <div className="flex flex-col gap-4 w-full">
          {CAR_COVERAGES.map((car, ci) => (
            <Card key={car.name}>
              {ci === 0 ? (
                <>
                  <div className="border-b border-[#ececec]">
                    <CarHeader
                      name={car.name}
                      expanded={expandedCar === ci}
                      onToggle={() =>
                        setExpandedCar(expandedCar === ci ? -1 : ci)
                      }
                    />
                  </div>
                  {expandedCar === ci && (
                    <div className="px-8">
                      {car.items.map((item, ii) => {
                        const key = `${ci}-${ii}`
                        const isLast = ii === car.items.length - 1
                        if ('tag' in item && item.tag) {
                          return (
                            <CoverageItem
                              key={item.title}
                              title={item.title}
                              action={<IncludedTag label={item.tag} />}
                              borderBottom={!isLast}
                            />
                          )
                        }
                        return (
                          <CoverageItem
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            bullets={'bullets' in item ? item.bullets : undefined}
                            action={
                              <Toggle
                                enabled={!!carToggles[key]}
                                onToggle={() => toggleCar(key)}
                                color={carToggles[key] ? 'pink' : 'grey'}
                              />
                            }
                            dropdown={'dropdown' in item ? item.dropdown : undefined}
                            borderBottom={!isLast}
                          />
                        )
                      })}
                    </div>
                  )}
                </>
              ) : (
                <CarHeader
                  name={car.name}
                  expanded={expandedCar === ci}
                  onToggle={() =>
                    setExpandedCar(expandedCar === ci ? -1 : ci)
                  }
                />
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: Protect everyone */}
      <div className="flex flex-col gap-6 items-center">
        <SectionTitle
          title="Protect everyone in your car"
          subtitle="Coverage for injuries, and accidents with uninsured drivers"
        />
        <Card>
          <div className="px-8">
            {PERSON_COVERAGES.map((item, i) => {
              const isLast = i === PERSON_COVERAGES.length - 1
              return (
                <CoverageItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  action={
                    'tag' in item && item.tag ? (
                      <IncludedTag />
                    ) : (
                      <Toggle
                        enabled={!!personToggles[i]}
                        onToggle={() => togglePerson(i)}
                        color={personToggles[i] ? 'pink' : 'grey'}
                      />
                    )
                  }
                  dropdown={item.dropdown}
                  borderBottom={!isLast}
                />
              )
            })}
          </div>
        </Card>
      </div>

      {/* Section 3: Protection if sued */}
      <div className="flex flex-col gap-6 items-center">
        <SectionTitle
          title="Protection if you get sued"
          subtitle="Coverage for legal action if you cause damage to others"
        />
        <Card>
          <div className="px-8">
            {SUED_COVERAGES.map((item, i) => {
              const isLast = i === SUED_COVERAGES.length - 1
              return (
                <CoverageItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  action={<IncludedTag />}
                  dropdown={item.dropdown}
                  borderBottom={!isLast}
                />
              )
            })}
          </div>
        </Card>
      </div>

      {/* Section 4: New kind of insurance */}
      <div className="flex flex-col gap-6 items-center">
        <SectionTitle
          title="A new kind of car insurance"
          subtitle="We use location-based technology to make your insurance better and more affordable. No clunky hardware in your car, it all happens on the Lemonade app."
        />
        <Card>
          <div className="px-6">
            {FEATURES.map((f, i) => (
              <FeatureItem
                key={f.title}
                icon={<FeatureIcon emoji={f.emoji} />}
                title={f.title}
                description={f.description}
                borderBottom={i < FEATURES.length - 1}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Section 5: Good to know */}
      <div className="flex flex-col gap-6 items-center">
        <SectionTitle
          title="Good to know..."
          subtitle="Car insurance can be confusing, so we worked hard to make it simple. If you still have questions, these might help..."
        />
        <Card>
          <div className="px-6">
            {FAQ_ITEMS.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                borderBottom={i < FAQ_ITEMS.length - 1}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
