"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"

const galleryCategories = ["All", "Rooms", "Dining", "Wellness", "Events", "Exterior"] as const

const galleryImages = [
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1611892440504-42a792e24d32_w1200.jpg", alt: "Standard Room interior", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1578683010236-d716f9a3f461_w1200.jpg", alt: "Deluxe Room suite", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1618773928121-c32242e63f39_w1200.jpg", alt: "Presidential Suite", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1590490360182-c33d57733427_w1200.jpg", alt: "Superior Room", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1414235077428-338989a2e8c0_w1200.jpg", alt: "Le Dore Restaurant", category: "Dining" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1470337458703-46ad1756a187_w1200.jpg", alt: "The Gold Bar", category: "Dining" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1544161515-4ab6ce6db874_w1200.jpg", alt: "Spa treatment room", category: "Wellness" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1582268611958-ebfd161ef9cf_w1200.jpg", alt: "Infinity Pool", category: "Wellness" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1534438327276-14e5300c3a48_w1200.jpg", alt: "Fitness Center", category: "Wellness" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1497366216548-37526070297c_w1200.jpg", alt: "Business Center", category: "Events" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1542314831-068cd1dbfeeb_w1200.jpg", alt: "Hotel Exterior", category: "Exterior" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1566073771259-6a8506099945_w1200.jpg", alt: "Hotel Entrance", category: "Exterior" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1551882547-ff40c63fe5fa_w1200.jpg", alt: "Hotel Lobby", category: "Exterior" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1596178065887-1198b6148b2b_w1200.jpg", alt: "Romantic setup", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/recent/photo-1600210492486-724fe5c67fb0_w1200.jpg", alt: "Junior Suite living area", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1549317661-bd32c8ce0afa_w1200.jpg", alt: "Luxury transfer", category: "Events" },
]

export function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<(typeof galleryCategories)[number]>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((i) => i.category === activeCategory)

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1542314831-068cd1dbfeeb_w1800.jpg"
          alt="The Aurelian gallery"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Gallery</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">A visual journey through The Aurelian</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Explore Our Spaces" subtitle="Visual Journey" />

          {/* Category Filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {galleryCategories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                className={
                  activeCategory === cat
                    ? "bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider"
                    : "font-sans text-xs uppercase tracking-wider"
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((img, idx) => (
              <button
                key={img.src}
                className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                onClick={() => setLightbox(idx)}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30" />
                <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-linear-to-t from-charcoal/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-sans text-xs text-cream">{img.alt}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-cream hover:bg-cream/10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="size-6" />
          </Button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center font-sans text-sm text-cream/80">
              {filtered[lightbox].alt}
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
