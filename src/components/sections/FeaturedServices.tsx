import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service } from "@/lib/supabase";

interface FeaturedServicesProps {
  featuredServices: Service[];
}

export default function FeaturedServices({ featuredServices }: FeaturedServicesProps) {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Featured <span className={logoTextGradient}>Beauty Rituals</span>
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-xl">
              Explore our selection of premium services designed to reveal your inner glow. Every treatment is customized to your needs.
            </p>
          </div>
          <Link 
            href="/services" 
            className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-[#FF2D95] hover:text-[#7B2CFF] transition-colors duration-300 group shrink-0"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-[#00D4FF] font-semibold">
                    {service.category}
                  </span>
                  {service.duration && (
                    <span className="text-xs text-gray-500 italic">
                      {service.duration}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold font-serif text-white">{service.name}</h3>
                <p className="text-gray-400 font-light text-xs leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-[#FFD166] mb-1 font-serif uppercase tracking-wider">Benefits:</h4>
                  <ul className="space-y-1">
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3">
                <Link
                  href={`/appointment?service=${encodeURIComponent(service.name)}`}
                  className="flex-1 text-center py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  Book Now
                </Link>
                <Link
                  href={`https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(service.name)}%20service.`}
                  target="_blank"
                  className="flex-1 text-center py-2 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
