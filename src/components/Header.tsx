'use client'

import React from 'react'
import { MoreHorizontal } from 'lucide-react'

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

export default function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-3 h-16">
        {/* Logo Button */}
        <div className="flex items-center">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M16.6602 1.68115C18.9385 1.7291 20.0313 3.98147 19.2598 6.62451C17.9411 11.1408 14.0836 11.1413 14.04 11.1411C14.0374 11.16 13.7934 12.9103 13.4951 14.7476C13.2119 16.4928 12.9521 17.5688 12.9521 17.5688C12.9787 17.5793 14.0583 18.0082 15.6094 19.6138C16.9972 21.0504 17.7473 22.1777 17.4072 22.5005C17.1727 22.7228 16.7244 22.3086 15.874 21.522C15.5986 21.2672 15.2804 20.9728 14.9141 20.6489C13.5706 19.461 12.6219 19.0017 12.6113 18.9966C12.6113 18.9966 11.6955 22.311 6.84863 21.8315C2.71606 21.4223 3.08759 17.2817 6.46484 16.5835C8.66286 16.1295 10.7295 16.7749 10.7295 16.7749C10.7333 16.7554 11.0674 15.0227 11.2627 13.644C11.4645 12.2193 11.5997 11.0546 11.6006 11.0474C11.5659 11.0428 8.32223 10.6082 7.58691 7.98486C7.36873 7.20535 8.06951 6.82385 8.53418 7.64404C9.51667 9.37853 11.7412 9.66846 11.7412 9.66846C12.5765 3.64737 14.3593 1.63306 16.6602 1.68115ZM10.3516 18.1489C10.3399 18.1441 8.87389 17.5398 7.11719 17.9194C5.18695 18.3367 5.30263 19.9527 7.4043 20.0298C9.88302 20.1208 10.3431 18.1855 10.3516 18.1489ZM16.7383 3.69482C14.9867 3.5525 14.2526 9.61957 14.2461 9.67334C14.2821 9.67173 16.5695 9.55771 17.5303 6.51123C17.8607 5.46387 17.9522 3.79389 16.7383 3.69482Z" fill="#4A4A4A"/>
            </svg>
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
