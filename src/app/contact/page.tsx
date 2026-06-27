import Link from "next/link";
import { Sparkles, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#00D4FF]/5 blur-[150px] animate-float" />
        <div className="absolute bottom-[25%] left-[-15%] w-[45%] h-[45%] rounded-full bg-[#FF2D95]/5 blur-[150px] animate-float-delayed" />
      </div>

      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166] animate-fade-in"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Connect With Us
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif animate-fade-in"
          >
            Get In <span className={logoTextGradient}>Touch</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed animate-fade-in"
          >
            Have a question about a service, custom bridal package, or academy admission? Connect with our client relations team directly.
          </p>
        </div>
      </section>

      {/* CONTACT INFO & MAP */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* INFO COL */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-bold font-serif text-[#FFD166] text-left">Salon Information</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <a
                href="https://maps.app.goo.gl/nnaUsdKC25bb4JEZA"
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 items-start text-left hover:opacity-90 group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF2D95] group-hover:bg-[#FF2D95]/10 shrink-0 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-serif group-hover:text-[#FF2D95] transition-colors">Our Location</h4>
                  <p className="text-sm font-light text-white mt-1 leading-relaxed underline decoration-white/10 decoration-dotted group-hover:text-white transition-colors">
                    2th, Selvam Nagar Cross St,<br />
                    Thillai Nagar, Senthil Nagar,<br />
                    Kolathur, Chennai,<br />
                    Tamil Nadu 600099
                  </p>
                </div>
              </a>

              {/* Phones */}
              <a
                href="tel:+919962110080"
                className="flex gap-4 items-start text-left hover:opacity-90 group transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] group-hover:bg-[#00D4FF]/10 shrink-0 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-serif group-hover:text-[#00D4FF] transition-colors">Call Hotline</h4>
                  <p className="text-sm font-light text-white mt-1 leading-relaxed group-hover:text-white transition-colors">
                    +91 9962110080
                  </p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex gap-4 items-start text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7A00] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-serif">Salon Hours</h4>
                  <p className="text-sm font-light text-white mt-1 leading-relaxed">
                    Monday – Saturday: 10:00 AM – 8:00 PM <br />
                    Sunday: 10:30 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 text-left space-y-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#00D4FF]" />
                <h3 className="font-semibold text-white font-serif">Instant WhatsApp Chat</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Have questions about our services, bridal packages, skincare treatments, or product recommendations? Chat directly with our team on WhatsApp for quick assistance.
              </p>
              <Link
                href="https://wa.me/919962110080?text=Hi%20Shiloh%20Salon%2C%20I%20would%20like%20to%20enquire%20about%20your%20services%20and%20rates."
                target="_blank"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] rounded-xl hover:scale-[1.01]"
              >
                Send WhatsApp Message
              </Link>
            </div>
          </div>

          {/* MAP COL */}
          <div className="lg:col-span-7 h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl group">
            {/* Embed responsive Google Map centering on Chennai, Kolathur */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.642954848356!2d80.20968!3d13.1240!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526402777b7cc1%3A0x6b306b986e11894a!2sSelvam%20Nagar%20Cross%20St%2C%20Selvam%20Nagar%2C%20Kolathur%2C%20Chennai%2C%20Tamil%20Nadu%20600099!5e0!3m2!1sen!2sin!4v1719225000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale filter contrast-125 opacity-80 group-hover:scale-[1.01] transition-transform duration-500"
            />
            {/* Overlay to dim maps and match visual aesthetics */}
            <div className="absolute inset-0 bg-[#050B1F]/20 pointer-events-none" />
            {/* Clickable Overlay Link to Google Maps */}
            <a
              href="https://maps.app.goo.gl/nnaUsdKC25bb4JEZA"
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="py-2.5 px-5 bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#FF2D95]/20">
                Get Directions
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
