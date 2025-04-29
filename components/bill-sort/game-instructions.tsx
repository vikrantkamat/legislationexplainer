"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface GameInstructionsProps {
  onStart: () => void
}

export function GameInstructions({ onStart }: GameInstructionsProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">How to Play Law Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Law Links is a game where you need to identify groups of bills that belong to the same category.</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>You will see a grid of bills from different legislative categories.</li>
          <li>Select 4 bills that you think belong to the same category.</li>
          <li>Click "Submit" to check if your selection is correct.</li>
          <li>If correct, the bills will be grouped together with their category name.</li>
          <li>If incorrect, you'll lose one of your three allowed mistakes.</li>
          <li>Your goal is to find all 4 categories before making 3 mistakes.</li>
        </ol>
        <p className="font-medium">
          Good luck! Test your knowledge of legislative themes and see if you can identify all the connections.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="lg" onClick={onStart}>
          Start Game
        </Button>
      </CardFooter>
    </Card>
  )
}
