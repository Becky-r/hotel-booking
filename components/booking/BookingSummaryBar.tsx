// components/booking/BookingSummaryBar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { CurrencyCode } from "@/lib/constants";

type Props = {
  totalRooms: number;
  totalTypes: number;
  totalBookingPrice?: number;
  currency?: CurrencyCode;
  nights: number;
};

export default function BookingSummaryBar({ totalRooms, totalTypes, totalBookingPrice, currency, nights }: Props) {
  return (
    <div className="sticky bottom-6 mt-6 flex justify-between items-center border rounded-lg p-4 bg-card shadow">
      <span>
        {totalRooms} room{totalRooms > 1 && "s"} across {totalTypes} type
        {totalTypes > 1 && "s"}
        <p className="text-sm text-muted-foreground">
        {nights > 0 && ` for ${nights} night${nights > 1 && "s"}`}
      </p>
        {totalBookingPrice !== undefined && (
        <p className="text-lg font-bold">
          Total: {formatCurrency(totalBookingPrice, currency || "USD")}
        </p>
      )}
      </span>

      

      <Link href="/booking/checkout">
        <Button className="bg-gold text-charcoal hover:bg-gold-dark">
          Proceed <ArrowRight className="ml-2 size-4" />
        </Button>
      </Link>
    </div>
  );
}
