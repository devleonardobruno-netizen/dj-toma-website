-- Run this in the Supabase SQL editor

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  event_date date not null,
  location text not null,
  package text,
  guests integer,
  notes text,
  admin_notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Disable RLS for server-side access (service role bypasses RLS anyway)
alter table bookings enable row level security;

-- Only service role can access (no public access)
create policy "service_role_only" on bookings
  for all using (false);

-- Sezioni del sito (visibilità controllata dall'admin)
create table if not exists sections (
  id text primary key,
  label text not null,
  enabled boolean not null default true,
  sort_order integer not null default 0
);

insert into sections (id, label, enabled, sort_order) values
  ('about',          'Chi Sono',       true, 1),
  ('packages',       'Pacchetti',      true, 2),
  ('gallery',        'Gallery & Mix',  true, 3),
  ('collaborators',  'Collaboratori',  true, 4),
  ('booking',        'Prenota',        true, 5)
on conflict (id) do nothing;
