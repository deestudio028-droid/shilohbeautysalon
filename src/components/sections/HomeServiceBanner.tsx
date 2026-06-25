import Link from "next/link";
import { Home, Star } from "lucide-react";

export default function HomeServiceBanner() {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <section className="py-20 relative overflow-hidden border-y border-white/5 bg-[#030714]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.05),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card p-10 sm:p-16 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[10px] tracking-widest uppercase font-semibold text-[#00D4FF]">
              <Home className="w-3.5 h-3.5" />
              Luxury At Home
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-none">
              Bring The Salon <span className={logoTextGradient}>To Your Home</span>
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl">
              Enjoy our complete menu of hair styling, facials, pedicures, and bridal rituals from the absolute convenience of your home. Perfect for weddings, pre-bridal prep, or private pampering sessions. We maintain 100% sterile, hygienic procedures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/appointment?type=home"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-tr from-[#00D4FF] to-[#7B2CFF] rounded-full shadow-lg shadow-[#00D4FF]/10 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Book Home Service
              </Link>
              <Link
                href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20Home%20Beauty%20Services."
                target="_blank"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white border border-white/15 rounded-full hover:bg-white/5 transition-all duration-300"
              >
                WhatsApp Consultation
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="w-64 h-64 rounded-2xl border border-white/10 bg-white/5 relative p-4 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-[#050B1F] rounded-xl flex flex-col justify-center items-center text-center p-4">
                <Star className="w-10 h-10 text-[#FFD166] fill-[#FFD166] mb-3" />
                <span className="text-2xl font-bold font-serif text-white">100%</span>
                <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Hygienic & Safe</span>
                <span className="text-[10px] text-gray-500 mt-2">Disposable Kits Used</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
