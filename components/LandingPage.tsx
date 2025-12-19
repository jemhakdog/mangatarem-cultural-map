
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Camera, ArrowRight, Star, Menu, X, Globe, ShieldCheck, Heart } from 'lucide-react';
import MapComponent from './MapComponent';
import { MOCK_ATTRACTIONS, MOCK_EVENTS } from '../constants';

interface LandingPageProps {
  onLogin: () => void;
  onRegister: () => void;
  onViewCalendar: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister, onViewCalendar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <MapPin size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-none ${isScrolled ? 'text-slate-800' : 'text-white'}`}>Mangatarem</span>
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isScrolled ? 'text-slate-400' : 'text-white/70'}`}>Cultural Hub</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('explore-map')} className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'}`}>Map</button>
            <button onClick={() => scrollToSection('gallery')} className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'}`}>Gallery</button>
            <button onClick={onViewCalendar} className={`text-sm font-bold transition-colors ${isScrolled ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'}`}>Full Calendar</button>
            <div className="h-6 w-[1px] bg-slate-200/20"></div>
            <button 
              onClick={onLogin}
              className={`text-sm font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            >
              Log In
            </button>
            <button 
              onClick={onRegister}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200"
            >
              Join Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-slate-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[900] md:hidden bg-white animate-in fade-in duration-300">
          <div className="pt-24 px-6 flex flex-col gap-6">
            <button onClick={() => scrollToSection('explore-map')} className="text-2xl font-bold text-slate-800 text-left">Explore Map</button>
            <button onClick={() => scrollToSection('gallery')} className="text-2xl font-bold text-slate-800 text-left">Gallery</button>
            <button onClick={onViewCalendar} className="text-2xl font-bold text-slate-800 text-left">Full Calendar</button>
            <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
              <button onClick={onLogin} className="w-full py-4 text-center font-bold text-slate-600">Log In</button>
              <button onClick={onRegister} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold">Sign Up Free</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ilovepangasinan.com/wp-content/uploads/2020/02/Daang-Kalikasan-3.jpg" 
            className="w-full h-full object-cover"
            alt="Daang Kalikasan, Mangatarem"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 animate-in slide-in-from-bottom duration-700">
            <Globe size={14} className="text-indigo-300" />
            Discover Pangasinan's Best Kept Secret
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl animate-in slide-in-from-bottom duration-1000">
            Where Nature Meets <br /> <span className="text-indigo-300">Timeless Heritage</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-150 drop-shadow-lg">
            Explore the lush mountains, healing springs, and rich traditions of Mangatarem. Your interactive guide to the heart of Northern Luzon.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom duration-1000 delay-300">
            <button 
              onClick={() => scrollToSection('explore-map')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Start Exploring <ArrowRight size={18} />
            </button>
            <button 
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Join Community
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Barangays', value: '82', icon: <MapPin className="text-indigo-600" /> },
            { label: 'Culture Sites', value: '145+', icon: <Globe className="text-indigo-600" /> },
            { label: 'Annual Events', value: '12', icon: <Calendar className="text-indigo-600" /> },
            { label: 'Active Guides', value: '50+', icon: <Heart className="text-indigo-600" /> },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-slate-50 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section id="explore-map" className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">Interactive Cultural Map</h2>
            <p className="text-slate-500 leading-relaxed">
              Navigate through the various barangays and discover hidden gems, from the heights of Daang Kalikasan to the depths of Manleluag springs.
            </p>
          </div>
          <button onClick={() => scrollToSection('gallery')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all group">
            View All Sites <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
          {/* Passing isEmbedded=true to fix cramped layout issues */}
          <MapComponent isEmbedded={true} />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Glimpses of Mangatarem</h2>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              A curated collection of photos capturing the natural beauty and vibrant traditions that define our town.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_ATTRACTIONS.map((att, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}>
                <img src={att.imageUrl} alt={att.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest block mb-2">{att.category}</span>
                  <h3 className="text-xl font-bold mb-2">{att.name}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span>{att.rating} rating</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center p-8 bg-indigo-600 rounded-3xl text-center group cursor-pointer hover:bg-indigo-500 transition-colors">
              <Camera size={40} className="mb-4 text-indigo-200 group-hover:scale-110" />
              <h3 className="font-bold text-lg mb-2">Contribute Media</h3>
              <p className="text-indigo-100 text-xs mb-6">Are you a local photographer? Share your captures with us.</p>
              <button className="text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full">Upload <ArrowRight size={14}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Upcoming Traditions</span>
              <h2 className="text-4xl font-bold text-slate-800 tracking-tight leading-tight">Celebrate with the Community</h2>
            </div>
            <p className="text-slate-500 leading-relaxed text-lg">
              Our calendar is filled with vibrant festivals and community events that showcase our shared heritage.
            </p>
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <ShieldCheck className="text-emerald-600" size={24} />
              <p className="text-sm text-emerald-800 font-medium">All events are regulated and supported by the LGU Tourism Office.</p>
            </div>
            <button 
              onClick={onViewCalendar}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              View Full Calendar
            </button>
          </div>
          
          <div className="flex-1 w-full space-y-4">
            {MOCK_EVENTS.map((event) => (
              <div key={event.id} onClick={onViewCalendar} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-xl hover:translate-x-2 transition-all group cursor-pointer">
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center text-indigo-600 shadow-inner shrink-0">
                  <span className="text-[10px] font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{event.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{event.name}</h3>
                </div>
                <ArrowRight size={24} className="text-slate-200 group-hover:text-indigo-600 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Condensed) */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><MapPin size={18} /></div>
                <span className="font-bold text-xl text-slate-800">Mangatarem</span>
            </div>
            <p className="text-slate-400 text-xs">© 2024 LGU Mangatarem, Pangasinan. Built with pride for the community.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
