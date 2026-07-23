# Placement Results — Supabase SQL

Run this once in your Supabase project → **SQL Editor**:

```sql
create table placement_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  language_tested text not null,
  score integer not null,
  level text not null
);

-- Row Level Security: allow the public site to insert leads, nothing else
alter table placement_results enable row level security;
create policy "allow anonymous inserts"
  on placement_results
  for insert
  with check (true);
```

`score` stores the number of correct answers; `level` stores the CEFR band
(A1–C1); `language_tested` stores the tested language code (en, de, fr, it, zh).
