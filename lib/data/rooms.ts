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
    basePrice: 22,
    
    images: [

      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9747.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9743.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9738.JPG?updatedAt=1772686426594",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9742.JPG?updatedAt=1772686452822",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9744.JPG",

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
    roomNumbers: ["301", "302", "401", "402", "501", "502","786","454","422", "452", "123", "978", "345", "562","978","345"],
  },
  {
    id: "2",
    slug: "deluxe-room",
    name: "Deluxe Room",
    shortDescription: "Generous space and premium appointments for an elevated experience.",
    description:
      "Step into our Deluxe Room and discover a spacious haven of refined luxury. Featuring a king-size bed dressed in Egyptian cotton, a separate seating area, and a bathroom with both rain shower and soaking tub. The room's warm palette and bespoke furniture create an atmosphere of quiet sophistication that makes every stay memorable.",
    bedType: "King",
    maxAdults: 2,
    maxChildren: 2,
    size: 450,
    floor: "5th - 8th",
    view: "Garden View",
    basePrice: 25,
    
    images: [

      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9753.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9749.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9785.JPG",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Private Balcony",
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
    slug: "twine-room",
    name: "Twine Room",
    shortDescription: "A lavish escape with panoramic views and bespoke luxury details.",
    description:
      "Our Twine Room redefines luxury with its expansive layout, floor-to-ceiling windows offering panoramic city views, and a private balcony for morning coffee or evening aperitifs. The oversized bathroom features Italian marble, dual vanities, a freestanding tub, and a walk-in rain shower. Every element has been thoughtfully selected to create an unforgettable experience.",
    bedType: "King",
    maxAdults: 2,
    maxChildren: 2,
    size: 550,
    floor: "8th - 12th",
    view: "Panoramic City View",
    basePrice: 26,
    
    images: [

      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9824.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9827.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9828.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9787.JPG?updatedAt=1772686457680",
    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      
      " Smart TV",
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
    roomNumbers: ["802", "901"],
  },
  {
    id: "4",
    slug: "business-suite",
    name: "Business Suite",
    shortDescription: "Elegant living spaces with a distinct lounge area for relaxed luxury.",
    description:
      "The Business Suite blends residential comfort with hotel luxury, featuring a generous bedroom complemented by a distinct living area with plush seating. A walk-in closet, executive work desk, and premium entertainment system cater to every need. The marble bathroom with dual rain showers and a deep soaking tub provides the perfect retreat after a day of exploration.",
    bedType: "King",
    maxAdults: 3,
    maxChildren: 2,
    size: 700,
    floor: "10th - 15th",
    view: "River & City View",
    basePrice: 30,
    
    images: [
"https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9812.JPG",
      
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9820.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9802.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9814.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9821.JPG",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9803.JPG",

    ],
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      
      " Smart TV",
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
    roomNumbers: ["1003", "1103", "1203", "1301", "1401", "1501","1003", "1103", "1203", "1301", "1401"],
  },
  {
    id: "5",
    slug: "executive-suite",
    name: "Executive Suite",
    shortDescription: "Commanding views and separate living quarters for the ultimate indulgence.",
    description:
      "Our Executive Suite offers a truly exceptional experience with separate bedroom and living quarters connected by elegant French doors. The suite features a dining area seating four, a fully stocked bar, and a wraparound terrace with sweeping city views. Two opulent bathrooms feature heated floors, rain showers, and freestanding tubs. Butler service ensures every wish is anticipated.",
    bedType: "King",
    maxAdults: 2,
    maxChildren: 1,
    size: 1000,
    floor: "5th - 6th",
    view: "Skyline Panorama",
    basePrice: 33,
  
    images: [

      "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8127.JPG?updatedAt=1772962012963",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8135.JPG?updatedAt=1772962010487",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8132.JPG?updatedAt=1772962013638",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8136.JPG?updatedAt=1772962010060",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9717.JPG?updatedAt=1772686417599",

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
    roomNumbers: ["1502", "1601", "1701", "1801","1502", "1601", "1701", "1801","1502", "1601"],
  },
  {
    id: "6",
    slug: "Family-suite",
    name: "Family Suite",
    shortDescription: "The pinnacle of luxury - a private residence in the sky.",
    description:
      "The Family Suite is the crown jewel of The Aurelian, occupying the entire top floor with 360-degree views of the city skyline. This private residence features a grand salon, formal dining room for eight, a private study, master bedroom with custom furnishings, and two additional guest bedrooms. The master bathroom is a sanctuary of Italian marble with a steam room, rain shower, and Japanese soaking tub. Dedicated butler and concierge services ensure an experience beyond compare.",
    bedType: "Super King",
    maxAdults: 4,
    maxChildren: 2,
    size: 2500,
    floor: "20th (Penthouse)",
    view: "360\u00B0 Skyline",
    basePrice: 60,
    
    images: [
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9708.JPG?updatedAt=1772686423581",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9702.JPG?updatedAt=1772686421608",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8121.JPG?updatedAt=1772962012358",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9726.JPG?updatedAt=1772686410084",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9724.JPG?updatedAt=1772686399888",
      "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9716.JPG?updatedAt=1772686426414",

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
