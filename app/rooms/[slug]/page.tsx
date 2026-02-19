import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { rooms, getRoomBySlug } from "@/lib/data/rooms"
import { RoomDetailContent } from "./room-detail-content"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) return { title: "Room Not Found" }
  return {
    title: room.name,
    description: room.shortDescription,
  }
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }))
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params
  const room = getRoomBySlug(slug)
  if (!room) notFound()

  return <RoomDetailContent room={room} />
}
