import { useState } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Inbox
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Inbox, label: 'Inbox', badge: '12' },
    { icon: Ticket, label: 'Tickets' },
    { icon: Users, label: 'Customers' },
    { icon: BarChart3, label: 'Reports' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2 font-bold text-lg text-gray-900">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              AI
            </div>
            <span>TicketRoute</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${item.active ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-900'}`} />
                {!isCollapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className="bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
