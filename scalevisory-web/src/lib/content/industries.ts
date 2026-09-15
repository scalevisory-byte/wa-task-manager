/**
 * Industries (PLATFORM-PLAN §1).
 *
 * Travel agencies are the priority industry. Per decision #6 the canonical page
 * is the SEO landing at /travel-agency-accounting; /industries/travel-agencies
 * 301s to it (next.config.mjs), so it is listed here with an explicit href.
 */

export interface Industry {
  slug: string;
  name: string;
  short: string;
  intro: string;
  /** Sector-specific issues we see repeatedly — not generic marketing copy. */
  challenges: string[];
  /** What we do about them. */
  weDo: string[];
  /** Core service slugs most relevant to this industry. */
  services: string[];
  /** Set when the canonical URL is not /industries/<slug>. */
  href?: string;
}

export const industries: Industry[] = [
  {
    slug: "travel-agencies",
    href: "/travel-agency-accounting",
    name: "Travel Agencies & Tour Operators",
    short: "TCS on overseas packages, GST on commission, supplier ledgers that never tie out.",
    intro:
      "Travel is one of the few sectors where the accounting is genuinely different: money moves through you that is not your revenue, tax applies on a margin you have to compute, and every booking touches three ledgers. We handle a number of travel businesses and know where the mistakes are made.",
    challenges: [
      "TCS on overseas tour packages — collection, deposit, return and certificate",
      "GST on commission versus on the gross package value",
      "Supplier, airline and consolidator ledgers that drift out of balance",
      "Advance receipts from customers treated as revenue too early",
      "Refunds, cancellations and credit notes recorded inconsistently",
    ],
    weDo: [
      "Booking-level accounting that separates pass-through money from your income",
      "TCS computation, deposit and 27EQ filing on schedule",
      "GST treatment applied correctly per booking type",
      "Supplier ledger reconciliation with confirmation from the other side",
      "Monthly margin reporting by product — domestic, outbound, ticketing, visa",
    ],
    services: ["accounting", "taxation", "business-consultancy"],
  },
  {
    slug: "trading",
    name: "Trading & Distribution",
    short: "Stock, credit and margin — the three things that decide whether a trading business makes money.",
    intro:
      "Trading margins are thin enough that small leaks matter. The accounting has to keep stock, debtors and purchase rates under continuous watch rather than discovering the position at year-end.",
    challenges: [
      "Stock records that do not match physical count",
      "Purchase rate variation across suppliers going unnoticed",
      "Credit extended beyond policy, discovered only when payment stops",
      "Input tax credit mismatches from supplier non-filing",
    ],
    weDo: [
      "Stock audit with valuation and slow-moving analysis",
      "Purchase rate comparison and duplicate bill detection",
      "Debtors ageing with credit-limit flagging",
      "GSTR-2B reconciliation and supplier follow-up",
    ],
    services: ["accounting", "taxation", "business-consultancy"],
  },
  {
    slug: "retail",
    name: "Retail",
    short: "High transaction volume, cash handling and multi-counter or multi-branch control.",
    intro:
      "Retail generates more transactions than any other small business, much of it in cash and across counters or branches. The control question is not whether the books balance but whether every sale reached them.",
    challenges: [
      "Cash sales and counter collections reaching the books late or partially",
      "Branch-wise profitability that nobody can state",
      "Billing software and accounts holding different numbers",
      "Discount and scheme leakage at the counter",
    ],
    weDo: [
      "Surprise cash counts and daily collection reconciliation",
      "Branch-wise P&L and margin reporting",
      "Billing-to-accounts integration so the two agree",
      "Internal control review across counter and cash handling",
    ],
    services: ["accounting", "business-consultancy", "taxation"],
  },
  {
    slug: "services",
    name: "Service Businesses",
    short: "Time, retainers and receivables — revenue you have earned but not yet collected.",
    intro:
      "Service businesses carry their risk in receivables and in unbilled work. The accounting has to make both visible monthly, not annually.",
    challenges: [
      "Work delivered but not billed",
      "Retainer scope creeping beyond what is charged",
      "Long collection cycles against fixed monthly costs",
      "TDS deducted by clients, not reconciled against 26AS",
    ],
    weDo: [
      "Unbilled work and WIP tracking",
      "Receivables ageing with structured follow-up",
      "26AS reconciliation and TDS credit recovery",
      "Cash-flow forecasting against the collection cycle",
    ],
    services: ["accounting", "taxation", "business-consultancy"],
  },
  {
    slug: "startups",
    name: "Startups",
    short: "Getting the structure, the registrations and the first-year compliance right the first time.",
    intro:
      "Most startup accounting problems are founding decisions that were cheap to get right and expensive to unwind: the wrong entity form, a cap table recorded informally, registrations taken late.",
    challenges: [
      "Entity structure chosen before the funding plan was clear",
      "Founder and investor arrangements not documented properly",
      "Compliance calendar unknown until a penalty arrives",
      "Burn and runway tracked in a spreadsheet nobody trusts",
    ],
    weDo: [
      "Incorporation and structure advice against the funding plan",
      "First-year compliance calendar set up and run",
      "Monthly MIS with burn, runway and unit economics",
      "Project reports and CMA data when debt funding is raised",
    ],
    services: ["legal", "accounting", "business-consultancy"],
  },
  {
    slug: "smes",
    name: "SMEs & Family Businesses",
    short: "Businesses that have outgrown informal management but not yet built systems.",
    intro:
      "The common pattern: turnover has grown several times over, but the way decisions are made and recorded has not changed since the business was a third of its size. That is a systems problem, and it is fixable.",
    challenges: [
      "Every decision routed through the owner",
      "No management numbers between the bank balance and the year-end accounts",
      "Next generation entering without defined roles",
      "Processes that exist only in long-serving staff members' heads",
    ],
    weDo: [
      "Business Health Check across finance, sales, operations and management",
      "KPI and review-meeting structure by department",
      "SOP development and staff training",
      "Succession and next-generation transition planning",
    ],
    services: ["business-consultancy", "accounting", "legal"],
  },
  {
    slug: "professionals",
    name: "Professional Practices",
    short: "Doctors, architects, consultants and other practices with personal and practice income mixed.",
    intro:
      "Professional practices usually need less bookkeeping and more tax structure: multiple income heads, presumptive-taxation decisions, and a clean line between personal and practice money.",
    challenges: [
      "Practice and personal transactions running through one account",
      "Presumptive versus regular taxation not evaluated",
      "Advance tax underestimated, interest paid every year",
      "Equipment and premises purchase decisions taken without the tax view",
    ],
    weDo: [
      "Separation of practice and personal books",
      "Regime and presumptive-scheme comparison",
      "Advance-tax computation across all four instalments",
      "Capital expenditure planning with the tax impact stated",
    ],
    services: ["taxation", "accounting", "business-consultancy"],
  },
  {
    slug: "other",
    name: "Other Industries",
    short: "Manufacturing, construction, education, logistics and everything not listed above.",
    intro:
      "The four core services apply to any business; only the emphasis changes. If your sector is not listed, the first conversation is about what is specific to it — we will tell you honestly whether we have done that work before.",
    challenges: [
      "Sector-specific tax treatments that general accountants apply by default",
      "Compliance obligations particular to the industry",
      "Costing methods that do not suit how the business actually runs",
    ],
    weDo: [
      "A scoping conversation before any commitment",
      "Books and compliance set up to the sector's requirements",
      "An honest statement of where we have prior experience and where we do not",
    ],
    services: ["accounting", "taxation", "legal", "business-consultancy"],
  },
];

export const industryHref = (i: Industry) => i.href ?? `/industries/${i.slug}`;

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

/** Industries that render at /industries/<slug> (excludes ones with a canonical elsewhere). */
export const routedIndustries = industries.filter((i) => !i.href);
