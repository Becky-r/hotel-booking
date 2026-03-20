"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { HOTEL_NAME } from "@/lib/constants";
import { SplashScreen } from "@/components/layout/splash-screen";

export function RegisterForm() {
  const { register, user, loadingUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    console.log("Submitting registration with data:", {
      full_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email,
      phone: form.phone,
      password: form.password,
      password2: form.confirmPassword,
    });
    setLoading(true);

    try {
      await register({
        full_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password2: form.confirmPassword,
      });

      router.push("/account");
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!loadingUser && user) {
      router.push("/account");
    }
  }, [user, loadingUser, router]);

  if (loadingUser || user) {
    return <SplashScreen />;
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-16">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg border border-border/50 bg-card shadow-lg">
        {/* Left - Image */}
        <div className="relative hidden w-5/12 lg:block">
          <Image
            src="https://ik.imagekit.io/hawassa/hotel-booking/public/5X9A8087.JPG?updatedAt=1772962015224"
            alt="Presidential Suite"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="font-serif text-2xl text-cream">
              Join the Experience
            </h2>
            <p className="mt-2 font-sans text-sm text-cream/70">
              Create an account to unlock loyalty rewards, save favorite rooms,
              and manage your bookings.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-7/12 lg:p-12">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-2xl text-foreground">
              Create Account
            </h1>
            <p className="font-sans text-sm text-muted-foreground">
              Begin your {HOTEL_NAME} membership
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3">
                <p className="font-sans text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="firstName"
                  className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="lastName"
                  className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="regEmail"
                className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
              >
                Email Address
              </Label>
              <Input
                id="regEmail"
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                Phone
              </Label>
              <Input
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+251..."
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="regPassword"
                className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="regPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min 8 characters"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="confirmPassword"
                className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-gold text-charcoal hover:bg-gold-dark gap-2 font-sans text-xs uppercase tracking-wider"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal" />
                  Creating account...
                </span>
              ) : (
                <>
                  <UserPlus className="size-3.5" />
                  Create Account
                </>
              )}
            </Button>

            <p className="text-center font-sans text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/account/login"
                className="font-medium text-gold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
