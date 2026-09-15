import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/content/policies";

const policy = getPolicy("terms")!;

export const metadata: Metadata = {
  title: policy.title,
  description: policy.description,
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <PolicyPage slug="terms" />;
}
