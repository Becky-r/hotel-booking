import type { Metadata } from "next"
import { BookingSearch } from "./booking-search"

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: "Search available rooms and book your luxury stay at The Kerawi International Hotel.",
}

export default function BookingPage() {
  return (
    <>
      <section className="border-b border-border/50 bg-foreground py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Reservations
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl text-balance">
            Book Your Stay
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-primary-foreground/60 text-pretty">
            Select your dates and preferences to discover available rooms and exclusive rates.
          </p>
        </div>
      </section>

      <BookingSearch />
    </>
  )
}
