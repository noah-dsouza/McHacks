import { motion } from "motion/react";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { TimelineVisual } from "./timeline-visual";

interface ResearchModeProps {
  onBack: () => void;
}

export function ResearchMode({ onBack }: ResearchModeProps) {
  const [query, setQuery] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (query.trim()) {
      setAnalyzed(true);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl mb-3">Research Investment Strategies</h2>
          <p className="text-muted-foreground">
            Explore different investment approaches and understand their characteristics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder="e.g., 60/40 portfolio, dividend growth, index investing..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            className="mt-4 px-6 py-3 rounded-xl bg-primary text-primary-foreground"
          >
            Analyze strategy
          </motion.button>
        </motion.div>

        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg mb-3">Strategy Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                A 60/40 portfolio typically allocates 60% to stocks and 40% to bonds. This classic
                strategy aims to balance growth potential with stability, making it popular among
                moderate investors.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                  <p className="text-lg text-accent-foreground">Moderate</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/50">
                  <p className="text-xs text-muted-foreground mb-1">Time Horizon</p>
                  <p className="text-lg text-accent-foreground">5-15 years</p>
                </div>
              </div>
            </div>

            <TimelineVisual years={10} delay={0.2} />

            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg mb-3">Key Considerations</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Historical performance:</strong> This strategy
                    has provided steady returns over long periods, though past performance doesn't
                    guarantee future results.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Rebalancing:</strong> Regular rebalancing helps
                    maintain your target allocation as markets move.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Volatility:</strong> Expect moderate price
                    swings, especially during market downturns.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Disclaimer:</strong> This analysis is for educational purposes only and does
                not constitute financial advice. Consult with a licensed financial advisor before
                making investment decisions.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
