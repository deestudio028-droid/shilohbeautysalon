import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030714] text-gray-400 pt-16 pb-8 border-t border-white/5 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#7B2CFF]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#FF2D95]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#FF2D95]/30 ring-offset-2 ring-offset-[#030714] group-hover:ring-[#7B2CFF]/50 transition-all duration-300 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Shiloh Ladies & Kids Beauty Salon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent font-serif">
                  Shiloh
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#FFD166] font-medium -mt-0.5">
                  Ladies &amp; Kids Salon
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Indulge in royal beauty rituals designed to elevate your style and restore your skin's youthful radiance. Shiloh is Kolathur, Chennai's premier luxury salon for modern ladies and children.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* WhatsApp icon */}
              <Link
                href="https://wa.me/919962110080"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#FF2D95] hover:bg-white/10 text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
              </Link>
              {/* Instagram representation */}
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#7B2CFF] hover:bg-white/10 text-white transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4 md:pl-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <Link href="/services" className="hover:text-[#FF2D95] transition-colors duration-300">Our Services</Link>
              </li>
              <li>
                <Link href="/transformations" className="hover:text-[#7B2CFF] transition-colors duration-300">Transformations</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#00D4FF] transition-colors duration-300">Professional Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFD166] transition-colors duration-300">About Our Salon</Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-[#FF7A00] transition-colors duration-300">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* BUSINESS HOURS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-serif">Opening Hours</h4>
            <ul className="space-y-2 text-sm font-light">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Monday - Saturday</span>
                <span className="text-white font-medium">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Sunday</span>
                <span className="text-white font-medium">10:30 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-serif">Get in Touch</h4>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF2D95] mt-1 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/nnaUsdKC25bb4JEZA"
                  target="_blank"
                  rel="noreferrer"
                  className="leading-tight hover:text-white transition-colors"
                >
                  2th, Selvam Nagar Cross St, Thillai Nagar, Senthil Nagar, Kolathur, Chennai, Tamil Nadu 600099
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00D4FF] shrink-0" />
                <a href="tel:+919962110080" className="hover:text-white transition-colors">
                  +91 9962110080
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#FF7A00] shrink-0" />
                <span>Prior booking recommended</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p className="text-gray-500 font-light">
            &copy; {currentYear} Shiloh Ladies & Kids Beauty Salon. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-gray-500 font-light mt-2 md:mt-0">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#FF2D95] fill-current" /> by{" "}
            <Link href="https://deestudio.it.com" className="text-gray-400 hover:text-white font-medium transition-colors duration-300">
              DeeStudio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
