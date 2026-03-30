import type { Metadata } from "next"
import Image from "next/image"
import { RoomsListing } from "./rooms-listing"

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Discover our collection of luxurious rooms and suites at The Kerawi International Hotel, each designed to offer an exceptional experience of comfort and elegance.",
}

export default function RoomsPage() {
  return (
    <>
      {/* Hero */}
     

      <section className="relative flex items-center justify-center bg-foreground py-20 lg:py-60">
         <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/public/5N5A9756.JPG?updatedAt=1772727041026"
          alt="Luxury hotel room view"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Accommodation
          </span>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl text-balance">
            Rooms & Suites
          </h1>

          <p className="mt-4 font-sans text-base leading-relaxed text-primary-foreground/60 text-pretty">
            Each of our six distinctive room categories has been thoughtfully designed to offer
            an unparalleled experience of luxury, comfort, and refined elegance.
          </p>
        </div>
      </section>

      <RoomsListing />
    </>
  )
}