"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Mail, Sparkles, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const user = await db.getUser();
      if (user) {
        router.push("/admin/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { success, error } = await db.signIn(email, password);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setErrorMsg(error || "Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login page error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050B1F] min-h-screen text-white font-sans flex items-center justify-center p-4 relative selection:bg-[#FF2D95] selection:text-white w-full overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[35%] h-[35%] rounded-full bg-[#7B2CFF]/10 blur-[150px] animate-float" />
        <div className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] rounded-full bg-[#FF2D95]/10 blur-[150px] animate-float-delayed" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative z-10 space-y-8"
      >
        {/* LOGO */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#FF2D95] to-[#7B2CFF] flex items-center justify-center shadow-lg mb-4">
            <KeyRound className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif">Admin Portal</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            Shiloh Ladies & Kids Salon
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shiloh.com"
                className="w-full bg-[#050B1F] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#050B1F] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF2D95] focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#FF2D95] via-[#7B2CFF] to-[#FF7A00] rounded-xl hover:opacity-95 disabled:opacity-50 transition-all duration-300 shadow-md shadow-[#FF2D95]/10"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-white transition-colors underline"
          >
            Return to Public Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
