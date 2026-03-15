/// <reference types="vite/client" />
import { Outlet, HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import { SnakeSpotlight } from "@/components/snake-spotlight"
import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Mamba Masters — NM i AI 2026",
      },
      {
        name: "description",
        content:
          "Mamba Masters competing in the Norwegian Championship in AI (AINM) 2026",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="snake-scales min-h-svh antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <>
      <SnakeSpotlight />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
