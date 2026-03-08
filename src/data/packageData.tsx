import React from 'react'
import { Check, Star, Shield, Zap } from 'lucide-react'

export const packageConfigs = [
  {
    title: "Basic Plan",
    subtitle: "Perfect for getting started",
    content: [
      { icon: <Check className="w-4 h-4" />, label: "Up to 5 projects" },
      { icon: <Check className="w-4 h-4" />, label: "Basic support" },
      { icon: <Check className="w-4 h-4" />, label: "1GB storage" }
    ],
    buttonLabel: "Choose Basic",
    buttonVariant: "secondary" as const,
    onButtonClick: () => console.log("Basic plan selected")
  },
  {
    title: "Pro Plan",
    subtitle: "Most popular choice",
    content: [
      { icon: <Star className="w-4 h-4" />, label: "Unlimited projects" },
      { icon: <Shield className="w-4 h-4" />, label: "Priority support" },
      { icon: <Zap className="w-4 h-4" />, label: "10GB storage" },
      { icon: <Check className="w-4 h-4" />, label: "Advanced features" }
    ],
    buttonLabel: "Choose Pro",
    buttonVariant: "primary" as const,
    onButtonClick: () => console.log("Pro plan selected")
  },
  {
    title: "Enterprise",
    subtitle: "For large organizations",
    content: [
      { icon: <Shield className="w-4 h-4" />, label: "Everything in Pro" },
      { icon: <Star className="w-4 h-4" />, label: "24/7 support" },
      { icon: <Zap className="w-4 h-4" />, label: "Unlimited storage" },
      { icon: <Check className="w-4 h-4" />, label: "Custom integrations" }
    ],
    buttonLabel: "Contact Sales",
    buttonVariant: "secondary" as const,
    onButtonClick: () => console.log("Enterprise plan selected")
  }
]
