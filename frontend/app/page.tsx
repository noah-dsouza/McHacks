"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Target, Home, Wallet, TrendingUp, HelpCircle, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const goals = [
  { id: "retirement", label: "Retirement", icon: Target, description: "Build long-term financial security" },
  { id: "home", label: "Buying a home", icon: Home, description: "Save for your dream property" },
  { id: "emergency", label: "Emergency fund", icon: Wallet, description: "Prepare for unexpected expenses" },
  { id: "wealth", label: "Long-term wealth", icon: TrendingUp, description: "Grow your assets over time" },
  { id: "other", label: "Other", icon: HelpCircle, description: "Custom financial goal" },
]

export default function EntryPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const router = useRouter()

  const handleGetStarted = () => {
    if (selectedGoal) {
      localStorage.setItem("quantpilot_goal", selectedGoal)
      router.push("/builder")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Quant<span className="text-emerald-600">Pilot</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Learn investing by building and testing ideas. Educational only.
          </p>
        </div>

        {/* Goal Selection */}
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 block">Goal</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon
              const isSelected = selectedGoal === goal.id
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    "relative group p-6 rounded-xl border-2 transition-all duration-200 text-left",
                    "hover:border-emerald-500/50 hover:bg-emerald-50/50",
                    isSelected ? "border-emerald-600 bg-emerald-50 shadow-md" : "border-border bg-card",
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <Icon
                    className={cn(
                      "w-8 h-8 mb-3 transition-colors",
                      isSelected ? "text-emerald-600" : "text-muted-foreground group-hover:text-emerald-600",
                    )}
                  />
                  <h3 className={cn("font-semibold text-lg mb-1", isSelected ? "text-emerald-900" : "text-foreground")}>
                    {goal.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button
            size="lg"
            disabled={!selectedGoal}
            onClick={handleGetStarted}
            className={cn(
              "px-8 py-6 text-lg font-medium transition-all duration-300",
              selectedGoal
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
