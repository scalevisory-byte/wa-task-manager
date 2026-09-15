"use server";

import { createAdminClient } from "@/lib/supabase/server";
import type { InquiryKind } from "@/lib/types";

export interface InquiryResult {
  ok: boolean;
  error?: string;
}

const KINDS: InquiryKind[] = ["general", "service", "training"];

export async function submitInquiry(_prev: InquiryResult | null, formData: FormData): Promise<InquiryResult> {
  const kind = String(formData.get("kind") ?? "general") as InquiryKind;
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim() || null;
  const company = String(formData.get("company") ?? "").trim() || null;
  const subject = String(formData.get("subject") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim() || null;
  const honeypot = String(formData.get("website") ?? "");

  if (honeypot) return { ok: true }; // bot — silently accept
  if (!KINDS.includes(kind)) return { ok: false, error: "Invalid form." };
  if (name.length < 2) return { ok: false, error: "Enter your name." };
  if (!/^[0-9+\s-]{10,15}$/.test(phone)) return { ok: false, error: "Enter a valid 10-digit mobile number." };
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Enter a valid email address." };

  const supabase = createAdminClient();
  const { error } = await supabase.from("inquiries").insert({ kind, name, phone, email, company, subject, message });
  if (error) return { ok: false, error: "Could not send right now. Please call or WhatsApp us instead." };
  return { ok: true };
}
