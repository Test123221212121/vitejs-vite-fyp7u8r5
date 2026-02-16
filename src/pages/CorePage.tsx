import { Activity, CheckCircle2 } from 'lucide-react';

export function CorePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">AssetLink Core System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">System Status</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm">
            Core system is monitoring active sessions and data integrity.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Active Monitoring</h3>
              <p className="text-sm text-blue-600">All Systems Go</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm">
            Real-time monitoring of all connected services and data flows.
          </p>
        </div>
      </div>
    </div>
  );
}
