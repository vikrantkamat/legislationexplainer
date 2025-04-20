"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { ExplanationResult } from "@/components/explanation-result"
import { useEffect } from "react"
import { billTexts } from "@/lib/bill-data"

export function LegislationForm() {
  const [legislation, setLegislation] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()

  // Handle bill parameter from URL
  useEffect(() => {
    const billId = searchParams.get("bill")
    if (billId && billTexts[billId]) {
      setLegislation(billTexts[billId])
    } else if (billId) {
      // Fallback for bills not in our database
      setLegislation(
        `This bill (${billId}) is not currently in our database. Please check back later or enter the text manually.`,
      )
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!legislation.trim()) {
      setError("Please enter some legislation text")
      return
    }

    setIsLoading(true)
    setError("")
    setExplanation("")

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ legislation }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate explanation")
      }

      const data = await response.json()
      setExplanation(data.explanation)
    } catch (err) {
      setError("An error occurred while generating the explanation. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="legislation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enter Legislation Text
          </label>
          <Textarea
            id="legislation"
            placeholder="Paste the legislation text you want explained..."
            className="min-h-[150px]"
            value={legislation}
            onChange={(e) => setLegislation(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Explanation...
            </>
          ) : (
            "Explain This Legislation"
          )}
        </Button>
      </form>

      {explanation && <ExplanationResult explanation={explanation} />}
    </div>
  )
}
