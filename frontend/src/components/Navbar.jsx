import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets, customers, or articles..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-sm text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 leading-none">Jane Doe</p>
            <p className="text-xs text-gray-500 mt-1">Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-white">
            JD
          </div>
        </button>
      </div>
    </header>
  );
}
