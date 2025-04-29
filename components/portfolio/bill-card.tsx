"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpRight, ArrowDownRight, Info, ShoppingCart, TrendingDown } from "lucide-react"
import { BillDetails } from "@/components/portfolio/bill-details"
import { TradeForm } from "@/components/portfolio/trade-form"

interface Bill {
  id: string
  number: string
  title: string
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  shares: number
  totalValue: number
  probability: number
  chamber: "House" | "Senate"
  sponsor: string
  sponsorParty: "D" | "R" | "I"
  sectors: string[]
  nextAction?: string
  nextActionDate?: string
}

interface BillCardProps {
  bill: Bill
}

export function BillCard({ bill }: BillCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showTradeForm, setShowTradeForm] = useState(false)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")

  const isPositiveChange = bill.priceChange >= 0

  const handleBuy = () => {
    setTradeType("buy")
    setShowTradeForm(true)
  }

  const handleSell = () => {
    setTradeType("sell")
    setShowTradeForm(true)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={bill.chamber === "House" ? "slateGrey" : "burntOrange"}>{bill.chamber}</Badge>
              {bill.sectors.map((sector) => (
                <Badge key={sector} variant="outline">
                  {sector}
                </Badge>
              ))}
            </div>
            <h3 className="font-medium text-sm">{bill.number}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{bill.title}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${bill.currentPrice.toFixed(2)}</div>
            <div
              className={`flex items-center justify-end text-xs ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
            >
              {isPositiveChange ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>
                {isPositiveChange ? "+" : ""}
                {bill.priceChangePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground">Shares: {bill.shares}</div>
            <div className="text-xs font-medium">Value: ${bill.totalValue.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Details</span>
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

            <Button size="sm" className="h-8" onClick={handleBuy}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Buy
            </Button>

            <Dialog open={showTradeForm} onOpenChange={setShowTradeForm}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8" onClick={handleSell}>
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Sell
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Trade {bill.number}</DialogTitle>
                  <DialogDescription>Buy or sell shares of this bill</DialogDescription>
                </DialogHeader>
                <TradeForm bill={bill} initialTradeType={tradeType} onComplete={() => setShowTradeForm(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Probability meter */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Passage Probability</span>
            <span className="font-medium">{bill.probability}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                bill.probability > 66 ? "bg-green-500" : bill.probability > 33 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${bill.probability}%` }}
            ></div>
          </div>
        </div>

        {/* Next action if available */}
        {bill.nextAction && (
          <div className="mt-2 text-xs">
            <span className="text-muted-foreground">Next: </span>
            <span>{bill.nextAction}</span>
            {bill.nextActionDate && <span className="text-muted-foreground"> on {bill.nextActionDate}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
