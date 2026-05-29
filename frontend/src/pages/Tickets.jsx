import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Download, AlertCircle, Inbox, RefreshCcw, UserCheck, ChevronRight, Clock, Mailbox } from 'lucide-react';
import ticketService from '../services/ticketService';
import TicketTable from '../components/TicketTable';
import SearchBar from '../components/SearchBar';
import TicketFilters from '../components/TicketFilters';
import Badge from '../components/Badge';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { formatDate } from '../utils/formatDate';

// ─── My Queue (agent-only) ────────────────────────────────────────────────────

const STATUS_VARIANT = {
  open: 'blue',
  in_progress: 'yellow',
  resolved: 'green',
  closed: 'gray',
};

const URGENCY_VARIANT = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'green',
};

function MyQueue({ currentUserId }) {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueue = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await ticketService.getMyQueue();
      setQueue(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  // Listen for global ticket_assigned events dispatched by per-ticket SSE handlers.
  // When a ticket assigned to this agent arrives, merge it into the queue list
  // using spread-merge so we never replace the whole list.
  useEffect(() => {
    const handleAssigned = (e) => {
      const updated = e.detail;
      if (!updated) return;

      // If this ticket is now assigned to the current agent and is open/in_progress,
      // add or update it in the queue.
      if (
        updated.assigned_agent_id === currentUserId &&
        ['open', 'in_progress'].includes(updated.status)
      ) {
        setQueue((prev) => {
          const idx = prev.findIndex((t) => t.id === updated.id);
          if (idx === -1) {
            // New ticket in queue
            return [{ ...updated }, ...prev];
          }
          // Spread-merge to avoid wiping existing fields
          return prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t));
        });

        window.dispatchEvent(new CustomEvent('toast:show', {
          detail: {
            message: `New ticket assigned to you: #${updated.id}`,
            type: 'info',
          },
        }));
      }
    };

    window.addEventListener('agent:ticket_assigned', handleAssigned);
    return () => window.removeEventListener('agent:ticket_assigned', handleAssigned);
  }, [currentUserId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80">
        <RefreshCcw className="w-7 h-7 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm font-medium">Loading your queue…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-red-100">
        <AlertCircle className="w-9 h-9 text-red-400 mb-3" />
        <p className="text-red-600 font-medium mb-1 text-sm">Failed to load queue</p>
        <p className="text-xs text-red-400 max-w-md text-center">{error}</p>
      </div>
    );
  }

  if (!queue.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/80">
        <div className="w-16 h-16 mb-4 text-slate-300">
          {/* Inbox tray illustration */}
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="36" width="48" height="20" rx="4" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5"/>
            <path d="M8 36 L20 18 H44 L56 36" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M24 36 C24 40.418 27.582 44 32 44 C36.418 44 40 40.418 40 36" fill="white" stroke="#A5B4FC" strokeWidth="1.5"/>
            <circle cx="32" cy="26" r="6" fill="#C7D2FE"/>
            <path d="M29 26 L31 28 L35 24" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-slate-800 font-semibold text-sm mb-1.5">No tickets assigned yet</p>
        <p className="text-xs text-slate-400 text-center max-w-[220px] leading-relaxed">New assignments will appear here in real time</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {queue.length} ticket{queue.length !== 1 ? 's' : ''} in your queue
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Customer</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Subject</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Category</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Urgency</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Assignment</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Assigned At</th>
              <th className="px-6 py-3" aria-hidden="true" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {queue.map((ticket) => (
              <tr
                key={ticket.id}
                id={`queue-row-${ticket.id}`}
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors text-sm">
                      {ticket.customer_name}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{ticket.customer_email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 text-sm">
                  <div className="truncate max-w-xs font-medium" title={ticket.subject}>
                    {ticket.subject}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge label={ticket.status} variant={STATUS_VARIANT[ticket.status?.toLowerCase()] || 'gray'} />
                </td>
                <td className="px-6 py-4">
                  <Badge label={ticket.category} variant="indigo" />
                </td>
                <td className="px-6 py-4">
                  <Badge
                    label={ticket.urgency}
                    variant={URGENCY_VARIANT[ticket.urgency?.toLowerCase()] || 'gray'}
                  />
                </td>
                <td className="px-6 py-4">
                  {ticket.assignment_reason ? (
                    <Badge
                      label={
                        ticket.assignment_reason === 'ai_suggested'
                          ? 'AI Suggested'
                          : ticket.assignment_reason === 'reassigned'
                          ? 'Reassigned'
                          : 'Manual'
                      }
                      variant={
                        ticket.assignment_reason === 'ai_suggested'
                          ? 'indigo'
                          : ticket.assignment_reason === 'reassigned'
                          ? 'yellow'
                          : 'gray'
                      }
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {ticket.assigned_at ? formatDate(ticket.assigned_at) : '—'}
                </td>
                <td className="px-4 py-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Unassigned (agent-only) ──────────────────────────────────────────────────

function Unassigned() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Backend already filters to own+unassigned for agents;
        // additionally filter status=open to show only actionable unassigned tickets.
        const data = await ticketService.getTickets({ status: 'open' });
        setTickets(data.filter((t) => !t.assigned_agent_id));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80">
        <RefreshCcw className="w-7 h-7 text-indigo-500 animate-spin mb-3" />
        <p className="text-slate-400 text-sm font-medium">Loading unassigned tickets…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-red-100">
        <AlertCircle className="w-9 h-9 text-red-400 mb-3" />
        <p className="text-red-600 font-medium mb-1 text-sm">Failed to load unassigned tickets</p>
        <p className="text-xs text-red-400 max-w-md text-center">{error}</p>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200/80">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3">
          <Inbox className="w-7 h-7 text-emerald-400" />
        </div>
        <p className="text-slate-900 font-semibold text-sm mb-1">All caught up</p>
        <p className="text-xs text-slate-400">No unassigned tickets right now</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {tickets.length} unassigned ticket{tickets.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Customer</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Subject</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Category</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Urgency</th>
              <th className="px-6 py-3 font-semibold text-[11px] uppercase tracking-wider text-slate-400">Created</th>
              <th className="px-6 py-3" aria-hidden="true" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                id={`unassigned-row-${ticket.id}`}
                onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors text-sm">
                      {ticket.customer_name}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">{ticket.customer_email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 text-sm">
                  <div className="truncate max-w-xs font-medium" title={ticket.subject}>
                    {ticket.subject}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge label={ticket.category} variant="indigo" />
                </td>
                <td className="px-6 py-4">
                  <Badge
                    label={ticket.urgency}
                    variant={URGENCY_VARIANT[ticket.urgency?.toLowerCase()] || 'gray'}
                  />
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {formatDate(ticket.created_at)}
                </td>
                <td className="px-4 py-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Tickets page ────────────────────────────────────────────────────────

export default function Tickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    category: searchParams.get('category') || '',
    urgency: searchParams.get('urgency') || ''
  };

  const activeTab = searchParams.get('tab') || 'all';

  // ── Per-ticket SSE connections kept for agents so ticket_assigned events
  // can be bubbled up as window events for the MyQueue component.
  // We open one SSE per ticket in the queue list when the my_queue tab is active.
  const sseRefs = useRef({});

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let data;
        if (activeTab === 'needs_review') {
          data = await ticketService.getNeedsReviewTickets();
        } else {
          data = await ticketService.getTickets(filters);
        }
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [filters.search, filters.status, filters.category, filters.urgency, activeTab]);

  // When the My Queue tab is active, open per-ticket SSE connections for
  // tickets in the agent's queue so assignment events bubble to MyQueue.
  // These are cleaned up when the tab changes or component unmounts.
  useEffect(() => {
    if (activeTab !== 'my_queue' || user?.role !== 'agent') return;

    const token = localStorage.getItem('token');
    const apiBase = import.meta.env.VITE_API_URL || '';

    const cleanupAll = () => {
      Object.values(sseRefs.current).forEach((es) => es.close());
      sseRefs.current = {};
    };

    // Re-subscribe when queue tickets change
    cleanupAll();

    tickets.forEach((ticket) => {
      if (sseRefs.current[ticket.id]) return;
      const es = new EventSource(`${apiBase}/tickets/${ticket.id}/stream?token=${token}`);
      es.onmessage = (event) => {
        if (event.data === 'ping') return;
        try {
          const updated = JSON.parse(event.data);
          if (updated._event === 'ticket_assigned') {
            window.dispatchEvent(new CustomEvent('agent:ticket_assigned', { detail: updated }));
          }
        } catch { /* ignore */ }
      };
      sseRefs.current[ticket.id] = es;
    });

    return cleanupAll;
  }, [activeTab, tickets, user?.role]);

  const updateSearchParams = useCallback((newFilters) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      let changed = false;
      
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          if (updated.get(key) !== value) {
            updated.set(key, value);
            changed = true;
          }
        } else {
          if (updated.has(key)) {
            updated.delete(key);
            changed = true;
          }
        }
      });
      
      return changed ? updated : prev;
    }, { replace: true });
  }, [setSearchParams]);

  const handleSearch = useCallback((searchTerm) => {
    updateSearchParams({ search: searchTerm });
  }, [updateSearchParams]);

  const handleFilterChange = useCallback((newFilters) => {
    updateSearchParams(newFilters);
  }, [updateSearchParams]);

  const handleClearFilters = useCallback(() => {
    updateSearchParams({ status: '', category: '', urgency: '' });
  }, [updateSearchParams]);

  const handleExport = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.urgency) queryParams.append('urgency', filters.urgency);

      const url = `/tickets/export?${queryParams.toString()}`;
      
      const response = await fetchWithAuth(url);
      if (!response.ok) throw new Error('Failed to export tickets');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'tickets_export.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export tickets. Please try again.');
    }
  };

  const isAgent = user?.role === 'agent';
  const isMyQueueTab = activeTab === 'my_queue';
  const isUnassignedTab = activeTab === 'unassigned';

  // Agents land on my_queue by default
  const effectiveTab = isAgent && activeTab === 'all' ? 'my_queue' : activeTab;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Tickets</h1>
          <p className="text-slate-400 text-sm mt-1">
            {isAgent ? 'Your assigned tickets and unassigned queue.' : 'Manage and view all customer support tickets.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Export is admin-only */}
          {user?.role === 'admin' && !isMyQueueTab && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-200 text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
        </div>
      </div>

      {/* Tabs — agents see My Queue + Unassigned only */}
      <div className="flex space-x-1 border-b border-slate-200">
        {isAgent ? (
          <>
            <button
              id="tab-my-queue"
              onClick={() => updateSearchParams({ tab: 'my_queue' })}
              className={`py-2.5 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors -mb-px ${
                effectiveTab === 'my_queue' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              My Queue
            </button>
            <button
              id="tab-unassigned"
              onClick={() => updateSearchParams({ tab: 'unassigned' })}
              className={`py-2.5 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors -mb-px ${
                effectiveTab === 'unassigned' ? 'border-slate-500 text-slate-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Mailbox className="w-4 h-4" />
              Unassigned
            </button>
          </>
        ) : (
          <>
            <button
              id="tab-all-tickets"
              onClick={() => updateSearchParams({ tab: 'all' })}
              className={`py-2.5 px-3 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === 'all' ? 'border-indigo-500 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
            >
              All Tickets
            </button>
            <button
              id="tab-needs-review"
              onClick={() => updateSearchParams({ tab: 'needs_review' })}
              className={`py-2.5 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors -mb-px ${activeTab === 'needs_review' ? 'border-violet-500 text-violet-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
            >
              <AlertCircle className="w-4 h-4" />
              Needs Review
            </button>
          </>
        )}
      </div>

      {/* Tab content */}
      {effectiveTab === 'my_queue' ? (
        <MyQueue currentUserId={user?.id} />
      ) : effectiveTab === 'unassigned' ? (
        <Unassigned />
      ) : (
        <>
          {/* Toolbar / Filters (admin only) */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200/80 items-start lg:items-center">
            <SearchBar
              onSearch={handleSearch}
              disabled={isLoading && tickets.length === 0}
              initialValue={filters.search}
            />
            <TicketFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              disabled={(isLoading && tickets.length === 0) || activeTab === 'needs_review'}
              onClear={handleClearFilters}
            />
          </div>

          {/* Main Table Content */}
          <TicketTable tickets={tickets} isLoading={isLoading} error={error} />
        </>
      )}
    </div>
  );
}
