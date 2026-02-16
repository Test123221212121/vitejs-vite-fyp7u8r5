import { useData } from '@/hooks/useData';
import { Link } from 'react-router-dom';

export function ProjectsView() {
  const { projects, getCompanyById, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Projects Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const company = project.company_id ? getCompanyById(project.company_id) : null;
          const color = company?.color || '#6366f1';

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-lg mb-1">
                    {project.name}
                  </h3>
                  {company && (
                    <p className="text-sm text-slate-500">{company.name}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : project.status === 'planned'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
