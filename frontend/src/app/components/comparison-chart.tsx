import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ComparisonChartProps {
  initialAmount: number;
  years: number;
  riskLevel: number;
  delay?: number;
}

export function ComparisonChart({ initialAmount, years, riskLevel, delay = 0 }: ComparisonChartProps) {
  const avgReturn = 0.05 + (riskLevel / 100) * 0.05;
  const investmentValue = initialAmount * Math.pow(1 + avgReturn, years);
  const savingsValue = initialAmount * Math.pow(1.01, years); // 1% savings rate
  const inflationAdjusted = initialAmount * Math.pow(1.02, years); // 2% inflation

  const data = [
    {
      category: "Your Portfolio",
      value: Math.round(investmentValue),
      fill: "#0B4619",
    },
    {
      category: "Savings Account",
      value: Math.round(savingsValue),
      fill: "#D4AF37",
    },
    {
      category: "Inflation",
      value: Math.round(inflationAdjusted),
      fill: "#dc2626",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm mb-1">{payload[0].payload.category}</p>
          <p className="text-lg text-primary font-medium">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 border border-border"
    >
      <h3 className="text-lg mb-4">Comparing Your Options</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationBegin={delay * 1000}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center p-2 rounded-lg bg-primary/5">
          <span className="text-sm">Investment advantage</span>
          <span className="text-sm font-medium text-primary">
            +{formatCurrency(investmentValue - savingsValue)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground px-2">
          vs. keeping money in a traditional savings account over {years} years
        </p>
      </div>
    </motion.div>
  );
}
