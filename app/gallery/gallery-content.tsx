"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"

const galleryCategories = ["All", "Rooms", "Dining","Lobby", "Bar", "Events","Exterior"] as const

const galleryImages = [
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9747.JPG?updatedAt=1772686457815", alt: "Standard Room interior", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9751.JPG?updatedAt=1772686461301", alt: "Deluxe Room suite", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9824.JPG?updatedAt=1772686512164", alt: "Twine", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9811.JPG?updatedAt=1772686451545", alt: "Business Suite", category: "Rooms" },


  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0047.JPG?updatedAt=1772686039055", alt: "Hotel Exterior", category: "Exterior" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0168.JPG?updatedAt=1772686044822", alt: "Hotel Entrance", category: "Exterior" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9511.JPG?updatedAt=1772686447033", alt: "Luxury hotel exterior view", category: "Exterior" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9887.JPG?updatedAt=1772727121156", alt: "Modern hotel building front view", category: "Exterior" },

  
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9791.JPG?updatedAt=1772686421975", alt: "Executive Suite", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9706.JPG?updatedAt=1772686417139", alt: "Family Suite", category: "Rooms" },
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9697.JPG?updatedAt=1772726961292", alt: "Meeting one", category: "Events" },
  
  { src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9862.JPG?updatedAt=1772727134178", alt: "meeting two", category: "Events" },
  


{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9899.JPG?updatedAt=1772727131757", alt: "The Gold Bar", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9930.JPG?updatedAt=1772727132713", alt: "The Lounge", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9931.JPG?updatedAt=1772727135792", alt: "Luxury cocktail bar counter", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9921.JPG?updatedAt=1772727134087", alt: "Modern bar interior design", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9913.JPG?updatedAt=1772727127161", alt: "Elegant bar seating area", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9908.JPG?updatedAt=1772727131113", alt: "Premium drinks display shelf", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9909.JPG?updatedAt=1772727126523", alt: "Stylish bar counter lighting", category: "Bar" },

{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9585.JPG?updatedAt=1772726961268", alt: "Cocktail preparation area", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9578.JPG?updatedAt=1772726961173", alt: "Luxury bar lounge atmosphere", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9577.JPG?updatedAt=1772726961825", alt: "Bar table and chair setup", category: "Bar" },


{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0210.JPG?updatedAt=1772726822577", alt: "Premium cocktail serving area", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0239.JPG?updatedAt=1772726819198", alt: "Elegant bar lounge seating", category: "Bar" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0218.JPG?updatedAt=1772726817736", alt: "Night bar ambience lighting", category: "Bar" },




{ src:"https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0217.JPG?updatedAt=1772726824630", alt: "Hotel Lobby", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0183.JPG?updatedAt=1772726824739", alt: "Luxury hotel lobby interior", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0285.JPG?updatedAt=1772726824865", alt: "Elegant hotel reception area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0194.JPG?updatedAt=1772726824214", alt: "Modern lobby seating area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0203.JPG?updatedAt=1772726826513", alt: "Hotel lobby view", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0201.JPG?updatedAt=1772726824115", alt: "Spacious lobby with stylish furniture", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0251.JPG?updatedAt=1772726825449", alt: "Hotel front desk reception", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0346.JPG?updatedAt=1772726823764", alt: "Lobby lounge seating area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0252.JPG?updatedAt=1772726822628", alt: "Contemporary hotel lobby design", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0292.JPG?updatedAt=1772726821134", alt: "Hotel lobby with modern lighting", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0306.JPG?updatedAt=1772726822243", alt: "Premium lobby interior design", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0226.JPG?updatedAt=1772726819845", alt: "Luxury lobby lounge space", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0242.JPG?updatedAt=1772726818568", alt: "Reception desk and waiting area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9904.JPG?updatedAt=1772727135513", alt: "Elegant hotel welcome area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9963.JPG?updatedAt=1772727135426", alt: "Lobby interior with decorative lighting", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0208.JPG?updatedAt=1772726829790", alt: "Modern hotel lobby atmosphere", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9936.JPG?updatedAt=1772727135759", alt: "Lobby seating with luxury decor", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9954.JPG?updatedAt=1772727132464", alt: "Hotel lobby with comfortable sofas", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9960.JPG?updatedAt=1772727133611", alt: "Stylish reception and waiting area", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0434.JPG?updatedAt=1772726927080", alt: "Grand hotel lobby view", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0381.JPG?updatedAt=1772726926435", alt: "Upscale lobby interior ambiance", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0379.JPG?updatedAt=1772726922671", alt: "Bright hotel lobby entrance view", category: "Lobby" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0223.JPG?updatedAt=1772726826988", alt: "Luxury lobby with chandelier lighting", category: "Lobby" },







{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9458.JPG?updatedAt=1772726926593", alt: "Stylish dining hall design", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9440.JPG?updatedAt=1772802241627", alt: "Restaurant premium dining experience", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9457.JPG?updatedAt=1772726928103", alt: "Elegant restaurant seating", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9455.JPG?updatedAt=1772726925349", alt: "Fine dining environment", category: "Dining" },

{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9497.JPG?updatedAt=1772726923522", alt: "Dining space with modern design", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0354.JPG?updatedAt=1772726824204", alt: "Restaurant evening atmosphere", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0348.JPG?updatedAt=1772726820486", alt: "Luxury dining room view", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0318.JPG?updatedAt=1772726814627", alt: "Elegant restaurant layout", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9852.JPG?updatedAt=1772727138045", alt: "Luxury restaurant interior", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9875.JPG?updatedAt=1772727135617", alt: "Elegant dining table setup", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9847.JPG?updatedAt=1772727135180", alt: "Fine dining seating area", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9844.JPG?updatedAt=1772727134569", alt: "Modern restaurant lighting design", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9843.JPG?updatedAt=1772727134631", alt: "Restaurant table decoration", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0366.JPG?updatedAt=1772726929271", alt: "Comfortable dining chairs and tables", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9474.JPG?updatedAt=1772726926408", alt: "Luxury restaurant ambience", category: "Dining" },
{ src: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0358.JPG?updatedAt=1772726928003", alt: "Le Dore Restaurant", category: "Dining" },




]


export function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<(typeof galleryCategories)[number]>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = activeCategory === "All" ? galleryImages : galleryImages.filter((i) => i.category === activeCategory)

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-150">
        <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0005.JPG?updatedAt=1772685997411"
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
                <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-charcoal/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
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
