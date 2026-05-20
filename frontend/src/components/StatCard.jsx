export default function StatCard({ title, value, trend, trendValue, icon: Icon }) {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : '-'}{trendValue}%
        </span>
      </div>
    </div>
  );
}
