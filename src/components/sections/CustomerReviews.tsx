import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Feedback } from "@/lib/supabase";

interface CustomerReviewsProps {
  reviews: Feedback[];
  averageRating: string;
  totalReviews: number;
}

export default function CustomerReviews({ reviews, averageRating, totalReviews }: CustomerReviewsProps) {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#040816]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD166] inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#FFD166]" /> Customer Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">
              What Our <span className={logoTextGradient}>Royalty Say</span>
            </h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Read authentic, verified feedback from clients who have experienced Shiloh's signature pampering.
            </p>
          </div>

          {/* Quick Stats Summary Card */}
          <div
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
          </div>
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
                            loading="lazy"
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
  );
}
