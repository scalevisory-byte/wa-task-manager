import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { consultancyPages } from "@/lib/content/consultancy";
import { routedIndustries } from "@/lib/content/industries";
import { resourceCategories, postHref } from "@/lib/content/resources";
import { policies } from "@/lib/content/policies";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();

  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug,category,updated_at")
    .eq("is_published", true);

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now
  ) => ({ url: `${base}${path}`, lastModified, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9, "monthly"),
    entry("/industries", 0.8, "monthly"),
    entry("/resources", 0.8, "weekly"),
    entry("/training", 0.7, "monthly"),
    entry("/about", 0.6, "yearly"),
    entry("/contact", 0.7, "yearly"),

    // Priority SEO landing (decision #6)
    entry("/travel-agency-accounting", 0.9, "monthly"),

    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...consultancyPages.map((p) => entry(`/services/business-consultancy/${p.slug}`, 0.8)),
    ...routedIndustries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    ...resourceCategories.map((c) => entry(`/resources/${c.slug}`, 0.7, "weekly")),
    ...(posts ?? []).map((p) =>
      entry(postHref(p.category, p.slug), 0.6, "monthly", new Date(p.updated_at))
    ),
    ...policies.map((p) => entry(`/${p.slug}`, 0.3, "yearly")),
  ];
}
