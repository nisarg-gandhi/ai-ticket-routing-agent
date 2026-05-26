export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</span>
      </div>
    </div>
  );
}
