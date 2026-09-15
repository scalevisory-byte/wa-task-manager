# Scale Visory — Website

Next.js 14 (App Router, TypeScript, Tailwind) + Supabase (Postgres, Auth, Storage).
Sections: Home, About, 4 core service pages (Accounting, Taxation, Legal, Business Consultancy) with three
Consultancy sub-pages, Industries + a travel-agency SEO landing, Resources (5 categories) with admin editor,
Training Institute, Contact (Google Maps), policy pages, inquiry inbox, tawk.to chatbot, Google Analytics,
SEO (metadata, canonicals, sitemap.xml, robots.txt, JSON-LD).

(Job portal aur Payment Recovery is build mein nahi hain — wo alag se bane hue hain.)

## Setup (15 min)

### 1. Supabase project
1. https://supabase.com → New project (region: **Mumbai / ap-south-1**). Password note kar lo.
2. **SQL Editor** → `supabase/schema.sql` ka poora content paste → Run. (Tables aur RLS ban jayenge.)
3. **Authentication → Users → Add user** → apna admin email + password (yahi admin panel ka login hai). Email confirm ✅ tick karo.
4. **Authentication → Providers → Email** → "Confirm email" OFF rakho (sirf hum users banayenge, public signup nahi hai).
5. **Project Settings → API** se copy karo: Project URL, `anon` key, `service_role` key.

### 2. Env file
`.env.example` ko copy karke `.env.local` banao aur values bharo.
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 Measurement ID (optional).
- `NEXT_PUBLIC_TAWK_PROPERTY_ID` / `WIDGET_ID` — tawk.to → Administration → Chat Widget → embed code mein `embed.tawk.to/<PROPERTY>/<WIDGET>` (optional).

### 3. Run locally
```
npm install
npm run dev      # http://localhost:3000
```
Admin: http://localhost:3000/admin/login

### 4. Deploy (Vercel — free)
1. Code GitHub pe push karo.
2. vercel.com → Import repo → Environment Variables mein `.env.local` ki saari keys daalo → Deploy.
3. Domain (scalevisory.in) Vercel mein add karo, DNS point karo — apex aur www dono.
4. Google Search Console mein `https://scalevisory.in/sitemap.xml` submit karo.

## Admin panel (`/admin`)
- **Inquiries** — saare forms (Contact / Service / Training) yahan aate hain; Mark read, WhatsApp, Call.
- **Posts** — title, slug, category, excerpt, cover image URL, content (blank line = paragraph, `## Heading`, `- bullet`, `**bold**`), Published toggle.
  Category dropdown ab 5 Resources categories dikhata hai (Articles, GST Updates, Tax Updates, Legal Updates, Business Insights).
  Post ka public URL `/resources/<category>/<slug>` hai. Purane posts ki category (GST, Income Tax, ...) apne aap
  map ho jaati hai — kuch migrate karne ki zaroorat nahi.

## URL redirects (301)
Purane URLs indexed hain, isliye sab redirect hote hain — `next.config.mjs` dekho:
`/services/accounting-bookkeeping` → `/services/accounting`, `/services/compliance-regulatory` → `/services/taxation`,
`/services/business-advisory` → `/services/business-consultancy`, `/services/internal-audit` → Accounting ka
Financial Internal Audit section, `/industries/travel-agencies` → `/travel-agency-accounting`, `/blog` → `/resources`.
Individual blog posts `src/app/blog/[slug]/page.tsx` se redirect hote hain (category lookup karke). **Ye route mat hatana.**

## Launch se pehle
`next@14.2.15` mein 2 security advisories hain, ek critical. 14.x ka koi patched stable release nahi hai —
14 se 16 major upgrade karna padega. Domain live karne se pehle ye kar lena.

## Content edit karna hai?
Saara page content `src/lib/content/` mein hai — ek hi jagah, code chhede bina badal sakte ho.
- Firm details (phone, email, address, hours, socials): `src/lib/content/site.ts` (nav bhi yahin hai)
- 4 core services ka text: `src/lib/content/services.ts` (har service ke andar `sections[]`)
- Consultancy sub-pages: `src/lib/content/consultancy.ts`
- Industries: `src/lib/content/industries.ts`
- Resources categories: `src/lib/content/resources.ts`
- Privacy / Terms / Disclaimer: `src/lib/content/policies.ts` (`[PLACEHOLDER — ...]` wale hisse owner ko bharne hain)
- Training courses: `src/app/training/page.tsx` (top pe `courses` array)
- Logo: `src/components/Logo.tsx` (abhi SVG mark hai; official PNG use karna ho to `public/logo.png` rakh ke `<img>` se replace karo)

## Security notes
- `SUPABASE_SERVICE_ROLE_KEY` sirf server pe use hota hai (form inserts). Kabhi `NEXT_PUBLIC_` mat banana.
- Public users sirf published posts padh sakte hain; inquiries sirf logged-in admin dekh sakta hai (RLS).
- Forms mein honeypot spam field hai.
- `/admin/*` middleware se protected hai, robots mein disallow.
