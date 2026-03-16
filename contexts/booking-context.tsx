"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface SelectedRoom {
  roomId: string
  quantity: number
}

export interface BookingState {
  checkIn: Date | undefined
  checkOut: Date | undefined
  adults: number
  children: number

  selectedRooms: SelectedRoom[]

  addOns: string[]
  promoCode: string
  promoDiscount: number

  guestDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
    specialRequests: string
  }

  paymentMethod: "credit-card" | "pay-at-hotel"
}

interface BookingContextValue {
  booking: BookingState

  setCheckIn: (d: Date | undefined) => void
  setCheckOut: (d: Date | undefined) => void
  setAdults: (n: number) => void
  setChildren: (n: number) => void

  selectedRooms: SelectedRoom[]

  updateRoomQuantity: (roomId: string, quantity: number) => void
  getRoomQuantity: (roomId: string) => number

  isRoomSelected: (roomId: string) => boolean
  toggleRoomSelection: (roomId: string, checked: boolean) => void

  toggleAddOn: (id: string) => void
  setPromoCode: (code: string) => void
  setPromoDiscount: (d: number) => void
  setGuestDetails: (details: BookingState["guestDetails"]) => void
  setPaymentMethod: (m: BookingState["paymentMethod"]) => void

  resetBooking: () => void
}

const defaultBooking: BookingState = {
  checkIn: undefined,
  checkOut: undefined,
  adults: 2,
  children: 0,

  selectedRooms: [],

  addOns: [],
  promoCode: "",
  promoDiscount: 0,

  guestDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  },

  paymentMethod: "credit-card",
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(defaultBooking)

  const setCheckIn = (d: Date | undefined) =>
    setBooking((s) => ({ ...s, checkIn: d }))

  const setCheckOut = (d: Date | undefined) =>
    setBooking((s) => ({ ...s, checkOut: d }))

  const setAdults = (n: number) =>
    setBooking((s) => ({ ...s, adults: n }))

  const setChildren = (n: number) =>
    setBooking((s) => ({ ...s, children: n }))

  const updateRoomQuantity = (roomId: string, quantity: number) => {
    setBooking((s) => {
      const others = s.selectedRooms.filter((r) => r.roomId !== roomId)

      if (quantity <= 0) {
        return { ...s, selectedRooms: others }
      }

      return {
        ...s,
        selectedRooms: [...others, { roomId, quantity }],
      }
    })
  }

  const getRoomQuantity = (roomId: string) => {
    const found = booking.selectedRooms.find((r) => r.roomId === roomId)
    return found ? found.quantity : 0
  }

  const isRoomSelected = (roomId: string) => {
    return booking.selectedRooms.some((r) => r.roomId === roomId)
  }

  const toggleRoomSelection = (roomId: string, checked: boolean) => {
    setBooking((s) => {
      if (!checked) {
        return {
          ...s,
          selectedRooms: s.selectedRooms.filter((r) => r.roomId !== roomId),
        }
      }

      return {
        ...s,
        selectedRooms: [...s.selectedRooms, { roomId, quantity: 1 }],
      }
    })
  }

  const toggleAddOn = (id: string) =>
    setBooking((s) => ({
      ...s,
      addOns: s.addOns.includes(id)
        ? s.addOns.filter((a) => a !== id)
        : [...s.addOns, id],
    }))

  const setPromoCode = (code: string) =>
    setBooking((s) => ({ ...s, promoCode: code }))

  const setPromoDiscount = (d: number) =>
    setBooking((s) => ({ ...s, promoDiscount: d }))

  const setGuestDetails = (details: BookingState["guestDetails"]) =>
    setBooking((s) => ({ ...s, guestDetails: details }))

  const setPaymentMethod = (m: BookingState["paymentMethod"]) =>
    setBooking((s) => ({ ...s, paymentMethod: m }))

  const resetBooking = () => setBooking(defaultBooking)

  return (
    <BookingContext.Provider
      value={{
        booking,

        setCheckIn,
        setCheckOut,
        setAdults,
        setChildren,

        selectedRooms: booking.selectedRooms,

        updateRoomQuantity,
        getRoomQuantity,
        isRoomSelected,
        toggleRoomSelection,

        toggleAddOn,
        setPromoCode,
        setPromoDiscount,
        setGuestDetails,
        setPaymentMethod,

        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)

  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider")
  }

  return ctx
}