import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { Task } from '../types';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, tasks, companies, customers, refreshData } = useData();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Task['status'] | null>(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
  });

  const project = projects.find((p) => p.id === id);
  const company = companies.find((c) => c.id === project?.company_id);
  const customer = customers.find((c) => c.id === project?.customer_id);
  const projectTasks = tasks.filter((t) => t.project_id === id);

  if (!project) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Project niet gevonden</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
          Terug naar dashboard
        </button>
      </div>
    );
  }

  const columns: { status: Task['status']; title: string; color: string }[] = [
    { status: 'urgent', title: 'Urgent', color: 'red' },
    { status: 'todo', title: 'To Do', color: 'blue' },
    { status: 'doing', title: 'Doing', color: 'yellow' },
    { status: 'done', title: 'Done', color: 'green' },
  ];

  const handleAddTask = async (status: Task['status']) => {
    const { error } = await supabase.from('tasks').insert({
      id: `t${Date.now()}`,
      title: taskForm.title,
      description: taskForm.description,
      status,
      priority: taskForm.priority,
      project_id: id,
      customer_id: project.customer_id,
    });

    if (!error) {
      await refreshData();
      setIsAddingTask(null);
      setTaskForm({ title: '', description: '', status: 'todo', priority: 'medium' });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Weet je zeker dat je deze taak wilt verwijderen?')) {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (!error) {
        await refreshData();
      }
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', taskId);
    if (!error) {
      await refreshData();
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
    };
    return colors[color] || colors.blue;
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors: Record<Task['priority'], string> = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-100 text-blue-600',
      high: 'bg-orange-100 text-orange-600',
      critical: 'bg-red-100 text-red-600',
    };
    return colors[priority];
  };

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
      await handleUpdateTaskStatus(draggedTask.id, newStatus);
    }
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Terug
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                {company && (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: company.color }}
                    ></span>
                    {company.name}
                  </span>
                )}
                {customer && <span>Klant: {customer.name}</span>}
                <span
                  className={`px-2 py-1 rounded ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'planned'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Totaal taken</p>
              <p className="text-3xl font-bold text-gray-900">{projectTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => {
            const columnTasks = projectTasks.filter((t) => t.status === column.status);
            const colorClasses = getColorClasses(column.color);

            return (
              <div
                key={column.status}
                className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-lg p-4 transition-all ${
                  dragOverColumn === column.status ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, column.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`font-semibold ${colorClasses.text}`}>
                    {column.title} ({columnTasks.length})
                  </h2>
                  <button
                    onClick={() => setIsAddingTask(column.status)}
                    className={`p-1 ${colorClasses.text} hover:bg-white rounded`}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {isAddingTask === column.status && (
                  <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                    <input
                      type="text"
                      placeholder="Taak titel"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                      className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    />
                    <textarea
                      placeholder="Beschrijving"
                      value={taskForm.description}
                      onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                      className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                    <select
                      value={taskForm.priority}
                      onChange={(e) =>
                        setTaskForm({
                          ...taskForm,
                          priority: e.target.value as Task['priority'],
                        })
                      }
                      className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddTask(column.status)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Toevoegen
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingTask(null);
                          setTaskForm({
                            title: '',
                            description: '',
                            status: 'todo',
                            priority: 'medium',
                          });
                        }}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                      >
                        Annuleren
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className={`bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-move ${
                        draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 text-sm flex-1">{task.title}</h3>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task.id);
                            }}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        {task.ai_content && (
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                            AI
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beschrijving
                  </label>
                  <textarea
                    value={selectedTask.description || ''}
                    onChange={async (e) => {
                      const { error } = await supabase
                        .from('tasks')
                        .update({ description: e.target.value })
                        .eq('id', selectedTask.id);
                      if (!error) {
                        setSelectedTask({ ...selectedTask, description: e.target.value });
                        await refreshData();
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedTask.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value as Task['status'];
                      await handleUpdateTaskStatus(selectedTask.id, newStatus);
                      setSelectedTask({ ...selectedTask, status: newStatus });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioriteit</label>
                  <select
                    value={selectedTask.priority}
                    onChange={async (e) => {
                      const newPriority = e.target.value as Task['priority'];
                      const { error } = await supabase
                        .from('tasks')
                        .update({ priority: newPriority })
                        .eq('id', selectedTask.id);
                      if (!error) {
                        setSelectedTask({ ...selectedTask, priority: newPriority });
                        await refreshData();
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    AI Content
                  </label>
                  <textarea
                    value={selectedTask.ai_content || ''}
                    onChange={async (e) => {
                      const { error } = await supabase
                        .from('tasks')
                        .update({ ai_content: e.target.value, ai_updated_at: new Date().toISOString() })
                        .eq('id', selectedTask.id);
                      if (!error) {
                        setSelectedTask({ ...selectedTask, ai_content: e.target.value });
                        await refreshData();
                      }
                    }}
                    placeholder="AI kan hier content achterlaten..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    rows={6}
                  />
                  {selectedTask.ai_updated_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Laatst bijgewerkt:{' '}
                      {new Date(selectedTask.ai_updated_at).toLocaleString('nl-NL')}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Sluiten
                  </button>
                  <button
                    onClick={async () => {
                      await handleDeleteTask(selectedTask.id);
                      setSelectedTask(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
