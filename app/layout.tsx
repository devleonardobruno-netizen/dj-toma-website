import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieBanner from "@/components/CookieBanner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DJ TOMA | DJ Puglia | Matrimoni & Eventi Privati Bari Salento",
  description: "DJ TOMA, il DJ pugliese per eccellenza. Musica di qualità per matrimoni, feste private, eventi aziendali a Bari, Lecce, Taranto, Salento e tutta la Puglia. Prenota il tuo evento.",
  keywords: [
    "DJ Puglia", "DJ Bari", "DJ Salento", "DJ matrimonio Puglia",
    "DJ eventi privati Bari", "DJ TOMA", "DJ Lecce", "DJ Taranto",
    "DJ feste private Puglia", "noleggio impianto audio Puglia",
    "DJ cerimonie Puglia", "intrattenimento eventi Puglia"
  ],
  authors: [{ name: "DJ TOMA" }],
  openGraph: {
    title: "DJ TOMA | Il tuo DJ in Puglia",
    description: "Musica e intrattenimento per matrimoni, feste private ed eventi in tutta la Puglia. Pacchetti su misura da €250.",
    type: "website",
    locale: "it_IT",
    siteName: "DJ TOMA",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://djtoma.it" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${poppins.variable} ${righteous.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" />
        <CookieBanner />
      </body>
    </html>
  );
}
