import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Legislation Explainer",
  description: "Get in touch with us about the Legislation Explainer tool.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h1>
          <p className="text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <ContactForm />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Your message will be sent directly to our team.
            <br />
            We'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  )
}
