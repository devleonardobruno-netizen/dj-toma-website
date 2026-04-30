"use client";

export default function CookieReset() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("cookie_consent");
        window.location.reload();
      }}
      className="mt-4 px-5 py-2.5 rounded-xl text-sm glass text-purple-400 border-purple-500/30 hover:border-purple-500/60 transition-all"
    >
      Reimposta preferenze cookie
    </button>
  );
}
