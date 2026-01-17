import { motion, AnimatePresence } from "motion/react";
import { Bot, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { RiskSlider } from "./risk-slider";
import { TimeSlider } from "./time-slider";
import { AmountSelector } from "./amount-selector";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  controlType?: "risk" | "time" | "amount" | "goals" | "confirmation";
  options?: { label: string; value: string }[];
}

interface ChatbotProps {
  mode: "learning" | "experiment";
  onRiskChange?: (value: number) => void;
  onTimeChange?: (value: number) => void;
  onAmountChange?: (value: number) => void;
  onGoalSelect?: (value: string) => void;
  currentRisk?: number;
  currentTime?: number;
  currentAmount?: number;
}

export function Chatbot({
  mode,
  onRiskChange,
  onTimeChange,
  onAmountChange,
  onGoalSelect,
  currentRisk = 50,
  currentTime = 15,
  currentAmount = 10000,
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [showControl, setShowControl] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize conversation based on mode
    if (mode === "learning" && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hi! I'm here to help you learn about investing through hands-on exploration.",
          0
        );
        setTimeout(() => {
          addBotMessage(
            "Let's start by understanding what you're hoping to achieve with your investments.",
            600,
            "goals"
          );
        }, 1200);
      }, 300);
    } else if (mode === "experiment" && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Welcome to Experiment Mode! I can help you analyze different investment strategies.",
          0
        );
        setTimeout(() => {
          addBotMessage(
            "Ask me anything about investment strategies, or adjust the controls to see how different factors affect your portfolio.",
            600
          );
        }, 1200);
      }, 300);
    }
  }, [mode]);

  const addBotMessage = (
    text: string,
    delay: number = 0,
    controlType?: Message["controlType"],
    options?: Message["options"]
  ) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random(),
        text,
        isBot: true,
        controlType,
        options,
      };
      setMessages((prev) => [...prev, newMessage]);
      if (controlType) {
        setShowControl(controlType);
      }
    }, delay);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      text,
      isBot: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    setShowControl(null);
  };

  const handleGoalSelection = (value: string, label: string) => {
    addUserMessage(label);
    onGoalSelect?.(value);

    setTimeout(() => {
      addBotMessage(
        `Great choice! Now, let's think about your investment timeline. When do you think you'll need this money?`,
        500,
        "time"
      );
    }, 800);
  };

  const handleTimeSet = () => {
    addUserMessage(`${currentTime} years`);
    setTimeout(() => {
      addBotMessage(
        `Perfect. With a ${currentTime}-year timeline, you have ${
          currentTime >= 20
            ? "excellent time to ride out market cycles"
            : currentTime >= 10
            ? "good time for compound growth"
            : "a shorter timeline that favors stability"
        }.`,
        500
      );
      setTimeout(() => {
        addBotMessage(
          "Now let's talk about risk. How comfortable are you with market volatility?",
          1200,
          "risk"
        );
      }, 1800);
    }, 800);
  };

  const handleRiskSet = () => {
    const riskLabel =
      currentRisk < 33 ? "Conservative" : currentRisk < 66 ? "Moderate" : "Aggressive";
    addUserMessage(`${riskLabel} risk tolerance`);
    setTimeout(() => {
      addBotMessage(
        `Got it. A ${riskLabel.toLowerCase()} approach means you're ${
          currentRisk < 33
            ? "prioritizing stability over maximum growth"
            : currentRisk < 66
            ? "balancing growth and stability"
            : "seeking higher growth potential with more volatility"
        }.`,
        500
      );
      setTimeout(() => {
        addBotMessage(
          "Finally, how much are you thinking of investing to start?",
          1200,
          "amount"
        );
      }, 1800);
    }, 800);
  };

  const handleAmountSet = () => {
    addUserMessage(`$${currentAmount.toLocaleString()}`);
    setTimeout(() => {
      addBotMessage(
        `Excellent! I've created a portfolio simulation based on your preferences. Check out the charts above to see how your portfolio could grow over time.`,
        500
      );
      setTimeout(() => {
        addBotMessage(
          `Feel free to adjust any of the sliders to see how changes affect your projections. You can also ask me questions anytime!`,
          1500
        );
      }, 2000);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    const question = userInput.toLowerCase();
    setUserInput("");

    // Simple response logic for experiment mode
    setTimeout(() => {
      if (question.includes("risk") || question.includes("volatile")) {
        addBotMessage(
          "Risk and return are closely connected. Higher-risk portfolios historically show greater returns over long periods, but also experience larger short-term swings. Your comfort with these swings is crucial."
        );
      } else if (question.includes("time") || question.includes("horizon")) {
        addBotMessage(
          "Time horizon is one of the most important factors. Longer timelines allow you to recover from market downturns and benefit from compound growth. Generally, longer = more growth-focused allocation."
        );
      } else if (question.includes("allocation") || question.includes("stocks") || question.includes("bonds")) {
        addBotMessage(
          "Asset allocation determines your balance between growth and stability. Stocks offer higher growth potential but more volatility. Bonds provide stability but lower returns. Cash is for liquidity and safety."
        );
      } else if (question.includes("rebalance")) {
        addBotMessage(
          "Rebalancing means periodically adjusting your portfolio back to your target allocation. This helps you 'buy low, sell high' systematically. Most investors rebalance annually or when allocations drift 5%+."
        );
      } else if (question.includes("etf") || question.includes("fund")) {
        addBotMessage(
          "ETFs (Exchange-Traded Funds) are great for beginners because they provide instant diversification. Index ETFs track entire markets at low cost. For example, VT holds the entire global stock market in one fund."
        );
      } else {
        addBotMessage(
          "That's a great question! Based on the charts above, you can see how different factors interact. Try adjusting the sliders to explore different scenarios, or ask me about specific topics like risk, allocation, or ETFs."
        );
      }
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-border">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex gap-3 ${message.isBot ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                  message.isBot ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.isBot ? <Bot className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full bg-foreground" />}
              </div>
              <div className={`max-w-[70%] ${message.isBot ? "" : "text-right"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.isBot
                      ? "bg-muted/50 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{message.text}</p>
                </div>

                {/* Interactive Controls */}
                {message.isBot && message.controlType && showControl === message.controlType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-4 p-4 rounded-xl bg-accent/40 border border-accent-foreground/10"
                  >
                    {message.controlType === "goals" && (
                      <div className="space-y-2">
                        {[
                          { label: "Retirement", value: "retirement" },
                          { label: "Buying a home", value: "home" },
                          { label: "General wealth building", value: "general" },
                          { label: "Education savings", value: "education" },
                        ].map((option) => (
                          <motion.button
                            key={option.value}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleGoalSelection(option.value, option.label)}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-border hover:border-primary hover:shadow-md transition-all text-left"
                          >
                            {option.label}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {message.controlType === "time" && (
                      <div>
                        <TimeSlider value={currentTime} onChange={onTimeChange || (() => {})} />
                        <button
                          onClick={handleTimeSet}
                          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
                        >
                          Confirm Timeline
                        </button>
                      </div>
                    )}

                    {message.controlType === "risk" && (
                      <div>
                        <RiskSlider value={currentRisk} onChange={onRiskChange || (() => {})} />
                        <button
                          onClick={handleRiskSet}
                          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
                        >
                          Confirm Risk Level
                        </button>
                      </div>
                    )}

                    {message.controlType === "amount" && (
                      <div>
                        <AmountSelector value={currentAmount} onChange={onAmountChange || (() => {})} />
                        <button
                          onClick={handleAmountSet}
                          className="mt-4 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all"
                        >
                          Confirm Amount
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything about investing..."
            className="flex-1 px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
