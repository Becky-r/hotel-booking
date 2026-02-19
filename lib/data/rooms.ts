export interface Room {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  bedType: string
  maxAdults: number
  maxChildren: number
  size: number
  floor: string
  view: string
  basePrice: number
  weekendPrice: number
  holidayPrice: number
  images: string[]
  amenities: string[]
  featured: boolean
  roomNumbers: string[]
}

export const rooms: Room[] = [
  {
    id: "1",
    slug: "standard-room",
    name: "Standard Room",
    shortDescription: "A refined retreat with every modern comfort for the discerning traveler.",
    description:
      "Our Standard Room offers an elegant sanctuary with carefully curated furnishings, premium linens, and thoughtful amenities. Floor-to-ceiling windows bathe the room in natural light, while the marble bathroom features a rain shower and luxury bath products. Perfect for solo travelers or couples seeking comfort without compromise.",
    bedType: "Queen",
    maxAdults: 2,
    maxChildren: 1,
    size: 350,
    floor: "3rd - 5th",
    view: "City View",
    basePrice: 299,
    weekendPrice: 349,
    holidayPrice: 449,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Mini Bar",
      "Flat-screen TV",
      "Rain Shower",
      "Safe Box",
      "Room Service",
      "Daily Housekeeping",
    ],
    featured: false,
    roomNumbers: ["301", "302", "401", "402", "501", "502"],
  },
  {
    id: "2",
    slug: "superior-room",
    name: "Superior Room",
    shortDescription: "Generous space and premium appointments for an elevated experience.",
    description:
      "Step into our Superior Room and discover a spacious haven of refined luxury. Featuring a king-size bed dressed in Egyptian cotton, a separate seating area, and a bathroom with both rain shower and soaking tub. The room's warm palette and bespoke furniture create an atmosphere of quiet sophistication that makes every stay memorable.",
    bedType: "King",
    maxAdults: 2,
    maxChildren: 2,
    size: 450,
    floor: "5th - 8th",
    view: "Garden View",
    basePrice: 429,
    weekendPrice: 499,
    holidayPrice: 599,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Mini Bar",
      "Flat-screen TV",
      "Rain Shower",
      "Soaking Tub",
      "Safe Box",
      "Room Service",
      "Nespresso Machine",
      "Bathrobe & Slippers",
      "Daily Housekeeping",
    ],
    featured: true,
    roomNumbers: ["503", "601", "602", "701", "702", "801"],
  },
  {
    id: "3",
    slug: "deluxe-room",
    name: "Deluxe Room",
    shortDescription: "A lavish escape with panoramic views and bespoke luxury details.",
    description:
      "Our Deluxe Room redefines luxury with its expansive layout, floor-to-ceiling windows offering panoramic city views, and a private balcony for morning coffee or evening aperitifs. The oversized bathroom features Italian marble, dual vanities, a freestanding tub, and a walk-in rain shower. Every element has been thoughtfully selected to create an unforgettable experience.",
    bedType: "King",
    maxAdults: 2,
    maxChildren: 2,
    size: 550,
    floor: "8th - 12th",
    view: "Panoramic City View",
    basePrice: 579,
    weekendPrice: 679,
    holidayPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Mini Bar",
      "55\" Smart TV",
      "Rain Shower",
      "Freestanding Tub",
      "Private Balcony",
      "Safe Box",
      "24/7 Room Service",
      "Nespresso Machine",
      "Bathrobe & Slippers",
      "Turndown Service",
      "Daily Housekeeping",
    ],
    featured: true,
    roomNumbers: ["802", "901", "902", "1001", "1002", "1101", "1102", "1201"],
  },
  {
    id: "4",
    slug: "junior-suite",
    name: "Junior Suite",
    shortDescription: "Elegant living spaces with a distinct lounge area for relaxed luxury.",
    description:
      "The Junior Suite blends residential comfort with hotel luxury, featuring a generous bedroom complemented by a distinct living area with plush seating. A walk-in closet, executive work desk, and premium entertainment system cater to every need. The marble bathroom with dual rain showers and a deep soaking tub provides the perfect retreat after a day of exploration.",
    bedType: "King",
    maxAdults: 3,
    maxChildren: 2,
    size: 700,
    floor: "10th - 15th",
    view: "River & City View",
    basePrice: 799,
    weekendPrice: 929,
    holidayPrice: 1099,
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=1200&q=80",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Premium Mini Bar",
      "55\" Smart TV",
      "Living Area",
      "Walk-in Closet",
      "Dual Rain Shower",
      "Deep Soaking Tub",
      "Private Balcony",
      "Safe Box",
      "24/7 Room Service",
      "Nespresso Machine",
      "Bathrobe & Slippers",
      "Turndown Service",
      "Daily Housekeeping",
      "Executive Desk",
    ],
    featured: true,
    roomNumbers: ["1003", "1103", "1203", "1301", "1401", "1501"],
  },
  {
    id: "5",
    slug: "executive-suite",
    name: "Executive Suite",
    shortDescription: "Commanding views and separate living quarters for the ultimate indulgence.",
    description:
      "Our Executive Suite offers a truly exceptional experience with separate bedroom and living quarters connected by elegant French doors. The suite features a dining area seating four, a fully stocked bar, and a wraparound terrace with sweeping city views. Two opulent bathrooms feature heated floors, rain showers, and freestanding tubs. Butler service ensures every wish is anticipated.",
    bedType: "King",
    maxAdults: 3,
    maxChildren: 2,
    size: 1000,
    floor: "15th - 18th",
    view: "Skyline Panorama",
    basePrice: 1299,
    weekendPrice: 1499,
    holidayPrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80",
    ],
    amenities: [
      "Free Wi-Fi",
      "Climate Control",
      "Premium Mini Bar",
      "65\" Smart TV",
      "Separate Living Room",
      "Dining Area",
      "Walk-in Closet",
      "Dual Bathrooms",
      "Rain Shower",
      "Freestanding Tub",
      "Wraparound Terrace",
      "Safe Box",
      "24/7 Butler Service",
      "Espresso Machine",
      "Premium Bathrobe & Slippers",
      "Turndown Service",
      "Daily Housekeeping",
      "Heated Bathroom Floors",
    ],
    featured: false,
    roomNumbers: ["1502", "1601", "1701", "1801"],
  },
  {
    id: "6",
    slug: "presidential-suite",
    name: "Presidential Suite",
    shortDescription: "The pinnacle of luxury - a private residence in the sky.",
    description:
      "The Presidential Suite is the crown jewel of The Aurelian, occupying the entire top floor with 360-degree views of the city skyline. This private residence features a grand salon, formal dining room for eight, a private study, master bedroom with custom furnishings, and two additional guest bedrooms. The master bathroom is a sanctuary of Italian marble with a steam room, rain shower, and Japanese soaking tub. Dedicated butler and concierge services ensure an experience beyond compare.",
    bedType: "Super King",
    maxAdults: 4,
    maxChildren: 3,
    size: 2500,
    floor: "20th (Penthouse)",
    view: "360\u00B0 Skyline",
    basePrice: 3999,
    weekendPrice: 4499,
    holidayPrice: 5499,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
    ],
    amenities: [
      "Premium Wi-Fi",
      "Climate Control",
      "Full Bar",
      "75\" Smart TV + Home Theater",
      "Grand Salon",
      "Formal Dining Room",
      "Private Study",
      "3 Bedrooms",
      "Walk-in Closets",
      "Master Bathroom with Steam Room",
      "Japanese Soaking Tub",
      "Rain Shower",
      "Private Terrace",
      "Safe Room",
      "24/7 Dedicated Butler",
      "Private Chef Available",
      "Espresso Machine",
      "Premium Robes & Slippers",
      "Nightly Turndown",
      "Daily Housekeeping",
      "Heated Floors Throughout",
      "Baby Grand Piano",
    ],
    featured: true,
    roomNumbers: ["PH-01"],
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}

export function getFeaturedRooms(): Room[] {
  return rooms.filter((room) => room.featured)
}
