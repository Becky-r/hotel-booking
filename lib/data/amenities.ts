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

  
    id: "Terrace",
    name: "Terrace",

    shortDescription: "A rooftop oasis with breathtaking city views.",
    description:
      "Our heated rooftop Terraceoffers panoramic city views from the 6th floor. Surrounded by private cabanas and loungers, it is the perfect place to unwind. Poolside dining and signature cocktails are available throughout the day.",
    icon: "Waves",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9732.JPG?updatedAt=1772802352092",
    category: "leisure",
  },
  {
    id: "restaurant",
    name: "Le Doré Restaurant",
    shortDescription: "Fine dining that celebrates seasonal, local ingredients.",
    description:
      "Under the direction of our Michelin-starred chef, Le Doré offers an exquisite culinary journey. The menu changes with the seasons, showcasing the finest local and imported ingredients. An extensive wine cellar with over 500 labels complements every dish.",
    icon: "UtensilsCrossed",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9874.JPG?updatedAt=1772727136240",

    category: "dining",
  },
  {
    id: "bar",
    name: "The Gold Bar",
    shortDescription: "Craft cocktails in an atmosphere of refined elegance.",
    description:
      "Step into The Gold Bar, where master mixologists craft bespoke cocktails using rare spirits and artisanal ingredients. The intimate Art Deco setting with live jazz creates an unforgettable evening experience. Enjoy our signature collection or let our team create something uniquely yours.",
    icon: "Wine",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0210.JPG?updatedAt=1772726822577",
    category: "dining",
  },
  {
    id: "business",
    name: "Business Center",
    shortDescription: "Fully equipped meeting and conference facilities.",
    description:
      "Three elegantly appointed meeting rooms with the latest audiovisual technology, high-speed internet, and secretarial services. Whether hosting an intimate board meeting or a grand reception, our events team ensures flawless execution.",
    icon: "Briefcase",

    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9697.JPG?updatedAt=1772726961292",
    category: "services",
  },
  {
    id: "transfer",
    name: "Airport Transfer",
    shortDescription: "Luxury chauffeur service from door to door.",
    description:
      "Begin your experience from the moment you land. Our fleet of luxury vehicles and professional chauffeurs provide seamless airport transfers, city tours, and private transportation throughout your stay.",
    icon: "Car",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1549317661-bd32c8ce0afa_w800.jpg",
    category: "services",
  },
]

export function getAmenitiesByCategory(category: Amenity["category"]): Amenity[] {
  return amenities.filter((a) => a.category === category)
}
