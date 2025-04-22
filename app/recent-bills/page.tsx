"use client"

import type React from "react"

import { useState, useRef } from "react"
import { BillsList } from "@/components/bills-list"
import { BillFilters, type FilterOptions } from "@/components/bill-filters"
import { CheckCircle, Clock, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/pagination"
import { ScrollAnimation } from "@/components/scroll-animation"
import {
  SlidingTabs,
  SlidingTabsList,
  SlidingTabsTrigger,
  SlidingTabsContent,
  SlidingTabsIndicator,
} from "@/components/sliding-tabs"

// Custom Gavel icon component
function GavelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
    </svg>
  )
}

export default function RecentBillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPages, setCurrentPages] = useState({
    introduced: 1,
    active: 1,
    passed: 1,
    enacted: 1,
  })
  const [activeTab, setActiveTab] = useState("introduced")
  const [totalPages, setTotalPages] = useState({
    introduced: 10,
    active: 8,
    passed: 5,
    enacted: 3,
  })
  const [filters, setFilters] = useState<FilterOptions>({
    policyAreas: [],
    parties: [],
    chambers: [],
  })

  const tabsListRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (tab: string, page: number) => {
    setCurrentPages((prev) => ({
      ...prev,
      [tab]: page,
    }))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // Reset to page 1 when searching
    setCurrentPages({
      introduced: 1,
      active: 1,
      passed: 1,
      enacted: 1,
    })
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    // Reset to page 1 when filters change
    setCurrentPages({
      introduced: 1,
      active: 1,
      passed: 1,
      enacted: 1,
    })
  }

  const resetFilters = () => {
    setFilters({
      policyAreas: [],
      parties: [],
      chambers: [],
    })
    // Reset to page 1 when filters are reset
    setCurrentPages({
      introduced: 1,
      active: 1,
      passed: 1,
      enacted: 1,
    })
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="space-y-6">
        <ScrollAnimation>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">Recent Bills</h1>
            <p className="text-xl text-muted-foreground">Track the latest legislation in Congress</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bills by keyword or number..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <BillFilters filters={filters} onFilterChange={handleFilterChange} onResetFilters={resetFilters} />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <SlidingTabs defaultValue="introduced" className="w-full" onValueChange={handleTabChange}>
            <SlidingTabsList ref={tabsListRef} className="grid w-full grid-cols-4 mb-4">
              <SlidingTabsIndicator containerRef={tabsListRef} />
              <SlidingTabsTrigger value="introduced" icon={<Clock className="h-4 w-4" />}>
                Introduced
              </SlidingTabsTrigger>
              <SlidingTabsTrigger value="active" icon={<Filter className="h-4 w-4" />}>
                Active
              </SlidingTabsTrigger>
              <SlidingTabsTrigger value="passed" icon={<CheckCircle className="h-4 w-4" />}>
                Passed
              </SlidingTabsTrigger>
              <SlidingTabsTrigger value="enacted" icon={<GavelIcon className="h-4 w-4" />}>
                Enacted
              </SlidingTabsTrigger>
            </SlidingTabsList>
            <SlidingTabsContent value="introduced">
              <BillsList
                type="introduced"
                searchTerm={searchTerm}
                currentPage={currentPages.introduced}
                onPageChange={(page) => handlePageChange("introduced", page)}
                filters={filters}
              />
              <Pagination
                totalPages={totalPages.introduced}
                currentPage={currentPages.introduced}
                onPageChange={(page) => handlePageChange("introduced", page)}
              />
            </SlidingTabsContent>
            <SlidingTabsContent value="active">
              <BillsList
                type="active"
                searchTerm={searchTerm}
                currentPage={currentPages.active}
                onPageChange={(page) => handlePageChange("active", page)}
                filters={filters}
              />
              <Pagination
                totalPages={totalPages.active}
                currentPage={currentPages.active}
                onPageChange={(page) => handlePageChange("active", page)}
              />
            </SlidingTabsContent>
            <SlidingTabsContent value="passed">
              <BillsList
                type="passed"
                searchTerm={searchTerm}
                currentPage={currentPages.passed}
                onPageChange={(page) => handlePageChange("passed", page)}
                filters={filters}
              />
              <Pagination
                totalPages={totalPages.passed}
                currentPage={currentPages.passed}
                onPageChange={(page) => handlePageChange("passed", page)}
              />
            </SlidingTabsContent>
            <SlidingTabsContent value="enacted">
              <BillsList
                type="enacted"
                searchTerm={searchTerm}
                currentPage={currentPages.enacted}
                onPageChange={(page) => handlePageChange("enacted", page)}
                filters={filters}
              />
              <Pagination
                totalPages={totalPages.enacted}
                currentPage={currentPages.enacted}
                onPageChange={(page) => handlePageChange("enacted", page)}
              />
            </SlidingTabsContent>
          </SlidingTabs>
        </ScrollAnimation>
      </div>
    </main>
  )
}
