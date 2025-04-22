"use client"

import type React from "react"

import { useState } from "react"
import { BillsList } from "@/components/bills-list"
import { BillFilters } from "@/components/bill-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/pagination"
import { ScrollAnimation } from "@/components/scroll-animation"

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
            <BillFilters />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <Tabs defaultValue="introduced" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="introduced" className="flex items-center justify-center">
                <Clock className="h-4 w-4 mr-2" />
                Introduced
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center justify-center">
                <Filter className="h-4 w-4 mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger value="passed" className="flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Passed
              </TabsTrigger>
              <TabsTrigger value="enacted" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M12 22a8 8 0 0 0 0-16"></path>
                  <path d="M12 8V2l-4 4"></path>
                  <path d="M12 2l4 4"></path>
                  <path d="M18 18a4 4 0 0 0-6-6"></path>
                  <path d="M16 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                </svg>
                Enacted
              </TabsTrigger>
            </TabsList>
            <TabsContent value="introduced">
              <BillsList
                type="introduced"
                searchTerm={searchTerm}
                currentPage={currentPages.introduced}
                onPageChange={(page) => handlePageChange("introduced", page)}
              />
              <Pagination
                totalPages={totalPages.introduced}
                currentPage={currentPages.introduced}
                onPageChange={(page) => handlePageChange("introduced", page)}
              />
            </TabsContent>
            <TabsContent value="active">
              <BillsList
                type="active"
                searchTerm={searchTerm}
                currentPage={currentPages.active}
                onPageChange={(page) => handlePageChange("active", page)}
              />
              <Pagination
                totalPages={totalPages.active}
                currentPage={currentPages.active}
                onPageChange={(page) => handlePageChange("active", page)}
              />
            </TabsContent>
            <TabsContent value="passed">
              <BillsList
                type="passed"
                searchTerm={searchTerm}
                currentPage={currentPages.passed}
                onPageChange={(page) => handlePageChange("passed", page)}
              />
              <Pagination
                totalPages={totalPages.passed}
                currentPage={currentPages.passed}
                onPageChange={(page) => handlePageChange("passed", page)}
              />
            </TabsContent>
            <TabsContent value="enacted">
              <BillsList
                type="enacted"
                searchTerm={searchTerm}
                currentPage={currentPages.enacted}
                onPageChange={(page) => handlePageChange("enacted", page)}
              />
              <Pagination
                totalPages={totalPages.enacted}
                currentPage={currentPages.enacted}
                onPageChange={(page) => handlePageChange("enacted", page)}
              />
            </TabsContent>
          </Tabs>
        </ScrollAnimation>
      </div>
    </main>
  )
}
