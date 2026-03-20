"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { useBooking } from "@/contexts/booking-context";
import { formatDate } from "@/lib/format";
import { apiRequest, getServices } from "@/lib/api";
import { toast } from "sonner";
export function CheckoutForm() {
  const router = useRouter();
  const { booking, toggleService, rooms } = useBooking();

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    tin_number: "",
    package_user_amount: "",
  });

  const hasRooms = booking.rooms.length > 0;
  const roomMap = useMemo(() => {
    if (!rooms) return {};
    return Object.fromEntries(rooms.map((r) => [r.room_type, r]));
  }, [rooms]);
  if (!hasRooms) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 py-28">
        <h1 className="text-2xl font-bold">No Rooms Selected</h1>
        <Link href="/booking">
          <Button>
            <ArrowLeft className="mr-2 size-4" />
            Back to Search
          </Button>
        </Link>
      </section>
    );
  }
  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response);
      console.log("Available services:", response);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  /* =========================
     SUBMIT BOOKING
  ========================= */

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      toast.error("Please fill required fields");
      return;
    }

    if (!agreed) {
      toast.error("Accept terms first");
      return;
    }

    if (!booking.checkIn || !booking.checkOut) {
      toast.error("Missing dates");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        check_in: booking.checkIn.toISOString().split("T")[0],
        check_out: booking.checkOut.toISOString().split("T")[0],
        adults: booking.adults,
        children: booking.children,

        guest_first_name: formData.firstName,
        guest_last_name: formData.lastName,
        guest_email: formData.email,
        guest_phone: formData.phone,

        rooms: booking.rooms, // already correct format

        services: booking.services,

        company: formData.company || "",
        tin_number: formData.tin_number || "",
        package_user_amount: formData.package_user_amount || "",
      };
      console.log("Submitting booking with payload:", payload);
      // await apiRequest("POST", "/booking/", payload);

      // setGuestDetails({
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email,
      //   phone: formData.phone,
      // });

      // toast.success("Booking successful!");
      // router.push("/booking/confirmation");
    } catch (err: any) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <section className="border-b py-10">
        <div className="max-w-5xl mx-auto px-4">
          <Link href="/booking" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mt-3">Complete Your Reservation</h1>
        </div>
      </section>

      {/* BODY */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-3 px-4">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* GUEST */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold">Guest Details</h2>

              <div className="grid gap-4 mt-4 sm:grid-cols-2">
                <Input
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Input
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email "
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* OPTIONAL */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold">Optional Info</h2>

              <div className="grid gap-4 mt-4">
                <Input
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <Input
                  placeholder="TIN Number"
                  value={formData.tin_number}
                  onChange={(e) =>
                    setFormData({ ...formData, tin_number: e.target.value })
                  }
                />
             
              </div>
            </div>
            {/* ENHANCE YOUR STAY */}
            {services?.length > 0 && (
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold">Enhance Your Stay</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add extra services to make your experience more comfortable.
                </p>

                <div className="mt-5 space-y-4">
                  {services.map((service) => {
                    const selected = booking.services.includes(service.id);

                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center justify-between border rounded-md p-4 cursor-pointer transition
              ${selected ? "border-gold bg-gold/5" : "hover:shadow-sm"}
            `}
                      >
                        {/* LEFT */}
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base">
                            {service.name}
                          </h3>

                          {service.description && (
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-sm">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(service.price)}
                          </span>

                          <Checkbox
                            checked={selected}
                            onClick={(e) => e.stopPropagation()}
                            onCheckedChange={() => toggleService(service.id)}
                            className="data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-white"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* TERMS */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
              />
              <span className="text-sm">I agree to terms & conditions</span>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold">Summary</h3>

              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <strong>Check-in:</strong>{" "}
                  {booking.checkIn && formatDate(booking.checkIn)}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {booking.checkOut && formatDate(booking.checkOut)}
                </p>
                <p>
                  <strong>Guests:</strong> {booking.adults} Adults,{" "}
                  {booking.children} Children
                </p>

                <Separator />

                <div>
                  <strong>Rooms:</strong>

                  <div className="mt-3 space-y-3">
                    {booking.rooms.map((r) => {
                      const room = roomMap[r.room_type];

                      const imageUrl =
                        room?.images?.[0]?.image ||
                        "https://blocks.astratic.com/img/general-img-landscape.png";

                      return (
                        <div
                          key={r.room_type}
                          className="flex items-center gap-3 border rounded-md p-2"
                        >
                          {/* IMAGE */}
                          <div className="relative w-16 h-12 rounded overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={room?.name || "Room"}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          {/* INFO */}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {room?.name || `Room #${r.room_type}`}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              Quantity: {r.quantity}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
