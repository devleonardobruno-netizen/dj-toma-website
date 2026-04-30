import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PackagesSection from "@/components/PackagesSection";
import GallerySection from "@/components/GallerySection";
import MixSection from "@/components/MixSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

async function getSections(): Promise<Record<string, boolean>> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase.from("sections").select("id, enabled");
    if (!data) return {};
    return Object.fromEntries(data.map((s) => [s.id, s.enabled]));
  } catch {
    return {};
  }
}

export default async function Home() {
  const sections = await getSections();
  const show = (id: string) => sections[id] !== false;

  return (
    <main className="min-h-screen bg-[#050510]">
      <Navbar />
      <HeroSection />
      {show("about") && <AboutSection />}
      {show("packages") && <PackagesSection />}
      {show("gallery") && <GallerySection />}
      {show("mix") && <MixSection />}
      {show("collaborators") && <CollaboratorsSection />}
      {show("booking") && <BookingSection />}
      <Footer />
    </main>
  );
}
