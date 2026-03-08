'use client'

import React, { useState } from 'react'
import { User, Mail } from 'lucide-react'
import Input from './Input'

// Form Component based on Figma design
export default function SimpleForm() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Icons for consistent form-wide behavior
  const userIcon = <User className="w-5 h-5" />
  const mailIcon = <Mail className="w-5 h-5" />

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* First Input - With User icon */}
      <Input
        label="First name"
        type='text'
        value={formData.field1}
        onChange={(value) => handleInputChange('field1', value)}
        placeholder="pet name"
      />

      {/* Second Input - With Mail icon */}
      <Input
        label="Last name"
        value={formData.field2}
        onChange={(value) => handleInputChange('field2', value)}
        placeholder="pet age"
      />
    </div>
  )
}
