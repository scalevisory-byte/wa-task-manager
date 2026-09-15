import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/format";
import { resourceCategories, categorySlug, postHref } from "@/lib/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "GST updates, tax updates, legal updates, articles and business insights from Scale Visory, Surat — written for business owners, not for other accountants.",
  alternates: { canonical: "/resources" },
};
export const revalidate = 600;

export default async function ResourcesPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug,title,excerpt,category,published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(12);

  const counts = new Map<string, number>();
  for (const p of posts ?? []) {
    const s = categorySlug(p.category);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }

  return (
    <Shell>
      <PageHero
        title="Resources"
        lead="Regulation changes, filing deadlines and the lessons that come out of consultancy work — explained in plain language, with what to actually do about them."
      />
      <Breadcrumbs trail={[{ href: "/resources", label: "Resources" }]} />

      <section className="section">
        <div className="wrap">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resourceCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/resources/${c.slug}`}
                className="rounded-lg border border-line bg-white p-6 no-underline transition-colors hover:border-sky"
              >
                <h2 className="text-xl">{c.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{c.lead}</p>
                <p className="mt-4 text-sm font-semibold text-navy">
                  {counts.get(c.slug)
                    ? `${counts.get(c.slug)} recent ${counts.get(c.slug) === 1 ? "post" : "posts"}`
                    : "Coming soon"}
                </p>
              </Link>
            ))}
          </div>

          {(posts?.length ?? 0) > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl">Latest</h2>
              <div className="ledger mt-4">
                {posts!.map((p) => (
                  <article key={p.slug} className="grid gap-2 md:grid-cols-12 md:gap-8">
                    <p className="text-sm text-muted md:col-span-3">
                      {p.category}
                      <br />
                      {fmtDate(p.published_at)}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="text-xl">
                        <Link href={postHref(p.category, p.slug)} className="no-underline hover:text-sky">
                          {p.title}
                        </Link>
                      </h3>
                      {p.excerpt && <p className="mt-2 text-muted">{p.excerpt}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {!posts?.length && (
            <p className="mt-12 text-muted">
              Posts are on the way. In the meantime, call or WhatsApp us with a question and we will answer it directly.
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
