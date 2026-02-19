export interface Review {
  id: string
  guestName: string
  guestCountry: string
  rating: number
  title: string
  content: string
  date: string
  roomType: string
  avatar: string
  stayType: "business" | "leisure" | "family" | "couple"
  verified: boolean
}

export const reviews: Review[] = [
  {
    id: "1",
    guestName: "James Whitmore",
    guestCountry: "United Kingdom",
    rating: 5,
    title: "Absolutely impeccable from start to finish",
    content:
      "The Aurelian exceeded every expectation. From the moment we arrived, the staff made us feel like royalty. The Executive Suite was breathtaking with stunning views, and the attention to detail was extraordinary. Le Dore restaurant served one of the finest meals I have ever enjoyed. We will be returning without question.",
    date: "2025-12-15",
    roomType: "Executive Suite",
    avatar: "JW",
    stayType: "couple",
    verified: true,
  },
  {
    id: "2",
    guestName: "Sophie Laurent",
    guestCountry: "France",
    rating: 5,
    title: "A true Parisian gem",
    content:
      "Being a Parisian myself, I have high standards for hospitality. The Aurelian met them all. The spa treatments were heavenly, and the rooftop pool at sunset is an experience I recommend to everyone. The Junior Suite was spacious and beautifully appointed.",
    date: "2025-11-28",
    roomType: "Junior Suite",
    avatar: "SL",
    stayType: "leisure",
    verified: true,
  },
  {
    id: "3",
    guestName: "Marcus Chen",
    guestCountry: "United States",
    rating: 5,
    title: "Business travel perfection",
    content:
      "I travel extensively for work, and The Aurelian has become my go-to in Paris. The business center is world-class, the Wi-Fi is lightning fast, and the concierge team arranged everything I needed for my conference seamlessly. The Deluxe Room is my new standard.",
    date: "2025-11-10",
    roomType: "Deluxe Room",
    avatar: "MC",
    stayType: "business",
    verified: true,
  },
  {
    id: "4",
    guestName: "Elena Rossi",
    guestCountry: "Italy",
    rating: 4,
    title: "Elegant and memorable stay",
    content:
      "We stayed for our anniversary and the hotel pulled out all the stops. Rose petals, champagne, and a handwritten card awaited us. The only minor note is that the pool area was a bit crowded on weekends. Otherwise, a truly magical experience.",
    date: "2025-10-22",
    roomType: "Superior Room",
    avatar: "ER",
    stayType: "couple",
    verified: true,
  },
  {
    id: "5",
    guestName: "Ahmad Al-Rashid",
    guestCountry: "United Arab Emirates",
    rating: 5,
    title: "Unrivaled luxury and service",
    content:
      "The Presidential Suite is nothing short of spectacular. The private butler service was exceptional, anticipating our every need. The formal dining room was perfect for hosting friends. This is luxury hospitality at its absolute finest.",
    date: "2025-10-05",
    roomType: "Presidential Suite",
    avatar: "AA",
    stayType: "family",
    verified: true,
  },
  {
    id: "6",
    guestName: "Hannah Weber",
    guestCountry: "Germany",
    rating: 5,
    title: "A sanctuary in the city",
    content:
      "After a long business trip across Europe, arriving at The Aurelian felt like coming home. The spa is extraordinary. I had the signature hot stone treatment and felt completely renewed. The restaurant's seasonal tasting menu was a highlight of my entire trip.",
    date: "2025-09-18",
    roomType: "Deluxe Room",
    avatar: "HW",
    stayType: "business",
    verified: true,
  },
  {
    id: "7",
    guestName: "Carlos Mendez",
    guestCountry: "Spain",
    rating: 4,
    title: "Family-friendly luxury at its best",
    content:
      "Traveling with three children can be challenging, but The Aurelian made it effortless. The kids loved the pool, and the concierge arranged a wonderful family tour of the city. The Junior Suite gave us plenty of space. A truly wonderful family holiday.",
    date: "2025-09-01",
    roomType: "Junior Suite",
    avatar: "CM",
    stayType: "family",
    verified: true,
  },
  {
    id: "8",
    guestName: "Yuki Tanaka",
    guestCountry: "Japan",
    rating: 5,
    title: "Perfection in every detail",
    content:
      "The Japanese soaking tub in the Presidential Suite was a wonderful touch that reminded me of home. The attention to detail throughout the hotel is remarkable. From the fresh flowers in every corridor to the perfectly pressed linen, nothing is overlooked. A masterclass in hospitality.",
    date: "2025-08-14",
    roomType: "Presidential Suite",
    avatar: "YT",
    stayType: "leisure",
    verified: true,
  },
  {
    id: "9",
    guestName: "Isabella Costa",
    guestCountry: "Brazil",
    rating: 5,
    title: "The Gold Bar alone is worth the visit",
    content:
      "While every aspect of our stay was exceptional, The Gold Bar deserves special mention. The cocktails are works of art, and the live jazz created the most romantic atmosphere. We ended every evening there. The Superior Room was also beautiful and incredibly comfortable.",
    date: "2025-07-30",
    roomType: "Superior Room",
    avatar: "IC",
    stayType: "couple",
    verified: true,
  },
  {
    id: "10",
    guestName: "David Anderson",
    guestCountry: "Australia",
    rating: 5,
    title: "Worth every penny",
    content:
      "We splurged on the Executive Suite for our honeymoon and it was the best decision we made. The wraparound terrace at sunset, the butler service, the incredible breakfast spread. Everything was perfect. We are already planning our return trip.",
    date: "2025-07-12",
    roomType: "Executive Suite",
    avatar: "DA",
    stayType: "couple",
    verified: true,
  },
]

export function getAverageRating(): number {
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / reviews.length) * 10) / 10
}
