# Scale Visory — Website & Business Platform
## Planning document (Phases 1–12) — for approval before build

Status of what already exists: a Next.js 14 + Supabase site is built (home, about, six service pages, training, contact, blog, inquiry inbox, blog admin). This plan **extends** that codebase — same stack, same Supabase project — rather than starting over. Where the new brief changes something already built, it is called out in §17 (decisions).

---

## 1. Website sitemap

```
/                               Home
/about                          About (background, leadership, values, credentials)
/services                       Services overview (4 cards)
/services/accounting            Accounting (6 categories, incl. Financial Internal Audit)
/services/taxation              Taxation (GST, Income Tax, TDS, Advisory, Review, Dispute Support)
/services/legal                 Legal (6 categories, incl. Legal Notices & Recovery)
/services/business-consultancy  Business Consultancy hub (process + 10 sub-services)
/services/business-consultancy/why-isnt-your-business-growing   High-conversion diagnostic page
/services/business-consultancy/ai-automation                    AI & Automation (under Consultancy)
/services/business-consultancy/monthly-business-advisory        Recurring offering
/industries                     Industries overview
/industries/travel-agencies     Priority industry page
/travel-agency-accounting       SEO landing (canonical to /industries/travel-agencies or standalone — see §17)
/industries/[slug]              Trading, Retail, Services, Startups, SMEs, Professional Businesses, Other
/resources                      Resources hub
/resources/articles             Articles
/resources/gst-updates          GST Updates
/resources/tax-updates          Tax Updates
/resources/legal-updates        Legal Updates
/resources/business-insights    Business Insights
/resources/[category]/[slug]    Single post
/training                       Training institute (already built — keep, see §17)
/book-consultation              Consultation form (premium, multi-step)
/contact                        Contact (phone, email, WhatsApp, map, short form)
/privacy-policy  /terms  /cookie-policy  /disclaimer  /legal-service-disclaimer  /consultancy-disclaimer
/careers  → external zyntajobs.in        (nav link)
/recovery → external artharecovery.in   (see §17 — conflicts with Legal §C)

/admin/*                        Admin (RBAC-protected)
/portal/*                       Client portal (V2 — routes reserved, not built in V1)
/api/*                          Route handlers only where needed (webhooks, exports); forms use server actions
```

Navigation (desktop): Home · About · Services ▾ · Industries ▾ · Business Consultancy · Resources ▾ · Contact · **[Book a Consultation]**
Mobile: full-screen drawer with accordions; sticky bottom bar with Call / WhatsApp / Book.

---

## 2. Complete feature list

**Public website**
- 4 core service pages with distinct identity, category sections, CTA per page
- Business Consultancy hub + 3 sub-pages (Why isn't your business growing, AI & Automation, Monthly Advisory)
- Industries section (travel priority + 7 structured pages)
- Resources: 5 categories, post pages, category filters, tags, related posts
- Consultation form (multi-step, conditional "biggest challenge" for consultancy)
- Contact form, WhatsApp/phone click tracking
- FAQs and testimonials blocks (admin-managed; shown only when real content exists)
- Team section (admin-managed)
- Legal pages (6)
- SEO per page (title, description, canonical, OG, JSON-LD), sitemap, robots
- Analytics: GA4 + event tracking (consultation_submit, contact_submit, whatsapp_click, phone_click, service_view)
- tawk.to chat

**Admin (V1)**
- Dashboard: leads today/week, new enquiries, pending follow-ups (due today/overdue), conversion rate, recent activity; visitors via GA4 embed link (not re-implemented)
- Leads: list, filter (status, service, source, assignee, date), detail, status pipeline, assignment, follow-up log, notes, export CSV
- Consultations & Contacts: separate views, each auto-creates a lead
- Services & Industries: editable page content blocks (headline, intro, category lists, CTA)
- Resources: posts in 5 categories, drafts, scheduling, cover image, SEO fields
- FAQs, Testimonials, Team, Media library
- SEO: per-page metadata overrides
- Settings: contact info, hours, social, tracking IDs, WhatsApp number
- Users & Roles (Super Admin, Admin, Staff)
- Audit logs (who changed what)

**V2 (architecture only in V1)** — client portal, documents, tasks, advisory reports, business health score
**V3** — AI meeting review, AI action plans, WhatsApp automation

---

## 3. User roles

| Role | Scope |
|---|---|
| Super Admin | Everything incl. users, roles, settings, audit logs, delete |
| Admin | All content + leads + settings; cannot manage users/roles |
| Staff | Leads assigned to them, follow-ups, resources drafts; no settings, no delete |
| Client (V2) | Own company's portal only: documents, requests, reports, tasks, messages |
| Public | Read published content, submit forms |

Implementation: `profiles.role` + `permissions` table; Supabase RLS policies read the role from the JWT (custom claim via auth hook) — no per-row role checks in application code.

---

## 4. User journeys

1. **Travel agency owner, Google → "travel agency accounting Surat"** → `/travel-agency-accounting` → sees TCS/commission/agent-reconciliation pain points → "Get Accounting Support" → consultation form (service pre-filled: Accounting, industry: Travel) → lead created, WhatsApp auto-ack (V3), admin notified by email → Staff calls within 24h → status Contacted → Proposal Sent → Converted.
2. **Stuck business owner, Instagram reel → link** → `/services/business-consultancy/why-isnt-your-business-growing` → self-identifies challenge (Sales / Cash Flow…) → "Book a Business Growth Diagnostic" → form with challenge captured → lead tagged consultancy + challenge → assigned to consultant.
3. **Existing client with GST notice** → `/services/taxation` → Tax Dispute Support → "Talk to a Tax Expert" → WhatsApp click (tracked) → conversation off-site; optionally logged as lead by staff.
4. **Owner reading GST update** → `/resources/gst-updates/...` → inline CTA "Apply this to your business" → contact form.
5. **Admin morning routine** → dashboard → overdue follow-ups → opens lead → logs call → sets next follow-up → status change → audit log written.
6. **Content update by staff** → Resources → new GST update → draft → Admin publishes → sitemap revalidated.
7. **(V2) Client** → `/portal` login → sees pending document requests → uploads → task closes → monthly review report visible.

---

## 5. Page-by-page structure

**Home**: Hero (headline, support text, 2 CTAs, abstract "balance" visual — no stock photos) → "One Business. Four Areas of Expertise." (4 cards) → Positioning band ("We don't just maintain…") → Travel agency specialisation strip → Business Consultancy teaser (process strip Diagnose→Improve) → How we work (3 steps) → Latest resources (3) → Consultation CTA section.

**About**: Background · Leadership & expertise · Vision & values · Credentials (only real ones, placeholders otherwise) · Team (admin-managed) · CTA.

**Services overview**: 4 large cards with 1-line positioning + 3 highlights each.

**Accounting**: Hero "Accurate Numbers. Better Decisions." → 6 category sections (A–F from brief, each: intro line + itemised list) → Travel accounting cross-link → Financial Internal Audit explained as distinct from Business Internal Audit → FAQs → CTA "Get Accounting Support" (form pre-filled).

**Taxation**: Hero "Stay Compliant. Reduce Risk. Plan Better." → GST · Income Tax · TDS · Tax Advisory · Tax Review · Tax Dispute Support → Compliance calendar concept → FAQs → CTA "Talk to a Tax Expert".

**Legal**: Hero "Protect Your Business. Reduce Legal Risk." (business-commercial tone, no gavels) → A Business Legal Advisory · B Contract Drafting & Review with **Contract Risk Review** (Critical/High/Medium/Low indicator explained) · C Legal Notices & Recovery "Recover What Is Yours." · D Corporate Documentation · E HR & Employment · F Compliance & Risk Review → **Scope disclaimer**: advisory & documentation vs representation before courts/tribunals/authorities by a qualified advocate → CTA "Discuss Your Legal Requirement".

**Business Consultancy hub**: Hero "Your Business Is Running. But Is It Growing?" → Process: DIAGNOSE → ANALYSE → STRATEGIZE → IMPLEMENT → MEASURE → IMPROVE → 10 sub-service sections (Health Check · Why Isn't Your Business Growing · Profit Improvement · Cash Flow · Strategy · Sales & Revenue · Operations · Management · Business Internal Audit · AI & Automation) → Monthly Business Advisory → 30/60/90 Action Plan explained (sample table) → Business Health Score concept (8 areas, 0–100) → CTA "Book a Business Growth Diagnostic".

**Why Isn't Your Business Growing?**: Headline → 11 analysis areas as a checklist the visitor can tick (client-side only, used to pre-fill form) → Output chain Problem → Root Cause → Impact → Recommendation → Action Plan → Offer: Business Growth Diagnostic → form.

**AI & Automation**: 13 services → Process PEOPLE→PROCESS→DATA→SOFTWARE→COMMUNICATION→AUTOMATION → "AI & Automation Roadmap" deliverable → AI Meeting Review concept (flow diagram) → CTA.

**Industries/[slug]**: Common problems · Scale Visory solution · Relevant services (auto-linked) · Typical challenges · CTA. Travel page adds the six accounting specialisations and GST/TCS specifics.

**Resources**: category hub, list with filters, post page (JSON-LD Article, related posts, CTA).

**Book a Consultation**: 3-step form — (1) You & your business (name, company, mobile, email, business type, size, location) (2) Service required (Accounting / Taxation / Legal / Business Consultancy / Multiple) + conditional challenge picker for consultancy (3) Message + submit. Progress indicator, mobile-first, success state with what happens next.

**Contact**: contact cards, short form, map, hours, WhatsApp/Call buttons (tracked).

---

## 6. Business Consultancy structure

```
BUSINESS CONSULTANCY  (core service #4 — separate identity, own palette accent, own CTA)
├── Process: Diagnose → Analyse → Strategize → Implement → Measure → Improve
├── Business Health Check         (Financial · Sales · Operations · Management — 4 review blocks)
├── Why Isn't Your Business Growing?   (dedicated page; Business Growth Diagnostic offer)
├── Profit Improvement            ("Improve profitability, not just revenue")
├── Cash Flow Consulting          (incl. 30/60/90-day cash forecast)
├── Business Strategy
├── Sales & Revenue Consulting
├── Operations Consulting
├── Management Consulting         (KPI systems, review meetings, delegation)
├── Business Internal Audit       (efficiency/objectives — distinct from Financial Internal Audit under Accounting)
│     Output: Business Audit Report + Risk Rating + Recommendations + Action Plan
├── AI & Automation Consulting    (dedicated page; NOT a 5th core service)
│     └── AI Meeting Review (platform concept, V3)
├── Monthly Business Advisory     (recurring; Monthly Business Review + AI Insights + Issues + Recommendations + Action Plan)
└── Deliverable frameworks
      ├── 30/60/90 Day Action Plan  (Area · Problem · Action · Owner · Deadline · Status · Expected · Actual)
      └── Business Health Score     (8 areas, 0–100, overall; Critical / Improve / Opportunities / Actions)
```
Earlier items the user listed (coaching, mentoring, staff training, problem-finding, solution, automation, review meetings, financial analysis) map to: Management Consulting (coaching, mentoring, review meetings), Operations (training, solution/SOP), AI & Automation (automation), Health Check + Profit Improvement (problem-finding, financial analysis).

---

## 7. Database architecture (PostgreSQL / Supabase)

**Why Supabase**: managed Postgres + Auth + Storage + RLS in one, Mumbai region, already in use; migrations via Supabase CLI (`supabase/migrations/*.sql`). Prisma not needed — SQL migrations + generated TypeScript types (`supabase gen types`).

**Conventions**: `uuid` PKs (`gen_random_uuid()`), `created_at/updated_at` (trigger), `deleted_at` soft delete on content & client tables, `created_by/updated_by` → `profiles.id`, indexes on every FK + status/date columns, `citext` for emails/slugs.

### ER (V1 tables in bold; V2/V3 designed now, created later)

```
auth.users ──1:1── profiles(role_id) ──N:1── roles ──N:M── permissions
                        │
                        ├── audit_logs(actor_id)
                        └── activity_logs

leads ──N:1── services            leads ──N:1── industries
  │  ──N:1── profiles (assigned_to)
  ├──1:N── lead_followups
  ├──1:1── consultation_requests   (form detail: business_type, size, location, challenge)
  └──1:1── contact_requests

services ──1:N── service_categories ──1:N── service_items
industries (page content + relevant service links: industry_services N:M)

posts ──N:1── post_categories (articles, gst, tax, legal, insights)
posts ──N:M── post_tags
faqs (page_key), testimonials, team_members, media (storage metadata)
seo_metadata (path unique), settings (key/value, typed)

-- V2
companies ──1:N── clients(profile_id)      companies ──1:N── documents ──N:1── document_categories
companies ──1:N── client_requests ──1:N── tasks     tasks ──N:1── profiles(assignee)
notifications(profile_id)
companies ──1:N── business_assessments ──1:N── business_health_scores
business_assessments ──1:N── business_audit_findings
companies ──1:N── advisory_reports ──1:N── action_plans (action_plan_items: area, problem, action, owner, deadline, status, expected_impact, actual_impact)
-- V3
companies ──1:N── meeting_reviews ──1:N── meeting_items(type: decision|action|risk|opportunity|pending|number; owner, deadline, status)
```

### Key table specs (V1)

**leads**: id, name, company, mobile, email, city, business_type, service_id FK, industry_id FK, message, source (enum: website_consultation, website_contact, whatsapp, phone, referral, instagram, manual), status (enum: new, contacted, qualified, proposal_sent, negotiation, converted, lost), lost_reason, assigned_to FK, next_followup_at, converted_company_id (V2), created_at, updated_at, deleted_at. Indexes: status, assigned_to, next_followup_at, created_at, mobile.

**lead_followups**: id, lead_id FK, type (call, whatsapp, email, meeting, note), summary, outcome, next_followup_at, created_by, created_at.

**consultation_requests**: id, lead_id FK unique, business_size, location, services (text[]), biggest_challenge (enum), raw_payload jsonb, utm jsonb.

**services / service_categories / service_items**: content is admin-editable rows, not hardcoded; ordering via `sort_order`.

**settings**: key unique, value jsonb, is_public boolean (public ones exposed to site, e.g. phone; private ones like API keys never selected client-side).

**audit_logs**: id, actor_id, action, table_name, record_id, before jsonb, after jsonb, ip, user_agent, created_at — written by DB triggers on leads, settings, users, posts.

RLS: public → select published content + public settings only; inserts to leads/requests only via service role (server actions); staff → leads where assigned_to = self or status new; admin/super → all; client (V2) → rows where company_id = own company.

---

## 8. Backend architecture

**Why Next.js App Router with server actions + Supabase, not a separate Node/Nest API**: one deployable, no CORS surface, RLS as the authorisation layer, and the team is small. Modules are folders, not services. A separate API is added in V3 only if AI workers need long-running jobs (then: Supabase Edge Functions or a small worker).

```
src/
  modules/
    auth/         signIn, signOut, reset, session helpers, RBAC guard (requireRole)
    users/        profiles, roles, permissions
    leads/        actions (create, update, assign, follow-up), queries (list w/ pagination/filter/sort), csv export
    consultations/ contact/  form schemas (zod), createFromForm → leads
    services/  industries/  content CRUD
    resources/    posts, categories, tags, publish/schedule
    faqs/ testimonials/ team/ media/
    seo/          metadata resolver (db override → page default)
    settings/
    audit/        log helpers + viewer
    notifications/ (email via Resend; WhatsApp adapter interface, no impl in V1)
    clients/ documents/ tasks/ consultancy/ meetings/   (V2/V3 folders reserved, empty)
  app/(public)/  app/admin/  app/portal/  app/api/(webhooks, cron, export)
  lib/  supabase clients, validation, errors, logger, rate-limit
```
Cross-cutting: zod validation on every action; typed `ActionResult<T>`; central `AppError`; structured logging (pino) → Vercel logs + Sentry; pagination `{page, pageSize ≤ 100, sort, filters}` helper; rate limiting on public actions (Upstash Redis, 5/min/IP for forms); honeypot + Turnstile captcha on forms.

---

## 9. Infrastructure architecture

```
Domain (scalevisory.in)
 └─ DNS: Cloudflare (proxy on) → CDN + WAF + DDoS + SSL
     └─ Vercel (Next.js, Mumbai edge/functions region bom1)
          ├─ Supabase (Postgres, Auth, Storage) — ap-south-1 Mumbai
          ├─ Supabase Storage buckets: media (public), documents (private, V2)
          ├─ Resend (transactional email: lead alerts, password reset)
          ├─ Upstash Redis (rate limiting)
          ├─ Sentry (errors) · BetterUptime (uptime) · Vercel Analytics + GA4
          └─ WhatsApp Cloud API adapter (interface only in V1; Meta/BSP account in V3)
```
Environments: `develop` branch → Vercel preview + Supabase **staging** project; `main` → production + Supabase **prod** project. Local dev uses Supabase CLI local stack. Backups: Supabase daily automated (7-day on Pro; PITR optional) + weekly `pg_dump` via GitHub Action to an off-site bucket (Cloudflare R2), 90-day retention. RPO 24h (1h with PITR), RTO 4h; restore drill once per quarter documented in `docs/runbooks/restore.md`.

---

## 10. Security architecture

- Transport: HTTPS everywhere (Cloudflare + Vercel), HSTS, secure/httpOnly/sameSite cookies (Supabase SSR).
- AuthN: Supabase Auth email+password (bcrypt), password reset, email verification, optional TOTP 2FA (Supabase MFA) for admins, login attempt throttling (Supabase built-in + Upstash), session list/revoke via Supabase.
- AuthZ: RBAC in JWT claim + RLS; `requireRole()` guard on every admin action; least-privilege service-role usage isolated to `lib/supabase/admin.ts` (server only).
- Input: zod on all actions; parameterised queries via supabase-js (no raw SQL from user input); output escaping by React; content HTML sanitised (DOMPurify server-side) before storing.
- Headers: CSP (script-src self + GA + tawk + Turnstile), X-Frame-Options DENY except map iframe, Referrer-Policy, Permissions-Policy via `next.config` headers.
- CSRF: server actions are origin-checked by Next; forms same-origin only.
- Uploads: MIME + extension + size validation, random storage keys, private buckets, signed URLs (10 min), ClamAV scan via Supabase Storage hook is V2 (documents) — media in V1 limited to images/PDF by admins only.
- Secrets: Vercel/Supabase env vars only; `.env.example` committed; secret scanning in CI (gitleaks).
- Audit: DB triggers on sensitive tables; admin viewer; logs immutable (no update/delete policy).
- Privacy: leads contain PII → data retention setting (e.g. lost leads purged after 24 months), export/delete on request, privacy policy accordingly.

---

## 11. Admin architecture

Route group `app/admin/(shell)` with sidebar nav generated from a `adminModules` registry (id, label, icon, path, requiredPermission) — adding a module = adding a registry entry + folder. Shared primitives: DataTable (server-side pagination/sort/filter, column visibility, CSV export), FormSheet (side panel create/edit), StatusBadge, KanbanBoard (leads pipeline view), RichTextEditor (TipTap → sanitised HTML), MediaPicker, SeoFields, AuditTrail panel on every record. Dashboard widgets are independent server components with their own queries and loading/empty/error states.

---

## 12. Future client portal architecture (V2)

- Route group `app/portal/*`, role `client`, one profile ↔ one `clients` row ↔ one `companies` row (multi-company per user supported via `client_companies` N:M if needed later).
- Modules map 1:1 to tables already designed: Dashboard (open requests, tasks, latest report, health score), Documents (categories, upload/download with signed URLs, version column), Invoices & Ledgers (V2 read-only from uploaded PDFs/CSVs; live Tally sync is out of scope until an integration decision), Reports, Compliance calendar (`compliance_items` per company), Requests → Tasks, Messages (`threads`/`messages`), Meeting notes (from `meeting_reviews`), Advisory reports & Action plans.
- RLS keyed on `company_id`; staff see companies assigned via `company_staff`.
- Notifications table + email; WhatsApp when V3 adapter lands.

---

## 13. AI / automation architecture (V3; interfaces defined now)

- Storage: meeting recordings → private bucket; transcripts → `meeting_reviews.transcript` (text) with `source` (upload, transcript_paste, recorder).
- Pipeline (async worker — Supabase Edge Function or queue-triggered Vercel function with `waitUntil`): transcript → Claude API with a structured-output schema → `meeting_items` rows (decision / action / owner / deadline / risk / opportunity / pending / number) → tasks auto-created for actions → notification to owner → appears in Management Review.
- Business Health Score: deterministic scoring rules per area stored in `score_rules` (jsonb thresholds) computed from assessment inputs; AI used only for narrative + recommendations, never for the score itself (auditable).
- Monthly Advisory: `advisory_reports` generated from data + AI narrative, reviewed by staff before client sees it (`status: draft → reviewed → published`).
- WhatsApp: adapter interface `MessagingProvider { send(template, to, vars) }`; first impl Meta Cloud API; used for lead acknowledgement, follow-up reminders, document requests.
- All AI outputs stored with `model`, `prompt_version`, `input_hash` for traceability; PII redaction before sending to any model is a configurable step.

---

## 14. Recommended technology stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 App Router, TypeScript | Already built; SSR/ISR for SEO; server actions remove a separate API for V1 |
| UI | Tailwind + shadcn/ui primitives (admin) + custom design system (public) | Fast admin build; public site stays bespoke |
| DB/Auth/Storage | Supabase (Postgres, Mumbai) | Managed, RLS, MFA, storage; matches the PostgreSQL requirement |
| Validation | zod | Shared schemas client/server |
| Rich text | TipTap | Structured, sanitisable |
| Email | Resend | Simple, good deliverability |
| Rate limit | Upstash Redis | Serverless-friendly |
| Captcha | Cloudflare Turnstile | Invisible, free |
| Hosting/CDN/WAF | Vercel + Cloudflare | Managed, India edge |
| Monitoring | Sentry + BetterUptime + Vercel Analytics | Errors, uptime, web vitals |
| Analytics | GA4 (+ GTM optional) | Conversion events |
| CI/CD | GitHub Actions → Vercel | Lint, typecheck, test, gitleaks, build, migrate staging, deploy |
| Tests | Vitest (unit), Playwright (e2e: forms, admin lead flow, mobile viewports) | Evidence-first audit |
| AI (V3) | Anthropic Claude API, structured outputs | Meeting review, narratives |

---

## 15. Development phases

| Phase | Scope | Est. effort |
|---|---|---|
| 0 | Approve this plan; decisions in §17; content collection sheet sent to Scale Visory | — |
| 1 | Foundation: migrations (V1 tables), RBAC, RLS, settings, audit triggers, CI, staging/prod projects, Cloudflare | 4–5 days |
| 2 | Design system + public shell (nav, footer, hero patterns, cards, CTA, forms) | 3–4 days |
| 3 | Four core service pages + consultancy sub-pages, admin-editable content | 5–6 days |
| 4 | Industries (travel first) + travel accounting landing | 2 days |
| 5 | Consultation form + contact + lead pipeline + follow-ups + notifications | 4 days |
| 6 | Resources (5 categories), FAQs, testimonials, team, media, SEO module | 4 days |
| 7 | Admin dashboard, users/roles, audit viewer, settings | 3 days |
| 8 | Legal pages, analytics events, performance pass, accessibility pass | 2 days |
| 9 | Testing (Playwright), security review, backup/restore drill, evidence audit | 3 days |
| 10 | Production deployment, DNS cutover, Search Console, monitoring | 1 day |
| **V1 total** | | **~31–34 working days** |
| V2 | Client portal, documents, tasks, assessments, health score | 5–6 weeks |
| V3 | AI meeting review, advisory generation, WhatsApp, automation | 5–7 weeks |

---

## 16. Module complexity (V1)

| Module | Complexity | Notes |
|---|---|---|
| Public service pages | Medium | Volume of content; distinct layouts per service |
| Business Consultancy pages | Medium-High | Interactive diagnostic checklist; most design effort |
| Industries | Low-Medium | Templated |
| Consultation form | Medium | Multi-step, conditional, tracking, spam defence |
| Lead management | High | Pipeline, assignment, follow-ups, RLS by role, export |
| Resources/CMS | Medium | Rich text, scheduling, 5 categories |
| RBAC + audit logs | Medium-High | Get right once; everything depends on it |
| SEO module | Low-Medium | Overrides + JSON-LD |
| Admin dashboard | Medium | Aggregations, empty states |
| Settings / content editing | Low | |
| Infra / CI / backups | Medium | One-time, must be documented |
| Legal pages | Low | Needs review by Scale Visory's legal team — not to be invented |

---

## 17. Risks & decisions required before development

1. **Service count conflict.** Brief: 4 core services (Accounting, Taxation, Legal, Business Consultancy). Current site: 6 (adds Compliance & Regulatory, Business Advisory, Internal Audit as separate pages). Proposed: fold Compliance & Regulatory → Taxation (statutory) + Legal (ROC/corporate docs); Business Advisory → Business Consultancy; Internal Audit → Accounting (Financial Internal Audit) + Consultancy (Business Internal Audit), as the brief specifies. **Confirm.**
2. **Payment recovery.** Brief puts "Legal Notices & Recovery — Recover What Is Yours" inside Legal; earlier you said recovery is built separately at artharecovery.in. Options: (a) Legal §C describes the service and CTA links out to artharecovery.in, (b) keep it fully on this site, (c) drop from Legal. **Decide.**
3. **Training institute.** Not in the new brief; it's built. Keep under About/Resources, keep as its own nav item, or remove? **Decide.**
4. **Legal practice scope.** Who on the team is a qualified advocate? Legal page wording and the Legal Service Disclaimer depend on this; content must not imply representation the firm can't provide. **Provide.**
5. **`/travel-agency-accounting` vs `/industries/travel-agencies`.** Both requested; recommend one canonical (industries page) with the short URL as a 301 or a distinct SEO landing with different intent (accounting-only). **Choose.**
6. **Content ownership.** Real testimonials, team names/photos, credentials, FAQs, legal page text — none will be invented; site ships with placeholders hidden until filled. **Owner + deadline.**
7. **Email domain & sender.** RESOLVED: the domain is `scalevisory.in`, so the sender is `info@scalevisory.in`. Mailbox still unverified; Resend needs DNS records (SPF/DKIM) on `.in`. **Confirm mailbox exists.**
8. **WhatsApp Business API.** Requires Meta Business verification and a BSP; number 9909993565 is used across ventures — using it for API may conflict with the WhatsApp Business app on the same number. **Decide number strategy before V3.**
9. **GA4 "website visitors" in admin.** Recommend linking to GA4 rather than pulling via API (needs OAuth service account + quota). **Confirm.**
10. **Hosting spend.** Vercel Pro (~$20/mo), Supabase Pro (~$25/mo) for backups/PITR/MFA, Cloudflare free, Resend free tier, Upstash free tier, Sentry free tier. **Approve.**
11. **Multi-venture reuse.** The lead/CMS/RBAC modules could serve ZYNTA/Artha/Book N Fly later — if intended, add `tenant_id` now (cheap) rather than retrofitting. **Decide.**
12. **Data residency & retention.** Leads/PII in Mumbai region; define retention period for lost leads and inquiry data. **Decide.**
13. **Design assets.** Official logo files (SVG/PNG), any brand photography; otherwise abstract visuals will be designed in-house per brief. **Provide.**
14. **Blog migration.** Existing `posts` table → new `posts` + categories with slugs under `/resources/*`; redirects from `/blog/*` maintained. Low risk, noted.

---
*Approval of §1–16 plus answers to §17 items 1–7 is enough to start Phase 1.*
