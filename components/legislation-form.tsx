"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, FileText, BookOpen } from "lucide-react"
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
    const billTitle = searchParams.get("title")

    if (billId) {
      if (billTexts[billId]) {
        // If bill exists in our database, use the full text
        setLegislation(billTexts[billId])
      } else if (billTitle) {
        // If bill doesn't exist but we have the title, use the title for explanation
        const billNumber = billId.toUpperCase().startsWith("HR")
          ? billId.toUpperCase()
          : billId.toUpperCase().startsWith("S")
            ? billId.toUpperCase()
            : `Bill ${billId.toUpperCase()}`

        setLegislation(
          `${billTitle} (${billNumber}): Please explain this legislation based on the official text from Congress.gov.`,
        )
      } else {
        // Fallback if we don't have title or text
        setLegislation(
          `Bill ${billId.toUpperCase()}: Please explain this legislation based on the official text from Congress.gov.`,
        )
      }
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
            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Enter Legislation Text or Bill Number
          </label>
          <Textarea
            id="legislation"
            placeholder="Paste the legislation text or enter a bill number (e.g., H.R. 1234 or S. 567)..."
            className="min-h-[200px] resize-y"
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
              Analyzing Legislation...
            </>
          ) : (
            <>
              <BookOpen className="mr-2 h-4 w-4" />
              Get Factual Explanation
            </>
          )}
        </Button>
      </form>

      {explanation && <ExplanationResult explanation={explanation} />}
    </div>
  )
}
