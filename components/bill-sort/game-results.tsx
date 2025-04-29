"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Bill, Category } from "@/components/bill-sort/bill-sort-game"
import { Trophy, AlertCircle } from "lucide-react"

interface GameResultsProps {
  completedGroups: {
    category: Category
    bills: Bill[]
  }[]
  remainingBills: Bill[]
  categories: Category[]
  errors: number
  onPlayAgain: () => void
}

export function GameResults({ completedGroups, remainingBills, categories, errors, onPlayAgain }: GameResultsProps) {
  const isWinner = completedGroups.length === 4 || (completedGroups.length === 3 && remainingBills.length === 0)

  // Group remaining bills by category
  const remainingBillsByCategory: Record<string, Bill[]> = {}

  remainingBills.forEach((bill) => {
    if (!remainingBillsByCategory[bill.category]) {
      remainingBillsByCategory[bill.category] = []
    }
    remainingBillsByCategory[bill.category].push(bill)
  })

  // Get categories that weren't completed
  const remainingCategories = categories.filter(
    (category) => !completedGroups.some((group) => group.category.id === category.id),
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className={`${isWinner ? "bg-green-600" : "bg-amber-600"} text-white text-center`}>
          <div className="mx-auto bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            {isWinner ? <Trophy className="h-6 w-6 text-white" /> : <AlertCircle className="h-6 w-6 text-white" />}
          </div>
          <CardTitle className="text-2xl">
            {isWinner ? "Congratulations! You sorted all the bills!" : "Game Over - Here are the correct groupings"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {isWinner ? (
              <p className="text-center">
                Great job understanding how legislation covers many parts of life! You completed the game with{" "}
                {3 - errors} {errors === 2 ? "error" : "errors"} to spare.
              </p>
            ) : (
              <p className="text-center">
                You found {completedGroups.length} out of 4 categories before using all your attempts. Here's how the
                bills connect across topics!
              </p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {/* Show completed groups */}
              {completedGroups.map((group, index) => (
                <Card key={`completed-${index}`} className="overflow-hidden">
                  <CardHeader className={`${group.category.color} text-white py-2 px-4`}>
                    <CardTitle className="text-lg">{group.category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">{group.category.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {group.bills.map((bill) => (
                        <div key={bill.id} className="p-2 bg-muted/30 rounded text-sm border border-muted">
                          {bill.title}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Show remaining categories */}
              {remainingCategories.map((category) => {
                const categoryBills = remainingBills.filter((bill) => bill.category === category.id)

                return (
                  <Card key={`remaining-${category.id}`} className="overflow-hidden">
                    <CardHeader className={`${category.color} text-white py-2 px-4`}>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryBills.map((bill) => (
                          <div key={bill.id} className="p-2 bg-muted/30 rounded text-sm border border-muted">
                            {bill.title}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button size="lg" onClick={onPlayAgain}>
            Play Again with New Bills
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
