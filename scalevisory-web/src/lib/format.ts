export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

/** Very small markdown-lite: blank-line paragraphs, ## headings, - bullets, **bold** */
export function renderContent(src: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const blocks = src.replace(/\r/g, "").split(/\n{2,}/);
  return blocks
    .map((b) => {
      const t = b.trim();
      if (!t) return "";
      if (t.startsWith("### ")) return `<h3>${inline(t.slice(4))}</h3>`;
      if (t.startsWith("## ")) return `<h2>${inline(t.slice(3))}</h2>`;
      if (t.split("\n").every((l) => /^[-*] /.test(l)))
        return `<ul>${t.split("\n").map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
      return `<p>${inline(t).replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}
