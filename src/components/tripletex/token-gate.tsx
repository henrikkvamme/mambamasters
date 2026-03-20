import { useState } from "react"
import { storeToken } from "@/lib/ainm-api"

export function TokenGate({ onConnect }: { onConnect: () => void }) {
  const [value, setValue] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    storeToken(trimmed)
    onConnect()
  }

  return (
    <div className="relative z-[2] flex min-h-svh items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-mamba-toxic/10 bg-mamba-surface/80 p-8 shadow-[0_0_20px_rgba(57,255,20,0.06)]"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-lg font-bold text-mamba-toxic">
            AINM Dashboard
          </h2>
          <p className="font-mono text-xs text-mamba-green/60">
            Paste your AINM API token to connect.
          </p>
        </div>

        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Bearer token..."
          className="rounded-lg border border-mamba-toxic/20 bg-mamba-void px-4 py-3 font-mono text-sm text-mamba-toxic placeholder:text-mamba-green/30 focus:border-mamba-toxic/50 focus:outline-none focus:ring-1 focus:ring-mamba-toxic/30"
          autoFocus
        />

        <button
          type="submit"
          disabled={!value.trim()}
          className="rounded-lg bg-mamba-toxic px-4 py-2.5 font-mono text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Connect
        </button>
      </form>
    </div>
  )
}
