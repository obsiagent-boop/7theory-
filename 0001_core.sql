-- 7Theory core schema for Supabase
create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null, phone text not null, email text, message text, source text default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  name text not null, phone text not null, vehicle text, year text, services text[] not null default '{}',
  finish text, notes text, indicative_total integer not null default 0, status text not null default 'new', source text default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references public.quotes(id) on delete cascade, contact_id uuid references public.contacts(id) on delete cascade,
  event_type text not null, payload jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);

-- Public website forms use the server secret through the Worker, so they do not need direct table grants.
-- Keep RLS enabled for browser safety. The secret key bypasses RLS from the backend Worker.
alter table public.contacts enable row level security;
alter table public.quotes enable row level security;
alter table public.lead_events enable row level security;
