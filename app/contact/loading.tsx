import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-2xl py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <Skeleton className="h-10 w-[250px] mx-auto" />
          <Skeleton className="h-4 w-[350px] mx-auto" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
