import { useData } from '@/hooks/useData';
import { Link } from 'react-router-dom';

export function CompaniesView() {
  const { companies, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Companies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link
            key={company.id}
            to={`/companies/${company.id}`}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: company.color }}
              >
                {company.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 text-lg">
                  {company.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {company.color}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
