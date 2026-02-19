export interface Amenity {
  id: string
  name: string
  shortDescription: string
  description: string
  icon: string
  image: string
  category: "wellness" | "dining" | "leisure" | "services"
}

export const amenities: Amenity[] = [
  {
    id: "spa",
    name: "The Aurelian Spa",
    shortDescription: "A sanctuary of rejuvenation and tranquility.",
    description:
      "Surrender to the healing hands of our expert therapists. Our spa features a thermal suite with steam rooms, sauna, and vitality pool. Choose from signature treatments inspired by ancient healing traditions, using only the finest organic products.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    category: "wellness",
  },
  {
    id: "pool",
    name: "Infinity Pool & Terrace",
    shortDescription: "A rooftop oasis with breathtaking city views.",
    description:
      "Our heated rooftop infinity pool offers panoramic city views from the 19th floor. Surrounded by private cabanas and loungers, it is the perfect place to unwind. Poolside dining and signature cocktails are available throughout the day.",
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    category: "leisure",
  },
  {
    id: "restaurant",
    name: "Le Doré Restaurant",
    shortDescription: "Fine dining that celebrates seasonal, local ingredients.",
    description:
      "Under the direction of our Michelin-starred chef, Le Doré offers an exquisite culinary journey. The menu changes with the seasons, showcasing the finest local and imported ingredients. An extensive wine cellar with over 500 labels complements every dish.",
    icon: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "dining",
  },
  {
    id: "bar",
    name: "The Gold Bar",
    shortDescription: "Craft cocktails in an atmosphere of refined elegance.",
    description:
      "Step into The Gold Bar, where master mixologists craft bespoke cocktails using rare spirits and artisanal ingredients. The intimate Art Deco setting with live jazz creates an unforgettable evening experience. Enjoy our signature collection or let our team create something uniquely yours.",
    icon: "Wine",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    category: "dining",
  },
  {
    id: "gym",
    name: "Fitness Center",
    shortDescription: "State-of-the-art equipment with personal trainers.",
    description:
      "Our 24-hour fitness center features the latest Technogym equipment, a dedicated yoga and Pilates studio, and personal trainers available by appointment. Complimentary fresh juices and smoothies are provided to keep you energized.",
    icon: "Dumbbell",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    category: "wellness",
  },
  {
    id: "concierge",
    name: "Concierge Services",
    shortDescription: "Your personal guide to extraordinary experiences.",
    description:
      "Our dedicated concierge team is available around the clock to curate bespoke experiences. From securing reservations at the city's finest restaurants to arranging private tours, helicopter transfers, and exclusive event access, no request is beyond our reach.",
    icon: "Concierge",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    category: "services",
  },
  {
    id: "business",
    name: "Business Center",
    shortDescription: "Fully equipped meeting and conference facilities.",
    description:
      "Three elegantly appointed meeting rooms with the latest audiovisual technology, high-speed internet, and secretarial services. Whether hosting an intimate board meeting or a grand reception, our events team ensures flawless execution.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    category: "services",
  },
  {
    id: "transfer",
    name: "Airport Transfer",
    shortDescription: "Luxury chauffeur service from door to door.",
    description:
      "Begin your experience from the moment you land. Our fleet of luxury vehicles and professional chauffeurs provide seamless airport transfers, city tours, and private transportation throughout your stay.",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80",
    category: "services",
  },
]

export function getAmenitiesByCategory(category: Amenity["category"]): Amenity[] {
  return amenities.filter((a) => a.category === category)
}
