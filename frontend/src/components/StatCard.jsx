// StatCard — matches landing page feature card aesthetic:
// white surface, subtle border, no heavy shadow, indigo accent icon

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-sm hover:shadow-indigo-500/5 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 tracking-tight">{title}</h3>
        <div className="p-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl group-hover:bg-indigo-100 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</span>
      </div>
      {/* Indigo accent bar at the bottom */}
      <div className="mt-4 h-0.5 w-8 rounded-full bg-indigo-400/40 group-hover:w-12 group-hover:bg-indigo-500/60 transition-all duration-300" />
    </div>
  );
}
