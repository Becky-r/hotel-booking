"use client"

import Link from "next/link"
import Image from "next/image"
import { BedDouble, Users, Maximize, Building2, Eye, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RoomGallery } from "@/components/rooms/room-gallery"
import { SearchWidget } from "@/components/booking/search-widget"
import { SectionHeading } from "@/components/shared/section-heading"
import { formatCurrency } from "@/lib/format"
import { useSite } from "@/contexts/site-context"
import { useBooking } from "@/contexts/booking-context"
import { useRouter } from "next/navigation"
import type { Room } from "@/lib/data/rooms"
import { rooms } from "@/lib/data/rooms"

interface RoomDetailContentProps {
  room: Room
}

export function RoomDetailContent({ room }: RoomDetailContentProps) {
  const { currency } = useSite()
  const { setSelectedRoom } = useBooking()
  const router = useRouter()

  const relatedRooms = rooms.filter((r) => r.id !== room.id).slice(0, 3)

  const handleBookThis = () => {
    setSelectedRoom(room)
    router.push("/booking")
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <nav className="flex items-center gap-2 font-sans text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-foreground">Rooms & Suites</Link>
            <span>/</span>
            <span className="text-foreground">{room.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-background py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Left Column - Content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <RoomGallery images={room.images} name={room.name} />

              {/* Title + Description */}
              <div className="mt-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                      {room.name}
                    </h1>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      {room.floor} Floor &middot; {room.view}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-xs text-muted-foreground">from</span>
                    <p className="font-serif text-2xl font-bold text-foreground">
                      {formatCurrency(room.basePrice, currency)}
                    </p>
                    <span className="font-sans text-xs text-muted-foreground">per night</span>
                  </div>
                </div>
                <p className="mt-6 font-sans text-base leading-relaxed text-muted-foreground">
                  {room.description}
                </p>
              </div>

              <Separator className="my-8" />

              {/* Room Specs */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">Room Details</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 p-4 text-center">
                    <Maximize className="size-5 text-gold" />
                    <span className="font-sans text-xs text-muted-foreground">Size</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{room.size} sq ft</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 p-4 text-center">
                    <BedDouble className="size-5 text-gold" />
                    <span className="font-sans text-xs text-muted-foreground">Bed Type</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{room.bedType}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 p-4 text-center">
                    <Users className="size-5 text-gold" />
                    <span className="font-sans text-xs text-muted-foreground">Guests</span>
                    <span className="font-sans text-sm font-semibold text-foreground">
                      {room.maxAdults}A + {room.maxChildren}C
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-border/50 p-4 text-center">
                    <Eye className="size-5 text-gold" />
                    <span className="font-sans text-xs text-muted-foreground">View</span>
                    <span className="font-sans text-sm font-semibold text-foreground">{room.view}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Check className="size-3.5 shrink-0 text-gold" />
                      <span className="font-sans text-sm text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Pricing Table */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">Pricing</h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-border/50">
                  <div className="grid grid-cols-3">
                    <div className="bg-secondary/50 p-4 text-center">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">Standard</span>
                      <p className="mt-1 font-serif text-xl font-bold text-foreground">
                        {formatCurrency(room.basePrice, currency)}
                      </p>
                      <span className="font-sans text-xs text-muted-foreground">per night</span>
                    </div>
                    <div className="border-x border-border/50 bg-secondary/50 p-4 text-center">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weekend</span>
                      <p className="mt-1 font-serif text-xl font-bold text-foreground">
                        {formatCurrency(room.weekendPrice, currency)}
                      </p>
                      <span className="font-sans text-xs text-muted-foreground">per night</span>
                    </div>
                    <div className="bg-secondary/50 p-4 text-center">
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">Holiday</span>
                      <p className="mt-1 font-serif text-xl font-bold text-foreground">
                        {formatCurrency(room.holidayPrice, currency)}
                      </p>
                      <span className="font-sans text-xs text-muted-foreground">per night</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6 rounded-lg border border-border/50 bg-card p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-foreground">Book This Room</h3>
                <SearchWidget variant="sidebar" />
                <Separator />
                <Button
                  onClick={handleBookThis}
                  className="w-full bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider"
                >
                  Book Now
                </Button>
                <p className="text-center font-sans text-xs text-muted-foreground">
                  Best rate guarantee. Free cancellation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      <section className="border-t border-border/50 bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionHeading subtitle="Explore" title="Other Rooms You May Like" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRooms.map((r) => (
              <Link
                key={r.id}
                href={`/rooms/${r.slug}`}
                className="group overflow-hidden rounded-lg bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.images[0]}
                    alt={r.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-lg font-bold text-foreground">{r.name}</h4>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">
                    From {formatCurrency(r.basePrice, currency)} / night
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
