import { useData } from '@/hooks/useData';
import { CheckCircle2, Circle } from 'lucide-react';

export function LifeOSView() {
  const { routines, tasks, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-accent"></div>
      </div>
    );
  }

  const focusTasks = tasks.filter((t) => t.status === 'urgent' || t.status === 'todo').slice(0, 5);

  const routinesByTime = {
    morning: routines.filter((r) => r.time === 'morning'),
    day: routines.filter((r) => r.time === 'day'),
    evening: routines.filter((r) => r.time === 'evening'),
    weekly: routines.filter((r) => r.time === 'weekly'),
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">LifeOS Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Daily Routines</h3>
          <div className="space-y-4">
            {Object.entries(routinesByTime).map(([time, items]) => (
              <div key={time}>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {time}
                </div>
                <div className="space-y-2">
                  {items.map((routine) => (
                    <div
                      key={routine.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {routine.completed ? (
                        <CheckCircle2 size={20} className="text-green-500" />
                      ) : (
                        <Circle size={20} className="text-slate-300" />
                      )}
                      <span className="text-lg">{routine.icon}</span>
                      <span className="text-slate-700">{routine.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Focus Tasks</h3>
          <div className="space-y-3">
            {focusTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      task.status === 'urgent' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{task.title}</div>
                    {task.priority && (
                      <div className="text-xs text-slate-500 mt-1">{task.priority.toUpperCase()}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
