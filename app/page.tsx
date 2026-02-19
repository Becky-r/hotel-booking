import { HeroSection } from "@/components/home/hero-section"
import { FeaturedRooms } from "@/components/home/featured-rooms"
import { AmenitiesPreview } from "@/components/home/amenities-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { OffersBanner } from "@/components/home/offers-banner"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedRooms />
      <AmenitiesPreview />
      <TestimonialsSection />
      <OffersBanner />
      <CTASection />
    </>
  )
}
