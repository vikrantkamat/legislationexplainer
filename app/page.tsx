import { LegislationExplainer } from "@/components/legislation-explainer"
import { BookOpen, Scale, FileText, Lightbulb } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <ScrollAnimation>
          <div className="space-y-4 text-center">
            <div className="inline-block p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gradient">Enacted.ai</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get clear, concise explanations of any legislation in seconds
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScrollAnimation stagger={1}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900/30">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Understand Legislation</h3>
              <p className="text-muted-foreground">Decode complex legal language into clear, accessible explanations</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation stagger={2}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900/30">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Track Recent Bills</h3>
              <p className="text-muted-foreground">Stay informed about the latest legislation in Congress</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation stagger={3}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900/30">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">Leverage advanced AI to break down complex legal concepts</p>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation>
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/50">
              <h2 className="text-2xl font-semibold">Explain Any Legislation</h2>
              <p className="text-muted-foreground mt-1">
                Paste legislation text or select a recent bill to get started
              </p>
            </div>
            <div className="p-6">
              <LegislationExplainer />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </main>
  )
}
