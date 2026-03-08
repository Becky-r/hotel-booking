export interface Offer {
  id: string
  title: string
  subtitle: string
  description: string
  discount: string
  promoCode: string
  validUntil: string
  image: string
  terms: string[]
  featured: boolean
}

export const offers: Offer[] = [
  {
    id: "1",
    title: "Early Bird Special",
    subtitle: "Book 30 days ahead and save",
    description:
      "Plan ahead and enjoy exceptional savings. Book your stay at least 30 days in advance and receive a generous discount on our best available rates. Includes complimentary breakfast and late checkout.",
    discount: "Up to 25% Off",
    promoCode: "EARLYBIRD",
    validUntil: "2026-06-30",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0358.JPG?updatedAt=1772726928003",
    terms: [
      "Must be booked at least 30 days before arrival",
      "Non-refundable after booking",
      "Subject to availability",
      "Cannot be combined with other offers",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "Summer Escape",
    subtitle: "Your sun-drenched luxury getaway",
    description:
      "Make this summer unforgettable with our exclusive Summer Escape package. Enjoy our rooftop infinity pool, complimentary spa treatment for two, and daily breakfast overlooking the city. The perfect blend of relaxation and adventure.",
    discount: "25% Off + Spa Credit",
    promoCode: "SUMMER25",
    validUntil: "2026-09-15",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8113.JPG",
    terms: [
      "Valid for stays between June 1 and September 15",
      "Minimum 3-night stay required",
      "Spa credit of $150 per booking",
      "Subject to availability",
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Romance Package",
    subtitle: "Celebrate love in unparalleled style",
    description:
      "Create moments that last a lifetime with our Romance Package. Arrive to a room adorned with rose petals and chilled champagne. Enjoy a private candlelit dinner at Le Dore, couples spa treatment, and a late checkout to savor every moment together.",
    discount: "From $799 per night",
    promoCode: "WELCOME10",
    validUntil: "2026-12-31",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0182.JPG?updatedAt=1772726826423",
    terms: [
      "Minimum 2-night stay required",
      "Includes dinner for two at Le Dore",
      "Champagne and roses on arrival",
      "Subject to availability",
    ],
    featured: true,
  },
  {
    id: "4",
    title: "Extended Stay",
    subtitle: "Stay longer, save more",
    description:
      "For those who wish to linger, our Extended Stay offer provides exceptional value. Stay seven nights or more and enjoy a reduced nightly rate, daily breakfast, weekly laundry service, and complimentary airport transfers.",
    discount: "30% Off (7+ Nights)",
    promoCode: "LUXURY100",
    validUntil: "2026-12-31",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9901.JPG?updatedAt=1772727135494",
    terms: [
      "Minimum 7-night stay required",
      "Full prepayment at time of booking",
      "Includes daily breakfast and airport transfer",
      "Subject to availability",
    ],
    featured: false,
  },
  {
    id: "5",
    title: "Weekend Retreat",
    subtitle: "A luxury weekend in the city of lights",
    description:
      "Escape the routine with our curated Weekend Retreat. Arrive Friday and enjoy two nights of luxury including a champagne welcome, Saturday brunch, and a guided private tour of the city's hidden gems.",
    discount: "15% Off Weekends",
    promoCode: "WELCOME10",
    validUntil: "2026-12-31",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8092.JPG",
    terms: [
      "Valid for Friday-Sunday stays only",
      "Includes Saturday brunch",
      "Private city tour included",
      "Subject to availability",
    ],
    featured: false,
  },
]

export function getFeaturedOffers(): Offer[] {
  return offers.filter((o) => o.featured)
}
