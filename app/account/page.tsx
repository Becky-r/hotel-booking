import type { Metadata } from "next"
import { AccountDashboard } from "./account-dashboard"

export const metadata: Metadata = {
  title: "My Account | The Aurelian",
  description: "Manage your reservations, profile, and preferences at The Aurelian.",
}

export default function AccountPage() {
  return <AccountDashboard />
}
