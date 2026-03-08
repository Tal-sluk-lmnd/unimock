'use client'

import React from 'react'
import Button from './Button'

interface ContentItem {
  icon?: React.ReactNode
  label: string
}

interface PackageCard {
  title: string
  content: ContentItem[]
  buttonLabel: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
  onButtonClick?: () => void
}

interface PackagesProps {
  packages: PackageCard[]
  className?: string
}

export default function Packages({ packages, className = '' }: PackagesProps) {

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-lato font-bold text-lg text-[#4a4a4a] leading-[1.47]">
                {pkg.title}
              </h3>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1">
              <div className="space-y-3">
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
            <div className="p-4 border-t border-gray-100">
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
        ))}
      </div>
    </div>
  )
}
