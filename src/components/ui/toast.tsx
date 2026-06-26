"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              className={`pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl border text-sm font-medium shadow-2xl backdrop-blur-md min-w-[280px] max-w-[360px] ${
                t.type === "success"
                  ? "bg-[#050B1F]/90 border-green-500/30 text-green-300"
                  : t.type === "error"
                  ? "bg-[#050B1F]/90 border-red-500/30 text-red-300"
                  : "bg-[#050B1F]/90 border-[#FFD166]/30 text-[#FFD166]"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              ) : t.type === "error" ? (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-[#FFD166] shrink-0" />
              )}
              <span className="flex-1 text-xs leading-relaxed whitespace-pre-line">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-current opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
