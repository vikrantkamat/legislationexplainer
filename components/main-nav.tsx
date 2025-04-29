"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Info, BarChart3 } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/recent-bills", label: "Recent Bills", icon: FileText },
    { href: "/bill-portfolio", label: "Bill Portfolio", icon: BarChart3 },
    { href: "/about", label: "About Us", icon: Info },
  ]

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors text-white hover:text-white/80",
              pathname === item.href ? "font-bold" : "",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
