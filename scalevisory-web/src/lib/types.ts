export type InquiryKind = "general" | "service" | "training";

export interface Inquiry {
  id: string;
  kind: InquiryKind;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
