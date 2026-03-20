import { createFileRoute, Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useState, useCallback } from "react"
import {
  getStoredToken,
  fetchLeaderboard,
  fetchMySubmissions,
} from "@/lib/ainm-api"
import { TokenGate } from "@/components/tripletex/token-gate"
import { ScoreOverview } from "@/components/tripletex/score-overview"
import { LeaderboardTable } from "@/components/tripletex/leaderboard-table"
import { SubmissionList } from "@/components/tripletex/submission-list"

export const Route = createFileRoute("/tripletex")({ component: TripletexPage })

function TripletexPage() {
  const [token, setToken] = useState(getStoredToken)

  const handleConnect = useCallback(() => {
    setToken(getStoredToken())
  }, [])

  if (!token) {
    return <TokenGate onConnect={handleConnect} />
  }

  return <Dashboard token={token} onDisconnect={() => setToken(null)} />
}

function Dashboard({
  token,
  onDisconnect,
}: {
  token: string
  onDisconnect: () => void
}) {
  const leaderboard = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(token),
    refetchInterval: 30_000,
  })

  const submissions = useQuery({
    queryKey: ["submissions"],
    queryFn: () => fetchMySubmissions(token),
    refetchInterval: 30_000,
  })

  // On 401, token gets cleared — detect and show gate again
  if (
    leaderboard.error?.message?.includes("Unauthorized") ||
    submissions.error?.message?.includes("Unauthorized")
  ) {
    onDisconnect()
    return null
  }

  const lastUpdated = leaderboard.dataUpdatedAt || submissions.dataUpdatedAt
  const secondsAgo = lastUpdated
    ? Math.floor((Date.now() - lastUpdated) / 1000)
    : null

  return (
    <div className="relative min-h-svh px-4 py-8 sm:px-6 lg:px-8">
      {/* Ambient orbs */}
      <div className="ambient-orb -top-40 -left-40 h-[500px] w-[500px] bg-mamba-toxic/[0.04]" />
      <div className="ambient-orb -right-20 top-1/3 h-[400px] w-[400px] bg-mamba-dark-green/[0.06]" />

      <div className="relative z-[2] mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-mono text-xs text-mamba-green/50 transition-colors hover:text-mamba-toxic"
            >
              &larr; Home
            </Link>
            <h1 className="font-mono text-lg font-bold text-mamba-toxic">
              Tripletex Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Refresh indicator */}
            <button
              type="button"
              onClick={() => {
                leaderboard.refetch()
                submissions.refetch()
              }}
              className="font-mono text-xs text-mamba-green/40 transition-colors hover:text-mamba-toxic"
            >
              {secondsAgo !== null
                ? `Updated ${secondsAgo}s ago`
                : "Loading..."}
              {" "}
              ↻
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("ainm-token")
                onDisconnect()
              }}
              className="font-mono text-xs text-red-400/60 transition-colors hover:text-red-400"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Loading state */}
        {leaderboard.isLoading && submissions.isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-mamba-toxic/30 border-t-mamba-toxic" />
          </div>
        )}

        {/* Error state */}
        {(leaderboard.error || submissions.error) &&
          !leaderboard.isLoading && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="font-mono text-sm text-red-400">
                {leaderboard.error?.message || submissions.error?.message}
              </p>
            </div>
          )}

        {/* Dashboard grid */}
        <div className="flex flex-col gap-6">
          {leaderboard.data && (
            <ScoreOverview leaderboard={leaderboard.data} submissions={submissions.data} />
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {leaderboard.data && (
              <LeaderboardTable leaderboard={leaderboard.data} />
            )}
            {submissions.data && (
              <SubmissionList submissions={submissions.data} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
