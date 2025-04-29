"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Calendar, Tag, Building, AlertTriangle, TrendingUp } from "lucide-react"

interface BillDetailsProps {
  bill: {
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
    ipoDate: string
    committee?: string
    summary?: string
    bipartisanScore?: string
    committeeOutlook?: string
    leadershipPriority?: string
    newsSentiment?: string
    riskLevel?: "low" | "medium" | "high"
    riskAssessment?: string
    volatility?: number
    volumeChange?: number
    nextAction?: string
    nextActionDate?: string
  }
}

export function BillDetails({ bill }: BillDetailsProps) {
  return (
    <div className="mt-4">
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4 mt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bill Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Sponsor</p>
                  <p>{bill.sponsor}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Introduced</p>
                  <p>{new Date(bill.ipoDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Tag className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Sectors</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {bill.sectors.map((sector: string) => (
                      <Badge key={sector} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <Building className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Committee</p>
                  <p>{bill.committee || "Not assigned"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bill Summary</h3>
            <ScrollArea className="h-[200px]">
              <p className="text-sm text-muted-foreground">
                {bill.summary ||
                  "This bill aims to address key issues in its policy area through a series of provisions and amendments to existing law. The legislation establishes new programs, funding mechanisms, and regulatory frameworks to achieve its stated goals."}
              </p>
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Key Provisions</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Establishes new funding mechanisms for related programs</li>
              <li>Creates regulatory framework for implementation</li>
              <li>Sets standards and requirements for compliance</li>
              <li>Provides oversight and reporting requirements</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 mt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Passage Analysis</h3>
            <div className="p-3 bg-muted rounded-md">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Probability of Passage</span>
                <span className="text-sm font-medium">{bill.probability}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${
                    bill.probability > 66 ? "bg-green-500" : bill.probability > 33 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${bill.probability}%` }}
                ></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bipartisan Support</span>
                  <span>{bill.bipartisanScore || "Medium"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Committee Outlook</span>
                  <span>{bill.committeeOutlook || "Favorable"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Leadership Priority</span>
                  <span>{bill.leadershipPriority || "Medium"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">News Sentiment</span>
                  <span>{bill.newsSentiment || "Neutral"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Risk Assessment</h3>
            <div className="flex items-center mb-2">
              <AlertTriangle
                className={`h-4 w-4 mr-2 ${
                  bill.riskLevel === "high"
                    ? "text-red-500"
                    : bill.riskLevel === "medium"
                      ? "text-amber-500"
                      : "text-green-500"
                }`}
              />
              <span className="capitalize">{bill.riskLevel} Risk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {bill.riskAssessment ||
                "This bill has several factors that could impact its passage, including the current political climate, competing priorities in the legislative calendar, and potential opposition from key stakeholders."}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Market Metrics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Volatility</p>
                <p className="font-medium">{bill.volatility}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Trading Volume</p>
                <p className="font-medium">${(bill.currentPrice * (bill.volumeChange || 0)).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Price Range (30d)</p>
                <p className="font-medium">
                  ${(bill.currentPrice * 0.9).toFixed(2)} - ${(bill.currentPrice * 1.1).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Market Cap</p>
                <p className="font-medium">${(bill.currentPrice * 10000).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Price History</h3>
            <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-xs text-muted-foreground text-center">Price history chart would appear here</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Key Events</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Introduced in {bill.chamber}</p>
                    <p className="text-xs text-muted-foreground">{new Date(bill.ipoDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Initial price: $100.00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Referred to Committee</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(new Date(bill.ipoDate).getTime() + 86400000 * 2).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">Price change: +2.5%</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 mr-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">Cosponsors Added (3)</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(new Date(bill.ipoDate).getTime() + 86400000 * 5).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">Price change: +4.8%</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
