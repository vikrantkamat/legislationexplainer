"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { usePortfolio } from "@/hooks/use-portfolio"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PortfolioChartProps {
  timeframe: string
}

export function PortfolioChart({ timeframe }: PortfolioChartProps) {
  const { getPortfolioHistory } = usePortfolio()
  const [chartData, setChartData] = useState<Array<{ date: string; value: number }>>([])

  useEffect(() => {
    const historyData = getPortfolioHistory(timeframe)
    setChartData(historyData)
  }, [timeframe, getPortfolioHistory])

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chart data...</p>
        </div>
      </div>
    )
  }

  // Calculate if the overall trend is positive or negative
  const startValue = chartData[0]?.value || 0
  const endValue = chartData[chartData.length - 1]?.value || 0
  const isPositiveTrend = endValue >= startValue

  return (
    <ChartContainer
      config={{
        value: {
          label: "Portfolio Value",
          color: isPositiveTrend ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Format date based on timeframe
              if (timeframe === "1W" || timeframe === "1M") {
                return value.split("/").slice(0, 2).join("/")
              }
              return value
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={["dataMin - 500", "dataMax + 500"]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
