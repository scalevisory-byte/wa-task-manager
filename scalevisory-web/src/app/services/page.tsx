import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Accounting, taxation, legal and business consultancy services from Scale Visory, Surat — bookkeeping, GST and income tax, ROC and licence filings, and consultancy for owner-run businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Shell>
      <PageHero
        title="Services"
        lead="Four services that cover a business's finance, compliance and management function. Each one explained plainly — what is included, what it changes, who it is for."
      />
      <Breadcrumbs trail={[{ href: "/services", label: "Services" }]} />

      <section className="section">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.slug} className="flex flex-col rounded-lg border border-line bg-white p-7">
              <span className="font-display text-sm font-bold text-sky">0{i + 1}</span>
              <h2 className="mt-2 text-2xl">
                <Link href={`/services/${s.slug}`} className="no-underline hover:text-sky">{s.name}</Link>
              </h2>
              <p className="mt-3 text-muted">{s.short}</p>
              <ul className="mt-5 grid gap-1.5 text-sm text-ink">
                {s.sections.map((sec) => (
                  <li key={sec.id} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                    <Link href={`/services/${s.slug}#${sec.id}`} className="no-underline hover:text-sky">
                      {sec.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-1">
                <Link href={`/services/${s.slug}`} className="btn-ghost !py-2">Full details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Not sure which one you need?"
        body="Most businesses start with accounting and taxation, then add consultancy once the numbers are current. A 20-minute call is usually enough to tell."
        whatsappText="Hi Scale Visory, I'd like help working out which services I need."
      />
    </Shell>
  );
}
