import type { Metadata } from "next"
import { ConfirmationContent } from "./confirmation-content"

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your reservation at The Kerawi International Hotel has been confirmed.",
}

export default function ConfirmationPage() {
  return <ConfirmationContent />
}
