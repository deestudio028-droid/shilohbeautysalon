"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, Phone, ShoppingBag, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Product } from "@/lib/supabase";

interface ProductsPageClientProps {
  initialProducts: Product[];
}

export default function ProductsPageClient({ initialProducts }: ProductsPageClientProps) {
  const products = initialProducts;

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col">
      {/* Background glow effects - Static for max efficiency */}
      <div className="absolute top-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-[#00D4FF]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[#7B2CFF]/5 blur-[150px] pointer-events-none" />

      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Care Prescriptions
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif"
          >
            Professional <span className={logoTextGradient}>Products</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            A curated collection of salon-grade formulations we prescribe during our therapies. Click to enquire or purchase directly via WhatsApp.
          </p>
        </div>
      </section>

      {/* PRODUCT DISPLAY SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            console.log("Product:", product);
            return (
              <div
                key={product.id}
                className="glass-card glass-card-hover p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-12 gap-8 border border-white/5 items-center"
              >
                {/* Product Image representation */}
                <div className="sm:col-span-5 relative h-56 rounded-2xl bg-[#040816] border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  ) : (
                    <div className="p-6 flex flex-col items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-[#FFD166]/10 mb-4" />
                      <span className="text-xs uppercase tracking-widest text-[#FFD166] font-semibold">
                        Shiloh Care
                      </span>
                      <span className="text-[10px] text-gray-500 mt-2">Professional Range</span>
                    </div>
                  )}
                  
                  {/* Decorative glow inside */}
                  <div className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#FF2D95]/10 to-[#7B2CFF]/10 blur-[30px] pointer-events-none" />
                </div>


                {/* Product Details */}
                <div className="sm:col-span-7 space-y-4 text-left flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-serif text-white">{product.name}</h3>
                    <p className="text-gray-300 font-light text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="pt-2 border-t border-white/5 space-y-1.5">
                        <h4 className="text-xs font-semibold text-[#FFD166] uppercase tracking-wider font-serif">Benefits:</h4>
                        <ul className="space-y-1">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00D4FF] shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Link
                      href={`https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20purchasing%20the%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md shadow-[#FF2D95]/10"
                    >
                      <Phone className="w-4 h-4 text-white" />
                      Enquire on WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
