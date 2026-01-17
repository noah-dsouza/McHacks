import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

interface GuidePanelProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  insight?: string;
}

export function GuidePanel({ step, totalSteps, title, description, insight }: GuidePanelProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h2 className="text-2xl mb-3">{title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>

        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 rounded-xl bg-accent/60 border border-accent-foreground/10 flex gap-3"
          >
            <Lightbulb className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-accent-foreground/90 leading-relaxed">{insight}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
