"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { usePortfolio } from "@/hooks/use-portfolio"
import { useToast } from "@/components/ui/use-toast"
import { Search, ArrowUpRight, ArrowDownRight, ShoppingCart, TrendingDown, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BillDetails } from "@/components/portfolio/bill-details"
import { TradeForm } from "@/components/portfolio/trade-form"

export function Holdings() {
  const { portfolio, isLoading } = usePortfolio()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [showTradeForm, setShowTradeForm] = useState<{ billId: string; tradeType: "buy" | "sell" } | null>(null)
  const [sortBy, setSortBy] = useState<"value" | "shares" | "price" | "change">("value")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your holdings...</p>
        </div>
      </div>
    )
  }

  if (!portfolio || portfolio.holdings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Bills in Your Portfolio</CardTitle>
          <CardDescription>Head to the Market tab to start investing in legislation</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => document.querySelector('[value="market"]')?.dispatchEvent(new Event("click"))}>
            Go to Market
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Filter holdings based on search query
  const filteredHoldings = portfolio.holdings.filter(
    (bill) =>
      bill.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort holdings
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "value":
        comparison = a.totalValue - b.totalValue
        break
      case "shares":
        comparison = a.shares - b.shares
        break
      case "price":
        comparison = a.currentPrice - b.currentPrice
        break
      case "change":
        comparison = a.priceChangePercent - b.priceChangePercent
        break
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const handleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortOrder("desc")
    }
  }

  const handleBuy = (billId: string) => {
    setShowTradeForm({ billId, tradeType: "buy" })
  }

  const handleSell = (billId: string) => {
    setShowTradeForm({ billId, tradeType: "sell" })
  }

  const handleTradeComplete = () => {
    setShowTradeForm(null)
    toast({
      title: "Trade executed successfully",
      description: "Your portfolio has been updated",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Bill Holdings</CardTitle>
          <CardDescription>Manage your legislative investments</CardDescription>
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
                <Button variant="outline" size="sm" onClick={() => handleSort("value")}>
                  Value {sortBy === "value" && (sortOrder === "asc" ? "↑" : "↓")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSort("price")}>
                  Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSort("change")}>
                  Change {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {sortedHoldings.map((bill) => (
                  <Card key={bill.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={bill.chamber === "House" ? "slateGrey" : "burntOrange"}>
                              {bill.chamber}
                            </Badge>
                            {bill.sectors.map((sector) => (
                              <Badge key={sector} variant="outline">
                                {sector}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-medium">{bill.number}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{bill.title}</p>

                          {/* Probability meter */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Passage Probability</span>
                              <span className="font-medium">{bill.probability}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  bill.probability > 66
                                    ? "bg-green-500"
                                    : bill.probability > 33
                                      ? "bg-amber-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${bill.probability}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div className="text-right">
                            <div className="text-lg font-bold">${bill.currentPrice.toFixed(2)}</div>
                            <div
                              className={`flex items-center justify-end text-sm ${
                                bill.priceChange >= 0 ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {bill.priceChange >= 0 ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              <span>
                                {bill.priceChange >= 0 ? "+" : ""}
                                {bill.priceChangePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 text-right">
                            <div className="text-sm">
                              Shares: <span className="font-medium">{bill.shares}</span>
                            </div>
                            <div className="text-sm">
                              Value: <span className="font-medium">${bill.totalValue.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center border-t pt-4">
                        {/* Next action if available */}
                        {bill.nextAction && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Next: </span>
                            <span>{bill.nextAction}</span>
                            {bill.nextActionDate && (
                              <span className="text-muted-foreground"> on {bill.nextActionDate}</span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 ml-auto">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setShowDetails(bill.id)}>
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{bill.number}</DialogTitle>
                                <DialogDescription className="line-clamp-2">{bill.title}</DialogDescription>
                              </DialogHeader>
                              <BillDetails bill={bill} />
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" onClick={() => handleBuy(bill.id)}>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Buy More
                          </Button>

                          <Button variant="outline" size="sm" onClick={() => handleSell(bill.id)}>
                            <TrendingDown className="h-4 w-4 mr-1" />
                            Sell
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>

      {/* Trade Dialog */}
      {showTradeForm && (
        <Dialog open={!!showTradeForm} onOpenChange={(open) => !open && setShowTradeForm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{showTradeForm.tradeType === "buy" ? "Buy" : "Sell"} Bill</DialogTitle>
              <DialogDescription>
                {showTradeForm.tradeType === "buy"
                  ? "Add more shares to your portfolio"
                  : "Sell shares from your portfolio"}
              </DialogDescription>
            </DialogHeader>
            <TradeForm
              bill={portfolio.holdings.find((b) => b.id === showTradeForm.billId)!}
              initialTradeType={showTradeForm.tradeType}
              onComplete={handleTradeComplete}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
