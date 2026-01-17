import { motion } from "motion/react";

interface TimelineVisualProps {
  years: number;
  delay?: number;
}

export function TimelineVisual({ years, delay = 0 }: TimelineVisualProps) {
  const milestones = [
    { year: 1, label: "1 year" },
    { year: 5, label: "5 years" },
    { year: 10, label: "10 years" },
    { year: 20, label: "20 years" },
    { year: 30, label: "30+ years" },
  ];

  const activeIndex = milestones.findIndex((m) => years <= m.year);
  const selectedMilestone = activeIndex >= 0 ? activeIndex : milestones.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="w-full bg-card rounded-2xl p-6 border border-border"
    >
      <h3 className="text-lg mb-6">Investment Timeline</h3>
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: delay + index * 0.1 }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full mb-2 ${
                  index <= selectedMilestone ? "bg-primary" : "bg-muted"
                }`}
                animate={{
                  scale: index === selectedMilestone ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: delay + 0.5,
                }}
              />
              <span
                className={`text-xs ${
                  index <= selectedMilestone ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {milestone.label}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="relative h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((selectedMilestone + 1) / milestones.length) * 100}%` }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
