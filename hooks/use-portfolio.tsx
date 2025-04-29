"use client"

import { useState, useEffect, useCallback } from "react"

// Define types for portfolio data
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

interface Sector {
  name: string
  value: number
  change: number
  holdings: number
}

interface Event {
  id: string
  billId: string
  billNumber: string
  title: string
  date: string
  type: "committee" | "floor" | "markup" | "hearing" | "other"
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  progress?: number
}

interface Portfolio {
  cash: number
  initialValue: number
  holdings: Bill[]
  sectors: Sector[]
  upcomingEvents: Event[]
  badges: Badge[]
  lastUpdated: string
}

interface Trade {
  billId: string
  tradeType: "buy" | "sell"
  orderType: "market" | "limit"
  shares: number
  limitPrice?: number
  isShort?: boolean
}

interface PortfolioHistory {
  date: string
  value: number
}

// Mock portfolio data
const mockPortfolio: Portfolio = {
  cash: 5240.5,
  initialValue: 10000,
  holdings: [
    {
      id: "hr9512",
      number: "H.R. 9512",
      title: "Quantum Computing Research and Development Act of 2025",
      currentPrice: 124.5,
      priceChange: 4.5,
      priceChangePercent: 3.75,
      shares: 10,
      totalValue: 1245.0,
      probability: 42,
      chamber: "House",
      sponsor: "Rep. Johnson, Eddie Bernice (D-TX-30)",
      sponsorParty: "D",
      sectors: ["Technology", "Research"],
      nextAction: "Committee Hearing",
      nextActionDate: "May 15, 2025",
    },
    {
      id: "s5102",
      number: "S. 5102",
      title: "Rural Broadband Expansion Act of 2025",
      currentPrice: 132.25,
      priceChange: 7.25,
      priceChangePercent: 5.8,
      shares: 8,
      totalValue: 1058.0,
      probability: 58,
      chamber: "Senate",
      sponsor: "Sen. Warnock, Raphael (D-GA)",
      sponsorParty: "D",
      sectors: ["Infrastructure", "Rural"],
      nextAction: "Floor Vote",
      nextActionDate: "May 22, 2025",
    },
    {
      id: "hr9498",
      number: "H.R. 9498",
      title: "Renewable Energy Innovation and Manufacturing Act",
      currentPrice: 98.75,
      priceChange: -3.25,
      priceChangePercent: -3.2,
      shares: 15,
      totalValue: 1481.25,
      probability: 35,
      chamber: "House",
      sponsor: "Rep. Castor, Kathy (D-FL-14)",
      sponsorParty: "D",
      sectors: ["Energy", "Manufacturing"],
      nextAction: "Committee Vote",
      nextActionDate: "May 18, 2025",
    },
    {
      id: "s5089",
      number: "S. 5089",
      title: "Cybersecurity Enhancement and Protection Act of 2024",
      currentPrice: 145.8,
      priceChange: 12.3,
      priceChangePercent: 9.2,
      shares: 5,
      totalValue: 729.0,
      probability: 72,
      chamber: "Senate",
      sponsor: "Sen. Warner, Mark (D-VA)",
      sponsorParty: "D",
      sectors: ["Technology", "Security"],
      nextAction: "Floor Debate",
      nextActionDate: "May 12, 2025",
    },
  ],
  sectors: [
    { name: "Technology", value: 1974.0, change: 5.8, holdings: 2 },
    { name: "Energy", value: 1481.25, change: -3.2, holdings: 1 },
    { name: "Infrastructure", value: 1058.0, change: 5.8, holdings: 1 },
    { name: "Manufacturing", value: 1481.25, change: -3.2, holdings: 1 },
    { name: "Research", value: 1245.0, change: 3.75, holdings: 1 },
    { name: "Rural", value: 1058.0, change: 5.8, holdings: 1 },
    { name: "Security", value: 729.0, change: 9.2, holdings: 1 },
  ],
  upcomingEvents: [
    {
      id: "event1",
      billId: "s5089",
      billNumber: "S. 5089",
      title: "Cybersecurity Enhancement and Protection Act of 2024",
      date: "2025-05-12",
      type: "floor",
    },
    {
      id: "event2",
      billId: "hr9512",
      billNumber: "H.R. 9512",
      title: "Quantum Computing Research and Development Act of 2025",
      date: "2025-05-15",
      type: "hearing",
    },
    {
      id: "event3",
      billId: "hr9498",
      billNumber: "H.R. 9498",
      title: "Renewable Energy Innovation and Manufacturing Act",
      date: "2025-05-18",
      type: "committee",
    },
    {
      id: "event4",
      billId: "s5102",
      billNumber: "S. 5102",
      title: "Rural Broadband Expansion Act of 2025",
      date: "2025-05-22",
      type: "floor",
    },
  ],
  badges: [
    {
      id: "whip-whisperer",
      name: "Whip Whisperer",
      description: "Own 5+ bipartisan bills",
      icon: "trophy",
      earned: true,
    },
    {
      id: "committee-expert",
      name: "Committee Expert",
      description: "Predict 3 committee outcomes",
      icon: "users",
      earned: true,
    },
    {
      id: "market-maven",
      name: "Market Maven",
      description: "Trade 20+ bills in a week",
      icon: "trending-up",
      earned: false,
      progress: 65,
    },
    {
      id: "rising-star",
      name: "Rising Star",
      description: "Achieve 20% portfolio growth",
      icon: "trending-up",
      earned: false,
      progress: 40,
    },
    {
      id: "sector-specialist",
      name: "Sector Specialist",
      description: "Own 5+ bills in the same sector",
      icon: "check-circle",
      earned: false,
      progress: 30,
    },
    {
      id: "hall-of-fame",
      name: "Hall of Fame",
      description: "Reach $25,000 portfolio value",
      icon: "award",
      earned: false,
      progress: 20,
    },
  ],
  lastUpdated: new Date().toISOString(),
}

// Generate mock portfolio history data
const generatePortfolioHistory = (timeframe: string): PortfolioHistory[] => {
  const now = new Date()
  const data: PortfolioHistory[] = []
  let days = 0

  switch (timeframe) {
    case "1W":
      days = 7
      break
    case "1M":
      days = 30
      break
    case "3M":
      days = 90
      break
    case "1Y":
      days = 365
      break
    default:
      days = 7
  }

  // Start with initial value
  const initialValue = 10000
  let currentValue = initialValue

  // Generate data points
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness to the portfolio value
    // More recent days have more impact on the final value
    const daysFactor = i / days
    const randomChange = (Math.random() - 0.45) * (1 - daysFactor) * 200

    currentValue += randomChange
    // Ensure we don't go below a reasonable value
    if (currentValue < initialValue * 0.7) {
      currentValue = initialValue * 0.7 + Math.random() * 100
    }

    data.push({
      date: date.toLocaleDateString(),
      value: Number(currentValue.toFixed(2)),
    })
  }

  return data
}

// Local storage keys
const PORTFOLIO_STORAGE_KEY = "bill-portfolio-data"
const PORTFOLIO_HISTORY_KEY = "bill-portfolio-history"

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioHistory, setPortfolioHistory] = useState<Record<string, PortfolioHistory[]>>({
    "1W": [],
    "1M": [],
    "3M": [],
    "1Y": [],
  })

  // Load portfolio from local storage
  useEffect(() => {
    const loadPortfolio = () => {
      try {
        const savedPortfolio = localStorage.getItem(PORTFOLIO_STORAGE_KEY)
        if (savedPortfolio) {
          setPortfolio(JSON.parse(savedPortfolio))
        } else {
          // If no saved portfolio, use mock data
          setPortfolio(mockPortfolio)
          // Save mock data to local storage
          localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(mockPortfolio))
        }

        // Load or generate portfolio history
        const savedHistory = localStorage.getItem(PORTFOLIO_HISTORY_KEY)
        if (savedHistory) {
          setPortfolioHistory(JSON.parse(savedHistory))
        } else {
          // Generate mock history data for each timeframe
          const history = {
            "1W": generatePortfolioHistory("1W"),
            "1M": generatePortfolioHistory("1M"),
            "3M": generatePortfolioHistory("3M"),
            "1Y": generatePortfolioHistory("1Y"),
          }
          setPortfolioHistory(history)
          // Save mock history to local storage
          localStorage.setItem(PORTFOLIO_HISTORY_KEY, JSON.stringify(history))
        }
      } catch (error) {
        console.error("Error loading portfolio from local storage:", error)
        setPortfolio(mockPortfolio)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  // Save portfolio to local storage whenever it changes
  useEffect(() => {
    if (portfolio) {
      try {
        localStorage.setItem(
          PORTFOLIO_STORAGE_KEY,
          JSON.stringify({
            ...portfolio,
            lastUpdated: new Date().toISOString(),
          }),
        )
      } catch (error) {
        console.error("Error saving portfolio to local storage:", error)
      }
    }
  }, [portfolio])

  // Execute a trade
  const executeTrade = useCallback(
    async (trade: Trade): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          if (!portfolio) {
            reject(new Error("Portfolio not loaded"))
            return
          }

          // Simulate network delay
          setTimeout(() => {
            setPortfolio((prevPortfolio) => {
              if (!prevPortfolio) return null

              const updatedPortfolio = { ...prevPortfolio }

              // Find the bill in the market or portfolio
              const billIndex = updatedPortfolio.holdings.findIndex((bill) => bill.id === trade.billId)

              if (trade.tradeType === "buy") {
                const tradeCost =
                  trade.shares *
                  (trade.orderType === "limit"
                    ? trade.limitPrice || 0
                    : updatedPortfolio.holdings[billIndex]?.currentPrice || 0)

                // Check if user has enough cash
                if (tradeCost > updatedPortfolio.cash) {
                  reject(new Error("Insufficient funds"))
                  return prevPortfolio
                }

                // If buying a bill we already own
                if (billIndex >= 0) {
                  updatedPortfolio.holdings[billIndex].shares += trade.shares
                  updatedPortfolio.holdings[billIndex].totalValue =
                    updatedPortfolio.holdings[billIndex].shares * updatedPortfolio.holdings[billIndex].currentPrice
                  updatedPortfolio.cash -= tradeCost
                } else {
                  // If buying a new bill, we need to fetch it from the market
                  // In a real app, this would come from an API
                  // For now, we'll simulate it

                  // This is a placeholder - in a real app, you'd fetch the bill details
                  const newBill = {
                    id: trade.billId,
                    number: `Bill-${trade.billId}`,
                    title: `Bill ${trade.billId}`,
                    currentPrice: trade.orderType === "limit" ? trade.limitPrice || 100 : 100,
                    priceChange: 0,
                    priceChangePercent: 0,
                    shares: trade.shares,
                    totalValue: trade.shares * (trade.orderType === "limit" ? trade.limitPrice || 100 : 100),
                    probability: 50,
                    chamber: Math.random() > 0.5 ? "House" : ("Senate" as "House" | "Senate"),
                    sponsor: "Unknown Sponsor",
                    sponsorParty: "D" as "D" | "R" | "I",
                    sectors: ["Unknown"],
                  }

                  updatedPortfolio.holdings.push(newBill)
                  updatedPortfolio.cash -= tradeCost
                }
              } else if (trade.tradeType === "sell" && billIndex >= 0) {
                const tradeProceeds =
                  trade.shares *
                  (trade.orderType === "limit"
                    ? trade.limitPrice || 0
                    : updatedPortfolio.holdings[billIndex].currentPrice)

                // If selling some shares
                if (updatedPortfolio.holdings[billIndex].shares > trade.shares) {
                  updatedPortfolio.holdings[billIndex].shares -= trade.shares
                  updatedPortfolio.holdings[billIndex].totalValue =
                    updatedPortfolio.holdings[billIndex].shares * updatedPortfolio.holdings[billIndex].currentPrice
                  updatedPortfolio.cash += tradeProceeds
                }
                // If selling all shares
                else if (updatedPortfolio.holdings[billIndex].shares === trade.shares) {
                  updatedPortfolio.cash += tradeProceeds
                  updatedPortfolio.holdings = updatedPortfolio.holdings.filter((bill) => bill.id !== trade.billId)
                } else {
                  reject(new Error("Not enough shares to sell"))
                  return prevPortfolio
                }
              } else {
                reject(new Error("Invalid trade"))
                return prevPortfolio
              }

              // Update sectors data
              updatedPortfolio.sectors = calculateSectors(updatedPortfolio.holdings)

              resolve()
              return updatedPortfolio
            })
          }, 1000) // Simulate 1 second delay
        } catch (error) {
          reject(error)
        }
      })
    },
    [portfolio],
  )

  // Helper function to calculate sectors data
  const calculateSectors = (holdings: Bill[]): Sector[] => {
    const sectorMap = new Map<string, { value: number; change: number; holdings: number }>()

    holdings.forEach((bill) => {
      bill.sectors.forEach((sector) => {
        const existing = sectorMap.get(sector)
        if (existing) {
          existing.value += bill.totalValue
          existing.change = (existing.change * existing.holdings + bill.priceChangePercent) / (existing.holdings + 1)
          existing.holdings += 1
        } else {
          sectorMap.set(sector, {
            value: bill.totalValue,
            change: bill.priceChangePercent,
            holdings: 1,
          })
        }
      })
    })

    return Array.from(sectorMap.entries()).map(([name, data]) => ({
      name,
      value: data.value,
      change: data.change,
      holdings: data.holdings,
    }))
  }

  // Get portfolio history for a specific timeframe
  const getPortfolioHistory = useCallback(
    (timeframe: string): PortfolioHistory[] => {
      return portfolioHistory[timeframe as keyof typeof portfolioHistory] || []
    },
    [portfolioHistory],
  )

  return {
    portfolio,
    isLoading,
    executeTrade,
    getPortfolioHistory,
  }
}
