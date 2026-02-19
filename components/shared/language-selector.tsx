"use client"

import { useSite } from "@/contexts/site-context"
import { LANGUAGES, type LanguageCode } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSelector() {
  const { language, setLanguage } = useSite()

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as LanguageCode)}>
      <SelectTrigger className="h-8 w-auto gap-1 border-none bg-transparent px-2 text-xs font-medium shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            {l.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
