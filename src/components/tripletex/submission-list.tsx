import { useState } from "react"
import type { Submission } from "@/lib/ainm-api"

function statusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500"
    case "failed":
      return "bg-red-500"
    case "timeout":
      return "bg-yellow-500"
    case "processing":
    case "queued":
      return "bg-blue-500 animate-pulse"
    default:
      return "bg-mamba-green/50"
  }
}

function formatDuration(ms: number) {
  if (ms <= 0) return "-"
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (min === 0) return `${sec}s`
  return `${min}m ${sec}s`
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return `${sec}s ago`
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  return `${Math.floor(hr / 24)}d ago`
}

function SubmissionRow({ sub }: { sub: Submission }) {
  const [expanded, setExpanded] = useState(false)
  const hasFeedback =
    sub.feedback && (sub.feedback.comment || sub.feedback.checks.length > 0)

  return (
    <div className="border-b border-mamba-toxic/5 last:border-b-0">
      <button
        type="button"
        onClick={() => hasFeedback && setExpanded(!expanded)}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
          hasFeedback
            ? "cursor-pointer hover:bg-mamba-toxic/[0.03]"
            : "cursor-default"
        }`}
      >
        {/* Status dot */}
        <span className={`h-2 w-2 shrink-0 rounded-full ${statusColor(sub.status)}`} />

        {/* Score */}
        <span className="w-16 font-mono text-sm tabular-nums text-mamba-toxic">
          {sub.normalized_score != null ? sub.normalized_score.toFixed(2) : "-"}
        </span>

        {/* Raw score */}
        <span className="w-20 font-mono text-xs tabular-nums text-mamba-green/60">
          {sub.score_raw ?? "-"}/{sub.score_max ?? "-"}
        </span>

        {/* Duration */}
        <span className="w-16 font-mono text-xs tabular-nums text-mamba-green/50">
          {formatDuration(sub.duration_ms ?? 0)}
        </span>

        {/* Time ago */}
        <span className="ml-auto font-mono text-xs text-mamba-green/40">
          {timeAgo(sub.queued_at)}
        </span>

        {/* Expand indicator */}
        {hasFeedback && (
          <span className="text-xs text-mamba-green/30">
            {expanded ? "v" : ">"}
          </span>
        )}
      </button>

      {expanded && sub.feedback && (
        <div className="border-t border-mamba-toxic/5 bg-mamba-void/50 px-4 py-3">
          {sub.feedback.comment && (
            <p className="mb-2 font-mono text-xs text-mamba-green/70">
              {sub.feedback.comment}
            </p>
          )}
          {sub.feedback.checks.length > 0 && (
            <div className="flex flex-col gap-1">
              {sub.feedback.checks.map((check, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 font-mono text-xs"
                >
                  <span>{check.passed ? "+" : "x"}</span>
                  <span
                    className={
                      check.passed ? "text-green-400" : "text-red-400"
                    }
                  >
                    {check.name || check.message || "Check"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function SubmissionList({
  submissions,
}: {
  submissions: Submission[]
}) {
  const recent = [...submissions]
    .sort(
      (a, b) =>
        new Date(b.queued_at).getTime() - new Date(a.queued_at).getTime(),
    )
    .slice(0, 15)

  // Today's submission count
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = submissions.filter(
    (s) => s.queued_at.slice(0, 10) === today,
  ).length
  const maxDaily = 150

  return (
    <div className="rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 shadow-[0_0_20px_rgba(57,255,20,0.06)]">
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
          Submissions
        </h3>
        {/* Rate limit gauge */}
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-mamba-void">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                todayCount / maxDaily > 0.8
                  ? "bg-red-500"
                  : todayCount / maxDaily > 0.5
                    ? "bg-yellow-500"
                    : "bg-mamba-toxic/80"
              }`}
              style={{ width: `${Math.min((todayCount / maxDaily) * 100, 100)}%` }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-mamba-green/50">
            {todayCount}/{maxDaily} today
          </span>
        </div>
      </div>

      <div className="divide-y-0">
        {recent.length === 0 ? (
          <p className="px-6 py-8 text-center font-mono text-sm text-mamba-green/40">
            No submissions yet.
          </p>
        ) : (
          recent.map((sub) => <SubmissionRow key={sub.id} sub={sub} />)
        )}
      </div>
    </div>
  )
}
