'use client'

import React from 'react'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'

// Stepper Component based on Figma design
interface InnerStepProps {
  state?: "Next" | "Past" | "Current";
  progress?: "Start" | "Mid" | "End" | "None";
}

function InnerStep({ state = "Current", progress = "Start" }: InnerStepProps) {
  if (state === "Next" && progress === "None") {
    return <div className="rounded-full h-1.5 w-full" style={{ backgroundColor: '#FFB4DA' }} />;
  }
  return (
    <div className="bg-gray-300 rounded-full h-1.5 w-full relative overflow-hidden">
      <div 
        className="h-full rounded-full w-full" 
        style={{ 
          background: state === "Current" 
            ? "linear-gradient(90deg, rgb(255, 0, 131) 0%, rgb(255, 0, 131) 100%)" 
            : "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" 
        }} 
      />
    </div>
  );
}

function Stepper() {
  return (
    <div className="flex gap-1 items-center">
      <div className="w-1.5 h-1.5">
        <InnerStep state="Next" progress="None" />
      </div>
      <div className="w-1.5 h-1.5">
        <InnerStep state="Next" progress="None" />
      </div>
      <div className="w-1.5 h-1.5">
        <InnerStep state="Next" progress="None" />
      </div>
      <div className="w-1.5 h-1.5">
        <InnerStep state="Next" progress="None" />
      </div>
      <div className="w-8 h-1.5">
        <InnerStep state="Current" progress="Start" />
      </div>
    </div>
  );
}

interface HeaderProps {
  onBack?: () => void
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-3 h-16">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            onClick={onBack}
          >
            <ChevronLeft className="w-6 h-6 text-[#4A4A4A]" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-gray-800 leading-[147%]">Quote</span>
          <Stepper />
        </div>

        {/* Icon Holder */}
        <div className="flex items-center">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center">
            <MoreHorizontal className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
