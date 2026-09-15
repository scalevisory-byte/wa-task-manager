import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import InquiryForm from "@/components/InquiryForm";
import { routedIndustries, getIndustry } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { whatsappLink } from "@/lib/content/site";

export function generateStaticParams() {
  return routedIndustries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = getIndustry(params.slug);
  if (!i || i.href) return {};
  return {
    title: `${i.name} — Accounting & Advisory`,
    description: i.short,
    alternates: { canonical: `/industries/${i.slug}` },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const i = getIndustry(params.slug);
  // Industries with a canonical page elsewhere (travel) are redirected in next.config.
  if (!i || i.href) notFound();

  return (
    <Shell>
      <PageHero title={i.name} lead={i.intro}>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn-sky">Book a consultation</Link>
          <a href={whatsappLink(`Hi Scale Visory, I run a business in ${i.name}.`)} className="btn-light">
            WhatsApp us
          </a>
        </div>
      </PageHero>
      <Breadcrumbs
        trail={[
          { href: "/industries", label: "Industries" },
          { href: `/industries/${i.slug}`, label: i.name },
        ]}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl">What goes wrong in this sector</h2>
            <ul className="ledger mt-4">
              {i.challenges.map((c) => <li key={c} className="!py-3.5">{c}</li>)}
            </ul>

            <h2 className="mt-12 text-2xl">What we do about it</h2>
            <ul className="mt-4 space-y-3">
              {i.weDo.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky" />
                  {w}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">Services that apply</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {i.services.map((slug) => {
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
              <h3 className="text-lg">Talk to us about {i.name.toLowerCase()}</h3>
              <p className="mb-5 mt-1 text-sm text-muted">Tell us the size and shape of the business — we will come back with what applies.</p>
              <InquiryForm kind="service" subject={i.name} compact buttonLabel="Request a callback" />
            </div>
          </aside>
        </div>
      </section>
    </Shell>
  );
}
