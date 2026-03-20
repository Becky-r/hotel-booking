import type { Metadata } from "next"
import { RegisterForm } from "./register-form"

export const metadata: Metadata = {
  title: "Create Account | The Aurelian",
  description: "Create your Aurelian guest account to enjoy exclusive benefits and manage your stays.",
}

export default function RegisterPage() {
  return <RegisterForm /> 
}
