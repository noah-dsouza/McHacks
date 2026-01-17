import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface PortfolioGrowthChartProps {
  initialAmount: number;
  years: number;
  riskLevel: number;
  delay?: number;
}

export function PortfolioGrowthChart({ initialAmount, years, riskLevel, delay = 0 }: PortfolioGrowthChartProps) {
  // Generate simulated portfolio growth data
  const generateData = () => {
    const data = [];
    const avgReturn = 0.05 + (riskLevel / 100) * 0.05; // 5-10% based on risk
    const volatility = (riskLevel / 100) * 0.15; // 0-15% volatility
    
    for (let year = 0; year <= years; year++) {
      const expectedValue = initialAmount * Math.pow(1 + avgReturn, year);
      const upperBound = initialAmount * Math.pow(1 + avgReturn + volatility, year);
      const lowerBound = initialAmount * Math.pow(1 + avgReturn - volatility, year);
      
      data.push({
        year,
        expected: Math.round(expectedValue),
        upper: Math.round(upperBound),
        lower: Math.round(lowerBound),
      });
    }
    return data;
  };

  const data = generateData();
  const finalValue = data[data.length - 1].expected;
  const growth = ((finalValue - initialAmount) / initialAmount) * 100;

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
          <p className="text-sm mb-2">Year {payload[0].payload.year}</p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Expected: <span className="text-primary font-medium">{formatCurrency(payload[0].payload.expected)}</span>
            </p>
            <p className="text-muted-foreground">
              Range: {formatCurrency(payload[0].payload.lower)} - {formatCurrency(payload[0].payload.upper)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 border border-border h-full"
    >
      <div className="mb-4">
        <h3 className="text-lg mb-2">Projected Portfolio Growth</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl text-primary">{formatCurrency(finalValue)}</span>
          <span className="text-sm text-muted-foreground">
            +{growth.toFixed(1)}% over {years} years
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="volatilityBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0B4619" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#0B4619" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="upper"
            stroke="none"
            fill="url(#volatilityBand)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="lower"
            stroke="none"
            fill="#ffffff"
            fillOpacity={1}
          />
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#0B4619"
            strokeWidth={3}
            dot={false}
            animationDuration={2000}
            animationBegin={delay * 1000}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 p-3 rounded-lg bg-accent/30 border border-accent-foreground/10">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Volatility band:</strong> Shaded area shows potential range based on market volatility. Actual results will vary.
        </p>
      </div>
    </motion.div>
  );
}
