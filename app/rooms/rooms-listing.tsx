"use client"

import { useState } from "react"
import { rooms } from "@/lib/data/rooms"
import { RoomCard } from "@/components/rooms/room-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "price-low" | "price-high" | "size" | "guests"

export function RoomsListing() {
  const [sort, setSort] = useState<SortOption>("price-low")

  const sorted = [...rooms].sort((a, b) => {
    switch (sort) {
      case "price-low":
        return a.basePrice - b.basePrice
      case "price-high":
        return b.basePrice - a.basePrice
      case "size":
        return b.size - a.size
      case "guests":
        return b.maxAdults - a.maxAdults
      default:
        return 0
    }
  })

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        {/* Sort bar */}
        <div className="mb-8 flex items-center justify-between">
          <p className="font-sans text-sm text-muted-foreground">
            {rooms.length} room types available
          </p>
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs text-muted-foreground">Sort by:</span>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="h-8 w-40 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="size">Room Size</SelectItem>
                <SelectItem value="guests">Guest Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Room list */}
        <div className="flex flex-col gap-6">
          {sorted.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  )
}
