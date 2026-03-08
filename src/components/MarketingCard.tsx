'use client'

import React from 'react'
import Button from './Button'

interface MarketingCardProps {
  title: string
  subtitle?: string
  content?: string
  primaryButtonText?: string
  primaryButtonOnClick?: () => void
  secondaryButtonText?: string
  secondaryButtonOnClick?: () => void
  tag?: string
  illustration?: string
  className?: string
}

export default function MarketingCard({
  title,
  subtitle,
  content = "This is a placeholder paragraph meant to represent the structure and content of a final text. It can be used to visualize where the main body of your content will go. Consider this space to include key information, such as an introduction to your topic, important details, and any additional context that will help your readers understand the subject.",
  primaryButtonText = "Button",
  primaryButtonOnClick,
  secondaryButtonText = "Button Link",
  secondaryButtonOnClick,
  tag,
  illustration,
  className = ""
}: MarketingCardProps) {
  return (
    <div className={`bg-white relative rounded-2xl shadow-[0px_12px_32px_-8px_rgba(32,32,32,0.08)] border border-[#ececec] overflow-hidden ${className}`} style={{ width: 'calc(100vw - 48px)', marginLeft: 'calc(-50vw + 50% + 24px)', marginRight: 'calc(-50vw + 50% + 24px)' }}>
      <div className="flex flex-col">
        {/* Illustration Section */}
        <div className="h-[185px] relative rounded-tl-2xl rounded-tr-2xl overflow-hidden">
          {illustration ? (
            <img 
              src={illustration} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[#ececec] flex items-center justify-center">
              <span className="text-gray-400 font-lato text-sm">Illustration Placeholder</span>
            </div>
          )}
        </div>

        {/* Tag */}
        {tag && (
          <div className="absolute top-3 right-3 bg-[#ffebf5] px-3 py-1 rounded-full">
            <span className="font-lato font-bold text-[#ff0083] text-sm leading-[1.47]">
              {tag}
            </span>
          </div>
        )}

        {/* Content Section */}
        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Text Content */}
          <div className="flex flex-col gap-2 items-center text-center">
            {/* Title */}
            <h3 className="font-lato font-bold text-[#4a4a4a] text-base leading-[1.47] max-h-12 overflow-hidden">
              {title}
            </h3>
            
            {/* Subtitle */}
            {subtitle && (
              <h4 className="font-lato font-bold text-[#4a4a4a] text-sm leading-[1.47]">
                {subtitle}
              </h4>
            )}
            
            {/* Content */}
            {content && (
              <p className="font-lato text-[#4a4a4a] text-sm leading-[1.47] text-center">
                {content}
              </p>
            )}
          </div>

          {/* Button Group */}
          <div className="flex flex-col gap-4 items-center">
            {/* Primary Button */}
            {primaryButtonText && (
              <Button
                variant="primary"
                size="lg"
                onClick={primaryButtonOnClick}
                className="w-full h-14 px-16"
              >
                {primaryButtonText}
              </Button>
            )}
            
            {/* Secondary Button */}
            {secondaryButtonText && (
              <button
                onClick={secondaryButtonOnClick}
                className="font-lato text-[#4a4a4a] text-base leading-[1.47] capitalize underline decoration-[#b7b7b7] underline-offset-2 hover:text-[#ff0083] hover:decoration-[#ff0083] transition-colors duration-200"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
