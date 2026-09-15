import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", params.id).single();
  if (!data) notFound();
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl">Edit post</h1>
      <div className="mt-6 rounded-lg border border-line bg-white p-6"><PostForm post={data as Post} /></div>
    </div>
  );
}
