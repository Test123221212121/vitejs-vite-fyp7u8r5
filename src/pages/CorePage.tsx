import React, { useState, useEffect } from 'react';
import { 
  Activity, CheckCircle2, Server, Cpu, Database, 
  Terminal, Clock, AlertTriangle, ShieldCheck, 
  Zap, BarChart3, Layers, Bot, MessageSquare,
  Settings, ExternalLink, RefreshCw
} from 'lucide-react';

export function CorePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/openclaw-status');
      const data = await response.json();
      setStatus(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch OpenClaw status:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', name: 'System Overview', icon: Layers },
    { id: 'sessions', name: 'Active Sessions', icon: MessageSquare },
    { id: 'nodes', name: 'Nodes & Skills', icon: Bot },
    { id: 'automation', name: 'Automation', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-indigo-600">
          <RefreshCw size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" size={32} />
            AssetLink Core System
          </h2>
          <p className="text-slate-500 mt-1">Autonomous monitoring & system intelligence</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            CORE ONLINE
          </div>
          <button 
            onClick={fetchStatus}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-slate-100/50 p-1 rounded-xl border border-slate-200 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
              : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* System Metrics */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Storage</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">4.2 GB</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-indigo-500 h-full w-[65%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">65% Capacity Used</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Cpu size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processing</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">12.4%</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-500 h-full w-[12.4%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Optimal Load</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Zap size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">API Quota</span>
              </div>
              <div className="text-2xl font-bold text-slate-800">892/1k</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-amber-500 h-full w-[89.2%] rounded-full"></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Token Usage (Today)</p>
            </div>

            {/* System Status Table */}
            <div className="col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-bottom border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Running Processes</h3>
                <Terminal size={16} className="text-slate-400" />
              </div>
              <div className="divide-y divide-slate-100">
                {status?.processes?.map((proc: any, i: number) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${proc.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-slate-300'}`}></div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{proc.name}</div>
                        <div className="text-[11px] text-slate-400">{proc.details}</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                      PID: {proc.pid || '---'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Activity size={14} /> Live Intelligence
                </div>
                <div className="space-y-4">
                  {status?.activity?.map((act: any, i: number) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase">{act.time}</div>
                      <div className="text-sm text-slate-300 leading-tight">
                        {act.event}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-xs font-bold transition-colors">
                  View Full Audit Log
                </button>
              </div>
              {/* Background Glow */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Model Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">Active Model</h3>
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Bot size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Claude 3.5 Sonnet</div>
                  <div className="text-[11px] text-slate-500">v20241022 • Anthropic</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Context</div>
                  <div className="text-sm font-bold text-slate-700">200k tokens</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Latency</div>
                  <div className="text-sm font-bold text-slate-700">~1.2s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-6">
            <Settings size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{tabs.find(t => t.id === activeTab)?.name}</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            This module is being initialized by the Core Agent. Visual data stream will be available shortly.
          </p>
          <button className="mt-8 text-indigo-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            Open Advanced Console <ExternalLink size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
