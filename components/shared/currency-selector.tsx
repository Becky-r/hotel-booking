"use client"

import { useSite } from "@/contexts/site-context"
import { CURRENCIES, type CurrencyCode } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CurrencySelector() {
  const { currency, setCurrency } = useSite()

  return (
    <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
      <SelectTrigger className="h-8 w-auto gap-1 border-none bg-transparent px-2 text-xs font-medium shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
