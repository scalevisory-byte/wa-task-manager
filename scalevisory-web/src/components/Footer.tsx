import Link from "next/link";
import Logo from "./Logo";
import { legalNav, site, whatsappLink } from "@/lib/content/site";
import { services } from "@/lib/content/services";
import { industries, industryHref } from "@/lib/content/industries";
import { resourceCategories } from "@/lib/content/resources";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-7">
            {site.tagline}. Accounting, taxation, legal and business consultancy for businesses in Surat and across
            Gujarat — {site.years} years of it.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a className="btn-sky !py-2" href={whatsappLink("Hi Scale Visory, I have a query.")}>WhatsApp us</a>
            <a className="btn-light !py-2" href={`tel:${site.phoneRaw}`}>{site.phone}</a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="no-underline hover:text-sky" href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            <li><Link className="no-underline hover:text-sky" href="/training">Training institute</Link></li>
            <li>
              <a className="no-underline hover:text-sky" href="https://artharecovery.in" target="_blank" rel="noopener noreferrer">
                Payment recovery
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Industries</h4>
          <ul className="space-y-2 text-sm">
            {industries.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link className="no-underline hover:text-sky" href={industryHref(i)}>{i.name}</Link>
              </li>
            ))}
            <li><Link className="no-underline hover:text-sky" href="/industries">All industries</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            {resourceCategories.map((c) => (
              <li key={c.slug}>
                <Link className="no-underline hover:text-sky" href={`/resources/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="mb-3 font-display text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="no-underline hover:text-sky" href="/about">About</Link></li>
            <li><Link className="no-underline hover:text-sky" href="/contact">Contact</Link></li>
            <li>
              <a className="no-underline hover:text-sky" href="https://zyntajobs.in" target="_blank" rel="noopener noreferrer">
                Careers
              </a>
            </li>
          </ul>
          <h4 className="mb-3 mt-6 font-display text-sm font-semibold text-white">Office</h4>
          <p className="text-sm leading-6">{site.address}</p>
          <p className="mt-2 text-sm">{site.hours[0].days}<br />{site.hours[0].time}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="no-underline hover:text-sky" href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <span>Surat, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
}
