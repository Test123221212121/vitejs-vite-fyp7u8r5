import { useState } from 'react';
import { useData } from '@/hooks/useData';
import { supabase } from '@/lib/supabase';
import type { Task } from '@/types';
import { Flame, ListTodo, Zap, CheckCircle } from 'lucide-react';

export function KanbanBoard() {
  const { tasks, projects, getProjectById, getCompanyById, loading, refreshData } = useData();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Task['status'] | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-accent"></div>
      </div>
    );
  }

  const columns: { id: Task['status']; title: string; icon: any; color: string }[] = [
    { id: 'urgent', title: 'Urgent', icon: Flame, color: 'text-red-600' },
    { id: 'todo', title: 'To Do', icon: ListTodo, color: 'text-blue-600' },
    { id: 'doing', title: 'In Progress', icon: Zap, color: 'text-amber-600' },
    { id: 'done', title: 'Done', icon: CheckCircle, color: 'text-green-600' },
  ];

  const filteredTasks = selectedProject
    ? tasks.filter(t => t.project_id === selectedProject)
    : tasks;

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (draggedTask && draggedTask.status !== newStatus) {
      const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', draggedTask.id);
      if (!error) {
        await refreshData();
      }
    }
    setDraggedTask(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Kanban Board</h2>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTasks = filteredTasks.filter(t => t.status === column.id);

          return (
            <div
              key={column.id}
              className={`bg-slate-100 rounded-xl p-4 transition-all ${
                dragOverColumn === column.id ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className={column.color} size={20} />
                <h3 className="font-semibold text-slate-700">{column.title}</h3>
                <span className="ml-auto text-sm text-slate-500">{columnTasks.length}</span>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => {
                  const project = task.project_id ? getProjectById(task.project_id) : null;
                  const company = project?.company_id ? getCompanyById(project.company_id) : null;
                  const color = company?.color || '#6366f1';

                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-move border border-slate-200 ${
                        draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      {task.priority && (
                        <div
                          className="inline-block px-2 py-1 rounded text-xs font-medium mb-2"
                          style={{
                            backgroundColor: `${color}20`,
                            color: color,
                          }}
                        >
                          {task.priority.toUpperCase()}
                        </div>
                      )}
                      <div className="text-sm font-medium text-slate-800 mb-2">
                        {task.title || 'Untitled Task'}
                      </div>
                      {project && (
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          📂 {project.name}
                        </div>
                      )}
                      {task.description && (
                        <div className="text-xs text-slate-400 mt-2 line-clamp-2">
                          {task.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
