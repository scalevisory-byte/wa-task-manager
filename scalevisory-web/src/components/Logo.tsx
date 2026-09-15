import Link from "next/link";

/**
 * Official Scale Visory logo (owner-supplied, replaces the placeholder SVG mark
 * — CLAUDE.md decision #5).
 *
 * The lockup already contains the wordmark, the "Accounting | Taxation | Legal"
 * line and the tagline, so no text is set alongside it. `light` swaps in the
 * all-white version for dark backgrounds, matching the firm's own creatives.
 * Both files are transparent PNGs trimmed to the artwork.
 */
export default function Logo({
  light = false,
  className = "h-11",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className="inline-flex shrink-0 no-underline" aria-label="Scale Visory — home">
      <img
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="Scale Visory — Accounting, Taxation, Legal. Balancing The Unbalanced."
        width={900}
        height={187}
        className={`${className} w-auto`}
      />
    </Link>
  );
}
