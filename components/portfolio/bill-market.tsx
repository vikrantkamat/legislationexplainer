"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MarketBillCard } from "@/components/portfolio/market-bill-card"
import { BillFilters } from "@/components/bill-filters"
import { useMarket } from "@/hooks/use-market"
import { Search, TrendingUp, TrendingDown, Clock } from "lucide-react"

export function BillMarket() {
  const { bills, isLoading, filters, setFilters, resetFilters } = useMarket()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading market data...</p>
        </div>
      </div>
    )
  }

  // Filter bills based on search term
  const filteredBills = bills.filter(
    (bill) =>
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group bills by category for different tabs
  const trendingBills = filteredBills.sort((a, b) => b.volumeChange - a.volumeChange).slice(0, 10)
  const gainers = filteredBills.sort((a, b) => b.priceChange - a.priceChange).slice(0, 10)
  const losers = filteredBills.sort((a, b) => a.priceChange - b.priceChange).slice(0, 10)
  const newListings = filteredBills
    .sort((a, b) => new Date(b.ipoDate).getTime() - new Date(a.ipoDate).getTime())
    .slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills by title or number..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-shrink-0">
              <BillFilters filters={filters} onFilterChange={setFilters} onResetFilters={resetFilters} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
          <CardDescription>Current legislative market statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Bills</p>
              <p className="text-2xl font-bold">{bills.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Volume</p>
              <p className="text-2xl font-bold">$1.2M</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg. Probability</p>
              <p className="text-2xl font-bold">32%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">New Today</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Market</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trending">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
                <span className="sm:hidden">Trend</span>
              </TabsTrigger>
              <TabsTrigger value="gainers" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Top Gainers</span>
                <span className="sm:hidden">Gainers</span>
              </TabsTrigger>
              <TabsTrigger value="losers" className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4" />
                <span className="hidden sm:inline">Top Losers</span>
                <span className="sm:hidden">Losers</span>
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">New Listings</span>
                <span className="sm:hidden">New</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {trendingBills.map((bill) => (
                    <MarketBillCard key={bill.id} bill={bill} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="gainers">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {gainers.map((bill) => (
                    <MarketBillCard key={bill.id} bill={bill} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="losers">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {losers.map((bill) => (
                    <MarketBillCard key={bill.id} bill={bill} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="new">
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {newListings.map((bill) => (
                    <MarketBillCard key={bill.id} bill={bill} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
