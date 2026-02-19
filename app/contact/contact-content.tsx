"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/shared/section-heading"
import { HOTEL_NAME, HOTEL_ADDRESS, HOTEL_PHONE, HOTEL_EMAIL, HOTEL_CHECK_IN_TIME, HOTEL_CHECK_OUT_TIME } from "@/lib/constants"

const contactInfo = [
  { icon: MapPin, label: "Address", value: HOTEL_ADDRESS },
  { icon: Phone, label: "Phone", value: HOTEL_PHONE },
  { icon: Mail, label: "Email", value: HOTEL_EMAIL },
  { icon: Clock, label: "Check-in / Check-out", value: `${HOTEL_CHECK_IN_TIME} / ${HOTEL_CHECK_OUT_TIME}` },
]

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80"
          alt="The Aurelian exterior"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">We would love to hear from you</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeading title="Get in Touch" subtitle="Reach Out" />

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg border border-border/50 bg-card p-6 lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="size-7 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">Message Sent</h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 font-sans text-xs uppercase tracking-wider">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-serif text-xl text-foreground">Send a Message</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="firstName" className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                        First Name
                      </Label>
                      <Input id="firstName" required placeholder="John" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="lastName" className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                        Last Name
                      </Label>
                      <Input id="lastName" required placeholder="Doe" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </Label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="subject" className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                      Subject
                    </Label>
                    <Input id="subject" required placeholder="Reservation inquiry" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message" className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                      Message
                    </Label>
                    <Textarea id="message" required rows={5} placeholder="How can we assist you?" />
                  </div>
                  <Button type="submit" className="bg-gold text-charcoal hover:bg-gold-dark gap-2 font-sans text-xs uppercase tracking-wider">
                    <Send className="size-3.5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Info & Map */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-xl text-foreground">{HOTEL_NAME}</h3>
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <item.icon className="size-4 text-gold" />
                    </div>
                    <div>
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </span>
                      <p className="font-sans text-sm text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps Embed */}
              <div className="overflow-hidden rounded-lg border border-border/50">
                <iframe
                  title="The Aurelian location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2159070385584!2d2.3042889!3d48.8698246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4e8f38fed%3A0x48e5f7c3ea1ccdf6!2sAv.+des+Champs-%C3%89lys%C3%A9es%2C+Paris%2C+France!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
