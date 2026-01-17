import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AllocationData {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface AllocationChartProps {
  data: AllocationData[];
  delay?: number;
  riskLevel?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="font-medium text-sm mb-1">{payload[0].name}</p>
        <p className="text-primary text-lg">{payload[0].value}%</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
          {payload[0].payload.description}
        </p>
      </div>
    );
  }
  return null;
};

export function AllocationChart({ data, delay = 0, riskLevel = 50 }: AllocationChartProps) {
  const getRiskLabel = () => {
    if (riskLevel < 33) return "Conservative";
    if (riskLevel < 66) return "Moderate";
    return "Aggressive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 border border-border h-full"
    >
      <div className="mb-4">
        <h3 className="text-lg mb-1">Asset Allocation</h3>
        <p className="text-sm text-muted-foreground">{getRiskLabel()} Portfolio</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
            animationBegin={delay * 1000}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-sm">{value} ({entry.payload.value}%)</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}