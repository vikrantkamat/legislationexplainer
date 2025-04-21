import { BillsList } from "@/components/bills-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock } from "lucide-react"

export default function RecentBillsPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Recent Bills
          </h1>
          <p className="text-xl text-muted-foreground">Stay informed about the latest legislation in Congress</p>
        </div>

        <Tabs defaultValue="passed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="passed" className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Passed Bills
            </TabsTrigger>
            <TabsTrigger value="submitted" className="flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2" />
              Submitted Bills
            </TabsTrigger>
          </TabsList>
          <TabsContent value="passed">
            <BillsList type="passed" />
          </TabsContent>
          <TabsContent value="submitted">
            <BillsList type="submitted" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
