"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Transformations", href: "/transformations" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO — real brand image */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#FF2D95]/40 ring-offset-2 ring-offset-[#050B1F] group-hover:ring-[#7B2CFF]/60 transition-all duration-300 shadow-lg shadow-[#FF2D95]/20">
                <Image
                  src="/images/logo.webp"
                  alt="Shiloh Ladies & Kids Beauty Salon Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent font-serif">
                  Shiloh
                </span>
                <span className="text-[8px] uppercase tracking-[0.28em] text-[#FFD166] font-medium -mt-0.5">
                  Ladies &amp; Kids Salon
                </span>
              </div>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm uppercase tracking-wider transition-colors duration-300 font-medium ${
                      isActive ? "text-[#FFD166]" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLink"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="https://wa.me/919962110080" 
                target="_blank"
                className="p-2 text-gray-300 hover:text-[#00D4FF] hover:bg-white/5 rounded-full transition-colors duration-300"
                title="WhatsApp Enquiries"
              >
                <Phone className="w-5 h-5" />
              </Link>
              <Link
                href="/appointment"
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#FF2D95]/20 hover:shadow-[#7B2CFF]/40 glow-pink"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="md:hidden flex items-center gap-3">
              <Link
                href="/appointment"
                className="relative inline-flex p-2 text-white bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-full hover:scale-105"
              >
                <Calendar className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[#050B1F]/97 backdrop-blur-xl flex flex-col justify-center px-6 pt-20"
          >
            {/* Mobile logo */}
            <div className="flex justify-center mb-10">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#FF2D95]/40 ring-offset-4 ring-offset-[#050B1F] shadow-2xl shadow-[#FF2D95]/30">
                <Image
                  src="/images/logo.webp"
                  alt="Shiloh Salon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 mb-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl uppercase tracking-widest font-semibold font-serif ${
                      isActive ? "text-[#FFD166]" : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-4 items-center">
              <Link
                href="/appointment"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-xs text-center py-3 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full shadow-lg"
              >
                Book Appointment
              </Link>
              <Link
                href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20beauty%20services."
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="w-full max-w-xs text-center py-3 text-sm font-semibold uppercase tracking-wider text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300"
              >
                WhatsApp Chat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
