"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "Chi Sono" },
  { href: "#services", label: "Pacchetti" },
  { href: "#gallery", label: "Gallery" },
  { href: "#booking", label: "Prenota" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-lg shadow-purple-500/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-heading text-2xl gradient-text-purple-cyan tracking-wider">
          DJ TOMA
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 hover:text-purple-400 transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-200 box-glow-purple"
          >
            Prenota Ora
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-purple-400 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-dark border-t border-purple-500/20">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-purple-400 transition-colors py-2"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-full text-sm font-semibold bg-purple-600 text-white text-center"
            >
              Prenota Ora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
