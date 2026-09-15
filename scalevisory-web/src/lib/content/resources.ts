/**
 * Resources (PLATFORM-PLAN §1) — five categories replacing the single /blog feed.
 *
 * `posts.category` stays a text column, so no migration is needed for the site:
 * new posts store one of `name` below, and posts written under the old six-way
 * category list still resolve through LEGACY_CATEGORY_MAP. /blog/* 301s to
 * /resources/* (see next.config.mjs and src/app/blog).
 */

export interface ResourceCategory {
  slug: string;
  /** Value stored in posts.category. */
  name: string;
  title: string;
  lead: string;
  description: string;
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "articles",
    name: "Articles",
    title: "Articles",
    lead: "Longer pieces on how accounting, tax and business decisions actually play out — written for owners, not for other accountants.",
    description:
      "Accounting and business articles from Scale Visory, Surat — practical explanations of how financial decisions affect a growing business.",
  },
  {
    slug: "gst-updates",
    name: "GST Updates",
    title: "GST Updates",
    lead: "Rate changes, return-format revisions, notification summaries and what each one means for a Gujarat business in practice.",
    description:
      "GST updates and notification summaries explained plainly by Scale Visory, Surat — rate changes, return formats, input credit and compliance deadlines.",
  },
  {
    slug: "tax-updates",
    name: "Tax Updates",
    title: "Tax Updates",
    lead: "Income tax, TDS and TCS changes — budget announcements, circulars, due dates and the filing consequences.",
    description:
      "Income tax, TDS and TCS updates from Scale Visory, Surat — budget changes, circulars, due dates and what they mean for businesses and professionals.",
  },
  {
    slug: "legal-updates",
    name: "Legal Updates",
    title: "Legal Updates",
    lead: "ROC and corporate filing changes, licence and registration requirements, and contract points worth knowing before you sign.",
    description:
      "Corporate legal and compliance updates from Scale Visory, Surat — ROC filings, licences, registrations and business documentation requirements.",
  },
  {
    slug: "business-insights",
    name: "Business Insights",
    title: "Business Insights",
    lead: "Notes from consultancy work: what stalls a business, what fixes it, and what the numbers usually reveal first.",
    description:
      "Business consultancy insights from Scale Visory, Surat — profitability, cash flow, systems and growth lessons from working with owner-run businesses.",
  },
];

/** Category values written by the pre-V1 blog editor. */
const LEGACY_CATEGORY_MAP: Record<string, string> = {
  Accounting: "articles",
  GST: "gst-updates",
  "Income Tax": "tax-updates",
  Compliance: "legal-updates",
  Advisory: "business-insights",
  "Travel & Tourism": "articles",
};

export const categoryNames = resourceCategories.map((c) => c.name);

export const getCategoryBySlug = (slug: string) =>
  resourceCategories.find((c) => c.slug === slug);

/** Stored category name → URL slug. Unknown values fall back to Articles. */
export function categorySlug(name: string | null | undefined): string {
  if (!name) return "articles";
  const direct = resourceCategories.find((c) => c.name === name);
  if (direct) return direct.slug;
  return LEGACY_CATEGORY_MAP[name] ?? "articles";
}

/** Every stored category name that maps to this slug — for querying posts. */
export function storedNamesForSlug(slug: string): string[] {
  const names = new Set<string>();
  const cat = getCategoryBySlug(slug);
  if (cat) names.add(cat.name);
  for (const [legacy, mapped] of Object.entries(LEGACY_CATEGORY_MAP)) {
    if (mapped === slug) names.add(legacy);
  }
  return Array.from(names);
}

export const postHref = (category: string | null | undefined, slug: string) =>
  `/resources/${categorySlug(category)}/${slug}`;
