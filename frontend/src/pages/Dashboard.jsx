import StatCard from '../components/StatCard';
import { Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Tickets', value: '1,284', trend: 'up', trendValue: '12', icon: Ticket },
    { title: 'Avg. Resolution Time', value: '4.2h', trend: 'down', trendValue: '8', icon: Clock },
    { title: 'Resolved (7d)', value: '892', trend: 'up', trendValue: '24', icon: CheckCircle2 },
    { title: 'Escalated', value: '23', trend: 'down', trendValue: '2', icon: AlertCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Track your AI support agent's performance</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm ring-1 ring-indigo-600 ring-offset-1">
            New Ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Volume</h2>
          <div className="flex-1 border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center bg-gray-50/50">
            <p className="text-gray-400 font-medium">Chart Visualization Placeholder</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Actions</h2>
          <div className="flex-1 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 text-xs font-bold">AI</span>
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Routed ticket #102{i} to Billing</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
