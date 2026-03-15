# Mamba Masters

Team website for **Mamba Masters** competing in the Norwegian Championship in AI ([ainm.no](https://ainm.no)) 2026.

Live at [mambamasters.no](https://mambamasters.no)

## Stack

- **TanStack Start** (SPA mode) + React 19
- **Tailwind CSS v4** + shadcn/ui (Radix Nova)
- **OXC** (oxlint + oxfmt) for linting/formatting
- **Vite 7** + Nitro for build/deploy
- **Bun** as runtime and package manager

## Development

```bash
bun install
bun run dev        # http://localhost:3000
```

## Scripts

| Command              | Description            |
| -------------------- | ---------------------- |
| `bun run dev`        | Start dev server       |
| `bun run build`      | Production build       |
| `bun run preview`    | Preview production     |
| `bun run lint`       | Lint with oxlint       |
| `bun run format`     | Format with oxfmt      |
| `bun run format:check` | Check formatting     |
| `bun run typecheck`  | TypeScript check       |

## Adding shadcn components

```bash
bunx shadcn@latest add <component>
```

## Backlog

- [ ] Team members section (photos, names, roles)
- [ ] About / what is AINM explainer
- [ ] Blog/updates feed
- [ ] Contact or join form
- [ ] Social links (GitHub, LinkedIn, Discord)
- [ ] Open Graph meta tags for social sharing
- [ ] Page transitions / scroll animations
- [ ] Easter egg (konami code, hidden snake game)
- [ ] Live competition stats during the event
