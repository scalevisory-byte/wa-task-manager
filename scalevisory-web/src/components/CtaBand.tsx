import Link from "next/link";
import { whatsappLink } from "@/lib/content/site";

/** Closing call-to-action used at the foot of content pages. */
export default function CtaBand({
  heading,
  body,
  whatsappText,
}: {
  heading: string;
  body: string;
  whatsappText: string;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="wrap grid gap-6 py-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <h2 className="text-white">{heading}</h2>
          <p className="mt-3 max-w-2xl text-white/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <Link href="/contact" className="btn-sky">Book a consultation</Link>
          <a href={whatsappLink(whatsappText)} className="btn-light">WhatsApp us</a>
        </div>
      </div>
    </section>
  );
}
