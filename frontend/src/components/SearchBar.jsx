import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, disabled, initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Sync internal state if initialValue is explicitly cleared
  useEffect(() => {
    if (initialValue === '' && searchTerm !== '') {
      setSearchTerm('');
    }
  }, [initialValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only call onSearch if the searchTerm is actually different from initialValue 
      // to avoid infinite update loops
      if (searchTerm !== initialValue) {
        onSearch(searchTerm);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, initialValue, onSearch]);

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-sm text-slate-800 placeholder-slate-400 bg-white"
        disabled={disabled}
      />
    </div>
  );
}
