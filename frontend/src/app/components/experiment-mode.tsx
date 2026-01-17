import { motion } from "motion/react";
import { ArrowLeft, Search, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PortfolioGrowthChart } from "./portfolio-growth-chart";
import { AllocationChart } from "./allocation-chart";
import { ComparisonChart } from "./comparison-chart";

interface ExperimentModeProps {
  onBack: () => void;
}

export function ExperimentMode({ onBack }: ExperimentModeProps) {
  const [query, setQuery] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (query.trim()) {
      setAnalyzed(true);
    }
  };

  const strategyData = {
    name: "60/40 Balanced Portfolio",
    description: "A classic allocation strategy balancing growth and stability",
    riskLevel: 50,
    timeHorizon: 15,
    allocation: [
      { name: "Stocks", value: 60, color: "#0B4619", description: "Equity exposure for growth" },
      { name: "Bonds", value: 35, color: "#2e7d32", description: "Fixed income for stability" },
      { name: "Cash", value: 5, color: "#66bb6a", description: "Liquidity reserve" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl mb-3">Experiment Mode</h1>
            <p className="text-muted-foreground">
              Test different investment strategies and see how they perform over time.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Try: 60/40 portfolio, aggressive growth, dividend strategy..."
                className="w-full pl-14 pr-4 py-5 rounded-xl bg-white border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-base"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Analyze Strategy</span>
              </motion.button>
              <button
                onClick={() => {
                  setQuery("60/40 balanced portfolio");
                  setAnalyzed(true);
                }}
                className="px-5 py-3 rounded-xl border-2 border-border hover:border-primary hover:bg-accent/30 transition-all text-sm"
              >
                Try Example
              </button>
            </div>
          </motion.div>

          {/* Results */}
          {analyzed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Strategy Summary */}
              <div className="p-6 rounded-2xl bg-white border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl mb-2">{strategyData.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {strategyData.description}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center px-4 py-2 rounded-lg bg-accent/30">
                      <p className="text-xs text-muted-foreground mb-1">Risk</p>
                      <p className="text-sm font-medium">Moderate</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-lg bg-accent/30">
                      <p className="text-xs text-muted-foreground mb-1">Horizon</p>
                      <p className="text-sm font-medium">15 years</p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/30">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Expected Return</p>
                    <p className="text-xl text-primary">7.2%</p>
                    <p className="text-xs text-muted-foreground">Annual average</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Volatility</p>
                    <p className="text-xl">11.5%</p>
                    <p className="text-xs text-muted-foreground">Standard deviation</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
                    <p className="text-xl">0.63</p>
                    <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                <AllocationChart data={strategyData.allocation} riskLevel={strategyData.riskLevel} delay={0.1} />
                <PortfolioGrowthChart
                  initialAmount={10000}
                  years={strategyData.timeHorizon}
                  riskLevel={strategyData.riskLevel}
                  delay={0.2}
                />
              </div>

              <ComparisonChart
                initialAmount={10000}
                years={strategyData.timeHorizon}
                riskLevel={strategyData.riskLevel}
                delay={0.3}
              />

              {/* Analysis */}
              <div className="p-6 rounded-2xl bg-white border border-border">
                <h3 className="text-lg mb-4">Quant Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Historical Context
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      The 60/40 portfolio has delivered an average annual return of 8-9% over the past 90 years,
                      though returns vary significantly by decade. Recent low interest rates have challenged this
                      traditional allocation.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Drawdown Risk
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      During market crashes, this portfolio has experienced maximum drawdowns of 25-35%.
                      The bond allocation helps cushion equity losses but doesn't eliminate risk.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Rebalancing Strategy
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      Annual rebalancing can add 0.3-0.5% in risk-adjusted returns by systematically buying
                      low and selling high. However, this triggers taxable events in non-registered accounts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-5 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Disclaimer:</strong> This analysis uses historical data
                  and statistical models for educational purposes only. Past performance does not guarantee
                  future results. This is not personalized investment advice. Consult a licensed financial
                  advisor before making investment decisions.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
