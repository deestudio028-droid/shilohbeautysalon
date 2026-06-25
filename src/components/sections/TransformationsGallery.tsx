import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { GalleryItem } from "@/lib/supabase";

interface TransformationsGalleryProps {
  gallery: GalleryItem[];
}

export default function TransformationsGallery({ gallery }: TransformationsGalleryProps) {
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <section className="py-24 bg-[#040816]/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Visual <span className={goldTextGradient}>Transformations</span>
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-xl">
              Explore real results from our bridal packages, haircuts, and skin services. Uncompromised perfection in every detail.
            </p>
          </div>
          <Link 
            href="/transformations" 
            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[#FF2D95] hover:text-[#7B2CFF] transition-colors duration-300 group shrink-0"
          >
            Browse Full Gallery
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.slice(0, 4).map((item) => (
            <div key={item.id} className="relative group h-72 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#00D4FF] font-bold">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold font-serif text-white line-clamp-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
