import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface RiskSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function RiskSlider({ value, onChange, label = "Risk Tolerance" }: RiskSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
  };

  const handleMouseUp = () => {
    onChange(localValue);
  };

  const getRiskLabel = () => {
    if (localValue < 33) return "Conservative";
    if (localValue < 66) return "Moderate";
    return "Aggressive";
  };

  const getRiskColor = () => {
    if (localValue < 33) return "#60a5fa";
    if (localValue < 66) return "#0B4619";
    return "#D4AF37";
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <motion.span
          key={localValue}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ 
            backgroundColor: `${getRiskColor()}20`,
            color: getRiskColor()
          }}
        >
          {getRiskLabel()}
        </motion.span>
      </div>

      <div className="relative pt-2 pb-6">
        <input
          type="range"
          min="0"
          max="100"
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="w-full h-2 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #60a5fa 0%, #0B4619 50%, #D4AF37 100%)`,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1"
        >
          <span>Low Risk</span>
          <span>High Risk</span>
        </motion.div>

        <style>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: white;
            border: 3px solid ${getRiskColor()};
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.2s ease;
          }
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: white;
            border: 3px solid ${getRiskColor()};
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.2s ease;
          }
          .slider::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );
}
