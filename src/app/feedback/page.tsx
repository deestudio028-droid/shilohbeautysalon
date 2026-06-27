"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Sparkles, User, Phone, Tag, MessageSquare, Upload, Check } from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // File upload state
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let digits = val.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanDigits = digits.slice(0, 10);
    setPhone(cleanDigits);

    if (cleanDigits.length === 0) {
      setPhoneError("Phone number is mandatory.");
    } else if (cleanDigits.length < 10 || !/^[6-9]/.test(cleanDigits)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
    } else {
      setPhoneError("");
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    let digits = pastedText.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanDigits = digits.slice(0, 10);
    setPhone(cleanDigits);

    if (cleanDigits.length === 0) {
      setPhoneError("Phone number is mandatory.");
    } else if (cleanDigits.length < 10 || !/^[6-9]/.test(cleanDigits)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
    } else {
      setPhoneError("");
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage("");
    try {
      // Create local object URL for instant preview
      setPhotoPreview(URL.createObjectURL(file));
      
      // Upload to storage bucket
      const { db } = await import("@/lib/supabase");
      const uploadedUrl = await db.uploadImage(file, "gallery");
      if (uploadedUrl) {
        setPhotoUrl(uploadedUrl);
      } else {
        setErrorMessage("Failed to upload image. Using local preview fallback.");
        setPhotoUrl(URL.createObjectURL(file));
      }
    } catch (err) {
      console.error("Photo upload error:", err);
      setErrorMessage("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanDigits = digits.slice(0, 10);

    if (!name.trim() || !cleanDigits || !service.trim() || !message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (cleanDigits.length !== 10 || !/^[6-9]/.test(cleanDigits)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setErrorMessage("Please select a rating between 1 and 5 stars.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const { db } = await import("@/lib/supabase");
      const created = await db.addFeedback({
        customer_name: name.trim(),
        phone_number: cleanDigits,
        service_name: service.trim(),
        rating,
        message: message.trim(),
        photo_url: photoUrl || undefined
      });
      setIsSuccess(true);

      // Trigger Telegram notification asynchronously (non-blocking)
      fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "feedback",
          name: created.customer_name,
          phone: created.phone_number,
          rating: created.rating,
          service: created.service_name,
          message: created.message,
          date: created.created_at
        })
      }).catch((tErr) => {
        console.error("Telegram feedback notification failed asynchronously:", tErr);
      });
    } catch (err: any) {
      console.error("Feedback submit error:", err);
      setErrorMessage(err.message || "Failed to submit review. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166] animate-fade-in"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Your Experience Matters
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold font-serif animate-fade-in"
          >
            Share Your <span className={logoTextGradient}>Feedback</span>
          </h1>
          <p
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed animate-fade-in"
          >
            Thank you for choosing Shiloh. We value your voice. Share your review below, and help us continue to shape royal services.
          </p>
        </div>
      </section>

      {/* FEEDBACK CONTENT */}
      <section className="py-20 max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
          {!isSuccess ? (
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-8 text-left animate-fade-in"
            >
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      onPaste={handlePhonePaste}
                      placeholder="Enter mobile number"
                      className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 transition-colors ${
                        phoneError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#FF2D95]"
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <span className="text-[11px] text-red-500 font-medium block mt-1 pl-1 text-left">
                      {phoneError}
                    </span>
                  )}
                </div>
              </div>

              {/* Service taken */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Service / Package Taken *
                </label>
                <div className="relative">
                  <Tag className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="e.g. Bridal Makeup, Step Cut Haircut, Herbal Facial"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>

              {/* Interactive Star Rating */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isActive = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isActive
                              ? "text-[#FFD166] fill-[#FFD166]"
                              : "text-gray-600 hover:text-[#FFD166]/50"
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-medium text-gray-400 ml-2">
                    {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                  </span>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Feedback Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience. How was our staff behavior? Were you satisfied with the styling?"
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Optional Photo Upload */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Photo Upload (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-3 px-6 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-gray-400" />
                    {uploading ? "Uploading Photo..." : "Select Photo"}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  {photoPreview && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-slate-955 shrink-0">
                      <Image src={photoPreview} alt="Preview" fill unoptimized className="object-cover" />
                    </div>
                  )}
                  {photoUrl && !uploading && (
                    <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Image uploaded successfully!
                    </span>
                  )}
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || uploading || !!phoneError || phone.length !== 10}
                className="w-full relative inline-flex items-center justify-center py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-2xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none glow-pink"
              >
                {submitting ? "Submitting Review..." : "Submit Feedback"}
              </button>
            </form>
          ) : (
            <div
              className="glass-card p-10 sm:p-16 rounded-3xl border border-white/10 text-center space-y-6 animate-fade-in"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">Feedback Submitted!</h2>
              <p className="text-gray-300 font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Thank you for sharing your feedback, <span className="font-semibold text-white">{name}</span>. Your review will be published after verification.
              </p>
              <p className="text-xs text-gray-500 italic max-w-sm mx-auto">
                We review all submissions manually to maintain quality and protect client privacy.
              </p>

              <div className="pt-6">
                <button
                  onClick={() => {
                    // Reset form
                    setName("");
                    setPhone("");
                    setService("");
                    setRating(5);
                    setMessage("");
                    setPhotoUrl("");
                    setPhotoPreview("");
                    setIsSuccess(false);
                  }}
                  className="px-8 py-3 bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-md"
                >
                  Submit Another Feedback
                </button>
              </div>
            </div>
          )}
      </section>

      <Footer />
    </div>
  );
}
