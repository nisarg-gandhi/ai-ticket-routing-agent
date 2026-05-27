import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Download, AlertCircle } from 'lucide-react';
import ticketService from '../services/ticketService';
import TicketTable from '../components/TicketTable';
import SearchBar from '../components/SearchBar';
import TicketFilters from '../components/TicketFilters';
import { useAuth } from '../contexts/AuthContext';
import { fetchWithAuth } from '../utils/fetchWithAuth';

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

  useEffect(() => {
    const fetchTickets = async (silent = false) => {
      try {
        if (!silent) {
          setIsLoading(true);
          setError(null);
        }
        let data;
        if (activeTab === 'needs_review') {
          data = await ticketService.getNeedsReviewTickets();
        } else {
          data = await ticketService.getTickets(filters);
        }
        setTickets(data);
      } catch (err) {
        if (!silent) setError(err.message);
      } finally {
        if (!silent) setIsLoading(false);
      }
    };

    // Initial load — show spinner
    fetchTickets(false);

    // Poll every 10 s — silent, no spinner
    const intervalId = setInterval(() => fetchTickets(true), 10000);

    return () => clearInterval(intervalId);
  }, [filters.search, filters.status, filters.category, filters.urgency, activeTab]);

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Tickets</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and view all customer support tickets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all duration-200 text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-slate-200">
        <button
          onClick={() => updateSearchParams({ tab: 'all' })}
          className={`py-2.5 px-3 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === 'all' ? 'border-indigo-500 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
        >
          All Tickets
        </button>
        {(user?.role === 'admin' || user?.role === 'agent') && (
          <button
            onClick={() => updateSearchParams({ tab: 'needs_review' })}
            className={`py-2.5 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors -mb-px ${activeTab === 'needs_review' ? 'border-violet-500 text-violet-700' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
          >
            <AlertCircle className="w-4 h-4" />
            Needs Review
          </button>
        )}
      </div>

      {/* Toolbar / Filters */}
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
    </div>
  );
}
