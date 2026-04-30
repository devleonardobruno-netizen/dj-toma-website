import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, location, package: pkg, guests, notes } = body;

    if (!name || !email || !phone || !date || !location) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("bookings").insert([
      {
        name,
        email,
        phone,
        event_date: date,
        location,
        package: pkg || null,
        guests: guests ? parseInt(guests) : null,
        notes: notes || null,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Errore nel salvataggio" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Protected — only from admin panel with server-side session
  const authHeader = req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Errore nel recupero dati" }, { status: 500 });
  }

  return NextResponse.json(data);
}
