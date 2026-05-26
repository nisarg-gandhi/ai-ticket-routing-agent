import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

// ── Triage wordmark matching the landing page exactly ───────────────────────
function TriageLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg
        bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L9 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H5L7 1Z"
            fill="white" fillOpacity="0.95" />
        </svg>
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-slate-900">Triage</span>
    </div>
  );
}

export default function UserLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
        {/* Logo */}
        <button
          className="cursor-pointer focus:outline-none"
          onClick={() => navigate('/user/dashboard')}
        >
          <TriageLogo />
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-slate-900 leading-none">{user?.name || 'User'}</span>
            <span className="text-xs text-slate-400 mt-0.5">{user?.email}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-semibold text-sm shadow-sm shadow-indigo-500/25 ring-2 ring-white uppercase select-none">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
