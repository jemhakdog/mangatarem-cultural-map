
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, MapPin, Calendar, TrendingUp } from 'lucide-react';

const statsData = [
  { name: 'Nature', value: 45 },
  { name: 'Historical', value: 30 },
  { name: 'Food', value: 15 },
  { name: 'Culture', value: 10 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

const visitData = [
  { month: 'Jan', visits: 400 },
  { month: 'Feb', visits: 300 },
  { month: 'Mar', visits: 600 },
  { month: 'Apr', visits: 800 },
  { month: 'May', visits: 500 },
  { month: 'Jun', visits: 700 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Barangays', value: '82', icon: <MapPin className="text-blue-500" />, trend: '+2 this year' },
          { label: 'Attractions', value: '145', icon: <TrendingUp className="text-green-500" />, trend: '+12% vs last month' },
          { label: 'Upcoming Events', value: '8', icon: <Calendar className="text-purple-500" />, trend: '3 in next 7 days' },
          { label: 'Visitor Reach', value: '12.4k', icon: <Users className="text-indigo-500" />, trend: '+1.2k new users' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase">Live</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            <p className="text-xs text-indigo-500 mt-3 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Engagement Chart */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-6">Monthly Visitor Trends</h3>
          <div className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="visits" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={window.innerWidth < 768 ? 20 : 40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-6">Attractions by Category</h3>
          <div className="h-[250px] md:h-[300px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="w-full h-full max-w-[200px] md:max-w-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 768 ? 50 : 80}
                    outerRadius={window.innerWidth < 768 ? 70 : 100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full sm:w-auto">
              {statsData.map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs md:text-sm text-slate-600 font-medium truncate">{item.name}</span>
                  <span className="text-[10px] md:text-xs text-slate-400">({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
