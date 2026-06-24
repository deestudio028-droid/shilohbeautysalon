import { db } from "@/lib/supabase";
import ReviewsPageClient from "./ReviewsPageClient";

export const metadata = {
  title: "Customer Reviews & Feedbacks | Shiloh Beauty Salon Kolathur",
  description: "Read real reviews and feedback from our happy customers about bridal makeup, hair care, skin care, and kids services at Shiloh Salon Chennai.",
};

export default async function ReviewsPage() {
  // Fetch reviews on the server side
  const feedbacks = await db.getFeedbacks();
  
  // Filter for approved feedbacks on the server
  const approvedReviews = feedbacks.filter((f) => f.status === "Approved");

  return <ReviewsPageClient initialReviews={approvedReviews} />;
}
