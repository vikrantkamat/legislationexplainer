"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { usePortfolio } from "@/hooks/use-portfolio"
import { useToast } from "@/components/ui/use-toast"

interface Bill {
  id: string
  number: string
  title: string
  currentPrice: number
  shares?: number
}

interface TradeFormProps {
  bill: Bill
  initialTradeType?: "buy" | "sell"
  onComplete: () => void
}

export function TradeForm({ bill, initialTradeType = "buy", onComplete }: TradeFormProps) {
  const { portfolio, executeTrade } = usePortfolio()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tradeType, setTradeType] = useState<"buy" | "sell">(initialTradeType)
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [shares, setShares] = useState(1)
  const [limitPrice, setLimitPrice] = useState(bill.currentPrice.toFixed(2))
  const [isShort, setIsShort] = useState(false)

  const maxShares = tradeType === "sell" && bill.shares ? bill.shares : 1000
  const totalCost = shares * (orderType === "market" ? bill.currentPrice : Number.parseFloat(limitPrice))
  const canAfford = tradeType === "sell" || (portfolio?.cash && portfolio.cash >= totalCost)

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= maxShares) {
      setShares(value)
    }
  }

  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(Number.parseFloat(value)) && Number.parseFloat(value) > 0) {
      setLimitPrice(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await executeTrade({
        billId: bill.id,
        tradeType,
        orderType,
        shares,
        limitPrice: orderType === "limit" ? Number.parseFloat(limitPrice) : undefined,
        isShort: tradeType === "sell" && isShort,
      })

      toast({
        title: "Trade executed successfully",
        description: `${tradeType === "buy" ? "Bought" : "Sold"} ${shares} shares of ${bill.number}`,
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Trade failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Trade Type</Label>
          <RadioGroup
            value={tradeType}
            onValueChange={(value) => setTradeType(value as "buy" | "sell")}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy">Buy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sell" id="sell" />
              <Label htmlFor="sell">Sell</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Order Type</Label>
          <RadioGroup
            value={orderType}
            onValueChange={(value) => setOrderType(value as "market" | "limit")}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="market" id="market" />
              <Label htmlFor="market">Market</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limit" id="limit" />
              <Label htmlFor="limit">Limit</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="shares">Number of Shares</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => shares > 1 && setShares(shares - 1)}>
              -
            </Button>
            <Input
              id="shares"
              type="number"
              min={1}
              max={maxShares}
              value={shares}
              onChange={handleSharesChange}
              className="w-20 text-center"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => shares < maxShares && setShares(shares + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {orderType === "limit" && (
          <div>
            <Label htmlFor="limitPrice">Limit Price</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id="limitPrice"
                type="text"
                value={limitPrice}
                onChange={handleLimitPriceChange}
                className="pl-7"
              />
            </div>
          </div>
        )}

        {tradeType === "sell" && (
          <div className="flex items-center space-x-2">
            <Switch id="short" checked={isShort} onCheckedChange={setIsShort} />
            <Label htmlFor="short">Short Sale (Advanced)</Label>
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span>Current Price:</span>
            <span>${bill.currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Cost:</span>
            <span>${totalCost.toFixed(2)}</span>
          </div>
          {portfolio && (
            <div className="flex justify-between text-sm">
              <span>Available Cash:</span>
              <span>${portfolio.cash.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || (tradeType === "buy" && !canAfford)}>
        {isLoading ? "Processing..." : `${tradeType === "buy" ? "Buy" : "Sell"} ${shares} Shares`}
      </Button>
    </form>
  )
}
