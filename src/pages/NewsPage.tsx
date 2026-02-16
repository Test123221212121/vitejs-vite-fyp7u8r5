import React, { useState } from 'react';
import { Calendar, ChevronRight, Share2, Bookmark, Clock, ExternalLink } from 'lucide-react';

export function NewsPage() {
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = [
    { name: 'Today', date: 'Feb 16' },
    { name: 'Yesterday', date: 'Feb 15' },
    { name: 'Saturday', date: 'Feb 14' },
    { name: 'Friday', date: 'Feb 13' },
    { name: 'Thursday', date: 'Feb 12' }
  ];

  const newsItems = [
    {
      id: 1,
      category: 'AI & Engineering',
      title: 'How AI is Transforming Construction Monitoring',
      excerpt: 'New models are now capable of analyzing site footage to detect safety violations and track progress with 98% accuracy...',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
      source: 'Engineering Weekly',
      time: '2h ago',
      featured: true
    },
    {
      id: 2,
      category: 'Business',
      title: 'Asset Management: The Move to Visual Workflows',
      excerpt: 'Companies are abandoning spreadsheets for interactive node-based systems to manage infrastructure lifecycle...',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      source: 'TechCrunch',
      time: '4h ago'
    },
    {
      id: 3,
      category: 'Software',
      title: 'Vite 6.0 Released: What it means for React Developers',
      excerpt: 'The latest version brings significant improvements to cold starts and HMR performance for large scale enterprise apps...',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      source: 'Dev.to',
      time: '6h ago'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">News Feed</h2>
          <p className="text-slate-500 mt-1">Curated intelligence for AssetLink OS</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          {days.map(day => (
            <button
              key={day.name}
              onClick={() => setSelectedDay(day.name)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedDay === day.name 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {day.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Featured Story */}
        <div className="col-span-12 lg:col-span-8">
          <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer">
            <div className="aspect-[21/9] overflow-hidden">
              <img 
                src={newsItems[0].image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Featured"
              />
            </div>
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                Featured
              </span>
              <span className="bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {newsItems[0].category}
              </span>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-slate-400 text-sm mb-4 font-medium">
                <span className="flex items-center gap-1.5"><Clock size={16} /> {newsItems[0].time}</span>
                <span>•</span>
                <span>{newsItems[0].source}</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-4">
                {newsItems[0].title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {newsItems[0].excerpt}
              </p>
              <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                  Read Full Story <ChevronRight size={20} />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                    <Bookmark size={20} />
                  </button>
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stories */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {newsItems.slice(1).map(item => (
            <div key={item.id} className="group bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">{item.category}</span>
                  <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2 font-medium">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Subscribe Card */}
          <div className="mt-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Automated Digests</h4>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Receive personalized engineering and business insights directly via Telegram.
              </p>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                Configure Alerts
              </button>
            </div>
            {/* Decoration */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
