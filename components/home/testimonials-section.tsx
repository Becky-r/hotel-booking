"use client"

import { Star, Quote } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { SectionHeading } from "@/components/shared/section-heading"
import { reviews, getAverageRating } from "@/lib/data/reviews"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const avgRating = getAverageRating()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Guests Say"
        />

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold text-gold" />
            ))}
          </div>
          <span className="font-sans text-sm text-muted-foreground">
            {avgRating} / 5 from {reviews.length} reviews
          </span>
        </div>

        <div className="mt-12 lg:mt-16">
          <Carousel opts={{ loop: true, align: "start" }} className="mx-auto max-w-5xl">
            <CarouselContent>
              {reviews.slice(0, 6).map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/2">
                  <div className="flex h-full flex-col gap-4 rounded-lg border border-border/50 bg-card p-6">
                    <Quote className="size-8 text-gold/30" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i < review.rating ? "fill-gold text-gold" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-serif text-base font-bold text-foreground">
                      {review.title}
                    </h4>
                    <p className="flex-1 font-sans text-sm leading-relaxed text-muted-foreground line-clamp-4">
                      {review.content}
                    </p>
                    <div className="flex items-center gap-3 border-t border-border/30 pt-4">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                          {review.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">{review.guestName}</p>
                        <p className="font-sans text-xs text-muted-foreground">{review.guestCountry}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex -left-14" />
            <CarouselNext className="hidden lg:flex -right-14" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
