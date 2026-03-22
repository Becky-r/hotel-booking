import type { Metadata } from "next";
import { RoomDetailContent } from "./room-detail-content";
import { notFound } from "next/navigation";
import { getRoomTypeDetails } from "@/lib/api";
import { SplashScreen } from "@/components/layout/splash-screen";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Room Details",
  description:
    "Discover the unique features, amenities, and ambiance of each room type at Kerawi ",
};

interface Props {
  params: {
    id: string;
  };
}

export default async function RoomDetailPage({ params }: Props) {
  try {
    const { id } = await params;
    const room = await getRoomTypeDetails(Number(id));

    if (!room) {
      <SplashScreen />
    }

    return <RoomDetailContent data={room} />;
  } catch (error) {
    console.error("Room detail fetch failed:", error);

    notFound();
  }
}
