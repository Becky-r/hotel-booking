"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarDays, Users, BedDouble, Maximize, ArrowRight, Tag, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useBooking } from "@/contexts/booking-context"
import { useSite } from "@/contexts/site-context"
import { rooms } from "@/lib/data/rooms"
import { calculateStayPrice, applyPromoCode } from "@/lib/booking-utils"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"

export function BookingSearch() {
  const { booking, setCheckIn, setCheckOut, setAdults, setChildren, setSelectedRoom, setPromoCode, setPromoDiscount } = useBooking()
  const { currency } = useSite()
  const [promoInput, setPromoInput] = useState("")
  const [promoResult, setPromoResult] = useState<{ valid: boolean; description: string } | null>(null)
  const [searched, setSearched] = useState(false)

  const hasDate = booking.checkIn && booking.checkOut

  const handleSearch = () => {
    setSearched(true)
  }

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    const result = applyPromoCode(promoInput, 1000)
    setPromoResult({ valid: result.valid, description: result.description })
    if (result.valid) {
      setPromoCode(promoInput.toUpperCase())
    }
  }

  const handleSelectRoom = (room: typeof rooms[number]) => {
    setSelectedRoom(room)
  }

  const availableRooms = rooms.filter((room) => room.maxAdults >= booking.adults)

  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        {/* Search Form */}
        <div className="rounded-lg border border-border/50 bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Check-in
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start gap-2 font-sans text-sm font-normal", !booking.checkIn && "text-muted-foreground")}
                  >
                    <CalendarDays className="size-4 text-gold" />
                    {booking.checkIn ? format(booking.checkIn, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={booking.checkIn} onSelect={setCheckIn} disabled={{ before: new Date() }} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Check-out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start gap-2 font-sans text-sm font-normal", !booking.checkOut && "text-muted-foreground")}
                  >
                    <CalendarDays className="size-4 text-gold" />
                    {booking.checkOut ? format(booking.checkOut, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={booking.checkOut} onSelect={setCheckOut} disabled={{ before: booking.checkIn || new Date() }} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Adults</label>
              <Select value={String(booking.adults)} onValueChange={(v) => setAdults(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Adult" : "Adults"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Children</label>
              <Select value={String(booking.children)} onValueChange={(v) => setChildren(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Child" : "Children"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col justify-end">
              <Button onClick={handleSearch} className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider">
                Search
              </Button>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-4 flex items-end gap-2 border-t border-border/30 pt-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Promo Code
              </label>
              <div className="flex gap-2">
                <Input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code"
                  className="h-9 w-48 text-sm uppercase"
                />
                <Button variant="outline" size="sm" onClick={handleApplyPromo}>
                  <Tag className="size-3.5" /> Apply
                </Button>
              </div>
            </div>
            {promoResult && (
              <div className={cn("flex items-center gap-1.5 text-xs", promoResult.valid ? "text-green-600" : "text-destructive")}>
                {promoResult.valid ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                {promoResult.description}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {hasDate ? "Available Rooms" : "Select dates to see pricing"}
            </h2>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              {availableRooms.length} rooms match your criteria
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {availableRooms.map((room) => {
                const pricing = hasDate
                  ? calculateStayPrice(room, booking.checkIn!, booking.checkOut!)
                  : null

                return (
                  <div
                    key={room.id}
                    className={cn(
                      "flex flex-col overflow-hidden rounded-lg border bg-card transition-all sm:flex-row",
                      booking.selectedRoom?.id === room.id ? "border-gold ring-1 ring-gold" : "border-border/50"
                    )}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-auto sm:w-48">
                      <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row sm:items-center">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-serif text-lg font-bold text-foreground">{room.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><BedDouble className="size-3" />{room.bedType}</span>
                          <span className="flex items-center gap-1"><Users className="size-3" />{room.maxAdults} guests</span>
                          <span className="flex items-center gap-1"><Maximize className="size-3" />{room.size} sqft</span>
                        </div>
                        {room.featured && (
                          <Badge variant="secondary" className="mt-1 w-fit text-[10px]">Popular Choice</Badge>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-4 sm:mt-0">
                        <div className="text-right">
                          {pricing ? (
                            <>
                              <p className="font-serif text-xl font-bold text-foreground">
                                {formatCurrency(pricing.total, currency)}
                              </p>
                              <span className="font-sans text-xs text-muted-foreground">
                                {pricing.nights} {pricing.nights === 1 ? "night" : "nights"} total
                              </span>
                            </>
                          ) : (
                            <>
                              <p className="font-serif text-xl font-bold text-foreground">
                                {formatCurrency(room.basePrice, currency)}
                              </p>
                              <span className="font-sans text-xs text-muted-foreground">per night</span>
                            </>
                          )}
                        </div>
                        {booking.selectedRoom?.id === room.id ? (
                          <Link href="/booking/checkout">
                            <Button className="gap-1 bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
                              Continue <ArrowRight className="size-3" />
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleSelectRoom(room)}
                            className="font-sans text-xs uppercase tracking-wider"
                          >
                            Select
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
