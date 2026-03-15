import Countdown from "react-countdown"
import NumberFlow from "@number-flow/react"

const COMPETITION_START = new Date("2026-03-19T16:00:00+01:00")

function NumberBox({ value }: { value: number }) {
  return (
    <div className="relative rounded-lg border border-mamba-toxic/10 bg-mamba-surface/80 px-3 py-2.5 shadow-[0_0_20px_rgba(57,255,20,0.06)] sm:rounded-xl sm:px-5 sm:py-4">
      <NumberFlow
        value={value}
        format={{ minimumIntegerDigits: 2 }}
        className="text-glow-green text-glow-pulse block font-sans text-4xl font-black tracking-tight text-mamba-toxic tabular-nums sm:text-6xl md:text-7xl"
      />
    </div>
  )
}

function Separator() {
  return (
    <span className="text-3xl font-black text-mamba-toxic/25 sm:text-5xl md:text-6xl">
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
            <div className="text-glow-green text-center text-3xl font-black text-mamba-toxic sm:text-4xl md:text-5xl">
              COMPETITION IS LIVE
            </div>
          )
        }

        const labels = ["Dager", "Timer", "Min", "Sek"]
        const values = [days, hours, minutes, seconds]

        return (
          <div className="flex flex-col items-center gap-2">
            {/* Numbers row */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
              {values.map((v, i) => (
                <div
                  key={labels[i]}
                  className="flex items-center gap-2 sm:gap-3 md:gap-5"
                >
                  <NumberBox value={v} />
                  {i < 3 && <Separator />}
                </div>
              ))}
            </div>
            {/* Labels row */}
            <div className="flex w-full">
              {labels.map((label) => (
                <div
                  key={label}
                  className="flex-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-mamba-green/60 sm:text-xs sm:tracking-[0.25em]"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}
