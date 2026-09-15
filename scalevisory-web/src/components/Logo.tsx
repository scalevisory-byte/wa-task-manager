import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 no-underline ${light ? "text-white" : "text-navy"}`} aria-label="Scale Visory home">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="16" y="4" width="2" height="26" rx="1" fill="currentColor" />
        <rect x="5" y="9" width="24" height="2" rx="1" fill="currentColor" />
        <path d="M5 11l-3 8h6l-3-8z" fill="#10A9E8" />
        <path d="M29 11l-3 8h6l-3-8z" fill="#10A9E8" />
        <rect x="9" y="29" width="16" height="2" rx="1" fill="currentColor" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight">
        Scale<span className="text-sky">Visory</span>
      </span>
    </Link>
  );
}
