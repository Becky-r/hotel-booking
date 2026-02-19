"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface RoomGalleryProps {
  images: string[]
  name: string
}

export function RoomGallery({ images, name }: RoomGalleryProps) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <Image
          src={images[selected]}
          alt={`${name} - Photo ${selected + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={cn(
              "relative aspect-[4/3] w-20 overflow-hidden rounded-md transition-all md:w-24",
              selected === idx
                ? "ring-2 ring-gold ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            )}
            aria-label={`View photo ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${name} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
