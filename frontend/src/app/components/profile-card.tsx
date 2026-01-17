import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface ProfileCardProps {
  title: string;
  description: string;
  delay?: number;
}

export function ProfileCard({ title, description, delay = 0 }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm opacity-90">Your Investment Profile</span>
        </div>
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
