import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { postHref } from "@/lib/content/resources";

/**
 * The blog moved to /resources/<category>/<slug>. The new URL depends on the
 * post's category, so this cannot be a static rule in next.config.mjs — we look
 * the post up and 301 to its canonical location. /blog itself is redirected
 * there. Keep this route: the old URLs are indexed.
 */
export const revalidate = 600;

export default async function LegacyPostRedirect({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("slug,category")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) notFound();
  permanentRedirect(postHref(data.category, data.slug));
}
