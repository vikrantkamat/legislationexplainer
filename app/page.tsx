import { LegislationExplainer } from "@/components/legislation-explainer"
import { BookOpen, Scale, FileText, ArrowRight, Puzzle } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ContactButton } from "@/components/contact-button"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <ScrollAnimation>
          <div className="space-y-4 text-center">
            <div className="inline-block p-2 bg-castleton bg-opacity-10 rounded-full dark:bg-castleton dark:bg-opacity-20">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gradient">enacted.ai</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get clear, concise explanations of any legislation in seconds
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScrollAnimation stagger={1}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm h-full">
              <div className="h-12 w-12 rounded-full bg-castleton bg-opacity-10 flex items-center justify-center mb-4 dark:bg-castleton dark:bg-opacity-20">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Understand Legislation</h3>
              <p className="text-muted-foreground">Decode complex legal language into clear, accessible explanations</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation stagger={2}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm h-full">
              <div className="h-12 w-12 rounded-full bg-castleton bg-opacity-10 flex items-center justify-center mb-4 dark:bg-castleton dark:bg-opacity-20">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Track Recent Bills</h3>
              <p className="text-muted-foreground">
                Stay informed about the latest bills and legislation in the House and Senate.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation stagger={3}>
            <div className="flex flex-col items-center text-center p-4 rounded-lg border bg-card shadow-sm h-full">
              <div className="h-12 w-12 rounded-full bg-castleton bg-opacity-10 flex items-center justify-center mb-4 dark:bg-castleton dark:bg-opacity-20">
                <Puzzle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Play Law Links</h3>
              <p className="text-muted-foreground">
                Test your knowledge by sorting bills into their correct categories in our interactive game
              </p>
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group min-w-[180px] px-6 bg-gradient-to-r from-emerald-800 to-emerald-700 transition-all duration-300 
                hover:shadow-lg hover:shadow-emerald-800/30 hover:scale-105 hover:brightness-110
                active:scale-95 active:shadow-inner active:brightness-90 active:translate-y-0.5"
            >
              <Link href="/recent-bills">
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10 transition-transform group-hover:-translate-y-1 group-active:translate-y-0">
                    Explore recent bills
                  </span>
                </span>
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-all duration-300 
                  group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110
                  group-active:translate-x-0.5 group-active:translate-y-0 group-active:scale-100"
                />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="group min-w-[180px] px-6 bg-gradient-to-r from-emerald-700 to-emerald-600 transition-all duration-300 
                hover:shadow-lg hover:shadow-emerald-700/30 hover:scale-105 hover:brightness-110
                active:scale-95 active:shadow-inner active:brightness-90 active:translate-y-0.5"
            >
              <Link href="/bill-sort">
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10 transition-transform group-hover:-translate-y-1 group-active:translate-y-0">
                    Play Law Links
                  </span>
                </span>
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-all duration-300 
                  group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110
                  group-active:translate-x-0.5 group-active:translate-y-0 group-active:scale-100"
                />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/50">
              <h2 className="text-2xl font-semibold">Explain Any Legislation</h2>
              <p className="text-muted-foreground mt-1">
                If you prefer, search by pasting legislation text or bill numbers below
              </p>
            </div>
            <div className="p-6">
              <LegislationExplainer />
            </div>
          </div>
        </ScrollAnimation>
        <ContactButton />
      </div>
    </main>
  )
}
