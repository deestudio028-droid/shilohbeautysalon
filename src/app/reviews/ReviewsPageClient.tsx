"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Sparkles, Search, MessageSquare, StarHalf } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Feedback } from "@/lib/supabase";

interface ReviewsPageClientProps {
  initialReviews: Feedback[];
}

export default function ReviewsPageClient({ initialReviews }: ReviewsPageClientProps) {
  const [reviews] = useState<Feedback[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (r.customer_name || "").toLowerCase().includes(q) ||
      (r.service_name || "").toLowerCase().includes(q) ||
      (r.message || "").toLowerCase().includes(q);

    const matchesRating = ratingFilter === "All" || r.rating === parseInt(ratingFilter, 10);

    return matchesSearch && matchesRating;
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";
  const goldTextGradient = "bg-gradient-to-r from-[#FFD166] to-[#FF7A00] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
          >
            <Star className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
            Client Testimonials
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif"
          >
            Customer <span className={logoTextGradient}>Reviews</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            See what our clients say about their pampering sessions at Shiloh. We are proud of our verified client feedback.
          </p>
        </div>
      </section>

      {/* STATISTICS & FILTERS */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12">
          {/* Stats card */}
          <div className="md:col-span-4 glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-around">
            <div className="text-center space-y-1">
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 block">Rating</span>
              <span className={`text-4xl font-extrabold block ${goldTextGradient}`}>{averageRating}</span>
              <div className="flex gap-0.5 justify-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const ratingVal = parseFloat(averageRating);
                  const isFull = i + 1 <= Math.floor(ratingVal);
                  const isHalf = !isFull && i < ratingVal;
                  return isFull ? (
                    <Star key={i} className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />
                  ) : isHalf ? (
                    <StarHalf key={i} className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />
                  ) : (
                    <Star key={i} className="w-4 h-4 text-gray-700" />
                  );
                })}
              </div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center space-y-1">
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 block">Reviews</span>
              <span className="text-4xl font-extrabold text-white block">{totalReviews}</span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">100% Verified</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="md:col-span-8 flex flex-col sm:flex-row gap-4 w-full">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search reviews by client, service, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] transition-colors placeholder-gray-500"
              />
            </div>

            {/* Rating Filter Select */}
            <div className="relative w-full sm:w-48">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full bg-[#050B1F] border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] appearance-none cursor-pointer"
              >
                <option value="All">All Star Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4 Stars & Above</option>
                <option value="3">3 Stars & Above</option>
                <option value="2">2 Stars & Above</option>
                <option value="1">1 Star & Above</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* CTA link to submit feedback */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-xs text-gray-500">Showing {filteredReviews.length} reviews</span>
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FF2D95] hover:text-[#7B2CFF] transition-colors"
          >
            Write a Review <Sparkles className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {filteredReviews.length === 0 ? (
          <div className="glass-card p-16 rounded-3xl border border-white/5 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-serif text-white">No reviews found</h3>
            <p className="text-gray-400 text-xs mt-1">Try resetting the filter or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review) => {
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
                    {/* Stars & Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-[#FFD166] fill-[#FFD166]" : "text-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">{reviewDate}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-300 font-light text-sm leading-relaxed text-left">
                      "{review.message}"
                    </p>

                    {/* Feedback attachment image (optional) */}
                    {review.photo_url && (
                      <div className="relative h-44 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900 mt-2">
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

                  {/* Customer Info */}
                  <div className="pt-6 border-t border-white/5 mt-6 text-left">
                    <h4 className="text-sm font-bold font-serif text-white">{review.customer_name}</h4>
                    <span className="text-[10px] text-[#00D4FF] uppercase tracking-wider font-semibold">
                      Service: {review.service_name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
