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
          src="data:image/jpeg;base64,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"
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
