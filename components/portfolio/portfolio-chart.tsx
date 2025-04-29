"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { usePortfolio } from "@/hooks/use-portfolio"

interface ChartData {
  date: string
  value: number
}

export function PortfolioChart({ timeframe }: { timeframe: string }) {
  const { getPortfolioHistory } = usePortfolio()
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      try {
        const data = await getPortfolioHistory(timeframe)
        setChartData(data)
      } catch (error) {
        console.error("Failed to fetch portfolio history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [timeframe, getPortfolioHistory])

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">No portfolio data available for this timeframe</p>
      </div>
    )
  }

  // Calculate min and max values for Y axis
  const values = chartData.map((item) => item.value)
  const minValue = Math.min(...values) * 0.95 // Add 5% padding
  const maxValue = Math.max(...values) * 1.05 // Add 5% padding

  // Calculate if portfolio is up or down
  const isUp = chartData[chartData.length - 1].value >= chartData[0].value

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis
            domain={[minValue, maxValue]}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <ReferenceLine y={chartData[0].value} stroke="#666" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke={isUp ? "#10b981" : "#ef4444"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
