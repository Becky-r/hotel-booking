"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { HOTEL_NAME } from "@/lib/constants";
import { SplashScreen } from "@/components/layout/splash-screen";

export function LoginForm() {
  const { login, loadingUser , user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/account");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
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
            src="https://www.istockphoto.com/photos/luxury-hotel-exterior"
            alt="Hotel entrance"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/60" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="font-serif text-2xl text-cream">Welcome Back</h2>
            <p className="mt-2 font-sans text-sm text-cream/70">
              Sign in to manage your reservations and access exclusive member
              benefits.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex w-full flex-col justify-center p-8 lg:w-7/12 lg:p-12">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-2xl text-foreground">Sign In</h1>
            <p className="font-sans text-sm text-muted-foreground">
              Access your {HOTEL_NAME} guest account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3">
                <p className="font-sans text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="password"
                className="font-sans text-xs uppercase tracking-wider text-muted-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <Button
              type="submit"
              disabled={loading}
              className="bg-gold text-charcoal hover:bg-gold-dark gap-2 font-sans text-xs uppercase tracking-wider"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal" />
                  Signing in...
                </span>
              ) : (
                <>
                  <LogIn className="size-3.5" />
                  Sign In
                </>
              )}
            </Button>

            <p className="text-center font-sans text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link
                href="/account/register"
                className="font-medium text-gold hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
