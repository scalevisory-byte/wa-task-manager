/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }] },

  async redirects() {
    return [
      // Six service pages folded into four (decision #1).
      { source: "/services/accounting-bookkeeping", destination: "/services/accounting", permanent: true },
      { source: "/services/compliance-regulatory", destination: "/services/taxation", permanent: true },
      { source: "/services/business-advisory", destination: "/services/business-consultancy", permanent: true },
      { source: "/services/internal-audit", destination: "/services/accounting#financial-internal-audit", permanent: true },

      // /travel-agency-accounting is the canonical travel page (decision #6).
      { source: "/industries/travel-agencies", destination: "/travel-agency-accounting", permanent: true },

      // Blog feed replaced by the Resources hub. Individual posts are redirected
      // by src/app/blog/[slug]/page.tsx, which needs the post's category to build
      // the new URL, so it cannot be expressed as a static rule here.
      { source: "/blog", destination: "/resources", permanent: true },
    ];
  },
};
export default nextConfig;
