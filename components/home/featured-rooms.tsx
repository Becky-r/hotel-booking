"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { getFeaturedRooms } from "@/lib/data/rooms"
import { useSite } from "@/contexts/site-context"
import { formatCurrency } from "@/lib/format"

export function FeaturedRooms() {
  const { currency } = useSite()
  const featured = getFeaturedRooms()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeading
          subtitle="Accommodation"
          title="Rooms & Suites"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-2">
          {featured.slice(0, 4).map((room) => (
            <Link
              key={room.id}
              href={`/rooms/`}
              className="group relative overflow-hidden rounded-lg bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-2xl font-bold text-white">{room.name}</h3>
                  <p className="mt-1 line-clamp-1 font-sans text-sm text-white/70">
                    {room.shortDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5" />
                    {room.maxAdults} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="size-3.5" />
                    {room.size} sq ft
                  </span>
                  <span>{room.bedType} Bed</span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-xs text-muted-foreground">from</span>
                  <p className="font-serif text-lg font-bold text-foreground">
                    {formatCurrency(room.basePrice, currency)}
                    <span className="font-sans text-xs font-normal text-muted-foreground"> / night</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/rooms">
            <Button
              variant="outline"
              className="gap-2 font-sans text-xs uppercase tracking-wider"
            >
              View All Rooms
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
