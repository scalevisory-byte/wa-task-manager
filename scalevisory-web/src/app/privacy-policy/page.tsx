import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/content/policies";

const policy = getPolicy("privacy-policy")!;

export const metadata: Metadata = {
  title: policy.title,
  description: policy.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PolicyPage slug="privacy-policy" />;
}
