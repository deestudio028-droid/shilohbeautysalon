import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Product } from "@/lib/supabase";

interface ProductsShowcaseProps {
  products: Product[];
}

export default function ProductsShowcase({ products }: ProductsShowcaseProps) {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Professional <span className={logoTextGradient}>Hair & Skin Care</span>
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-xl">
              We use and prescribe premium salon products formulation to keep your hair and skin looking radiant long after your appointment.
            </p>
          </div>
          <Link 
            href="/products" 
            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[#FF2D95] hover:text-[#7B2CFF] transition-colors duration-300 group shrink-0"
          >
            See All Products
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-5 space-y-4">
                <div className="relative h-48 w-full bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <Sparkles className="absolute w-8 h-8 text-[#FFD166]/10" />
                      <span className="text-xs text-gray-500 font-serif">Product Image</span>
                    </>
                  )}
                </div>
                <h3 className="text-md font-bold font-serif text-white">{product.name}</h3>
                <p className="text-gray-400 font-light text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="p-5 pt-0">
                <Link
                  href={`https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20buy%20or%20enquire%20about%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 border border-white/10 rounded-lg hover:border-[#FF2D95] hover:bg-[#FF2D95]/10 transition-all duration-300"
                >
                  Enquire on WhatsApp
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
