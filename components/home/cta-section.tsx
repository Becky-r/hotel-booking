import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HOTEL_NAME } from "@/lib/constants"

export function CTASection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden py-28 lg:py-36">
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
        alt="Luxury hotel pool area"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Begin Your Journey
        </span>
        <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl text-balance">
          Experience the Extraordinary at {HOTEL_NAME}
        </h2>
        <p className="font-sans text-base leading-relaxed text-white/70 text-pretty">
          From the moment you arrive, every detail is designed to exceed your expectations.
          Let us craft an unforgettable stay tailored to your desires.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/booking">
            <Button className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider px-8">
              Reserve Your Stay
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white font-sans text-xs uppercase tracking-wider px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
