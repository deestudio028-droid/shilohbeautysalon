"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Baby, 
  Home, 
  ArrowRight, 
  Star,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { db, Service, Product, GalleryItem, Feedback } from "@/lib/supabase";

interface HomePageClientProps {
  initialServices: Service[];
  initialProducts: Product[];
  initialGallery: GalleryItem[];
  initialReviews: Feedback[];
}

export default function HomePageClient({
  initialServices,
  initialProducts,
  initialGallery,
  initialReviews
}: HomePageClientProps) {
  const featuredServices = initialServices;
  const products = initialProducts;
  const gallery = initialGallery;
  const reviews = initialReviews;

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  // Animations variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  } as const;

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  } as const;


  return (
    <div className="bg-[#050B1F] min-h-screen relative text-white font-sans selection:bg-[#FF2D95] selection:text-white">
      {/* Subtle global glow for sections below hero */}
      <div className="absolute top-[65%] left-[-8%] w-[40%] h-[40%] rounded-full bg-[#7B2CFF]/6 blur-[180px] pointer-events-none animate-float" />
      <div className="absolute top-[85%] right-[-8%] w-[35%] h-[35%] rounded-full bg-[#FF2D95]/5 blur-[180px] pointer-events-none animate-float-delayed" />

      <Navbar />

      {/* ══════════════════════════════════════════
           HERO — Luxury Beauty Brand
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">

        {/* ── L0: Base gradient — deep warm navy ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_180%_100%_at_60%_-20%,#0d0520_0%,#050B1F_50%,#040816_100%)] pointer-events-none" />

        {/* ── L1: Brand-color mesh ── */}
        <div className="absolute inset-0 hero-mesh pointer-events-none" />

        {/* ── L2: Silk diagonal luster (fabric/beauty feel) ── */}
        <div className="absolute inset-0 hero-silk pointer-events-none" />

        {/* ── L3: Large soft bokeh — salon window light ── */}
        {/* Gold top-center bokeh */}
        <div className="bokeh-1 absolute -top-[20%] left-[35%] w-[50%] h-[50%] rounded-full bg-[#FFD166]/10 blur-[100px] pointer-events-none" />
        {/* Pink left bokeh */}
        <div className="bokeh-2 absolute top-[15%] -left-[15%] w-[55%] h-[60%] rounded-full bg-[#FF2D95]/10 blur-[110px] pointer-events-none" />
        {/* Purple right bokeh */}
        <div className="bokeh-3 absolute top-[5%] right-[-10%] w-[50%] h-[55%] rounded-full bg-[#7B2CFF]/12 blur-[120px] pointer-events-none" />
        {/* Cyan bottom bokeh */}
        <div className="bokeh-4 absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#00D4FF]/7 blur-[100px] pointer-events-none" />

        {/* ── L4: Bridal silhouette — barely visible ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/bridal-silhouette.webp"
            alt=""
            fill
            className="object-contain object-right-bottom"
            style={{ opacity: 0.04, mixBlendMode: "luminosity" }}
            aria-hidden="true"
          />
        </div>

        {/* ── L5: Vignette — focus attention inward ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(4,8,22,0.65)_100%)] pointer-events-none" />

        {/* ── L6: SVG ornamental beauty accents ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

          {/* Top-left floral corner ornament */}
          <svg className="ornament-float absolute -top-4 -left-4 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none">
            <path d="M10 10 Q50 2 60 40 Q70 2 110 10 Q102 50 140 60 Q102 70 110 110 Q70 102 60 140 Q50 102 10 110 Q18 70 -20 60 Q18 50 10 10Z" stroke="#FFD166" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="60" r="8" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
            <path d="M60 20 L60 100 M20 60 L100 60" stroke="#FFD166" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="60" cy="60" r="25" stroke="#FF2D95" strokeWidth="0.6" fill="none" strokeDasharray="4 6"/>
            <path d="M40 10 Q60 30 80 10" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
            <path d="M10 40 Q30 60 10 80" stroke="#FFD166" strokeWidth="0.8" fill="none"/>
          </svg>

          {/* Bottom-right mirrored corner ornament */}
          <svg className="ornament-float absolute -bottom-4 -right-4 w-64 h-64 opacity-[0.06]" viewBox="0 0 200 200" fill="none" style={{ transform: "rotate(180deg)" }}>
            <path d="M10 10 Q50 2 60 40 Q70 2 110 10 Q102 50 140 60 Q102 70 110 110 Q70 102 60 140 Q50 102 10 110 Q18 70 -20 60 Q18 50 10 10Z" stroke="#7B2CFF" strokeWidth="1" fill="none"/>
            <circle cx="60" cy="60" r="8" stroke="#7B2CFF" strokeWidth="0.8" fill="none"/>
            <path d="M60 20 L60 100 M20 60 L100 60" stroke="#7B2CFF" strokeWidth="0.5" opacity="0.6"/>
            <circle cx="60" cy="60" r="25" stroke="#FF2D95" strokeWidth="0.6" fill="none" strokeDasharray="4 6"/>
          </svg>

          {/* Top-right elegant curved hair-flow line */}
          <svg className="absolute top-0 right-0 w-[45%] h-[60%] opacity-[0.05]" viewBox="0 0 400 500" fill="none">
            <path d="M380 0 C300 80 420 160 320 240 C220 320 340 400 260 480" stroke="#FFD166" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M420 30 C340 110 460 190 360 270 C260 350 380 430 300 510" stroke="#FF2D95" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Bottom-left hair-flow curves */}
          <svg className="absolute bottom-0 left-0 w-[40%] h-[55%] opacity-[0.05]" viewBox="0 0 400 500" fill="none">
            <path d="M20 500 C100 420 -20 340 80 260 C180 180 60 100 140 20" stroke="#7B2CFF" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M-20 470 C60 390 -60 310 40 230 C140 150 20 70 100 -10" stroke="#FFD166" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Centre-right vertical ornamental divider */}
          <svg className="absolute top-[10%] right-[5%] w-6 h-[80%] opacity-[0.07]" viewBox="0 0 20 600" fill="none">
            <line x1="10" y1="0" x2="10" y2="600" stroke="#FFD166" strokeWidth="0.5" strokeDasharray="3 10"/>
            <circle cx="10" cy="50"  r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="150" r="2"   fill="#FF2D95"/>
            <circle cx="10" cy="250" r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="350" r="2"   fill="#7B2CFF"/>
            <circle cx="10" cy="450" r="2.5" fill="#FFD166"/>
            <circle cx="10" cy="550" r="2"   fill="#FF2D95"/>
          </svg>

          {/* Small scattered diamond gems */}
          {[
            { x: "15%", y: "20%", rot: "0deg",  color: "#FFD166", size: 10 },
            { x: "82%", y: "35%", rot: "45deg", color: "#FF2D95", size: 8  },
            { x: "8%",  y: "72%", rot: "30deg", color: "#7B2CFF", size: 7  },
            { x: "75%", y: "78%", rot: "15deg", color: "#FFD166", size: 9  },
            { x: "45%", y: "88%", rot: "60deg", color: "#00D4FF", size: 6  },
          ].map((gem, i) => (
            <svg
              key={i}
              className="absolute opacity-[0.08]"
              style={{ left: gem.x, top: gem.y, width: gem.size * 2, height: gem.size * 2, transform: `rotate(${gem.rot})` }}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M10 0 L20 8 L10 20 L0 8 Z" stroke={gem.color} strokeWidth="1.2" fill={`${gem.color}20`}/>
              <path d="M0 8 L20 8" stroke={gem.color} strokeWidth="0.6" opacity="0.5"/>
            </svg>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* TEXT COLUMN */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-7">

              {/* Elegant serif tagline in gold */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-xs uppercase tracking-[0.35em] font-medium text-[#FFD166]/80 font-serif italic"
              >
                ✦ &nbsp; Where Beauty Meets Royalty &nbsp; ✦
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] font-serif"
              >
                Luxury Hair &amp; <br />
                <span className={logoTextGradient}>Beauty Salon</span>
              </motion.h1>

              {/* Thin gold divider line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                className="w-24 h-px bg-gradient-to-r from-[#FFD166] to-transparent mx-auto lg:mx-0 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-300 font-light text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Step into a premium sanctuary designed for the modern woman and child. Expert bridal styling, skin rituals, and haircare inspired by royal beauty traditions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full shadow-[0_0_28px_rgba(255,45,149,0.30)] hover:shadow-[0_0_45px_rgba(255,45,149,0.50)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
                <Link
                  href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20services."
                  target="_blank"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-[#FFD166]/20 rounded-full bg-[#FFD166]/[0.03] hover:bg-[#FFD166]/[0.07] hover:border-[#FFD166]/40 hover:shadow-[0_0_20px_rgba(255,209,102,0.12)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4 mr-2 text-[#FFD166]" />
                  WhatsApp Enquiry
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="flex items-center gap-8 pt-1 justify-center lg:justify-start border-t border-white/5 pt-6"
              >
                {[
                  { num: "500+", label: "Happy Clients"    },
                  { num: "10+",  label: "Years Expertise"  },
                  { num: "100%", label: "Premium Products" },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="text-xl font-bold font-serif bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent">{stat.num}</p>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* LOGO COLUMN — triple beauty glow */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
              >
                {/* Gold outer glow — warm salon light */}
                <div className="logo-pulse-ring absolute inset-[-15%] rounded-full bg-[#FFD166]/8 blur-[70px]" />

                {/* Pink mid glow */}
                <div className="logo-pulse-ring absolute inset-[-5%] rounded-full bg-[#FF2D95]/14 blur-[50px]" style={{ animationDelay: "1.3s" }} />

                {/* Purple inner glow */}
                <div className="logo-pulse-ring absolute w-[85%] h-[85%] rounded-full bg-[#7B2CFF]/18 blur-[35px]" style={{ animationDelay: "0.7s" }} />

                {/* Very slow elegant ring (not tech spinning) */}
                <div className="absolute inset-0 rounded-full border border-[#FFD166]/15 animate-[spin_180s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-dashed border-[#FF2D95]/10 animate-[spin_240s_linear_infinite_reverse]" />

                {/* Small ornamental diamond markers on the ring */}
                {[0, 90, 180, 270].map((deg, i) => {
                  const r = 48;
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rotate-45 bg-[#FFD166]/40 border border-[#FFD166]/60"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * r}% - 3px)`,
                        top: `calc(50% + ${Math.sin(rad) * r}% - 3px)`,
                      }}
                    />
                  );
                })}

                {/* Logo — gently floating */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[68%] h-[68%] rounded-full overflow-hidden
                    ring-[2px] ring-[#FFD166]/30
                    ring-offset-[6px] ring-offset-[#050B1F]
                    shadow-[0_0_50px_rgba(255,209,102,0.20),0_0_100px_rgba(255,45,149,0.15),0_0_150px_rgba(123,44,255,0.10)]"
                >
                  <Image
                    src="/images/logo.webp"
                    alt="Shiloh Ladies & Kids Beauty Salon"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* WHY CHOOSE US */}
      <section className="py-24 border-y border-white/5 bg-[#040816]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Why Discerning Clients <span className={goldTextGradient}>Trust Shiloh</span>
            </h2>
            <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
              We redefine beauty standards through specialized expertise, uncompromising hygiene, and a royal hospitality experience.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Award className="w-8 h-8 text-[#FFD166]" />,
                title: "Royal Experience",
                desc: "Every visit is curated to make you feel like royalty with premium drinks, luxurious robes, and undivided attention."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#00D4FF]" />,
                title: "Premium Products",
                desc: "We exclusively employ world-renowned, skin-safe, and chemical-free luxury brands for all hair and skin therapies."
              },
              {
                icon: <Sparkles className="w-8 h-8 text-[#FF2D95]" />,
                title: "Bridal Maestros",
                desc: "Celebrated for our flawless HD Glass Bridal Makeup, intricate mehndi designs, and professional saree box-pleating."
              },
              {
                icon: <Baby className="w-8 h-8 text-[#FF7A00]" />,
                title: "Kids Specialized",
                desc: "A warm, patient, and completely kid-safe environment featuring pediatric styling chairs and kid-friendly products."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold font-serif text-white">{card.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOME SERVICE BANNER */}
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

      {/* BRIDAL COMBOS — Glassmorphism Cards (No Images) */}
      <section className="py-28 bg-[#040816]/40 relative overflow-hidden">
        {/* Decorative radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,44,255,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#FF2D95]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-20 space-y-5">
            {/* Crown icon */}
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
          </motion.div>

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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
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

      {/* PRODUCTS SHOWCASE */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
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
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              console.log("Product:", product);
              return (
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
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS GALLERY PREVIEW */}
      <section className="py-24 bg-[#040816]/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
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
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.slice(0, 4).map((item, idx) => (
              <div key={item.id} className="relative group h-72 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
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

      {/* CUSTOMER REVIEWS */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div {...fadeInUp} className="space-y-4 max-w-xl text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD166] inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#FFD166]" /> Customer Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">
                What Our <span className={logoTextGradient}>Royalty Say</span>
              </h2>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Read authentic, verified feedback from clients who have experienced Shiloh's signature pampering.
              </p>
            </motion.div>

            {/* Quick Stats Summary Card */}
            <motion.div
              {...fadeInUp}
              className="glass-card px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-6 shrink-0"
            >
              <div className="text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block">Average Rating</span>
                <span className={`text-3xl font-extrabold block ${goldTextGradient}`}>
                  {averageRating}
                </span>
                <div className="flex gap-0.5 justify-center mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const avg = parseFloat(averageRating);
                    return (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(avg) ? "text-[#FFD166] fill-[#FFD166]" : "text-gray-700"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block">Total Reviews</span>
                <span className="text-3xl font-extrabold text-white block">{totalReviews}</span>
                <span className="text-[9px] text-green-400 uppercase font-semibold block">100% Verified</span>
              </div>
            </motion.div>
          </div>

          {reviews.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl border border-white/5 text-center">
              <p className="text-gray-400 text-sm">No customer reviews yet. Be the first to share your experience!</p>
              <div className="mt-4">
                <Link
                  href="/feedback"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-md transition-all"
                >
                  Write a Review
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.slice(0, 6).map((review) => {
                  const reviewDate = new Date(review.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  });

                  return (
                    <div
                      key={review.id}
                      className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all duration-300 group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating ? "text-[#FFD166] fill-[#FFD166]" : "text-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] text-gray-500 font-medium">{reviewDate}</span>
                        </div>

                        <p className="text-gray-300 font-light text-xs sm:text-sm leading-relaxed text-left line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                          "{review.message}"
                        </p>

                        {review.photo_url && (
                          <div className="relative h-32 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900 mt-2">
                            <Image
                              src={review.photo_url}
                              alt={`${review.customer_name}'s review`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-white/5 mt-6 text-left">
                        <h4 className="text-xs sm:text-sm font-bold font-serif text-white">{review.customer_name}</h4>
                        <span className="text-[9px] text-[#00D4FF] uppercase tracking-wider font-semibold">
                          Service: {review.service_name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View All Reviews Button */}
              <div className="text-center pt-4">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  View All Reviews
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#050B1F] to-[#030612]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <motion.h2 {...fadeInUp} className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
            Step Into a World of <br />
            <span className={logoTextGradient}>Royal Radiance</span>
          </motion.h2>
          <motion.p {...fadeInUp} className="text-gray-300 font-light text-sm sm:text-base max-w-xl mx-auto">
            Book your luxury beauty consultation today. Whether you visit our premium salon or request home services, our expert team is ready to serve you.
          </motion.p>
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/appointment"
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full shadow-lg"
            >
              Book Now
            </Link>
            <Link
              href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20book%20a%20luxury%20beauty%20consultation."
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              Chat With Stylist
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
