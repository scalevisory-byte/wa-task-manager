import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import InquiryForm from "@/components/InquiryForm";
import JsonLd from "@/components/JsonLd";
import { getIndustry } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { site, whatsappLink } from "@/lib/content/site";

/**
 * Canonical page for the travel sector (decision #6).
 * /industries/travel-agencies 301s here — see next.config.mjs.
 */
export const metadata: Metadata = {
  title: "Travel Agency Accounting in Surat — GST, TCS & Supplier Ledgers",
  description:
    "Accounting and taxation for travel agencies and tour operators in Surat and across Gujarat — TCS on overseas packages, GST on commission, supplier ledger reconciliation and booking-level margin reporting.",
  alternates: { canonical: "/travel-agency-accounting" },
};

const faqs = [
  {
    q: "How is TCS on overseas tour packages handled?",
    a: "TCS is collected from the traveller at the applicable rate on overseas tour package payments, deposited by the due date, reported in the quarterly 27EQ return, and the certificate issued to the customer. We compute it per booking, track the deposit calendar and file the return, so the collection and the reporting match.",
  },
  {
    q: "Is GST charged on the full package value or on commission?",
    a: "It depends on whether you are acting as a principal selling a package or as an agent earning commission, and the treatment differs again for air ticketing. We set the treatment per booking type at the start of the engagement so entries are booked consistently rather than corrected at return-filing time.",
  },
  {
    q: "Why do supplier ledgers never tie out in a travel business?",
    a: "Because bookings, amendments, cancellations and refunds each hit the ledger at different times, and credit notes from consolidators often arrive after the period closes. We reconcile supplier, airline and consolidator ledgers on a monthly cycle and get balances confirmed from the other side rather than assuming them.",
  },
  {
    q: "Customer advances sit with us for months. How should they be recorded?",
    a: "Advance receipts against future travel are not revenue until the service is delivered. Treating them as income overstates profit and distorts the tax position. We record them as advances and recognise revenue on departure or delivery, which also makes the real cash position visible.",
  },
  {
    q: "Do you work with agencies outside Surat?",
    a: "Yes. We work with travel businesses across Gujarat, and the work is done on your existing system — Tally Prime, Zoho Books or Busy — so location is not a constraint.",
  },
];

export default function TravelAgencyAccountingPage() {
  const industry = getIndustry("travel-agencies")!;

  return (
    <Shell>
      <PageHero
        title="Travel agency accounting, done by people who know the sector"
        lead="TCS on overseas packages, GST on commission versus gross, supplier ledgers that drift, advances booked as revenue too early. Travel accounting goes wrong in a specific set of ways — and each one is avoidable."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-sky">Book a consultation</Link>
          <a
            href={whatsappLink("Hi Scale Visory, I run a travel agency and need help with accounting and GST/TCS.")}
            className="btn-light"
          >
            WhatsApp us
          </a>
        </div>
      </PageHero>
      <Breadcrumbs
        trail={[
          { href: "/industries", label: "Industries" },
          { href: "/travel-agency-accounting", label: "Travel Agency Accounting" },
        ]}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl">Why travel accounting is different</h2>
            <p className="mt-3 leading-8 text-muted">{industry.intro}</p>

            <h2 className="mt-12 text-2xl">Where it goes wrong</h2>
            <ul className="ledger mt-4">
              {industry.challenges.map((c) => <li key={c} className="!py-3.5">{c}</li>)}
            </ul>

            <h2 className="mt-12 text-2xl">What we do</h2>
            <ul className="mt-4 space-y-3">
              {industry.weDo.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky" />
                  {w}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">Common questions</h2>
            <div className="ledger mt-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg">{f.q}</h3>
                  <p className="mt-2 leading-7 text-muted">{f.a}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-2xl">Services that apply</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {industry.services.map((slug) => {
                const s = getService(slug);
                if (!s) return null;
                return (
                  <Link
                    key={slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg border border-line bg-white p-5 no-underline transition-colors hover:border-sky"
                  >
                    <h3 className="text-lg">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted">{s.short}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-lg border border-line bg-white p-6 md:sticky md:top-24">
              <h3 className="text-lg">Talk to us about your agency</h3>
              <p className="mb-5 mt-1 text-sm text-muted">
                Tell us roughly how many bookings a month and which systems you use. We will come back with what needs fixing first.
              </p>
              <InquiryForm
                kind="service"
                subject="Travel agency accounting"
                compact
                buttonLabel="Request a callback"
              />
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Travel Agency Accounting",
          description: metadata.description,
          provider: { "@type": "AccountingService", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Gujarat, India" },
          audience: { "@type": "BusinessAudience", name: "Travel agencies and tour operators" },
          url: `${site.url}/travel-agency-accounting`,
        }}
      />
    </Shell>
  );
}
