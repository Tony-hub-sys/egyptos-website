# Egyptos Centre Website — Setup

## Step 1: Initialize the project

```bash
npx create-next-app@latest egyptos-website --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd egyptos-website
npm install lucide-react @supabase/supabase-js
```

(Accept defaults if prompted. Turbopack: yes is fine.)

## Step 2: Environment variables

Create `.env.local` in the project root (values from your Supabase project → Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## App Router blueprint

```
egyptos-website/
├── app/
│   ├── layout.tsx          # Global layout: fonts, metadata, Navbar, Footer, WhatsApp button
│   ├── globals.css         # Tailwind + brand theme
│   ├── page.tsx            # Home (landing page)
│   ├── translation/
│   │   └── page.tsx        # Translation & Corporate services + Quote Request Form
│   ├── academy/
│   │   └── page.tsx        # Language Academy + 18-Week Program + Placement Test CTA
│   ├── about/
│   │   └── page.tsx        # About Us — history in Matrouh since 2016
│   └── contact/
│       └── page.tsx        # Contact — map, WhatsApp, message form
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   └── supabase.ts         # Supabase client (browser, anon key)
└── .env.local
```

## Supabase tables (run in SQL Editor)

```sql
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  source_language text,
  target_language text,
  details text
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null
);

alter table quote_requests enable row level security;
alter table contact_messages enable row level security;
create policy "allow anonymous inserts" on quote_requests for insert with check (true);
create policy "allow anonymous inserts" on contact_messages for insert with check (true);
```

## Deployment (after all pages are done)

```bash
git init && git add -A && git commit -m "Egyptos Centre website"
# create a repo at github.com/new, then:
git remote add origin https://github.com/YOUR_USERNAME/egyptos-website.git
git branch -M main && git push -u origin main
```

Then at vercel.com: **Add New → Project → Import** the repo → add the two env vars → **Deploy**. Free tier, live at `egyptos-website.vercel.app` (custom domain attachable later).
