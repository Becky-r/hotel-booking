// components/booking/BookingSummaryBar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
  totalRooms: number;
  totalTypes: number;
};

export default function BookingSummaryBar({ totalRooms, totalTypes }: Props) {
  return (
    <div className="sticky bottom-6 mt-6 flex justify-between items-center border rounded-lg p-4 bg-card shadow">
      <span>
        {totalRooms} room{totalRooms > 1 && "s"} across {totalTypes} type
        {totalTypes > 1 && "s"}
      </span>

      <Link href="/booking/checkout">
        <Button className="bg-gold text-charcoal hover:bg-gold-dark">
          Proceed <ArrowRight className="ml-2 size-4" />
        </Button>
      </Link>
    </div>
  );
}
