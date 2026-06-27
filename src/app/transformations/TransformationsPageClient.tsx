"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { GalleryItem } from "@/lib/supabase";

interface TransformationsPageClientProps {
  initialGallery: GalleryItem[];
}

export default function TransformationsPageClient({ initialGallery }: TransformationsPageClientProps) {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGallery);

  useEffect(() => {
    let cancelled = false;
    let activeChannel: any = null;

    import("@/lib/supabase").then(({ supabase, isSupabaseConfigured, db, mapGalleryItem }) => {
      if (!isSupabaseConfigured || !supabase) return;

      db.getGallery()
        .then((items) => {
          if (!cancelled) setGalleryItems(items);
        })
        .catch((err) => console.error("Gallery data refresh failed:", err));

      const channel = supabase
        .channel("gallery-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "gallery" }, (payload) => {
          if (payload.eventType === "INSERT") {
            const newItem = mapGalleryItem(payload.new as Record<string, unknown>);
            setGalleryItems((prev) => {
              if (prev.some((g) => g.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = mapGalleryItem(payload.new as Record<string, unknown>);
            setGalleryItems((prev) => prev.map((g) => (g.id === updatedItem.id ? updatedItem : g)));
          } else if (payload.eventType === "DELETE") {
            setGalleryItems((prev) => prev.filter((g) => g.id !== payload.old.id));
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);

  const categories = [
    "All",
    "Bridal Looks",
    "Hair Transformations",
    "Skin Care Results",
    "Kids Styling",
    "Home Service Moments"
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  const openLightbox = (id: string) => {
    const idx = filteredItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      setActiveLightboxIdx(idx);
    }
  };

  const closeLightbox = () => {
    setActiveLightboxIdx(null);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIdx !== null && activeLightboxIdx > 0) {
      setActiveLightboxIdx(activeLightboxIdx - 1);
    } else {
      setActiveLightboxIdx(filteredItems.length - 1);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeLightboxIdx !== null && activeLightboxIdx < filteredItems.length - 1) {
      setActiveLightboxIdx(activeLightboxIdx + 1);
    } else {
      setActiveLightboxIdx(0);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIdx === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIdx, filteredItems]);

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Background glow effects - Static */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#7B2CFF]/5 blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#FF2D95]/5 blur-[150px]" />
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Visual Proof
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif"
          >
            Visual <span className={logoTextGradient}>Transformations</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            A high-definition look at our actual bridal combos, hairstyles, chemical treatments, and kids styling. Click any portrait to enlarge.
          </p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/5 pb-8 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] text-white shadow-lg shadow-[#FF2D95]/10"
                  : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* MASONRY GRID - Static rendering for instant response */}
        <div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-2xl border border-white/15 bg-[#040816] break-inside-avoid cursor-pointer shadow-lg hover:shadow-[#FF2D95]/10 transition-all duration-500"
              onClick={() => openLightbox(item.id)}
            >
              {/* Image */}
              <div className="relative w-full h-auto min-h-[300px]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#050B1F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#00D4FF]">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom title strip for desktop */}
              <div className="p-4 bg-gradient-to-t from-[#050B1F] via-[#050B1F]/90 to-transparent border-t border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-[#FFD166] font-semibold">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold font-serif text-white line-clamp-1 mt-0.5">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-light">No transformations loaded in this category yet.</p>
          </div>
        )}
      </section>

      {/* LIGHTBOX POPUP */}
      {activeLightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10 select-none animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar info */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 text-white">
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#00D4FF] font-semibold">
                {filteredItems[activeLightboxIdx].category}
              </span>
              <span className="text-sm font-bold font-serif">
                {filteredItems[activeLightboxIdx].title}
              </span>
            </div>
            <button 
              onClick={closeLightbox}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-10 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image container */}
          <div
            className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredItems[activeLightboxIdx].imageUrl}
              alt={filteredItems[activeLightboxIdx].title}
              fill
              className="object-contain max-h-full"
              priority
            />
          </div>

          {/* Right navigation */}
          <button
            onClick={nextImage}
            className="absolute right-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-10 hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swipe hints for mobile */}
          <div className="absolute bottom-6 text-xs text-gray-500 font-light flex items-center gap-4 sm:hidden">
            <span onClick={prevImage} className="underline active:text-[#FF2D95]">Prev</span>
            <span>•</span>
            <span onClick={nextImage} className="underline active:text-[#FF2D95]">Next</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
