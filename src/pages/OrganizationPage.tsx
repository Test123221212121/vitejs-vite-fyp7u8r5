import React, { useState } from 'react';
import { Settings, Plus, Layout, ZoomIn, ZoomOut, Maximize2, MoreHorizontal, ChevronDown, Wrench, Book, FileText, Activity } from 'lucide-react';

export function OrganizationPage() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['assetlink']);
  const [zoomLevel, setZoomLevel] = useState(1);

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
          <p className="text-slate-500 mt-1">Manage and monitor your AI agent infrastructure</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
            <Plus size={18} />
            Add Agent
          </button>
          <div className="flex bg-white rounded-lg border border-slate-200 shadow-sm p-1">
            <button className="p-2 hover:bg-slate-50 rounded-md text-slate-600" onClick={() => setZoomLevel(z => Math.min(z + 0.1, 1.5))}>
              <ZoomIn size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-md text-slate-600" onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.5))}>
              <ZoomOut size={18} />
            </button>
            <div className="border-l border-slate-200 mx-1"></div>
            <button className="p-2 hover:bg-slate-50 rounded-md text-slate-600" onClick={() => setZoomLevel(1)}>
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 relative overflow-hidden">
        {/* Canvas Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
               backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px` 
             }}>
        </div>

        <div className="relative h-full p-12 transition-transform duration-200 origin-top-left"
             style={{ transform: `scale(${zoomLevel})` }}>
          
          {/* CEO Node */}
          <div className="absolute left-10 top-10 w-72 bg-white rounded-xl border-2 border-indigo-500 shadow-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold">👑</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visionary</div>
                <div className="font-bold text-slate-800">CEO</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://ui-avatars.com/api/?name=Ayoub&background=6366f1&color=fff" className="w-12 h-12 rounded-full ring-2 ring-indigo-50" alt="Ayoub" />
              <div>
                <h4 className="font-bold text-slate-800 leading-tight">Ayoub</h4>
                <p className="text-sm text-slate-500">Strategy & Vision</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
              <div className="w-4 h-4 rounded-full bg-indigo-500 cursor-pointer hover:scale-125 transition-transform"></div>
            </div>
          </div>

          {/* Connection Lines (Simulated with div borders for simplicity in this React view) */}
          <div className="absolute left-80 top-24 w-40 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500 opacity-30"></div>

          {/* AssetLink Node */}
          <div className={`absolute left-[440px] top-10 w-80 bg-white rounded-xl border-2 border-blue-500 shadow-xl transition-all duration-300 ${expandedNodes.includes('assetlink') ? 'w-[450px]' : 'w-80'}`}>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 font-bold">🤖</div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Engine</div>
                  <div className="font-bold text-slate-800">AssetLink AI</div>
                </div>
                <button onClick={() => toggleNode('assetlink')} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
                  <ChevronDown className={`transition-transform duration-300 ${expandedNodes.includes('assetlink') ? 'rotate-180' : ''}`} size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <img src="https://ui-avatars.com/api/?name=AL&background=3b82f6&color=fff" className="w-12 h-12 rounded-full ring-2 ring-blue-50" alt="AssetLink" />
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">Claude 3.5 Sonnet</h4>
                  <p className="text-sm text-slate-500">Primary Steward</p>
                </div>
              </div>

              {expandedNodes.includes('assetlink') && (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                      <Wrench size={14} /> Tools (15)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['read', 'write', 'browser', 'exec'].map(tool => (
                        <div key={tool} className="bg-slate-50 border border-slate-200 p-2 rounded-lg flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                          <span className="font-medium text-slate-700">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                      <Book size={14} /> Skills (8)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Agent Browser', 'Weather', 'Image Gen', 'Whisper'].map(skill => (
                        <div key={skill} className="bg-blue-50 border border-blue-100 p-2 rounded-lg flex items-center gap-2 text-blue-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          <span className="font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                      <FileText size={14} /> Critical Memory
                    </div>
                    <div className="space-y-1">
                      {['AGENTS.md', 'MEMORY.md', 'SOUL.md'].map(file => (
                        <div key={file} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg group transition-colors">
                          <span className="text-xs font-medium text-slate-600">{file}</span>
                          <button className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase">Health</span>
                    <span className="text-xs font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase">Tasks</span>
                    <span className="text-xs font-bold text-slate-700">3</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-slate-200 cursor-pointer hover:bg-blue-500 transition-colors"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 cursor-pointer hover:scale-125 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimap Overlay */}
        <div className="absolute bottom-4 right-4 w-48 h-32 bg-white/80 backdrop-blur border border-slate-200 rounded-xl shadow-lg p-2 overflow-hidden pointer-events-none">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Network Minimap</div>
          <div className="relative w-full h-full border border-slate-100 rounded bg-slate-50/50">
            <div className="absolute left-2 top-2 w-6 h-4 bg-indigo-500/20 border border-indigo-500/50 rounded-sm"></div>
            <div className="absolute left-10 top-2 w-8 h-8 bg-blue-500/20 border border-blue-500/50 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
