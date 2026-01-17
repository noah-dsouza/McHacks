"use client"

import { TrendingUp, Clock, Brain, Coins } from "lucide-react"
import type { UserChoices } from "@/app/builder/page"

const goalLabels: Record<string, string> = {
  retirement: "Retirement",
  home: "Buying a home",
  emergency: "Emergency fund",
  wealth: "Long-term wealth",
  other: "Other",
}

interface EducationalSlidesProps {
  choices: UserChoices
}

export function EducationalSlides({ choices }: EducationalSlidesProps) {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Slide 1: Goal Education (always shown) */}
      {choices.goal && (
        <article className="bg-card rounded-xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Lesson 1</span>
              <h3 className="font-semibold text-foreground">Why {goalLabels[choices.goal]} goals matter</h3>
            </div>
          </div>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            {choices.goal === "retirement" && (
              <>
                <p>
                  <strong className="text-foreground">Planning for retirement</strong> is one of the most important
                  financial decisions you&apos;ll make. The earlier you start, the more time your money has to grow
                  through compound interest.
                </p>
                <p>
                  With longer time horizons, you can weather market volatility and potentially benefit from
                  higher-growth investments. However, you&apos;ll also need to consider{" "}
                  <strong className="text-foreground">inflation risk</strong>—the gradual erosion of purchasing power
                  over decades.
                </p>
                <p>The key is balancing growth potential with stability as you approach your target date.</p>
              </>
            )}
            {choices.goal === "home" && (
              <>
                <p>
                  <strong className="text-foreground">Saving for a home</strong> requires a different approach than
                  long-term investing. Your timeline is typically shorter, and you&apos;ll need your funds available at
                  a specific time.
                </p>
                <p>
                  This means <strong className="text-foreground">capital preservation</strong> becomes more important
                  than aggressive growth. You want to avoid a situation where market downturns delay your home purchase.
                </p>
                <p>
                  Consider your down payment target and when you plan to buy to determine the right balance of growth
                  and safety.
                </p>
              </>
            )}
            {choices.goal === "emergency" && (
              <>
                <p>
                  An <strong className="text-foreground">emergency fund</strong> is your financial safety net. Unlike
                  other investment goals, accessibility and stability are paramount.
                </p>
                <p>
                  You need funds that can be accessed quickly without penalty and won&apos;t lose significant value when
                  you need them most—often during market downturns when emergencies are more likely.
                </p>
                <p>The traditional advice is 3-6 months of expenses in highly liquid, low-risk investments.</p>
              </>
            )}
            {choices.goal === "wealth" && (
              <>
                <p>
                  <strong className="text-foreground">Building long-term wealth</strong> is about growing your net worth
                  over time through consistent investing and the power of compounding.
                </p>
                <p>
                  With a flexible timeline, you can take advantage of market cycles and potentially pursue higher-growth
                  strategies. The key is <strong className="text-foreground">staying invested</strong> through
                  volatility.
                </p>
                <p>Diversification across asset classes helps manage risk while maintaining growth potential.</p>
              </>
            )}
            {choices.goal === "other" && (
              <>
                <p>
                  <strong className="text-foreground">Custom financial goals</strong> require careful consideration of
                  your specific timeline, risk tolerance, and target amount.
                </p>
                <p>
                  Whether you&apos;re saving for education, a major purchase, or starting a business, the principles
                  remain: understand your timeline, assess your risk tolerance, and invest accordingly.
                </p>
                <p>Let&apos;s explore how different factors shape your investment approach.</p>
              </>
            )}
          </div>
        </article>
      )}

      {/* Slide 2: Time Horizon Education */}
      {choices.timeHorizon && (
        <article className="bg-card rounded-xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">Lesson 2</span>
              <h3 className="font-semibold text-foreground">How time changes risk</h3>
            </div>
          </div>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            {choices.timeHorizon === "0-2" && (
              <>
                <p>
                  With a <strong className="text-foreground">0-2 year timeline</strong>, you&apos;re in what investors
                  call the &quot;danger zone&quot; for volatility. There isn&apos;t enough time to recover from a
                  significant market downturn.
                </p>
                <p>
                  Because this is for {goalLabels[choices.goal || ""]}, you&apos;ll want to prioritize{" "}
                  <strong className="text-foreground">capital preservation</strong> over growth. High-yield savings
                  accounts, money market funds, or short-term bonds are typically appropriate.
                </p>
              </>
            )}
            {choices.timeHorizon === "3-5" && (
              <>
                <p>
                  A <strong className="text-foreground">3-5 year horizon</strong> gives you some flexibility, but not
                  much room for error. Historically, markets have experienced significant drawdowns that took 3-5 years
                  to recover from.
                </p>
                <p>
                  For your {goalLabels[choices.goal || ""]} goal, consider a{" "}
                  <strong className="text-foreground">balanced approach</strong>—some growth potential with a meaningful
                  allocation to stable assets.
                </p>
              </>
            )}
            {choices.timeHorizon === "6-10" && (
              <>
                <p>
                  With <strong className="text-foreground">6-10 years</strong>, you have meaningful time to ride out
                  market cycles. Historically, most market downturns recover within this timeframe.
                </p>
                <p>
                  This horizon allows for a <strong className="text-foreground">growth-tilted portfolio</strong> for
                  your {goalLabels[choices.goal || ""]} goal, while maintaining some diversification to manage
                  volatility.
                </p>
              </>
            )}
            {choices.timeHorizon === "10+" && (
              <>
                <p>
                  A <strong className="text-foreground">10+ year horizon</strong> is ideal for long-term investing. Over
                  these timeframes, stocks have historically outperformed other asset classes despite short-term
                  volatility.
                </p>
                <p>
                  For {goalLabels[choices.goal || ""]}, you can consider a more{" "}
                  <strong className="text-foreground">aggressive growth strategy</strong>, gradually shifting to more
                  conservative allocations as you approach your goal.
                </p>
              </>
            )}
          </div>
        </article>
      )}

      {/* Slide 3: Risk Behavior Education */}
      {choices.riskBehavior && (
        <article className="bg-card rounded-xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Brain className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-xs text-amber-600 font-medium uppercase tracking-wider">Lesson 3</span>
              <h3 className="font-semibold text-foreground">Behavioral risk is real</h3>
            </div>
          </div>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            {choices.riskBehavior === "panic" && (
              <>
                <p>
                  You indicated you&apos;d <strong className="text-foreground">sell during a 20% drop</strong>. This is
                  an honest and important self-assessment. Research shows panic selling is one of the biggest wealth
                  destroyers.
                </p>
                <p>
                  Given your {goalLabels[choices.goal || ""]} goal with a {choices.timeHorizon} year horizon, consider a{" "}
                  <strong className="text-foreground">more conservative allocation</strong>. It&apos;s better to accept
                  lower potential returns than to sell at the worst possible time.
                </p>
                <p>The best portfolio is one you can stick with through thick and thin.</p>
              </>
            )}
            {choices.riskBehavior === "hold" && (
              <>
                <p>
                  <strong className="text-foreground">Holding through volatility</strong> is the foundation of
                  successful long-term investing. Studies show that missing just the 10 best market days can cut returns
                  in half.
                </p>
                <p>
                  For your {goalLabels[choices.goal || ""]} goal over {choices.timeHorizon} years, your temperament
                  allows for a <strong className="text-foreground">balanced portfolio</strong> that captures growth
                  while managing downside.
                </p>
              </>
            )}
            {choices.riskBehavior === "buy-more" && (
              <>
                <p>
                  Viewing drops as <strong className="text-foreground">buying opportunities</strong> is the mindset of
                  successful long-term investors. Warren Buffett famously advised to be &quot;greedy when others are
                  fearful.&quot;
                </p>
                <p>
                  Combined with your {goalLabels[choices.goal || ""]} goal and {choices.timeHorizon} year timeline,
                  you&apos;re well-suited for a <strong className="text-foreground">growth-oriented strategy</strong>.
                  Just ensure you have cash reserves to deploy during downturns.
                </p>
              </>
            )}
          </div>
        </article>
      )}

      {/* Slide 4: Amount Context */}
      {choices.amount && (
        <article className="bg-card rounded-xl border border-border p-6 shadow-sm animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <Coins className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Lesson 4</span>
              <h3 className="font-semibold text-foreground">Making your money work</h3>
            </div>
          </div>
          <div className="prose prose-sm text-muted-foreground space-y-3">
            <p>
              You&apos;re starting with <strong className="text-foreground">${choices.amount.toLocaleString()}</strong>.
              Whether this is a lump sum or the beginning of regular contributions, the most important factor is{" "}
              <strong className="text-foreground">consistency over timing</strong>.
            </p>
            <p>
              Research consistently shows that time in the market beats timing the market. Regular contributions through
              market ups and downs—called dollar-cost averaging—can reduce the impact of volatility.
            </p>
            <p>
              For your {goalLabels[choices.goal || ""]} goal, consider setting up automatic contributions to stay on
              track regardless of market conditions.
            </p>
          </div>

          {/* Final Summary */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-foreground mb-2">Your Investment Profile</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You&apos;re investing for <strong className="text-foreground">{goalLabels[choices.goal || ""]}</strong>{" "}
              over <strong className="text-foreground">{choices.timeHorizon} years</strong>, with a{" "}
              <strong className="text-foreground">
                {choices.riskBehavior === "panic"
                  ? "conservative"
                  : choices.riskBehavior === "hold"
                    ? "moderate"
                    : "growth-oriented"}
              </strong>{" "}
              approach to market volatility. This profile suggests a thoughtful, educated approach to building wealth.
            </p>
          </div>
        </article>
      )}

      {/* Empty State */}
      {!choices.goal && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Your learning journey will appear here as you make choices.</p>
        </div>
      )}
    </div>
  )
}
