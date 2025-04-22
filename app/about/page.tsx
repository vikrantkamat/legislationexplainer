import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Scale, Lightbulb, CheckCircle } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <ScrollAnimation>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gradient">About Us</h1>
            <p className="text-xl text-muted-foreground">Making legislation accessible to everyone</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p>
                Enacted.ai was created with a simple mission: to make complex legal language accessible to everyone. We
                believe that understanding the laws that govern our society shouldn't require a law degree.
              </p>
              <p>
                Our AI-powered platform translates dense legislative text into clear, concise explanations that anyone
                can understand. Whether you're a student, journalist, business owner, or concerned citizen, we're here
                to help you make sense of the laws that impact your life.
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation>
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Our platform uses advanced artificial intelligence to analyze and interpret legislative text. Here's how
                the process works:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <div>
                    <p>You paste the text of any legislation you want to understand</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <div>
                    <p>
                      Our AI system processes the text, identifying key provisions, legal terminology, and implications
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <div>
                    <p>
                      The system generates a plain-language explanation that breaks down the legislation into
                      understandable components
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium">4</span>
                  </div>
                  <div>
                    <p>You receive a clear explanation that highlights what the legislation means in practical terms</p>
                  </div>
                </div>
              </div>
              <p className="mt-4">
                The entire process takes just seconds, providing you with instant clarity on even the most complex legal
                documents.
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation>
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-primary" />
                Our Commitment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p>
                We are committed to providing accurate, non-partisan explanations of legislation. Our AI models are
                designed to:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <p>Present factual information without political bias</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <p>Highlight the practical implications for citizens and businesses</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <p>Break down complex legal jargon into plain language</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <p>Provide context for better understanding of legislative intent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </main>
  )
}
