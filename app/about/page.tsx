import type { Metadata } from "next"
import Image from "next/image"
import { Award, Clock, Heart, Shield } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { HOTEL_NAME, HOTEL_STAR_RATING } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us | The Kerawi International Hotel",
  description: "Learn about the rich heritage and unwavering commitment to excellence at The Kerawi International Hotel .",
}

const values = [
  {
    icon: Heart,
    title: "Passion for Hospitality",
    description: "Every interaction is an opportunity to create a lasting memory. Our team is driven by a genuine love for service.",
  },
  {
    icon: Award,
    title: "Uncompromising Excellence",
    description: "From the finest linens to the freshest ingredients, we accept nothing less than the highest standards in every detail.",
  },
  {
    icon: Shield,
    title: "Trust & Discretion",
    description: "Our guests entrust us with their most important moments. We honor that trust with absolute discretion and care.",
  },
  {
    icon: Clock,
    title: "Timeless Elegance",
    description: "We celebrate the art of living well, blending heritage craftsmanship with contemporary innovation.",
  },
]

const milestones = [
  { year: "1928", event: "The original building was constructed as a grand Parisian residence by architect Henri Rousseau." },
  { year: "1962", event: "Converted into a boutique hotel by the Laurent family, establishing a new standard for Parisian luxury." },
  { year: "1988", event: "Major restoration and expansion, adding the rooftop terrace and Le Dore restaurant." },
  { year: "2005", event: "Awarded 5-star palace designation and inducted into Leading Hotels of the World." },
  { year: "2019", event: "Complete modern renovation blending original Art Deco details with contemporary comfort." },
  { year: "2024", event: "Named Best Urban Hotel in Europe by Conde Nast Traveller for the third consecutive year." },
]

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-150">
        <Image

          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0064.JPG?updatedAt=1772686038137"
          alt="The Kerawi lobby"

          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-4xl lg:text-6xl overflow-hidden pt-35">Our Story</h1>
          <p className="mt-2 font-sans text-sm text-cream/100">Nearly a century of extraordinary hospitality</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:w-7/12">
              <Image

                src="https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8077.JPG"
                alt="The Kerawi entrance"

                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="flex w-full flex-col gap-6 lg:w-7/12">
              <SectionHeading title={`Welcome to ${HOTEL_NAME}`} subtitle="Our Heritage" align="left" />
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                For nearly a century, {HOTEL_NAME} Hawassa is a 3 star hotel it was established on October 1, 2019 it’s located at an easy reach for travelers around an area known by Atote next to Zion College. The hotel is a one minute drive from down town and 3km from Hawassa Lake and 2km from mount Tabor. The hotel has make ready to its beloved customer 45 diverse types of guest rooms, 2 Conference and Event venues and 3 food & beverage service outlets.
              </p>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                Every corner of our hotel tells a story. Original Art Deco motifs blend seamlessly with contemporary
                design. Hand-selected furnishings sit alongside museum-quality artworks. And our team, drawn from the
                finest hospitality traditions worldwide, shares a singular mission: to ensure every guest feels not
                merely accommodated, but truly celebrated.
              </p>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
               From the most upper floors of the hotel, guests can easily enjoy the beauty of mount Tabor and Hawassa Lake from their rooms. The kerawi guest rooms are furnished with high quality furniture and fixtures, High speed WI-FI internet and a DSTV channel. Moreover for the sake of our guest’s safety and security, a smoke detector and CCTV are fixed at the hotel premises where they are demanded.  
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading title="Our Guiding Principles" subtitle="Values" />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center gap-4 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-gold/10">
                  <value.icon className="size-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-foreground">{value.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading title="A Legacy of Excellence" subtitle="Our Journey" />
          <div className="mt-12 flex flex-col gap-0">
            {milestones.map((milestone, idx) => (
              <div key={milestone.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-gold bg-background">
                    <span className="font-sans text-[10px] font-bold text-gold">{milestone.year}</span>
                  </div>
                  {idx < milestones.length - 1 && <div className="h-full w-px bg-gold/20" />}
                </div>
                <div className="pb-10">
                  <h4 className="font-serif text-lg text-foreground">{milestone.year}</h4>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
