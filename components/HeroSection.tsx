"use client";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

/* Sottile waveform animata — elegante, come un software audio professionale */
function WaveformBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0, raf: number;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      t += 0.008;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cy = H * 0.72;

      // Layer 1 — main waveform
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const amp =
          Math.sin(nx * 12 + t) * 0.6 +
          Math.sin(nx * 27 - t * 1.4) * 0.25 +
          Math.sin(nx * 5 + t * 0.6) * 0.15;
        const envelope = Math.sin(nx * Math.PI) * 70;
        const y = cy + amp * envelope;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(168,85,247,0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Layer 2 — secondary waveform offset
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const amp =
          Math.sin(nx * 18 - t * 1.1) * 0.5 +
          Math.sin(nx * 8 + t * 0.8) * 0.3;
        const envelope = Math.sin(nx * Math.PI) * 45;
        const y = cy + amp * envelope;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(6,182,212,0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Layer 3 — fill waveform
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const amp =
          Math.sin(nx * 12 + t) * 0.6 +
          Math.sin(nx * 27 - t * 1.4) * 0.25 +
          Math.sin(nx * 5 + t * 0.6) * 0.15;
        const envelope = Math.sin(nx * Math.PI) * 70;
        const y = cy + amp * envelope;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(W, cy);
      ctx.lineTo(0, cy);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, cy - 70, 0, cy + 70);
      fillGrad.addColorStop(0, "rgba(168,85,247,0.06)");
      fillGrad.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Flat centre line
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(W, cy);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#09090f]"
      style={{ background: "linear-gradient(160deg, #09090f 0%, #0e0818 40%, #07101a 100%)" }}>

      {/* Waveform background */}
      <WaveformBg />

      {/* Single soft glow — non invade il testo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 70%, rgba(88,28,135,0.18) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto">

        {/* Tag line sopra */}
        <p className="text-slate-400 text-xs tracking-[0.5em] uppercase mb-8 font-medium">
          DJ · Puglia · Salento · Gargano
        </p>

        {/* Nome — enorme, pulito, white */}
        <h1 className="font-heading leading-none text-white select-none"
          style={{
            fontSize: "clamp(5rem, 22vw, 18rem)",
            letterSpacing: "-0.02em",
            textShadow: "0 0 60px rgba(168,85,247,0.3), 0 0 120px rgba(168,85,247,0.12)",
          }}>
          TOMA
        </h1>

        {/* Music label sotto il nome */}
        <p className="text-white tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "var(--font-poppins), sans-serif", fontWeight: 700, fontSize: "26px" }}>
          music
        </p>

        {/* Divider con accent */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-32"
            style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5))" }} />
          <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
            Tech House · Groove
          </span>
          <div className="h-px flex-1 max-w-32"
            style={{ background: "linear-gradient(to left, transparent, rgba(168,85,247,0.5))" }} />
        </div>

        {/* Descrizione */}
        <p className="text-slate-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Musica, energia e professionalità per il tuo evento.
          <br />
          Matrimoni, feste private, serate — in tutta la Puglia.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#booking"
            className="px-9 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg,#6d28d9,#7c3aed)",
              boxShadow: "0 0 24px rgba(109,40,217,0.4), 0 4px 20px rgba(0,0,0,0.4)",
            }}>
            Prenota il tuo evento
          </a>
          <a href="#services"
            className="px-9 py-4 rounded-full font-medium text-slate-300 text-sm tracking-wide border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            Scopri i pacchetti
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12">
          {[
            { value: "2010", label: "Prima consolle" },
            { value: "15+", label: "Anni di musica" },
            { value: "Puglia", label: "Salento · Gargano" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-semibold text-lg">{s.value}</div>
              <div className="text-slate-600 text-xs tracking-wider uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll hint */}
      <a href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-purple-400 transition-colors bounce-down z-10"
        aria-label="Scroll">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
