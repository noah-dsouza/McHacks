import { motion } from "motion/react";
import { ArrowRight, BookOpen } from "lucide-react";

interface EntryScreenProps {
  onStartLearning: () => void;
  onExploreStrategies: () => void;
}

export function EntryScreen({ onStartLearning, onExploreStrategies }: EntryScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl mb-6 leading-tight tracking-tight">
            Learn how investing works by building a portfolio tailored to you.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Educational only. No financial advice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartLearning}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreStrategies}
              className="px-8 py-4 rounded-xl bg-card border border-border hover:border-primary hover:bg-accent transition-all"
            >
              Explore investment strategies
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-xs text-muted-foreground">
            This is an educational tool. Not personalized investment advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
