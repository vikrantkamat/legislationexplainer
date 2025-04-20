import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExplanationResultProps {
  explanation: string
}

export function ExplanationResult({ explanation }: ExplanationResultProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Explanation</CardTitle>
      </CardHeader>
      <CardContent>
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
