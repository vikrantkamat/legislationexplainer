"use client"

import { useState, useEffect } from "react"
import { generateBills } from "@/lib/bill-data"

// Generate mock market data
const generateMarketBills = () => {
  // Get bills from the existing generateBills function
  const introducedBills = generateBills("introduced", 10)
  const activeBills = generateBills("active", 10)
  const passedBills = generateBills("passed", 10)

  // Combine and transform them into market bills
  const allBills = [...introducedBills, ...activeBills, ...passedBills]

  return allBills.map((bill) => {
    // Calculate a mock probability based on status
    let probability = 0
    switch (bill.status) {
      case "Introduced":
        probability = 3 + Math.floor(Math.random() * 10) // 3-12%
        break
      case "Committee Consideration":
        probability = 12 + Math.floor(Math.random() * 20) // 12-31%
        break
      case "Passed House":
      case "Passed Senate":
        probability = 25 + Math.floor(Math.random() * 25) // 25-49%
        break
      case "Passed House and Senate":
        probability = 85 + Math.floor(Math.random() * 15) // 85-99%
        break
      default:
        probability = 5 + Math.floor(Math.random() * 10) // 5-14%
    }

    // Generate a random price change
    const priceChange = Math.random() * 20 - 10 // -10 to +10
    const currentPrice = 100 + priceChange // Base price of 100 +/- the change

    // Generate random sectors based on policy area
    const sectors = [bill.policyArea]
    if (Math.random() > 0.5) {
      const secondarySectors = [
        "Technology",
        "Healthcare",
        "Infrastructure",
        "Education",
        "Environment",
        "Finance",
        "Defense",
        "Agriculture",
      ]
      const randomSector = secondarySectors[Math.floor(Math.random() * secondarySectors.length)]
      if (!sectors.includes(randomSector)) {
        sectors.push(randomSector)
      }
    }

    // Generate a random IPO date in the past 30 days
    const today = new Date()
    const daysAgo = Math.floor(Math.random() * 30)
    const ipoDate = new Date(today)
    ipoDate.setDate(today.getDate() - daysAgo)

    // Generate risk level based on probability
    let riskLevel: "low" | "medium" | "high" = "medium"
    if (probability > 60) riskLevel = "low"
    else if (probability < 30) riskLevel = "high"

    return {
      id: bill.id,
      number: bill.number,
      title: bill.title,
      currentPrice: Number.parseFloat(currentPrice.toFixed(2)),
      priceChange: Number.parseFloat(priceChange.toFixed(2)),
      priceChangePercent: Number.parseFloat(((priceChange / (100 - priceChange)) * 100).toFixed(2)),
      volumeChange: Math.floor(Math.random() * 1000) + 100, // Random volume between 100-1100
      probability,
      chamber: bill.chamber,
      sponsor: bill.sponsor,
      sponsorParty: bill.sponsorParty as "D" | "R" | "I",
      sectors,
      ipoDate: ipoDate.toISOString(),
      nextAction: bill.lastAction,
      nextActionDate: new Date(new Date().getTime() + (Math.random() * 14 + 1) * 86400000).toLocaleDateString(),
      riskLevel,
      volatility: Math.floor(Math.random() * 8) + 3, // 3-10%
      committee: bill.committees?.[0] || "Unknown Committee",
    }
  })
}

export function useMarket() {
  const [bills, setBills] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    policyAreas: [],
    parties: [],
    chambers: [],
  })

  useEffect(() => {
    // Simulate loading market data
    const timer = setTimeout(() => {
      setBills(generateMarketBills())
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const resetFilters = () => {
    setFilters({
      policyAreas: [],
      parties: [],
      chambers: [],
    })
  }

  return { bills, isLoading, filters, setFilters, resetFilters }
}
