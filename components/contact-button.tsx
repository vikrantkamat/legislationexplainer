"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function ContactButton() {
  const router = useRouter()

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105"
        onClick={() => router.push("/contact")}
        aria-label="Contact Us"
        title="Contact Us"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    </div>
  )
}
