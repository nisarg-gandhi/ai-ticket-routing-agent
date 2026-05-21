import Badge from './Badge';

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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
      <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">AI Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Category</span>
          <div>
            <Badge label={ticket.category} variant="indigo" />
          </div>
        </div>
        
        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Urgency</span>
          <div>
            <Badge label={ticket.urgency} variant={getUrgencyVariant(ticket.urgency)} />
          </div>
        </div>

        <div className="flex flex-col space-y-1 p-3 bg-slate-50/50 rounded-lg border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Sentiment</span>
          <div>
            <Badge label={ticket.sentiment} variant={getSentimentVariant(ticket.sentiment)} />
          </div>
        </div>
      </div>
    </div>
  );
}
