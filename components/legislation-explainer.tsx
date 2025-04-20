import { Suspense } from "react"
import { LegislationForm } from "@/components/legislation-form"

export function LegislationExplainer() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading form...</div>}>
      <LegislationForm />
    </Suspense>
  )
}
