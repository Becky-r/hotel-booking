"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/* =========================
   TYPES
========================= */

export interface SelectedRoom {
  room_type: number;
  quantity: number;
}

export interface BookingState {
  checkIn?: Date;
  checkOut?: Date;
  adults: number;
  children: number;

  rooms: SelectedRoom[];

  services: number[];

  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  company?: string;
  tin_number?: string;
  package_user_amount?: string;
}

interface BookingContextValue {
  booking: BookingState;

  setCheckIn: (d?: Date) => void;
  setCheckOut: (d?: Date) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;

  rooms: SelectedRoom[];
  isRoomSelected: (room_type: number) => boolean;
  updateRoomQuantity: (room_type: number, quantity: number) => void;
  getRoomQuantity: (room_type: number) => number;
  toggleRoomSelection: (room_type: number, checked: boolean) => void;

  toggleService: (id: number) => void;
  setBooking: (booking: BookingState) => void;
  setGuestDetails: (details: BookingState["guestDetails"]) => void;

  resetBooking: () => void;
}

/* =========================
   DEFAULT STATE
========================= */

const defaultBooking: BookingState = {
  checkIn: undefined,
  checkOut: undefined,
  adults: 2,
  children: 0,

  rooms: [],
  services: [],

  guestDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  company: "",
  tin_number: "",
  package_user_amount: "",
};

/* =========================
   CONTEXT
========================= */

const BookingContext = createContext<BookingContextValue | null>(null);

/* =========================
   PROVIDER
========================= */

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultBooking);

  /* ---------- BASIC SETTERS ---------- */

  const setCheckIn = (d?: Date) => setBooking((s) => ({ ...s, checkIn: d }));

  const setCheckOut = (d?: Date) => setBooking((s) => ({ ...s, checkOut: d }));

  const setAdults = (n: number) => setBooking((s) => ({ ...s, adults: n }));

  const setChildren = (n: number) => setBooking((s) => ({ ...s, children: n }));

  /* ---------- ROOMS ---------- */

  const isRoomSelected = (room_type: number) => {
    return booking.rooms.some((r) => r.room_type === room_type);
  };

  const updateRoomQuantity = (room_type: number, quantity: number) => {
    setBooking((s) => {
      const others = s.rooms.filter((r) => r.room_type !== room_type);

      if (quantity <= 0) {
        return { ...s, rooms: others };
      }

      return {
        ...s,
        rooms: [...others, { room_type, quantity }],
      };
    });
  };

  const getRoomQuantity = (room_type: number) => {
    const found = booking.rooms.find((r) => r.room_type === room_type);
    return found ? found.quantity : 0;
  };

  const toggleRoomSelection = (room_type: number, checked: boolean) => {
    setBooking((s) => {
      if (!checked) {
        return {
          ...s,
          rooms: s.rooms.filter((r) => r.room_type !== room_type),
        };
      }

      return {
        ...s,
        rooms: [...s.rooms, { room_type, quantity: 1 }],
      };
    });
  };

  /* ---------- SERVICES ---------- */

  const toggleService = (id: number) =>
    setBooking((s) => ({
      ...s,
      services: s.services.includes(id)
        ? s.services.filter((x) => x !== id)
        : [...s.services, id],
    }));

  /* ---------- GUEST ---------- */

  const setGuestDetails = (details: BookingState["guestDetails"]) =>
    setBooking((s) => ({ ...s, guestDetails: details }));
 
 
  // reset 

  const resetBooking = () => setBooking(defaultBooking);

  /* ========================= */

  return (
    <BookingContext.Provider
      value={{
        booking,
        setCheckIn,
        setCheckOut,
        setAdults,
        setChildren,
        rooms: booking.rooms,
        isRoomSelected,
        updateRoomQuantity,
        getRoomQuantity,
        toggleRoomSelection,
        toggleService,
        setGuestDetails,
        setBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// hook

export function useBooking() {
  const ctx = useContext(BookingContext);

  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return ctx;
}
