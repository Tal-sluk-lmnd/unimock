'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import HeaderFloat from '../components/HeaderFloat'
import Step0 from '../components/Step0'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [useHeaderFloat, setUseHeaderFloat] = useState(false) // Toggle between headers
  const [showSettings, setShowSettings] = useState(false)
  const [showBottomButtons, setShowBottomButtons] = useState(true) // Toggle bottom buttons visibility

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev > 0 ? prev - 1 : 0)
  }

  const toggleHeader = () => {
    setUseHeaderFloat(!useHeaderFloat)
  }

  const toggleBottomButtons = () => {
    setShowBottomButtons(!showBottomButtons)
  }

  const closeSettings = () => {
    setShowSettings(false)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0 onNext={handleNext} showBottomButtons={showBottomButtons} />
      case 1:
        return <Step1 onNext={handleNext} showBottomButtons={showBottomButtons} />
      case 2:
        return <Step2 onNext={handleNext} onPrevious={handlePrevious} showBottomButtons={showBottomButtons} />
      default:
        return <Step0 onNext={handleNext} showBottomButtons={showBottomButtons} />
    }
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#f7f7f7' }}>
      <img
        src="/Live Policy_Background Image.png"
        alt=""
        className="absolute top-[62px] left-0 w-full h-[188px] object-cover"
      />

      {/* Header Rendering */}
      <Header />

      {/* Render current step */}
      {renderCurrentStep()}

      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Developer Settings</h2>
              <button 
                onClick={closeSettings}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Header Type</span>
                <button
                  onClick={toggleHeader}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    useHeaderFloat 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {useHeaderFloat ? 'Floating Header' : 'Regular Header'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Bottom Buttons</span>
                <button
                  onClick={toggleBottomButtons}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showBottomButtons 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showBottomButtons ? 'Visible' : 'Hidden'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Current Step</span>
                <span className="text-gray-500">{currentStep}</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Triple-click at the bottom of any page to open this settings panel
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}