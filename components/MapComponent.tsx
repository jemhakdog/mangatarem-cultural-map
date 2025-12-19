
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MANGATAREM_COORDINATES, MOCK_ATTRACTIONS } from '../constants';
import { Attraction } from '../types';
import { Star, MapPin, Search, Filter, ChevronRight, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

interface MapComponentProps {
  isEmbedded?: boolean;
}

// Custom Marker Icon to look modern
const createCustomIcon = (category: string) => {
  const colors: Record<string, string> = {
    Nature: '#10b981',
    Historical: '#6366f1',
    Food: '#f59e0b',
    Culture: '#ec4899',
    Religious: '#8b5cf6',
  };
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${colors[category] || '#6366f1'}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

const MapRecenter: React.FC<{ coords: [number, number] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 14, { duration: 1.5 });
  }, [coords, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ isEmbedded = false }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>(MANGATAREM_COORDINATES);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const filteredAttractions = MOCK_ATTRACTIONS.filter(a => {
    const matchesFilter = filter === 'All' || a.category === filter;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.barangay.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', 'Nature', 'Historical', 'Food', 'Culture', 'Religious'];

  const handleCardClick = (attraction: Attraction) => {
    setSelectedLocation(attraction.coordinates);
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`h-full flex flex-col md:flex-row bg-white overflow-hidden relative ${!isEmbedded ? '-m-4 md:-m-8' : ''}`}>
      {/* Mobile Filter Toggle (Floating) */}
      <button 
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[500] bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm"
      >
        {isSidebarCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        {isSidebarCollapsed ? 'Show Sites' : 'Hide Sites'}
      </button>

      {/* Discovery Sidebar */}
      <div className={`w-full md:w-[320px] lg:w-[360px] bg-white z-10 shadow-xl flex flex-col border-r border-slate-200 transition-all duration-300 overflow-hidden ${
        isSidebarCollapsed ? 'h-0 md:h-full md:w-0 overflow-hidden' : 'h-[50vh] md:h-full'
      }`}>
        {/* Compact Search & Filter Header */}
        <div className={`p-4 ${isEmbedded ? 'md:p-4' : 'md:p-6'} border-b border-slate-100 space-y-3 shrink-0`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search sites..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                  filter === cat 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="px-4 py-2 bg-slate-50/80 flex items-center justify-between shrink-0 border-b border-slate-100">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {filteredAttractions.length} Cultural Assets
          </p>
          <SlidersHorizontal size={12} className="text-slate-300" />
        </div>

        {/* Scrollable Results List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
          {filteredAttractions.length > 0 ? (
            filteredAttractions.map((attraction) => (
              <div 
                key={attraction.id}
                onClick={() => handleCardClick(attraction)}
                onMouseEnter={() => setHoveredId(attraction.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group flex flex-col bg-white rounded-xl border transition-all cursor-pointer overflow-hidden ${
                  hoveredId === attraction.id 
                    ? 'border-indigo-500 shadow-md ring-1 ring-indigo-50' 
                    : 'border-slate-100 shadow-sm hover:border-slate-300'
                }`}
              >
                <div className={`relative ${isEmbedded ? 'h-24' : 'h-32 md:h-40'} overflow-hidden shrink-0`}>
                  <img 
                    src={attraction.imageUrl} 
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-white/95 backdrop-blur shadow-sm rounded-lg flex items-center space-x-1">
                    <Star size={8} className="text-amber-500 fill-amber-500" />
                    <span className="text-[9px] font-bold text-slate-700">{attraction.rating}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors text-xs leading-tight truncate">{attraction.name}</h3>
                  </div>
                  <div className="flex items-center text-slate-400 text-[9px] mb-2">
                    <MapPin size={9} className="mr-1" />
                    <span className="truncate">Brgy. {attraction.barangay}</span>
                  </div>
                  {!isEmbedded && (
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                      {attraction.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className={`text-[8px] font-bold uppercase tracking-wider ${
                      attraction.category === 'Nature' ? 'text-emerald-600' : 'text-indigo-600'
                    }`}>{attraction.category}</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
              <Search size={24} className="text-slate-200 mb-2" />
              <p className="text-[10px] font-medium text-slate-500">No sites found</p>
              <button onClick={() => {setFilter('All'); setSearchQuery('');}} className="mt-1 text-[9px] font-bold text-indigo-600 uppercase">Reset</button>
            </div>
          )}
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative h-full min-h-[40vh] md:min-h-0">
        <MapContainer 
          center={MANGATAREM_COORDINATES} 
          zoom={13} 
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredAttractions.map((attraction) => (
            <Marker 
              key={attraction.id} 
              position={attraction.coordinates}
              icon={createCustomIcon(attraction.category)}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="p-0 min-w-[160px]">
                  <img 
                    src={attraction.imageUrl} 
                    alt={attraction.name} 
                    className="w-full h-20 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="font-bold text-slate-800 text-[10px] mb-0.5">{attraction.name}</h3>
                    <p className="text-[8px] text-indigo-600 font-bold uppercase tracking-wider mb-2">{attraction.category}</p>
                    <button className="w-full bg-slate-900 text-white text-[9px] font-bold py-1.5 rounded-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapRecenter coords={selectedLocation} />
        </MapContainer>
        
        {/* Floating Controls */}
        <div className="absolute top-4 right-4 md:bottom-6 md:right-6 md:top-auto flex flex-col space-y-2 z-[400]">
          <button className="p-2 bg-white shadow-lg rounded-lg border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors">
            <Search size={16} />
          </button>
          <button className="p-2 bg-white shadow-lg rounded-lg border border-slate-100 text-slate-500 hover:text-indigo-600 transition-colors">
            <MapPin size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
