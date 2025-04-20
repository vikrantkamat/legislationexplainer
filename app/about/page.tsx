import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Us</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Making legislation accessible to everyone
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Legislation Explainer was created with a simple mission: to make complex legal language accessible to
              everyone. We believe that understanding the laws that govern our society shouldn't require a law degree.
            </p>
            <p>
              Our AI-powered platform translates dense legislative text into clear, concise explanations that anyone can
              understand. Whether you're a student, journalist, business owner, or concerned citizen, we're here to help
              you make sense of the laws that impact your life.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our platform uses advanced artificial intelligence to analyze and interpret legislative text. Here's how
              the process works:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>You paste the text of any legislation you want to understand</li>
              <li>Our AI system processes the text, identifying key provisions, legal terminology, and implications</li>
              <li>
                The system generates a plain-language explanation that breaks down the legislation into understandable
                components
              </li>
              <li>You receive a clear explanation that highlights what the legislation means in practical terms</li>
            </ol>
            <p>
              The entire process takes just seconds, providing you with instant clarity on even the most complex legal
              documents.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
