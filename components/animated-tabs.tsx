"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const AnimatedTabs = TabsPrimitive.Root

const AnimatedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState<string | undefined>(undefined)
  const [hoveredTab, setHoveredTab] = React.useState<string | undefined>(undefined)
  const [indicatorStyle, setIndicatorStyle] = React.useState({})
  const tabsRef = React.useRef<HTMLDivElement>(null)

  // Track active tab for animation
  React.useEffect(() => {
    const value =
      props.children && Array.isArray(props.children)
        ? props.children.find((child: any) => child?.props?.value === props["data-state-value"])?.props?.value
        : undefined

    if (value) {
      setActiveTab(value)
    }
  }, [props["data-state-value"], props.children])

  // Update indicator position when active tab or hovered tab changes
  React.useEffect(() => {
    if (!tabsRef.current) return

    const tabToUse = hoveredTab || activeTab
    if (!tabToUse) return

    const tabElement = tabsRef.current.querySelector(`[data-value="${tabToUse}"]`) as HTMLElement
    if (!tabElement) return

    const tabRect = tabElement.getBoundingClientRect()
    const listRect = tabsRef.current.getBoundingClientRect()

    setIndicatorStyle({
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - listRect.left}px)`,
      transition: hoveredTab ? "all 0.2s ease" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    })
  }, [activeTab, hoveredTab])

  return (
    <TabsPrimitive.List
      ref={(el) => {
        if (typeof ref === "function") ref(el)
        else if (ref) ref.current = el
        tabsRef.current = el
      }}
      className={cn(
        "relative inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      onMouseLeave={() => setHoveredTab(undefined)}
      data-state-value={props["data-state-value"]}
      {...props}
    >
      {props.children}
      <div
        className="absolute h-8 rounded-sm bg-background shadow-sm transition-all duration-300 z-0"
        style={indicatorStyle}
      />
    </TabsPrimitive.List>
  )
})
AnimatedTabsList.displayName = "AnimatedTabsList"

const AnimatedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    value={value}
    data-value={value}
    onMouseEnter={(e) => {
      const target = e.currentTarget as HTMLElement
      const value = target.getAttribute("data-value")
      if (value) {
        target.closest('[role="tablist"]')?.setAttribute("data-state-value", value)
      }
    }}
    {...props}
  />
))
AnimatedTabsTrigger.displayName = "AnimatedTabsTrigger"

const AnimatedTabsContent = React.forwardRef<
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
AnimatedTabsContent.displayName = "AnimatedTabsContent"

export { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent }
