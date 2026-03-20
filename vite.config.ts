import { defineConfig, type Plugin } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

function ainmProxy(): Plugin {
  return {
    name: "ainm-proxy",
    configureServer(server) {
      server.middlewares.use("/api/ainm", async (req, res) => {
        const path = req.url ?? "/"
        const target = `https://api.ainm.no${path}`
        const headers: Record<string, string> = {}
        if (req.headers.authorization) {
          headers["Authorization"] = req.headers.authorization
        }
        try {
          const response = await fetch(target, { headers })
          res.statusCode = response.status
          res.setHeader(
            "Content-Type",
            response.headers.get("Content-Type") ?? "application/json",
          )
          const body = await response.arrayBuffer()
          res.end(Buffer.from(body))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: "Proxy error" }))
        }
      })
    },
  }
}

const config = defineConfig({
  plugins: [
    ainmProxy(),
    devtools(),
    nitro({
      routeRules: {
        "/api/ainm/**": {
          proxy: "https://api.ainm.no/**",
        },
      },
    }),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      spa: { enabled: true },
    }),
    viteReact(),
  ],
})

export default config
