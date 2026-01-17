import { useState, useEffect } from "react";
import { LandingPage } from "./components/landing-page";
import { AuthModal } from "./components/auth-modal";
import { DashboardHeader } from "./components/dashboard-header";
import { AllocationChart } from "./components/allocation-chart";
import { PortfolioGrowthChart } from "./components/portfolio-growth-chart";
import { ComparisonChart } from "./components/comparison-chart";
import { Chatbot } from "./components/chatbot";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

type Screen = "landing" | "dashboard" | "experiment";
type UserMode = "none" | "demo" | "authenticated";

interface PortfolioState {
  riskLevel: number;
  timeHorizon: number;
  amount: number;
  goal: string;
}

function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [userMode, setUserMode] = useState<UserMode>("none");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    riskLevel: 50,
    timeHorizon: 15,
    amount: 10000,
    goal: "",
  });

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("quantPilotProgress");
    if (saved) {
      const data = JSON.parse(saved);
      setPortfolio(data.portfolio);
      setUserMode(data.userMode);
      if (data.userMode !== "none") {
        setScreen("dashboard");
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (userMode !== "none") {
      localStorage.setItem(
        "quantPilotProgress",
        JSON.stringify({
          portfolio,
          userMode,
        })
      );
    }
  }, [portfolio, userMode]);

  const handleStartLearning = () => {
    setShowAuthModal(true);
  };

  const handleTryDemo = () => {
    setUserMode("demo");
    setScreen("dashboard");
  };

  const handleAuthComplete = (mode: "demo" | "authenticated") => {
    setUserMode(mode);
    setShowAuthModal(false);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setUserMode("none");
    setScreen("landing");
    setPortfolio({
      riskLevel: 50,
      timeHorizon: 15,
      amount: 10000,
      goal: "",
    });
    localStorage.removeItem("quantPilotProgress");
  };

  const handleRiskChange = (value: number) => {
    setPortfolio((prev) => ({ ...prev, riskLevel: value }));
  };

  const handleTimeChange = (value: number) => {
    setPortfolio((prev) => ({ ...prev, timeHorizon: value }));
  };

  const handleAmountChange = (value: number) => {
    setPortfolio((prev) => ({ ...prev, amount: value }));
  };

  const handleGoalSelect = (value: string) => {
    setPortfolio((prev) => ({ ...prev, goal: value }));
  };

  const getAllocationData = () => {
    const { riskLevel } = portfolio;

    if (riskLevel < 33) {
      // Conservative
      return [
        {
          name: "Bonds",
          value: 50,
          color: "#60a5fa",
          description: "Government and corporate bonds for stability",
        },
        { name: "Stocks", value: 35, color: "#0B4619", description: "Diversified equity exposure" },
        { name: "Cash", value: 15, color: "#66bb6a", description: "Liquid reserves and money market" },
      ];
    } else if (riskLevel < 66) {
      // Moderate
      return [
        { name: "Stocks", value: 60, color: "#0B4619", description: "Global equity for growth" },
        { name: "Bonds", value: 30, color: "#2e7d32", description: "Fixed income for balance" },
        { name: "Cash", value: 10, color: "#66bb6a", description: "Liquidity buffer" },
      ];
    } else {
      // Aggressive
      return [
        { name: "Stocks", value: 80, color: "#0B4619", description: "Maximum equity exposure" },
        { name: "Bonds", value: 15, color: "#2e7d32", description: "Minimal fixed income" },
        { name: "Cash", value: 5, color: "#66bb6a", description: "Emergency reserves only" },
      ];
    }
  };

  if (screen === "landing") {
    return (
      <>
        <LandingPage onStartLearning={handleStartLearning} onTryDemo={handleTryDemo} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthComplete={handleAuthComplete}
        />
      </>
    );
  }

  // Dashboard (both learning and experiment modes use the same layout)
  const mode = screen === "experiment" ? "experiment" : "learning";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader userMode={userMode} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section - Portfolio Visualization (Full Width) */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${portfolio.riskLevel}-${portfolio.timeHorizon}-${portfolio.amount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[1800px] mx-auto space-y-6"
            >
              {/* Summary Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary to-[#2e7d32] text-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl mb-2">
                      {portfolio.riskLevel < 33
                        ? "Conservative"
                        : portfolio.riskLevel < 66
                        ? "Balanced"
                        : "Growth-Focused"}{" "}
                      Portfolio
                    </h2>
                    <p className="text-white/80">
                      {portfolio.timeHorizon}-year timeline · ${portfolio.amount.toLocaleString()} starting
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80 mb-1">Expected Annual Return</p>
                    <p className="text-4xl">{(5 + (portfolio.riskLevel / 100) * 5).toFixed(1)}%</p>
                  </div>
                </div>
              </motion.div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                <AllocationChart data={getAllocationData()} riskLevel={portfolio.riskLevel} delay={0.1} />

                <PortfolioGrowthChart
                  initialAmount={portfolio.amount}
                  years={portfolio.timeHorizon}
                  riskLevel={portfolio.riskLevel}
                  delay={0.2}
                />
              </div>

              <ComparisonChart
                initialAmount={portfolio.amount}
                years={portfolio.timeHorizon}
                riskLevel={portfolio.riskLevel}
                delay={0.3}
              />

              {/* Mode Toggle */}
              <div className="flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScreen(screen === "dashboard" ? "experiment" : "dashboard")}
                  className="px-6 py-3 rounded-xl bg-white border-2 border-primary text-primary hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>
                    {screen === "dashboard" ? "Switch to Experiment Mode" : "Switch to Learning Mode"}
                  </span>
                </motion.button>
              </div>

              {/* Educational Note */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-2xl bg-white border border-border"
              >
                <h3 className="text-lg mb-3">Understanding Your Portfolio</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <p className="mb-3">
                      <strong className="text-foreground">Risk level:</strong> Your portfolio is{" "}
                      {portfolio.riskLevel < 33
                        ? "conservative, prioritizing stability over maximum growth"
                        : portfolio.riskLevel < 66
                        ? "balanced, blending growth and stability"
                        : "growth-focused, accepting higher volatility for greater potential returns"}
                      .
                    </p>
                    <p>
                      <strong className="text-foreground">Time horizon:</strong> With {portfolio.timeHorizon}{" "}
                      years, you have{" "}
                      {portfolio.timeHorizon >= 20
                        ? "excellent time to ride out market cycles"
                        : portfolio.timeHorizon >= 10
                        ? "good time for compound growth to work"
                        : "a shorter timeline that favors stability"}
                      .
                    </p>
                  </div>
                  <div>
                    <p className="mb-3">
                      <strong className="text-foreground">Volatility:</strong> The shaded area in the growth
                      chart shows potential range based on market volatility. Markets don't grow in a straight
                      line.
                    </p>
                    <p>
                      <strong className="text-foreground">Remember:</strong> These projections use historical
                      averages. Real returns will vary. Consult a licensed advisor before investing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section - Chatbot (Full Width) */}
        <div className="h-[500px] border-t-2 border-border bg-muted/30 p-6">
          <div className="h-full max-w-[1800px] mx-auto">
            <Chatbot
              mode={mode}
              onRiskChange={handleRiskChange}
              onTimeChange={handleTimeChange}
              onAmountChange={handleAmountChange}
              onGoalSelect={handleGoalSelect}
              currentRisk={portfolio.riskLevel}
              currentTime={portfolio.timeHorizon}
              currentAmount={portfolio.amount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
