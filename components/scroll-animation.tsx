"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  stagger?: 1 | 2 | 3
}

export function ScrollAnimation({ children, className = "", threshold = 0.1, stagger }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const staggerClass = stagger ? `stagger-${stagger}` : ""

  return (
    <div ref={ref} className={`animate-on-scroll ${staggerClass} ${className}`}>
      {children}
    </div>
  )
}
