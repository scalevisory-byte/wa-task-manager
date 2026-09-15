import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Inquiry } from "@/lib/types";
import { fmtDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const KIND: Record<Inquiry["kind"], string> = { general: "Contact", service: "Service", training: "Training" };

export default async function AdminHome() {
  const supabase = createClient();
  const [{ count: unread }, { count: published }, { count: drafts }, { data: recent }] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("is_published", false),
    supabase.from("inquiries").select("id,kind,name,phone,subject,is_read,created_at").order("created_at", { ascending: false }).limit(8),
  ]);
  const items = (recent ?? []) as Inquiry[];

  return (
    <div>
      <h1 className="text-3xl">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Unread inquiries", unread ?? 0, "/admin/inquiries"],
          ["Published posts", published ?? 0, "/admin/posts"],
          ["Draft posts", drafts ?? 0, "/admin/posts"],
        ].map(([l, n, h]) => (
          <Link key={String(l)} href={String(h)} className="rounded-lg border border-line bg-white p-5 no-underline">
            <p className="text-sm text-muted">{l}</p>
            <p className="font-display text-3xl font-bold text-navy">{n}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-xl">Recent inquiries</h2>
      <div className="mt-3 overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead className="bg-paper text-left text-muted"><tr><th className="p-3">Name</th><th className="p-3">Type</th><th className="p-3">Subject</th><th className="p-3">Phone</th><th className="p-3">Date</th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className={`border-t border-line ${i.is_read ? "" : "font-medium"}`}>
                <td className="p-3"><Link href="/admin/inquiries" className="text-navy">{i.name}</Link></td>
                <td className="p-3">{KIND[i.kind]}</td>
                <td className="p-3 text-muted">{i.subject ?? "—"}</td>
                <td className="p-3">{i.phone}</td>
                <td className="p-3 text-muted">{fmtDate(i.created_at)}</td>
              </tr>
            ))}
            {!items.length && <tr><td className="p-4 text-muted" colSpan={5}>No inquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
