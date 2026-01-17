import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

interface ETFCardProps {
  name: string;
  ticker: string;
  description: string;
  allocation: number;
  delay?: number;
}

export function ETFCard({ name, ticker, description, allocation, delay = 0 }: ETFCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-5 rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">{ticker}</span>
          </div>
          <h4 className="text-sm">{name}</h4>
        </div>
        <div className="text-right">
          <p className="text-lg text-primary">{allocation}%</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
