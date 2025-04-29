"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BillTile } from "@/components/bill-sort/bill-tile"
import { GameInstructions } from "@/components/bill-sort/game-instructions"
import { generateGameData } from "@/lib/bill-sort-data"
import { RefreshCw, RotateCcw } from "lucide-react"

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

export interface CompletedGroup {
  category: Category
  bills: Bill[]
  solvedByPlayer: boolean
}

export function BillSortGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [bills, setBills] = useState<Bill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedBills, setSelectedBills] = useState<string[]>([])
  const [completedGroups, setCompletedGroups] = useState<CompletedGroup[]>([])
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

  // Auto-complete remaining categories when game is over
  const autoCompleteCategories = () => {
    if (!gameData) return

    // Get all completed category IDs
    const completedCategoryIds = completedGroups.map((group) => group.category.id)

    // Find remaining categories
    const remainingCategories = gameData.categories.filter((category) => !completedCategoryIds.includes(category.id))

    // Group remaining bills by category
    const billsByCategory: Record<string, Bill[]> = {}

    bills.forEach((bill) => {
      if (!billsByCategory[bill.category]) {
        billsByCategory[bill.category] = []
      }
      billsByCategory[bill.category].push(bill)
    })

    // Create completed groups for remaining categories
    const newCompletedGroups = remainingCategories.map((category) => {
      return {
        category,
        bills: billsByCategory[category.id] || [],
        solvedByPlayer: false,
      }
    })

    // Add new completed groups
    setCompletedGroups((prev) => [...prev, ...newCompletedGroups])

    // Clear remaining bills
    setBills([])
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
            solvedByPlayer: true,
          },
        ])

        // Remove from available bills
        setBills((prev) => prev.filter((bill) => !selectedBills.includes(bill.id)))

        // Clear selection
        setSelectedBills([])

        // Clear any hint message
        setHintMessage(null)

        // Check if game is complete (all categories found or too many errors)
        if (completedGroups.length === 3 || errors >= 3) {
          // End the game and auto-complete remaining categories
          setTimeout(() => {
            setGameOver(true)
            autoCompleteCategories()
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
          // Game over after 3 errors - auto-complete remaining categories
          setTimeout(() => {
            setGameOver(true)
            autoCompleteCategories()
          }, 1000)
        }
        return newErrors
      })

      // Clear selection
      setSelectedBills([])
    }
  }

  // Get color class based on category
  const getCategoryColorClass = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return "bg-slate-200 dark:bg-slate-800"

    switch (category.color) {
      case "red":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
      case "blue":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
      case "green":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
      case "yellow":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200"
      default:
        return "bg-slate-200 dark:bg-slate-800"
    }
  }

  let content

  if (!gameStarted) {
    content = <GameInstructions onStart={startGame} />
  } else {
    content = (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium">
            Errors: <span className="font-bold">{errors}/3</span>
          </div>
          {gameOver ? (
            <Button variant="outline" size="sm" onClick={startNewGame}>
              <RotateCcw className="h-4 w-4 mr-2" />
              New Game
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={resetGame}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Game
            </Button>
          )}
        </div>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-center">
            {gameOver ? "Game Complete!" : "Create four groups of four!"}
          </h2>

          {gameOver && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-md text-center">
              <p className="font-medium">
                {completedGroups.filter((g) => g.solvedByPlayer).length === 4
                  ? "Congratulations! You found all categories!"
                  : `You found ${completedGroups.filter((g) => g.solvedByPlayer).length} out of 4 categories.`}
              </p>
            </div>
          )}

          {!gameOver && hintMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 rounded-md text-amber-800 dark:text-amber-200 text-sm text-center"
            >
              {hintMessage}
            </motion.div>
          )}

          {/* Completed groups at the top */}
          <AnimatePresence>
            {completedGroups.map((group, index) => (
              <motion.div
                key={`group-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 p-3 rounded-md ${getCategoryColorClass(group.category.id)} ${!group.solvedByPlayer ? "border-2 border-dashed border-gray-400 dark:border-gray-600" : ""}`}
              >
                <h3 className="text-center font-bold mb-2 uppercase tracking-wider text-sm">
                  {group.category.name}
                  {!group.solvedByPlayer && <span className="ml-2 font-normal">(Auto-completed)</span>}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {group.bills.map((bill) => (
                    <div
                      key={bill.id}
                      className="p-2 bg-white/80 dark:bg-black/20 rounded text-center text-xs sm:text-sm font-medium"
                    >
                      {bill.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Remaining bills grid - only show if game is not over */}
          {!gameOver && bills.length > 0 && (
            <>
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

              <div className="mt-6 flex justify-center gap-3">
                <Button variant="outline" disabled={selectedBills.length === 0} onClick={() => setSelectedBills([])}>
                  Deselect All
                </Button>
                <Button disabled={selectedBills.length !== 4} onClick={submitGroup} size="lg">
                  Submit
                </Button>
              </div>
            </>
          )}

          {/* Play again button when game is over */}
          {gameOver && (
            <div className="mt-6 flex justify-center">
              <Button onClick={startNewGame} size="lg" className="px-8">
                Play Again
              </Button>
            </div>
          )}
        </Card>

        {!gameOver && (
          <div className="flex justify-center">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${i < errors ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"}`}
                  aria-label={i < errors ? "Error made" : "Error slot available"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return <>{content}</>
}
