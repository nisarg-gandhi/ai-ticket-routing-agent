import { AlertCircle, Clock, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import { formatDate } from '../utils/formatDate';

const StatusBadge = ({ status }) => {
  const variants = {
    open: 'blue',
    in_progress: 'yellow',
    resolved: 'green',
    closed: 'gray'
  };

  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed'
  };

  const variant = variants[status?.toLowerCase()] || 'gray';
  const label = labels[status?.toLowerCase()] || status || 'Unknown';

  return <Badge label={label} variant={variant} />;
};

export default function TicketTable({ tickets, isLoading, error }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80">
        <RefreshCcw className="w-7 h-7 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm font-medium">Loading tickets…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-red-100">
        <AlertCircle className="w-9 h-9 text-red-400 mb-3" />
        <p className="text-red-600 font-medium mb-1 text-sm">Failed to load tickets</p>
        <p className="text-xs text-red-400 max-w-md text-center">{error}</p>
      </div>
    );
  }

  if (!tickets?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-3">
          <Clock className="w-7 h-7 text-indigo-400" />
        </div>
        <p className="text-slate-900 font-semibold text-sm mb-1">No tickets found</p>
        <p className="text-xs text-slate-400">There are no tickets matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Customer</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Subject</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Category</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Urgency</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Sentiment</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr 
                key={ticket.id} 
              onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors text-sm">
                        {ticket.customer_name}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">{ticket.customer_email}</div>
                    </div>
                    {ticket.needs_review && (
                      <AlertCircle className="w-4 h-4 text-amber-500 ml-1 flex-shrink-0" title="Needs Review" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 text-sm">
                  <div className="truncate max-w-xs font-medium" title={ticket.subject}>
                    {ticket.subject}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="px-6 py-4">
                  <Badge label={ticket.category} variant="indigo" />
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    label={ticket.urgency} 
                    variant={
                      ticket.urgency?.toLowerCase() === 'critical' ? 'red' :
                      ticket.urgency?.toLowerCase() === 'high' ? 'orange' : 
                      ticket.urgency?.toLowerCase() === 'medium' ? 'yellow' : 
                      ticket.urgency?.toLowerCase() === 'low' ? 'green' : 'gray'
                    } 
                  />
                </td>
                <td className="px-6 py-4">
                  <Badge 
                    label={ticket.sentiment} 
                    variant={
                      ticket.sentiment?.toLowerCase() === 'positive' ? 'green' : 
                      ticket.sentiment?.toLowerCase() === 'negative' ? 'red' : 'gray'
                    } 
                  />
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {formatDate(ticket.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
