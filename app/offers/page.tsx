import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Tag, CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionHeading } from "@/components/shared/section-heading"
import { offers } from "@/lib/data/offers"

export const metadata: Metadata = {
  title: "Special Offers | The Aurelian",
  description: "Explore exclusive offers and packages at The Aurelian. Book your luxury getaway at special rates.",
}

export default function OffersPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0313.JPG?updatedAt=1772726824807"
          alt="Special offers"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Special Offers</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">Exclusive packages for an extraordinary stay</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading title="Curated Packages & Promotions" subtitle="Exclusive Offers" />

          <div className="mt-12 flex flex-col gap-12">
            {offers.map((offer, idx) => (
              <div
                key={offer.id}
                className={`flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card lg:flex-row ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:w-5/12">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  {offer.featured && (
                    <Badge className="absolute left-4 top-4 bg-gold text-charcoal hover:bg-gold-dark font-sans text-[10px] uppercase tracking-wider">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="flex w-full flex-col justify-center gap-4 p-6 lg:w-7/12 lg:p-10">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-gold" />
                    <span className="font-sans text-lg font-bold text-gold">{offer.discount}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">{offer.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{offer.subtitle}</p>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">{offer.description}</p>

                  <Separator />

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      <span className="font-sans text-xs">Valid until {offer.validUntil}</span>
                    </div>
                    <div className="rounded bg-secondary/50 px-2.5 py-1">
                      <span className="font-mono text-xs font-bold text-foreground">{offer.promoCode}</span>
                    </div>
                  </div>

                  <div>
                    <ul className="flex flex-col gap-1">
                      {offer.terms.map((term) => (
                        <li key={term} className="font-sans text-xs text-muted-foreground">
                          {"- "}{term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/booking">
                    <Button className="bg-gold text-charcoal hover:bg-gold-dark gap-2 font-sans text-xs uppercase tracking-wider">
                      Book This Offer
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
