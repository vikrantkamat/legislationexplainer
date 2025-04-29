"use client"
import { ScrollAnimation } from "@/components/scroll-animation"
import { BillSortGame } from "@/components/bill-sort/bill-sort-game"

export default function BillSortPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <ScrollAnimation>
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gradient">Law Links</h1>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <BillSortGame />
        </ScrollAnimation>
      </div>
    </main>
  )
}
