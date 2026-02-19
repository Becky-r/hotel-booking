import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/shared/section-heading"
import { getFeaturedOffers } from "@/lib/data/offers"

export function OffersBanner() {
  const offers = getFeaturedOffers().slice(0, 3)

  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          subtitle="Special Offers"
          title="Exclusive Promotions"
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.id}
              href="/offers"
              className="group flex flex-col overflow-hidden rounded-lg bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gold text-charcoal font-sans text-xs font-semibold">
                    {offer.discount}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">{offer.title}</h3>
                <p className="font-sans text-sm text-muted-foreground">{offer.subtitle}</p>
                <div className="mt-auto pt-3">
                  <span className="inline-flex items-center gap-1 font-sans text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-dark">
                    Learn More <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
