"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Calendar, User, ExternalLink, Building, Tag, FileSearch } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { generateBills } from "@/lib/bill-data"
import type { FilterOptions } from "@/components/bill-filters"

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
    setAllBills(bills)
  }, [type])

  // Filter bills based on search term and filters
  useEffect(() => {
    let filtered = [...allBills]

    // Apply search filter - prioritize prefix matching
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (bill) =>
          // Prefix matching for bill numbers
          bill.number.toLowerCase().startsWith(term) ||
          // For other fields, continue with contains matching
          bill.title
            .toLowerCase()
            .includes(term) ||
          bill.description.toLowerCase().includes(term) ||
          bill.policyArea?.toLowerCase().includes(term) ||
          bill.sponsor.toLowerCase().includes(term),
      )
    }

    // Apply policy area filters
    if (filters.policyAreas && filters.policyAreas.length > 0) {
      filtered = filtered.filter((bill) => bill.policyArea && filters.policyAreas.includes(bill.policyArea))
    }

    // Apply party filters
    if (filters.parties && filters.parties.length > 0) {
      filtered = filtered.filter((bill) => filters.parties.includes(bill.sponsorParty))
    }

    // Apply chamber filters (kept for backward compatibility)
    if (filters.chambers && filters.chambers.length > 0) {
      filtered = filtered.filter((bill) => filters.chambers.includes(bill.chamber))
    }

    setFilteredBills(filtered)
    setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)))

    // If current page is now out of bounds, reset to page 1
    if (currentPage > Math.ceil(filtered.length / ITEMS_PER_PAGE)) {
      onPageChange(1)
    }
  }, [searchTerm, allBills, filters, currentPage, onPageChange])

  // Update displayed bills based on current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setDisplayedBills(filteredBills.slice(startIndex, endIndex))
  }, [filteredBills, currentPage])

  // Determine if filters are active
  const hasActiveFilters =
    filters.policyAreas?.length > 0 ||
    filters.parties?.length > 0 ||
    filters.chambers?.length > 0 ||
    searchTerm.trim() !== ""

  return (
    <>
      <div className="grid gap-6 pt-4">
        {displayedBills.length > 0 ? (
          displayedBills.map((bill, index) => (
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
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg bg-muted/20 p-6">
            <FileSearch className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No matching bills found</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? `No ${type} bills match your current ${
                    searchTerm ? "search and " : ""
                  }filter criteria. Try adjusting your filters or search term.`
                : `There are no ${type} bills available at this time. Please check back later.`}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  onPageChange(1)
                }}
              >
                View All Bills
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
