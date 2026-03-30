import type { Metadata } from "next"
import { CheckoutForm } from "./checkout-form"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your booking at The Kerawi International Hotel.",
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
