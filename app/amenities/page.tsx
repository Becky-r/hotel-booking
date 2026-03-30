import type { Metadata } from "next"
import Image from "next/image"
import { Sparkles, Waves, UtensilsCrossed, Wine, Dumbbell, Briefcase, Car, Headphones } from "lucide-react"
import { amenities } from "@/lib/data/amenities"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = {
  title: "Amenities & Services | The Kerawi International Hotel",
  description: "Discover world-class amenities and services at The Kerawi International Hotel, from our signature spa to fine dining.",
}

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="size-6" />,
  Waves: <Waves className="size-6" />,
  UtensilsCrossed: <UtensilsCrossed className="size-6" />,
  Wine: <Wine className="size-6" />,
  Dumbbell: <Dumbbell className="size-6" />,
  Concierge: <Headphones className="size-6" />,
  Briefcase: <Briefcase className="size-6" />,
  Car: <Car className="size-6" />,
}

export default function AmenitiesPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image


          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0247.JPG?updatedAt=1772726823908"
          alt="Kerawi Services"

          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Amenities & Services</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">World-class facilities for an extraordinary stay</p>
        </div>
      </section>

      {/* Amenities List */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading title="Exceptional Experiences Await" subtitle="Our Facilities" />

          <div className="mt-16 flex flex-col gap-24">
            {amenities.map((amenity, idx) => (
              <div
                key={amenity.id}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-16 ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:w-1/2">
                  <Image
                    src={amenity.image}
                    alt={amenity.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="flex w-full flex-col gap-4 lg:w-1/2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                      {iconMap[amenity.icon] ?? <Sparkles className="size-6" />}
                    </div>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                      {amenity.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground md:text-3xl">{amenity.name}</h3>
                  <p className="font-sans text-base leading-relaxed text-muted-foreground">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
