import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us | The Kerawi International Hotel",
  description: "Get in touch with The Kerawi International Hotel. We are here to assist with reservations, inquiries, and special requests.",
}

export default function ContactPage() {
  return <ContactContent />
}
