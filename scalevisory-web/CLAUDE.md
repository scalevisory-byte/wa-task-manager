# Scale Visory — project context for Claude Code

## What this is
Website + future business platform for Scale Visory (Surat accounting / taxation / legal / business consultancy firm). Tagline: "Balancing The Unbalanced". Owner: Dinesh Parmar.

## Current state (public site rebuilt to the V1 sitemap; builds clean)
Next.js 14 App Router + TypeScript + Tailwind + Supabase (Postgres, Auth, Storage). See README.md for setup.
- **Services** — 4 core services in `src/lib/content/services.ts`, each with `sections[]` (decision #1 fold applied).
  Old six slugs 301 in `next.config.mjs`.
- **Consultancy sub-pages** — `src/lib/content/consultancy.ts` -> `/services/business-consultancy/[sub]`:
  why-isnt-your-business-growing, ai-automation, monthly-business-advisory
- **Industries** — `src/lib/content/industries.ts` -> `/industries` + `/industries/[slug]`.
  Travel's canonical page is `/travel-agency-accounting`; `/industries/travel-agencies` 301s to it (decision #6).
  An industry with `href` set is excluded from `/industries/[slug]` via `routedIndustries`.
- **Resources** — `src/lib/content/resources.ts`, 5 categories -> `/resources`, `/resources/[category]`,
  `/resources/[category]/[slug]`. `posts.category` is still a text column; `categorySlug()` maps both the new names
  and the pre-V1 six ("GST", "Income Tax", ...) so old rows keep resolving. `/blog` 301s to `/resources`;
  `/blog/[slug]` looks the post up and 301s to its canonical resource URL.
  **Do not delete that route — the old URLs are indexed.**
- **Policies** — `src/lib/content/policies.ts` -> `/privacy-policy`, `/terms`, `/disclaimer` (footer only, never main nav)
- **SEO** — per-page `alternates.canonical`; `Breadcrumbs` emits BreadcrumbList; `JsonLd` emits AccountingService (home),
  Service (service pages), FAQPage (travel), Article (posts). `sitemap.ts` covers every route.
- Admin (/admin): inquiries inbox, blog editor. Auth = Supabase email/password, protected by `src/middleware.ts`
- Schema: `supabase/schema.sql` (inquiries, posts, RLS) — unchanged; this rebuild needed no migration
- External links in nav: Careers -> https://zyntajobs.in, Payment recovery -> https://artharecovery.in (built separately — do NOT rebuild a job portal or recovery module here)

## Not built yet (V1 remainder)
Phases 1 and 5-7 of `docs/PLATFORM-PLAN.md`: migrations for the V1 tables, RBAC + roles/permissions, audit triggers,
`tenant_id` (decision #8), the multi-step consultation form and lead pipeline, admin-editable service/industry content,
FAQs/testimonials/team tables, settings, and the admin dashboard. Page content is hardcoded in `src/lib/content/*` —
those files are the seed for the admin-editable tables when Phase 1 lands.

## Known issue — upgrade before launch
`next@14.2.15` carries 2 advisories, 1 critical (unauthenticated RCE in the image optimizer; Server Function endpoint
disclosure). There is no patched 14.x stable — the fix is a 14 -> 16 major upgrade. Do it before the domain goes live.

## Where this is going (V1 — approved plan)
`docs/PLATFORM-PLAN.md` is the source of truth: sitemap, 4 core services (Accounting, Taxation, Legal, Business Consultancy), industries, resources (5 categories), consultation form → lead management, RBAC admin CMS, SEO, security, infra, V2 client portal, V3 AI.
Open decisions are in §17 of that doc — ask before implementing anything that depends on them.

## Brand (apply exactly)
Navy #073574, sky #10A9E8, off-white #F8FAFC. Montserrat (headings) + Inter (body). Premium corporate tone, no stock-photo clichés, no cartoon icons. Office: G-59, VIP Plaza, VIP Road, Vesu, Surat – 395007. Phone/WhatsApp: +91 99099 93565. "12+ years" in messaging.

## Working rules
- Keep deliverables scoped to exactly what's asked; don't add extra tabs/modules unasked
- Never rename account/ledger/party/service names the owner gives; keep his order and numbering
- Never invent testimonials, certifications, client counts, awards or legal claims — use placeholders
- Hinglish is fine in docs/instructions for the owner; site copy stays English
- Migrations: add new SQL under `supabase/migrations/` (don't edit schema.sql in place after V1 starts)
- Service-role key is server-only (`createAdminClient` in `src/lib/supabase/server.ts`); never expose it
- Run `npx tsc --noEmit && npm run build` before saying anything is done

## Commands
npm install · npm run dev · npm run build
Env: copy `.env.example` → `.env.local`

## Decisions taken (owner-approved defaults — proceed without re-asking)
1. **Four core services only**: Accounting, Taxation, Legal, Business Consultancy. Fold the current six as follows —
   Compliance & Regulatory → statutory items into Taxation, ROC/corporate/licence docs into Legal;
   Business Advisory → Business Consultancy; Internal Audit → "Financial Internal Audit" section inside Accounting
   and "Business Internal Audit" section inside Business Consultancy. Add 301 redirects from the old six slugs.
2. **Payment recovery**: Legal §C "Legal Notices & Recovery — Recover What Is Yours" stays as a described service on the
   Legal page, but every recovery CTA links out to https://artharecovery.in. No recovery module, forms or data here.
3. **Training institute**: keep `/training` and its nav item as-is.
4. **Legal scope**: Legal pages describe advisory and documentation services only. Court/tribunal/authority representation
   is worded as "coordinated through empanelled advocates". Advocate names are `[PLACEHOLDER — owner to confirm]`.
   Legal Service Disclaimer must state this distinction.
5. **Email / logo / content**: sender `info@scalevisory.com` pending DNS verification (use as placeholder in Settings);
   logo stays the SVG mark in `src/components/Logo.tsx` until owner supplies files; testimonials, team, FAQs,
   credentials are empty-by-default and hidden until filled from admin.
6. `/travel-agency-accounting` = the canonical SEO landing; `/industries/travel-agencies` redirects (301) to it.
7. Admin "website visitors" = link to GA4, not an API integration.
8. Add `tenant_id` to leads/posts/settings now (nullable, default Scale Visory) for possible multi-venture reuse.
9. Lead PII retention: lost leads purged after 24 months (documented in privacy policy).
