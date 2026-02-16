import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Trello,
  Rocket,
  Building2,
  Newspaper,
  Server,
  Users,
  Zap
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', section: 'Main' },
  { to: '/kanban', icon: Trello, label: 'Kanban Board', section: 'Main' },
  { to: '/projects', icon: Rocket, label: 'Projects', section: 'Business' },
  { to: '/companies', icon: Building2, label: 'Companies', section: 'Business' },
  { to: '/news', icon: Newspaper, label: 'News Feed', section: 'Intelligence' },
  { to: '/core', icon: Server, label: 'AssetLink Core', section: 'Intelligence' },
  { to: '/organization', icon: Users, label: 'Organization', section: 'Intelligence' },
  { to: '/lifeos', icon: Zap, label: 'LifeOS', section: 'Personal' },
];

export function Sidebar() {
  let currentSection = '';

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-2xl">🛠️</span>
          AssetLink OS
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const showSection = currentSection !== item.section;
          currentSection = item.section;
          const Icon = item.icon;

          return (
            <div key={item.to}>
              {showSection && (
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2 mt-4 first:mt-0">
                  {item.section}
                </div>
              )}
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button className="w-full px-4 py-2 bg-gradient-to-r from-accent to-accent-light text-white rounded-lg text-sm font-medium hover:shadow-glow transition-shadow">
          💾 Export Backup
        </button>
      </div>
    </aside>
  );
}
