export interface Booking {
  id: string
  reference: string
  guestName: string
  guestEmail: string
  guestPhone: string
  roomType: string
  roomSlug: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  nights: number
  pricePerNight: number
  subtotal: number
  tax: number
  serviceCharge: number
  total: number
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled"
  paymentMethod: string
  specialRequests: string
  addOns: string[]
  createdAt: string
}

export const mockBookings: Booking[] = [
  {
    id: "1",
    reference: "AUR-2026-001247",
    guestName: "James Whitmore",
    guestEmail: "james@example.com",
    guestPhone: "+44 20 7946 0958",
    roomType: "Executive Suite",
    roomSlug: "executive-suite",
    checkIn: "2026-03-15",
    checkOut: "2026-03-19",
    adults: 2,
    children: 0,
    nights: 4,
    pricePerNight: 1299,
    subtotal: 5196,
    tax: 623.52,
    serviceCharge: 259.80,
    total: 6079.32,
    status: "confirmed",
    paymentMethod: "Credit Card",
    specialRequests: "Late check-in after 10 PM. Extra pillows please.",
    addOns: ["Airport Transfer", "Breakfast Package"],
    createdAt: "2026-01-20",
  },
  {
    id: "2",
    reference: "AUR-2025-008934",
    guestName: "James Whitmore",
    guestEmail: "james@example.com",
    guestPhone: "+44 20 7946 0958",
    roomType: "Deluxe Room",
    roomSlug: "deluxe-room",
    checkIn: "2025-11-10",
    checkOut: "2025-11-14",
    adults: 2,
    children: 0,
    nights: 4,
    pricePerNight: 579,
    subtotal: 2316,
    tax: 277.92,
    serviceCharge: 115.80,
    total: 2709.72,
    status: "checked-out",
    paymentMethod: "Credit Card",
    specialRequests: "",
    addOns: ["Breakfast Package"],
    createdAt: "2025-10-01",
  },
  {
    id: "3",
    reference: "AUR-2025-006721",
    guestName: "James Whitmore",
    guestEmail: "james@example.com",
    guestPhone: "+44 20 7946 0958",
    roomType: "Junior Suite",
    roomSlug: "junior-suite",
    checkIn: "2025-08-20",
    checkOut: "2025-08-23",
    adults: 2,
    children: 1,
    nights: 3,
    pricePerNight: 799,
    subtotal: 2397,
    tax: 287.64,
    serviceCharge: 119.85,
    total: 2804.49,
    status: "checked-out",
    paymentMethod: "Pay at Hotel",
    specialRequests: "Baby bed required.",
    addOns: ["Baby Bed", "Breakfast Package", "Spa Package"],
    createdAt: "2025-07-15",
  },
]
