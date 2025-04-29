"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMarket } from "@/hooks/use-market"
import { Search, TrendingUp, ArrowUp, ArrowDown, Clock } from "lucide-react"
import { MarketBillCard } from "@/components/portfolio/market-bill-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TradeForm } from "@/components/portfolio/trade-form"
import { useToast } from "@/components/ui/use-toast"

export function BillMarket() {
  const { marketData, isLoading } = useMarket()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChamber, setSelectedChamber] = useState<"all" | "House" | "Senate">("all")
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [showTradeForm, setShowTradeForm] = useState<string | null>(null)

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

  if (!marketData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load market data. Please try again later.</p>
      </div>
    )
  }

  // Get all unique sectors from market data
  const allSectors = Array.from(
    new Set(
      marketData.trending
        .concat(marketData.gainers)
        .concat(marketData.losers)
        .concat(marketData.newListings)
        .flatMap((bill) => bill.sectors),
    ),
  ).sort()

  // Filter bills based on search query, chamber, and sector
  const filterBills = (bills: typeof marketData.trending) => {
    return bills.filter((bill) => {
      const matchesSearch =
        searchQuery === "" ||
        bill.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesChamber = selectedChamber === "all" || bill.chamber === selectedChamber

      const matchesSector = selectedSector === "all" || bill.sectors.includes(selectedSector)

      return matchesSearch && matchesChamber && matchesSector
    })
  }

  const filteredTrending = filterBills(marketData.trending)
  const filteredGainers = filterBills(marketData.gainers)
  const filteredLosers = filterBills(marketData.losers)
  const filteredNewListings = filterBills(marketData.newListings)

  const handleBuyClick = (billId: string) => {
    const bill = [...marketData.trending, ...marketData.gainers, ...marketData.losers, ...marketData.newListings].find(
      (b) => b.id === billId,
    )
    if (bill) {
      setShowTradeForm(billId)
    }
  }

  const handleTradeComplete = () => {
    setShowTradeForm(null)
    toast({
      title: "Trade executed successfully",
      description: "Your portfolio has been updated",
    })
  }

  const selectedBill = showTradeForm
    ? [...marketData.trending, ...marketData.gainers, ...marketData.losers, ...marketData.newListings].find(
        (b) => b.id === showTradeForm,
      )
    : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bill Market</CardTitle>
          <CardDescription>Discover and invest in legislation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bills..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={selectedChamber}
                  onChange={(e) => setSelectedChamber(e.target.value as "all" | "House" | "Senate")}
                >
                  <option value="all">All Chambers</option>
                  <option value="House">House</option>
                  <option value="Senate">Senate</option>
                </select>
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                >
                  <option value="all">All Sectors</option>
                  {allSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Trending</span>
                  <span className="sm:hidden">Trend</span>
                </TabsTrigger>
                <TabsTrigger value="gainers" className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Gainers</span>
                  <span className="sm:hidden">Gain</span>
                </TabsTrigger>
                <TabsTrigger value="losers" className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Losers</span>
                  <span className="sm:hidden">Loss</span>
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">New</span>
                  <span className="sm:hidden">New</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredTrending.length > 0 ? (
                      filteredTrending.map((bill) => (
                        <MarketBillCard key={bill.id} bill={bill} onBuyClick={handleBuyClick} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No bills match your filters</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="gainers" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredGainers.length > 0 ? (
                      filteredGainers.map((bill) => (
                        <MarketBillCard key={bill.id} bill={bill} onBuyClick={handleBuyClick} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No bills match your filters</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="losers" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredLosers.length > 0 ? (
                      filteredLosers.map((bill) => (
                        <MarketBillCard key={bill.id} bill={bill} onBuyClick={handleBuyClick} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No bills match your filters</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="new" className="mt-4">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredNewListings.length > 0 ? (
                      filteredNewListings.map((bill) => (
                        <MarketBillCard key={bill.id} bill={bill} onBuyClick={handleBuyClick} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No bills match your filters</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Trade Dialog */}
      {selectedBill && (
        <Dialog open={!!showTradeForm} onOpenChange={(open) => !open && setShowTradeForm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buy {selectedBill.number}</DialogTitle>
              <DialogDescription>Add this bill to your portfolio</DialogDescription>
            </DialogHeader>
            <TradeForm bill={selectedBill} initialTradeType="buy" onComplete={handleTradeComplete} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
