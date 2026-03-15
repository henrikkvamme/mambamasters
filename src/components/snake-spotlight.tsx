import { useEffect, useRef } from "react"

export function SnakeSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId: number
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`)
        el.style.setProperty("--my", `${e.clientY}px`)
      })
    }

    window.addEventListener("pointermove", handler)
    return () => {
      window.removeEventListener("pointermove", handler)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[1]">
      {/* Brighter scales revealed by spotlight mask */}
      <div
        className="spotlight-scales absolute inset-0"
        style={{
          mask: `radial-gradient(
            500px circle at var(--mx, -999px) var(--my, -999px),
            black 0%, transparent 60%
          )`,
          WebkitMask: `radial-gradient(
            500px circle at var(--mx, -999px) var(--my, -999px),
            black 0%, transparent 60%
          )`,
        }}
      />
      {/* Soft green glow at cursor */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            350px circle at var(--mx, -999px) var(--my, -999px),
            rgba(57, 255, 20, 0.04),
            transparent 50%
          )`,
        }}
      />
    </div>
  )
}
