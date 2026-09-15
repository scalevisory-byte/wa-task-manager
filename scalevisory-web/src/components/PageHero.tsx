export default function PageHero({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-navy text-white">
      <div className="wrap py-16 md:py-20">
        <h1 className="max-w-3xl text-white">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
