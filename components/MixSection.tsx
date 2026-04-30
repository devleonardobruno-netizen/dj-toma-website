"use client";
import { useState, useRef } from "react";
import { Play, Volume2, ExternalLink } from "lucide-react";

const tracks = [
  { title: "Notte Salentina", genre: "Tech House", duration: "6:42", bpm: "128", audioSrc: "" },
  { title: "Bari Vibes", genre: "Commercial", duration: "5:18", bpm: "124", audioSrc: "" },
  { title: "Estate Pugliese", genre: "Latino House", duration: "7:05", bpm: "126", audioSrc: "" },
  { title: "Midnight Drop", genre: "Tech House", duration: "8:20", bpm: "130", audioSrc: "" },
  { title: "Taranto Bass", genre: "Deep House", duration: "6:55", bpm: "122", audioSrc: "" },
  { title: "Lecce Sessions", genre: "Commercial", duration: "5:44", bpm: "125", audioSrc: "" },
];

const SOUNDCLOUD_EMBED_URL =
  "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/discover&color=%23a855f7&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true";

export default function MixSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [showSoundcloud, setShowSoundcloud] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (index: number) => {
    const track = tracks[index];
    if (track.audioSrc) {
      if (playingIndex === index) {
        audioRef.current?.pause();
        setPlayingIndex(null);
        return;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = track.audioSrc;
        audioRef.current.play();
      }
      setPlayingIndex(index);
      return;
    }
    setShowSoundcloud(true);
    setPlayingIndex(index);
  };

  return (
    <section id="mix" className="py-24 px-6 relative">
      <audio ref={audioRef} onEnded={() => setPlayingIndex(null)} className="hidden" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Mix
          </p>
          <h2 className="font-heading text-5xl md:text-6xl">
            <span className="text-white">Ascolta il</span>{" "}
            <span className="gradient-text">mio sound</span>
          </h2>
        </div>

        {/* SoundCloud Player */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-2xl text-white">
              <span className="gradient-text-purple-cyan">SoundCloud</span>
            </h3>
            <button
              onClick={() => setShowSoundcloud(!showSoundcloud)}
              className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-purple-400 hover:border-purple-400/40 transition-all"
            >
              <Volume2 size={14} />
              {showSoundcloud ? "Chiudi player" : "Apri SoundCloud"}
            </button>
          </div>

          {showSoundcloud && (
            <div className="glass rounded-2xl overflow-hidden animated-border">
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={SOUNDCLOUD_EMBED_URL}
                title="DJ TOMA SoundCloud"
              />
              <div className="px-4 py-3 border-t border-purple-500/10 flex items-center justify-end">
                <a
                  href="https://soundcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  SoundCloud <ExternalLink size={10} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Tracklist */}
        <div>
          <h3 className="font-heading text-2xl text-white mb-6">
            <span className="gradient-text-purple-cyan">Tracklist</span> recenti
          </h3>
          <div className="space-y-2">
            {tracks.map((track, i) => {
              const isPlaying = playingIndex === i;
              return (
                <div
                  key={i}
                  className={`glass rounded-2xl px-6 py-4 flex items-center gap-4 group transition-all duration-200 cursor-pointer ${
                    isPlaying ? "border-purple-500/40" : "hover:border-purple-500/20"
                  }`}
                  onClick={() => handlePlay(i)}
                >
                  <span className="text-slate-600 text-sm w-5 font-mono">{String(i + 1).padStart(2, "0")}</span>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                    isPlaying ? "bg-purple-600" : "bg-purple-600/20 group-hover:bg-purple-600/50"
                  }`}>
                    {isPlaying ? (
                      <div className="flex items-end gap-[2px] h-4">
                        {[0, 1, 2].map((b) => (
                          <div key={b} className="eq-bar w-[3px] rounded-full bg-white"
                            style={{ animationDuration: `${0.5 + b * 0.15}s` }} />
                        ))}
                      </div>
                    ) : (
                      <Play size={14} className="text-purple-400 ml-0.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isPlaying ? "text-purple-300" : "text-slate-200"}`}>
                      {track.title}
                    </div>
                    <div className="text-slate-500 text-xs">{track.genre}</div>
                  </div>

                  <span className="text-xs text-slate-600 glass px-2 py-0.5 rounded-full hidden sm:block">{track.bpm} BPM</span>
                  <span className="text-slate-500 text-sm font-mono">{track.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
