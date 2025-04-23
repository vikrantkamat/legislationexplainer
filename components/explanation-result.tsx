import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface ExplanationResultProps {
  explanation: string
}

export function ExplanationResult({ explanation }: ExplanationResultProps) {
  // Function to process the explanation text and ensure proper paragraph formatting
  const formatExplanation = (text: string) => {
    // Split by newlines and filter out empty paragraphs
    return text.split("\n").filter((para) => para.trim() !== "")
  }

  const paragraphs = formatExplanation(explanation)

  return (
    <Card className="mt-6 border-primary/20 shadow-md overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center text-xl">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Official Bill Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
