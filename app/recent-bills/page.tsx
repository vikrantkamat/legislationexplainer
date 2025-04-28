"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BillsList } from "@/components/bills-list"
import { CheckCircle, Clock, Filter } from "lucide-react"
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
  const [currentPages, setCurrentPages] = useState({
    introduced: 1,
    active: 1,
    passed: 1,
    enacted: 1,
  })
  const [activeTab, setActiveTab] = useState("introduced")
  const [totalPages, setTotalPages] = useState({
    introduced: 1,
    active: 1,
    passed: 1,
    enacted: 1,
  })

  // Reference to track when bills are rendered
  const billsRenderedRef = useRef({
    introduced: false,
    active: false,
    passed: false,
    enacted: false,
  })

  // Keep empty filters for compatibility with BillsList component
  const emptyFilters = {
    policyAreas: [],
    parties: [],
    chambers: [],
  }

  const tabsListRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (tab: string, page: number) => {
    setCurrentPages((prev) => ({
      ...prev,
      [tab]: page,
    }))
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Effect to check for total pages data after rendering
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        // Check for the hidden span with total pages data
        const totalPagesElement = document.getElementById("total-pages-data")
        if (totalPagesElement) {
          const tabType = activeTab as "introduced" | "active" | "passed" | "enacted"
          const newTotalPages = Number.parseInt(totalPagesElement.getAttribute("data-total-pages") || "1", 10)

          if (!billsRenderedRef.current[tabType]) {
            setTotalPages((prev) => ({
              ...prev,
              [tabType]: newTotalPages,
            }))
            billsRenderedRef.current[tabType] = true
          }
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [activeTab])

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
                searchTerm=""
                currentPage={currentPages.introduced}
                onPageChange={(page) => handlePageChange("introduced", page)}
                filters={emptyFilters}
              />
              {totalPages.introduced > 1 && (
                <Pagination
                  totalPages={totalPages.introduced}
                  currentPage={currentPages.introduced}
                  onPageChange={(page) => handlePageChange("introduced", page)}
                />
              )}
            </SlidingTabsContent>
            <SlidingTabsContent value="active">
              <BillsList
                type="active"
                searchTerm=""
                currentPage={currentPages.active}
                onPageChange={(page) => handlePageChange("active", page)}
                filters={emptyFilters}
              />
              {totalPages.active > 1 && (
                <Pagination
                  totalPages={totalPages.active}
                  currentPage={currentPages.active}
                  onPageChange={(page) => handlePageChange("active", page)}
                />
              )}
            </SlidingTabsContent>
            <SlidingTabsContent value="passed">
              <BillsList
                type="passed"
                searchTerm=""
                currentPage={currentPages.passed}
                onPageChange={(page) => handlePageChange("passed", page)}
                filters={emptyFilters}
              />
              {totalPages.passed > 1 && (
                <Pagination
                  totalPages={totalPages.passed}
                  currentPage={currentPages.passed}
                  onPageChange={(page) => handlePageChange("passed", page)}
                />
              )}
            </SlidingTabsContent>
            <SlidingTabsContent value="enacted">
              <BillsList
                type="enacted"
                searchTerm=""
                currentPage={currentPages.enacted}
                onPageChange={(page) => handlePageChange("enacted", page)}
                filters={emptyFilters}
              />
              {totalPages.enacted > 1 && (
                <Pagination
                  totalPages={totalPages.enacted}
                  currentPage={currentPages.enacted}
                  onPageChange={(page) => handlePageChange("enacted", page)}
                />
              )}
            </SlidingTabsContent>
          </SlidingTabs>
        </ScrollAnimation>
      </div>
    </main>
  )
}
