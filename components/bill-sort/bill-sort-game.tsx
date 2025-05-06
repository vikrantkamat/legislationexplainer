"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
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

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
}

const groupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const billInGroupVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
}

const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
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
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Initialize game data
  useEffect(() => {
    const data = generateGameData()
    setGameData(data)
  }, [])

  // Start a new game
  const startGame = () => {
    if (!gameData) return

    setIsTransitioning(true)

    // Slight delay for transition effect
    setTimeout(() => {
      setBills([...gameData.bills])
      setCategories([...gameData.categories])
      setSelectedBills([])
      setCompletedGroups([])
      setErrors(0)
      setGameOver(false)
      setGameStarted(true)
      setIsTransitioning(false)
    }, 300)
  }

  // Reset the game
  const resetGame = () => {
    setIsTransitioning(true)

    setTimeout(() => {
      setGameStarted(false)
      setGameOver(false)
      setSelectedBills([])
      setCompletedGroups([])
      setErrors(0)

      // Generate new game data
      const newData = generateGameData()
      setGameData(newData)
      setIsTransitioning(false)
    }, 300)
  }

  // Start a new game with fresh data
  const startNewGame = () => {
    setIsTransitioning(true)

    setTimeout(() => {
      setGameOver(false)
      setSelectedBills([])
      setCompletedGroups([])
      setErrors(0)

      // Generate new game data
      const newData = generateGameData()
      setGameData(newData)
      setBills([...newData.bills])
      setCategories([...newData.categories])
      setIsTransitioning(false)
    }, 300)
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

    // Create completed groups for remaining categories with staggered timing
    remainingCategories.forEach((category, index) => {
      setTimeout(() => {
        setCompletedGroups((prev) => [
          ...prev,
          {
            category,
            bills: billsByCategory[category.id] || [],
            solvedByPlayer: false,
          },
        ])
      }, index * 600) // Stagger the appearance of auto-completed groups
    })

    // Clear remaining bills with a delay to allow for animations
    setTimeout(() => {
      setBills([])
    }, 300)
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
        // First remove from available bills for smoother animation
        setBills((prev) => prev.filter((bill) => !selectedBills.includes(bill.id)))

        // Clear selection
        setSelectedBills([])

        // Add to completed groups with a slight delay for better animation
        setTimeout(() => {
          setCompletedGroups((prev) => [
            ...prev,
            {
              category,
              bills: selectedBillObjects,
              solvedByPlayer: true,
            },
          ])

          // Clear any hint message
          setHintMessage(null)
        }, 100)

        // Check if game is complete (all categories found or too many errors)
        if (completedGroups.length === 3 || errors >= 3) {
          // End the game and auto-complete remaining categories with a delay
          setTimeout(() => {
            setGameOver(true)
            autoCompleteCategories()
          }, 800)
        }
      }
    } else if (isAlmostCorrect) {
      // Show hint message
      setHintMessage("Almost there! 3 bills match, but 1 doesn't belong in this group.")

      // Clear hint after 4 seconds
      setTimeout(() => {
        setHintMessage(null)
      }, 4000)

      // Count this as an error now
      setShake(true)
      setTimeout(() => setShake(false), 500)

      // Increment error count
      setErrors((prev) => {
        const newErrors = prev + 1
        if (newErrors >= 3) {
          // Game over after 3 errors - auto-complete remaining categories with delay
          setTimeout(() => {
            setGameOver(true)
            setTimeout(() => {
              autoCompleteCategories()
            }, 500)
          }, 800)
        }
        return newErrors
      })

      // Clear selection
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
          // Game over after 3 errors - auto-complete remaining categories with delay
          setTimeout(() => {
            setGameOver(true)
            setTimeout(() => {
              autoCompleteCategories()
            }, 500)
          }, 800)
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
    content = (
      <AnimatePresence mode="wait">
        <motion.div key="instructions" initial="initial" animate="animate" exit="exit" variants={pageTransition}>
          <GameInstructions onStart={startGame} />
        </motion.div>
      </AnimatePresence>
    )
  } else {
    content = (
      <AnimatePresence mode="wait">
        <motion.div
          key={`game-${isTransitioning ? "transitioning" : "active"}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          className="space-y-6"
        >
          <motion.div className="flex justify-between items-center" variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="p-4 overflow-hidden">
              <motion.h2
                className="text-xl font-semibold mb-3 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                }}
              >
                {gameOver ? "Game Complete!" : "Create four groups of four!"}
              </motion.h2>

              <AnimatePresence>
                {gameOver && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      transition: {
                        opacity: { delay: 0.3, duration: 0.5 },
                        height: { delay: 0.1, duration: 0.4 },
                      },
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-md text-center overflow-hidden"
                  >
                    <motion.p
                      className="font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5, duration: 0.3 },
                      }}
                    >
                      {completedGroups.filter((g) => g.solvedByPlayer).length === 4
                        ? "Congratulations! You found all categories!"
                        : `You found ${completedGroups.filter((g) => g.solvedByPlayer).length} out of 4 categories.`}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!gameOver && hintMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                      transition: {
                        opacity: { duration: 0.3 },
                        y: { type: "spring", stiffness: 300, damping: 25 },
                        height: { duration: 0.2 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                      transition: {
                        opacity: { duration: 0.2 },
                        y: { duration: 0.3 },
                        height: { delay: 0.1, duration: 0.3 },
                      },
                    }}
                    className="mb-4 p-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/30 rounded-md text-amber-800 dark:text-amber-200 text-sm text-center overflow-hidden"
                  >
                    {hintMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Completed groups at the top */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <AnimatePresence>
                  {completedGroups.map((group, index) => (
                    <motion.div
                      key={`group-${group.category.id}`}
                      variants={groupVariants}
                      layout
                      className={`mb-4 p-3 rounded-md ${getCategoryColorClass(group.category.id)} ${!group.solvedByPlayer ? "border-2 border-dashed border-gray-400 dark:border-gray-600" : ""}`}
                    >
                      <motion.h3
                        className="text-center font-bold mb-2 uppercase tracking-wider text-sm"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { delay: 0.2, duration: 0.3 },
                        }}
                      >
                        {group.category.name}
                        {!group.solvedByPlayer && (
                          <motion.span
                            className="ml-2 font-normal"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              transition: { delay: 0.4, duration: 0.3 },
                            }}
                          >
                            (Auto-completed)
                          </motion.span>
                        )}
                      </motion.h3>
                      <motion.div className="grid grid-cols-4 gap-2" variants={containerVariants}>
                        {group.bills.map((bill) => (
                          <motion.div
                            key={bill.id}
                            variants={billInGroupVariants}
                            className="p-2 bg-white/80 dark:bg-black/20 rounded text-center text-xs sm:text-sm font-medium"
                          >
                            {bill.title}
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Remaining bills grid - only show if game is not over */}
              {!gameOver && bills.length > 0 && (
                <>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                    animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AnimatePresence>
                      {bills.map((bill) => (
                        <motion.div key={bill.id} variants={itemVariants} layout>
                          <BillTile
                            bill={bill}
                            isSelected={selectedBills.includes(bill.id)}
                            onSelect={() => toggleBillSelection(bill.id)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="mt-6 flex justify-center gap-3"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.5 },
                    }}
                  >
                    <Button
                      variant="outline"
                      disabled={selectedBills.length === 0}
                      onClick={() => setSelectedBills([])}
                    >
                      Deselect All
                    </Button>
                    <Button disabled={selectedBills.length !== 4} onClick={submitGroup} size="lg">
                      Submit
                    </Button>
                  </motion.div>
                </>
              )}

              {/* Play again button when game is over */}
              <AnimatePresence>
                {gameOver && (
                  <motion.div
                    className="mt-6 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delay: 0.8,
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button onClick={startNewGame} size="lg" className="px-8">
                      Play Again
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          {!gameOver && (
            <motion.div className="flex justify-center" variants={itemVariants}>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { delay: 0.2 + i * 0.1, duration: 0.3 },
                    }}
                    className={`w-4 h-4 rounded-full ${i < errors ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"}`}
                    aria-label={i < errors ? "Error made" : "Error slot available"}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    )
  }

  return <>{content}</>
}
