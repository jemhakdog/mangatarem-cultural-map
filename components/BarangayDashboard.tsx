
import React, { useState } from 'react';
// Fix: Added Bot and ArrowRight to lucide-react imports to resolve missing references and type errors
import { Plus, LayoutGrid, List, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, MapPin, Camera, Bot, ArrowRight } from 'lucide-react';
import { User } from '../services/authService';
import { MOCK_ATTRACTIONS, MOCK_EVENTS } from '../constants';

interface BarangayDashboardProps {
  user: User;
}

const BarangayDashboard: React.FC<BarangayDashboardProps> = ({ user }) => {
  const [activeView, setActiveView] = useState<'overview' | 'manage'>('overview');
  
  // Filter assets belonging to this barangay
  const myAttractions = MOCK_ATTRACTIONS.filter(a => a.barangay === user.barangay);
  const myEvents = MOCK_EVENTS.filter(e => e.location.includes(user.barangay || ''));

  const stats = [
    { label: 'Active Assets', value: myAttractions.length.toString(), icon: <MapPin size={20} className="text-indigo-600" />, sub: 'Cultural markers' },
    { label: 'Local Events', value: myEvents.length.toString(), icon: <TrendingUp size={20} className="text-emerald-600" />, sub: 'This quarter' },
    { label: 'Avg Rating', value: '4.7', icon: <CheckCircle2 size={20} className="text-amber-600" />, sub: 'From visitors' },
    { label: 'Reach', value: '1.2k', icon: <Users size={20} className="text-blue-600" />, sub: 'Monthly views' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Barangay {user.barangay} Management</h2>
          <p className="text-slate-500 text-sm mt-1">Hello, {user.name}. You are currently managing this area's cultural assets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus size={18} />
            <span>Add Asset</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            <Camera size={18} />
            <span>Post Photo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              <span className="text-xs text-slate-400 font-medium">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Your Cultural Assets</h3>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setActiveView('overview')} className={`p-1.5 rounded-md ${activeView === 'overview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setActiveView('manage')} className={`p-1.5 rounded-md ${activeView === 'manage' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>
                  <List size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {myAttractions.length > 0 ? (
                <div className="space-y-4">
                  {myAttractions.map(attr => (
                    <div key={attr.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-colors group">
                      <img src={attr.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-slate-800 truncate">{attr.name}</h4>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">APPROVED</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{attr.description}</p>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                        {/* Fix: Using ArrowRight from lucide-react to ensure correct prop typing */}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-slate-300" size={32} />
                  </div>
                  <h4 className="text-slate-800 font-bold">No assets found</h4>
                  <p className="text-slate-500 text-sm mt-1">Start by adding a historical marker or nature spot.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Submission Status</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Heritage Marker Proposal</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock size={12} /> Pending LGU Review</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Annual Fiesta Schedule</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><CheckCircle2 size={12} /> Published to Map</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
              View History
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-xl shadow-indigo-200">
            {/* Fix: Bot icon now imported from lucide-react */}
            <Bot size={28} className="mb-4 text-indigo-200" />
            <h3 className="font-bold text-lg mb-2">AI Content Assistant</h3>
            <p className="text-indigo-100 text-xs leading-relaxed mb-6">
              Need help writing historical descriptions or event summaries? Use our AI tools to polish your submissions.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all backdrop-blur-md">
              Launch Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayDashboard;
