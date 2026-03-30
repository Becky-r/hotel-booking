"use client"

import Image from "next/image"
import { HOTEL_NAME, HOTEL_TAGLINE } from "@/lib/constants"
import { SearchWidget } from "@/components/booking/search-widget"
import { Star } from "lucide-react"



export function HeroSection() {
  
  return (
    <section className="relative flex min-h-[99vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
     
      <Image
        src="https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8087.JPG?updatedAt=1772962015224"
       
        alt="The Kerawi hotel exterior"
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
<div className="flex items-center">
  <img
    src="https://ik.imagekit.io/hawassa/hotel-booking/public/logo%20kerawi.png"
    alt="Hotel Logo"
    className="h-10 w-10 md:h-60 md:w-60 object-contain mr-1"
  />

  <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
    {HOTEL_NAME}
  </h1>
</div>
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
