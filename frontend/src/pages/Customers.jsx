import { useState, useEffect } from 'react';
import { Search, MoreVertical } from 'lucide-react';
import { customerService } from '../services/customerService';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerService.getCustomers()
      .then(data => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Customers</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your customer base and view their history.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-white text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-[11px] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-[11px] uppercase tracking-wider">Tickets</th>
                <th className="px-6 py-3 text-[11px] uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-[11px] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3" aria-hidden="true"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading customers…
                    </div>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-indigo-50/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-xs">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{customer.name}</div>
                           <div className="text-slate-400 text-xs">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{customer.tickets}</td>
                    <td className="px-6 py-4">{customer.lastActive}</td>
                    <td className="px-6 py-4 capitalize">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        ['open', 'in_progress'].includes(customer.status) 
                          ? 'bg-violet-50 text-violet-700 border-violet-200/80' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          ['open', 'in_progress'].includes(customer.status) ? 'bg-violet-500' : 'bg-emerald-500'
                        }`} />
                        {customer.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
