import { db } from "@/lib/supabase";
import ReviewsPageClient from "./ReviewsPageClient";

export const metadata = {
  title: "Customer Reviews & Feedbacks | Shiloh Beauty Salon Kolathur",
  description: "Read real reviews and feedback from our happy customers about bridal makeup, hair care, skin care, and kids services at Shiloh Salon Chennai.",
};

// Always fetch fresh approved reviews on each request (not at build time)
export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  const approvedReviews = await db.getFeedbacks({ approvedOnly: true });

  return <ReviewsPageClient initialReviews={approvedReviews} />;
}
