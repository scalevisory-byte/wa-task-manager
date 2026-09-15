import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { industries, industryHref } from "@/lib/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Accounting, taxation and consultancy for travel agencies, trading, retail, service businesses, startups, SMEs and professional practices — Scale Visory, Surat.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <Shell>
      <PageHero
        title="Industries"
        lead="The four core services apply to any business; the emphasis changes by sector. These are the industries we work in most, and what is specific to each."
      />
      <Breadcrumbs trail={[{ href: "/industries", label: "Industries" }]} />

      <section className="section">
        <div className="wrap ledger">
          {industries.map((i) => (
            <article key={i.slug} className="grid gap-3 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-4">
                <h2 className="text-2xl">
                  <Link href={industryHref(i)} className="no-underline hover:text-sky">{i.name}</Link>
                </h2>
                <p className="mt-2 text-muted">{i.short}</p>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm font-semibold text-navy">What we see in this sector</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-muted">
                  {i.challenges.slice(0, 3).map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="md:col-span-2 md:text-right">
                <Link href={industryHref(i)} className="btn-ghost !py-2">Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Your sector not listed?"
        body="Tell us what the business does. We will say plainly whether we have done that work before and what would be specific to it."
        whatsappText="Hi Scale Visory, I'd like to know if you work with businesses in my sector."
      />
    </Shell>
  );
}
