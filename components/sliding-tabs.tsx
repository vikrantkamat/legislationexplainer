"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const SlidingTabs = TabsPrimitive.Root

const SlidingTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground relative",
      className,
    )}
    {...props}
  />
))
SlidingTabsList.displayName = TabsPrimitive.List.displayName

const SlidingTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { icon?: React.ReactNode }
>(({ className, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-10",
      className,
    )}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
))
SlidingTabsTrigger.displayName = "SlidingTabsTrigger"

const SlidingTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
))
SlidingTabsContent.displayName = TabsPrimitive.Content.displayName

const SlidingTabsIndicator = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const [style, setStyle] = React.useState({
    width: 0,
    transform: "translateX(0px)",
  })

  React.useEffect(() => {
    const updateIndicator = () => {
      if (!containerRef.current) return

      const activeTab = containerRef.current.querySelector('[data-state="active"]') as HTMLElement
      if (!activeTab) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const activeTabRect = activeTab.getBoundingClientRect()

      setStyle({
        width: activeTabRect.width,
        transform: `translateX(${activeTabRect.left - containerRect.left}px)`,
      })
    }

    // Update on initial render
    updateIndicator()

    // Update on window resize
    window.addEventListener("resize", updateIndicator)

    // Create a mutation observer to watch for changes in the active tab
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          updateIndicator()
        }
      })
    })

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-state"],
      })
    }

    return () => {
      window.removeEventListener("resize", updateIndicator)
      observer.disconnect()
    }
  }, [containerRef])

  return (
    <div
      className="absolute h-8 bg-background rounded-sm shadow-sm transition-all duration-300 ease-in-out"
      style={{
        ...style,
        bottom: "4px",
      }}
    />
  )
}

export { SlidingTabs, SlidingTabsList, SlidingTabsTrigger, SlidingTabsContent, SlidingTabsIndicator }
