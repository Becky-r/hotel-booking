"use client"

import Image from "next/image"
import { HOTEL_NAME, HOTEL_TAGLINE } from "@/lib/constants"
import { SearchWidget } from "@/components/booking/search-widget"
import { Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
<<<<<<< HEAD
        src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1542314831-068cd1dbfeeb_w1920.jpg"
=======
        src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0168.JPG"
>>>>>>> 684fba3 (edit the file)
        alt="The Aurelian hotel exterior"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 text-center">
        {/* Stars */}
        <div className="flex items-center gap-1" aria-label="3-star hotel">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className="size-4 fill-gold text-gold" />
          ))}
        </div>

        {/* Hotel Name */}
        <h1 className="font-serif text-5xl font-bold leading-tight tracking-wide text-white md:text-7xl lg:text-8xl text-balance">
          {HOTEL_NAME}
        </h1>

        {/* Tagline */}
        <p className="max-w-xl font-sans text-lg leading-relaxed text-white/80 md:text-xl text-pretty">
          {HOTEL_TAGLINE}
        </p>

        {/* Decorative Line */}
        <div className="h-px w-24 bg-gold" aria-hidden="true" />

        {/* Search Widget */}
        <div className="w-full max-w-4xl">
          <SearchWidget variant="hero" />
        </div>
      </div>
    </section>
  )
}
