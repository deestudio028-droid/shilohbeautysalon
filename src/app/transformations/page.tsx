import { db } from "@/lib/supabase";
import TransformationsPageClient from "./TransformationsPageClient";

export const metadata = {
  title: "Bridal Transformations & Hair Styling Gallery | Shiloh Beauty Salon",
  description: "Explore our real customer transformation photo gallery. High-definition bridal makeovers, premium hair treatments, and creative haircuts at Shiloh Salon Chennai.",
};

// Always fetch fresh gallery items on each request (not at build time)
export const dynamic = "force-dynamic";

export default async function TransformationsPage() {
  // Fetch gallery items on the server side
  const gallery = await db.getGallery();

  return <TransformationsPageClient initialGallery={gallery} />;
}
