import Link from "next/link";
import Shell from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <section className="section">
        <div className="wrap max-w-prose">
          <h1>Page not found</h1>
          <p className="mt-4 text-muted">The link may be old, or the article may have been removed.</p>
          <Link href="/" className="btn-primary mt-6">Back to home</Link>
        </div>
      </section>
    </Shell>
  );
}
