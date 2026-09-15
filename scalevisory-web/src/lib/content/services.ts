/**
 * Four core services (PLATFORM-PLAN §1, decision #1).
 *
 * The earlier six service pages fold in as follows:
 *   Compliance & Regulatory → statutory items into Taxation, ROC/corporate/licence work into Legal
 *   Business Advisory       → Business Consultancy
 *   Internal Audit          → "Financial Internal Audit" in Accounting,
 *                             "Business Internal Audit" in Business Consultancy
 * Old slugs 301 to the new ones in next.config.mjs.
 */

export interface ServiceSection {
  /** Anchor id used for in-page navigation and deep links. */
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export interface Service {
  slug: string;
  name: string;
  /** Nav/card label where the full name is too long. */
  shortName: string;
  short: string;
  intro: string;
  sections: ServiceSection[];
  benefits: string[];
  forWhom: string;
  process?: { step: string; detail: string }[];
  /** Rendered as a bordered note at the foot of the page. */
  disclaimer?: string;
}

export const services: Service[] = [
  // ─────────────────────────────────────────────────────────────── Accounting
  {
    slug: "accounting",
    name: "Accounting",
    shortName: "Accounting",
    short: "Clean books every month, so decisions rest on numbers you can trust.",
    intro:
      "We run your books the way a finance team would — daily entries, reconciled bank statements, vendor and customer ledgers that tie out, and a monthly close you can read in ten minutes. Tally Prime, Zoho Books or your existing system; we work in what you already use.",
    sections: [
      {
        id: "bookkeeping",
        title: "Bookkeeping & Day-to-Day Accounting",
        summary: "The routine that everything else depends on, done on a fixed rhythm.",
        items: [
          "Daily / weekly transaction recording in Tally Prime, Zoho Books or Busy",
          "Sales, purchase, expense and journal entries with correct tax treatment",
          "Vendor and customer master maintenance",
          "Document filing so every entry has a voucher behind it",
        ],
      },
      {
        id: "reconciliation",
        title: "Reconciliation",
        summary: "Books that agree with the bank, the portal and the party.",
        items: [
          "Bank, credit card and payment-gateway reconciliation",
          "GST input reconciliation against GSTR-2B",
          "Party balance confirmation and difference resolution",
          "Inter-branch and inter-company reconciliation",
        ],
      },
      {
        id: "receivables",
        title: "Receivables & Payables",
        summary: "Know who owes you and what you owe, every week.",
        items: [
          "Debtors and creditors ageing with follow-up lists",
          "Credit-period tracking and overdue flagging",
          "Payment scheduling against available cash",
          "Recovery escalation handed to Legal where an account has gone bad",
        ],
      },
      {
        id: "reporting",
        title: "Monthly Reporting & MIS",
        summary: "A close you can actually read, not a data dump.",
        items: [
          "Monthly P&L, balance sheet and cash-flow summary",
          "Margin by product, branch or division where your data supports it",
          "Comparison against last month and last year",
          "A short written note on what moved and why",
        ],
      },
      {
        id: "finalisation",
        title: "Finalisation & Audit Coordination",
        summary: "Year-end without the scramble.",
        items: [
          "Year-end finalisation of accounts",
          "Schedules and annexures prepared for your statutory auditor",
          "Coordination with the auditor through the audit",
          "Prior-period adjustments and opening balance corrections",
        ],
      },
      {
        id: "financial-internal-audit",
        title: "Financial Internal Audit",
        summary:
          "An independent check on books, stock, cash and controls — before a bank, a tax officer or a loss finds the gap. (The business-efficiency counterpart sits under Business Consultancy.)",
        items: [
          "Transaction and ledger audit — vouching, cut-off, party balance confirmations",
          "Stock audit — physical verification, valuation, slow-moving and shortage analysis",
          "Cash and bank audit — surprise cash counts, reconciliations, unauthorised payments",
          "Purchase and expense audit — rate comparison, duplicate bills, vendor genuineness",
          "Fraud detection — pattern analysis on sales, purchases and payments",
          "Pre-statutory-audit review so the year-end audit goes clean",
        ],
      },
    ],
    benefits: [
      "No year-end scramble — books are always finalisation-ready",
      "Know exactly who owes you and what you owe, every week",
      "Fewer GST mismatches because purchases are booked correctly the first time",
      "Leakage caught early, with evidence behind it",
    ],
    forWhom:
      "Trading firms, travel agencies, manufacturers, professionals and startups who want a dependable accounts function without hiring a full-time senior accountant.",
  },

  // ──────────────────────────────────────────────────────────────── Taxation
  {
    slug: "taxation",
    name: "Taxation",
    shortName: "Taxation",
    short: "GST, income tax and TDS — filed on time, planned in advance.",
    intro:
      "Taxation is where small errors turn into notices. We handle GST registration and returns, income-tax filing for individuals and businesses, TDS compliance and advance-tax planning, the statutory registrations that sit alongside them, and we support you when a notice does arrive.",
    sections: [
      {
        id: "gst",
        title: "GST",
        summary: "Registration through annual return, with input claimed properly.",
        items: [
          "GST registration, amendment and cancellation",
          "GSTR-1, GSTR-3B and GSTR-9 / 9C filing",
          "Input tax credit reconciliation against GSTR-2B",
          "E-invoicing and e-way bill setup and support",
          "GST on commission, TCS on overseas packages and other travel-sector treatments",
        ],
      },
      {
        id: "income-tax",
        title: "Income Tax",
        summary: "Returns for every structure, computed before the deadline, not on it.",
        items: [
          "Income-tax returns for individuals, firms, LLPs and companies",
          "Advance-tax computation across the four instalments",
          "Capital gains computation and reporting",
          "Tax audit support under section 44AB where applicable",
        ],
      },
      {
        id: "tds",
        title: "TDS & TCS",
        summary: "Deduction, deposit, return and certificate — the full cycle.",
        items: [
          "TDS / TCS returns (24Q, 26Q, 27EQ)",
          "Form 16 and Form 16A generation",
          "Lower-deduction certificate applications",
          "Correction statements and default resolution on TRACES",
        ],
      },
      {
        id: "statutory",
        title: "Statutory Registrations & Returns",
        summary:
          "The payroll-linked and state registrations that run on their own calendars. (Company, LLP and licence filings sit under Legal.)",
        items: [
          "PF and ESIC registration and monthly returns",
          "Professional tax registration and periodic returns",
          "Employer-side compliance as headcount crosses thresholds",
          "A compliance calendar with reminders shared on WhatsApp",
        ],
      },
      {
        id: "advisory",
        title: "Tax Advisory & Planning",
        summary: "Structure decided before the transaction, not explained after it.",
        items: [
          "Tax-efficient business and transaction structuring",
          "Old vs new regime and entity-form comparison",
          "Withholding implications on new contracts and vendor types",
          "Year-round planning rather than a March-only exercise",
        ],
      },
      {
        id: "dispute-support",
        title: "Review & Dispute Support",
        summary: "When a notice arrives, someone who already knows the file.",
        items: [
          "Review of filed returns and self-correction before scrutiny",
          "Reply to notices, intimations and rectification applications",
          "Assessment and appeal documentation support",
          "Departmental follow-up and hearing coordination",
        ],
      },
    ],
    benefits: [
      "Zero late fees — a calendar we track, not you",
      "ITC claimed fully and correctly, not left on the table",
      "One point of contact for every tax question across the year",
    ],
    forWhom:
      "Any GST-registered business, professionals with multiple income sources, employers crossing PF / ESIC thresholds, and travel operators dealing with TCS on overseas packages.",
  },

  // ─────────────────────────────────────────────────────────────────── Legal
  {
    slug: "legal",
    name: "Legal",
    shortName: "Legal",
    short: "Company filings, agreements, licences and recovery notices — documented properly.",
    intro:
      "The legal side of running a business is mostly paperwork that has to be right: an entity incorporated correctly, filings made on time, agreements that say what you think they say, licences current, and a demand notice that lands with weight. That is the work we do — advisory and documentation, with representation coordinated through empanelled advocates.",
    sections: [
      {
        id: "incorporation",
        title: "Incorporation & Entity Setup",
        summary: "Starting the entity in the right form, with the right documents.",
        items: [
          "Private limited, LLP, OPC and partnership incorporation",
          "Name approval, DSC, DIN and MOA / AOA drafting",
          "Partnership and LLP agreement drafting",
          "Conversion between structures — proprietorship to LLP or private limited",
        ],
      },
      {
        id: "roc",
        title: "ROC & Corporate Compliance",
        summary: "Annual filings and event-based forms, tracked on a calendar.",
        items: [
          "Annual ROC filings — AOC-4, MGT-7, Form 11 and Form 8",
          "Director appointment, resignation and KYC",
          "Share transfer, allotment and capital changes",
          "Statutory registers, board and general meeting documentation",
        ],
      },
      {
        id: "recovery",
        title: "Legal Notices & Recovery — Recover What Is Yours",
        summary:
          "Overdue invoices pursued through a documented, escalating process. Recovery is run by our partner venture Artha — every recovery engagement is handled there.",
        items: [
          "Ledger audit and evidence assembly before anything is sent",
          "Demand and legal notice drafting",
          "Structured follow-up and negotiated settlement",
          "Escalation to formal proceedings, coordinated through empanelled advocates",
        ],
      },
      {
        id: "agreements",
        title: "Agreements & Documentation",
        summary: "Contracts drafted and reviewed before they are signed.",
        items: [
          "Vendor, customer, service and distribution agreements",
          "Employment contracts, appointment letters and NDAs",
          "Rent, lease and leave-and-licence agreements",
          "Review and red-lining of contracts sent to you by the other side",
        ],
      },
      {
        id: "licences",
        title: "Licences & Registrations",
        summary: "The permissions a business needs to trade, obtained and renewed.",
        items: [
          "MSME / Udyam registration",
          "Shop & Establishment registration",
          "Import Export Code (IEC)",
          "FSSAI and other sector licences, including renewals",
        ],
      },
      {
        id: "advisory-legal",
        title: "Business Legal Advisory",
        summary: "A view on the legal exposure in a commercial decision.",
        items: [
          "Regulatory position on a proposed transaction or structure",
          "Compliance gap review across entity documentation",
          "Dispute assessment and options before escalation",
          "Coordination with empanelled advocates where representation is required",
        ],
      },
    ],
    benefits: [
      "Every statutory due date tracked in one place",
      "Agreements that hold up when a relationship turns difficult",
      "Records that stand scrutiny from banks, investors and authorities",
    ],
    forWhom:
      "Private limited companies, LLPs, businesses preparing for bank funding or investment, and any firm carrying overdue receivables or unsigned commercial arrangements.",
    disclaimer:
      "Scale Visory provides legal advisory and documentation services. Representation before courts, tribunals and authorities is coordinated through empanelled advocates — [PLACEHOLDER — owner to confirm empanelled advocate names]. Nothing on this page is legal advice on a specific matter; engagement terms are agreed in writing before work begins.",
  },

  // ─────────────────────────────────────────────────── Business Consultancy
  {
    slug: "business-consultancy",
    name: "Business Consultancy",
    shortName: "Consultancy",
    short: "Find what is holding the business back, fix it with the team, and review it every month.",
    intro:
      "Consultancy is the work around the numbers: finding where money, time or control is leaking, fixing it with the team, and reviewing it every month so it stays fixed. Coaching for the owner, systems for the office, and a written action plan with owners and deadlines against every item.",
    process: [
      { step: "Diagnose", detail: "A health check across finance, sales, operations and management — what is working and what it is costing you." },
      { step: "Analyse", detail: "Root cause, not symptoms: why margins fell, why payments are late, why nothing moves when you are away." },
      { step: "Strategize", detail: "The few changes that move the number most, sequenced into a 30/60/90-day plan." },
      { step: "Implement", detail: "SOPs, process changes, automation and training — rolled out with your team, not handed over as a report." },
      { step: "Measure", detail: "Targets versus actual, reviewed monthly with you and your department heads." },
      { step: "Improve", detail: "Last month's open actions carried forward and escalated until they close." },
    ],
    sections: [
      {
        id: "health-check",
        title: "Business Health Check",
        summary: "A structured review across four blocks, scored so you can see where you stand.",
        items: [
          "Financial — margin, cash cycle, break-even, cost structure",
          "Sales — pipeline, conversion, pricing, customer concentration",
          "Operations — process, capacity, delivery, wastage",
          "Management — delegation, KPIs, review discipline, owner dependency",
          "Output: a Business Health Score across eight areas with critical items called out",
        ],
      },
      {
        id: "profit",
        title: "Profit Improvement",
        summary: "Improve profitability, not just revenue.",
        items: [
          "Margin analysis by product, branch, customer or route",
          "Cost structure review — fixed versus variable, controllable versus committed",
          "Pricing and discount-policy review",
          "Loss-making line identification: what to grow, what to stop",
        ],
      },
      {
        id: "cash-flow",
        title: "Cash Flow Consulting",
        summary: "Knowing what the bank balance will be before it gets there.",
        items: [
          "30 / 60 / 90-day rolling cash forecast",
          "Working-capital cycle analysis and reduction",
          "Collection discipline and credit-policy design",
          "Funding requirement sizing, project reports and CMA data for bank loans",
        ],
      },
      {
        id: "strategy",
        title: "Business Strategy",
        summary: "Where the business goes next, decided on evidence.",
        items: [
          "Growth options appraisal — new branch, product, market or venture",
          "Business structuring and multi-entity design",
          "New business setup — structure, registrations, bank, GST, licences, first-year compliance plan",
          "Succession and next-generation transition planning",
        ],
      },
      {
        id: "sales",
        title: "Sales & Revenue Consulting",
        summary: "A sales function that does not depend on the owner closing every deal.",
        items: [
          "Sales process and pipeline design",
          "Target setting, incentive structure and review cadence",
          "Customer and enquiry data analysis — where revenue actually comes from",
          "CRM selection and rollout",
        ],
      },
      {
        id: "operations",
        title: "Operations Consulting",
        summary: "Turning how things get done into something written down and repeatable.",
        items: [
          "Process mapping and SOP development",
          "Staff training on systems and processes — accounts, sales and office teams",
          "Software / ERP selection and implementation — Tally, Zoho, Busy, billing, CRM",
          "Capacity, turnaround and wastage review",
        ],
      },
      {
        id: "management",
        title: "Management Consulting",
        summary: "Systems that let the owner step back without the business slowing down.",
        items: [
          "KPI design and dashboard setup by department",
          "Review meeting structure with action tracking",
          "Delegation framework and role clarity",
          "Business coaching for the owner and mentoring for next-generation family members",
        ],
      },
      {
        id: "business-internal-audit",
        title: "Business Internal Audit",
        summary:
          "An audit of efficiency and objectives rather than of books — distinct from the Financial Internal Audit under Accounting.",
        items: [
          "Review of whether processes achieve what they were designed to achieve",
          "Branch, department and field-staff performance review",
          "Internal control and SOP gap report",
          "Output: Business Audit Report with a risk rating, recommendations and an action plan",
        ],
      },
    ],
    benefits: [
      "An office that runs on systems, not on one person's memory",
      "Every month you know exactly what improved and what is still open",
      "Growth decisions taken on your data, with a partner who has built businesses too",
    ],
    forWhom:
      "Owner-run businesses that have outgrown informal management, family businesses moving to the next generation, and founders planning a new branch, product or venture.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Old six-service slugs → the core service that absorbed them (decision #1). */
export const legacyServiceRedirects: Record<string, string> = {
  "accounting-bookkeeping": "accounting",
  "compliance-regulatory": "taxation",
  "business-advisory": "business-consultancy",
  "internal-audit": "accounting",
};
