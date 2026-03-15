import Countdown from "react-countdown"

const COMPETITION_START = new Date("2026-03-19T16:00:00+01:00")

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 px-5 py-4 shadow-[0_0_20px_rgba(57,255,20,0.06)]">
        <span className="text-glow-green text-glow-pulse block font-sans text-6xl font-black tracking-tight text-mamba-toxic tabular-nums md:text-7xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-mamba-green/60">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="mt-2 self-start text-4xl font-bold text-mamba-toxic/30 md:text-5xl">
      :
    </span>
  )
}

export function CompetitionCountdown() {
  return (
    <Countdown
      date={COMPETITION_START}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <div className="text-glow-green text-center text-4xl font-black text-mamba-toxic md:text-5xl">
              COMPETITION IS LIVE
            </div>
          )
        }
        return (
          <div className="flex items-start gap-3 md:gap-5">
            <TimeUnit value={days} label="Dager" />
            <Separator />
            <TimeUnit value={hours} label="Timer" />
            <Separator />
            <TimeUnit value={minutes} label="Min" />
            <Separator />
            <TimeUnit value={seconds} label="Sek" />
          </div>
        )
      }}
    />
  )
}
