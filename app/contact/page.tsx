import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | enacted.ai",
  description: "Get in touch with the enacted.ai team",
}

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h1>
          <p className="text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
