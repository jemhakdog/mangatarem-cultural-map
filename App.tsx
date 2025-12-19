
import React, { useState, useEffect } from 'react';
import Layout from './components/ui/Layout';
import MapComponent from './components/MapComponent';
import Dashboard from './components/Dashboard';
import BarangayDashboard from './components/BarangayDashboard';
import GeminiGuide from './components/GeminiGuide';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import FullCalendarPage from './components/FullCalendarPage';
import { authService, User } from './services/authService';
import { MOCK_BARANGAYS, MOCK_ATTRACTIONS } from './constants';
import { Info, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Track public view specifically for unauthenticated users
  const [publicView, setPublicView] = useState<'landing' | 'calendar'>('landing');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsInitializing(false);
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setShowAuth(false);
    setPublicView('landing');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setActiveTab('dashboard');
    setPublicView('landing');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium">Loading Mangatarem Cultural Hub...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    if (showAuth) {
      return (
        <div className="relative min-h-screen">
          <button 
            onClick={() => setShowAuth(false)}
            className="absolute top-8 left-8 z-50 flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all group"
          >
            <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center group-hover:-translate-x-1 transition-transform">
               <ArrowRight size={18} className="rotate-180" />
            </div>
            Back to Home
          </button>
          <Auth onAuthSuccess={handleAuthSuccess} />
        </div>
      );
    }

    if (publicView === 'calendar') {
      return <FullCalendarPage isPublic onBack={() => setPublicView('landing')} />;
    }

    return (
      <LandingPage 
        onLogin={() => setShowAuth(true)} 
        onRegister={() => setShowAuth(true)} 
        onViewCalendar={() => setPublicView('calendar')}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.role === 'Barangay Admin' ? <BarangayDashboard user={user} /> : <Dashboard />;
      case 'map':
        return <MapComponent />;
      case 'ai-guide':
        return <GeminiGuide />;
      case 'barangays':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_BARANGAYS.map((b) => (
              <div key={b.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{b.name}</h3>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Info size={16} />
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">{b.history}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">Pop: {b.population.toLocaleString()}</span>
                  <button className="text-xs font-bold text-indigo-600 flex items-center hover:translate-x-1 transition-transform">
                    Explore <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'events':
        return <FullCalendarPage onBack={() => setActiveTab('dashboard')} />;
      case 'gallery':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_ATTRACTIONS.map((att) => (
              <div key={att.id} className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-sm">
                <img src={att.imageUrl} alt={att.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h4 className="text-white font-bold text-sm mb-1">{att.name}</h4>
                  <p className="text-white/70 text-[10px] uppercase tracking-wider">{att.category}</p>
                </div>
              </div>
            ))}
            {[...Array(8)].map((_, i) => (
               <div key={i} className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-sm">
                <img src={`https://picsum.photos/seed/mangatarem-${i+10}/600/600`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
