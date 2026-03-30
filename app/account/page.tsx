import type { Metadata } from "next"
import { AccountDashboard } from "./account-dashboard"

export const metadata: Metadata = {
  title: "My Account | The Kerawi International Hotel",
  description: "Manage your reservations, profile, and preferences at The Kerawi International Hotel.",
}

export default function AccountPage() {
  return <AccountDashboard />
}
