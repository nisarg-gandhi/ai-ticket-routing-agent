// Badge — pill-shaped, indigo/violet/red semantic system
// variant: 'indigo' | 'violet' | 'red' | 'green' | 'yellow' | 'orange' | 'gray' | 'blue' | 'purple' | 'pink'

const STYLES = {
  indigo: {
    wrap: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    dot: 'bg-indigo-500',
  },
  violet: {
    wrap: 'bg-violet-50 text-violet-700 border-violet-200/80',
    dot: 'bg-violet-500',
  },
  blue: {
    // Alias → indigo for consistency
    wrap: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    dot: 'bg-indigo-500',
  },
  purple: {
    wrap: 'bg-violet-50 text-violet-700 border-violet-200/80',
    dot: 'bg-violet-500',
  },
  green: {
    wrap: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    dot: 'bg-emerald-500',
  },
  red: {
    wrap: 'bg-red-50 text-red-700 border-red-200/80',
    dot: 'bg-red-500',
  },
  yellow: {
    wrap: 'bg-amber-50 text-amber-700 border-amber-200/80',
    dot: 'bg-amber-400',
  },
  orange: {
    wrap: 'bg-orange-50 text-orange-700 border-orange-200/80',
    dot: 'bg-orange-500',
  },
  pink: {
    wrap: 'bg-pink-50 text-pink-700 border-pink-200/80',
    dot: 'bg-pink-500',
  },
  gray: {
    wrap: 'bg-slate-50 text-slate-600 border-slate-200/80',
    dot: 'bg-slate-400',
  },
};

export default function Badge({ label, variant = 'gray' }) {
  const style = STYLES[variant] || STYLES.gray;

  const displayLabel =
    typeof label === 'string'
      ? label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ')
      : label;

  if (!label) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-slate-50 text-slate-400 border-slate-200/80 whitespace-nowrap">
        N/A
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${style.wrap}`}>
      <span className={`w-1.5 h-1.5 flex-shrink-0 rounded-full ${style.dot}`} />
      {displayLabel}
    </span>
  );
}
