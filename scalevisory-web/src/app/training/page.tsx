import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Training Institute — Practical Accounts & Taxation Courses, Surat",
  description: "Job-ready accounting and taxation training in Surat: Tally Prime, GST, TDS, income tax and real client work, taught by practising professionals at Scale Visory.",
};

const courses = [
  { name: "Practical Accounting with Tally Prime", duration: "6 weeks", level: "Beginner", covers: "Vouchers, ledgers, inventory, bank reconciliation, GST-enabled billing, month-end close on real client-style data." },
  { name: "GST — Registration to Returns", duration: "4 weeks", level: "Beginner to working", covers: "Registration, invoicing rules, GSTR-1 / 3B / 9, 2B reconciliation, ITC, e-way bills, notices." },
  { name: "TDS, TCS & Income Tax Practice", duration: "4 weeks", level: "Intermediate", covers: "TDS sections and rates, 24Q / 26Q, Form 16, ITR-1 to ITR-4, advance tax, TCS on tour packages." },
  { name: "Complete Accounts Executive Program", duration: "12 weeks", level: "Job-ready", covers: "All three courses plus payroll, PF / ESIC, MIS in Excel, client communication and a placement interview round." },
];

export default function TrainingPage() {
  return (
    <Shell>
      <PageHero title="Training institute" lead="Accounts and taxation the way it's actually done in a firm — on real files, real deadlines, taught by the people who file them. In Surat, in Gujarati and Hindi.">
        <a href={whatsappLink("Hi, I want details about the accounts training courses.")} className="btn-sky">Ask about the next batch</a>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <h2>Courses</h2>
          <div className="ledger mt-8">
            {courses.map((c) => (
              <div key={c.name} className="grid gap-3 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4">
                  <h3 className="text-xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.duration} · {c.level}</p>
                </div>
                <p className="text-muted md:col-span-8">{c.covers}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Programme highlights</h2>
            <ul className="ledger mt-4">
              <li>Taught inside a working accounting firm, not a classroom-only institute</li>
              <li>Small batches — 8 to 12 students — with a laptop each</li>
              <li>Real client-style data and live GST portal practice</li>
              <li>Weekend and evening batches for working staff</li>
              <li>Certificate of completion from Scale Visory</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Who joins, and what they get</h2>
            <ul className="ledger mt-4">
              <li><strong>Freshers (B.Com / M.Com / CA-Inter)</strong> — job-ready skills and a placement interview through our own recruitment network</li>
              <li><strong>Working accountants</strong> — fill the GST / TDS gaps that keep you from a promotion</li>
              <li><strong>Business owners & their staff</strong> — understand your own books well enough to catch mistakes</li>
              <li><strong>Travel-agency teams</strong> — sector-specific module on TCS, commission GST and agent ledgers</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2>Register your interest</h2>
            <p className="mt-3 text-muted">Tell us which course and whether you prefer a weekday or weekend batch. We'll send fees, dates and a syllabus on WhatsApp.</p>
          </div>
          <div className="md:col-span-7">
            <InquiryForm kind="training" subjectOptions={courses.map((c) => c.name)} askCompany={false} buttonLabel="Send registration interest" />
          </div>
        </div>
      </section>
    </Shell>
  );
}
