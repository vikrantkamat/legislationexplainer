import { LegislationExplainer } from "@/components/legislation-explainer"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Legislation Explainer</h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Get clear, concise explanations of any legislation in seconds
          </p>
        </div>
        <LegislationExplainer />
      </div>
    </main>
  )
}
