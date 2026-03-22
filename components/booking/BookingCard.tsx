import { useState } from "react";
import { Button } from "../ui/button";
import { UploadScreenshot } from "./UploadScreenshot";
import { downloadInvoice } from "@/lib/booking-utils";
import { toast } from "sonner";

export function BookingCard({
  booking,
  currency,
  handleCancel,
  isCancellable = true,
  onSuccess,
}: {
  booking: any;
  currency: string;
  isCancellable?: boolean;
  handleCancel?: () => void;
  onSuccess?: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const checkIn = new Date(booking.check_in);
  const checkOut = new Date(booking.check_out);

  const nights = Math.max(
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)),
    1,
  );

  const roomTypes = booking.rooms?.map((r: any) => r.room_type).join(", ");

  const services = booking.services?.map((s: any) => s.name);
  const handleDownloadInvoice = () => {
    setDownloading(true);
    try {
      downloadInvoice(booking, currency);
      toast.success("Invoice downloaded.");
    } catch (err: any) {
      toast.error("Failed to download invoice. Try again.");
    } finally {
      setDownloading(false);
    }
  };
  const statusColors: any = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-600",
  };
  return (
    <div className="rounded-lg border border-border/50 bg-card p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg text-foreground">
              {roomTypes || "Room Booking"}
            </h3>

            <span
              className={`${statusColors[booking.status]} px-2 py-1 rounded text-[10px] uppercase tracking-wider`}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span className="font-mono text-xs">
              {booking.reference.slice(0, 8)}
            </span>

            <span className="font-sans text-xs">
              {booking.check_in} → {booking.check_out}
            </span>

            <span className="font-sans text-xs">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>

            <span className="font-sans text-xs">
              {booking.adults} adults
              {booking.children > 0 ? `, ${booking.children} children` : ""}
            </span>
          </div>
          <div>
            {booking.payment_screenshot && (
              <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                payment screenshot uploaded
              </span>
            )}
          </div>

          {services?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {services.map((service: string) => (
                <span
                  key={service}
                  className="border px-2 py-0.5 rounded text-[10px]"
                >
                  {service}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-2">
          <p className="font-serif text-xl font-bold text-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency || "USD",
            }).format(Number(booking.total_amount))}
          </p>

          <span className="text-[10px] text-muted-foreground">
            Booked on {new Date(booking.created_at).toLocaleDateString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] uppercase"
              onClick={handleDownloadInvoice}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Invoice"}
            </Button>

            {(booking.status === "CONFIRMED" || booking.status === "PENDING") &&
              isCancellable === true && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[10px] uppercase text-destructive"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              )}
          </div>
        </div>
      </div>
      {booking.status === "PENDING" &&
        !booking.payment_screenshot && ( // only show if pending and no screenshot uploaded yet
          <UploadScreenshot
            bookingReference={booking.reference}
            className="mt-4"
            onSuccess={onSuccess}
          />
        )}
    </div>
  );
}
