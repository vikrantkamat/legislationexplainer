"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Puzzle } from "lucide-react"

interface GameInstructionsProps {
  onStart: () => void
}

export function GameInstructions({ onStart }: GameInstructionsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Puzzle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">How to Play Bill Sort</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Sort the 16 bills into 4 groups based on their major theme. You have a maximum of three errors before the
            answers are revealed.
          </p>

          <div className="space-y-2">
            <h3 className="font-medium">Game Rules:</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Click on tiles to select them</li>
              <li>Select exactly 4 bills that belong to the same category</li>
              <li>Click "Submit Group" when you've selected 4 bills</li>
              <li>Correct groups will move to the "Completed Groups" section</li>
              <li>Incorrect groups will count as an error</li>
              <li>After 3 errors, the game ends and solutions are revealed</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Tip: Some bills might seem to fit multiple categories, but there is always one best match!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" onClick={onStart}>
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
