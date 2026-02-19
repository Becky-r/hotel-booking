"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { HOTEL_NAME, NAV_LINKS, HOTEL_PHONE, HOTEL_EMAIL } from "@/lib/constants"
import { CurrencySelector } from "@/components/shared/currency-selector"
import { LanguageSelector } from "@/components/shared/language-selector"
import { Phone, Mail, User } from "lucide-react"

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 bg-background p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-left font-serif text-xl font-bold tracking-wide">
            {HOTEL_NAME}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-border/30 py-3.5 font-sans text-sm font-medium text-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account/login"
            onClick={onClose}
            className="flex items-center gap-2 border-b border-border/30 py-3.5 font-sans text-sm font-medium text-foreground transition-colors hover:text-gold"
          >
            <User className="size-4" />
            My Account
          </Link>
        </nav>

        <div className="mt-4 px-6">
          <Link href="/booking" onClick={onClose}>
            <Button className="w-full bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider">
              Book Now
            </Button>
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-3 px-6">
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <CurrencySelector />
          </div>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="size-3" />
              {HOTEL_PHONE}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-3" />
              {HOTEL_EMAIL}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
