import Link from "next/link"
import { BookOpen } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-emerald-700 to-emerald-600 dark:from-emerald-600 dark:to-emerald-500 backdrop-blur supports-[backdrop-filter]:bg-opacity-80">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-white" />
            <span className="inline-block font-bold text-xl text-white">enacted.ai</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
