import { isWeekend } from "date-fns"
import type { Room } from "./data/rooms"
import { TAX_RATE, SERVICE_CHARGE_RATE, PROMO_CODES } from "./constants"

export function getPriceForDate(room: Room, date: Date): number {
  if (isHoliday(date)) return room.holidayPrice
  if (isWeekend(date)) return room.weekendPrice
  return room.basePrice
}

function isHoliday(date: Date): boolean {
  const holidays = [
    "01-01",
    "07-04",
    "12-25",
    "12-31",
  ]
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  return holidays.includes(mmdd)
}

export function calculateStayPrice(
  room: Room,
  checkIn: Date,
  checkOut: Date
): {
  nights: number
  pricePerNight: number[]
  subtotal: number
  tax: number
  serviceCharge: number
  total: number
  averagePerNight: number
} {
  const nights: number[] = []
  const current = new Date(checkIn)
  while (current < checkOut) {
    nights.push(getPriceForDate(room, current))
    current.setDate(current.getDate() + 1)
  }
  const subtotal = nights.reduce((a, b) => a + b, 0)
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const serviceCharge = Math.round(subtotal * SERVICE_CHARGE_RATE * 100) / 100
  const total = Math.round((subtotal + tax + serviceCharge) * 100) / 100
  const averagePerNight = nights.length > 0 ? Math.round(subtotal / nights.length) : 0

  return {
    nights: nights.length,
    pricePerNight: nights,
    subtotal,
    tax,
    serviceCharge,
    total,
    averagePerNight,
  }
}

export function applyPromoCode(
  code: string,
  subtotal: number
): { valid: boolean; discount: number; description: string } {
  const promo = PROMO_CODES[code.toUpperCase()]
  if (!promo) return { valid: false, discount: 0, description: "Invalid promo code" }

  const discount =
    promo.type === "percent"
      ? Math.round(subtotal * (promo.discount / 100) * 100) / 100
      : Math.min(promo.discount, subtotal)

  return { valid: true, discount, description: promo.description }
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear()
  const num = String(Math.floor(Math.random() * 999999)).padStart(6, "0")
  return `AUR-${year}-${num}`
}

export function checkRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date
): boolean {
  // Mock: always available
  void roomId
  void checkIn
  void checkOut
  return true
}

export const ADD_ONS = [
  { id: "breakfast", name: "Breakfast Package", price: 0, per: "per night" },
  { id: "airport", name: "Airport Transfer", price: 120, per: "one way" },
  
  { id: "baby-bed", name: "Baby Bed", price: 0, per: "complimentary" },
  { id: "late-checkout", name: "Late Checkout (2 PM)", price: 6.7, per: "one time" },
  { id: "pet", name: "Pet Accommodation", price: 50, per: "per night" },
] as const
