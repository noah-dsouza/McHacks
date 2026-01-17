import { motion } from "motion/react";
import { DollarSign } from "lucide-react";

interface AmountSelectorProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const presetAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

export function AmountSelector({ value, onChange, label = "Starting Amount" }: AmountSelectorProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
    onChange(Math.min(newValue, 1000000)); // Max 1M
  };

  return (
    <div className="space-y-4">
      <label className="text-sm text-muted-foreground">{label}</label>

      {/* Custom Input */}
      <div className="relative">
        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={value.toLocaleString()}
          onChange={handleCustomInput}
          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none transition-all text-xl font-medium"
          placeholder="10,000"
        />
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {presetAmounts.map((amount) => (
          <motion.button
            key={amount}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(amount)}
            className={`px-4 py-2.5 rounded-lg border-2 transition-all text-sm ${
              value === amount
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:bg-accent/30"
            }`}
          >
            {formatCurrency(amount)}
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Enter any amount up to $1,000,000
      </p>
    </div>
  );
}
