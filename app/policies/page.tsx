import type { Metadata } from "next"
import Image from "next/image"
import { SectionHeading } from "@/components/shared/section-heading"
import { Separator } from "@/components/ui/separator"
import { HOTEL_NAME, HOTEL_PHONE, HOTEL_EMAIL, HOTEL_CHECK_IN_TIME, HOTEL_CHECK_OUT_TIME } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Policies | The Aurelian",
  description: "Review our cancellation, privacy, and terms of service policies at The Aurelian.",
}

const policies = [
  {
    id: "cancellation",
    title: "Cancellation Policy",
    sections: [
      {
        heading: "Standard Cancellation",
        content: `Reservations may be cancelled free of charge up to 48 hours prior to the scheduled check-in date. Cancellations made within 48 hours of arrival will incur a charge equivalent to one night's room rate. No-shows will be charged the full cost of the first night.`,
      },
      {
        heading: "Non-Refundable Rates",
        content: `Bookings made at non-refundable rates are charged in full at the time of reservation. These bookings cannot be cancelled, modified, or refunded under any circumstances.`,
      },
      {
        heading: "Group Bookings",
        content: `For group reservations of five or more rooms, a separate cancellation policy applies. Please contact our reservations team at ${HOTEL_EMAIL} for specific terms regarding group bookings.`,
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        content: `We collect personal information necessary to process your reservation and enhance your stay, including name, contact details, payment information, and stay preferences. We may also collect information through cookies when you browse our website.`,
      },
      {
        heading: "How We Use Your Information",
        content: `Your personal data is used to process reservations, personalize your experience, communicate regarding your stay, and improve our services. We do not sell or share your personal data with third-party marketing companies.`,
      },
      {
        heading: "Data Protection",
        content: `${HOTEL_NAME} employs industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. We retain your data only as long as necessary to fulfill the purposes outlined in this policy.`,
      },
      {
        heading: "Your Rights",
        content: `You have the right to access, correct, or delete your personal data at any time. To exercise these rights, please contact our data protection officer at ${HOTEL_EMAIL}. We will respond to all requests within 30 days.`,
      },
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    sections: [
      {
        heading: "Check-in & Check-out",
        content: `Check-in time is ${HOTEL_CHECK_IN_TIME} and check-out time is ${HOTEL_CHECK_OUT_TIME}. Early check-in and late check-out may be arranged subject to availability and may incur additional charges. Valid government-issued photo identification is required at check-in.`,
      },
      {
        heading: "Payment",
        content: `We accept major credit and debit cards including Visa, MasterCard, and American Express. A valid credit card is required to guarantee all reservations. A pre-authorization may be placed on your card upon check-in.`,
      },
      {
        heading: "Hotel Policies",
        content: `${HOTEL_NAME} is a non-smoking property. Smoking in any indoor area will result in a cleaning fee of $500. Pets are welcome in designated rooms with a nightly surcharge. The hotel reserves the right to refuse service and remove guests who violate hotel policies or disturb other guests.`,
      },
      {
        heading: "Liability",
        content: `${HOTEL_NAME} is not liable for loss, damage, or theft of personal belongings. Safe deposit boxes are available at the front desk and in all rooms. The hotel reserves the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.`,
      },
      {
        heading: "Contact",
        content: `For questions regarding these policies, please contact us at ${HOTEL_PHONE} or email ${HOTEL_EMAIL}. Our team is available 24/7 to assist you.`,
      },
    ],
  },
]

export default function PoliciesPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative flex h-64 items-center justify-center overflow-hidden bg-charcoal md:h-80">
        <Image
          src="https://ik.imagekit.io/hawassa/hotel-booking/download-image-bulk/photo-1551882547-ff40c63fe5fa_w1800.jpg"
          alt="Hotel policies"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-4xl text-cream md:text-5xl lg:text-6xl">Policies</h1>
          <p className="mt-2 font-sans text-sm text-cream/70">Cancellation, privacy, and terms of service</p>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <SectionHeading title="Hotel Policies" subtitle="Important Information" />

          <nav className="mt-10 flex flex-wrap justify-center gap-3">
            {policies.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-border/50 px-4 py-1.5 font-sans text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                {p.title}
              </a>
            ))}
          </nav>

          <div className="mt-12 flex flex-col gap-16">
            {policies.map((policy) => (
              <div key={policy.id} id={policy.id}>
                <h2 className="font-serif text-2xl text-foreground">{policy.title}</h2>
                <Separator className="my-4" />
                <div className="flex flex-col gap-6">
                  {policy.sections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="font-sans text-sm font-semibold text-foreground">{section.heading}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
