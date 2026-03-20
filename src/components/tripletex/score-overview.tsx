import NumberFlow from "@number-flow/react"
import type { LeaderboardEntry, Submission } from "@/lib/ainm-api"

const OUR_TEAM = "ddf939ef-dc24-4cc4-b632-120f9db479bc"

export function ScoreOverview({
  leaderboard,
  submissions,
}: {
  leaderboard: LeaderboardEntry[]
  submissions?: Submission[]
}) {
  const us = leaderboard.find(
    (e) => e.team_name === "Mamba Masters" || e.team_name === OUR_TEAM,
  )

  if (!us) {
    return (
      <div className="rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 p-6 shadow-[0_0_20px_rgba(57,255,20,0.06)]">
        <p className="font-mono text-sm text-mamba-green/60">
          Team not found on leaderboard.
        </p>
      </div>
    )
  }

  const today = new Date().toISOString().slice(0, 10)
  const todayCount = submissions?.filter(
    (s) => s.queued_at.slice(0, 10) === today,
  ).length ?? 0
  const maxDaily = 150
  const ratePct = todayCount / maxDaily

  const tiers = [
    { label: "Tier 1", score: us.tier1_score },
    { label: "Tier 2", score: us.tier2_score },
    { label: "Tier 3", score: us.tier3_score },
  ]

  return (
    <div className="rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 p-6 shadow-[0_0_20px_rgba(57,255,20,0.06)]">
      <div className="flex flex-wrap items-start gap-8">
        {/* Rank */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
            Rank
          </span>
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-mamba-toxic/30 bg-mamba-void shadow-[0_0_30px_rgba(57,255,20,0.12)]">
            <NumberFlow
              value={us.rank}
              className="text-glow-green font-mono text-4xl font-black tabular-nums text-mamba-toxic"
            />
          </div>
        </div>

        {/* Total score */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
            Total Score
          </span>
          <NumberFlow
            value={us.total_score}
            format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
            className="font-mono text-4xl font-bold tabular-nums text-mamba-toxic"
          />
        </div>

        {/* Tier pills */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
            Tiers
          </span>
          <div className="flex gap-2">
            {tiers.map((t) => (
              <span
                key={t.label}
                className="rounded-full border border-mamba-toxic/20 bg-mamba-void px-3 py-1.5 font-mono text-sm tabular-nums text-mamba-green"
              >
                {t.label}:{" "}
                <span className="text-mamba-toxic">
                  {(t.score ?? 0).toFixed(1)}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Tasks progress */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
            Tasks
          </span>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-32 overflow-hidden rounded-full bg-mamba-void">
              <div
                className="h-full rounded-full bg-mamba-toxic/80 transition-all duration-500"
                style={{ width: `${(us.tasks_touched / 30) * 100}%` }}
              />
            </div>
            <span className="font-mono text-sm tabular-nums text-mamba-green">
              <span className="text-mamba-toxic">{us.tasks_touched}</span>/30
            </span>
          </div>
        </div>

        {/* Rate limit */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
            Rate Limit
          </span>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-32 overflow-hidden rounded-full bg-mamba-void">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  ratePct > 0.8
                    ? "bg-red-500"
                    : ratePct > 0.5
                      ? "bg-yellow-500"
                      : "bg-mamba-toxic/80"
                }`}
                style={{ width: `${Math.min(ratePct * 100, 100)}%` }}
              />
            </div>
            <span className="font-mono text-sm tabular-nums text-mamba-green">
              <span className="text-mamba-toxic">{todayCount}</span>/{maxDaily}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
