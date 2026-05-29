import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// ── Triage wordmark matching the landing page exactly ───────────────────────
function TriageLogo({ collapsed }) {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Logo mark — gradient + star SVG, identical to landing page */}
      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg
        bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/25">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L9 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H5L7 1Z"
            fill="white" fillOpacity="0.95" />
        </svg>
      </span>
      {!collapsed && (
        <span className="text-[1.05rem] font-semibold tracking-tight text-slate-900">Triage</span>
      )}
    </div>
  );
}

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Ticket, label: 'Tickets', path: '/admin/tickets' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'Customers', path: '/admin/customers' }] : []),
    ...(user?.role === 'admin' ? [{ icon: BarChart3, label: 'Reports', path: '/admin/reports' }] : [])
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <aside 
        className={`bg-white border-r border-slate-200/80 transition-all duration-300 flex flex-col h-screen fixed md:sticky top-0 z-50 ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${mobileMenuOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'}`}
      >
        {/* Header — wordmark */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <TriageLogo collapsed={isCollapsed && !mobileMenuOpen} />
          </div>

          {/* Collapse toggle (desktop) */}
          {(!isCollapsed || mobileMenuOpen) && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {isCollapsed && !mobileMenuOpen && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full hidden md:flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer shadow-sm z-50"
              title="Expand sidebar"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-0.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                  title={isCollapsed && !mobileMenuOpen ? item.label : undefined}
                  onClick={() => {
                    if (mobileMenuOpen) setMobileMenuOpen(false);
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                        isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`} />
                      {(!isCollapsed || mobileMenuOpen) && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {/* Active indicator bar */}
                      {isActive && (!isCollapsed || mobileMenuOpen) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer — user info & role badge */}
        <div className="border-t border-slate-200/80 p-4">
          {(!isCollapsed || mobileMenuOpen) && (
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-900 truncate">{user?.name || 'User'}</span>
                <span className="text-xs text-slate-400 capitalize mt-0.5">{user?.role || 'user'}</span>
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full flex-shrink-0 ${
                user?.role === 'admin'
                  ? 'bg-violet-100 text-violet-700'
                  : user?.role === 'agent'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {user?.role || 'user'}
              </span>
            </div>
          )}
          {isCollapsed && !mobileMenuOpen && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-semibold text-sm uppercase">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
