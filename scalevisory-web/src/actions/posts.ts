"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { resourceCategories, postHref } from "@/lib/content/resources";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

export async function savePost(id: string | null, _prev: { error?: string } | null, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugIn = String(formData.get("slug") ?? "").trim();
  const post = {
    title,
    slug: slugify(slugIn || title),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim(),
    category: String(formData.get("category") ?? "Accounting").trim(),
    cover_url: String(formData.get("cover_url") ?? "").trim() || null,
    is_published: formData.get("is_published") === "on",
  };
  if (!post.title || !post.content) return { error: "Title and content are required." };

  const supabase = createClient();
  const patch: Record<string, unknown> = { ...post };
  if (post.is_published) patch.published_at = new Date().toISOString();

  const q = id ? supabase.from("posts").update(patch).eq("id", id) : supabase.from("posts").insert(patch);
  const { error } = await q;
  if (error) return { error: error.code === "23505" ? "That slug is already used — change it." : error.message };
  revalidatePost(post.category, post.slug);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePost(null, null);
}

/**
 * Refresh every cached surface a post appears on. The category can change on an
 * edit and we do not have the previous value here, so all category feeds are
 * revalidated rather than just the current one.
 */
function revalidatePost(category: string | null, slug: string | null) {
  revalidatePath("/");
  revalidatePath("/resources");
  for (const c of resourceCategories) revalidatePath(`/resources/${c.slug}`);
  if (category && slug) {
    revalidatePath(postHref(category, slug));
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath("/admin/posts");
}
