import type { Metadata } from "next"
import { GalleryContent } from "./gallery-content"

export const metadata: Metadata = {
  title: "Gallery | The Kerawi",
  description: "Explore the elegance of The Kerawi through our curated gallery of images and videos.",
}

export default function GalleryPage() {
  return <GalleryContent />
}
