"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitInquiry, type InquiryResult } from "@/actions/inquiries";
import type { InquiryKind } from "@/lib/types";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return <button className="btn-primary w-full sm:w-auto" disabled={pending}>{pending ? "Sending…" : label}</button>;
}

export default function InquiryForm({
  kind = "general",
  subject,
  subjectOptions,
  buttonLabel = "Send inquiry",
  askCompany = true,
  compact = false,
}: {
  kind?: InquiryKind;
  subject?: string;
  subjectOptions?: string[];
  buttonLabel?: string;
  askCompany?: boolean;
  compact?: boolean;
}) {
  const [state, action] = useFormState<InquiryResult | null, FormData>(submitInquiry, null);

  if (state?.ok) {
    return (
      <div className="rounded-md border border-sky bg-sky-soft p-5">
        <p className="font-display font-semibold text-navy">Inquiry sent.</p>
        <p className="mt-1 text-sm text-ink">We reply on working days within a few hours. For anything urgent, call or WhatsApp +91 99099 93565.</p>
      </div>
    );
  }

  return (
    <form action={action} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <input type="hidden" name="kind" value={kind} />
      {subject && !subjectOptions && <input type="hidden" name="subject" value={subject} />}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label className="label" htmlFor={`${kind}-name`}>Your name</label>
        <input id={`${kind}-name`} name="name" required className="field" />
      </div>
      <div>
        <label className="label" htmlFor={`${kind}-phone`}>Mobile number</label>
        <input id={`${kind}-phone`} name="phone" required inputMode="tel" placeholder="10-digit number" className="field" />
      </div>
      <div>
        <label className="label" htmlFor={`${kind}-email`}>Email <span className="text-muted">(optional)</span></label>
        <input id={`${kind}-email`} name="email" type="email" className="field" />
      </div>
      {askCompany && (
        <div>
          <label className="label" htmlFor={`${kind}-company`}>Business name <span className="text-muted">(optional)</span></label>
          <input id={`${kind}-company`} name="company" className="field" />
        </div>
      )}
      {subjectOptions && (
        <div className={compact ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor={`${kind}-subject`}>What do you need help with?</label>
          <select id={`${kind}-subject`} name="subject" className="field" defaultValue={subject ?? subjectOptions[0]}>
            {subjectOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      )}
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className="label" htmlFor={`${kind}-message`}>Message</label>
        <textarea id={`${kind}-message`} name="message" rows={4} className="field" placeholder="Tell us briefly about your business and what you need." />
      </div>
      {state?.error && <p className="text-sm text-red-700 sm:col-span-2">{state.error}</p>}
      <div className={compact ? "" : "sm:col-span-2"}>
        <Submit label={buttonLabel} />
      </div>
    </form>
  );
}
