import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import ticketService from '../services/ticketService';
import TicketTable from '../components/TicketTable';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch tickets from the backend
        const data = await ticketService.getTickets();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-500 mt-1">Manage and view all customer support tickets.</p>
        </div>
        <Link
          to="/tickets/new"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-100 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          New Ticket
        </Link>
      </div>

      {/* Toolbar / Filters (UI Only) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow text-sm"
            disabled={isLoading || error}
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            disabled={isLoading || error}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Filter className="w-4 h-4 text-gray-500" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Table Content */}
      <TicketTable tickets={tickets} isLoading={isLoading} error={error} />
    </div>
  );
}
