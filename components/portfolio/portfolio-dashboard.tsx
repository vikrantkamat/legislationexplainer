"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { BillCard } from "@/components/portfolio/bill-card"
import { PortfolioChart } from "@/components/portfolio/portfolio-chart"
import { SectorPerformance } from "@/components/portfolio/sector-performance"
import { UpcomingEvents } from "@/components/portfolio/upcoming-events"
import { AchievementBadges } from "@/components/portfolio/achievement-badges"
import { usePortfolio } from "@/hooks/use-portfolio"
import { ArrowUpRight, ArrowDownRight, DollarSign, Briefcase, Calendar, Award } from "lucide-react"

export function PortfolioDashboard() {
  const { portfolio, isLoading } = usePortfolio()
  const [timeframe, setTimeframe] = useState("1W")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  // If no portfolio data yet, show onboarding
  if (!portfolio || portfolio.holdings.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Bill Portfolio</CardTitle>
            <CardDescription>Start building your legislative portfolio by adding bills from the market</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 text-center">
              <Briefcase className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Your portfolio is empty</h3>
              <p className="text-muted-foreground mb-4">Head to the Market tab to start investing in legislation</p>
              <Button>Go to Market</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const portfolioValue =
    portfolio.cash +
    portfolio.holdings.reduce((total, holding) => {
      return total + holding.currentPrice * holding.shares
    }, 0)

  const portfolioChange = portfolioValue - portfolio.initialValue
  const portfolioChangePercent = ((portfolioChange / portfolio.initialValue) * 100).toFixed(2)
  const isPositiveChange = portfolioChange >= 0

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Portfolio Value</CardDescription>
            <CardTitle className="text-2xl">${portfolioValue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center text-sm ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
              {isPositiveChange ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              <span>
                {isPositiveChange ? "+" : ""}
                {portfolioChangePercent}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Cash</CardDescription>
            <CardTitle className="text-2xl">${portfolio.cash.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>Available for trading</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Bills Owned</CardDescription>
            <CardTitle className="text-2xl">{portfolio.holdings.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>Across {portfolio.sectors.length} sectors</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Events</CardDescription>
            <CardTitle className="text-2xl">{portfolio.upcomingEvents.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>In the next 7 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Portfolio Performance</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("1W")}
                className={timeframe === "1W" ? "bg-muted" : ""}
              >
                1W
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("1M")}
                className={timeframe === "1M" ? "bg-muted" : ""}
              >
                1M
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("3M")}
                className={timeframe === "3M" ? "bg-muted" : ""}
              >
                3M
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTimeframe("1Y")}
                className={timeframe === "1Y" ? "bg-muted" : ""}
              >
                1Y
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PortfolioChart timeframe={timeframe} />
        </CardContent>
      </Card>

      {/* Holdings, Sectors, and Events */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Holdings */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>Bills currently in your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {portfolio.holdings.map((holding) => (
                  <BillCard key={holding.id} bill={holding} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Sector Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>Performance by policy area</CardDescription>
          </CardHeader>
          <CardContent>
            <SectorPerformance sectors={portfolio.sectors} />
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Legislative calendar for your bills</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingEvents events={portfolio.upcomingEvents} />
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Achievements</CardTitle>
            <Badge variant="outline" className="flex items-center">
              <Award className="h-3 w-3 mr-1" />
              <span>Level 3 Investor</span>
            </Badge>
          </div>
          <CardDescription>Badges and accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Progress to Level 4</span>
              <span className="text-sm font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <AchievementBadges badges={portfolio.badges} />
        </CardContent>
      </Card>
    </div>
  )
}
