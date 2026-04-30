"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto glass-dark rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-purple-500/20 shadow-2xl">
        <div className="flex-1 min-w-0">
          <p className="text-slate-300 text-sm leading-relaxed">
            Utilizziamo cookie tecnici per il funzionamento del sito. Nessun dato viene venduto a terzi.{" "}
            <Link href="/cookie-policy" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">
              Cookie Policy
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-xl text-sm text-slate-400 glass hover:text-slate-200 transition-colors border border-white/10"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed)", boxShadow: "0 0 20px rgba(109,40,217,0.3)" }}
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
