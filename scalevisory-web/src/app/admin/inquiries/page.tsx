import { createClient } from "@/lib/supabase/server";
import { markInquiryRead } from "@/actions/auth";
import { ActionButton } from "@/components/admin/RowActions";
import type { Inquiry } from "@/lib/types";
import { fmtDate } from "@/lib/format";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const KIND: Record<Inquiry["kind"], string> = { general: "Contact", service: "Service", training: "Training" };

export default async function AdminInquiries() {
  const supabase = createClient();
  const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(200);
  const items = (data ?? []) as Inquiry[];
  return (
    <div>
      <h1 className="text-3xl">Inquiries</h1>
      <div className="mt-6 grid gap-3">
        {items.map((i) => (
          <div key={i.id} className={`rounded-lg border p-5 ${i.is_read ? "border-line bg-white" : "border-sky bg-sky-soft/40"}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="rounded bg-navy-soft px-2 py-0.5 text-xs font-semibold text-navy">{KIND[i.kind]}</span>
                {i.subject && <span className="ml-2 text-sm text-muted">{i.subject}</span>}
              </div>
              <span className="text-xs text-muted">{fmtDate(i.created_at)}</span>
            </div>
            <p className="mt-2 font-display font-semibold text-navy">{i.name}{i.company ? <span className="font-body font-normal text-muted"> · {i.company}</span> : null}</p>
            <p className="text-sm">{i.phone}{i.email ? ` · ${i.email}` : ""}</p>
            {i.message && <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink">{i.message}</p>}
            <div className="mt-3 flex gap-4 text-sm">
              <a href={`https://wa.me/91${i.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noreferrer" className="font-medium text-navy">WhatsApp</a>
              <a href={`tel:${i.phone}`} className="font-medium text-navy">Call</a>
              <ActionButton label={i.is_read ? "Mark unread" : "Mark read"} onClick={async () => { "use server"; await markInquiryRead(i.id, !i.is_read); revalidatePath("/admin/inquiries"); }} />
            </div>
          </div>
        ))}
        {!items.length && <p className="text-muted">No inquiries yet.</p>}
      </div>
    </div>
  );
}
