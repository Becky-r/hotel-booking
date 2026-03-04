export const HOTEL_NAME = "Kerawi International Hotel"
export const HOTEL_TAGLINE = "Where Timeless Elegance Meets Modern Luxury"
export const HOTEL_DESCRIPTION =
  "Nestled in the heart of the city, The Kerawi offers an unparalleled three-star experience. Every detail has been meticulously crafted to ensure your stay is nothing short of extraordinary."
export const HOTEL_ADDRESS = " Roughly 2.2 miles (approx. 39-minute drive) from Hawassa Airport."
export const HOTEL_PHONE = "+251 462-124-776,+251 955-45-60-60,+251 935-35-35-72,+251 95481-82-90,+251 935 -35-35-84"
export const HOTEL_EMAIL = "Kerawihotel@gmail.com"
export const HOTEL_STAR_RATING = 3
export const HOTEL_CHECK_IN_TIME = "15:00"
export const HOTEL_CHECK_OUT_TIME = "11:00"

export const TAX_RATE = 0.15
export const SERVICE_CHARGE_RATE = 0.05

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "\u20AC", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "\u00A3", name: "British Pound", rate: 0.79 },
  { code: "AED", symbol: "\u062F.\u0625", name: "UAE Dirham", rate: 3.67 },
] as const

export type CurrencyCode = (typeof CURRENCIES)[number]["code"]

export const LANGUAGES = [
  { code: "en", name: "English", flag: "GB" },
  { code: "fr", name: "Fran\u00E7ais", flag: "FR" },
  { code: "es", name: "Espa\u00F1ol", flag: "ES" },
  { code: "ar", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", flag: "SA" },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]["code"]

export const NAV_LINKS = [
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/amenities", label: "Amenities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export const PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed"; description: string }> = {
  WELCOME10: { discount: 10, type: "percent", description: "10% off your first stay" },
  SUMMER25: { discount: 25, type: "percent", description: "25% summer discount" },
  EARLYBIRD: { discount: 50, type: "fixed", description: "$50 off early booking" },
  LUXURY100: { discount: 100, type: "fixed", description: "$100 off luxury suites" },
}

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "TripAdvisor", href: "#" },
] as const
