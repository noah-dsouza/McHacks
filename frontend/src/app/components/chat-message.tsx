import { motion } from "motion/react";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  delay?: number;
}

export function ChatMessage({ message, isBot, delay = 0 }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isBot
            ? "bg-card border border-border text-card-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <p className="text-[15px] leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
}
