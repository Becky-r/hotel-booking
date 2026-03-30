import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import {
  HOTEL_NAME,
  HOTEL_ADDRESS,
  HOTEL_PHONE,
  HOTEL_EMAIL,
} from "@/lib/constants"
import { MapPin, Phone, Mail } from "lucide-react"

const quickLinks = [
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/offers", label: "Special Offers" },
  { href: "/reviews", label: "Guest Reviews" },
]

const aboutLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog & News" },
  { href: "/contact", label: "Contact Us" },
  { href: "/policies", label: "Policies" },
  { href: "/account/login", label: "Guest Login" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold tracking-wide text-primary-foreground">
                {HOTEL_NAME}
              </h3>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-gold">
                Hawassa Ethiopia
              </p>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60">
              Where timeless elegance meets modern luxury. Experience the art of hospitality at its finest.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Discover
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Discover links">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* About Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Hotel
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Hotel links">
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{HOTEL_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-gold" />
                <span>{HOTEL_PHONE}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold" />
                <span>{HOTEL_EMAIL}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-foreground/40 sm:flex-row">
          <p>
  &copy; {new Date().getFullYear()} Sabih Software Design Company. All rights reserved.
</p>
          <div className="flex items-center gap-4">
            <Link href="/policies" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/policies" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
