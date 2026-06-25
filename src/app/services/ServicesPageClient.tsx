"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, CheckCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Service } from "@/lib/supabase";

interface ServicesPageClientProps {
  initialServices: Service[];
}

export default function ServicesPageClient({ initialServices }: ServicesPageClientProps) {
  const [allServices] = useState<Service[]>(initialServices);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Services");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dynamically extract unique categories from services database
  const uniqueCategories = Array.from(new Set(allServices.map(s => s.category).filter(Boolean)));

  // Expected sorting order
  const expectedOrder = [
    "Threading",
    "Bleach",
    "Waxing",
    "Haircut",
    "Hair Colouring",
    "Facial",
    "Massage Treatment",
    "Pedicure",
    "Manicure",
    "Spa & Wellness",
    "Training Courses"
  ];

  // Sort unique categories according to expectedOrder, appending any others alphabetically
  const sortedCategories = uniqueCategories.sort((a, b) => {
    const indexA = expectedOrder.indexOf(a);
    const indexB = expectedOrder.indexOf(b);
    
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const categories = ["All Services", ...sortedCategories];

  const filteredServices = allServices.filter((service) => {
    const matchesCategory = selectedCategory === "All Services" || service.category === selectedCategory;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Background glow effects - Static for GPU efficiency */}
      <div className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#FF2D95]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[45%] h-[45%] rounded-full bg-[#7B2CFF]/5 blur-[150px] pointer-events-none" />

      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Royal Rituals
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif"
          >
            Our Service <span className={logoTextGradient}>Rituals</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Explore our curated beauty menu. To maintain absolute luxury standards, all pricing is discussed during personalized styling consultations.
          </p>
        </div>
      </section>

      {/* RITUALS BROWSER SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col gap-8 mb-12">
          {/* Search bar */}
          <div className="relative max-w-md w-full mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search services, treatments, benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 focus:ring-1 focus:ring-[#FF2D95] transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/5 pb-6">
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
        </div>

        {/* SERVICE GRID */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-white/5"
            >
              <div className="p-8 space-y-6">
                {/* Category & duration banner */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-full">
                    {service.category}
                  </span>
                  {service.duration && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-600" />
                      {service.duration}
                    </span>
                  )}
                </div>

                {/* Header Title */}
                <h3 className="text-xl font-bold font-serif text-white">{service.name}</h3>
                
                {/* Description */}
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <h4 className="text-xs font-semibold text-[#FFD166] uppercase tracking-widest font-serif flex items-center gap-1.5">
                      Key Benefits:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#FF2D95] shrink-0 mt-0.5" />
                          <span className="leading-normal">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-8 pt-0 flex gap-4">
                <Link
                  href={`/appointment?service=${encodeURIComponent(service.name)}`}
                  className="flex-1 text-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md shadow-[#FF2D95]/10"
                >
                  Book Now
                </Link>
                <Link
                  href={`https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(service.name)}%20service.`}
                  target="_blank"
                  className="flex-1 text-center py-3 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <p className="text-gray-500 font-light text-base">No services found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All Services"); setSearchQuery(""); }}
              className="text-sm font-semibold text-[#FF2D95] underline hover:text-[#7B2CFF]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
