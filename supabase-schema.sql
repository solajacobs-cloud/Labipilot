create table if not exists public.labipilot_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.labipilot_waitlist enable row level security;

grant insert on public.labipilot_waitlist to anon;
grant select, insert, update, delete on public.labipilot_waitlist to authenticated;

create policy "Anyone can join LabiPilot waitlist"
on public.labipilot_waitlist
for insert
to anon
with check (
  length(trim(name)) > 0
  and email like '%@%'
);

create policy "Authenticated users can read waitlist"
on public.labipilot_waitlist
for select
to authenticated
using (true);
