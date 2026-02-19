import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

export const metadata: Metadata = {
  title: "Contact Us | The Aurelian",
  description: "Get in touch with The Aurelian. We are here to assist with reservations, inquiries, and special requests.",
}

export default function ContactPage() {
  return <ContactContent />
}
