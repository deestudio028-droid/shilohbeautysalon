import Link from "next/link";

export default function CallToAction() {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#050B1F] to-[#030612]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <h2 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
          Step Into a World of <br />
          <span className={logoTextGradient}>Royal Radiance</span>
        </h2>
        <p className="text-gray-300 font-light text-sm sm:text-base max-w-xl mx-auto">
          Book your luxury beauty consultation today. Whether you visit our premium salon or request home services, our expert team is ready to serve you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/appointment"
            className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full shadow-lg shadow-[#FF2D95]/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Book Now
          </Link>
          <Link
            href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20book%20a%20luxury%20beauty%20consultation."
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Chat With Stylist
          </Link>
        </div>
      </div>
    </section>
  );
}
