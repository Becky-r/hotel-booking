"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CurrencyCode, LanguageCode } from "@/lib/constants"

interface SiteContextValue {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  language: LanguageCode
  setLanguage: (l: LanguageCode) => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD")
  const [language, setLanguage] = useState<LanguageCode>("en")

  return (
    <SiteContext.Provider value={{ currency, setCurrency, language, setLanguage }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within SiteProvider")
  return ctx
}
