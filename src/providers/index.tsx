"use client"

import * as React from "react"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { SWRProvider } from "@/providers/SWRProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SWRProvider>
        {children}
      </SWRProvider>
    </ThemeProvider>
  )
}
