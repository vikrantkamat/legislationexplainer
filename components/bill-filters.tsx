"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Filter, ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// List of all policy areas
const allPolicyAreas = [
  "Agriculture and Food",
  "Armed Forces and National Security",
  "Civil Rights and Liberties",
  "Commerce",
  "Communications",
  "Congress",
  "Crime and Law Enforcement",
  "Economics and Public Finance",
  "Education",
  "Emergency Management",
  "Energy",
  "Environmental Protection",
  "Families",
  "Finance and Financial Sector",
  "Foreign Trade and International Finance",
  "Government Operations and Politics",
  "Health",
  "Housing and Community Development",
  "Immigration",
  "International Affairs",
  "Labor and Employment",
  "Native Americans",
  "Public Lands and Natural Resources",
  "Science, Technology, Communications",
  "Social Welfare",
  "Sports and Recreation",
  "Taxation",
  "Transportation and Public Works",
  "Water Resources Development",
]

export interface FilterOptions {
  policyAreas: string[]
  parties: string[]
  chambers: string[]
}

interface BillFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
  onResetFilters: () => void
}

export function BillFilters({ filters, onFilterChange, onResetFilters }: BillFiltersProps) {
  const [showAllPolicyAreas, setShowAllPolicyAreas] = useState(false)
  const [selectedPolicyAreas, setSelectedPolicyAreas] = useState<string[]>(filters.policyAreas || [])
  const [selectedParties, setSelectedParties] = useState<string[]>(filters.parties || [])
  const [isOpen, setIsOpen] = useState(false)

  // Sync local state with props when filters change externally
  useEffect(() => {
    setSelectedPolicyAreas(filters.policyAreas || [])
    setSelectedParties(filters.parties || [])
  }, [filters])

  const handlePolicyAreaChange = (policyArea: string, checked: boolean) => {
    setSelectedPolicyAreas((prev) => {
      if (checked) {
        return [...prev, policyArea]
      } else {
        return prev.filter((area) => area !== policyArea)
      }
    })
  }

  const handlePartyChange = (party: string, checked: boolean) => {
    setSelectedParties((prev) => {
      if (checked) {
        return [...prev, party]
      } else {
        return prev.filter((p) => p !== party)
      }
    })
  }

  const applyFilters = () => {
    try {
      onFilterChange({
        policyAreas: selectedPolicyAreas,
        parties: selectedParties,
        chambers: [], // Keep empty array for backward compatibility
      })
      setIsOpen(false) // Close dropdown after applying filters
    } catch (error) {
      console.error("Error applying filters:", error)
    }
  }

  const resetFilters = () => {
    setSelectedPolicyAreas([])
    setSelectedParties([])
    onResetFilters()
    setIsOpen(false) // Close dropdown after resetting filters
  }

  const hasActiveFilters = filters.policyAreas?.length > 0 || filters.parties?.length > 0

  return (
    <>
      <div className="flex gap-2">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${hasActiveFilters ? "border-primary text-primary" : ""}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-5 w-5 text-xs">
                  {(filters.policyAreas?.length || 0) + (filters.parties?.length || 0)}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            sideOffset={8}
            collisionPadding={16}
            // Explicitly set modal to false to allow scrolling
            modal={false}
          >
            <DropdownMenuLabel>Filter Bills By</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Party</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={selectedParties.includes("D")}
                onCheckedChange={(checked) => handlePartyChange("D", checked === true)}
              >
                Democratic
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedParties.includes("R")}
                onCheckedChange={(checked) => handlePartyChange("R", checked === true)}
              >
                Republican
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedParties.includes("I")}
                onCheckedChange={(checked) => handlePartyChange("I", checked === true)}
              >
                Independent
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Policy Area</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={selectedPolicyAreas.includes("Health")}
                onCheckedChange={(checked) => handlePolicyAreaChange("Health", checked === true)}
              >
                Health
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedPolicyAreas.includes("Education")}
                onCheckedChange={(checked) => handlePolicyAreaChange("Education", checked === true)}
              >
                Education
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedPolicyAreas.includes("Energy")}
                onCheckedChange={(checked) => handlePolicyAreaChange("Energy", checked === true)}
              >
                Energy
              </DropdownMenuCheckboxItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(false)
                  setShowAllPolicyAreas(true)
                }}
              >
                View All Policy Areas...
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <div className="p-2 flex justify-between">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
            Clear Filters
          </Button>
        )}
      </div>

      <Dialog open={showAllPolicyAreas} onOpenChange={setShowAllPolicyAreas}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>All Policy Areas</DialogTitle>
            <DialogDescription>Select policy areas to filter bills by those topics.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 gap-2">
              {allPolicyAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={`policy-${area}`}
                    checked={selectedPolicyAreas.includes(area)}
                    onCheckedChange={(checked) => handlePolicyAreaChange(area, checked === true)}
                  />
                  <Label htmlFor={`policy-${area}`} className="flex-grow cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedPolicyAreas([])}>
              Clear All
            </Button>
            <Button
              onClick={() => {
                applyFilters()
                setShowAllPolicyAreas(false)
              }}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
