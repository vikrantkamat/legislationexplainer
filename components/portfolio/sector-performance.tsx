"use client"

import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Sector {
  name: string
  value: number
  change: number
  holdings: number
}

interface SectorPerformanceProps {
  sectors: Sector[]
}

export function SectorPerformance({ sectors }: SectorPerformanceProps) {
  // Sort sectors by value
  const sortedSectors = [...sectors].sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-4">
      {sortedSectors.length > 0 ? (
        sortedSectors.map((sector) => (
          <div key={sector.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  {sector.name}
                </Badge>
                <span className="text-xs text-muted-foreground">{sector.holdings} bills</span>
              </div>
              <div className="text-right">
                <div className="font-medium">${sector.value.toLocaleString()}</div>
                <div
                  className={`flex items-center justify-end text-xs ${sector.change >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {sector.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>
                    {sector.change >= 0 ? "+" : ""}
                    {sector.change}%
                  </span>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  sector.change > 0 ? "bg-green-500" : sector.change < 0 ? "bg-red-500" : "bg-amber-500"
                }`}
                style={{ width: `${Math.min(Math.max(50 + sector.change * 5, 5), 95)}%` }}
              ></div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No sector data available</p>
        </div>
      )}
    </div>
  )
}
