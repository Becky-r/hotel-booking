import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BookingCard } from "../BookingCard";
import { anonCancelBooking, getBookingDetails } from "@/lib/api";
import { toast } from "sonner";
import { set } from "date-fns";

export function GuestBookingLookup() {
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [cancelling, setCancelling] = useState(false);
  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await getBookingDetails(reference);
      setBooking(response);
    } catch {
      setError("Booking not found. Please check your details.");
    } finally {
      setLoading(false);
    }
  }
  async function handleCancel() {
    if (!booking)
      return toast.error("Add booking reference and phone number to cancel.");
    if (!phone) return toast.error("Please enter your phone number to cancel.");
    setCancelling(true);
    try {
      const response = await anonCancelBooking({ reference, phone });
      setBooking(response);
      toast.success("Booking cancelled successfully.");
    } catch (error : any) { 
      toast.error(
        error.message || "Failed to cancel booking. Please try again.",
      );
    } finally {
      setCancelling(false);
    }
  }
  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-serif text-lg">Find Your Booking</h2>

      <form onSubmit={handleLookup} className="mt-4 space-y-4">
        {error && <p className="text-sm text-destructive">{error}</p>}

        <Input
          placeholder="Booking Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
        />

        <Input
          type="tel"
          placeholder="Phone used for booking"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-charcoal hover:bg-gold-dark text-xs uppercase"
        >
          {loading ? "Searching..." : "Find Booking"}
        </Button>
      </form>

      {/* RESULT */}
      {booking && (
        <div className="mt-6">
          <BookingCard booking={booking} currency="USD" isCancellable={false} />

          {/* CANCEL BUTTON */}
          <Button
            variant="outline"
            className="mt-3 w-full text-destructive"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </Button>
        </div>
      )}
    </div>
  );
}
