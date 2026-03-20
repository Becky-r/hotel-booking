"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarDays, Users, ArrowRight } from "lucide-react";

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

import { useBooking } from "@/contexts/booking-context";
import { useSite } from "@/contexts/site-context";
import { availableRooms as fetchAvailableRooms } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BookingSearch() {
  const {
    booking,
    setCheckIn,
    setCheckOut,
    setAdults,
    setChildren,
    rooms,
    getRoomQuantity,
    updateRoomQuantity,
    toggleRoomSelection,
    isRoomSelected,
  } = useBooking();

  const { currency } = useSite();

  const [searched, setSearched] = useState(false);
  const [roomsData, setRoomsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const hasDate = booking.checkIn && booking.checkOut;

  // 🔍 SEARCH API CALL
  const handleSearch = async () => {
    if (!booking.checkIn || !booking.checkOut) return;
    if (booking.checkOut <= booking.checkIn) return;

    setLoading(true);

    try {
      const data = await fetchAvailableRooms({
        check_in: format(booking.checkIn, "yyyy-MM-dd"),
        check_out: format(booking.checkOut, "yyyy-MM-dd"),
        adults: booking.adults,
        children: booking.children,
      });
      console.log(data);

      setRoomsData(data);
      setSearched(true);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalRooms = rooms.reduce((sum, r) => sum + r.quantity, 0);
  const totalTypes = rooms.length;

  const handleClearSelection = () => {
    rooms.forEach((r) => updateRoomQuantity(r.room_type, 0));
    setSearched(false);
    setCheckIn(undefined);
    setCheckOut(undefined);
    setAdults(1);
    setChildren(0);
  };
  useEffect(() => {
    handleSearch();
  }, [booking.checkIn, booking.checkOut, booking.adults, booking.children]);
  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        {/* 🔍 SEARCH BAR */}
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
                disabled={loading}
                className="bg-gold text-charcoal hover:bg-gold-dark"
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>

            {rooms.length > 0 && (
              <div className="flex flex-col justify-end">
                <Button
                  onClick={handleClearSelection}
                  className="bg-gold text-charcoal hover:bg-gold-dark"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}
        {searched && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              {hasDate ? "Available Rooms" : "Select dates"}
            </h2>

            <p className="text-sm text-muted-foreground">
              {roomsData.length} room types
            </p>

            <div className="mt-6 flex flex-col gap-5">
              {roomsData.map((room) => {
                const quantity = getRoomQuantity(room.room_type_id);
                const selected = isRoomSelected(room.room_type_id);

                const imageUrl =
                  room.images?.[0]?.image ||
                  "https://blocks.astratic.com/img/general-img-landscape.png";

                return (
                  <div
                    key={room.room_type_id}
                    onClick={() =>
                      toggleRoomSelection(room.room_type_id, !selected)
                    }
                    className={cn(
                      "flex flex-col sm:flex-row overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg cursor-pointer group",
                      selected ? "ring-1 ring-gold" : "border-border/50",
                    )}
                  >
                    {/* IMAGE */}
                    <div className="relative sm:w-56 h-44 sm:h-auto overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 justify-between p-4 items-center">
                      {/* LEFT SIDE */}
                      <div>
                        <h3 className="text-lg font-bold">{room.name}</h3>

                        <div className="text-sm text-muted-foreground mt-2 space-y-1">
                          <p className="flex items-center gap-1">
                            <Users className="size-3" />
                            {room.capacity} guests
                          </p>

                          <p>
                            Available:{" "}
                            <span className="font-medium">
                              {room.available_rooms}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex flex-col items-end gap-3">
                        {/* PRICE */}
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            {formatCurrency(room.price, currency)}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            per night
                          </span>
                        </div>

                        {/* QUANTITY + SELECT CIRCLE */}
                        <div className="flex items-center gap-3">
                          {/* QUANTITY */}
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              disabled={!selected || quantity === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRoomQuantity(
                                  room.room_type_id,
                                  quantity - 1,
                                );
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
                              disabled={
                                !selected || quantity >= room.available_rooms
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRoomQuantity(
                                  room.room_type_id,
                                  quantity + 1,
                                );
                              }}
                            >
                              +
                            </Button>
                          </div>

                          {/* CIRCULAR SELECT */}
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition",
                              selected
                                ? "bg-gold border-gold"
                                : "bg-white border-gray-300",
                            )}
                          >
                            {selected && (
                              <div className="w-3 h-3 rounded-full bg-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 🚀 PROCEED */}
            {totalTypes > 0 && (
              <div className="sticky bottom-6 mt-6 flex justify-between items-center border rounded-lg p-4 bg-card shadow">
                <span>
                  {totalRooms} room{totalRooms > 1 && "s"} across {totalTypes}{" "}
                  type{totalTypes > 1 && "s"}
                </span>

                <Link href="/booking/checkout">
                  <Button className="bg-gold text-charcoal hover:bg-gold-dark">
                    Proceed <ArrowRight className="ml-2 size-4" />
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
