"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Clock,
  Download,
  Home,
  Calendar,
  User,
  BedDouble,
} from "lucide-react";
import { uploadPaymentScreenshot } from "@/lib/api"; // adjust path
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBooking } from "@/contexts/booking-context";
import { useSite } from "@/contexts/site-context";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  HOTEL_NAME,
  HOTEL_ADDRESS,
  HOTEL_PHONE,
  HOTEL_CHECK_IN_TIME,
  HOTEL_CHECK_OUT_TIME,
} from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { downloadInvoice } from "@/lib/booking-utils";
import { useAuth } from "@/contexts/auth-context";
export function ConfirmationContent() {
  const { booking, resetBooking } = useBooking();
  const { currency } = useSite();
  const { fetchUserBookings } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError(null);
  };

  const handleUpload = async () => {
    if (!file || !booking?.reference) return;

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("payment_screenshot", file);
      await uploadPaymentScreenshot(booking.reference, formData);
      toast.success(" Successfully uploaded payment screenshot.");
      fetchUserBookings();
      router.push("/account");
      resetBooking();
      setSuccess(true);
    } catch (err: any) {
      setError("Failed to upload screenshot. Try again.");
    } finally {
      setUploading(false);
    }
  };
  // Countdown
  useEffect(() => {
    if (!booking?.created_at) return;

    const expiry = new Date(booking.created_at).getTime() + 15 * 60 * 1000;

    const updateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));
      setTimeLeft(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [booking?.created_at]);

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

  const isExpired = timeLeft === 0;

  if (timeLeft === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center px-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            Booking Details Not Available
          </h2>

          <p className="text-sm text-muted-foreground max-w-md">
            If you refreshed this page or accessed it directly, your booking
            details may no longer be stored in the current session. You can find
            your reservation from your account using your booking reference and
            email address.
          </p>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <Link href="/account">
            <Button className="w-full sm:w-auto">Your Bookings</Button>
          </Link>

          <Link href="/booking">
            <Button variant="outline" className="w-full sm:w-auto">
              Make New Booking
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 lg:px-6">
        {/* 🔴 EXPIRED STATE */}
        {isExpired ? (
          <div className="max-w-md mx-auto rounded-xl border bg-card p-8 shadow-sm text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Booking Payment Time Expired
              </h1>

              <p className="text-sm text-muted-foreground">
                Your reservation is currently inactive because the payment time
                window has expired.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              Don’t worry — your booking details are still in our system. You
              can access your reservation from your account and complete the
              payment or create a new booking at any time.
            </p>

            {/* Info Box */}
            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground space-y-1">
              <p>
                Access your booking using your{" "}
                <span className="font-semibold text-foreground">
                  booking reference
                </span>{" "}
                and{" "}
                <span className="font-semibold text-foreground">
                  email address
                </span>
                .
              </p>
              <p>
                The booking reference was sent to your email during reservation.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/account" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">Go to My Bookings</Button>
              </Link>

              <Link href="/booking/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto">
                  Make New Booking
                </Button>
              </Link>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-muted-foreground pt-2">
              If you need assistance, please contact our support team.
            </p>
          </div>
        ) : (
          <>
            {/* 🟡 PENDING HEADER */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-amber-100">
                <Clock className="size-8 text-amber-600" />
              </div>

              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                Booking Pending Payment
              </h1>

              <p className="text-muted-foreground">
                Your reservation has been created but is not yet confirmed.
                Please complete payment to secure your booking.
              </p>

              {/* 🔢 Reference */}
              <div className="rounded-lg bg-secondary/50 px-6 py-3">
                <span className="text-xs uppercase text-muted-foreground">
                  Booking Reference
                </span>
                <p className="font-mono text-2xl font-bold">
                  {booking.reference}
                </p>
              </div>
            </div>

            {/* ⏱️ TIMER */}
            <div className="mt-6 rounded-lg bg-amber-50 px-6 py-4 text-center">
              <p className="text-sm text-amber-700 font-semibold">
                Time remaining to complete payment
              </p>
              <p className="text-2xl font-mono font-bold text-amber-900">
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </p>
            </div>

            <Separator className="my-8" />

            {/* 📋 BOOKING DETAILS */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-bold">Booking Details</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Rooms */}
                {booking.rooms?.map((room, i) => (
                  <div key={i} className="flex gap-3">
                    <BedDouble className="size-4 text-gold mt-1" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase">
                        Room
                      </span>
                      <p className="text-sm font-medium">
                        {room.room_type} - {room.room_number}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Dates */}
                <div className="flex gap-3">
                  <Calendar className="size-4 text-gold mt-1" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase">
                      Dates
                    </span>
                    <p className="text-sm font-medium">
                      {formatDate(booking.check_in)} -{" "}
                      {formatDate(booking.check_out)}
                    </p>
                  </div>
                </div>

                {/* Guest */}
                <div className="flex gap-3">
                  <User className="size-4 text-gold mt-1" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase">
                      Guest
                    </span>
                    <p className="text-sm font-medium">
                      {booking.guest_first_name} {booking.guest_last_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.guest_email}
                    </p>
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <span className="text-xs text-muted-foreground uppercase">
                    Hotel
                  </span>
                  <p className="text-sm font-medium">{HOTEL_NAME}</p>
                  <p className="text-xs text-muted-foreground">
                    {HOTEL_ADDRESS}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* 💰 TOTAL */}
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Check-in: {HOTEL_CHECK_IN_TIME} | Check-out:{" "}
                  {HOTEL_CHECK_OUT_TIME}
                </div>

                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Total</span>
                  <p className="text-xl font-bold">
                    {formatCurrency(booking.total_amount, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* 💳 PAYMENT SECTION */}
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-800">
                Complete Your Payment
              </h3>

              <p className="text-sm text-amber-700 mt-1">
                Upload your payment screenshot for verification.
              </p>

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-4 block w-full text-sm bg-gray-100 p-2 rounded-md cursor-pointer"
              />

              {/* PREVIEW */}
              {preview && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full max-h-60 object-contain rounded-md border"
                  />
                </div>
              )}

              {/* ERROR */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* SUCCESS */}
              {success && (
                <p className="text-green-600 text-sm mt-2">
                  Screenshot uploaded successfully. Awaiting confirmation.
                </p>
              )}

              {/* BUTTON */}
              <Button
                onClick={handleUpload}
                disabled={!file || uploading || success}
                className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                {uploading ? "Uploading..." : "Submit Screenshot"}
              </Button>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleDownloadInvoice}
                disabled={downloading}
                variant="outline"
                className="gap-2"
              >
                <Download className="size-4" />
                {downloading ? "Downloading..." : "Download Invoice"}
              </Button>

              <Link href="/booking/" onClick={() => resetBooking()}>
                <Button className="w-full sm:w-auto gap-2">
                  <Home className="size-4" />
                  Return Home
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              A confirmation email has been sent to {booking.guest_email}. For
              any questions, contact us at {HOTEL_PHONE}.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
