import { db } from "@/lib/supabase";
import HomePageClient from "./HomePageClient";

// Always fetch fresh gallery/reviews on each request (not at build time)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Pre-fetch all necessary data on the server-side to minimize client-side load states
  const allServices = await db.getServices();
  const featuredServices = allServices.filter(s => s.category !== "Bridal Services").slice(0, 4);

  const allProducts = await db.getProducts();
  const products = allProducts.slice(0, 4);

  const allGallery = await db.getGallery();
  const gallery = allGallery.slice(0, 4);

  const approvedReviews = await db.getFeedbacks({ approvedOnly: true });

  return (
    <HomePageClient
      initialServices={featuredServices}
      initialProducts={products}
      initialGallery={gallery}
      initialReviews={approvedReviews}
    />
  );
}
