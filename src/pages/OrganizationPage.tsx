import React, { useState, useEffect } from 'react';
import { 
  Plus, ZoomIn, ZoomOut, Maximize2, ChevronDown, 
  Wrench, Book, FileText, Activity, Server,
  Globe, Terminal, Cpu, Shield, Zap, RefreshCw
} from 'lucide-react';

export function OrganizationPage() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['assetlink']);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [status, setStatus] = useState<any>(null);
  const [lastPing, setLastPing] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      // Trying to fetch from the local API
      const response = await fetch('/api/openclaw-status');
      if (!response.ok) throw new Error('API unreachable');
      const data = await response.json();
      setStatus(data);
      setLastPing(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      console.warn('Live agent data fetch failed, using cached/default view');
      setLastPing('Offline (using cache)');
      // We don't set error to null here, but we don't crash the UI
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // 15s Ping
    return () => clearInterval(interval);
  }, []);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  // Safe data access
  const modelName = status?.system?.model ? status.system.model.split('/').pop() : 'Claude 3.5 Sonnet';
  const systemVersion = status?.system?.version || '7.3';
  const isSystemActive = status?.system?.uptime === 'Active';
  const contextUsage = status?.system?.tokens?.context || '25%';
  const totalTokens = status?.system?.tokens?.total ? (status.system.tokens.total / 1000).toFixed(1) + 'k' : '51.2k';

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            Organization Network 
            <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full font-bold">v7.3</span>
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-slate-500 text-sm">Autonomous Agent Infrastructure</p>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold border border-indigo-100 shadow-sm">
              <RefreshCw size={10} className={status ? "animate-spin" : ""} />
              LIVE PING: {lastPing || 'Initializing...'}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm font-bold">
            <Plus size={18} />
            Add Node
          </button>
          <div className="flex bg-white rounded-xl border border-slate-200 shadow-sm p-1">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" onClick={() => setZoomLevel(z => Math.min(z + 0.1, 1.5))}>
              <ZoomIn size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.5))}>
              <ZoomOut size={18} />
            </button>
            <div className="border-l border-slate-100 mx-1"></div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" onClick={() => setZoomLevel(1)}>
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-[2.5rem] border-2 border-slate-200 relative overflow-hidden shadow-inner">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 opacity-[0.3]" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)`,
               backgroundSize: `${24 * zoomLevel}px ${24 * zoomLevel}px` 
             }}>
        </div>

        <div className="relative h-full p-20 transition-all duration-500 origin-top-left"
             style={{ transform: `scale(${zoomLevel})` }}>
          
          {/* CEO Node */}
          <div className="absolute left-20 top-20 w-80 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
             <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
                      <Shield size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Visionary</div>
                      <div className="font-bold text-slate-800 text-lg">Ayoub</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    MASTER
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="https://ui-avatars.com/api/?name=Ayoub&background=6366f1&color=fff" className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white" alt="Ayoub" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[95%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400">
                      <span>SYNC</span>
                      <span className="text-indigo-600 uppercase">ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer z-10">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
             </div>
          </div>

          <div className="absolute left-[400px] top-[150px] w-60 h-[3px] bg-gradient-to-r from-indigo-500 via-blue-400 to-blue-600 opacity-30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"></div>

          {/* AssetLink AI Node */}
          <div className={`absolute left-[640px] top-20 transition-all duration-500 ${expandedNodes.includes('assetlink') ? 'w-[500px]' : 'w-80'} group`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Core Logic</div>
                    <div className="font-extrabold text-slate-800 text-lg leading-none">AssetLink AI</div>
                  </div>
                </div>
                <button onClick={() => toggleNode('assetlink')} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-blue-600">
                  <ChevronDown className={`transition-transform duration-500 ${expandedNodes.includes('assetlink') ? 'rotate-180' : ''}`} size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-5 mb-4">
                  <div className="relative">
                    <img src="https://ui-avatars.com/api/?name=AL&background=2563eb&color=fff" className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white ring-4 ring-blue-50" alt="AssetLink" />
                    <div className={`absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md ${isSystemActive ? 'text-blue-600' : 'text-slate-400'}`}>
                      <Cpu size={14} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg leading-tight truncate">{modelName}</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">v{systemVersion}</p>
                  </div>
                </div>

                {expandedNodes.includes('assetlink') && (
                  <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Context', value: contextUsage, color: 'text-indigo-600' },
                        { label: 'Total Tokens', value: totalTokens, color: 'text-blue-600' },
                        { label: 'Latency', value: '1.2s', color: 'text-green-600' }
                      ].map(m => (
                        <div key={m.label} className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-center shadow-sm">
                          <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">{m.label}</div>
                          <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Wrench size={14} className="text-blue-500" /> Active System Tools
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {['browser', 'exec', 'write', 'read'].map(tool => (
                          <div key={tool} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center gap-3 hover:bg-white hover:shadow-sm transition-all cursor-default group/tool">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/tool:scale-150 transition-transform"></div>
                            <span className="text-xs font-bold text-slate-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={14} className="text-blue-500" /> Knowledge Base
                      </span>
                      <div className="space-y-1.5">
                        {['AGENTS.md', 'MEMORY.md', 'SOUL.md'].map(file => (
                          <div key={file} className="flex justify-between items-center px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl group/file cursor-pointer hover:bg-white hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                              <Database size={14} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-600">{file}</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 opacity-0 group-hover/file:opacity-100 transition-opacity uppercase">Read</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${isSystemActive ? 'bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-300'}`}></div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Synchronized</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-slate-400 transition-all active:scale-90"><Globe size={16} /></button>
                      <button className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-90"><Settings size={16} /></button>
                   </div>
                </div>
              </div>
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
