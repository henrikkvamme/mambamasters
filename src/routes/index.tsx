import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { CompetitionCountdown } from "@/components/countdown"

export const Route = createFileRoute("/")({ component: HomePage })

type Segment = { text: string; highlight?: boolean }

const lines: Segment[][] = [
  [
    { text: "Raskere enn en " },
    { text: "Black Mamba", highlight: true },
    { text: "." },
  ],
  [
    { text: "Smartere enn en " },
    { text: "Transformer", highlight: true },
    { text: "." },
  ],
]

const CHAR_DELAY = 45
const LINE_PAUSE = 400

function Tagline() {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const lineLength = lines[lineIdx].reduce((s, seg) => s + seg.text.length, 0)

    if (charIdx < lineLength) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), CHAR_DELAY)
      return () => clearTimeout(timer)
    }

    if (lineIdx < lines.length - 1) {
      const timer = setTimeout(() => {
        setLineIdx((l) => l + 1)
        setCharIdx(0)
      }, LINE_PAUSE)
      return () => clearTimeout(timer)
    }

    setDone(true)
  }, [lineIdx, charIdx])

  function renderLine(segments: Segment[], maxChars: number) {
    let remaining = maxChars
    return segments.map((seg, i) => {
      if (remaining <= 0) return null
      const visible = seg.text.slice(0, remaining)
      remaining -= visible.length
      return (
        <span
          key={i}
          className={
            seg.highlight ? "font-semibold text-mamba-toxic/80" : undefined
          }
        >
          {visible}
        </span>
      )
    })
  }

  return (
    <p className="max-w-md text-center font-mono text-base leading-relaxed text-neutral-500 md:text-lg" style={{ minHeight: `${lines.length * 1.75}em` }}>
      {lines.slice(0, lineIdx + 1).map((segs, i) => {
        const isCurrentLine = i === lineIdx
        const chars = isCurrentLine
          ? charIdx
          : segs.reduce((s, seg) => s + seg.text.length, 0)
        return (
          <span key={i}>
            {i > 0 && <br />}
            {renderLine(segs, chars)}
          </span>
        )
      })}
      {!done && (
        <span className="animate-pulse text-mamba-toxic/60">|</span>
      )}
    </p>
  )
}

function HomePage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Ambient gradient orbs */}
      <div className="ambient-orb -top-40 -left-40 h-[500px] w-[500px] bg-mamba-toxic/[0.04]" />
      <div className="ambient-orb -right-20 top-1/3 h-[400px] w-[400px] bg-mamba-dark-green/[0.08]" />
      <div className="ambient-orb -bottom-32 left-1/3 h-[350px] w-[350px] bg-mamba-toxic/[0.03]" />

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col items-center gap-6 sm:gap-10">
        {/* Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-mamba-toxic/20 bg-mamba-surface/60 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-mamba-toxic" />
            <span className="font-mono text-mamba-green">NM i AI 2026 — ainm.no</span>
          </div>
          <Link
            to="/tripletex"
            className="inline-flex items-center gap-1.5 rounded-full border border-mamba-toxic/20 bg-mamba-surface/60 px-3 py-1.5 font-mono text-xs text-mamba-green/70 backdrop-blur-sm transition-colors hover:border-mamba-toxic/40 hover:text-mamba-toxic"
          >
            Dashboard &rarr;
          </Link>
        </div>

        {/* Team name */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-glow-green text-center text-7xl font-black uppercase tracking-tight text-mamba-toxic sm:text-8xl md:text-8xl lg:text-9xl">
            Mamba
            <br />
            Masters
          </h1>
          <Tagline />
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-mamba-toxic/20" />
            <p className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-mamba-green/50">
              Konkurransen slutter om
            </p>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-mamba-toxic/20" />
          </div>
          <CompetitionCountdown />
        </div>

      </div>
    </div>
  )
}
