"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BuilderPanel } from "@/components/builder-panel"
import { EducationalSlides } from "@/components/educational-slides"

export interface UserChoices {
  goal: string | null
  timeHorizon: string | null
  riskBehavior: string | null
  amount: number | null
}

export default function BuilderPage() {
  const router = useRouter()
  const [choices, setChoices] = useState<UserChoices>({
    goal: null,
    timeHorizon: null,
    riskBehavior: null,
    amount: null,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedGoal = localStorage.getItem("quantpilot_goal")
    if (!storedGoal) {
      router.push("/")
      return
    }
    setChoices((prev) => ({ ...prev, goal: storedGoal }))
    setMounted(true)
  }, [router])

  const updateChoice = <K extends keyof UserChoices>(key: K, value: UserChoices[K]) => {
    setChoices((prev) => ({ ...prev, [key]: value }))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-500">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            Quant<span className="text-emerald-600">Pilot</span>
          </h1>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Educational Only</span>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
        {/* Left: Educational Content */}
        <div className="flex-1 lg:w-1/2 border-r border-border overflow-y-auto bg-muted/30">
          <EducationalSlides choices={choices} />
        </div>

        {/* Right: Builder Panel */}
        <div className="lg:w-[420px] xl:w-[480px] bg-card overflow-y-auto">
          <BuilderPanel choices={choices} updateChoice={updateChoice} />
        </div>
      </div>
    </div>
  )
}
