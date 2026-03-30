import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In | The Kerawi International Hotel",
  description:
    "Sign in to your Kerawi International Hotel guest account to manage bookings and access exclusive benefits.",
};

export default function LoginPage() {
  return <LoginForm />;
}
