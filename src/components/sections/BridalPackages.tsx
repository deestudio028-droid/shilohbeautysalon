import Link from "next/link";
import { motion } from "framer-motion";

export default function BridalPackages() {
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  } as const;

  return (
    <section className="py-28 bg-[#040816]/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,44,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#FF2D95]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD166]/20 to-[#FF7A00]/10 border border-[#FFD166]/30 flex items-center justify-center shadow-lg shadow-[#FFD166]/10">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                <path d="M3 17L6 8L12 13L18 8L21 17H3Z" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,209,102,0.1)" />
                <circle cx="6" cy="8" r="1.5" fill="#FFD166" />
                <circle cx="12" cy="13" r="1.5" fill="#FFD166" />
                <circle cx="18" cy="8" r="1.5" fill="#FFD166" />
                <path d="M3 20H21" stroke="#FFD166" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif">
            Royal <span className={goldTextGradient}>Bridal Packages</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Meticulously crafted bridal experiences designed to make you feel like royalty on your most special day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {[
            {
              name: "Bridal Combo — Classic",
              tag: "Most Popular",
              tagColor: "#FF2D95",
              borderColor: "from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00]",
              glowColor: "[#FF2D95]/20",
              services: [
                "Bridal Makeup (HD Glass)",
                "Advanced Hairdos",
                "Saree Draping",
                "Artificial Lashes",
                "Contact Lenses",
                "Hair Extension",
              ]
            },
            {
              name: "Pre-Bridal Glow Package",
              tag: "Signature",
              tagColor: "#7B2CFF",
              borderColor: "from-[#7B2CFF] via-[#00D4FF] to-[#FF2D95]",
              glowColor: "[#7B2CFF]/20",
              services: [
                "Gold Facial",
                "Full Body Waxing",
                "Eyebrow Threading & Shaping",
                "Manicure + Pedicure",
                "Hair Spa Treatment",
                "Mehndi Application",
              ]
            },
            {
              name: "Mehndi + Silk Saree Combo",
              tag: "Cultural",
              tagColor: "#FF7A00",
              borderColor: "from-[#FF7A00] via-[#FFD166] to-[#FF2D95]",
              glowColor: "[#FF7A00]/20",
              services: [
                "Full Hand Mehndi",
                "Silk Saree Draping",
                "Bun / Updo Hairdo",
                "Basic Bridal Makeup",
                "Forehead Jewellery Styling",
                "Neck & Wrist Accessory Assist",
              ]
            },
            {
              name: "Grand Luxury Bridal Suite",
              tag: "Premium",
              tagColor: "#FFD166",
              borderColor: "from-[#FFD166] via-[#FF7A00] to-[#7B2CFF]",
              glowColor: "[#FFD166]/20",
              services: [
                "Airbrush Bridal Makeup",
                "Bridal Hairdo + Extensions",
                "Gold / Skin Brightening Facial",
                "Full Body Wax & Polish",
                "Saree Draping (Box Pleat)",
                "Full Hand Mehndi",
                "Manicure + Pedicure",
                "Lashes + Lenses",
              ]
            }
          ].map((pkg, idx) => (
            <motion.div
              key={idx}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative rounded-2xl p-[1.5px] overflow-hidden"
            >
              {/* Gradient border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pkg.borderColor} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Card inner */}
              <div className="relative rounded-2xl bg-[#050B1F]/90 backdrop-blur-sm h-full p-6 flex flex-col gap-5 group-hover:bg-[#060d26]/90 transition-colors duration-500">
                {/* Glow orb inside card */}
                <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full bg-${pkg.glowColor} blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Crown + Tag */}
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                      <path d="M3 17L6 8L12 13L18 8L21 17H3Z" stroke="#FFD166" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,209,102,0.1)" />
                      <path d="M3 20H21" stroke="#FFD166" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: pkg.tagColor, borderColor: `${pkg.tagColor}40`, backgroundColor: `${pkg.tagColor}10` }}
                  >
                    {pkg.tag}
                  </span>
                </div>

                {/* Package Name */}
                <h3 className="text-base font-bold font-serif text-white leading-snug group-hover:text-[#FFD166] transition-colors duration-300">
                  {pkg.name}
                </h3>

                {/* Services list */}
                <div className="flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[#FFD166] mb-2 font-serif">What&apos;s Included</p>
                  <ul className="space-y-1.5">
                    {pkg.services.map((service, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-gray-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#7B2CFF] shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/appointment?service=${encodeURIComponent(pkg.name)}`}
                    className="text-center py-2.5 text-[11px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#FF2D95]/20"
                  >
                    Book Appointment
                  </Link>
                  <Link
                    href={`https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.`}
                    target="_blank"
                    className="text-center py-2.5 text-[11px] font-bold uppercase tracking-wider text-white border border-white/10 rounded-xl hover:bg-white/5 hover:border-[#FFD166]/30 transition-all duration-300"
                  >
                    WhatsApp Enquiry
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
