import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/format";
import {
  resourceCategories,
  getCategoryBySlug,
  storedNamesForSlug,
  postHref,
} from "@/lib/content/resources";

export function generateStaticParams() {
  return resourceCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const c = getCategoryBySlug(params.category);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/resources/${c.slug}` },
  };
}

export const revalidate = 600;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const c = getCategoryBySlug(params.category);
  if (!c) notFound();

  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug,title,excerpt,category,published_at")
    .eq("is_published", true)
    .in("category", storedNamesForSlug(c.slug))
    .order("published_at", { ascending: false });

  return (
    <Shell>
      <PageHero title={c.title} lead={c.lead} />
      <Breadcrumbs
        trail={[
          { href: "/resources", label: "Resources" },
          { href: `/resources/${c.slug}`, label: c.title },
        ]}
      />

      <section className="section">
        <div className="wrap">
          {!posts?.length ? (
            <div className="rounded-lg border border-line bg-white p-8">
              <p className="text-muted">
                Nothing published under {c.title} yet. Browse the{" "}
                <Link href="/resources" className="font-semibold text-navy">other categories</Link>, or ask us the
                question directly — we answer on WhatsApp during working hours.
              </p>
            </div>
          ) : (
            <div className="ledger">
              {posts.map((p) => (
                <article key={p.slug} className="grid gap-2 md:grid-cols-12 md:gap-8">
                  <p className="text-sm text-muted md:col-span-3">{fmtDate(p.published_at)}</p>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl">
                      <Link href={postHref(p.category, p.slug)} className="no-underline hover:text-sky">
                        {p.title}
                      </Link>
                    </h2>
                    {p.excerpt && <p className="mt-2 text-muted">{p.excerpt}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}

          <nav aria-label="Other categories" className="mt-16 border-t border-line pt-8">
            <p className="font-display text-sm font-semibold text-navy">Other categories</p>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {resourceCategories
                .filter((o) => o.slug !== c.slug)
                .map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/resources/${o.slug}`}
                      className="inline-block rounded-md border border-line bg-white px-3.5 py-2 text-sm text-navy no-underline hover:border-sky"
                    >
                      {o.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </Shell>
  );
}
