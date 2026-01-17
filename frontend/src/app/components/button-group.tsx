import { motion } from "motion/react";

interface ButtonOption {
  label: string;
  value: string;
}

interface ButtonGroupProps {
  options: ButtonOption[];
  onSelect: (value: string) => void;
  delay?: number;
}

export function ButtonGroup({ options, onSelect, delay = 0 }: ButtonGroupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-2 max-w-md"
    >
      {options.map((option, index) => (
        <motion.button
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: delay + index * 0.1 }}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option.value)}
          className="w-full px-5 py-3.5 rounded-xl bg-card border border-border text-left transition-all hover:border-primary hover:shadow-md hover:bg-accent/50"
        >
          <span className="text-[15px]">{option.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
