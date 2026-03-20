"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useBooking } from "@/contexts/booking-context";
import { useSite } from "@/contexts/site-context";
import { availableRooms as fetchAvailableRooms } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import BookingSummaryBar from "@/components/booking/BookingSummaryBar";
import SearchForm from "@/components/booking/SearchForm";
import RoomResultsList from "@/components/booking/RoomResultsList";

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

  return (
    <section className="bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-6">
        {/* 🔍 SEARCH BAR */}
        <SearchForm
          booking={booking}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setAdults={setAdults}
          setChildren={setChildren}
          handleSearch={handleSearch}
          loading={loading}
          handleClearSelection={handleClearSelection}
          rooms={rooms}
        />

        {/* RESULTS */}
        {(searched) && (
          <RoomResultsList
            roomsData={roomsData}
            currency={currency}
            getRoomQuantity={getRoomQuantity}
            updateRoomQuantity={updateRoomQuantity}
            toggleRoomSelection={toggleRoomSelection}
            isRoomSelected={isRoomSelected}
            hasDate={hasDate}
            totalTypes={totalTypes}
            totalRooms={totalRooms}
          />
        )}
      </div>
    </section>
  );
}
