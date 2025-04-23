"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ExternalLink, Building, Tag, HelpCircle } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { generateBills } from "@/lib/bill-data"
import type { FilterOptions } from "@/components/bill-filters"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { billTexts } from "@/lib/bill-data"

interface Bill {
  id: string
  number: string
  title: string
  description: string
  date: string
  sponsor: string
  sponsorParty: "D" | "R" | "I"
  chamber: "House" | "Senate"
  status: string
  lastAction: string
  policyArea?: string
  committees?: string[]
}

interface BillsListProps {
  type: "introduced" | "active" | "passed" | "enacted"
  searchTerm?: string
  currentPage: number
  onPageChange: (page: number) => void
  filters: FilterOptions
}

export function BillsList({ type, searchTerm = "", currentPage, onPageChange, filters }: BillsListProps) {
  const [allBills, setAllBills] = useState<Bill[]>([])
  const [filteredBills, setFilteredBills] = useState<Bill[]>([])
  const [displayedBills, setDisplayedBills] = useState<Bill[]>([])
  const [totalPages, setTotalPages] = useState(10)
  const ITEMS_PER_PAGE = 5

  // Initialize bills on component mount
  useEffect(() => {
    const bills = generateBills(type, 50) // Generate 50 bills for each category

    // Filter out bills that don't have data in billTexts
    const billsWithData = bills.filter((bill) => billTexts[bill.id])

    setAllBills(billsWithData)
  }, [type])

  // Update filtered bills
  useEffect(() => {
    // Since we've removed search and filters, we just use all bills
    setFilteredBills(allBills)
    setTotalPages(Math.max(1, Math.ceil(allBills.length / ITEMS_PER_PAGE)))
  }, [allBills])

  // Update displayed bills based on current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setDisplayedBills(filteredBills.slice(startIndex, endIndex))
  }, [filteredBills, currentPage])

  // Calculate probability of enactment based on bill status and other factors
  const calculateProbability = (bill: Bill): number => {
    // Base probability by status
    let probability = 0

    switch (bill.status) {
      case "Introduced":
        probability = 3 // 3% chance for newly introduced bills
        break
      case "Committee Consideration":
        probability = 12 // 12% for bills in committee
        break
      case "Passed House":
      case "Passed Senate":
        probability = 25 // 25% for bills passed in one chamber
        break
      case "Passed House and Senate":
        probability = 85 // 85% for bills passed in both chambers
        break
      case "Enacted":
        probability = 100 // 100% for already enacted bills
        break
      default:
        probability = 5
    }

    // Adjust based on sponsor's party (majority party bills have higher chance)
    if (
      (bill.sponsorParty === "D" && bill.chamber === "Senate") ||
      (bill.sponsorParty === "D" && bill.chamber === "House")
    ) {
      probability *= 1.2 // 20% boost for majority party
    }

    // Cap at 100%
    return Math.min(Math.round(probability), 100)
  }

  return (
    <>
      <div className="grid gap-6 pt-4">
        {displayedBills.length > 0 ? (
          displayedBills.map((bill, index) => {
            const enactmentProbability = calculateProbability(bill)

            return (
              <ScrollAnimation key={bill.id} stagger={index % 3 === 0 ? 1 : index % 3 === 1 ? 2 : 3}>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="bg-muted/50 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={bill.chamber === "House" ? "blue" : "red"}>{bill.chamber}</Badge>
                          <Badge
                            variant={bill.sponsorParty === "D" ? "blue" : bill.sponsorParty === "R" ? "red" : "purple"}
                          >
                            {bill.sponsorParty}
                          </Badge>
                          <div className="flex items-center">
                            <span
                              className={`text-xs font-medium ${
                                enactmentProbability > 70
                                  ? "text-green-600"
                                  : enactmentProbability > 30
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }`}
                            >
                              {enactmentProbability}% chance of enactment
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">How is this calculated?</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-sm">
                                    Probability is calculated based on bill status, sponsor's party, chamber control,
                                    and historical data. Introduced bills have ~3% chance, committee bills ~12%,
                                    single-chamber passed bills ~25%, and bills passed by both chambers ~85%.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <CardTitle className="text-xl">
                          {bill.number}: {bill.title.length > 100 ? bill.title.substring(0, 100) + "..." : bill.title}
                        </CardTitle>
                        {bill.description && <CardDescription className="mt-1">{bill.description}</CardDescription>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {bill.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" />
                        {bill.sponsor}
                      </div>
                      {bill.policyArea && (
                        <div className="flex items-center">
                          <Tag className="h-3.5 w-3.5 mr-1" />
                          {bill.policyArea}
                        </div>
                      )}
                      {bill.committees && bill.committees.length > 0 && (
                        <div className="flex items-center">
                          <Building className="h-3.5 w-3.5 mr-1" />
                          {bill.committees.join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <p className="text-sm font-medium">Latest Action:</p>
                      <p className="text-sm text-muted-foreground">{bill.lastAction}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 px-6 py-4">
                    <Button asChild className="w-full sm:w-auto">
                      <Link
                        href={`/?bill=${bill.id}&title=${encodeURIComponent(bill.title)}`}
                        className="flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Explain This Bill
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollAnimation>
            )
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No bills found with available data.</p>
          </div>
        )}
      </div>
    </>
  )
}
