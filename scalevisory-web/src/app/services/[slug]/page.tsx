import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { services, getService } from "@/lib/content/services";
import { consultancyPages } from "@/lib/content/consultancy";
import { industries, industryHref } from "@/lib/content/industries";
import { site, whatsappLink } from "@/lib/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const isConsultancy = s.slug === "business-consultancy";
  const related = industries.filter((i) => i.services.includes(s.slug)).slice(0, 4);

  return (
    <Shell>
      <PageHero title={s.name} lead={s.intro}>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-sky">Book a consultation</Link>
          <a href={whatsappLink(`Hi Scale Visory, I need help with ${s.name}.`)} className="btn-light">
            WhatsApp us
          </a>
        </div>
      </PageHero>
      <Breadcrumbs
        trail={[
          { href: "/services", label: "Services" },
          { href: `/services/${s.slug}`, label: s.name },
        ]}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {/* Section index — these pages are long, so give a way in */}
            <nav aria-label="On this page" className="rounded-lg border border-line bg-white p-5">
              <p className="font-display text-sm font-semibold text-navy">What we cover</p>
              <ul className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
                {s.sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="text-muted no-underline hover:text-sky">{sec.title}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {s.process && (
              <div className="mt-12">
                <h2 className="text-2xl">How it works</h2>
                <ol className="mt-4 grid gap-6 sm:grid-cols-2">
                  {s.process.map((p, i) => (
                    <li key={p.step} className="border-t-2 border-navy pt-3">
                      <span className="font-display text-sm font-bold text-sky">Step {i + 1}</span>
                      <h3 className="mt-1 text-lg">{p.step}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{p.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {s.sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="mt-12 scroll-mt-24">
                <h2 className="text-2xl">{sec.title}</h2>
                <p className="mt-2 text-muted">{sec.summary}</p>
                <ul className="ledger mt-4">
                  {sec.items.map((item) => (
                    <li key={item} className="!py-3.5">{item}</li>
                  ))}
                </ul>
                {sec.id === "recovery" && (
                  <a
                    href="https://artharecovery.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-5"
                  >
                    Start a recovery at artharecovery.in
                  </a>
                )}
              </div>
            ))}

            {isConsultancy && (
              <div className="mt-12">
                <h2 className="text-2xl">Go deeper</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {consultancyPages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/services/business-consultancy/${p.slug}`}
                      className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
                    >
                      <h3 className="text-lg">{p.name}</h3>
                      <p className="mt-2 text-sm text-muted">{p.lead.split(".")[0]}.</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h2 className="mt-12 text-2xl">What changes for you</h2>
            <ul className="mt-4 space-y-3">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">Who it is for</h2>
            <p className="mt-3 text-muted">{s.forWhom}</p>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl">In your industry</h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {related.map((i) => (
                    <li key={i.slug}>
                      <Link
                        href={industryHref(i)}
                        className="inline-block rounded-md border border-line bg-white px-3.5 py-2 text-sm text-navy no-underline hover:border-sky"
                      >
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {s.disclaimer && (
              <div className="mt-12 rounded-lg border-l-4 border-sky bg-white p-6">
                <h3 className="text-base">Legal service disclaimer</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{s.disclaimer}</p>
              </div>
            )}
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-lg border border-line bg-white p-6 md:sticky md:top-24">
              <h3 className="text-lg">Ask about {s.name}</h3>
              <p className="mb-5 mt-1 text-sm text-muted">We reply within working hours, usually the same day.</p>
              <InquiryForm kind="service" subject={s.name} compact buttonLabel="Request a callback" />
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.short,
          serviceType: s.name,
          provider: { "@type": "AccountingService", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          url: `${site.url}/services/${s.slug}`,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.name,
            itemListElement: s.sections.map((sec) => ({
              "@type": "OfferCatalog",
              name: sec.title,
              itemListElement: sec.items.map((item) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: item },
              })),
            })),
          },
        }}
      />
    </Shell>
  );
}
