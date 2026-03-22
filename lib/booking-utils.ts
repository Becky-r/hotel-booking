import { isWeekend } from "date-fns";
import type { Room } from "./data/rooms";
import {
  TAX_RATE,
  SERVICE_CHARGE_RATE,
  PROMO_CODES,
  HOTEL_NAME,
  HOTEL_ADDRESS,
  HOTEL_PHONE,
} from "./constants";
import { formatCurrency, formatDate } from "./format";

export function getPriceForDate(room: Room, date: Date): number {
  if (isHoliday(date)) return room.holidayPrice;
  if (isWeekend(date)) return room.weekendPrice;
  return room.basePrice;
}

function isHoliday(date: Date): boolean {
  const holidays = ["01-01", "07-04", "12-25", "12-31"];
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return holidays.includes(mmdd);
}

export function calculateStayPrice(
  room: Room,
  checkIn: Date,
  checkOut: Date,
): {
  nights: number;
  pricePerNight: number[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  averagePerNight: number;
} {
  const nights: number[] = [];
  const current = new Date(checkIn);
  while (current < checkOut) {
    nights.push(getPriceForDate(room, current));
    current.setDate(current.getDate() + 1);
  }
  const subtotal = nights.reduce((a, b) => a + b, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const serviceCharge = Math.round(subtotal * SERVICE_CHARGE_RATE * 100) / 100;
  const total = Math.round((subtotal + tax + serviceCharge) * 100) / 100;
  const averagePerNight =
    nights.length > 0 ? Math.round(subtotal / nights.length) : 0;

  return {
    nights: nights.length,
    pricePerNight: nights,
    subtotal,
    tax,
    serviceCharge,
    total,
    averagePerNight,
  };
}

export function applyPromoCode(
  code: string,
  subtotal: number,
): { valid: boolean; discount: number; description: string } {
  const promo = PROMO_CODES[code.toUpperCase()];
  if (!promo)
    return { valid: false, discount: 0, description: "Invalid promo code" };

  const discount =
    promo.type === "percent"
      ? Math.round(subtotal * (promo.discount / 100) * 100) / 100
      : Math.min(promo.discount, subtotal);

  return { valid: true, discount, description: promo.description };
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  return `AUR-${year}-${num}`;
}

export function checkRoomAvailability(
  roomId: string,
  checkIn: Date,
  checkOut: Date,
): boolean {
  // Mock: always available
  void roomId;
  void checkIn;
  void checkOut;
  return true;
}

export const ADD_ONS = [
  { id: "breakfast", name: "Breakfast Package", price: 0, per: "per night" },
  { id: "airport", name: "Airport Transfer", price: 120, per: "one way" },

  { id: "baby-bed", name: "Baby Bed", price: 0, per: "complimentary" },
  {
    id: "late-checkout",
    name: "Late Checkout (2 PM)",
    price: 6.7,
    per: "one time",
  },
  { id: "pet", name: "Pet Accommodation", price: 50, per: "per night" },
] as const;

import jsPDF from "jspdf";

function safe(value: any) {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function currencyFormat(amount: any, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(Number(amount || 0));
}

export function downloadInvoice(booking: any, currency: string = "USD") {
  if (!booking) return;

  const doc = new jsPDF();

  let y = 20;

  // =========================
  // 🏨 HEADER
  // =========================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(HOTEL_NAME, 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(HOTEL_ADDRESS, 14, y);

  y += 5;
  doc.text(`Phone: ${HOTEL_PHONE}`, 14, y);

  // Invoice title
  doc.setFontSize(16);
  doc.text("INVOICE", 160, 20);

  y += 15;

  doc.line(14, y, 196, y);
  y += 10;

  // =========================
  // 🔢 BOOKING INFO
  // =========================
  doc.setFont("helvetica", "bold");
  doc.text("Booking Information", 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");

  doc.text(`Reference: ${safe(booking.reference)}`, 14, y);
  y += 6;
  doc.text(`Booked on: ${new Date(booking.created_at).toLocaleDateString()}`, 14, y);

  y += 6;
  doc.text(`Status: ${safe(booking.status)}`, 14, y);

  y += 12;

  // =========================
  // 👤 GUEST INFO
  // =========================
  doc.setFont("helvetica", "bold");
  doc.text("Guest Information", 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");

  doc.text(
    `Full Name: ${safe(booking.guest_first_name)} ${safe(booking.guest_last_name)}`,
    14,
    y,
  );

  y += 6;
  doc.text(`Email: ${safe(booking.guest_email)}`, 14, y);

  y += 6;
  doc.text(`Phone: ${safe(booking.guest_phone)}`, 14, y);

  y += 12;

  // =========================
  // 📅 STAY DETAILS
  // =========================
  doc.setFont("helvetica", "bold");
  doc.text("Stay Details", 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");

  doc.text(`Check-in: ${safe(booking.check_in)}`, 14, y);
  doc.text(`Check-out: ${safe(booking.check_out)}`, 80, y);

  y += 12;

  // =========================
  // 🛏️ ROOMS TABLE
  // =========================
  doc.setFont("helvetica", "bold");
  doc.text("Rooms", 14, y);

  y += 6;

  doc.setFontSize(11);
  doc.text("Room Type", 14, y);
  doc.text("Room No", 80, y);
  doc.text("Price/Night", 120, y);

  y += 4;
  doc.line(14, y, 196, y);

  doc.setFont("helvetica", "normal");

  booking.rooms?.forEach((room: any) => {
    y += 8;

    doc.text(safe(room.room_type), 14, y);
    doc.text(safe(room.room_number), 80, y);
    doc.text(currencyFormat(room.price_per_night, currency), 120, y);
  });

  // =========================
  // 🧾 SERVICES TABLE
  // =========================
  if (booking.services?.length > 0) {
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.text("Services", 14, y);

    y += 6;

    doc.text("Service", 14, y);
    doc.text("Qty", 100, y);
    doc.text("Price", 130, y);

    y += 4;
    doc.line(14, y, 196, y);

    doc.setFont("helvetica", "normal");

    booking.services.forEach((service: any) => {
      y += 8;

      doc.text(safe(service.name), 14, y);
      doc.text(safe(service.quantity), 100, y);
      doc.text(currencyFormat(service.calculated_price, currency), 130, y);
    });
  }

  // =========================
  // 💰 TOTALS
  // =========================
  y += 15;

  doc.line(120, y, 196, y);

  y += 8;
  doc.setFont("helvetica", "bold");

  doc.text(`Tax: ${currencyFormat(booking.tax_amount, currency)}`, 120, y);

  y += 8;

  doc.setFontSize(14);
  doc.text(`Total: ${currencyFormat(booking.total_amount, currency)}`, 120, y);

  // =========================
  // 🧾 FOOTER
  // =========================
  y += 20;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text("Thank you for choosing our hotel.", 14, y);

  y += 5;

  doc.text("This is a system-generated invoice.", 14, y);

  // =========================
  // ⬇️ DOWNLOAD
  // =========================
  doc.save(`invoice-${booking.reference}.pdf`);
}
