"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HOTEL_NAME, NAV_LINKS, HOTEL_PHONE } from "@/lib/constants"
import { CurrencySelector } from "@/components/shared/currency-selector"
import { LanguageSelector } from "@/components/shared/language-selector"
import { MobileNav } from "./mobile-nav"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden border-b border-border/50 bg-secondary/50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="size-3" />
            <span>{HOTEL_PHONE}</span>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSelector />
            <span className="text-border">|</span>
            <CurrencySelector />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/50 bg-background/95 shadow-sm backdrop-blur-md"
            : "bg-background"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wide text-foreground lg:text-2xl">
              {HOTEL_NAME}
            </span>
            <span className="hidden text-[10px] font-sans uppercase tracking-[0.25em] text-gold sm:block">
              Hawassa Ethiopia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/account/" className="hidden lg:block">
              <Button variant="ghost" size="icon-sm">
                <User className="size-4" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/booking" className="hidden sm:block">
              <Button className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider">
                Book Now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
