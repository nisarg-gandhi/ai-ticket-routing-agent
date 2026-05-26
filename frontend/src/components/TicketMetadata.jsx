import Badge from './Badge';
import { AlertCircle } from 'lucide-react';

export default function TicketMetadata({ ticket }) {
  const getUrgencyVariant = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getSentimentVariant = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'green';
      case 'negative': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">AI Analysis</h3>
        {ticket.needs_review && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200/80 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            Needs Review
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100 min-w-[120px]">
          <span className="text-xs text-slate-500 font-medium">Category</span>
          <Badge label={ticket.category} variant="indigo" />
        </div>

        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100 min-w-[120px]">
          <span className="text-xs text-slate-500 font-medium">Urgency</span>
          <Badge label={ticket.urgency} variant={getUrgencyVariant(ticket.urgency)} />
        </div>

        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100 min-w-[120px]">
          <span className="text-xs text-slate-500 font-medium">Sentiment</span>
          <Badge label={ticket.sentiment} variant={getSentimentVariant(ticket.sentiment)} />
        </div>
      </div>
      
      {ticket.confidence !== undefined && ticket.confidence !== null && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Confidence Score</span>
            <span className="text-slate-700 font-bold">{(ticket.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.max(0, Math.min(100, ticket.confidence * 100))}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
