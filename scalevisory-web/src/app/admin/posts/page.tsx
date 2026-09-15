import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/actions/posts";
import { ConfirmButton } from "@/components/admin/RowActions";
import type { Post } from "@/lib/types";
import { postHref } from "@/lib/content/resources";
import { fmtDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminPosts() {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("id,slug,title,category,is_published,published_at,updated_at").order("updated_at", { ascending: false });
  const posts = (data ?? []) as Post[];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Blog posts</h1>
        <Link href="/admin/posts/new" className="btn-primary">New post</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-muted"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Status</th><th className="p-3">Updated</th><th className="p-3"></th></tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="p-3"><Link href={`/admin/posts/${p.id}`} className="font-medium text-navy">{p.title}</Link><br /><span className="text-xs text-muted">{postHref(p.category, p.slug)}</span></td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.is_published ? <span className="text-green-700">Published</span> : <span className="text-muted">Draft</span>}</td>
                <td className="p-3 text-muted">{fmtDate(p.updated_at)}</td>
                <td className="flex gap-3 p-3">
                  {p.is_published && <Link href={postHref(p.category, p.slug)} target="_blank" className="text-sm font-medium text-navy">View</Link>}
                  <ConfirmButton label="Delete" message={`Delete "${p.title}"?`} onConfirm={async () => { "use server"; await deletePost(p.id); }} />
                </td>
              </tr>
            ))}
            {!posts.length && <tr><td className="p-4 text-muted" colSpan={5}>No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
