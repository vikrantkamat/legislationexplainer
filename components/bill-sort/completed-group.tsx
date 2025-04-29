"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Bill, Category } from "@/components/bill-sort/bill-sort-game"

interface CompletedGroupProps {
  group: {
    category: Category
    bills: Bill[]
  }
}

export function CompletedGroup({ group }: CompletedGroupProps) {
  const { category, bills } = group

  // Get the category color or default to a neutral color
  const categoryColor = category.color || "bg-muted"

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <CardHeader className={`${categoryColor} text-white`}>
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {bills.map((bill) => (
              <div key={bill.id} className="p-2 bg-muted/30 rounded text-sm border border-muted">
                {bill.title}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
