"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useBooking } from "@/contexts/booking-context";
import { useSite } from "@/contexts/site-context";
import {
  availableRooms as fetchAvailableRooms,
  validateBooking,
} from "@/lib/api";
import SearchForm from "@/components/booking/SearchForm";
import RoomResultsList from "@/components/booking/RoomResultsList";
import { toast } from "sonner";

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
  const checkValidity = async () => {
    try {
      const response = await validateBooking({
        check_in: format(booking.checkIn!, "yyyy-MM-dd"),
        check_out: format(booking.checkOut!, "yyyy-MM-dd"),
        adults: booking.adults,
        children: booking.children,
        rooms: rooms,
      });
      if (!response.valid && response.capacity_error) {
        toast.error(response.capacity_error);
      }
    } catch (err) {
      console.error("Booking validation failed:", err);
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
  const nights =
    booking.checkIn && booking.checkOut
      ? Math.ceil(
          (booking.checkOut.getTime() - booking.checkIn.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const totalBookingPrice = rooms.reduce((sum, selectedRoom) => {
    const room = roomsData.find(
      (r) => r.room_type_id === selectedRoom.room_type,
    );

    if (!room) return sum;

    return sum + Number(room.price) * selectedRoom.quantity * nights;
  }, 0);

  useEffect(() => {

    if (!booking.checkIn || !booking.checkOut || !booking.adults   || rooms.length === 0) return;

    const timer = setTimeout(() => {
      checkValidity();
    }, 800); // delay in ms

    return () => clearTimeout(timer);
  }, [
    booking.checkIn,
    booking.checkOut,
    booking.adults,
    booking.children,
    rooms,
  ]);
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
        {searched && (
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
            nights={nights}
            totalBookingPrice={totalBookingPrice}
          />
        )}
      </div>
    </section>
  );
}
