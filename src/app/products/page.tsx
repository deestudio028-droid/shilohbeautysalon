import { db } from "@/lib/supabase";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: "Premium Haircare & Skincare Products | Shiloh Beauty Salon Chennai",
  description: "Browse our professional salon range of skin-friendly haircare and skincare cosmetics at Shiloh Salon Kolathur.",
};

export default async function ProductsPage() {
  // Fetch products on the server side
  const products = await db.getProducts();

  return <ProductsPageClient initialProducts={products} />;
}
