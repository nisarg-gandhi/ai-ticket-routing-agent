import { RefreshCcw, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function StatusActions({ currentStatus, isUpdating, onUpdateStatus, role }) {
  const isResolved = currentStatus?.toLowerCase() === 'resolved';
  const isInProgress = currentStatus?.toLowerCase() === 'in_progress';
  const isClosed = currentStatus?.toLowerCase() === 'closed';

  return (
    <div className="flex space-x-3">
      {/* Mark In Progress Button */}
      <button 
        onClick={() => onUpdateStatus('in_progress')}
        disabled={isResolved || isInProgress || isClosed || isUpdating}
        className={`flex items-center px-4 py-2 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${
          isResolved || isInProgress || isClosed
            ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50 opacity-70'
            : 'border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700'
        }`}
      >
        {isUpdating === 'in_progress' ? (
          <RefreshCcw className="w-4 h-4 mr-2 animate-spin text-slate-400" />
        ) : (
          <Clock className={`w-4 h-4 mr-2 transition-colors ${isResolved || isInProgress || isClosed ? 'text-slate-400' : 'text-amber-500'}`} />
        )}
        {isInProgress ? 'In Progress' : 'Mark In Progress'}
      </button>

      {/* Mark Resolved Button */}
      <button 
        onClick={() => onUpdateStatus('resolved')}
        disabled={isResolved || isClosed || isUpdating}
        className={`flex items-center px-4 py-2 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${
          isResolved || isClosed
            ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50 opacity-70'
            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300'
        }`}
      >
        {isUpdating === 'resolved' ? (
          <RefreshCcw className="w-4 h-4 mr-2 animate-spin text-slate-400" />
        ) : (
          <CheckCircle className={`w-4 h-4 mr-2 transition-colors ${isResolved || isClosed ? 'text-slate-400' : 'text-emerald-500'}`} />
        )}
        {isResolved ? 'Resolved' : 'Mark Resolved'}
      </button>

      {/* Mark Closed Button — admin only */}
      {role === 'admin' && (
        <button
          onClick={() => onUpdateStatus('closed')}
          disabled={isClosed || isUpdating}
          className={`flex items-center px-4 py-2 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${
            isClosed
              ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50 opacity-70'
              : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
          }`}
        >
          {isUpdating === 'closed' ? (
            <RefreshCcw className="w-4 h-4 mr-2 animate-spin text-slate-400" />
          ) : (
            <XCircle className={`w-4 h-4 mr-2 transition-colors ${isClosed ? 'text-slate-400' : 'text-slate-500'}`} />
          )}
          {isClosed ? 'Closed' : 'Mark Closed'}
        </button>
      )}
    </div>
  );
}

