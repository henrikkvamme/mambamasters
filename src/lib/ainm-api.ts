const API_BASE = "/api/ainm"
const TOKEN_KEY = "ainm-token"

export type LeaderboardEntry = {
  rank: number
  team_name: string
  total_score: number
  tasks_touched: number
  total_submissions: number
  tier1_score: number
  tier2_score: number
  tier3_score: number
}

export type SubmissionCheck = {
  name?: string
  passed?: boolean
  message?: string
}

export type SubmissionFeedback = {
  comment: string
  checks: SubmissionCheck[]
}

export type Submission = {
  id: string
  status: string
  queued_at: string
  completed_at: string | null
  score_raw: number
  score_max: number
  normalized_score: number
  duration_ms: number
  feedback: SubmissionFeedback | null
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function storeToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function apiFetch<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 401) {
    clearToken()
    throw new Error("Unauthorized — token cleared")
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export function fetchLeaderboard(token: string) {
  return apiFetch<LeaderboardEntry[]>("/tripletex/leaderboard", token)
}

export function fetchMySubmissions(token: string) {
  return apiFetch<Submission[]>("/tripletex/my/submissions", token)
}
