import type { LeaderboardEntry } from "@/lib/ainm-api"

const OUR_TEAM = "ddf939ef-dc24-4cc4-b632-120f9db479bc"

function isOurTeam(entry: LeaderboardEntry) {
  return (
    entry.team_name === "Mamba Masters" || entry.team_name === OUR_TEAM
  )
}

function TeamRow({
  entry,
  highlight,
}: {
  entry: LeaderboardEntry
  highlight: boolean
}) {
  return (
    <tr
      className={
        highlight
          ? "border-l-2 border-l-mamba-toxic bg-mamba-toxic/[0.06]"
          : "border-l-2 border-l-transparent"
      }
    >
      <td className="px-4 py-2.5 font-mono text-sm tabular-nums text-mamba-green/80">
        {entry.rank}
      </td>
      <td className="px-4 py-2.5 font-mono text-sm text-foreground">
        {entry.team_name}
        {highlight && (
          <span className="ml-2 text-xs text-mamba-toxic">(us)</span>
        )}
      </td>
      <td className="px-4 py-2.5 font-mono text-sm tabular-nums text-mamba-toxic">
        {(entry.total_score ?? 0).toFixed(1)}
      </td>
      <td className="px-4 py-2.5 font-mono text-sm tabular-nums text-mamba-green/80">
        {entry.tasks_touched}
      </td>
      <td className="px-4 py-2.5 font-mono text-sm tabular-nums text-mamba-green/80">
        {entry.total_submissions}
      </td>
    </tr>
  )
}

export function LeaderboardTable({
  leaderboard,
}: {
  leaderboard: LeaderboardEntry[]
}) {
  const top10 = leaderboard.slice(0, 10)
  const ourEntry = leaderboard.find(isOurTeam)
  const ourInTop10 = top10.some(isOurTeam)

  return (
    <div className="overflow-hidden rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 shadow-[0_0_20px_rgba(57,255,20,0.06)]">
      <div className="px-6 py-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-mamba-green/60">
          Leaderboard
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-t border-mamba-toxic/10">
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-mamba-green/40">
                #
              </th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-mamba-green/40">
                Team
              </th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-mamba-green/40">
                Score
              </th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-mamba-green/40">
                Tasks
              </th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-mamba-green/40">
                Subs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mamba-toxic/5">
            {top10.map((entry) => (
              <TeamRow
                key={entry.rank}
                entry={entry}
                highlight={isOurTeam(entry)}
              />
            ))}
            {!ourInTop10 && ourEntry && (
              <>
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-1 text-center font-mono text-xs text-mamba-green/30"
                  >
                    ...
                  </td>
                </tr>
                <TeamRow entry={ourEntry} highlight />
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
