import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Shell from "@/components/Shell";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { fmtDate, renderContent } from "@/lib/format";
import { site } from "@/lib/content/site";
import { getCategoryBySlug, categorySlug, postHref } from "@/lib/content/resources";

export const revalidate = 600;

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const p = await getPost(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt ?? undefined,
    alternates: { canonical: postHref(p.category, p.slug) },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt ?? undefined,
      publishedTime: p.published_at ?? undefined,
      images: p.cover_url ? [p.cover_url] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const p = await getPost(params.slug);
  if (!p) notFound();

  // One post, one URL: if the category in the path is not the post's own,
  // send the reader (and the crawler) to the canonical one.
  const canonicalCategory = categorySlug(p.category);
  if (canonicalCategory !== params.category) permanentRedirect(postHref(p.category, p.slug));

  const category = getCategoryBySlug(canonicalCategory)!;

  return (
    <Shell>
      <Breadcrumbs
        trail={[
          { href: "/resources", label: "Resources" },
          { href: `/resources/${category.slug}`, label: category.title },
          { href: postHref(p.category, p.slug), label: p.title },
        ]}
      />
      <article className="section">
        <div className="wrap max-w-prose">
          <p className="text-sm text-muted">
            <Link href={`/resources/${category.slug}`} className="no-underline hover:text-navy">
              {category.title}
            </Link>{" "}
            · {fmtDate(p.published_at)}
          </p>
          <h1 className="mt-3 text-4xl">{p.title}</h1>
          {p.excerpt && <p className="mt-4 text-lg text-muted">{p.excerpt}</p>}
          {p.cover_url && <img src={p.cover_url} alt="" className="mt-8 w-full rounded-lg" />}
          <div className="prose-sv mt-8" dangerouslySetInnerHTML={{ __html: renderContent(p.content) }} />

          <div className="mt-12 rounded-lg bg-navy p-6 text-white">
            <p className="font-display font-semibold">Need this applied to your business?</p>
            <p className="mt-1 text-sm text-white/80">Book a free 20-minute consultation with Scale Visory.</p>
            <Link href="/contact" className="btn-sky mt-4">Contact us</Link>
          </div>
        </div>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt ?? undefined,
          articleSection: category.title,
          datePublished: p.published_at,
          dateModified: p.updated_at ?? p.published_at,
          image: p.cover_url ?? undefined,
          mainEntityOfPage: `${site.url}${postHref(p.category, p.slug)}`,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
    </Shell>
  );
}
