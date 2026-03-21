// SearchForm.tsx
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { on } from "events";
import { Counter } from "../ui/counter";

type Props = {
  booking: any;
  setCheckIn: (date?: Date) => void;
  setCheckOut: (date?: Date) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  handleSearch: () => void;
  handleClearSelection: () => void;
  loading: boolean;
  onClear?: () => void;
  rooms: any[];
};

export default function SearchForm({
  booking,
  setCheckIn,
  setCheckOut,
  setAdults,
  setChildren,
  handleSearch,
  loading,
  handleClearSelection,
  rooms,
}: Props) {
  return (
    <div className="rounded-lg border border-border/50 bg-card p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-5">
        {/* CHECK IN */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-muted-foreground">
            Check-in
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start gap-2",
                  !booking.checkIn && "text-muted-foreground",
                )}
              >
                <CalendarDays className="size-4 text-gold" />
                {booking.checkIn
                  ? format(booking.checkIn, "MMM d, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={booking.checkIn}
                onSelect={setCheckIn}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* CHECK OUT */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-muted-foreground">
            Check-out
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start gap-2",
                  !booking.checkOut && "text-muted-foreground",
                )}
              >
                <CalendarDays className="size-4 text-gold" />
                {booking.checkOut
                  ? format(booking.checkOut, "MMM d, yyyy")
                  : "Select date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={booking.checkOut}
                onSelect={setCheckOut}
                disabled={{ before: booking.checkIn || new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Counter
          label="Adults"
          value={booking.adults}
          min={1}
          onChange={setAdults}
        />

        <Counter
          label="Children"
          value={booking.children}
          min={0}
          onChange={setChildren}
        />

        {/* SEARCH BUTTON */}
        <div className="flex flex-col justify-end">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-gold text-charcoal hover:bg-gold-dark"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {rooms.length > 0 && (
          <div className="flex flex-col justify-end">
            <Button
              onClick={handleClearSelection}
              className="bg-gold text-charcoal hover:bg-gold-dark"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
