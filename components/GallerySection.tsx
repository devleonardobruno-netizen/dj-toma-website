"use client";
import Image from "next/image";

const eventPhotos = [
  { label: "DJ Set · Pioneer CDJs", size: "large", img: "/gallery/evento1.jpg" },
  { label: "Serata Club · Luci", size: "small", img: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80" },
  { label: "Folla · Dancefloor", size: "small", img: "/gallery/evento2.jpg" },
  { label: "Live Performance", size: "medium", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80" },
  { label: "Festa Privata · Bari", size: "medium", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80" },
  { label: "Estate · Salento", size: "large", img: "/gallery/evento3.jpg" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Gallery
          </p>
          <h2 className="font-heading text-5xl md:text-6xl">
            <span className="text-white">Le mie</span>{" "}
            <span className="gradient-text">serate</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {eventPhotos.map((photo, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                photo.size === "large" ? "md:col-span-2" : ""
              }`}
              style={{ aspectRatio: photo.size === "large" ? "2/1" : "1/1" }}
            >
              <div className="w-full h-full relative flex items-end p-4">
                <Image
                  src={photo.img}
                  alt={photo.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 glass rounded-lg px-3 py-1.5">
                  <span className="text-xs text-slate-200">{photo.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
