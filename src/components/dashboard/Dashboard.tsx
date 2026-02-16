import { useData } from '@/hooks/useData';
import { ListTodo, AlertCircle, CheckCircle2, Rocket } from 'lucide-react';

export function Dashboard() {
  const { tasks, projects, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-accent"></div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Todo Tasks',
      value: tasks.filter(t => t.status === 'todo').length,
      icon: ListTodo,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Urgent Today',
      value: tasks.filter(t => t.status === 'urgent').length,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
    },
    {
      label: 'Done',
      value: tasks.filter(t => t.status === 'done').length,
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Active Projects',
      value: projects.filter(p => p.status === 'active').length,
      icon: Rocket,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Executive Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
