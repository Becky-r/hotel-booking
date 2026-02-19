"use client"

import { useMemo } from "react"
import Link from "next/link"
import { CheckCircle2, Download, Home, Calendar, User, BedDouble } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useBooking } from "@/contexts/booking-context"
import { useSite } from "@/contexts/site-context"
import { generateBookingReference, calculateStayPrice } from "@/lib/booking-utils"
import { formatCurrency, formatDate } from "@/lib/format"
import { HOTEL_NAME, HOTEL_ADDRESS, HOTEL_PHONE, HOTEL_CHECK_IN_TIME, HOTEL_CHECK_OUT_TIME } from "@/lib/constants"

export function ConfirmationContent() {
  const { booking, resetBooking } = useBooking()
  const { currency } = useSite()
  const reference = useMemo(() => generateBookingReference(), [])

  const room = booking.selectedRoom
  const hasDate = booking.checkIn && booking.checkOut
  const pricing = room && hasDate ? calculateStayPrice(room, booking.checkIn!, booking.checkOut!) : null
  const guest = booking.guestDetails

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
        {/* Success Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="size-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Reservation Confirmed
          </h1>
          <p className="font-sans text-base text-muted-foreground">
            Thank you for choosing {HOTEL_NAME}. Your booking has been confirmed.
          </p>
          <div className="rounded-lg bg-secondary/50 px-6 py-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Booking Reference
            </span>
            <p className="font-mono text-2xl font-bold tracking-wider text-foreground">{reference}</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Booking Details */}
        <div className="rounded-lg border border-border/50 bg-card p-6">
          <h2 className="font-serif text-xl font-bold text-foreground">Booking Details</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {room && (
              <div className="flex items-start gap-3">
                <BedDouble className="mt-0.5 size-4 text-gold" />
                <div>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Room</span>
                  <p className="font-sans text-sm font-medium text-foreground">{room.name}</p>
                </div>
              </div>
            )}

            {hasDate && (
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 size-4 text-gold" />
                <div>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dates</span>
                  <p className="font-sans text-sm font-medium text-foreground">
                    {formatDate(booking.checkIn!)} - {formatDate(booking.checkOut!)}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {pricing?.nights} {pricing?.nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <User className="mt-0.5 size-4 text-gold" />
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Guest</span>
                <p className="font-sans text-sm font-medium text-foreground">
                  {guest.firstName} {guest.lastName}
                </p>
                <p className="font-sans text-xs text-muted-foreground">{guest.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Home className="mt-0.5 size-4 text-gold" />
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Hotel</span>
                <p className="font-sans text-sm font-medium text-foreground">{HOTEL_NAME}</p>
                <p className="font-sans text-xs text-muted-foreground">{HOTEL_ADDRESS}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between">
            <div>
              <span className="font-sans text-xs text-muted-foreground">Check-in: {HOTEL_CHECK_IN_TIME}</span>
              <span className="mx-2 text-border">|</span>
              <span className="font-sans text-xs text-muted-foreground">Check-out: {HOTEL_CHECK_OUT_TIME}</span>
            </div>
            {pricing && (
              <div className="text-right">
                <span className="font-sans text-xs text-muted-foreground">Total</span>
                <p className="font-serif text-xl font-bold text-foreground">
                  {formatCurrency(pricing.total, currency)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" className="gap-2 font-sans text-xs uppercase tracking-wider">
            <Download className="size-3.5" />
            Download Invoice
          </Button>
          <Link href="/" onClick={() => resetBooking()}>
            <Button className="w-full bg-gold text-charcoal hover:bg-gold-dark gap-2 font-sans text-xs uppercase tracking-wider sm:w-auto">
              <Home className="size-3.5" />
              Return to Home
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-muted-foreground">
          A confirmation email has been sent to {guest.email || "your email address"}.
          For any questions, please contact us at {HOTEL_PHONE}.
        </p>
      </div>
    </section>
  )
}
