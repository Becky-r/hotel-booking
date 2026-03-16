"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarDays,
  Users,
  BedDouble,
  Maximize,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { useBooking } from "@/contexts/booking-context";
import { useSite } from "@/contexts/site-context";

import { rooms } from "@/lib/data/rooms";
import { calculateStayPrice } from "@/lib/booking-utils";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BookingSearch() {
  const {
    booking,
    setCheckIn,
    setCheckOut,
    setAdults,
    setChildren,

    selectedRooms,
    getRoomQuantity,
    updateRoomQuantity,
    toggleRoomSelection,
    isRoomSelected,
  } = useBooking();

  const { currency } = useSite();

  const [searched, setSearched] = useState(false);

  const hasDate = booking.checkIn && booking.checkOut;

  const handleSearch = () => setSearched(true);

  const availableRooms = rooms.filter(
    (room) => room.maxAdults >= booking.adults,
  );

  const totalRooms = selectedRooms.reduce((sum, r) => sum + r.quantity, 0);
  const totalTypes = selectedRooms.length;
  const handleClearSelection = () => {
    selectedRooms.forEach((r) => updateRoomQuantity(r.roomId, 0));
  }
  console.log("Booking State:", booking);
  console.log("Selected Rooms:", selectedRooms);
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        {/* SEARCH BAR */}

        <div className="sticky top-20 z-50 rounded-lg border border-border/50 bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-5">
            {/* CHECK IN */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Check-in
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start gap-2",
                      !booking.checkIn && "text-muted-foreground",
                    )}
                  >
                    <CalendarDays className="size-4 text-gold" />

                    {booking.checkIn
                      ? format(booking.checkIn, "MMM d, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={booking.checkIn}
                    onSelect={setCheckIn}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* CHECK OUT */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Check-out
              </label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start gap-2",
                      !booking.checkOut && "text-muted-foreground",
                    )}
                  >
                    <CalendarDays className="size-4 text-gold" />

                    {booking.checkOut
                      ? format(booking.checkOut, "MMM d, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={booking.checkOut}
                    onSelect={setCheckOut}
                    disabled={{ before: booking.checkIn || new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* ADULTS */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Adults
              </label>

              <Select
                value={String(booking.adults)}
                onValueChange={(v) => setAdults(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Adult" : "Adults"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* CHILDREN */}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Children
              </label>

              <Select
                value={String(booking.children)}
                onValueChange={(v) => setChildren(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {[0, 1, 2, 3].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "Child" : "Children"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* SEARCH BUTTON */}

            <div className="flex flex-col justify-end">
              <Button
                onClick={handleSearch}
                className="bg-gold text-charcoal hover:bg-gold-dark"
              >
                Search
              </Button>
            </div>
            {selectedRooms.length > 0 && (
              <div className="flex flex-col justify-end">
                <Button
                  onClick={handleClearSelection}
                  className="bg-gold text-charcoal hover:bg-gold-dark"
                >
                  Clear All Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}

        {searched && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              {hasDate ? "Available Rooms" : "Select dates to see pricing"}
            </h2>

            <p className="text-sm text-muted-foreground">
              {availableRooms.length} room types
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {availableRooms.map((room) => {
                const quantity = getRoomQuantity(room.id);
                const selected = isRoomSelected(room.id);

                const pricing = hasDate
                  ? calculateStayPrice(
                      room,
                      booking.checkIn!,
                      booking.checkOut!,
                    )
                  : null;

                return (
                  <div
                    key={room.id}
                    onClick={() => toggleRoomSelection(room.id, !selected)}
                    className={cn(
                      "flex flex-col sm:flex-row rounded-lg border bg-card overflow-hidden relative transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer group",
                      selected
                        ? "border-gold ring-1 ring-gold"
                        : "border-border/50",
                    )}
                  >
                    {/* HOVER CHECKBOX */}
                    <div
                      className={cn(
                        "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                        selected
                          ? "bg-gold border-gold"
                          : "border-gray-300 bg-white opacity-2 group-hover:opacity-100",
                      )}
                    >
                      {selected && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>

                    {/* IMAGE */}
                    <div className="relative sm:w-48 aspect-[4/3]">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 justify-between p-4">
                      {/* LEFT SIDE */}
                      <div>
                        <h3 className="text-lg font-bold">{room.name}</h3>

                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex gap-1 items-center">
                            <BedDouble className="size-3" /> {room.bedType}
                          </span>
                          <span className="flex gap-1 items-center">
                            <Users className="size-3" /> {room.maxAdults} guests
                          </span>
                          <span className="flex gap-1 items-center">
                            <Maximize className="size-3" /> {room.size} sqft
                          </span>
                        </div>

                        {room.featured && (
                          <Badge className="mt-2 text-xs">Popular Choice</Badge>
                        )}
                      </div>

                      {/* RIGHT SIDE (Pricing + Quantity) */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          {pricing ? (
                            <>
                              <p className="text-xl font-bold">
                                {formatCurrency(pricing.total, currency)}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {pricing.nights} nights
                              </span>
                            </>
                          ) : (
                            <>
                              <p className="text-xl font-bold">
                                {formatCurrency(room.basePrice, currency)}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                per night
                              </span>
                            </>
                          )}
                        </div>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={!selected || quantity === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoomQuantity(room.id, quantity - 1);
                            }}
                          >
                            -
                          </Button>

                          <span className="w-6 text-center">
                            {selected ? quantity : "-"}
                          </span>

                          <Button
                            size="icon"
                            variant="outline"
                            disabled={!selected}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateRoomQuantity(room.id, quantity + 1);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PROCEED BAR */}

            {totalTypes > 0 && (
              <div className="sticky bottom-6 mt-6 flex justify-between items-center rounded-lg border bg-card p-4 shadow">
                <span className="font-medium">
                  {totalRooms} room{totalRooms > 1 ? "s" : ""} across{" "}
                  {totalTypes} type{totalTypes > 1 ? "s" : ""}
                </span>

                <Link href="/booking/checkout">
                  <Button className="bg-gold text-charcoal hover:bg-gold-dark">
                    Proceed
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
