export const site = {
  name: "Scale Visory",
  tagline: "Balancing The Unbalanced",
  description:
    "Scale Visory is a Surat-based accounting, taxation, compliance and business advisory firm with 12+ years of experience. Bookkeeping, GST, income tax, audit and a practical accounts training institute.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scalevisory.com",
  phone: "+91 99099 93565",
  phoneRaw: "919909993565",
  email: "info@scalevisory.com",
  address: "G-59, VIP Plaza, VIP Road, Vesu, Surat – 395007, Gujarat",
  mapsQuery: "VIP Plaza, VIP Road, Vesu, Surat 395007",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  years: "12+",
  social: {
    instagram: "https://instagram.com/scalevisory",
    linkedin: "https://linkedin.com/company/scalevisory",
  },
};

export const nav: { href: string; label: string; external?: boolean }[] = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/training", label: "Training institute" },
  { href: "https://artharecovery.in", label: "Payment recovery", external: true },
  { href: "https://zyntajobs.in", label: "Careers", external: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Policy pages — footer only, never in the main nav. */
export const legalNav: { href: string; label: string }[] = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(text)}`;
