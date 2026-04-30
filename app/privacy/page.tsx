import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DJ TOMA",
  description: "Informativa sul trattamento dei dati personali ai sensi del GDPR - DJ TOMA Antonio Matera",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050510] px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-colors text-sm mb-10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Torna al sito
        </Link>

        <h1 className="font-heading text-4xl md:text-5xl text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-400 text-sm leading-relaxed">

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è <strong className="text-slate-200">Antonio Matera</strong>, in arte DJ TOMA,
              con sede in Puglia, Italia.
            </p>
            <p className="mt-2">
              Contatti:{" "}
              <a href="mailto:antonio.matera2024@gmail.com" className="text-purple-400 hover:text-purple-300">
                antonio.matera2024@gmail.com
              </a>{" "}
              · Tel.{" "}
              <a href="tel:+393313048825" className="text-purple-400 hover:text-purple-300">
                +39 331 304 8825
              </a>
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">2. Dati raccolti e finalità</h2>
            <p>Raccogliamo i seguenti dati personali esclusivamente attraverso il modulo di richiesta preventivo:</p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                ["Nome e cognome", "Identificazione del richiedente"],
                ["Indirizzo email", "Invio risposta e comunicazioni relative all'evento"],
                ["Numero di telefono", "Contatto diretto per conferma disponibilità"],
                ["Data e luogo dell'evento", "Verifica disponibilità e preventivo"],
                ["Note aggiuntive", "Personalizzazione del servizio"],
              ].map(([dato, finalita]) => (
                <li key={dato} className="flex gap-3">
                  <span className="text-purple-400 shrink-0">·</span>
                  <span><strong className="text-slate-300">{dato}</strong> — {finalita}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              I dati non vengono utilizzati per finalità di marketing, non vengono ceduti a terzi e non vengono profilati.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">3. Base giuridica</h2>
            <p>
              Il trattamento è basato sul <strong className="text-slate-200">consenso dell&apos;interessato</strong> (art. 6, par. 1, lett. a GDPR)
              espresso al momento dell&apos;invio del modulo di contatto, nonché sull&apos;esecuzione di misure precontrattuali
              (art. 6, par. 1, lett. b GDPR).
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">4. Conservazione dei dati</h2>
            <p>
              I dati vengono conservati per il tempo strettamente necessario alla gestione della richiesta e, in caso di
              contratto, per il periodo previsto dagli obblighi legali (massimo <strong className="text-slate-200">10 anni</strong>).
              In assenza di seguito contrattuale, i dati vengono eliminati entro <strong className="text-slate-200">12 mesi</strong> dalla richiesta.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">5. Diritti dell&apos;interessato</h2>
            <p>Ai sensi del GDPR, hai il diritto di:</p>
            <ul className="mt-3 space-y-1.5 list-none">
              {[
                "Accedere ai tuoi dati personali",
                "Richiedere la rettifica di dati inesatti",
                "Richiedere la cancellazione dei dati (diritto all'oblio)",
                "Opporti al trattamento",
                "Richiedere la portabilità dei dati",
                "Revocare il consenso in qualsiasi momento",
              ].map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="text-purple-400 shrink-0">·</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Per esercitare questi diritti, contattaci a{" "}
              <a href="mailto:antonio.matera2024@gmail.com" className="text-purple-400 hover:text-purple-300">
                antonio.matera2024@gmail.com
              </a>.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">6. Sicurezza</h2>
            <p>
              I dati sono archiviati su infrastruttura cloud sicura (Supabase/PostgreSQL) con accesso limitato e
              autenticato. Le comunicazioni avvengono tramite protocollo HTTPS con crittografia TLS.
            </p>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-3">7. Reclami</h2>
            <p>
              Hai il diritto di proporre reclamo all&apos;autorità di controllo competente:{" "}
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                Garante per la protezione dei dati personali
              </a>{" "}
              (www.garanteprivacy.it).
            </p>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-purple-500/10 flex gap-6 text-xs text-slate-600">
          <Link href="/cookie-policy" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
          <Link href="/" className="hover:text-purple-400 transition-colors">← Home</Link>
        </div>

      </div>
    </div>
  );
}
