"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Phone, Sparkles, Check, Home, MapPin, User, FileText, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { db, Service, Appointment } from "@/lib/supabase";

function AppointmentForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryService = searchParams.get("service") || "";
  const queryType = searchParams.get("type") === "home" ? "Home Service" : "Salon Visit";

  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [visitType, setVisitType] = useState<"Salon Visit" | "Home Service">("Salon Visit");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Simplified booking states
  const [isSpecialRequest, setIsSpecialRequest] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentsForDate, setAppointmentsForDate] = useState<Appointment[]>([]);
  const [createdReference, setCreatedReference] = useState("");

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

  // Pre-fill fields from URL params
  useEffect(() => {
    if (queryService) {
      setSelectedService(queryService);
    }
    if (queryType) {
      setVisitType(queryType as "Salon Visit" | "Home Service");
    }
  }, [queryService, queryType]);

  // Load services for select dropdown
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await db.getServices();
        setServices(data);
        if (!queryService && data.length > 0) {
          setSelectedService(data[0].name);
        }
      } catch (err) {
        console.error("Failed to load services for appointment form:", err);
      }
    };
    loadServices();
  }, [queryService]);

  // Load bookings for selected date to compute capacity
  useEffect(() => {
    if (!date) {
      setAppointmentsForDate([]);
      return;
    }
    const loadAppointmentsForDate = async () => {
      try {
        const data = await db.getAppointments();
        // Count only "Pending Confirmation" and "Confirmed" appointments. Exclude "Completed" and "Cancelled".
        // Also exclude Special Requests from standard slot capacity calculations.
        const filtered = data.filter(a => 
          a.preferred_date === date && 
          (a.status === "Pending Confirmation" || a.status === "Confirmed") &&
          a.booking_type !== "Special Request"
        );
        setAppointmentsForDate(filtered);
      } catch (err) {
        console.error("Failed to load appointments for date:", err);
      }
    };
    loadAppointmentsForDate();
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let digits = phone.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      digits = digits.slice(1);
    }
    const cleanDigits = digits.slice(0, 10);
    
    if (!name || !cleanDigits || !selectedService || !date) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (cleanDigits.length !== 10 || !/^[6-9]/.test(cleanDigits)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile number.");
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    const getLocalDateStr = () => {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };
    const today = getLocalDateStr();
    if (date < today) {
      setErrorMessage("Appointments can only be booked for today or future dates.");
      return;
    }
    if (!isSpecialRequest && !time) {
      setErrorMessage("Please select a preferred time slot.");
      return;
    }
    if (isSpecialRequest && !customTime.trim()) {
      setErrorMessage("Please enter your preferred custom time.");
      return;
    }
    if (visitType === "Home Service" && !address) {
      setErrorMessage("Please enter your home address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const preferredTimeVal = isSpecialRequest ? customTime.trim() : time;
      const combinedNotes = isSpecialRequest
        ? (reason.trim() ? `[Special Request Reason: ${reason.trim()}] ${notes}` : notes)
        : notes;

      const created = await db.createAppointment({
        name,
        phone: cleanDigits,
        service: selectedService,
        appointment_type: visitType,
        address: visitType === "Home Service" ? address : undefined,
        preferred_date: date,
        preferred_time: preferredTimeVal,
        notes: combinedNotes || undefined,
        booking_type: isSpecialRequest ? "Special Request" : "Standard"
      });
      setCreatedReference(created.appointment_reference);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      setErrorMessage(err.message || "Failed to submit appointment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = Array.from(new Set(services.map(s => s.category)));

  const getTodayDateStr = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  const minDate = getTodayDateStr();

  return (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 sm:p-12 rounded-3xl border border-white/5 space-y-8"
        >
          {/* Type Switcher */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#FFD166] font-serif block">
              Select Booking Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVisitType("Salon Visit")}
                className={`py-4 px-6 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                  visitType === "Salon Visit"
                    ? "bg-gradient-to-r from-[#FF2D95] to-[#7B2CFF] border-transparent text-white shadow-lg"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Home className="w-4.5 h-4.5" />
                Salon Visit
              </button>
              <button
                type="button"
                onClick={() => setVisitType("Home Service")}
                className={`py-4 px-6 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                  visitType === "Home Service"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2CFF] border-transparent text-white shadow-lg"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <MapPin className="w-4.5 h-4.5" />
                Home Service
              </button>
            </div>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
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

            {/* Phone */}
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

            {/* Service Selection */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                Choose Service / Package *
              </label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#050B1F] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <optgroup key={cat} label={cat} className="bg-[#050B1F] text-white">
                      {services
                        .filter((s) => s.category === cat)
                        .map((s) => (
                          <option key={s.id} value={s.name} className="bg-[#050B1F] text-white py-2">
                            {s.name} {s.duration ? `(${s.duration})` : ""}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Home Service Address */}
            {visitType === "Home Service" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 sm:col-span-2 overflow-hidden"
              >
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Home Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address for beautician dispatch"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#00D4FF] focus:bg-white/10 transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                Preferred Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                <input
                  type="date"
                  required
                  value={date}
                  min={minDate}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Special Request Checkbox */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <input
                type="checkbox"
                id="specialRequestCheckbox"
                checked={isSpecialRequest}
                onChange={(e) => {
                  setIsSpecialRequest(e.target.checked);
                  setTime("");
                  setCustomTime("");
                  setReason("");
                }}
                className="w-4.5 h-4.5 rounded border-white/10 text-[#FF2D95] focus:ring-[#FF2D95]/40 bg-white/5 cursor-pointer accent-[#FF2D95]"
              />
              <label htmlFor="specialRequestCheckbox" className="text-xs text-gray-300 font-medium cursor-pointer select-none">
                Need Special Appointment Time (Before 10:00 AM, After 08:00 PM, or custom timing)
              </label>
            </div>

            {isSpecialRequest ? (
              <>
                {/* Custom Preferred Time */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Preferred Custom Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                    <input
                      type="text"
                      required
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      placeholder="e.g., 8:00 AM Bridal Makeup, 9:00 PM Reception Makeup, Early Morning Function"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Reason */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                    Optional Reason for Special Timing
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g., Early morning function, reception event, travel constraints, etc."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Time slots */
              <div className="space-y-3 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                  Preferred Time Slot *
                </label>
                
                {(() => {
                  const slots = [
                    { label: "Morning", time: "10:00 AM - 12:00 PM", icon: "🌅", endMin: 720 },
                    { label: "Afternoon", time: "12:00 PM - 04:00 PM", icon: "☀️", endMin: 960 },
                    { label: "Evening", time: "04:00 PM - 08:00 PM", icon: "🌇", endMin: 1200 }
                  ];
                  
                  const availableSlots = slots.filter(slot => {
                    if (date === minDate) {
                      const now = new Date();
                      const currentMin = now.getHours() * 60 + now.getMinutes();
                      return currentMin < slot.endMin;
                    }
                    return true;
                  });

                  if (availableSlots.length === 0) {
                    return (
                      <div className="text-sm text-[#FF7A00] bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-2xl p-5 text-center space-y-2">
                        <p className="font-semibold">⚠️ No slots available for today</p>
                        <p className="text-xs text-gray-400 font-light">
                          All standard booking slots for today have already passed. Please select a future date or request a special custom timing using the checkbox above.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => {
                        const isSelected = time === slot.time;
                        // Count how many standard bookings exist on this date for this slot
                        const slotBookings = appointmentsForDate.filter(a => a.preferred_time === slot.time);
                        const count = slotBookings.length;
                        const isFull = count >= 3;

                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={isFull}
                            onClick={() => setTime(slot.time)}
                            className={`relative p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF2D95]/40 cursor-pointer ${
                              isFull
                                ? "bg-red-950/10 border-red-900/20 text-gray-500 opacity-60 cursor-not-allowed"
                                : isSelected
                                  ? "bg-gradient-to-tr from-[#FF2D95]/20 to-[#7B2CFF]/20 border-[#FF2D95] shadow-lg shadow-[#FF2D95]/10"
                                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5"
                            }`}
                          >
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                                {slot.label}
                              </span>
                              <span className={`text-xs font-semibold flex items-center gap-2 ${isFull ? "text-gray-500" : "text-white"}`}>
                                <span className="text-sm">{slot.icon}</span>
                                {slot.time}
                              </span>
                            </div>
                            <span className="text-[10px] mt-3 block font-medium">
                              {isFull ? (
                                <span className="text-red-400">🔴 Full</span>
                              ) : (
                                <span className="text-green-400">🟢 {count}/3 Booked</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
                <input type="hidden" name="preferred_time" value={time} required />
              </div>
            )}


            {/* Notes */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                Special Notes / Styling Preferences (Optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-4.5 h-4.5 text-gray-500" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Let us know if you have skin sensitivities, specific hairstyle requirements, or bridal combo customization requests..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Error messages */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-left">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !!phoneError || phone.length !== 10}
            className="w-full relative inline-flex items-center justify-center py-4 text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-2xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none glow-pink"
          >
            {isSubmitting ? "Submitting Booking..." : "Submit Appointment"}
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 sm:p-16 rounded-3xl border border-white/10 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">Booking Submitted!</h2>
          
          <div className="inline-block py-2 px-5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-[#FFD166] tracking-wider">
            Booking Reference: <span className="font-bold text-white selection:bg-[#FF2D95]">{createdReference}</span>
          </div>

          <p className="text-gray-300 font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-white">{name}</span>. Your request for <span className="font-semibold text-white">{selectedService}</span> ({visitType}) has been logged successfully.
          </p>
          <p className="text-xs text-gray-500 italic max-w-sm mx-auto">
            Our team will contact you at <span className="text-[#FFD166]">{phone}</span> within 2 hours to confirm your date, time slot, and setup.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              Go to Home
            </button>
            <Link
              href={`https://wa.me/919962110080?text=${encodeURIComponent(
                `Hi Shiloh Salon, I have just submitted an appointment request online.\n\n` +
                `Name: ${name}\n` +
                `Service: ${selectedService}\n` +
                `Booking Reference: ${createdReference}\n\n` +
                `Please verify and confirm my booking.`
              )}`}
              target="_blank"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-md"
            >
              Verify on WhatsApp
            </Link>
          </div>
        </motion.div>

      )}
    </AnimatePresence>
  );
}

export default function AppointmentPage() {
  const logoTextGradient = "bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#00D4FF] bg-clip-text text-transparent";

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans selection:bg-[#FF2D95] selection:text-white flex flex-col w-full overflow-x-hidden">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative pt-36 pb-12 border-b border-white/5 overflow-hidden bg-[#040816]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase font-semibold text-[#FFD166]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            Luxury Booking
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif"
          >
            Book An <span className={logoTextGradient}>Appointment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Fill out the form below. Once received, our client coordinator will contact you via phone or WhatsApp to finalize your booking time and package details.
          </motion.p>
        </div>
      </section>

      {/* BOOKING CONTENT WITH SUSPENSE */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Suspense fallback={
          <div className="glass-card p-12 rounded-3xl border border-white/5 text-center text-gray-500 font-light">
            Loading luxury booking client...
          </div>
        }>
          <AppointmentForm />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
