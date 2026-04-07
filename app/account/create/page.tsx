import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Create Account | The Kerawi International Hotel",
  description: "Create your Kerawi International Hotel guest account to enjoy exclusive benefits and manage your stays.",
}

export default function RegisterPage() {
  return <RegisterForm /> 
}
