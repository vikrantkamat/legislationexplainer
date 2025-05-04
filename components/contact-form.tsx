"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, CheckCircle } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    // Simulate processing for a more realistic experience
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      // Create mailto URL
      const mailtoUrl = `mailto:vikkamat3@gmail.com?subject=${encodeURIComponent(
        `[Legislation Explainer] ${data.subject}`,
      )}&body=${encodeURIComponent(`From: ${data.email}\n\n${data.message}`)}`

      // Show success state first
      setShowSuccess(true)

      // Wait a moment to show success state before opening email client
      setTimeout(() => {
        // Open email client
        window.location.href = mailtoUrl

        // Reset form after a delay
        setTimeout(() => {
          form.reset()
          setShowSuccess(false)
        }, 2000)
      }, 1000)
    } catch (error) {
      console.error("Error opening email client:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly at vikkamat3@gmail.com",
        variant: "destructive",
      })
      setShowSuccess(false)
    } finally {
      setTimeout(() => {
        setIsSubmitting(false)
      }, 1000)
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Message Sent!</h3>
        <p className="text-muted-foreground">Your email client will open momentarily to complete the process.</p>
        <p className="text-sm text-muted-foreground">
          If it doesn't open automatically, please check your browser settings.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="What's this about?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message here..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  )
}
