"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function BookingSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "",
    location: "", package: "", guests: "", notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Richiesta inviata! Ti contatterò entro 24 ore 🎵");
        setForm({ name: "", email: "", phone: "", date: "", location: "", package: "", guests: "", notes: "" });
      } else {
        toast.error("Errore nell'invio. Riprova o contattami direttamente.");
      }
    } catch {
      toast.error("Errore di connessione. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(168,85,247,0.06)" }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Prenota
          </p>
          <h2 className="font-heading text-5xl md:text-6xl mb-4">
            <span className="text-white">Rendi il tuo</span>
            <br />
            <span className="gradient-text">evento unico</span>
          </h2>
          <p className="text-slate-400">
            Compila il form e ti rispondo entro 24 ore per confermare disponibilità e dettagli.
            <br />
            <span className="text-purple-400">Nessun pagamento ora</span> — tutto si gestisce direttamente con me.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 animated-border space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm text-slate-400 mb-2">Nome e Cognome *</label>
              <input
                id="name" name="name" required value={form.name} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors placeholder:text-slate-600"
                placeholder="Mario Rossi"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-slate-400 mb-2">Email *</label>
              <input
                id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors placeholder:text-slate-600"
                placeholder="mario@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm text-slate-400 mb-2">Telefono *</label>
              <input
                id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors placeholder:text-slate-600"
                placeholder="+39 320 000 0000"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm text-slate-400 mb-2">Data evento *</label>
              <input
                id="date" name="date" type="date" required value={form.date} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className="block text-sm text-slate-400 mb-2">Città / Luogo *</label>
              <input
                id="location" name="location" required value={form.location} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors placeholder:text-slate-600"
                placeholder="Bari, Villa Adriana..."
              />
            </div>
            <div>
              <label htmlFor="guests" className="block text-sm text-slate-400 mb-2">N° ospiti stimato</label>
              <input
                id="guests" name="guests" type="number" value={form.guests} onChange={handleChange}
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors placeholder:text-slate-600"
                placeholder="50"
                min="1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="package" className="block text-sm text-slate-400 mb-2">Pacchetto di interesse</label>
            <select
              id="package" name="package" value={form.package} onChange={handleChange}
              className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors"
            >
              <option value="" className="bg-gray-900">Seleziona un pacchetto...</option>
              <option value="base" className="bg-gray-900">Base Party — 3.000W</option>
              <option value="medium" className="bg-gray-900">Medium Party — 6.000W</option>
              <option value="big" className="bg-gray-900">Big Party — 8.000W+</option>
              <option value="custom" className="bg-gray-900">Non so ancora — parliamone</option>
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm text-slate-400 mb-2">Note aggiuntive</label>
            <textarea
              id="notes" name="notes" value={form.notes} onChange={handleChange}
              rows={4}
              className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors resize-none placeholder:text-slate-600"
              placeholder="Tipo di evento, generi musicali preferiti, richieste speciali..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all duration-200 box-glow-purple flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Invio in corso...</>
            ) : (
              <><Send size={18} /> Invia richiesta di prenotazione</>
            )}
          </button>

          <p className="text-center text-xs text-slate-600">
            Nessun impegno economico. Ti rispondo personalmente entro 24 ore.
          </p>
        </form>

        {/* Contact alternatives */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <a
            href="https://wa.me/393313048825"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl px-6 py-4 flex items-center gap-3 hover:border-green-500/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <div className="text-xs text-slate-500">WhatsApp</div>
              <div className="text-sm text-slate-300">Scrivimi subito</div>
            </div>
          </a>
          <a
            href="tel:+393313048825"
            className="glass rounded-2xl px-6 py-4 flex items-center gap-3 hover:border-cyan-500/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </div>
            <div>
              <div className="text-xs text-slate-500">Telefono</div>
              <div className="text-sm text-slate-300">331 304 8825</div>
            </div>
          </a>
          <a
            href="mailto:antonio.matera2024@gmail.com"
            className="glass rounded-2xl px-6 py-4 flex items-center gap-3 hover:border-purple-500/30 transition-colors group min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500">Email</div>
              <div className="text-sm text-slate-300 break-all">antonio.matera2024@gmail.com</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
