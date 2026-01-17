import { motion } from "motion/react";
import { TrendingUp, BarChart3, Shield } from "lucide-react";
import logo from "@/assets/8a114fe9edd116ad1d4b78871519eb6c4ffe55ba.png";

interface LandingPageProps {
  onStartLearning: () => void;
  onTryDemo: () => void;
}

export function LandingPage({ onStartLearning, onTryDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #c8e6c9 100%)' }}>
      {/* Animated chart hints */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32"
        >
          <TrendingUp className="w-full h-full text-primary" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-20 w-40 h-40"
        >
          <BarChart3 className="w-full h-full text-primary" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex justify-center"
          >
            <img src={logo} alt="QuantPilot" className="h-20 md:h-24" />
          </motion.div>

          {/* Hero Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight">
            Build and understand an investment portfolio — <span className="text-primary">visually</span>.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            See how investing works before you ever invest real money.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartLearning}
              className="px-10 py-5 rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-2xl transition-all text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start learning
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onTryDemo}
              className="px-10 py-5 rounded-xl bg-white/80 backdrop-blur border-2 border-primary/20 hover:border-primary hover:bg-white transition-all text-lg"
            >
              Try demo
            </motion.button>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <TrendingUp className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="text-base mb-2">Interactive Simulation</h3>
              <p className="text-sm text-muted-foreground">See portfolios react in real-time</p>
            </div>
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <BarChart3 className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="text-base mb-2">Data-Driven Insights</h3>
              <p className="text-sm text-muted-foreground">Understand the numbers behind investing</p>
            </div>
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur border border-primary/10">
              <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="text-base mb-2">Educational Only</h3>
              <p className="text-sm text-muted-foreground">No financial advice, just learning</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-0 right-0 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Educational tool only. Not personalized investment advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
