import { BillsList } from "@/components/bills-list"
import { BillFilters } from "@/components/bill-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Pagination } from "@/components/pagination"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function RecentBillsPage() {
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
              <Input type="search" placeholder="Search bills by keyword or number..." className="pl-9 w-full" />
            </div>
            <BillFilters />
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <Tabs defaultValue="introduced" className="w-full">
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
              <BillsList type="introduced" />
              <Pagination totalPages={10} />
            </TabsContent>
            <TabsContent value="active">
              <BillsList type="active" />
              <Pagination totalPages={8} />
            </TabsContent>
            <TabsContent value="passed">
              <BillsList type="passed" />
              <Pagination totalPages={5} />
            </TabsContent>
            <TabsContent value="enacted">
              <BillsList type="enacted" />
              <Pagination totalPages={3} />
            </TabsContent>
          </Tabs>
        </ScrollAnimation>
      </div>
    </main>
  )
}
