"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { mockBookings } from "@/lib/data/bookings"
import { rooms } from "@/lib/data/rooms"
import { formatCurrency } from "@/lib/format"
import { useSite } from "@/contexts/site-context"

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  "checked-in": "bg-blue-100 text-blue-700",
  "checked-out": "bg-secondary text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
}

export function AccountDashboard() {
  const { user, isLoggedIn, logout, toggleFavorite } = useAuth()
  const { currency } = useSite()
  const router = useRouter()

  if (!isLoggedIn || !user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <User className="size-12 text-muted-foreground/50" />
          <h1 className="font-serif text-2xl text-foreground">Please Sign In</h1>
          <p className="font-sans text-sm text-muted-foreground">You need to sign in to access your account.</p>
          <Link href="/account/login">
            <Button className="bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
              Sign In
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const favoriteRooms = rooms.filter((r) => user.favoriteRooms.includes(r.slug))
  const upcoming = mockBookings.filter((b) => b.status === "confirmed")
  const past = mockBookings.filter((b) => b.status === "checked-out")

  return (
    <main className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Profile Header */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-gold/10 font-serif text-xl font-bold text-gold">
              {user.avatar}
            </div>
            <div>
              <h1 className="font-serif text-2xl text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <div className="mt-1 flex items-center gap-2">
                <Badge className="bg-gold/10 text-gold hover:bg-gold/20 font-sans text-[10px] uppercase tracking-wider">
                  <Award className="mr-1 size-3" />
                  {user.loyaltyTier} Member
                </Badge>
                <span className="font-sans text-xs text-muted-foreground">
                  {user.loyaltyPoints.toLocaleString()} points
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="gap-2 font-sans text-xs uppercase tracking-wider"
          >
            <LogOut className="size-3.5" />
            Sign Out
          </Button>
        </div>

        <Separator className="my-8" />

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="bookings" className="gap-1.5 font-sans text-xs uppercase tracking-wider">
              <Calendar className="size-3.5" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-1.5 font-sans text-xs uppercase tracking-wider">
              <User className="size-3.5" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-1.5 font-sans text-xs uppercase tracking-wider">
              <Heart className="size-3.5" />
              Favorites
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            {/* Upcoming */}
            <h2 className="font-serif text-xl text-foreground">Upcoming Reservations</h2>
            {upcoming.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-border/50 bg-secondary/20 p-8 text-center">
                <Calendar className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-3 font-sans text-sm text-muted-foreground">No upcoming reservations</p>
                <Link href="/booking">
                  <Button className="mt-4 bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs uppercase tracking-wider">
                    Book a Stay
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {upcoming.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} currency={currency} />
                ))}
              </div>
            )}

            {/* Past */}
            <h2 className="mt-10 font-serif text-xl text-foreground">Past Stays</h2>
            {past.length === 0 ? (
              <p className="mt-4 font-sans text-sm text-muted-foreground">No past stays yet.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {past.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} currency={currency} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="rounded-lg border border-border/50 bg-card p-6 lg:p-8">
              <h2 className="font-serif text-xl text-foreground">Personal Information</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <InfoField label="First Name" value={user.firstName} />
                <InfoField label="Last Name" value={user.lastName} />
                <InfoField label="Email" value={user.email} />
                <InfoField label="Phone" value={user.phone} />
                <InfoField label="Nationality" value={user.nationality} />
                <InfoField label="Member Since" value={user.memberSince} />
              </div>

              <Separator className="my-6" />

              <h3 className="font-sans text-sm font-semibold text-foreground">Loyalty Program</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <Award className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">{user.loyaltyTier}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Current Tier</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <Star className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">{user.loyaltyPoints.toLocaleString()}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Points</p>
                </div>
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <BedDouble className="mx-auto size-5 text-gold" />
                  <p className="mt-2 font-serif text-lg font-bold text-foreground">{user.totalStays}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Total Stays</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <h2 className="font-serif text-xl text-foreground">Favorite Rooms</h2>
            {favoriteRooms.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-border/50 bg-secondary/20 p-8 text-center">
                <Heart className="mx-auto size-8 text-muted-foreground/50" />
                <p className="mt-3 font-sans text-sm text-muted-foreground">No favorite rooms yet</p>
                <Link href="/rooms">
                  <Button variant="outline" className="mt-4 font-sans text-xs uppercase tracking-wider">
                    Explore Rooms
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteRooms.map((room) => (
                  <div key={room.id} className="rounded-lg border border-border/50 bg-card p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-base text-foreground">{room.name}</h3>
                        <p className="font-sans text-xs text-muted-foreground">
                          From {formatCurrency(room.basePrice, currency)}/night
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(room.slug)}
                        aria-label="Remove from favorites"
                      >
                        <Heart className="size-4 fill-gold text-gold" />
                      </Button>
                    </div>
                    <Link href={`/rooms/${room.slug}`}>
                      <Button variant="outline" size="sm" className="mt-3 w-full gap-1 font-sans text-xs uppercase tracking-wider">
                        View Room
                        <ChevronRight className="size-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <p className="mt-0.5 font-sans text-sm text-foreground">{value}</p>
    </div>
  )
}

function BookingCard({ booking, currency }: { booking: (typeof mockBookings)[0]; currency: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-foreground">{booking.roomType}</h3>
            <Badge className={`${statusColors[booking.status]} font-sans text-[10px] uppercase tracking-wider`}>
              {booking.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span className="font-mono text-xs">{booking.reference}</span>
            <span className="font-sans text-xs">{booking.checkIn} to {booking.checkOut}</span>
            <span className="font-sans text-xs">{booking.nights} nights</span>
            <span className="font-sans text-xs">{booking.adults} adults{booking.children > 0 ? `, ${booking.children} children` : ""}</span>
          </div>
          {booking.specialRequests && (
            <div className="flex items-start gap-1.5 text-muted-foreground">
              <MessageSquare className="mt-0.5 size-3" />
              <span className="font-sans text-xs">{booking.specialRequests}</span>
            </div>
          )}
          {booking.addOns.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {booking.addOns.map((addon) => (
                <Badge key={addon} variant="outline" className="font-sans text-[10px]">
                  {addon}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-serif text-xl font-bold text-foreground">
            {formatCurrency(booking.total, currency as "USD" | "EUR" | "GBP" | "AED")}
          </p>
          <span className="font-sans text-[10px] text-muted-foreground">{booking.paymentMethod}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 font-sans text-[10px] uppercase tracking-wider">
              <Download className="size-3" />
              Invoice
            </Button>
            {booking.status === "confirmed" && (
              <Button variant="outline" size="sm" className="font-sans text-[10px] uppercase tracking-wider text-destructive hover:text-destructive">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
