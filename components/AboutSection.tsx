"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050510 0%, #0a0818 50%, #050510 100%)" }}>
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(168,85,247,0.06)" }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Chi Sono
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-white">Sound è</span>
            <br />
            <span className="gradient-text">identità</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Antonio Matera, in arte <span className="text-white font-medium">TOMA</span>, tocca
            la sua prima consolle nel 2010 all&apos;età di 13 anni, dando inizio a un percorso
            che lo porta a costruire un&apos;identità sonora potente e unica.
          </p>
          <p className="text-slate-400 leading-relaxed mb-4">
            Il suo sound si muove tra tech house{" "}
            <span className="text-white font-semibold">pulsante e groove ipnotici</span>, con set
            basati su bassline profonde, dinamiche progressive e drop ad alto impatto.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            Ha suonato dal <span className="text-white font-semibold">Salento</span> al{" "}
            <span className="text-white font-semibold">Gargano</span>, portando la sua energia
            esplosiva in diversi club e contesti underground.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Feste Private", "Compleanni", "Eventi Aziendali", "Serate in Locali"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm glass text-purple-300 border-purple-500/20"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Card visual */}
        <div className="relative">
          <div className="glass rounded-3xl p-8 animated-border">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <Image
                src="/antonio.jpg"
                alt="DJ TOMA — Antonio Matera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { icon: "🎵", label: "Generi", value: "Tech House · Groove · Progressive" },
                { icon: "📍", label: "Base", value: "Puglia — dal Salento al Gargano" },
                { icon: "🎛️", label: "Setup", value: "Pioneer DJ controller + mixer" },
                { icon: "📅", label: "Dal", value: "2010 — prima consolle a 13 anni" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
                  <div className="text-xs text-slate-300 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2 box-glow-purple">
            <div className="text-xs text-slate-400">Disponibilità</div>
            <div className="text-sm text-purple-400 font-semibold">Verifica date</div>
          </div>
        </div>
      </div>
    </section>
  );
}
