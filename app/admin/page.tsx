"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  LogOut, RefreshCw, Trash2, CheckCircle, Clock, XCircle,
  Phone, Mail, MapPin, Users, CalendarDays, FileText, Filter, LayoutDashboard, Layers
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_date: string;
  location: string;
  package: string | null;
  guests: number | null;
  notes: string | null;
  admin_notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

interface Section {
  id: string;
  label: string;
  enabled: boolean;
  sort_order: number;
}

const STATUS_CONFIG = {
  pending: { label: "In attesa", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  confirmed: { label: "Confermato", icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  cancelled: { label: "Annullato", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
};

const PKG_LABELS: Record<string, string> = {
  base: "Base Party",
  medium: "Medium Party",
  big: "Big Party",
  custom: "Personalizzato",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tab, setTab] = useState<"bookings" | "sections">("bookings");

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  // Sections state
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionsLoading, setSectionsLoading] = useState(false);

  const fetchBookings = useCallback(async (tok: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        const notes: Record<string, string> = {};
        data.forEach((b: Booking) => { notes[b.id] = b.admin_notes || ""; });
        setAdminNotes(notes);
      } else {
        toast.error("Sessione scaduta");
        setAuthed(false);
      }
    } catch {
      toast.error("Errore di connessione");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSections = useCallback(async () => {
    setSectionsLoading(true);
    try {
      const res = await fetch("/api/sections");
      if (res.ok) setSections(await res.json());
    } catch {
      toast.error("Errore caricamento sezioni");
    } finally {
      setSectionsLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      const { token: tok } = await res.json();
      setToken(tok);
      setAuthed(true);
      fetchBookings(tok);
      fetchSections();
    } else {
      toast.error("Password errata");
    }
  };

  const toggleSection = async (id: string, enabled: boolean) => {
    // Optimistic update
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, enabled } : s));
    const res = await fetch(`/api/sections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) {
      // Revert on error
      setSections((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !enabled } : s));
      toast.error("Errore aggiornamento sezione");
    } else {
      toast.success(enabled ? `"${sections.find(s => s.id === id)?.label}" attivata` : `"${sections.find(s => s.id === id)?.label}" disattivata`);
    }
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status, admin_notes: adminNotes[id] || "" }),
    });
    if (res.ok) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      toast.success("Stato aggiornato");
    }
  };

  const saveNotes = async (id: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ admin_notes: adminNotes[id] || "", status: bookings.find(b => b.id === id)?.status }),
    });
    if (res.ok) toast.success("Note salvate");
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Eliminare questa prenotazione?")) return;
    const res = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Prenotazione eliminata");
    }
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="font-heading text-4xl gradient-text-purple-cyan mb-2">DJ TOMA</div>
            <p className="text-slate-500 text-sm">Pannello Amministrazione</p>
          </div>
          <form onSubmit={handleLogin} className="glass rounded-3xl p-8 animated-border space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Password Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl gradient-text-purple-cyan">Dashboard Admin</h1>
            <p className="text-slate-500 text-sm mt-1">Gestione DJ TOMA</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { fetchBookings(token); fetchSections(); }}
              className="glass px-4 py-2 rounded-xl text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2 text-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Aggiorna
            </button>
            <button
              onClick={() => setAuthed(false)}
              className="glass px-4 py-2 rounded-xl text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2 text-sm"
            >
              <LogOut size={14} />
              Esci
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("bookings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === "bookings" ? "bg-purple-600 text-white" : "glass text-slate-400 hover:text-purple-400"
            }`}
          >
            <LayoutDashboard size={15} />
            Prenotazioni
            {stats.pending > 0 && (
              <span className="bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                {stats.pending}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("sections")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === "sections" ? "bg-purple-600 text-white" : "glass text-slate-400 hover:text-purple-400"
            }`}
          >
            <Layers size={15} />
            Fasce sito
          </button>
        </div>

        {/* ── SEZIONI TAB ── */}
        {tab === "sections" && (
          <div className="glass rounded-3xl p-8">
            <h2 className="font-heading text-2xl text-white mb-2">Visibilità fasce</h2>
            <p className="text-slate-500 text-sm mb-8">
              Attiva o disattiva le sezioni del sito. Le modifiche sono immediate per i nuovi visitatori.
            </p>

            {sectionsLoading ? (
              <div className="text-slate-500 text-sm">Caricamento...</div>
            ) : (
              <div className="space-y-3">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-200 ${
                      section.enabled
                        ? "bg-white/[0.04] border-purple-500/20"
                        : "bg-white/[0.01] border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors ${section.enabled ? "bg-green-400" : "bg-slate-600"}`} />
                      <div>
                        <div className="text-slate-200 font-medium text-sm">{section.label}</div>
                        <div className="text-slate-600 text-xs mt-0.5">/{section.id}</div>
                      </div>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => toggleSection(section.id, !section.enabled)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                        section.enabled ? "bg-purple-600" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                          section.enabled ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-slate-700 text-xs mt-6">
              Hero, Navbar e Footer sono sempre visibili e non possono essere disattivati.
            </p>
          </div>
        )}

        {/* ── PRENOTAZIONI TAB ── */}
        {tab === "bookings" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Totale", value: stats.total, color: "#a855f7" },
                { label: "In attesa", value: stats.pending, color: "#eab308" },
                { label: "Confermati", value: stats.confirmed, color: "#22c55e" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5">
                  <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">{s.label}</div>
                  <div className="font-heading text-4xl" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <Filter size={14} className="text-slate-500 self-center mr-1" />
              {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                    filter === f ? "bg-purple-600 text-white" : "glass text-slate-400 hover:text-purple-400"
                  }`}
                >
                  {f === "all" ? "Tutti" : STATUS_CONFIG[f].label}
                </button>
              ))}
            </div>

            {/* Bookings list */}
            {loading ? (
              <div className="text-center py-20 text-slate-500">Caricamento...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-500">Nessuna prenotazione trovata</div>
            ) : (
              <div className="space-y-4">
                {filtered.map((booking) => {
                  const status = STATUS_CONFIG[booking.status];
                  const StatusIcon = status.icon;
                  const isExpanded = expandedId === booking.id;

                  return (
                    <div key={booking.id} className="glass rounded-2xl overflow-hidden">
                      <div
                        className="px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                      >
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color} shrink-0`}>
                          <StatusIcon size={11} />
                          {status.label}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-slate-200 font-medium truncate">{booking.name}</div>
                          <div className="text-slate-500 text-xs">{booking.email}</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-sm">
                          <CalendarDays size={13} />
                          {new Date(booking.event_date).toLocaleDateString("it-IT")}
                        </div>
                        <div className="hidden md:block text-slate-500 text-sm">
                          {booking.package ? PKG_LABELS[booking.package] ?? booking.package : "—"}
                        </div>
                        <div className="text-slate-600 text-xs">
                          {new Date(booking.created_at).toLocaleDateString("it-IT")}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-purple-500/10 pt-4">
                          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            {[
                              { icon: Phone, label: "Telefono", value: booking.phone },
                              { icon: Mail, label: "Email", value: booking.email },
                              { icon: MapPin, label: "Luogo", value: booking.location },
                              { icon: CalendarDays, label: "Data evento", value: new Date(booking.event_date).toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                              { icon: Users, label: "Ospiti", value: booking.guests ? `${booking.guests} persone` : "Non specificato" },
                              { icon: FileText, label: "Pacchetto", value: booking.package ? (PKG_LABELS[booking.package] ?? booking.package) : "Non specificato" },
                            ].map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <div key={item.label} className="bg-white/[0.03] rounded-xl p-3">
                                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                                    <ItemIcon size={11} />
                                    {item.label}
                                  </div>
                                  <div className="text-slate-300 text-sm">{item.value}</div>
                                </div>
                              );
                            })}
                          </div>

                          {booking.notes && (
                            <div className="bg-white/[0.03] rounded-xl p-3 mb-4">
                              <div className="text-slate-500 text-xs mb-1">Note del cliente</div>
                              <div className="text-slate-300 text-sm whitespace-pre-wrap">{booking.notes}</div>
                            </div>
                          )}

                          <div className="mb-4">
                            <label className="block text-slate-500 text-xs mb-2">Note admin</label>
                            <textarea
                              rows={2}
                              value={adminNotes[booking.id] ?? ""}
                              onChange={(e) => setAdminNotes((prev) => ({ ...prev, [booking.id]: e.target.value }))}
                              className="w-full bg-white/[0.05] border border-purple-500/20 rounded-xl px-4 py-2 text-slate-200 text-sm outline-none focus:border-purple-500/60 transition-colors resize-none"
                              placeholder="Aggiungi note interne..."
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => updateStatus(booking.id, "confirmed")}
                              className="px-4 py-2 rounded-xl text-sm bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                              Conferma
                            </button>
                            <button onClick={() => updateStatus(booking.id, "pending")}
                              className="px-4 py-2 rounded-xl text-sm bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">
                              In attesa
                            </button>
                            <button onClick={() => updateStatus(booking.id, "cancelled")}
                              className="px-4 py-2 rounded-xl text-sm bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                              Annulla
                            </button>
                            <button onClick={() => saveNotes(booking.id)}
                              className="px-4 py-2 rounded-xl text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                              Salva note
                            </button>
                            <a href={`tel:${booking.phone}`}
                              className="px-4 py-2 rounded-xl text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5">
                              <Phone size={12} /> Chiama
                            </a>
                            <a href={`mailto:${booking.email}`}
                              className="px-4 py-2 rounded-xl text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5">
                              <Mail size={12} /> Email
                            </a>
                            <button onClick={() => deleteBooking(booking.id)}
                              className="ml-auto px-4 py-2 rounded-xl text-sm bg-red-900/20 text-red-500 border border-red-500/10 hover:bg-red-900/30 transition-colors flex items-center gap-1.5">
                              <Trash2 size={12} /> Elimina
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
