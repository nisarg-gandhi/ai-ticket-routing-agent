// StatCard — matches landing page feature card aesthetic:
// white surface, subtle border, no heavy shadow, indigo accent icon
// accentColor: 'purple' | 'green' | 'blue' | 'red'

const ACCENT_BORDER = {
  purple: 'border-l-purple-500',
  green:  'border-l-emerald-500',
  blue:   'border-l-blue-500',
  red:    'border-l-red-500',
};

const ACCENT_ICON_BG = {
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  green:  'bg-emerald-50 text-emerald-600 border-emerald-100',
  blue:   'bg-blue-50 text-blue-600 border-blue-100',
  red:    'bg-red-50 text-red-600 border-red-100',
};

export default function StatCard({ title, value, icon: Icon, accentColor = 'purple' }) {
  const borderClass = ACCENT_BORDER[accentColor] ?? ACCENT_BORDER.purple;
  const iconClass   = ACCENT_ICON_BG[accentColor] ?? ACCENT_ICON_BG.purple;

  return (
    <div className={`bg-white p-6 rounded-2xl border border-slate-200/80 border-l-4 ${borderClass} hover:shadow-sm transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 tracking-tight">{title}</h3>
        <div className={`p-2 border rounded-xl transition-colors ${iconClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</span>
      </div>
    </div>
  );
}

