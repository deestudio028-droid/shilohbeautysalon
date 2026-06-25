import { Award, ShieldCheck, Sparkles, Baby } from "lucide-react";

export default function WhyChooseUs() {
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <section className="py-24 border-y border-white/5 bg-[#040816]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">
            Why Discerning Clients <span className={goldTextGradient}>Trust Shiloh</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            We redefine beauty standards through specialized expertise, uncompromising hygiene, and a royal hospitality experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold font-serif text-white">{card.title}</h3>
                <p className="text-gray-400 font-light text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
