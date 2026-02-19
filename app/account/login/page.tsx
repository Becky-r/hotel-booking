import type { Metadata } from "next"
import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Sign In | The Aurelian",
  description: "Sign in to your Aurelian guest account to manage bookings and access exclusive benefits.",
}

export default function LoginPage() {
  return <LoginForm />
}
