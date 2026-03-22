import { format, differenceInDays, parseISO } from "date-fns";
import { CURRENCIES, type CurrencyCode } from "./constants";

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = "USD",
): string {
  const currency = CURRENCIES.find((c) => c.code === currencyCode);
  if (!currency) return `$${amount.toFixed(2)}`;
  const converted = amount * currency.rate;
  return `${currency.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatDate(
  date: string | Date | undefined | null,
  pattern: string = "MMM d, yyyy",
): string {
  if (!date) return "-";

  try {
    const d = typeof date === "string" ? parseISO(date) : date;
    return format(d, pattern);
  } catch {
    return "-";
  }
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  return differenceInDays(checkOut, checkIn);
}

export function formatDateRange(checkIn: Date, checkOut: Date): string {
  return `${format(checkIn, "MMM d")} - ${format(checkOut, "MMM d, yyyy")}`;
}
