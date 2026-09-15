-- Scale Visory website schema
-- Run once in Supabase SQL editor.

create extension if not exists "pgcrypto";

-- ---------- Enums ----------
create type inquiry_kind as enum ('general','service','training');

-- ---------- Inquiries (contact / service / training forms) ----------
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  kind inquiry_kind not null default 'general',
  name text not null,
  phone text not null,
  email text,
  company text,
  subject text,                       -- service name / course name
  message text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Blog posts ----------
create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,              -- markdown-lite / plain paragraphs
  category text not null default 'Accounting',
  cover_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- updated_at trigger ----------
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger posts_updated before update on posts for each row execute function set_updated_at();

-- ---------- Row Level Security ----------
alter table inquiries enable row level security;
alter table posts enable row level security;

-- Public can read published posts
create policy "public read published posts" on posts for select using (is_published = true);

-- Logged-in admin (any authenticated user — create only your own users in Supabase Auth) has full access
create policy "admin all inquiries" on inquiries for all to authenticated using (true) with check (true);
create policy "admin all posts" on posts for all to authenticated using (true) with check (true);

-- Public inserts (inquiries) are done server-side with the service role key,
-- so no anon insert policies are needed.
