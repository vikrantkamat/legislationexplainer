"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { usePortfolio } from "@/hooks/use-portfolio"
import { toast } from "@/components/ui/use-toast"

interface TradeFormProps {
  bill: any // Using any for simplicity, but should be properly typed
  initialTradeType?: "buy" | "sell"
  onComplete: () => void
}

export function TradeForm({ bill, initialTradeType = "buy", onComplete }: TradeFormProps) {
  const { portfolio, executeTrade } = usePortfolio()
  const [tradeType, setTradeType] = useState<"buy" | "sell">(initialTradeType)
  const [orderType, setOrderType] = useState<"market" | "limit">("market")
  const [shares, setShares] = useState(1)
  const [limitPrice, setLimitPrice] = useState(bill.currentPrice)
  const [isShort, setIsShort] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set initial trade type when the component mounts or when initialTradeType changes
  useEffect(() => {
    setTradeType(initialTradeType)
  }, [initialTradeType])

  const maxShares = tradeType === "buy" ? Math.floor(portfolio.cash / bill.currentPrice) : bill.shares || 0

  const totalCost = shares * (orderType === "market" ? bill.currentPrice : limitPrice)

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (isNaN(value) || value < 1) {
      setShares(1)
    } else if (tradeType === "buy" && value > maxShares) {
      setShares(maxShares)
    } else if (tradeType === "sell" && value > maxShares) {
      setShares(maxShares)
    } else {
      setShares(value)
    }
  }

  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (isNaN(value) || value <= 0) {
      setLimitPrice(0.01)
    } else {
      setLimitPrice(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await executeTrade({
        billId: bill.id,
        tradeType,
        orderType,
        shares,
        limitPrice: orderType === "limit" ? limitPrice : undefined,
        isShort,
      })

      toast({
        title: "Trade executed successfully",
        description: `${tradeType === "buy" ? "Bought" : "Sold"} ${shares} shares of ${bill.number} at $${(orderType === "market" ? bill.currentPrice : limitPrice).toFixed(2)}`,
      })

      onComplete()
    } catch (error) {
      toast({
        title: "Trade failed",
        description: "There was an error executing your trade. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <RadioGroup
        value={tradeType}
        onValueChange={(value) => setTradeType(value as "buy" | "sell")}
        className="flex space-x-2"
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

      <Tabs defaultValue="market" onValueChange={(value) => setOrderType(value as "market" | "limit")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="market">Market Order</TabsTrigger>
          <TabsTrigger value="limit">Limit Order</TabsTrigger>
        </TabsList>
        <TabsContent value="market" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shares-market">Number of Shares</Label>
            <Input
              id="shares-market"
              type="number"
              min={1}
              max={maxShares}
              value={shares}
              onChange={handleSharesChange}
            />
            <p className="text-xs text-muted-foreground">
              {tradeType === "buy"
                ? `You can buy up to ${maxShares} shares with your available cash.`
                : `You own ${maxShares} shares of this bill.`}
            </p>
          </div>

          {tradeType === "sell" && (
            <div className="flex items-center space-x-2">
              <Switch id="short-market" checked={isShort} onCheckedChange={setIsShort} />
              <Label htmlFor="short-market">Short Sell</Label>
              <span className="text-xs text-muted-foreground ml-2">(Advanced)</span>
            </div>
          )}
        </TabsContent>
        <TabsContent value="limit" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shares-limit">Number of Shares</Label>
            <Input
              id="shares-limit"
              type="number"
              min={1}
              max={maxShares}
              value={shares}
              onChange={handleSharesChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit-price">Limit Price</Label>
            <Input
              id="limit-price"
              type="number"
              min={0.01}
              step={0.01}
              value={limitPrice}
              onChange={handleLimitPriceChange}
            />
            <p className="text-xs text-muted-foreground">
              {tradeType === "buy"
                ? "Your order will execute only if the price falls to this level or below."
                : "Your order will execute only if the price rises to this level or above."}
            </p>
          </div>

          {tradeType === "sell" && (
            <div className="flex items-center space-x-2">
              <Switch id="short-limit" checked={isShort} onCheckedChange={setIsShort} />
              <Label htmlFor="short-limit">Short Sell</Label>
              <span className="text-xs text-muted-foreground ml-2">(Advanced)</span>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span>Total {tradeType === "buy" ? "Cost" : "Proceeds"}</span>
          <span className="font-bold">${totalCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onComplete}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                {tradeType === "buy" ? "Buy" : "Sell"} {shares} {shares === 1 ? "Share" : "Shares"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
