import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

interface TeachingTooltipProps {
  content: string;
  delay?: number;
}

export function TeachingTooltip({ content, delay = 0 }: TeachingTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-3 items-start p-4 rounded-xl bg-accent/60 border border-accent-foreground/10 max-w-md"
    >
      <Lightbulb className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
      <p className="text-sm text-accent-foreground/90 leading-relaxed">{content}</p>
    </motion.div>
  );
}
