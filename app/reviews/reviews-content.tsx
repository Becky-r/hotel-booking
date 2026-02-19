"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, BadgeCheck, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionHeading } from "@/components/shared/section-heading"
import { reviews, getAverageRating } from "@/lib/data/reviews"

const stayFilters = ["All", "business", "leisure", "family", "couple"] as const

export function ReviewsContent() {
  const [filter, setFilter] = useState<(typeof stayFilters)[number]>("All")
  const avgRating = getAverageRating()
  const filtered = filter === "All" ? reviews : reviews.filter((r) => r.stayType === filter)
  const totalReviews = reviews.length

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1800&q=80"
          alt="Guest reviews"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Guest Reviews</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">What our guests are saying</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {/* Overall Rating */}
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionHeading title="Guest Experiences" subtitle="Testimonials" />
            <div className="mt-4 flex items-center gap-3">
              <span className="font-serif text-5xl font-bold text-foreground">{avgRating}</span>
              <div className="flex flex-col items-start gap-0.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.round(avgRating) ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <span className="font-sans text-xs text-muted-foreground">Based on {totalReviews} reviews</span>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {stayFilters.map((s) => (
              <Button
                key={s}
                size="sm"
                variant={filter === s ? "default" : "outline"}
                className={
                  filter === s
                    ? "bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider"
                    : "font-sans text-xs uppercase tracking-wider"
                }
                onClick={() => setFilter(s)}
              >
                {s === "All" ? "All Reviews" : s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="mt-10 flex flex-col gap-6">
            {filtered.map((review) => (
              <div key={review.id} className="rounded-lg border border-border/50 bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-gold/10 font-serif text-sm font-bold text-gold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-semibold text-foreground">{review.guestName}</span>
                        {review.verified && (
                          <BadgeCheck className="size-3.5 text-gold" />
                        )}
                      </div>
                      <span className="font-sans text-xs text-muted-foreground">
                        {review.guestCountry} &middot; {review.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3 ${i < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <h4 className="font-serif text-base text-foreground">{review.title}</h4>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{review.content}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-sans text-[10px] uppercase tracking-wider">
                    {review.roomType}
                  </Badge>
                  <Badge variant="outline" className="font-sans text-[10px] uppercase tracking-wider">
                    {review.stayType}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-lg bg-secondary/30 p-8 text-center">
            <MessageSquare className="size-8 text-gold" />
            <h3 className="font-serif text-xl text-foreground">Share Your Experience</h3>
            <p className="font-sans text-sm text-muted-foreground">
              Have you stayed with us? We would love to hear about your experience.
            </p>
            <Button className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
              Write a Review
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
