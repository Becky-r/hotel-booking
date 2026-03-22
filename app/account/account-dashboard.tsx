"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  User,
  Heart,
  Star,
  LogOut,
  BedDouble,
  Download,
  MessageSquare,
  ChevronRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { mockBookings } from "@/lib/data/bookings";
import { rooms } from "@/lib/data/rooms";
import { formatCurrency, formatDate } from "@/lib/format";
import { useSite } from "@/contexts/site-context";
import { cancelBooking, getUserBookings } from "@/lib/api";
import { useEffect, useState } from "react";
import { BookingCard } from "@/components/booking/BookingCard";
import { InfoField } from "@/components/booking/dashboard/InfoField";
import { ProfileHeader } from "@/components/booking/dashboard/ProfileHeader";
import { GuestBookingLookup } from "@/components/booking/dashboard/GuestBookingLookup";
import { ref } from "process";
import { toast } from "sonner";
import { SplashScreen } from "@/components/layout/splash-screen";

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  "checked-in": "bg-blue-100 text-blue-700",
  "checked-out": "bg-secondary text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export function AccountDashboard() {
  const { user, isLoggedIn , loadingUser, logout, bookings, setBookings , fetchUserBookings } = useAuth();
  const { currency } = useSite();
  const router = useRouter();
  const now = new Date();

  const upcoming = bookings.filter((b) => new Date(b.check_in) >= now);

  const past = bookings.filter((b) => new Date(b.check_out) < now);

  const totalStays = bookings.filter((b) => new Date(b.check_out) < now).length;

  if (loadingUser) {
    return <SplashScreen />;}

  if ((!isLoggedIn || !user)  ) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          {/* SIGN IN SECTION */}
          <div className="flex flex-col items-center gap-4 text-center">
            <User className="size-12 text-muted-foreground/50" />

            <h1 className="font-serif text-2xl text-foreground">
              Access Your Account
            </h1>

            <p className="font-sans text-sm text-muted-foreground">
              Sign in to manage your bookings, or find a reservation using your
              reference number.
            </p>

            <Link href="/account/login">
              <Button className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
                Sign In
              </Button>
            </Link>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* GUEST LOOKUP */}
          <GuestBookingLookup />
        </div>
      </main>
    );
  }
  const handleLogout = async () => {
    await logout();
    router.push("/account/");
  };
  const handleCancel = async (reference: string) => {
    try {
      const response = await cancelBooking(reference);
      const updatedBookings = bookings.map((booking) =>
        booking.reference === reference ? response : booking,
      );
      setBookings(updatedBookings);
    } catch (err : any)  {
      toast.error(err.message || "Couldn't cancel booking. Please try again.");
    }
  };

  return (
    <main className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Profile Header */}
        <ProfileHeader user={user} handleLogout={handleLogout} />

        <Separator className="my-8" />

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger
              value="bookings"
              className="gap-1.5 font-sans text-xs uppercase tracking-wider"
            >
              <Calendar className="size-3.5" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="gap-1.5 font-sans text-xs uppercase tracking-wider"
            >
              <User className="size-3.5" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <h2 className="font-serif text-xl text-foreground">
              Upcoming Reservations
            </h2>

            {upcoming.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-border/50 bg-secondary/20 p-8 text-center">
                <Calendar className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-3 font-sans text-sm text-muted-foreground">
                  No upcoming reservations
                </p>
                <Link href="/booking">
                  <Button className="mt-4 bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
                    Book a Stay
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {upcoming.map((booking) => (
                  <BookingCard
                    key={booking.reference}
                    booking={booking}
                    currency={currency}
                    handleCancel={() => handleCancel(booking.reference)}
                    onSuccess={() =>  fetchUserBookings() }
                  />
                ))}
              </div>
            )}

            {/* PAST */}
            <h2 className="mt-10 font-serif text-xl text-foreground">
              Past Stays
            </h2>

            {past.length === 0 ? (
              <p className="mt-4 font-sans text-sm text-muted-foreground">
                No past stays yet.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {past.map((booking) => (
                  <div key={booking.reference} className="opacity-80">
                    <BookingCard
                      booking={booking}
                      currency={currency}
                      isCancellable={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="rounded-lg border border-border/50 bg-card p-6 lg:p-8">
              <h2 className="font-serif text-xl text-foreground">
                Personal Information
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <InfoField label="Full Name" value={user.full_name} />
                <InfoField label="Email" value={user.email} />
                <InfoField label="Phone" value={user.phone} />
                <InfoField label="Nationality" value={"N/A"} />
                <InfoField
                  label="Member Since"
                  value={formatDate(user.date_joined)}
                />
              </div>

              <Separator className="my-6" />

              <h3 className="font-sans text-sm font-semibold text-foreground">
                Loyalty Program
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <Award className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">
                    Gold
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                    Current Tier
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <Star className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">
                    {totalStays * 100}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                    Points
                  </p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <BedDouble className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">
                    {totalStays}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                    Total Stays
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
