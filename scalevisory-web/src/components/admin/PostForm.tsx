"use client";

import { useFormState, useFormStatus } from "react-dom";
import { savePost } from "@/actions/posts";
import type { Post } from "@/lib/types";
import { categoryNames } from "@/lib/content/resources";

const categories = categoryNames;

function Submit() {
  const { pending } = useFormStatus();
  return <button className="btn-primary" disabled={pending}>{pending ? "Saving…" : "Save post"}</button>;
}

export default function PostForm({ post }: { post?: Post }) {
  const [state, formAction] = useFormState(savePost.bind(null, post?.id ?? null), null);
  return (
    <form action={formAction} className="grid gap-4">
      <div><label className="label">Title</label><input name="title" required defaultValue={post?.title} className="field" /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div><label className="label">Slug (URL)</label><input name="slug" defaultValue={post?.slug} placeholder="auto from title" className="field" /></div>
        <div>
          <label className="label">Category</label>
          <select name="category" defaultValue={post?.category ?? categories[0]} className="field">{categories.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
      </div>
      <div><label className="label">Excerpt (shown in list & Google)</label><input name="excerpt" defaultValue={post?.excerpt ?? ""} className="field" maxLength={200} /></div>
      <div><label className="label">Cover image URL (optional)</label><input name="cover_url" defaultValue={post?.cover_url ?? ""} className="field" placeholder="https://…" /></div>
      <div>
        <label className="label">Content</label>
        <textarea name="content" required rows={18} defaultValue={post?.content} className="field font-mono text-[13px]" />
        <p className="mt-1 text-xs text-muted">Blank line = new paragraph. Start a line with ## for a heading, - for a bullet, **text** for bold.</p>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_published" defaultChecked={post?.is_published ?? false} /> Published</label>
      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}
      <div><Submit /></div>
    </form>
  );
}
