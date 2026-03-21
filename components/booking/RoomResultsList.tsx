// components/booking/RoomResultsList.tsx
"use client";

import { formatCurrency } from "@/lib/format";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BookingSummaryBar from "./BookingSummaryBar";
import { CurrencyCode } from "@/lib/constants";
type Room = any; // ← Replace with proper type when you define it

type Props = {
  roomsData: Room[];
  getRoomQuantity: (roomTypeId: number | number) => number;
  updateRoomQuantity: (roomTypeId: number | number, qty: number) => void;
  toggleRoomSelection: (roomTypeId: number | number, selected: boolean) => void;
  isRoomSelected: (roomTypeId: number | number) => boolean;
  currency?: CurrencyCode;
  hasDate: Date | undefined;
  totalTypes: number;
  totalRooms: number;
  nights: number;
  totalBookingPrice?: number;
};

export default function RoomResultsList({
  roomsData,
  getRoomQuantity,
  updateRoomQuantity,
  toggleRoomSelection,
  isRoomSelected,
  currency = "USD", // fallback
  hasDate,
  totalTypes,
  totalRooms,
  nights,
  totalBookingPrice,
}: Props) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">
        {hasDate ? "Available Rooms" : "Select dates"}
      </h2>

      <p className="text-sm text-muted-foreground">
        {roomsData.length} room types
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {roomsData.map((room) => {
          const quantity = getRoomQuantity(room.room_type_id);
          const selected = isRoomSelected(room.room_type_id);
          const pricePerNight = Number(room.price);
          const totalRoomPrice = pricePerNight * nights * quantity;
          const imageUrl =
            room.images?.[0]?.image ||
            "https://blocks.astratic.com/img/general-img-landscape.png";

          return (
            <div
              key={room.room_type_id}
              onClick={() => toggleRoomSelection(room.room_type_id, !selected)}
              className={cn(
                "flex flex-col sm:flex-row overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg cursor-pointer group",
                selected ? "ring-1 ring-gold" : "border-border/50",
              )}
            >
              {/* IMAGE */}
              <div className="relative sm:w-56 h-44 sm:h-auto overflow-hidden">
                <img
                  src={imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 justify-between p-4 items-center">
                {/* LEFT SIDE */}
                <div>
                  <h3 className="text-lg font-bold">{room.name}</h3>

                  <div className="text-sm text-muted-foreground mt-2 space-y-1">
                    <p className="flex items-center gap-1">
                      <Users className="size-3" />
                      {room.capacity} guests
                    </p>

                    <p>
                      Available:{" "}
                      <span className="font-medium">
                        {room.available_rooms}
                      </span>
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end gap-3">
                  {/* PRICE */}
                  <div className="text-right">
                    {selected && quantity > 0 && nights > 0 ? (
                      <>
                        <p className="text-xl font-bold">
                          {formatCurrency(totalRoomPrice, currency)}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          per {nights} night{nights > 1 ? "s" : ""}
                        </span>
                      </>
                    ) : (
                      <>
                        <p className="">
                          {formatCurrency(pricePerNight, currency)}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          per night
                        </span>
                      </>
                    )}
                  </div>

                  {/* QUANTITY + SELECT CIRCLE */}
                  <div className="flex items-center gap-3">
                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        disabled={!selected || quantity === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateRoomQuantity(room.room_type_id, quantity - 1);
                        }}
                      >
                        -
                      </Button>

                      <span className="w-6 text-center">
                        {selected ? quantity : "-"}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        disabled={!selected || quantity >= room.available_rooms}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateRoomQuantity(room.room_type_id, quantity + 1);
                        }}
                      >
                        +
                      </Button>
                    </div>

                    {/* CIRCULAR SELECT */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition",
                        selected
                          ? "bg-gold border-gold"
                          : "bg-white border-gray-300",
                      )}
                    >
                      {selected && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 PROCEED */}
      {totalTypes > 0 && (
        <BookingSummaryBar
          totalRooms={totalRooms}
          totalTypes={totalTypes}
          totalBookingPrice={totalBookingPrice}
          currency={currency}
          nights={nights}
          />
      )}
    </div>
  );
}
