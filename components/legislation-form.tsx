"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, FileText, BookOpen } from "lucide-react"
import { ExplanationResult } from "@/components/explanation-result"
import { billTexts } from "@/lib/bill-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LegislationForm() {
  const [legislation, setLegislation] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const explanationRef = useRef<HTMLDivElement>(null)

  // Handle bill parameter from URL
  useEffect(() => {
    const billId = searchParams.get("bill")
    const billTitle = searchParams.get("title")
    const autoExplain = searchParams.get("autoExplain") !== "false" // Default to true unless explicitly set to false

    if (billId) {
      if (billTexts[billId]) {
        // If bill exists in our database, use the full text
        setLegislation(billTexts[billId])

        // Auto-trigger explanation if not disabled
        if (autoExplain && !explanation) {
          // Use setTimeout to ensure the legislation state is updated before submission
          const timer = setTimeout(() => {
            handleExplanationRequest(billTexts[billId])
          }, 100)
          return () => clearTimeout(timer)
        }
      } else if (billTitle) {
        // If bill doesn't exist but we have the title, use the title for explanation
        const billNumber = billId.toUpperCase().startsWith("HR")
          ? billId.toUpperCase()
          : billId.toUpperCase().startsWith("S")
            ? billId.toUpperCase()
            : `Bill ${billId.toUpperCase()}`

        const titleRequest = `${billTitle} (${billNumber}): Please explain this legislation based on the official text from Congress.gov.`
        setLegislation(titleRequest)

        // Auto-trigger explanation if not disabled
        if (autoExplain && !explanation) {
          // Use setTimeout to ensure the legislation state is updated before submission
          const timer = setTimeout(() => {
            handleExplanationRequest(titleRequest)
          }, 100)
          return () => clearTimeout(timer)
        }
      } else {
        // Fallback if we don't have title or text
        const fallbackRequest = `Bill ${billId.toUpperCase()}: Please explain this legislation based on the official text from Congress.gov.`
        setLegislation(fallbackRequest)

        // Auto-trigger explanation if not disabled
        if (autoExplain && !explanation) {
          // Use setTimeout to ensure the legislation state is updated before submission
          const timer = setTimeout(() => {
            handleExplanationRequest(fallbackRequest)
          }, 100)
          return () => clearTimeout(timer)
        }
      }
    }
  }, [searchParams, explanation])

  // Scroll to explanation when it's generated
  useEffect(() => {
    if ((explanation || isLoading) && explanationRef.current) {
      // Small delay to ensure the DOM is fully updated
      setTimeout(() => {
        // Scroll the explanation header to the top of the viewport
        explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

        // Update URL with the explanation hash without triggering a navigation
        const url = new URL(window.location.href)
        url.hash = "explanation"
        window.history.replaceState({}, "", url.toString())
      }, 100)
    }
  }, [explanation, isLoading])

  const handleExplanationRequest = async (text: string) => {
    if (!text.trim()) {
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
        body: JSON.stringify({ legislation: text }),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleExplanationRequest(legislation)
  }

  // Loading skeleton for the explanation area
  const LoadingSkeleton = () => (
    <Card className="mt-6 border-primary/20 shadow-md overflow-hidden animate-pulse">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center text-xl">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <div className="flex items-center">
            <span>Generating Explanation</span>
            <span className="ml-2 inline-flex">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </CardContent>
    </Card>
  )

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

      <div id="explanation" ref={explanationRef} className="scroll-mt-16">
        {isLoading ? <LoadingSkeleton /> : explanation ? <ExplanationResult explanation={explanation} /> : null}
      </div>
    </div>
  )
}
