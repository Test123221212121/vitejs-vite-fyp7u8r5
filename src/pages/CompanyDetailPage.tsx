import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { supabase } from '../lib/supabase';
import { Building2, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { companies, projects, customers, refreshData } = useData();
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const company = companies.find((c) => c.id === id);
  const companyProjects = projects.filter((p) => p.company_id === id);

  const [companyForm, setCompanyForm] = useState({
    name: company?.name || '',
    color: company?.color || '#3b82f6',
  });

  const [projectForm, setProjectForm] = useState({
    name: '',
    customer_id: '',
    status: 'planned' as 'active' | 'planned' | 'completed',
  });

  if (!company) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Company niet gevonden</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
          Terug naar dashboard
        </button>
      </div>
    );
  }

  const handleUpdateCompany = async () => {
    const { error } = await supabase
      .from('companies')
      .update({
        name: companyForm.name,
        color: companyForm.color,
      })
      .eq('id', id);

    if (!error) {
      await refreshData();
      setIsEditingCompany(false);
    }
  };

  const handleDeleteCompany = async () => {
    if (confirm('Weet je zeker dat je deze company wilt verwijderen?')) {
      const { error } = await supabase.from('companies').delete().eq('id', id);
      if (!error) {
        navigate('/');
      }
    }
  };

  const handleAddProject = async () => {
    const { error } = await supabase.from('projects').insert({
      id: `p${Date.now()}`,
      name: projectForm.name,
      company_id: id,
      customer_id: projectForm.customer_id || null,
      status: projectForm.status,
    });

    if (!error) {
      await refreshData();
      setIsAddingProject(false);
      setProjectForm({ name: '', customer_id: '', status: 'planned' });
    }
  };

  const handleUpdateProject = async (projectId: string) => {
    const { error } = await supabase
      .from('projects')
      .update({
        name: projectForm.name,
        customer_id: projectForm.customer_id || null,
        status: projectForm.status,
      })
      .eq('id', projectId);

    if (!error) {
      await refreshData();
      setEditingProject(null);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Weet je zeker dat je dit project wilt verwijderen?')) {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);
      if (!error) {
        await refreshData();
      }
    }
  };

  const startEditProject = (project: any) => {
    setProjectForm({
      name: project.name,
      customer_id: project.customer_id || '',
      status: project.status,
    });
    setEditingProject(project.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Terug
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {isEditingCompany ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Bewerken</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kleur</label>
                  <input
                    type="color"
                    value={companyForm.color}
                    onChange={(e) => setCompanyForm({ ...companyForm, color: e.target.value })}
                    className="w-20 h-10 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateCompany}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Opslaan
                  </button>
                  <button
                    onClick={() => setIsEditingCompany(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: company.color + '20' }}
                  >
                    <Building2 size={24} style={{ color: company.color }} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                    <p className="text-sm text-gray-500">
                      {companyProjects.length} project{companyProjects.length !== 1 ? 'en' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCompanyForm({ name: company.name, color: company.color });
                      setIsEditingCompany(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={handleDeleteCompany}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Projecten</h2>
            <button
              onClick={() => setIsAddingProject(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} />
              Nieuw Project
            </button>
          </div>

          {isAddingProject && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-3">Nieuw Project</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Klant</label>
                  <select
                    value={projectForm.customer_id}
                    onChange={(e) => setProjectForm({ ...projectForm, customer_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Selecteer klant</option>
                    {customers
                      .filter((c) => c.company_id === id)
                      .map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        status: e.target.value as 'active' | 'planned' | 'completed',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="planned">Planned</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Toevoegen
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingProject(false);
                      setProjectForm({ name: '', customer_id: '', status: 'planned' });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {companyProjects.map((project) => {
              const customer = customers.find((c) => c.id === project.customer_id);
              const isEditing = editingProject === project.id;

              return (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
                        <input
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Klant</label>
                        <select
                          value={projectForm.customer_id}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, customer_id: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Selecteer klant</option>
                          {customers
                            .filter((c) => c.company_id === id)
                            .map((customer) => (
                              <option key={customer.id} value={customer.id}>
                                {customer.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={projectForm.status}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              status: e.target.value as 'active' | 'planned' | 'completed',
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="planned">Planned</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateProject(project.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Opslaan
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Annuleren
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Link to={`/projects/${project.id}`} className="flex-1">
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-500">
                              {customer ? customer.name : 'Geen klant'}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
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
                      </Link>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {companyProjects.length === 0 && !isAddingProject && (
              <p className="text-center text-gray-500 py-8">Nog geen projecten</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
