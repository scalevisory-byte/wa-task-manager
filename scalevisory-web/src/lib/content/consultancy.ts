/**
 * Business Consultancy sub-pages (PLATFORM-PLAN §1 and §6).
 * AI & Automation is a page under Consultancy, not a fifth core service.
 */

export interface ConsultancyPage {
  slug: string;
  name: string;
  title: string;
  lead: string;
  description: string;
  blocks: { title: string; body: string; items?: string[] }[];
  cta: { heading: string; body: string; subject: string };
}

export const consultancyPages: ConsultancyPage[] = [
  {
    slug: "why-isnt-your-business-growing",
    name: "Why isn't your business growing?",
    title: "Why Isn't Your Business Growing?",
    lead:
      "Turnover is flat or rising while profit is not. Staff are busy. You are working more hours than three years ago. The cause is usually one of a small number of things — and it is findable.",
    description:
      "A Business Growth Diagnostic from Scale Visory, Surat: a structured review of finance, sales, operations and management that identifies why a business has stopped growing, with a 30/60/90-day action plan.",
    blocks: [
      {
        title: "The symptoms owners describe",
        body: "Different businesses, the same short list. If two or three of these are familiar, the diagnostic will find something.",
        items: [
          "Sales are up but the bank balance is not",
          "Nothing gets decided or delivered when you are away for a week",
          "Margins have slipped and nobody can say exactly when or why",
          "Customers pay late and following up has become someone's full-time job",
          "Staff are fully occupied but output has not moved in two years",
          "You cannot say which product, branch or customer actually makes money",
        ],
      },
      {
        title: "What usually turns out to be the cause",
        body: "Growth stops for structural reasons, not motivational ones. In the businesses we review, it is generally one of these.",
        items: [
          "Pricing that has not moved while input costs have",
          "A working-capital cycle long enough to consume every rupee of growth",
          "Revenue concentrated in a few customers, with no pipeline behind them",
          "Every decision routed through the owner, so capacity is capped at one person",
          "No numbers between the bank balance and the year-end balance sheet",
          "Processes that live in people's heads, so quality depends on who is in that day",
        ],
      },
      {
        title: "The Business Growth Diagnostic",
        body: "A fixed-scope review that ends with a written plan, not a conversation.",
        items: [
          "Review across four blocks — Financial, Sales, Operations, Management",
          "Interviews with you and your department heads",
          "Analysis of your own data: margins, cash cycle, customer and product mix",
          "A Business Health Score across eight areas, 0–100, with critical items flagged",
          "A 30/60/90-Day Action Plan — area, problem, action, owner, deadline, expected impact",
          "A review session to walk the findings through with your team",
        ],
      },
      {
        title: "What you are left holding",
        body:
          "Two documents and a decision. The Business Health Score tells you where you stand today and what is most urgent. The 30/60/90-Day Action Plan says who does what by when, with the impact each action is expected to have. You can run that plan yourself, or engage us to implement and review it monthly under Monthly Business Advisory.",
      },
    ],
    cta: {
      heading: "Book a Business Growth Diagnostic",
      body: "Tell us the shape of the business and what has stalled. We will confirm scope and what the review will cover.",
      subject: "Business Growth Diagnostic",
    },
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    title: "AI & Automation Consulting",
    lead:
      "Most offices lose hours every week to work a machine could do: retyping data between systems, chasing the same follow-ups, assembling the same reports. We find that work and remove it.",
    description:
      "AI and automation consulting for small and mid-sized businesses from Scale Visory, Surat — billing, follow-up, reporting and data-entry automation, WhatsApp and ERP integration, and practical AI adoption.",
    blocks: [
      {
        title: "Where the hours actually go",
        body: "We start by measuring, not by recommending tools. The audit looks for repetition, re-entry and waiting.",
        items: [
          "The same data typed into two or more systems",
          "Manual follow-up on payments, enquiries and renewals",
          "Reports rebuilt by hand every week or month",
          "Approvals that wait in a WhatsApp thread",
          "Documents filed, renamed and searched for by hand",
        ],
      },
      {
        title: "What we automate",
        body: "Practical, maintainable automation on systems you already pay for — not a rebuild.",
        items: [
          "Billing and invoicing — generation, dispatch and recording",
          "Payment and renewal follow-up sequences, including WhatsApp",
          "Recurring MIS and management reports assembled automatically",
          "Data flow between Tally / Zoho / Busy, billing, CRM and spreadsheets",
          "Enquiry capture from website, WhatsApp and calls into one list",
          "Document collection, naming and filing",
        ],
      },
      {
        title: "Where AI genuinely helps",
        body:
          "AI is useful where the input is unstructured and the volume is real — reading documents, drafting routine text, summarising long threads, classifying enquiries. It is not useful as a substitute for a process that does not exist yet. We will say which of the two you are looking at.",
        items: [
          "Extracting data from bills, bank statements and vendor documents",
          "Drafting routine correspondence and follow-up messages",
          "Summarising meetings into decisions, actions and owners",
          "Classifying and routing incoming enquiries",
        ],
      },
      {
        title: "How an engagement runs",
        body: "Audit, then a shortlist ranked by hours saved against effort, then implementation with your team trained on it.",
        items: [
          "Automation audit — process map with time and error cost against each step",
          "Shortlist and sequencing — what pays back first",
          "Build and integrate on your existing systems",
          "Team training and written SOPs so it survives staff changes",
          "Review after 30 days on whether the hours actually came back",
        ],
      },
    ],
    cta: {
      heading: "Start with an automation audit",
      body: "Tell us which systems you run and where the repetitive work sits. We will scope the audit from there.",
      subject: "AI & Automation Consulting",
    },
  },
  {
    slug: "monthly-business-advisory",
    name: "Monthly Business Advisory",
    title: "Monthly Business Advisory",
    lead:
      "A diagnostic finds the problems once. Most businesses need the discipline of someone coming back every month to ask what moved, what did not, and why.",
    description:
      "A recurring monthly business advisory engagement from Scale Visory, Surat — monthly business review, insights, issue log, recommendations and a tracked action plan.",
    blocks: [
      {
        title: "What happens every month",
        body: "A fixed agenda, held on a fixed date, with the same document each time so months are comparable.",
        items: [
          "Monthly Business Review — the numbers, against target and against last month",
          "Insights — what changed, what caused it, what it means for the next quarter",
          "Issue log — what is blocking progress, ranked by money at risk",
          "Recommendations — the specific changes we advise, with reasoning",
          "Action Plan — area, problem, action, owner, deadline, expected and actual impact",
        ],
      },
      {
        title: "Carried forward, not reset",
        body:
          "Each month opens with last month's actions. Closed items are recorded with their actual impact against what was expected. Open items are escalated. A repeat finding is raised with you directly — that is the point of the engagement.",
      },
      {
        title: "Who sits in",
        body:
          "You, and the department heads whose numbers are on the agenda. Reviews that include only the owner tend not to produce change; reviews where the person responsible for a number explains it, do.",
      },
      {
        title: "What it is not",
        body:
          "It is not bookkeeping and it is not a compliance service — those are Accounting and Taxation. This is the management layer above them. It works best when the books are already current, so we will usually confirm the accounting is in order before starting.",
      },
    ],
    cta: {
      heading: "Ask about monthly advisory",
      body: "Tell us the size and shape of the business and who would attend the monthly review.",
      subject: "Monthly Business Advisory",
    },
  },
];

export const getConsultancyPage = (slug: string) =>
  consultancyPages.find((p) => p.slug === slug);
