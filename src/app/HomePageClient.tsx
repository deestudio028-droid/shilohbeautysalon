"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Calendar, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { Service, Product, GalleryItem, Feedback } from "@/lib/supabase";

// Dynamically import heavy sections to optimize bundle size (Navbar + Hero only in initial bundle)
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), { ssr: true });
const FeaturedServices = dynamic(() => import("@/components/sections/FeaturedServices"), { ssr: true });
const HomeServiceBanner = dynamic(() => import("@/components/sections/HomeServiceBanner"), { ssr: true });
const BridalPackages = dynamic(() => import("@/components/sections/BridalPackages"), { ssr: true });
const ProductsShowcase = dynamic(() => import("@/components/sections/ProductsShowcase"), { ssr: true });
const TransformationsGallery = dynamic(() => import("@/components/sections/TransformationsGallery"), { ssr: true });
const CustomerReviews = dynamic(() => import("@/components/sections/CustomerReviews"), { ssr: true });
const CallToAction = dynamic(() => import("@/components/sections/CallToAction"), { ssr: true });

interface HomePageClientProps {
  initialServices: Service[];
  initialProducts: Product[];
  initialGallery: GalleryItem[];
  initialReviews: Feedback[];
}

export default function HomePageClient({
  initialServices,
  initialProducts,
  initialGallery,
  initialReviews
}: HomePageClientProps) {
  const [featuredServices, setFeaturedServices] = useState<Service[]>(initialServices);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [reviews, setReviews] = useState<Feedback[]>(initialReviews);

  useEffect(() => {
    let cancelled = false;
    let activeChannel: any = null;

    import("@/lib/supabase").then(({ supabase, isSupabaseConfigured, db, mapFeedback, mapGalleryItem }) => {
      if (!isSupabaseConfigured || !supabase) return;

      // Refresh from DB on mount so data is current even if SSR was cached
      Promise.all([
        db.getGallery().then((items) => {
          if (!cancelled) setGallery(items.slice(0, 4));
        }),
        db.getFeedbacks({ approvedOnly: true }).then((items) => {
          if (!cancelled) setReviews(items);
        }),
      ]).catch((err) => console.error("Homepage data refresh failed:", err));

      const channel = supabase.channel("homepage-realtime");

      channel
        .on("postgres_changes", { event: "*", schema: "public", table: "services" }, (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem: Service = {
              id: payload.new.id,
              name: payload.new.name,
              category: payload.new.category || "",
              description: payload.new.description || "",
              duration: payload.new.duration || "",
              benefits: payload.new.benefits || [],
              imageUrl: payload.new.image_url || ""
            };
            if (newItem.category !== "Bridal Services") {
              setFeaturedServices((prev) => [newItem, ...prev].slice(0, 4));
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedItem: Service = {
              id: payload.new.id,
              name: payload.new.name,
              category: payload.new.category || "",
              description: payload.new.description || "",
              duration: payload.new.duration || "",
              benefits: payload.new.benefits || [],
              imageUrl: payload.new.image_url || ""
            };
            if (updatedItem.category === "Bridal Services") {
              setFeaturedServices((prev) => prev.filter((s) => s.id !== updatedItem.id));
            } else {
              setFeaturedServices((prev) => prev.map((s) => (s.id === payload.new.id ? updatedItem : s)));
            }
          } else if (payload.eventType === "DELETE") {
            setFeaturedServices((prev) => prev.filter((s) => s.id !== payload.old.id));
          }
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem: Product = {
              id: payload.new.id,
              name: payload.new.name,
              description: payload.new.description || "",
              benefits: payload.new.benefits || [],
              imageUrl: payload.new.image_url || ""
            };
            setProducts((prev) => [newItem, ...prev].slice(0, 4));
          } else if (payload.eventType === "UPDATE") {
            const updatedItem: Product = {
              id: payload.new.id,
              name: payload.new.name,
              description: payload.new.description || "",
              benefits: payload.new.benefits || [],
              imageUrl: payload.new.image_url || ""
            };
            setProducts((prev) => prev.map((p) => (p.id === payload.new.id ? updatedItem : p)));
          } else if (payload.eventType === "DELETE") {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "gallery" }, (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapGalleryItem(payload.new as Record<string, unknown>);
            setGallery((prev) => {
              if (prev.some((g) => g.id === newItem.id)) return prev;
              return [newItem, ...prev].slice(0, 4);
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapGalleryItem(payload.new as Record<string, unknown>);
            setGallery((prev) => prev.map((g) => (g.id === updatedItem.id ? updatedItem : g)));
          } else if (payload.eventType === "DELETE") {
            setGallery((prev) => prev.filter((g) => g.id !== payload.old.id));
          }
        })
        .on("postgres_changes", { event: "*", schema: "public", table: "feedbacks" }, (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapFeedback(payload.new as Record<string, unknown>);
            if (newItem.status === "Approved") {
              setReviews((prev) => {
                if (prev.some((r) => r.id === newItem.id)) return prev;
                return [newItem, ...prev];
              });
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapFeedback(payload.new as Record<string, unknown>);
            if (updatedItem.status === "Approved") {
              setReviews((prev) => {
                const exists = prev.some((r) => r.id === updatedItem.id);
                if (exists) {
                  return prev.map((r) => (r.id === updatedItem.id ? updatedItem : r));
                }
                return [updatedItem, ...prev];
              });
            } else {
              setReviews((prev) => prev.filter((r) => r.id !== updatedItem.id));
            }
          } else if (payload.eventType === "DELETE") {
            setReviews((prev) => prev.filter((r) => r.id !== payload.old.id));
          }
        })
        .subscribe();

      activeChannel = channel;
    });

    return () => {
      cancelled = true;
      if (activeChannel) {
        import("@/lib/supabase").then(({ supabase }) => {
          if (supabase) {
            supabase.removeChannel(activeChannel);
          }
        });
      }
    };
  }, []);

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <div className="bg-[#050B1F] min-h-screen relative text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Subtle global background glows - Static (no float animation) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[65%] left-[-8%] w-[40%] h-[40%] rounded-full bg-[#7B2CFF]/6 blur-[180px]" />
        <div className="absolute top-[85%] right-[-8%] w-[35%] h-[35%] rounded-full bg-[#FF2D95]/5 blur-[180px]" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════════
           HERO — Luxury Beauty Brand
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* ── L0: Base gradient — deep warm navy ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_180%_100%_at_60%_-20%,#0d0520_0%,#050B1F_50%,#040816_100%)] pointer-events-none" />

        {/* ── L1: Brand-color mesh ── */}
        <div className="absolute inset-0 hero-mesh pointer-events-none" />

        {/* ── L2: Silk diagonal luster (fabric/beauty feel) - static overlay for GPU efficiency ── */}
        <div className="absolute inset-0 hero-silk pointer-events-none" style={{ animation: "none" }} />

        {/* ── L3: Large soft bokeh — salon window light (Static for high performance) ── */}
        <div className="absolute -top-[20%] left-[35%] w-[50%] h-[50%] rounded-full bg-[#FFD166]/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[15%] -left-[15%] w-[55%] h-[60%] rounded-full bg-[#FF2D95]/10 blur-[110px] pointer-events-none" />
        <div className="absolute top-[5%] right-[-10%] w-[50%] h-[55%] rounded-full bg-[#7B2CFF]/12 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#00D4FF]/7 blur-[100px] pointer-events-none" />

        {/* ── L4: Bridal silhouette — eager-loaded & prioritized for Hero paint performance ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/bridal-silhouette.webp"
            alt=""
            fill
            className="object-contain object-right-bottom"
            style={{ opacity: 0.04, mixBlendMode: "luminosity" }}
            aria-hidden="true"
            priority
          />
        </div>

        {/* ── L5: Vignette — focus attention inward ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(4,8,22,0.65)_100%)] pointer-events-none" />

        {/* ── L6: SVG ornamental beauty accents ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Top-left floral corner ornament */}
          <svg className="absolute -top-4 -left-4 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
            <path d="M10 10 Q50 2 60 40 Q70 2 110 10 Q102 50 140 60 Q102 70 110 110 Q70 102 60 140 Q50 102 10 110 Q18 70 -20 60 Q18 50 10 10Z" stroke="#FFD166" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="60" r="8" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
            <path d="M60 20 L60 100 M20 60 L100 60" stroke="#FFD166" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="60" cy="60" r="25" stroke="#FF2D95" strokeWidth="0.6" fill="none" strokeDasharray="4 6"/>
            <path d="M40 10 Q60 30 80 10" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
            <path d="M10 40 Q30 60 10 80" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
          </svg>

          {/* Bottom-right mirrored corner ornament */}
          <svg className="absolute -bottom-4 -right-4 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none" style={{ transform: "rotate(180deg)" }}>
            <path d="M10 10 Q50 2 60 40 Q70 2 110 10 Q102 50 140 60 Q102 70 110 110 Q70 102 60 140 Q50 102 10 110 Q18 70 -20 60 Q18 50 10 10Z" stroke="#7B2CFF" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="60" r="8" stroke="#7B2CFF" strokeWidth="0.8" fill="none"/>
            <path d="M60 20 L60 100 M20 60 L100 60" stroke="#7B2CFF" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="60" cy="60" r="25" stroke="#FF2D95" strokeWidth="0.6" fill="none" strokeDasharray="4 6"/>
          </svg>

          {/* Top-right elegant curved hair-flow line */}
          <svg className="absolute top-0 right-0 w-[45%] h-[60%] opacity-[0.05]" viewBox="0 0 400 500" fill="none">
            <path d="M380 0 C300 80 420 160 320 240 C220 320 340 400 260 480" stroke="#FFD166" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M420 30 C340 110 460 190 360 270 C260 350 380 430 300 510" stroke="#FF2D95" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Bottom-left hair-flow curves */}
          <svg className="absolute bottom-0 left-0 w-[40%] h-[55%] opacity-[0.05]" viewBox="0 0 400 500" fill="none">
            <path d="M20 500 C100 420 -20 340 80 260 C180 180 60 100 140 20" stroke="#7B2CFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M-20 470 C60 390 -60 310 40 230 C140 150 20 70 100 -10" stroke="#FFD166" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Centre-right vertical ornamental divider */}
          <svg className="absolute top-[10%] right-[5%] w-6 h-[80%] opacity-[0.07]" viewBox="0 0 20 600" fill="none">
            <line x1="10" y1="0" x2="10" y2="600" stroke="#FFD166" strokeWidth="0.5" strokeDasharray="3 10"/>
            <circle cx="10" cy="50"  r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="150" r="2"   fill="#FF2D95"/>
            <circle cx="10" cy="250" r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="350" r="2"   fill="#7B2CFF"/>
            <circle cx="10" cy="450" r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="550" r="2"   fill="#FF2D95"/>
          </svg>

          {/* Small scattered diamond gems */}
          {[
            { x: "15%", y: "20%", rot: "0deg",  color: "#FFD166", size: 10 },
            { x: "82%", y: "35%", rot: "45deg", color: "#FF2D95", size: 8  },
            { x: "8%",  y: "72%", rot: "30deg", color: "#7B2CFF", size: 7  },
            { x: "75%", y: "78%", rot: "15deg", color: "#FFD166", size: 9  },
            { x: "45%", y: "88%", rot: "60deg", color: "#00D4FF", size: 6  },
          ].map((gem, i) => (
            <svg
              key={i}
              className="absolute opacity-[0.08]"
              style={{ left: gem.x, top: gem.y, width: gem.size * 2, height: gem.size * 2, transform: `rotate(${gem.rot})` }}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M10 0 L20 8 L10 20 L0 8 Z" stroke={gem.color} strokeWidth="1.2" fill={`${gem.color}20`}/>
              <path d="M0 8 L20 8" stroke={gem.color} strokeWidth="0.6" opacity="0.5"/>
            </svg>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* TEXT COLUMN */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-7">
              {/* Elegant serif tagline in gold */}
              {/* Elegant serif tagline in gold */}
              <p
                className="text-xs uppercase tracking-[0.35em] font-medium text-[#FFD166]/80 font-serif italic animate-fade-in"
              >
                ✦ &nbsp; Where Beauty Meets Royalty &nbsp; ✦
              </p>
 
              <h1
                className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] font-serif animate-fade-in"
              >
                Luxury Hair &amp; <br />
                <span className={logoTextGradient}>Beauty Salon</span>
              </h1>
 
              {/* Thin gold divider line */}
              <div
                className="w-24 h-px bg-gradient-to-r from-[#FFD166] to-transparent mx-auto lg:mx-0 origin-left animate-fade-in"
              />
 
              <p
                className="text-gray-300 font-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in"
              >
                Step into a premium sanctuary designed for the modern woman and child. Expert bridal styling, skin rituals, and haircare inspired by royal beauty traditions.
              </p>
 
              <div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-fade-in"
              >
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full shadow-[0_0_20px_rgba(255,45,149,0.25)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
                <Link
                  href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20services."
                  target="_blank"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-[#FFD166]/20 rounded-full bg-[#FFD166]/[0.03] hover:bg-[#FFD166]/[0.07] hover:border-[#FFD166]/40 hover:shadow-[0_0_20px_rgba(255,209,102,0.12)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4 mr-2 text-[#FFD166]" />
                  WhatsApp Enquiry
                </Link>
              </div>
 
              {/* Stats row */}
              <div
                className="flex items-center gap-8 pt-1 justify-center lg:justify-start border-t border-white/5 pt-6 animate-fade-in"
              >
                {[
                  { num: "500+", label: "Happy Clients"    },
                  { num: "10+",  label: "Years Expertise"  },
                  { num: "100%", label: "Premium Products" },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="text-xl font-bold font-serif bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent">{stat.num}</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LOGO COLUMN — static optimized logo container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
                {/* Gold outer glow — optimized ambient highlight */}
                <div className="absolute inset-[-15%] rounded-full bg-[#FFD166]/5 blur-[70px]" />
                {/* Pink mid glow */}
                <div className="absolute inset-[-5%] rounded-full bg-[#FF2D95]/8 blur-[50px]" />
                {/* Purple inner glow */}
                <div className="absolute w-[85%] h-[85%] rounded-full bg-[#7B2CFF]/10 blur-[35px]" />

                {/* Static decorative border rings (animation disabled for rendering speed) */}
                <div className="absolute inset-0 rounded-full border border-[#FFD166]/15" />
                <div className="absolute inset-6 rounded-full border border-dashed border-[#FF2D95]/10" />

                {/* Small ornamental diamond markers on the ring */}
                {[0, 90, 180, 270].map((deg, i) => {
                  const r = 48;
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rotate-45 bg-[#FFD166]/40 border border-[#FFD166]/60"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * r}% - 3px)`,
                        top: `calc(50% + ${Math.sin(rad) * r}% - 3px)`,
                      }}
                    />
                  );
                })}

                {/* Logo — static & optimized shadow to prevent GPU lag */}
                <div
                  className="relative z-10 w-[68%] h-[68%] rounded-full overflow-hidden
                    ring-[2px] ring-[#FFD166]/30
                    ring-offset-[6px] ring-offset-[#050B1F]
                    shadow-[0_0_35px_rgba(255,209,102,0.15)]"
                >
                  <Image
                    src="/images/logo.webp"
                    alt="Shiloh Ladies & Kids Beauty Salon"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic/Lazy Loaded Sections */}
      <WhyChooseUs />
      <FeaturedServices featuredServices={featuredServices} />
      <HomeServiceBanner />
      <BridalPackages />
      <ProductsShowcase products={products} />
      <TransformationsGallery gallery={gallery} />
      <CustomerReviews reviews={reviews} averageRating={averageRating} totalReviews={totalReviews} />
      <CallToAction />

      <Footer />
    </div>
  );
}
