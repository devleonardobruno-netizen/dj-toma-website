"use client";
import Image from "next/image";

const collaborators = [
  {
    name: "Nome Collaboratore",
    role: "DJ / Producer",
    description: "Breve descrizione del collaboratore, stile e background.",
    genre: "Tech House",
    img: "",
  },
  {
    name: "Nome Collaboratore",
    role: "DJ Resident",
    description: "Breve descrizione del collaboratore, stile e background.",
    genre: "Deep House",
    img: "",
  },
  {
    name: "Nome Collaboratore",
    role: "DJ / Vocalist",
    description: "Breve descrizione del collaboratore, stile e background.",
    genre: "Commercial",
    img: "",
  },
  {
    name: "Nome Collaboratore",
    role: "DJ / Promoter",
    description: "Breve descrizione del collaboratore, stile e background.",
    genre: "Progressive",
    img: "",
  },
];

export default function CollaboratorsSection() {
  return (
    <section id="collaborators" className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050510 0%, #08061a 50%, #050510 100%)" }}>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(6,182,212,0.04)" }} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Crew
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            <span className="text-white">I miei</span>{" "}
            <span className="gradient-text">collaboratori</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Le persone con cui condivido la console e la passione per la musica.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaborators.map((c, i) => (
            <div
              key={i}
              className="glass rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-2"
            >
              {/* Photo */}
              <div className="relative aspect-square bg-gradient-to-br from-purple-900/40 to-cyan-900/20">
                {c.img ? (
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/[0.06] border border-purple-500/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-10 h-10 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  </div>
                )}
                {/* Genre badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs px-2.5 py-1 rounded-full glass text-cyan-400 border-cyan-500/20">
                    {c.genre}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="text-white font-semibold text-base mb-0.5">{c.name}</div>
                <div className="text-purple-400 text-xs font-medium tracking-wide mb-3">{c.role}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
