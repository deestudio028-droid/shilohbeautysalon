"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { db } from "@/lib/supabase";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const user = await db.getUser();
        if (user) {
          router.push("/admin/dashboard");
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        console.error("Admin redirect error:", err);
        router.push("/admin/login");
      }
    };
    checkRedirect();
  }, [router]);

  return (
    <div className="bg-[#050B1F] min-h-screen flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <RefreshCw className="w-6 h-6 text-[#FF2D95] animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Redirecting to Portal...</span>
      </div>
    </div>
  );
}
