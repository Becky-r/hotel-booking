"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/contexts/booking-context";
import { cn } from "@/lib/utils";

interface SearchWidgetProps {
  variant?: "hero" | "inline" | "sidebar";
  className?: string;
}

export function SearchWidget({
  variant = "hero",
  className,
}: SearchWidgetProps) {
  const router = useRouter();
  const { booking, setCheckIn, setCheckOut, setAdults, setChildren } =
    useBooking();

  const handleSearch = () => {
    if (!booking.checkIn || !booking.checkOut) return;
    if (booking.checkOut <= booking.checkIn) return;
    router.push("/booking");
  };

  const isHero = variant === "hero";
  const isSidebar = variant === "sidebar";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg",
        isHero &&
          "bg-background/95 p-4 shadow-xl backdrop-blur-sm md:flex-row md:items-end md:gap-2 md:p-3",
        isSidebar && "gap-4",
        !isHero &&
          !isSidebar &&
          "bg-card p-4 shadow-md md:flex-row md:items-end md:gap-2",
        className,
      )}
    >
      {/* Check-in */}
      <div className={cn("flex flex-col gap-1.5", isHero && "flex-1")}>
        <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Check-in
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start gap-2 font-sans text-sm font-normal",
                !booking.checkIn && "text-muted-foreground",
              )}
            >
              <CalendarDays className="size-4 text-gold" />
              {booking.checkIn
                ? format(booking.checkIn, "MMM d, yyyy")
                : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={booking.checkIn}
              onSelect={setCheckIn}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out */}
      <div className={cn("flex flex-col gap-1.5", isHero && "flex-1")}>
        <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Check-out
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start gap-2 font-sans text-sm font-normal",
                !booking.checkOut && "text-muted-foreground",
              )}
            >
              <CalendarDays className="size-4 text-gold" />
              {booking.checkOut
                ? format(booking.checkOut, "MMM d, yyyy")
                : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={booking.checkOut}
              onSelect={setCheckOut}
              disabled={{ before: booking.checkIn || new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests */}
      <div className={cn("flex gap-2", isHero && "flex-1")}>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Adults
          </label>
          <Select
            value={String(booking.adults)}
            onValueChange={(v) => setAdults(Number(v))}
          >
            <SelectTrigger className="gap-2">
              <Users className="size-4 text-gold" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? "Adult" : "Adults"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Children
          </label>
          <Select
            value={String(booking.children)}
            onValueChange={(v) => setChildren(Number(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? "Child" : "Children"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className={cn(
          "bg-gold text-charcoal hover:bg-gold-dark font-sans text-xs font-semibold uppercase tracking-wider",
          isHero && "md:h-9",
          isSidebar && "w-full",
        )}
      >
        <Search className="size-4" />
        Check Availability
      </Button>
    </div>
  );
}
