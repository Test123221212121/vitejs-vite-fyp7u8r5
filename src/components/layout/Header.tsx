import { Cloud } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div></div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Cloud size={16} className="text-green-500" />
        <span>Cloud Sync Active</span>
      </div>
    </header>
  );
}
