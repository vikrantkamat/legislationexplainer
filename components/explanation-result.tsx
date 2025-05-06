import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExplanationResultProps {
  explanation: string
}

export function ExplanationResult({ explanation }: ExplanationResultProps) {
  // Extract bill name from the explanation text
  const extractBillName = (text: string) => {
    // Look for patterns like "H.R.6940 - Israel Anti-Boycott Act" in the text
    const billNameRegex = /([A-Z]\.[A-Z]\.\s*\d+\s*-\s*[^,.:;]+)/i
    const match = text.match(billNameRegex)

    if (match && match[1]) {
      // Remove "Short Title:" prefix if present
      return match[1].trim().replace(/^Short Title:\s*/i, "")
    }

    // Fallback: try to find just the bill title if the full pattern isn't found
    const titleRegex = /(?:Act|Bill|Resolution)\s+(?:of|for)\s+\d{4}/i
    const titleMatch = text.match(titleRegex)

    // Remove "Short Title:" prefix if present
    return titleMatch ? titleMatch[0].replace(/^Short Title:\s*/i, "") : "Bill Explanation"
  }

  // Function to process the explanation text and ensure proper paragraph formatting
  const formatExplanation = (text: string) => {
    // Remove the "Based on the official text..." prefix if present
    let cleanedText = text.replace(/^Based on the official text from Congress\.gov,\s*/i, "")

    // Also remove any pattern like "H.R.6940 - Israel Anti-Boycott Act establishes the following key provisions:"
    cleanedText = cleanedText.replace(
      /^[A-Z]\.[A-Z]\.\s*\d+\s*-\s*[^,.:;]+ establishes the following key provisions:\s*/i,
      "",
    )

    // Split by newlines and filter out empty paragraphs
    const paragraphs = cleanedText.split("\n").filter((para) => para.trim() !== "")

    // Process paragraphs to identify titles, bullet points, and indentation
    const formattedParagraphs = []
    let currentTitle = ""

    for (const paragraph of paragraphs) {
      const trimmed = paragraph.trim()

      // Skip lines that start with "Short Title:"
      if (trimmed.startsWith("Short Title:")) {
        continue
      }

      // Check if this is a title (ends with a colon or all caps)
      if (trimmed.endsWith(":") || /^[A-Z\s]+$/.test(trimmed)) {
        currentTitle = trimmed
        formattedParagraphs.push({ type: "title", content: trimmed })
      }
      // Check if this is a numbered list item (starts with a number followed by a period or parenthesis)
      else if (/^\d+[.)]/.test(trimmed)) {
        // Extract the content after the number and separator
        const content = trimmed.replace(/^\d+[.)]\s*/, "")
        formattedParagraphs.push({
          type: "bullet",
          content: content,
          level: paragraph.startsWith("  ") ? 2 : 1,
        })
      }
      // Check if this is a bullet point
      else if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
        formattedParagraphs.push({
          type: "bullet",
          content: trimmed.substring(1).trim(),
          level: paragraph.startsWith("  ") ? 2 : 1,
        })
      }
      // Check if this might be a sub-bullet (starts with indentation)
      else if (paragraph.startsWith("  ") || paragraph.startsWith("\t")) {
        formattedParagraphs.push({ type: "sub", content: trimmed })
      }
      // Regular paragraph
      else {
        formattedParagraphs.push({ type: "paragraph", content: trimmed })
      }
    }

    return formattedParagraphs
  }

  const billName = extractBillName(explanation)
  const formattedParagraphs = formatExplanation(explanation)

  return (
    <Card className="mt-6 border-primary/20 shadow-md overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-xl font-bold text-primary">{billName}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          {formattedParagraphs.map((paragraph, index) => {
            if (paragraph.type === "title") {
              return (
                <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-primary">
                  {paragraph.content}
                </h3>
              )
            } else if (paragraph.type === "bullet") {
              return (
                <div key={index} className={`flex mb-2 ${paragraph.level > 1 ? "ml-6" : "ml-2"}`}>
                  <span className="mr-2">•</span>
                  <p className="m-0">{paragraph.content}</p>
                </div>
              )
            } else if (paragraph.type === "sub") {
              return (
                <p key={index} className="mb-2 ml-8 text-sm text-gray-700 dark:text-gray-300">
                  {paragraph.content}
                </p>
              )
            } else {
              return (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph.content}
                </p>
              )
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}
