import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Scale Visory — a Surat-based accounting, taxation and advisory firm with 12+ years of practice. Our background, leadership, values and credentials.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero title="A firm built on balanced books" lead={`${site.years} years of accounting, taxation and audit work for owner-run businesses across Gujarat — from a single office in Vesu, Surat.`} />

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl">Background</h2>
          </div>
          <div className="prose-sv md:col-span-8">
            <p>Scale Visory started as a bookkeeping practice for traders and travel agents in Surat. The businesses grew; so did the questions — GST, TCS on tour packages, PF for the first ten employees, a bank loan that needed a project report. We built the firm around answering those questions properly, in one place.</p>
            <p>Today we handle accounting, taxation, compliance, internal audit, fraud detection, data analysis and business consultancy for clients across Gujarat, plus a training institute that feeds trained accountants back into those same businesses.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl">Leadership & expertise</h2>
          </div>
          <div className="ledger md:col-span-8">
            {[
              ["Accounts & finalisation", "Monthly close, year-end finalisation, MIS and management reporting."],
              ["Taxation", "GST, income tax, TDS / TCS, assessments and notice replies."],
              ["Audit & assurance", "Internal audit, stock audit, fraud detection and control reviews."],
              ["Legal & compliance", "ROC, labour law, licences and agreements."],
              ["Analysis & consultancy", "Costing, pricing, cash-flow planning, project reports and structuring."],
            ].map(([t, d]) => (
              <div key={t}><h3 className="text-lg">{t}</h3><p className="mt-1 text-muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl">Vision & values</h2>
          </div>
          <div className="prose-sv md:col-span-8">
            <p><strong>Balancing the unbalanced.</strong> Every business we meet has something out of balance — a ledger, a cash cycle, a compliance calendar, a decision made on guesswork. Our job is to put it right and keep it right.</p>
            <ul>
              <li><strong>On time, every time.</strong> A due date missed is money lost. We track the calendar so you don't have to.</li>
              <li><strong>Plain language.</strong> You'll get the answer, then the section number — not the other way round.</li>
              <li><strong>Owner's side of the table.</strong> We advise the way we'd run our own business.</li>
              <li><strong>Confidential by default.</strong> Your numbers stay between us.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl">Credentials</h2>
          </div>
          <div className="md:col-span-8">
            <ul className="ledger">
              <li>Qualified accounting, taxation and legal professionals on the team</li>
              <li>GST practitioner and income-tax e-return intermediary registrations</li>
              <li>Tally Prime and Zoho Books certified practice</li>
              <li>{site.years} years of continuous practice; clients across trading, travel, manufacturing and services</li>
            </ul>
            <Link href="/contact" className="btn-primary mt-8">Talk to us</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
