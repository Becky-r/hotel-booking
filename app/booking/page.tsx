import type { Metadata } from "next"
import { BookingSearch } from "./booking-search"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: "Search available rooms and book your luxury stay at The Kerawi International Hotel.",
}

export default function BookingPage() {
  return (
    <div>
       <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
              <Image
      
      
                src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9812.JPG?updatedAt=1772802351840"
                alt="Kerawi Services"
      
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="relative z-10 text-center">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Reservations
          </span>
                <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Book Your Stay</h1>
                <p className="mt-2 font-sans text-sm text-cream/70"> Select your dates and preferences to discover available rooms and exclusive rates.</p>
              </div>
            </section>
     

      <BookingSearch />
    </div>
  )
}
