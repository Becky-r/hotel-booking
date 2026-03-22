"use client"

import Image from "next/image"
import Link from "next/link"
import { Users, Maximize, BedDouble, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Room } from "@/lib/data/rooms"
import { useSite } from "@/contexts/site-context"
import { formatCurrency } from "@/lib/format"

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  const { currency } = useSite()

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card transition-shadow hover:shadow-lg md:flex-row">
      {/* Image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:w-2/5">
        <Image
          src={room.room_images[0].image}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {room.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gold text-charcoal font-sans text-[10px] font-semibold uppercase">
              Popular
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-xl font-bold text-foreground md:text-2xl">
            {room.name}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {room.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {/* <span className="flex items-center gap-1.5">
              <BedDouble className="size-3.5 text-gold" />
              {room.bedType}
            </span> */}
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5 text-gold" />
              Up to {room.capacity} guests
            </span>
            {/* <span className="flex items-center gap-1.5">
              <Maximize className="size-3.5 text-gold" />
              {room.size} sq ft
            </span> */}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {room.amenities.slice(0, 4).map((a) => (
              <span
                key={a.id}
                className="rounded-sm bg-secondary px-2 py-0.5 font-sans text-[10px] text-secondary-foreground"
              >
                {a.name}
              </span>
            ))}
            {room.amenities.length > 4 && (
              <span className="rounded-sm bg-secondary px-2 py-0.5 font-sans text-[10px] text-secondary-foreground">
                +{room.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border/30 pt-4">
          <div>
            <span className="font-sans text-xs text-muted-foreground">From</span>
            <p className="font-serif text-2xl font-bold text-foreground">
              {formatCurrency(room.base_price, currency)}
              <span className="font-sans text-xs font-normal text-muted-foreground"> / night</span>
            </p>
          </div>
          <Link href={`/rooms/${room.id}`}>
            <Button className="gap-2 bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider">
              View Room
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
