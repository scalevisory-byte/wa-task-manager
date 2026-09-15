/**
 * Policy pages (PLATFORM-PLAN §1, §10 and decision #9 — lost-lead PII purged
 * after 24 months). These describe how this website handles data and the limits
 * of what the firm publishes. Anything that would need a lawyer's sign-off, or a
 * fact we do not have, is marked as a placeholder rather than invented.
 */

export interface Policy {
  slug: string;
  title: string;
  lead: string;
  description: string;
  sections: { heading: string; paragraphs: string[]; items?: string[] }[];
}

const CONTACT_LINE =
  "Questions about this page, or a request relating to your own data, go to info@scalevisory.com or +91 99099 93565.";

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    lead: "What this website collects, why, how long it is kept and how to have it removed.",
    description:
      "How Scale Visory collects, uses, stores and deletes personal information submitted through scalevisory.com.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "We only collect what a form asks for. There is no account creation and no public sign-up on this website.",
        ],
        items: [
          "Enquiry forms: your name, mobile number, and optionally email, business name, the service you asked about and your message",
          "Analytics: anonymised usage data through Google Analytics 4, where you have not blocked it",
          "Chat: if you use the chat widget, the conversation is handled by our chat provider under their terms",
        ],
      },
      {
        heading: "Why we collect it",
        paragraphs: [
          "To reply to your enquiry, to provide the services you engage us for, and to meet the record-keeping obligations that apply to a professional practice.",
          "We do not sell personal information, and we do not share it with third parties for their own marketing.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries that do not become engagements are purged 24 months after last contact.",
          "Records relating to an actual engagement are kept for as long as the applicable tax, company and professional record-keeping rules require, and are then deleted.",
        ],
      },
      {
        heading: "Where it is stored",
        paragraphs: [
          "Website enquiry data is stored in a managed Postgres database hosted in the Mumbai (ap-south-1) region. Access is restricted to authorised Scale Visory staff and protected by row-level security rules in the database itself.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask us what we hold about you, ask for it to be corrected, or ask for it to be deleted where we are not required to retain it.",
          CONTACT_LINE,
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "This site uses cookies set by Google Analytics to understand which pages are read, and by the chat widget if you interact with it. Blocking them in your browser does not affect any part of the site's functionality.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If this policy changes materially, the revised version is published on this page. [PLACEHOLDER — owner to confirm effective date before launch.]",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of use",
    lead: "The terms on which this website is provided.",
    description: "Terms of use for scalevisory.com — scope, accuracy, third-party links and applicable law.",
    sections: [
      {
        heading: "About this site",
        paragraphs: [
          "This website is published by Scale Visory, an accounting, taxation, legal and business consultancy practice based at G-59, VIP Plaza, VIP Road, Vesu, Surat – 395007, Gujarat.",
        ],
      },
      {
        heading: "No engagement by browsing",
        paragraphs: [
          "Reading this site, or sending an enquiry through it, does not create a professional engagement. An engagement begins only when scope and fees are agreed in writing.",
        ],
      },
      {
        heading: "Accuracy",
        paragraphs: [
          "Tax, GST and corporate law in India change frequently. Content here is written as at the date of publication and is not updated retrospectively. Do not rely on any page as current without checking the position for your own facts.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "This site links to other ventures and to external services. We are not responsible for the content, terms or data practices of any site we link to.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The text, structure and design of this site belong to Scale Visory. You are welcome to quote a page with attribution and a link; please do not republish pages in full.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, with jurisdiction at Surat, Gujarat. [PLACEHOLDER — owner to have this page reviewed by the firm's legal team before launch.]",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    lead: "The limits of what is on this website, and what our legal services do and do not include.",
    description:
      "Disclaimer for scalevisory.com — general information only, no professional advice, and the scope of legal services offered.",
    sections: [
      {
        heading: "General information only",
        paragraphs: [
          "Everything published on this website is general information. It is not accounting, taxation, legal or investment advice for your situation, and it does not take account of your facts.",
          "Decisions taken on the basis of a page here, without engaging us or another qualified professional, are taken at your own risk.",
        ],
      },
      {
        heading: "Legal service disclaimer",
        paragraphs: [
          "Scale Visory provides legal advisory and documentation services — incorporation, ROC and corporate filings, agreements, licences, notices and related work.",
          "Representation before courts, tribunals and statutory authorities is not provided directly by the firm. Where a matter requires representation, it is coordinated through empanelled advocates. [PLACEHOLDER — owner to confirm empanelled advocate names and registration details.]",
        ],
      },
      {
        heading: "Payment recovery",
        paragraphs: [
          "Recovery engagements described on the Legal page are carried out by our partner venture Artha at artharecovery.in. Recovery work, its terms and its outcomes are that venture's responsibility.",
        ],
      },
      {
        heading: "No guaranteed outcome",
        paragraphs: [
          "We do not guarantee any particular refund, assessment result, recovery amount, approval or business outcome. Where a page describes what a service does, it describes the work performed, not a promised result.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [CONTACT_LINE],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
