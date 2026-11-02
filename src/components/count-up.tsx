"use client"

import { useEffect, useRef, useState } from "react"

export function CountUp({ value, className }: { value: number; className?: string }) {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce || value === 0) {
        setShown(value)
        return
      }
      const duration = 800
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - (1 - t) ** 3
        setShown(Math.round(value * eased))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}
