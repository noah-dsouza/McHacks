import { motion } from "motion/react";
import { Check } from "lucide-react";

interface AccountCardProps {
  name: string;
  description: string;
  benefit: string;
  recommended?: boolean;
  delay?: number;
}

export function AccountCard({ name, description, benefit, recommended = false, delay = 0 }: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-5 rounded-xl border transition-all ${
        recommended
          ? "bg-accent border-primary shadow-lg"
          : "bg-card border-border"
      }`}
    >
      {recommended && (
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-3 h-3 text-primary-foreground" />
          </div>
          <span className="text-xs text-primary">Recommended for you</span>
        </div>
      )}
      <h4 className="text-base mb-2">{name}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
      <div className="pt-3 border-t border-border">
        <p className="text-xs text-accent-foreground">
          <span className="font-medium">Why this matters: </span>
          {benefit}
        </p>
      </div>
    </motion.div>
  );
}
