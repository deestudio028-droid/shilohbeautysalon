"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Award,
  Users,
  Star,
  Check,
  Calendar,
  Clock,
  Gem,
  Scissors
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// High-Performance Animated Counter component using requestAnimationFrame
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(progress * value);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration, isInView]);

  const decimals = Number.isInteger(value) ? 0 : 1;
  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function AboutPageClient() {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  // Animation variants (retained only for the Hero entrance)
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white overflow-x-hidden flex flex-col w-full">
      <Navbar />

      {/* SECTION 1 — PREMIUM HERO */}
      <section className="relative pt-36 pb-20 border-b border-white/5 bg-[#040816]/60 overflow-hidden">
        {/* Background glow effects - Static for rendering speed */}
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF2D95]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT COLUMN */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
                  ✨ Since 2018
                </motion.div>
                
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF2D95]/10 border border-[#FF2D95]/20 text-xs font-semibold text-white"
                >
                  <Star className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
                  ⭐ 4.9 Google Rating
                  <span className="text-gray-400 font-light mx-1">|</span>
                  📝 141 Reviews
                </motion.div>
              </div>

              {/* Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight"
              >
                About <span className={logoTextGradient}>Shiloh</span> Beauty Salon
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-[#FFD166] text-lg font-light leading-relaxed font-serif"
              >
                Kolathur, Chennai's trusted luxury destination for ladies and kids beauty care, bridal transformations, premium hair treatments, skincare services, and professional grooming.
              </motion.p>

              {/* Story Description */}
              <motion.p
                variants={fadeInUp}
                className="text-gray-300 font-light text-sm sm:text-base leading-relaxed"
              >
                Step into a world of curated beauty rituals where premium therapies meet unmatched customer pampering. For over 8 years, Shiloh Ladies & Kids Beauty Salon has been crafting bespoke transformations, utilizing premium skin-friendly formulations and advanced styling methodologies to help mothers, daughters, and kids look and feel their absolute best.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/appointment"
                  className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-[#FF2D95]/20 hover:shadow-[#7B2CFF]/40 transition-all duration-300"
                >
                  Book Appointment
                </Link>
                <Link
                  href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20beauty%20services."
                  target="_blank"
                  className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Chat on WhatsApp
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-lg shadow-[#FF2D95]/5 group">
                <Image
                  src="/images/shop/salon-1.webp"
                  alt="Shiloh Premium Salon Interior"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Decorative floating badges */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#050B1F]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-[#FF2D95] font-semibold">Our Ambience</p>
                    <p className="text-sm font-medium text-white">Luxury & Safety Combined</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY (Static for performance) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
              <Image
                src="/images/shop/salon-2.webp"
                alt="Shiloh Salon Styling Area"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2CFF]/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right story */}
          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7B2CFF]/10 border border-[#7B2CFF]/20 text-xs tracking-wider uppercase font-semibold text-[#a074ff]">
              Our Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Crafting A Legacy of <span className={goldTextGradient}>Beauty & Trust</span>
            </h2>
            <div className="space-y-4 text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Shiloh Beauty Salon started as a dedicated local beauty studio, focused on providing specialized makeup and grooming. Recognizing the need for a comfortable, premium environment where ladies and kids could get custom pampering, we expanded our facility into a premium, state-of-the-art beauty haven.
              </p>
              <p>
                From hair spa therapies and custom coloring to deep skin brightening, medifacials, and our signature HD bridal makeovers, we have built a reputation of delivering premium standards. Our certified professionals use only top-tier organic, skin-safe formulations.
              </p>
              <p>
                Serving families since 2018, we take pride in our strict hygiene protocols and transparent pricing. At Shiloh, we make every salon session feel like an indulgent beauty retreat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — MEET OUR FOUNDER (Static for performance) */}
      <section className="py-24 bg-[#040816]/40 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2D95]/10 border border-[#FF2D95]/20 text-xs tracking-wider uppercase font-semibold text-[#FF2D95]">
              The Visionary
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Meet The Beauty Expert Behind Shiloh
            </h2>
            <p className="text-gray-400 font-light text-sm">
              Blending advanced skills, luxury aesthetics, and client-centric dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            {/* Left: Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-2 rounded-full border border-white/10 bg-[#050B1F]/60 backdrop-blur-md shadow-lg">
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-[#FFD166]/40 p-1 bg-gradient-to-tr from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF]">
                  <div className="w-full h-full rounded-full bg-[#050B1F] relative overflow-hidden group">
                    <Image
                      src="/images/founder.webp"
                      alt="Shiloh Founder & Lead Stylist"
                      fill
                      sizes="224px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Overlaid Badges */}
                <div className="absolute -bottom-2 -right-4 px-3.5 py-1.5 rounded-xl bg-[#050B1F] border border-[#FFD166]/30 text-[10px] font-bold text-[#FFD166] uppercase shadow-md font-serif">
                  Lead Stylist &amp; Founder
                </div>
              </div>
            </div>

            {/* Right: Bio Details */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif text-[#FFD166]">Shiloh Founder &amp; Lead Stylist</h3>
                <p className="text-[#00D4FF] text-xs font-semibold uppercase tracking-wider">Founder and Lead Beauty Professional</p>
              </div>

              <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
                With years of practical beauty experience, our founder established Shiloh Beauty Salon as a benchmark for customized salon care. Deeply specialized in high-definition HD Glass bridal makeovers and advanced skin barrier restoration, she continues to guide our staff to deliver unparalleled service standards.
              </p>

              {/* Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Years of practical beauty experience",
                  "Specialized in bridal makeup",
                  "Expert in complex hair treatments",
                  "Skin health & medifacial specialist",
                  "Personalized consultation focus",
                  "Hygienic standard pioneer"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#FF2D95]/10 border border-[#FF2D95]/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#FF2D95]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 font-light">{item}</span>
                  </div>
                ))}
              </div>

              {/* Luxury Badges Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Award className="w-5 h-5 text-[#FFD166] mx-auto mb-1.5" />
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">8+ Years Exp</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Gem className="w-5 h-5 text-[#FF2D95] mx-auto mb-1.5" />
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Bridal Expert</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Users className="w-5 h-5 text-[#00D4FF] mx-auto mb-1.5" />
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">Trusted Brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SALON EXPERIENCE (Static for performance) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/5">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-xs tracking-wider uppercase font-semibold text-[#00D4FF]">
            Elite Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            A Crafted Luxury Salon Experience
          </h2>
          <p className="text-gray-400 font-light text-sm max-w-lg mx-auto">
            Discover a bespoke selection of custom care programs designed to elevate your styles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Bridal */}
          <div
            className="glass-card p-8 rounded-3xl border border-white/5 relative group hover:border-[#FF2D95]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF2D95]/10 border border-[#FF2D95]/20 flex items-center justify-center text-[#FF2D95] group-hover:scale-110 transition-transform duration-300">
                <Gem className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#FF2D95] transition-colors">Premium Bridal Services</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Stunning makeovers designed to highlight your natural elegance on your special day.
                </p>
              </div>
              <ul className="space-y-2.5 pt-2">
                {["HD Bridal Makeup", "Reception Makeup", "Bridal Hair Styling", "Saree Draping"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#FF2D95] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Card 2: Hair Care */}
          <div
            className="glass-card p-8 rounded-3xl border border-white/5 relative group hover:border-[#7B2CFF]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#7B2CFF]/10 border border-[#7B2CFF]/20 flex items-center justify-center text-[#7B2CFF] group-hover:scale-110 transition-transform duration-300">
                <Scissors className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#7B2CFF] transition-colors">Hair &amp; Scalp Care</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Deep nourishment and technical styling tailored for your unique hair structure.
                </p>
              </div>
              <ul className="space-y-2.5 pt-2">
                {["Luxury Hair Spa", "Hair Fall Treatments", "Scalp Detox Therapy", "Custom Hair Coloring"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B2CFF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#7B2CFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Card 3: Skin Care */}
          <div
            className="glass-card p-8 rounded-3xl border border-white/5 relative group hover:border-[#00D4FF]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#00D4FF] transition-colors">Skin &amp; Beauty Treatments</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Restore skin health, repair barriers, and indulge in deep body relaxation.
                </p>
              </div>
              <ul className="space-y-2.5 pt-2">
                {["Luxury Facials", "Skin Brightening", "Detan & Bleach", "Premium Pedicure/Manicure"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — INSIDE SHILOH (Static for performance) */}
      <section className="py-24 bg-[#040816]/30 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF2D95]/10 border border-[#FF2D95]/20 text-xs tracking-wider uppercase font-semibold text-[#FF2D95]">
              Visual Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              Step Inside Our Beauty World
            </h2>
            <p className="text-gray-400 font-light text-sm max-w-lg mx-auto">
              Glance through actual interior photos showing our clean, hygienic, and luxurious salon facilities in Chennai.
            </p>
          </div>

          {/* Premium Masonry Layout using 4 shop images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Large Featured Image (Grid span 5) */}
            <div
              className="md:col-span-5 relative min-h-[400px] rounded-3xl overflow-hidden border border-white/10 group shadow-md"
            >
              <Image
                src="/images/shop/salon-3.webp"
                alt="Shiloh Luxury Ambience"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-left">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] rounded-full text-white">Luxury Ambience</span>
                <h4 className="text-lg font-serif font-bold text-white mt-2">Elegant Decor</h4>
              </div>
            </div>

            {/* Stacked Images Column (Grid span 4) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* Stacked Image 1 */}
              <div
                className="relative flex-1 min-h-[190px] rounded-3xl overflow-hidden border border-white/10 group shadow-md"
              >
                <Image
                  src="/images/shop/salon-4.webp"
                  alt="Premium Beauty Treatment Zone"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="px-2.5 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-white/10 border border-white/10 rounded-full text-white">Premium Beauty Care</span>
                  <h4 className="text-sm font-serif font-bold text-white mt-1">Facial &amp; Skin Care Room</h4>
                </div>
              </div>

              {/* Stacked Image 2 */}
              <div
                className="relative flex-1 min-h-[190px] rounded-3xl overflow-hidden border border-white/10 group shadow-md"
              >
                <Image
                  src="/images/shop/salon-5.webp"
                  alt="Bridal Dressing area"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="px-2.5 py-0.5 text-[9px] uppercase font-bold tracking-widest bg-white/10 border border-white/10 rounded-full text-white">Bridal Studio</span>
                  <h4 className="text-sm font-serif font-bold text-white mt-1">Makeup Vanity</h4>
                </div>
              </div>
            </div>

            {/* Wide Featured Image (Grid span 3) */}
            <div
              className="md:col-span-3 relative min-h-[400px] rounded-3xl overflow-hidden border border-white/10 group shadow-md"
            >
              <Image
                src="/images/shop/salon-6.webp"
                alt="Shiloh Salon Hair Styling Area"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 30vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
              <div className="absolute bottom-6 left-6 text-left">
                <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#7B2CFF] rounded-full text-white">Professional Services</span>
                <h4 className="text-lg font-serif font-bold text-white mt-2">Styling Lounges</h4>
              </div>
            </div>
          </div>

          {/* Ambience CTA */}
          <div className="pt-8 max-w-xl mx-auto space-y-4">
            <h3 className="text-lg font-semibold font-serif text-white">Love Our Salon Ambience?</h3>
            <p className="text-xs text-gray-400 font-light">
              Experience the hygiene, comfort, and state-of-the-art beauty equipment yourself.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D95] text-xs font-semibold uppercase tracking-wider text-white rounded-full hover:scale-105 transition-transform duration-300"
            >
              <Calendar className="w-4 h-4" />
              Book Your Visit Today
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHY CUSTOMERS LOVE US (Static for performance) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/5">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD166]/10 border border-[#FFD166]/20 text-xs tracking-wider uppercase font-semibold text-[#FFD166]">
            Our Metrics
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            Why Customers <span className={goldTextGradient}>Love Shiloh</span>
          </h2>
          <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
            The mathematical summary of our commitment to quality, loyalty, and customer happiness.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: "Founded Year", stat: 2018, prefix: "", suffix: "" },
            { label: "Customers Served", stat: 1000, prefix: "", suffix: "+" },
            { label: "Google Rating", stat: 4.9, prefix: "", suffix: "" },
            { label: "Ladies & Kids Specialist", stat: 100, prefix: "", suffix: "%" },
            { label: "Premium Beauty Care", stat: 5, prefix: "⭐️ ", suffix: " Star" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col justify-center space-y-2 group hover:border-[#FFD166]/30 transition-all duration-300"
            >
              <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider font-serif group-hover:text-[#FFD166] transition-colors">{item.label}</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                {item.prefix}
                {typeof item.stat === "number" ? (
                  <AnimatedCounter value={item.stat} />
                ) : (
                  item.stat
                )}
                {item.suffix}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — MISSION & VISION (Static for performance) */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div
            className="p-8 sm:p-10 rounded-3xl bg-[#040816]/40 border border-white/10 relative overflow-hidden group hover:border-[#FF2D95]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF2D95]/10 border border-[#FF2D95]/20 flex items-center justify-center text-[#FF2D95] mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-3 text-white group-hover:text-[#FF2D95] transition-colors">Our Mission</h3>
            <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
              To empower women and their children by providing customized, premium beauty therapies that build confidence, repair skin barrier health, and nourish the body. We pledge to utilize only certified chemical-free, organic, and luxury salon products.
            </p>
            <div className="absolute inset-0 border border-transparent group-hover:border-[#FF2D95]/20 rounded-3xl pointer-events-none" />
          </div>

          {/* Vision */}
          <div
            className="p-8 sm:p-10 rounded-3xl bg-[#040816]/40 border border-white/10 relative overflow-hidden group hover:border-[#7B2CFF]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#7B2CFF]/10 border border-[#7B2CFF]/20 flex items-center justify-center text-[#7B2CFF] mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif mb-3 text-white group-hover:text-[#7B2CFF] transition-colors">Our Vision</h3>
            <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed">
              To remain the flagship luxury beauty brand in the region, mentoring the next generation of cosmetologists through our academy while expanding our sterile home-salon dispatch services to serve families far and wide.
            </p>
            <div className="absolute inset-0 border border-transparent group-hover:border-[#7B2CFF]/20 rounded-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* SECTION 8 — CUSTOMER FIRST PROMISE (Static for performance) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Checklist */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-xs tracking-wider uppercase font-semibold text-[#00D4FF]">
                Our Vow
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                Our Customer-First Promise
              </h2>
              <p className="text-gray-400 font-light text-sm">
                We believe beauty care should be transparent, sterile, and tailored. Here is what we promise:
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: "Personalized Consultation", desc: "No generic suggestions. We analyze your skin and hair type carefully first." },
                { title: "Premium Products", desc: "We use only certified salon-grade, skin-friendly, and chemical-free cosmetics." },
                { title: "Hygienic Environment", desc: "100% sterilized instruments, disposable salon sheets, and deep cleaning." },
                { title: "Experienced Professionals", desc: "Certified beauty therapists trained in global styling methodologies." },
                { title: "Transparent Pricing", desc: "No unexpected bills or aggressive upselling. Everything is transparent." },
                { title: "Quality Service", desc: "We take our time to make sure your styles, drapes, and cuts are perfect." },
                { title: "Family Friendly Atmosphere", desc: "A cozy, warm luxury salon environment safe for ladies and children." },
                { title: "Customer Satisfaction Focus", desc: "We prioritize your comfort and target your exact aesthetic goals." }
              ].map((promise, idx) => (
                <div key={idx} className="flex gap-3 items-start text-left">
                  <div className="w-6 h-6 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-serif">{promise.title}</h4>
                    <p className="text-xs text-gray-400 font-light mt-0.5 leading-relaxed">{promise.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
              <Image
                src="/images/shop/salon-7.webp"
                alt="Shiloh Salon Skin & Hair Care session"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B1F]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL LUXURY CTA (Static for performance) */}
      <section className="py-20 relative overflow-hidden bg-[#040816]/80">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF2D95]/10 via-[#7B2CFF]/5 to-[#00D4FF]/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold font-serif">
              Ready For Your Beauty Transformation?
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Book your appointment today and experience the elegance, care, and professionalism that make Shiloh Beauty Salon a trusted choice for families.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/appointment"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Book Appointment
            </Link>
            <Link
              href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20beauty%20services."
              target="_blank"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366]/20 border border-[#25D366]/30 hover:bg-[#25D366]/30 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Chat On WhatsApp
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-full hover:scale-105 transition-transform duration-300"
            >
              Visit Salon
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
