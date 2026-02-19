import type { Metadata } from "next"
import { ReviewsContent } from "./reviews-content"

export const metadata: Metadata = {
  title: "Guest Reviews | The Aurelian",
  description: "Read what our guests say about their experience at The Aurelian. Genuine reviews from verified stays.",
}

export default function ReviewsPage() {
  return <ReviewsContent />
}
