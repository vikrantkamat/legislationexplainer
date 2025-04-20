import { BillsList } from "@/components/bills-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecentBillsPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recent Bills</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay informed about the latest legislation in Congress
          </p>
        </div>

        <Tabs defaultValue="passed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="passed">Passed Bills</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Bills</TabsTrigger>
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
