export function SectionHeader({ eyebrow, title, actionText, actionHref }: { eyebrow: string; title: string; actionText?: string; actionHref?: string }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-black text-charcoal">{title}</h2>
      </div>
      {actionText && actionHref ? (
        <a href={actionHref} className="text-sm font-semibold text-primary">{actionText}</a>
      ) : null}
    </div>
  );
}
