import { notFound } from "next/navigation";
import Shell from "./Shell";
import PageHero from "./PageHero";
import Breadcrumbs from "./Breadcrumbs";
import { getPolicy } from "@/lib/content/policies";

/** Shared renderer for the three policy pages, which are identical in shape. */
export default function PolicyPage({ slug }: { slug: string }) {
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <Shell>
      <PageHero title={p.title} lead={p.lead} />
      <Breadcrumbs trail={[{ href: `/${p.slug}`, label: p.title }]} />
      <section className="section">
        <div className="wrap max-w-prose">
          {p.sections.map((s) => (
            <div key={s.heading} className="mb-10 last:mb-0">
              <h2 className="text-2xl">{s.heading}</h2>
              {s.paragraphs.map((text) => (
                <p key={text} className="mt-3 leading-8 text-ink">{text}</p>
              ))}
              {s.items && (
                <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
