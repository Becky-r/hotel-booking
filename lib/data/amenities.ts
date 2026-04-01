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
      "At Kerawi, there are three food & beverage outlets, where guests enjoy both traditional and national dishes with utmost hospitality by our service staff. Our green garden is suitable for chatting with friends while enjoying our freshly prepared juices and both alcoholic & non alcoholic beverages.",
    icon: "UtensilsCrossed",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9874.JPG?updatedAt=1772727136240",

    category: "dining",
  },
  {
    id: "bar",
    name: "The Gold Bar",
    shortDescription: "Craft cocktails in an atmosphere of refined elegance.",
    description:
      "At our entire food & beverage service outlet we offer you an a la carte menu traditional and European dish with a selection of beverage and freshly brewed juices. bar furnished with sofa and high quality table & chairs",
      
    icon: "Wine",
    image: "https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A0210.JPG?updatedAt=1772726822577",
    category: "dining",
  },
  {
    id: "business",
    name: "Business Center",
    shortDescription: "Fully equipped meeting and conference facilities.",
   description: `
The conference rooms seat between 80 to 100 persons. At the hotel, conference and event delegates can avail of free car parking with maximum security.

Conference & Event Facilities Include:
• Screens in all conference and event venues  
• LCD projector  
• Flip chart  
• Whiteboard  
• Pens & pads  
• Bottled water  
• Wi-Fi  
`,
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
    image: "https://b772872.smushcdn.com/772872/wp-content/uploads/2024/05/Addis-Ababa-Airport-Taxi-Minivan-1.jpeg?lossy=1&strip=1&webp=1",
    category: "services",
  },
]

export function getAmenitiesByCategory(category: Amenity["category"]): Amenity[] {
  return amenities.filter((a) => a.category === category)
}
