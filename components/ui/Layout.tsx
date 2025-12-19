
import React, { useState } from 'react';
import { Map, LayoutDashboard, Calendar, Image, Info, Menu, X, Bot, LogOut, Search } from 'lucide-react';
import { User } from '../../services/authService';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'map', label: 'Cultural Map', icon: <Map size={20} /> },
    { id: 'barangays', label: 'Barangays', icon: <Info size={20} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={20} /> },
    { id: 'ai-guide', label: 'AI Guide', icon: <Bot size={20} /> },
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-[100] shadow-sm">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-indigo-600 leading-none">Mangatarem</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Cultural Hub</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-white border-r border-slate-200 flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-bold text-xl text-indigo-600">Mangatarem</span>
              <span className="text-xs text-slate-400">Cultural Hub</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}>
                {item.icon}
              </div>
              {isSidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
           <div className={`flex items-center justify-between ${!isSidebarOpen && 'flex-col gap-4'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {isSidebarOpen && (
                  <div className="max-w-[100px] overflow-hidden">
                    <p className="text-sm font-medium text-slate-700 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.role}</p>
                  </div>
                )}
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
           </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] md:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top duration-300">
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center p-4 rounded-xl transition-colors ${
                    activeTab === item.id 
                      ? 'bg-indigo-50 text-indigo-600 font-bold' 
                      : 'text-slate-600'
                  }`}
                >
                  <div className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}>
                    {item.icon}
                  </div>
                  <span className="ml-4">{item.label}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.role}</p>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-3 text-red-500 bg-red-50 rounded-xl"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="hidden md:flex h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search heritage, places..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
              />
              <div className="absolute left-3 top-2.5 text-slate-400">
                <Search size={16} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
