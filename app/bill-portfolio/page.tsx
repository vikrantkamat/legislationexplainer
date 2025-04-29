"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PortfolioDashboard } from "@/components/portfolio/portfolio-dashboard"
import { BillMarket } from "@/components/portfolio/bill-market"
import { Leaderboard } from "@/components/portfolio/leaderboard"
import { ScrollAnimation } from "@/components/scroll-animation"
import { LineChartIcon as ChartLineUp, BarChart3, Trophy, BookOpen } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

export default function BillPortfolioPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Toaster />
      <div className="space-y-6">
        <ScrollAnimation>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">
              Bill Portfolio
            </h1>
            <p className="text-xl text-muted-foreground">
              Trade virtual shares in legislation based on their probability of passage
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <ChartLineUp className="h-4 w-4" />
                <span className="hidden sm:inline">Portfolio</span>
                <span className="sm:hidden">Portfolio</span>
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Market</span>
                <span className="sm:hidden">Market</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Leaderboard</span>
                <span className="sm:hidden">Leaders</span>
              </TabsTrigger>
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">How It Works</span>
                <span className="sm:hidden">Learn</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <PortfolioDashboard />
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              <BillMarket />
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Leaderboard />
            </TabsContent>

            <TabsContent value="learn" className="space-y-6">
              <div className="space-y-6">
                <div className="rounded-lg border bg-card shadow-sm">
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">How the Bill Portfolio Works</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Bill Pricing</h3>
                        <p className="text-muted-foreground">
                          Each bill "IPOs" at $100 when it receives a bill number and committee referral. Prices are
                          updated nightly based on a probability-of-passage score that considers:
                        </p>
                        <ul className="list-disc list-inside mt-2 ml-4 text-muted-foreground">
                          <li>Cosponsor growth and bipartisan ratio</li>
                          <li>Committee actions and floor scheduling</li>
                          <li>Leadership statements and whip counts</li>
                          <li>News sentiment analysis</li>
                        </ul>
                        <p className="text-muted-foreground mt-2">
                          Price changes are capped at ±10% daily to ensure predictable volatility.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Trading</h3>
                        <p className="text-muted-foreground">
                          You start with $10,000 in virtual cash. Place market orders to buy or sell bills at current
                          prices, or set limit orders to execute when bills reach target prices. Advanced users can
                          short bills they believe will fail.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Portfolio Management</h3>
                        <p className="text-muted-foreground">
                          Tag your holdings by policy sectors like Climate, Tax, or Healthcare to diversify your
                          strategy. Track performance by sector, monitor upcoming legislative dates, and adjust your
                          positions accordingly.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Achievements</h3>
                        <p className="text-muted-foreground">
                          Earn badges like "Whip Whisperer" for owning 5+ bipartisan bills or "Committee Expert" for
                          correctly predicting committee outcomes. Compete on weekly leaderboards that reset every
                          Monday.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollAnimation>
      </div>
    </main>
  )
}
