import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface ExplanationResultProps {
  explanation: string
}

export function ExplanationResult({ explanation }: ExplanationResultProps) {
  return (
    <Card className="mt-6 border-primary/20 shadow-md overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center text-xl">
          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose max-w-none">
          {explanation.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
