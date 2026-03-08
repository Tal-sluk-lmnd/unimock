'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Button from './Button'

interface ContentItem {
  icon?: React.ReactNode
  label: string
}

interface PackageCard {
  title: string
  subtitle?: string
  content: ContentItem[]
  buttonLabel: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
  onButtonClick?: () => void
}

interface VerticalPackagesProps {
  packages: PackageCard[]
  className?: string
  selectedPackage?: number
  onPackageSelect?: (index: number) => void
}

export default function VerticalPackages({ 
  packages, 
  className = '', 
  selectedPackage,
  onPackageSelect 
}: VerticalPackagesProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  const handlePackageSelect = (index: number) => {
    onPackageSelect?.(index)
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col gap-4">
        {packages.map((pkg, index) => {
          const isExpanded = expandedCards.has(index)
          const isSelected = selectedPackage === index

          return (
            <div
              key={index}
              className={`w-full bg-white rounded-lg border transition-all duration-200 ${
                isSelected 
                  ? 'border-[#ff0083] shadow-md' 
                  : 'border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Card Header with Radio Button */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Radio Button */}
                    <div 
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer mt-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePackageSelect(index)
                      }}
                      style={{
                        borderColor: isSelected ? '#ff0083' : '#d1d5db',
                        backgroundColor: isSelected ? '#ff0083' : 'transparent'
                      }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    
                    {/* Title and Subtitle */}
                    <div className="flex flex-col gap-1">
                      <h3 className="font-lato font-bold text-lg text-[#4a4a4a] leading-[1.47]">
                        {pkg.title}
                      </h3>
                      {pkg.subtitle && (
                        <p className="font-lato text-sm text-gray-500 leading-[1.47]">
                          {pkg.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="text-gray-400 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {pkg.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-3">
                          {item.icon && (
                            <div className="flex-shrink-0 w-5 h-5 text-gray-500">
                              {item.icon}
                            </div>
                          )}
                          <span className="font-lato text-sm text-gray-700 leading-[1.47]">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 border-t border-gray-100">
                    <Button
                      variant={pkg.buttonVariant}
                      size="md"
                      onClick={pkg.onButtonClick}
                      className="w-full"
                    >
                      {pkg.buttonLabel}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
