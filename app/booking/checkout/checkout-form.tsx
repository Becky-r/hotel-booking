"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CreditCard, Building2, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useBooking } from "@/contexts/booking-context"
import { useSite } from "@/contexts/site-context"
import { calculateStayPrice, ADD_ONS } from "@/lib/booking-utils"
import { formatCurrency, formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function CheckoutForm() {
  const router = useRouter()
  const { booking, setGuestDetails, setPaymentMethod, toggleAddOn } = useBooking()
  const { currency } = useSite()
  const [agreed, setAgreed] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const room = booking.selectedRoom
  const hasDate = booking.checkIn && booking.checkOut

  if (!room) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 py-28">
        <h1 className="font-serif text-2xl font-bold text-foreground">No Room Selected</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Please select a room and dates before proceeding to checkout.
        </p>
        <Link href="/booking">
          <Button className="gap-2 bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
            <ArrowLeft className="size-3.5" />
            Back to Search
          </Button>
        </Link>
      </section>
    )
  }

  const pricing = hasDate ? calculateStayPrice(room, booking.checkIn!, booking.checkOut!) : null
  const addOnTotal = booking.addOns.reduce((sum, id) => {
    const addOn = ADD_ONS.find((a) => a.id === id)
    if (!addOn) return sum
    if (addOn.id === "breakfast" || addOn.id === "pet") return sum + addOn.price * (pricing?.nights || 1)
    return sum + addOn.price
  }, 0)
  const subtotalWithAddOns = (pricing?.subtotal || room.basePrice) + addOnTotal
  const promoDiscount = booking.promoDiscount
  const grandTotal = (pricing?.total || room.basePrice * 1.17) + addOnTotal - promoDiscount

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields.")
      return
    }
    if (!agreed) {
      toast.error("Please accept the terms and conditions.")
      return
    }
    setGuestDetails(formData)
    router.push("/booking/confirmation")
  }

  return (
    <>
      <section className="border-b border-border/50 bg-foreground py-10">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <Link href="/booking" className="inline-flex items-center gap-1 font-sans text-xs text-primary-foreground/60 hover:text-gold">
            <ArrowLeft className="size-3" /> Back to Search
          </Link>
          <h1 className="mt-3 font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            Complete Your Reservation
          </h1>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 lg:grid-cols-3 lg:px-6">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Guest Details */}
            <div className="rounded-lg border border-border/50 bg-card p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">Guest Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="firstName" className="text-xs">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lastName" className="text-xs">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <Label htmlFor="requests" className="text-xs">Special Requests</Label>
                <Textarea
                  id="requests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Any special requirements for your stay..."
                  rows={3}
                />
              </div>
            </div>

            {/* Add-ons */}
            <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">Enhance Your Stay</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ADD_ONS.map((addOn) => (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn.id)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-3 text-left transition-all",
                      booking.addOns.includes(addOn.id) ? "border-gold bg-gold/5" : "border-border/50 hover:border-border"
                    )}
                  >
                    <div>
                      <p className="font-sans text-sm font-medium text-foreground">{addOn.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">{addOn.per}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-semibold text-foreground">
                        {addOn.price === 0 ? "Free" : formatCurrency(addOn.price, currency)}
                      </span>
                      {booking.addOns.includes(addOn.id) && (
                        <Check className="size-4 text-gold" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
              <h2 className="font-serif text-xl font-bold text-foreground">Payment Method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setPaymentMethod("credit-card")}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 transition-all",
                    booking.paymentMethod === "credit-card" ? "border-gold bg-gold/5" : "border-border/50"
                  )}
                >
                  <CreditCard className="size-5 text-gold" />
                  <div className="text-left">
                    <p className="font-sans text-sm font-medium text-foreground">Credit / Debit Card</p>
                    <p className="font-sans text-xs text-muted-foreground">Pay securely online</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("pay-at-hotel")}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-4 transition-all",
                    booking.paymentMethod === "pay-at-hotel" ? "border-gold bg-gold/5" : "border-border/50"
                  )}
                >
                  <Building2 className="size-5 text-gold" />
                  <div className="text-left">
                    <p className="font-sans text-sm font-medium text-foreground">Pay at Hotel</p>
                    <p className="font-sans text-xs text-muted-foreground">Pay upon arrival</p>
                  </div>
                </button>
              </div>

              {booking.paymentMethod === "credit-card" && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <Label className="text-xs">Card Number</Label>
                    <Input placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Expiry Date</Label>
                    <Input placeholder="MM / YY" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">CVC</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="mt-6 flex items-start gap-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
              <label htmlFor="terms" className="font-sans text-xs leading-relaxed text-muted-foreground">
                I agree to the <Link href="/policies" className="underline hover:text-foreground">Terms & Conditions</Link> and{" "}
                <Link href="/policies" className="underline hover:text-foreground">Cancellation Policy</Link>.
                I understand that my booking is subject to availability and hotel policies.
              </label>
            </div>

            <Button
              onClick={handleSubmit}
              className="mt-6 w-full bg-gold text-charcoal hover:bg-gold-dark font-sans text-sm font-semibold uppercase tracking-wider py-6"
            >
              Confirm Reservation
            </Button>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border/50 bg-card p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-foreground">Booking Summary</h3>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Room</span>
                  <span className="font-serif text-base font-bold text-foreground">{room.name}</span>
                </div>

                {hasDate && (
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Check-in</span>
                      <span className="font-sans text-sm text-foreground">{formatDate(booking.checkIn!)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Check-out</span>
                      <span className="font-sans text-sm text-foreground">{formatDate(booking.checkOut!)}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Guests</span>
                  <span className="font-sans text-sm text-foreground">
                    {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2 font-sans text-sm">
                {pricing && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{pricing.nights} {pricing.nights === 1 ? "night" : "nights"}</span>
                    <span className="text-foreground">{formatCurrency(pricing.subtotal, currency)}</span>
                  </div>
                )}
                {addOnTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span className="text-foreground">{formatCurrency(addOnTotal, currency)}</span>
                  </div>
                )}
                {pricing && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (12%)</span>
                      <span className="text-foreground">{formatCurrency(pricing.tax, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service (5%)</span>
                      <span className="text-foreground">{formatCurrency(pricing.serviceCharge, currency)}</span>
                    </div>
                  </>
                )}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-{formatCurrency(promoDiscount, currency)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between">
                <span className="font-sans text-sm font-semibold text-foreground">Total</span>
                <span className="font-serif text-2xl font-bold text-foreground">
                  {formatCurrency(grandTotal, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
