"use client"

import { useState } from "react"
import { Check, Lock, Clock, AlertTriangle, DollarSign, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { UserChoices } from "@/app/builder/page"

const goalLabels: Record<string, string> = {
  retirement: "Retirement",
  home: "Buying a home",
  emergency: "Emergency fund",
  wealth: "Long-term wealth",
  other: "Other",
}

const timeOptions = [
  { id: "0-2", label: "0–2 years", description: "Short term" },
  { id: "3-5", label: "3–5 years", description: "Medium term" },
  { id: "6-10", label: "6–10 years", description: "Longer term" },
  { id: "10+", label: "10+ years", description: "Long term" },
]

const riskOptions = [
  { id: "panic", label: "Panic and sell", emoji: "😰" },
  { id: "hold", label: "Hold", emoji: "😐" },
  { id: "buy-more", label: "Buy more", emoji: "📈" },
]

const amountChips = [500, 1000, 5000, 10000]

interface BuilderPanelProps {
  choices: UserChoices
  updateChoice: <K extends keyof UserChoices>(key: K, value: UserChoices[K]) => void
}

export function BuilderPanel({ choices, updateChoice }: BuilderPanelProps) {
  const [customAmount, setCustomAmount] = useState("")

  const handleAmountChip = (amount: number) => {
    updateChoice("amount", amount)
    setCustomAmount(amount.toString())
  }

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value)
    const num = Number.parseFloat(value)
    if (!isNaN(num) && num > 0) {
      updateChoice("amount", num)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Section 1: Goal (Locked) */}
      <section className="animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
            <Check className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-foreground">Goal</h3>
          <Lock className="w-4 h-4 text-muted-foreground ml-auto" />
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
          <span className="font-medium text-emerald-800">
            {choices.goal ? goalLabels[choices.goal] : "Not selected"}
          </span>
          <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Section 2: Time Horizon */}
      <section className="animate-in fade-in slide-in-from-right-4 duration-500 delay-150">
        <div className="flex items-center gap-2 mb-3">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              choices.timeHorizon ? "bg-emerald-100" : "bg-muted",
            )}
          >
            {choices.timeHorizon ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Clock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <h3 className="font-semibold text-foreground">Time Horizon</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {timeOptions.map((option) => {
            const isSelected = choices.timeHorizon === option.id
            return (
              <button
                key={option.id}
                onClick={() => updateChoice("timeHorizon", option.id)}
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all duration-200",
                  isSelected
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-border hover:border-emerald-400 hover:bg-emerald-50/50",
                )}
              >
                <span className={cn("font-medium block", isSelected ? "text-emerald-800" : "text-foreground")}>
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Section 3: Risk Behavior (appears after time is chosen) */}
      {choices.timeHorizon && (
        <section className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                choices.riskBehavior ? "bg-emerald-100" : "bg-muted",
              )}
            >
              {choices.riskBehavior ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <h3 className="font-semibold text-foreground">Risk Behavior</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">If your portfolio dropped 20%, what would you do?</p>
          <div className="space-y-2">
            {riskOptions.map((option) => {
              const isSelected = choices.riskBehavior === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => updateChoice("riskBehavior", option.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3",
                    isSelected
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-border hover:border-emerald-400 hover:bg-emerald-50/50",
                  )}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className={cn("font-medium", isSelected ? "text-emerald-800" : "text-foreground")}>
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* Section 4: Amount (appears after risk is chosen) */}
      {choices.riskBehavior && (
        <section className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                choices.amount ? "bg-emerald-100" : "bg-muted",
              )}
            >
              {choices.amount ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <h3 className="font-semibold text-foreground">Investment Amount</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {amountChips.map((amount) => (
              <Button
                key={amount}
                variant={choices.amount === amount ? "default" : "outline"}
                size="sm"
                onClick={() => handleAmountChip(amount)}
                className={cn(choices.amount === amount && "bg-emerald-600 hover:bg-emerald-700")}
              >
                ${amount.toLocaleString()}
              </Button>
            ))}
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmount(e.target.value)}
              className="pl-9"
            />
          </div>
        </section>
      )}

      {/* Summary */}
      {choices.amount && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 border-t border-border">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
            <h4 className="font-semibold text-emerald-900 mb-2">Your Learning Path</h4>
            <p className="text-sm text-emerald-800 leading-relaxed">
              You&apos;re investing <strong>${choices.amount.toLocaleString()}</strong> for{" "}
              <strong>{goalLabels[choices.goal || ""]}</strong> over <strong>{choices.timeHorizon} years</strong> with a{" "}
              <strong>
                {choices.riskBehavior === "panic"
                  ? "conservative"
                  : choices.riskBehavior === "hold"
                    ? "moderate"
                    : "growth-oriented"}{" "}
                mindset
              </strong>
              .
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
