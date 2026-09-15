import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/actions/auth";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

const links = [
  ["/admin", "Overview"],
  ["/admin/inquiries", "Inquiries"],
  ["/admin/posts", "Blog posts"],
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <>{children}</>; // login page

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="wrap flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden gap-4 md:flex">
              {links.map(([h, l]) => <Link key={h} href={h} className="text-sm font-medium text-muted no-underline hover:text-navy">{l}</Link>)}
            </nav>
          </div>
          <form action={signOut} className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted sm:inline">{user.email}</span>
            <button className="btn-ghost !py-1.5">Sign out</button>
          </form>
        </div>
        <nav className="wrap flex gap-3 overflow-x-auto pb-2 md:hidden">
          {links.map(([h, l]) => <Link key={h} href={h} className="whitespace-nowrap text-sm font-medium text-navy no-underline">{l}</Link>)}
        </nav>
      </header>
      <main className="wrap py-8">{children}</main>
    </div>
  );
}
