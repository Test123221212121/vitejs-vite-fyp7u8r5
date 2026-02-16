import React, { useState, useEffect } from 'react';
import { 
  Plus, ZoomIn, ZoomOut, Maximize2, ChevronDown, 
  Wrench, Book, FileText, Activity, Server,
  Globe, Terminal, Cpu, Shield, Zap
} from 'lucide-react';

export function OrganizationPage() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['assetlink']);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Organization Network</h2>
          <p className="text-slate-500 mt-1">Autonomous Agent Infrastructure & Node Management</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-200 active:scale-95">
            <Plus size={18} />
            Add Node
          </button>
          <div className="flex bg-white rounded-xl border border-slate-200 shadow-sm p-1">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" title="Zoom In" onClick={() => setZoomLevel(z => Math.min(z + 0.1, 1.5))}>
              <ZoomIn size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" title="Zoom Out" onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.5))}>
              <ZoomOut size={18} />
            </button>
            <div className="border-l border-slate-100 mx-1"></div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors" title="Reset Zoom" onClick={() => setZoomLevel(1)}>
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-[2rem] border-2 border-slate-200 relative overflow-hidden shadow-inner">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 opacity-[0.4]" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)`,
               backgroundSize: `${24 * zoomLevel}px ${24 * zoomLevel}px` 
             }}>
        </div>

        <div className={`relative h-full p-20 transition-all duration-500 origin-top-left ${mounted ? 'opacity-100' : 'opacity-0'}`}
             style={{ transform: `scale(${zoomLevel})` }}>
          
          {/* CEO Node - Ayoub */}
          <div className="absolute left-20 top-20 w-80 group">
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                      <Shield size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Chief Executive</div>
                      <div className="font-bold text-slate-800 text-lg">Ayoub</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    MASTER
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src="https://ui-avatars.com/api/?name=Ayoub&background=6366f1&color=fff" className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white" alt="Ayoub" />
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-sm border border-slate-100 text-indigo-600">
                      <Zap size={12} fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[95%]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Sync Status</span>
                        <span className="text-indigo-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                        P{i}
                      </div>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <Terminal size={14} />
                  </div>
                </div>
                
                {/* Port */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
             </div>
          </div>

          {/* Connection Line with Gradient */}
          <div className="absolute left-[400px] top-[150px] w-60 h-[3px] bg-gradient-to-r from-indigo-500 via-blue-400 to-blue-600 opacity-40 shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>

          {/* AssetLink AI Node */}
          <div className={`absolute left-[640px] top-20 transition-all duration-500 ${expandedNodes.includes('assetlink') ? 'w-[500px]' : 'w-80'} group`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Core Logic</div>
                    <div className="font-extrabold text-slate-800 text-lg leading-none">AssetLink AI</div>
                  </div>
                </div>
                <button 
                  onClick={() => toggleNode('assetlink')}
                  className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-blue-600"
                >
                  <ChevronDown className={`transition-transform duration-500 ${expandedNodes.includes('assetlink') ? 'rotate-180' : ''}`} size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-5 mb-4">
                  <div className="relative">
                    <img src="https://ui-avatars.com/api/?name=AL&background=2563eb&color=fff" className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white ring-4 ring-blue-50" alt="AssetLink" />
                    <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md text-blue-600">
                      <Cpu size={14} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">Claude 3.5 Sonnet</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">Autonomous Steward v7.2</p>
                  </div>
                </div>

                {expandedNodes.includes('assetlink') && (
                  <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Tools Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Wrench size={14} className="text-blue-500" /> System Tools
                        </span>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">15 Active</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {['browser', 'exec', 'write', 'read'].map(tool => (
                          <div key={tool} className="bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 p-2.5 rounded-xl flex items-center gap-3 transition-all cursor-default group/tool">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/tool:scale-125 transition-transform"></div>
                            <span className="text-xs font-bold text-slate-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Latency', value: '1.2s', color: 'text-green-600' },
                        { label: 'Load', value: '14%', color: 'text-blue-600' },
                        { label: 'Uptime', value: '100%', color: 'text-indigo-600' }
                      ].map(m => (
                        <div key={m.label} className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-center">
                          <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">{m.label}</div>
                          <div className={`text-sm font-black ${m.color}`}>{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Files Section */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={14} className="text-blue-500" /> Critical Memory
                      </span>
                      <div className="space-y-2">
                        {['AGENTS.md', 'MEMORY.md', 'SOUL.md'].map(file => (
                          <div key={file} className="flex justify-between items-center px-4 py-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all group/file cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover/file:text-blue-600 transition-colors">
                                <Database size={14} />
                              </div>
                              <span className="text-xs font-bold text-slate-700">{file}</span>
                            </div>
                            <Plus size={14} className="text-slate-300 opacity-0 group-hover/file:opacity-100 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Synchronized</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition-all active:scale-90">
                        <Globe size={16} />
                      </button>
                      <button className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-90">
                        <Settings size={16} />
                      </button>
                   </div>
                </div>
              </div>
              
              {/* Ports */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-4">
          <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-[2rem] border border-white/10 shadow-2xl text-white flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Activity size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-1">Network</div>
                <div className="font-bold text-sm leading-none">Optimal</div>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <div className="text-[9px] font-bold text-white/40 uppercase mb-0.5">Active Nodes</div>
                <div className="text-sm font-bold">12 Agentic</div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/40 uppercase mb-0.5">Throughput</div>
                <div className="text-sm font-bold">1.4 MB/s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Minimap Overlay */}
        <div className="absolute bottom-8 right-8 w-64 h-44 bg-white/90 backdrop-blur-md border border-slate-200 rounded-[2rem] shadow-2xl p-4 overflow-hidden pointer-events-none border-b-4 border-b-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Layers size={14} className="text-indigo-500" /> Topology Map
            </div>
            <div className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">v7.2</div>
          </div>
          <div className="relative w-full h-full border border-slate-100 rounded-2xl bg-slate-50/50 p-2">
            <div className="absolute left-4 top-4 w-10 h-6 bg-indigo-600/20 border border-indigo-600/50 rounded-lg"></div>
            <div className="absolute left-20 top-4 w-12 h-10 bg-blue-500/20 border border-blue-500/50 rounded-lg"></div>
            <div className="absolute left-10 top-16 w-8 h-8 bg-violet-400/20 border border-violet-400/50 rounded-full"></div>
            <div className="absolute left-28 top-16 w-6 h-6 bg-cyan-400/20 border border-cyan-400/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
