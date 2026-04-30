import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authHeader = req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await req.json();
  const { status, admin_notes } = body;

  const { error } = await supabaseAdmin
    .from("bookings")
    .update({ status, admin_notes })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Errore aggiornamento" }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authHeader = req.headers.get("authorization");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { error } = await supabaseAdmin.from("bookings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Errore eliminazione" }, { status: 500 });
  return NextResponse.json({ success: true });
}
