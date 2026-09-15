import Link from "next/link";
import Shell from "@/components/Shell";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/content/services";
import { industries, industryHref } from "@/lib/content/industries";
import { postHref } from "@/lib/content/resources";
import { site, whatsappLink } from "@/lib/content/site";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 600;

export default async function HomePage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug,title,category,published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <Shell>
      {/* Hero — the tagline is the object */}
      <section className="bg-navy text-white">
        <div className="wrap py-20 md:py-28">
          <p className="text-sm font-medium text-sky">Accounting · Taxation · Legal · Business Consultancy — Surat</p>
          <h1 className="mt-4 max-w-4xl text-white">
            Balancing<br />The Unbalanced
          </h1>
          <div className="beam mt-8 h-[3px] w-full max-w-4xl bg-sky" aria-hidden="true" />
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80">
            Books that close on time, taxes filed before the due date, filings that do not slip, and a finance partner
            who tells you what the numbers mean. {site.years} years of exactly that for Gujarat businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-sky">Book a free consultation</Link>
            <a
              href={whatsappLink("Hi Scale Visory, I'd like to discuss my accounting / tax requirements.")}
              className="btn-light"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Ledger-style facts strip */}
      <section className="border-b border-line bg-white">
        <div className="wrap grid gap-6 py-8 sm:grid-cols-3">
          {[
            [`${site.years} years`, "of accounting, tax and audit practice"],
            ["Vesu, Surat", "office — and clients across Gujarat"],
            ["One calendar", "every GST, TDS, ROC and licence date, tracked"],
          ].map(([big, small]) => (
            <div key={big} className="border-l-2 border-sky pl-4">
              <p className="font-display text-2xl font-bold text-navy">{big}</p>
              <p className="text-sm text-muted">{small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Four core services */}
      <section className="section">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2>What we take off your desk</h2>
            <p className="mt-3 text-muted">
              Four services, one team, one WhatsApp number. Take what you need now; the rest is there when you grow.
            </p>
          </div>
          <div className="ledger mt-10">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group grid gap-2 no-underline md:grid-cols-12 md:gap-6">
                <h3 className="md:col-span-3 group-hover:text-sky">{s.name}</h3>
                <p className="text-muted md:col-span-7">{s.short}</p>
                <span className="text-sm font-semibold text-navy md:col-span-2 md:text-right">See details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultancy — the diagnostic is the strongest entry point */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="text-sm font-semibold text-sky">Business Consultancy</p>
            <h2 className="mt-2">Why isn&apos;t your business growing?</h2>
            <p className="mt-4 text-muted">
              Turnover flat while costs rise. Nothing moving when you are away for a week. Margins slipping without a
              clear reason. The cause is usually structural, and it is findable — a review across finance, sales,
              operations and management, ending in a scored health check and a 30/60/90-day action plan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/services/business-consultancy/why-isnt-your-business-growing" className="btn-primary">
                Read the diagnostic
              </Link>
              <Link href="/services/business-consultancy" className="btn-ghost">All of consultancy</Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <ul className="ledger rounded-lg border border-line p-6">
              {[
                "Business Health Check across four blocks",
                "Profit improvement, not just revenue growth",
                "30/60/90-day cash forecast",
                "Monthly review with your department heads",
                "AI & automation on the systems you already run",
              ].map((t) => (
                <li key={t} className="!py-3 text-sm">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2>Sectors we know well</h2>
            <p className="mt-3 text-muted">
              The services are the same; what differs is where the mistakes get made. Travel is the one we are asked
              about most.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link
                  href={industryHref(i)}
                  className="inline-block rounded-md border border-line bg-white px-4 py-2.5 text-sm text-navy no-underline hover:border-sky"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Training + partner programs */}
      <section className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-line p-8">
            <h2>Training institute</h2>
            <p className="mt-3 text-muted">
              Practical accounts and taxation courses taught by working professionals — Tally Prime, GST, TDS, income
              tax and real client files. For freshers, job-seekers and business owners&apos; own staff.
            </p>
            <Link href="/training" className="btn-primary mt-6">See courses</Link>
          </div>
          <div className="rounded-lg bg-navy p-8 text-white">
            <h2 className="text-white">Payment recovery</h2>
            <p className="mt-3 text-white/80">
              Overdue invoices recovered through a documented, escalating process — ledger audit, demand notice,
              negotiation, legal escalation — run by our recovery partner Artha.
            </p>
            <a href="https://artharecovery.in" target="_blank" rel="noopener noreferrer" className="btn-sky mt-6">
              Visit artharecovery.in
            </a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2>Why owners stay with us for years</h2>
          </div>
          <div className="ledger md:col-span-7">
            {[
              ["We work in your system", "Tally, Zoho, Busy or Excel — we don't force a migration to bill you for it."],
              ["Reminders before due dates, not after", "Your compliance calendar lands on WhatsApp a week ahead, every time."],
              ["Owner-level conversations", "You speak to the person who signs off your books, not a call centre."],
              ["Travel & tourism expertise", "TCS on overseas packages, GST on commission, agent ledgers — we know this sector inside out."],
            ].map(([t, d]) => (
              <div key={t}>
                <h3 className="text-lg">{t}</h3>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      {(posts?.length ?? 0) > 0 && (
        <section className="border-t border-line bg-white py-16">
          <div className="wrap">
            <h2 className="text-2xl">Latest from Resources</h2>
            <ul className="ledger mt-4">
              {posts!.map((p) => (
                <li key={p.slug}>
                  <Link href={postHref(p.category, p.slug)} className="font-semibold text-navy no-underline hover:text-sky">
                    {p.title}
                  </Link>
                  <p className="text-sm text-muted">{p.category}</p>
                </li>
              ))}
            </ul>
            <Link href="/resources" className="mt-4 inline-block text-sm font-semibold text-navy">
              All resources
            </Link>
          </div>
        </section>
      )}

      {/* Inquiry */}
      <section className="section" id="inquiry">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2>Tell us where the books stand</h2>
            <p className="mt-3 text-muted">
              A 20-minute call, no charge. We&apos;ll tell you what&apos;s pending, what it costs to fix, and whether
              we&apos;re the right fit.
            </p>
            <p className="mt-6 text-sm text-muted">{site.address}</p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm
              kind="service"
              subjectOptions={[...services.map((s) => s.name), "Training", "Something else"]}
            />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AccountingService",
          name: site.name,
          description: site.description,
          url: site.url,
          telephone: site.phone,
          email: site.email,
          slogan: site.tagline,
          address: {
            "@type": "PostalAddress",
            streetAddress: "G-59, VIP Plaza, VIP Road, Vesu",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            postalCode: "395007",
            addressCountry: "IN",
          },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "10:00",
              closes: "19:00",
            },
          ],
          sameAs: [site.social.instagram, site.social.linkedin],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
            })),
          },
        }}
      />
    </Shell>
  );
}
