import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { consultancyPages, getConsultancyPage } from "@/lib/content/consultancy";
import { site, whatsappLink } from "@/lib/content/site";

export function generateStaticParams() {
  return consultancyPages.map((p) => ({ sub: p.slug }));
}

export function generateMetadata({ params }: { params: { sub: string } }): Metadata {
  const p = getConsultancyPage(params.sub);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/services/business-consultancy/${p.slug}` },
  };
}

export default function ConsultancySubPage({ params }: { params: { sub: string } }) {
  const p = getConsultancyPage(params.sub);
  if (!p) notFound();

  const others = consultancyPages.filter((o) => o.slug !== p.slug);

  return (
    <Shell>
      <PageHero title={p.title} lead={p.lead}>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-sky">Book a consultation</Link>
          <a href={whatsappLink(`Hi Scale Visory, I'd like to know more about ${p.name}.`)} className="btn-light">
            WhatsApp us
          </a>
        </div>
      </PageHero>
      <Breadcrumbs
        trail={[
          { href: "/services", label: "Services" },
          { href: "/services/business-consultancy", label: "Business Consultancy" },
          { href: `/services/business-consultancy/${p.slug}`, label: p.name },
        ]}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {p.blocks.map((b) => (
              <div key={b.title} className="mb-12 last:mb-0">
                <h2 className="text-2xl">{b.title}</h2>
                <p className="mt-3 leading-8 text-muted">{b.body}</p>
                {b.items && (
                  <ul className="ledger mt-4">
                    {b.items.map((item) => (
                      <li key={item} className="!py-3.5">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-2xl">Also under Business Consultancy</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/services/business-consultancy/${o.slug}`}
                    className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
                  >
                    <h3 className="text-lg">{o.name}</h3>
                    <p className="mt-2 text-sm text-muted">{o.lead.split(".")[0]}.</p>
                  </Link>
                ))}
                <Link
                  href="/services/business-consultancy"
                  className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
                >
                  <h3 className="text-lg">All of Business Consultancy</h3>
                  <p className="mt-2 text-sm text-muted">Health check, profit, cash flow, strategy, sales, operations, management and business internal audit.</p>
                </Link>
              </div>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-lg border border-line bg-white p-6 md:sticky md:top-24">
              <h3 className="text-lg">{p.cta.heading}</h3>
              <p className="mb-5 mt-1 text-sm text-muted">{p.cta.body}</p>
              <InquiryForm kind="service" subject={p.cta.subject} compact buttonLabel="Request a callback" />
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: p.title,
          description: p.description,
          provider: { "@type": "AccountingService", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          url: `${site.url}/services/business-consultancy/${p.slug}`,
          isPartOf: { "@type": "Service", name: "Business Consultancy", url: `${site.url}/services/business-consultancy` },
        }}
      />
    </Shell>
  );
}
