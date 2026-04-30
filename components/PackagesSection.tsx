"use client";
import { Check, Zap, Star, Crown } from "lucide-react";

const packages = [
  {
    id: "base",
    name: "Base Party",
    tag: "Essenziale",
    icon: Zap,
    color: "cyan",
    colorHex: "#06b6d4",
    borderClass: "border-cyan-500/30",
    badgeClass: "bg-cyan-500/10 text-cyan-400",
    description: "Configurazione essenziale per eventi privati di piccole dimensioni e ambienti contenuti.",
    features: [
      "DJ set live",
      "Impianto audio professionale 3.000 Watt",
      "Consolle / controller Pioneer DJ",
      "Mixer DJ professionale",
      "Selezione musicale personalizzata",
      "Installazione, configurazione e smontaggio",
      "Consulenza musicale pre-evento",
    ],
    ideal: "Piccoli eventi privati",
  },
  {
    id: "medium",
    name: "Medium Party",
    tag: "Intermedio",
    icon: Star,
    color: "purple",
    colorHex: "#a855f7",
    borderClass: "border-purple-500/40",
    badgeClass: "bg-purple-500/10 text-purple-300",
    description: "Soluzione pensata per eventi di media dimensione e contesti con maggiore affluenza.",
    features: [
      "DJ set professionale",
      "Impianto audio 6.000 Watt",
      "Consolle DJ completa",
      "Sistema luci base",
      "Microfono per comunicazioni",
      "Richieste musicali live",
      "Setup tecnico completo",
      "Consulenza musicale pre-evento",
    ],
    ideal: "Media affluenza",
    popular: true,
  },
  {
    id: "big",
    name: "Big Party",
    tag: "Avanzato",
    icon: Crown,
    color: "pink",
    colorHex: "#ec4899",
    borderClass: "border-pink-500/30",
    badgeClass: "bg-pink-500/10 text-pink-400",
    description: "Configurazione avanzata per eventi di grande dimensione e contesti esclusivi.",
    features: [
      "DJ set e performance completa",
      "Impianto audio professionale 8.000 Watt+",
      "Setup DJ avanzato",
      "Impianto luci professionale con effetti scenografici",
      "Microfoni wireless",
      "Regia completa dell'intrattenimento musicale",
      "Personalizzazione totale dell'evento",
      "Consulenza musicale pre-evento",
    ],
    ideal: "Grandi eventi ed esclusive",
  },
];

export default function PackagesSection() {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050510 0%, #080614 50%, #050510 100%)" }}>
      <div
        className="absolute top-1/2 right-0 w-[40rem] h-[40rem] -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(168,85,247,0.05)" }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            DJ Service — Private Party
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            <span className="text-white">Scegli il tuo</span>{" "}
            <span className="gradient-text">sound</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tre soluzioni modulari per ogni tipo di evento. Ogni proposta si adatta alla location,
            al numero di partecipanti e alle tue esigenze specifiche.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`relative glass rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1 ${pkg.borderClass} ${pkg.popular ? "scale-105" : ""}`}
                style={
                  pkg.popular
                    ? { boxShadow: `0 0 30px rgba(168,85,247,0.2), 0 0 80px rgba(168,85,247,0.08)` }
                    : undefined
                }
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                      Più richiesto
                    </span>
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-2xl mb-4 ${pkg.badgeClass}`}>
                  <Icon size={22} />
                </div>

                <h3 className="font-heading text-2xl text-white mb-1">{pkg.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{pkg.description}</p>

                {/* Price replaced with "Su richiesta" */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="font-heading text-3xl"
                    style={{ color: pkg.colorHex, textShadow: `0 0 20px ${pkg.colorHex}60` }}
                  >
                    Tariffa
                  </span>
                  <span className="text-slate-400 text-base font-medium">su richiesta</span>
                </div>

                <div className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: pkg.colorHex }} />
                  {pkg.ideal}
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={15} style={{ color: pkg.colorHex }} className="mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`#booking?package=${pkg.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("booking");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      const select = el.querySelector(`select[name="package"]`) as HTMLSelectElement;
                      if (select) {
                        select.value = pkg.id;
                        select.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                    }
                  }}
                  className="block w-full py-3 rounded-2xl text-center font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${pkg.colorHex}20, ${pkg.colorHex}10)`,
                    border: `1px solid ${pkg.colorHex}40`,
                    color: pkg.colorHex,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${pkg.colorHex}40, ${pkg.colorHex}20)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, ${pkg.colorHex}20, ${pkg.colorHex}10)`;
                  }}
                >
                  Richiedi preventivo
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-sm mt-8">
          Tutti i servizi includono trasporto, installazione e smontaggio · Copertura in tutta la Puglia · Trasferte disponibili su richiesta
        </p>
      </div>
    </section>
  );
}
