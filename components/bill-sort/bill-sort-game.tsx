"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BillTile } from "@/components/bill-sort/bill-tile"
import { CompletedGroup } from "@/components/bill-sort/completed-group"
import { GameInstructions } from "@/components/bill-sort/game-instructions"
import { GameResults } from "@/components/bill-sort/game-results"
import { generateGameData } from "@/lib/bill-sort-data"
import { RefreshCw } from "lucide-react"

export interface Bill {
  id: string
  title: string
  category: string
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
}

export function BillSortGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [bills, setBills] = useState<Bill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedBills, setSelectedBills] = useState<string[]>([])
  const [completedGroups, setCompletedGroups] = useState<
    {
      category: Category
      bills: Bill[]
    }[]
  >([])
  const [errors, setErrors] = useState(0)
  const [shake, setShake] = useState(false)
  const [gameData, setGameData] = useState<{
    bills: Bill[]
    categories: Category[]
  } | null>(null)
  const [hintMessage, setHintMessage] = useState<string | null>(null)

  // Initialize game data
  useEffect(() => {
    const data = generateGameData()
    setGameData(data)
  }, [])

  // Start a new game
  const startGame = () => {
    if (!gameData) return

    setBills([...gameData.bills])
    setCategories([...gameData.categories])
    setSelectedBills([])
    setCompletedGroups([])
    setErrors(0)
    setGameOver(false)
    setGameStarted(true)
  }

  // Reset the game
  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setSelectedBills([])
    setCompletedGroups([])
    setErrors(0)

    // Generate new game data
    const newData = generateGameData()
    setGameData(newData)
  }

  // Start a new game with fresh data
  const startNewGame = () => {
    setGameOver(false)
    setSelectedBills([])
    setCompletedGroups([])
    setErrors(0)

    // Generate new game data
    const newData = generateGameData()
    setGameData(newData)
    setBills([...newData.bills])
    setCategories([...newData.categories])
  }

  // Handle bill selection
  const toggleBillSelection = (billId: string) => {
    if (gameOver) return

    setSelectedBills((prev) => {
      if (prev.includes(billId)) {
        return prev.filter((id) => id !== billId)
      } else {
        if (prev.length < 4) {
          return [...prev, billId]
        }
        return prev
      }
    })
  }

  // Submit selected bills as a group
  const submitGroup = () => {
    if (selectedBills.length !== 4 || gameOver) return

    // Get the selected bills
    const selectedBillObjects = bills.filter((bill) => selectedBills.includes(bill.id))

    // Count occurrences of each category
    const categoryCounts: Record<string, number> = {}
    selectedBillObjects.forEach((bill) => {
      categoryCounts[bill.category] = (categoryCounts[bill.category] || 0) + 1
    })

    // Find the most common category and its count
    let mostCommonCategory = ""
    let highestCount = 0

    Object.entries(categoryCounts).forEach(([category, count]) => {
      if (count > highestCount) {
        mostCommonCategory = category
        highestCount = count
      }
    })

    // Check if all bills belong to the same category
    const isCorrectGroup = highestCount === 4

    // Check if 3 bills belong to the same category (almost correct)
    const isAlmostCorrect = highestCount === 3

    if (isCorrectGroup) {
      // Find the category
      const categoryId = mostCommonCategory
      const category = gameData?.categories.find((cat) => cat.id === categoryId)

      if (category) {
        // Add to completed groups
        setCompletedGroups((prev) => [
          ...prev,
          {
            category,
            bills: selectedBillObjects,
          },
        ])

        // Remove from available bills
        setBills((prev) => prev.filter((bill) => !selectedBills.includes(bill.id)))

        // Clear selection
        setSelectedBills([])

        // Clear any hint message
        setHintMessage(null)

        // Check if game is complete
        if (completedGroups.length === 3) {
          // This would be the 4th group, so game is complete
          setTimeout(() => {
            setGameOver(true)
          }, 1000)
        }
      }
    } else if (isAlmostCorrect) {
      // Show hint message
      setHintMessage("Almost there! 3 bills match, but 1 doesn't belong in this group.")

      // Clear hint after 4 seconds
      setTimeout(() => {
        setHintMessage(null)
      }, 4000)

      // Don't count this as an error, but clear the selection
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setSelectedBills([])
    } else {
      // Incorrect group
      setShake(true)
      setTimeout(() => setShake(false), 500)

      // Clear any hint message
      setHintMessage(null)

      // Increment error count
      setErrors((prev) => {
        const newErrors = prev + 1
        if (newErrors >= 3) {
          // Game over after 3 errors
          setTimeout(() => {
            setGameOver(true)
          }, 1000)
        }
        return newErrors
      })

      // Clear selection
      setSelectedBills([])
    }
  }

  let content

  if (!gameStarted) {
    content = <GameInstructions onStart={startGame} />
  } else if (gameOver) {
    content = (
      <GameResults
        completedGroups={completedGroups}
        remainingBills={bills}
        categories={categories}
        errors={errors}
        onPlayAgain={startNewGame}
      />
    )
  } else {
    content = (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">
            Errors: <span className="font-bold">{errors}/3</span>
          </div>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Game
          </Button>
        </div>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-center">Select 4 bills that belong to the same category</h2>
          {hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 rounded-md text-amber-800 dark:text-amber-200 text-sm text-center"
            >
              {hintMessage}
            </motion.div>
          )}

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {bills.map((bill) => (
                <BillTile
                  key={bill.id}
                  bill={bill}
                  isSelected={selectedBills.includes(bill.id)}
                  onSelect={() => toggleBillSelection(bill.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 flex justify-center">
            <Button disabled={selectedBills.length !== 4} onClick={submitGroup} size="lg">
              Submit Group
            </Button>
          </div>
        </Card>

        {completedGroups.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Completed Groups</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {completedGroups.map((group, index) => (
                <CompletedGroup key={index} group={group} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return <>{content}</>
}
