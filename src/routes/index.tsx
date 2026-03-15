import { createFileRoute } from "@tanstack/react-router"
import { CompetitionCountdown } from "@/components/countdown"

export const Route = createFileRoute("/")({ component: HomePage })

function HomePage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      {/* Ambient gradient orbs */}
      <div className="ambient-orb -top-40 -left-40 h-[500px] w-[500px] bg-mamba-toxic/[0.04]" />
      <div className="ambient-orb -right-20 top-1/3 h-[400px] w-[400px] bg-mamba-dark-green/[0.08]" />
      <div className="ambient-orb -bottom-32 left-1/3 h-[350px] w-[350px] bg-mamba-toxic/[0.03]" />

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col items-center gap-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-mamba-toxic/20 bg-mamba-surface/60 px-4 py-1.5 text-sm backdrop-blur-sm">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-mamba-toxic" />
          <span className="text-mamba-green">NM i AI 2026 — ainm.no</span>
        </div>

        {/* Team name */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-glow-green text-center text-6xl font-black uppercase tracking-tight text-mamba-toxic md:text-8xl lg:text-9xl">
            Mamba
            <br />
            Masters
          </h1>
          <div className="flex max-w-lg flex-col items-center gap-4">
            <p className="text-center text-sm tracking-wide text-neutral-500 uppercase">
              Norgesmesterskapet i kunstig intelligens
            </p>
            <p className="text-center text-lg font-medium leading-relaxed text-neutral-300 md:text-xl">
              Raskere enn en{" "}
              <span className="font-semibold text-mamba-green">
                Black Mamba
              </span>
              .
              <br />
              Smartere enn en{" "}
              <span className="font-semibold text-mamba-green">
                Transformer
              </span>
              .
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Konkurransen starter om
          </p>
          <CompetitionCountdown />
        </div>

      </div>
    </div>
  )
}
