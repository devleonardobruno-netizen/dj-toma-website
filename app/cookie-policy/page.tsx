import Link from "next/link";
import type { Metadata } from "next";
import CookieReset from "@/components/CookieReset";

export const metadata: Metadata = {
  title: "Cookie Policy | DJ TOMA",
  description: "Informativa sull'uso dei cookie sul sito DJ TOMA",
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#050510] px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-colors text-sm mb-10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Torna al sito
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl text-white mb-2">Cookie Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="space-y-6 text-slate-400 text-sm leading-relaxed">

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo durante la navigazione.
              Vengono utilizzati per ricordare le preferenze dell&apos;utente e migliorare l&apos;esperienza di navigazione.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-4">Cookie utilizzati su questo sito</h2>

            <div className="space-y-4">
              <div className="border border-green-500/20 bg-green-500/[0.03] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-green-400 font-semibold text-sm">Cookie tecnici — sempre attivi</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Necessari per il funzionamento del sito. Non richiedono consenso.
                </p>
                <div className="mt-3 space-y-2">
                  {[
                    ["cookie_consent", "Memorizza la tua scelta riguardo ai cookie", "1 anno", "Locale"],
                  ].map(([nome, desc, durata, tipo]) => (
                    <div key={nome} className="bg-white/[0.03] rounded-lg p-3 grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-slate-500">Nome:</span> <code className="text-purple-400">{nome}</code></div>
                      <div><span className="text-slate-500">Tipo:</span> <span className="text-slate-300">{tipo}</span></div>
                      <div className="col-span-2"><span className="text-slate-500">Scopo:</span> <span className="text-slate-300">{desc}</span></div>
                      <div><span className="text-slate-500">Durata:</span> <span className="text-slate-300">{durata}</span></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-700 bg-white/[0.02] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  <span className="text-slate-400 font-semibold text-sm">Cookie analitici — solo con consenso</span>
                </div>
                <p className="text-slate-500 text-sm">
                  Attualmente non utilizziamo cookie analitici di terze parti. In futuro potremmo integrare
                  strumenti di analisi anonimizzata (es. Vercel Analytics) che saranno soggetti a questo consenso.
                </p>
              </div>

              <div className="border border-slate-700 bg-white/[0.02] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                  <span className="text-slate-400 font-semibold text-sm">Cookie di profilazione / marketing</span>
                </div>
                <p className="text-slate-500 text-sm">
                  Non utilizziamo cookie di profilazione né tracciamento per fini pubblicitari.
                </p>
              </div>
            </div>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">Gestire il consenso</h2>
            <p>
              Puoi modificare o revocare il tuo consenso in qualsiasi momento svuotando i dati del browser
              oppure cliccando sul pulsante qui sotto per reimpostare le preferenze cookie.
            </p>
            <CookieReset />
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">Cookie di terze parti</h2>
            <p>
              Il sito può incorporare contenuti di terze parti (es. player SoundCloud). Questi servizi
              possono impostare i propri cookie secondo le rispettive privacy policy:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex gap-3">
                <span className="text-purple-400 shrink-0">·</span>
                <span>
                  <strong className="text-slate-300">SoundCloud</strong> —{" "}
                  <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy SoundCloud
                  </a>
                </span>
              </li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">Contatti</h2>
            <p>
              Per qualsiasi domanda su questa Cookie Policy contattaci a{" "}
              <a href="mailto:antonio.matera2024@gmail.com" className="text-purple-400 hover:text-purple-300">
                antonio.matera2024@gmail.com
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-purple-500/10 flex gap-6 text-xs text-slate-600">
          <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-purple-400 transition-colors">← Home</Link>
        </div>

      </div>
    </div>
  );
}
