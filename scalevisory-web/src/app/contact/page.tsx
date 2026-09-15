import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { site, whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Scale Visory — ${site.address}. Call ${site.phone} or send an inquiry.`,
};

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  return (
    <Shell>
      <PageHero title="Contact" lead="Call, WhatsApp, or send a note — we reply on working days within a few hours." />
      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <ul className="ledger">
              <li>
                <p className="text-sm text-muted">Phone / WhatsApp</p>
                <a href={`tel:${site.phoneRaw}`} className="font-display text-xl font-semibold text-navy no-underline">{site.phone}</a>
                <div className="mt-3"><a href={whatsappLink("Hi Scale Visory")} className="btn-sky !py-2">Open WhatsApp</a></div>
              </li>
              <li>
                <p className="text-sm text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="font-semibold text-navy">{site.email}</a>
              </li>
              <li>
                <p className="text-sm text-muted">Office</p>
                <p className="font-medium">{site.address}</p>
              </li>
              <li>
                <p className="text-sm text-muted">Business hours</p>
                {site.hours.map((h) => <p key={h.days}><span className="font-medium">{h.days}</span> — {h.time}</p>)}
              </li>
            </ul>
          </div>
          <div className="md:col-span-7">
            <h2 className="text-2xl">Send an inquiry</h2>
            <div className="mt-5"><InquiryForm kind="general" /></div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <iframe title="Scale Visory office on Google Maps" src={mapSrc} className="h-[380px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </Shell>
  );
}
