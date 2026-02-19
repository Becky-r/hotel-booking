import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Waves, UtensilsCrossed, Wine, Dumbbell, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { amenities } from "@/lib/data/amenities"

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Waves,
  UtensilsCrossed,
  Wine,
  Dumbbell,
  Car,
}

export function AmenitiesPreview() {
  const featured = amenities.slice(0, 6)

  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          subtitle="Experience"
          title="World-Class Amenities"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {featured.map((amenity) => {
            const Icon = iconMap[amenity.icon]
            return (
              <div
                key={amenity.id}
                className="group flex flex-col overflow-hidden rounded-lg bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="size-4 text-gold" />}
                    <h3 className="font-serif text-lg font-bold text-foreground">{amenity.name}</h3>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {amenity.shortDescription}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/amenities">
            <Button
              variant="outline"
              className="gap-2 font-sans text-xs uppercase tracking-wider"
            >
              Explore All Amenities
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
