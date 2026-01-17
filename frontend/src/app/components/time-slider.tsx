import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TimeSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function TimeSlider({ value, onChange, label = "Investment Timeline" }: TimeSliderProps) {
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

  const getYearLabel = () => {
    if (localValue === 1) return "1 year";
    return `${localValue} years`;
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm text-muted-foreground">{label}</label>
        <motion.span
          key={localValue}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10"
        >
          {getYearLabel()}
        </motion.span>
      </div>

      <div className="relative pt-2 pb-6">
        <input
          type="range"
          min="1"
          max="40"
          value={localValue}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          className="w-full h-2 rounded-full appearance-none cursor-pointer time-slider"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1"
        >
          <span>1 year</span>
          <span>10 years</span>
          <span>20 years</span>
          <span>40 years</span>
        </motion.div>

        <style>{`
          .time-slider {
            background: linear-gradient(to right, #E8F5E9 0%, #0B4619 100%);
          }
          .time-slider::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: white;
            border: 3px solid #0B4619;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.2s ease;
          }
          .time-slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
          .time-slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: white;
            border: 3px solid #0B4619;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transition: all 0.2s ease;
          }
          .time-slider::-moz-range-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    </div>
  );
}
