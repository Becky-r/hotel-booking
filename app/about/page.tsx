import type { Metadata } from "next"
import Image from "next/image"
import { Award, Clock, Heart, Shield } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { HOTEL_NAME, HOTEL_STAR_RATING } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us | The Kerawi",
  description: "Learn about the rich heritage and unwavering commitment to excellence at The Aurelian.",
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
<<<<<<< HEAD
          src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1551882547-ff40c63fe5fa_w1800.jpg"
          alt="The Aurelian lobby"
=======
          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0064.JPG?updatedAt=1772686038137"
          alt="The Kerawi lobby"
>>>>>>> 684fba3 (edit the file)
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Our Story</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">Nearly a century of extraordinary hospitality</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg lg:w-5/12">
              <Image
<<<<<<< HEAD
                src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1566073771259-6a8506099945_w1200.jpg"
                alt="The Aurelian entrance"
=======
                src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0047.JPG?updatedAt=1772686039055"
                alt="The Kerawi entrance"
>>>>>>> 684fba3 (edit the file)
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <div className="flex w-full flex-col gap-6 lg:w-7/12">
              <SectionHeading title={`Welcome to ${HOTEL_NAME}`} subtitle="Our Heritage" align="left" />
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                For nearly a century, {HOTEL_NAME} has stood as a beacon of refined luxury in the heart of Paris.
                What began as the private residence of a visionary architect has evolved into one of Europe{"'"}s most
                celebrated five-star hotels, a place where history, art, and unparalleled service converge.
              </p>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                Every corner of our hotel tells a story. Original Art Deco motifs blend seamlessly with contemporary
                design. Hand-selected furnishings sit alongside museum-quality artworks. And our team, drawn from the
                finest hospitality traditions worldwide, shares a singular mission: to ensure every guest feels not
                merely accommodated, but truly celebrated.
              </p>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                Today, under the stewardship of the Laurent family{"'"}s third generation, {HOTEL_NAME} continues to
                set the standard for what luxury hospitality can be. Our {HOTEL_STAR_RATING}-star palace designation
                is not just an accolade; it is a promise renewed with every guest who walks through our doors.
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
