import { db } from "@/lib/supabase";
import ServicesPageClient from "./ServicesPageClient";

export const metadata = {
  title: "Ladies & Kids Salon Services Menu | Shiloh Beauty Salon Chennai",
  description: "Browse our comprehensive beauty services menu. Hair care, scalp treatments, glowing facials, waxing, and specialized bridal packages at Shiloh Salon Chennai.",
};

export default async function ServicesPage() {
  // Fetch services on the server side
  const services = await db.getServices();

  return <ServicesPageClient initialServices={services} />;
}
