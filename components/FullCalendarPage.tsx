
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, ArrowLeft, Clock } from 'lucide-react';
import { MOCK_EVENTS } from '../constants';

interface FullCalendarPageProps {
  onBack: () => void;
  isPublic?: boolean;
}

const FullCalendarPage: React.FC<FullCalendarPageProps> = ({ onBack, isPublic = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  // Padding for start of month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  // Actual days
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  const getEventsForDay = (day: number) => {
    return MOCK_EVENTS.filter(e => {
      const d = new Date(e.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${isPublic ? 'pt-24 pb-12 px-4 md:px-8' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            {isPublic && (
              <button 
                onClick={onBack}
                className="p-3 bg-white shadow-sm border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Community Calendar</h1>
              <p className="text-slate-500 text-sm">Official festivities and events in Mangatarem</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="px-6 font-bold text-slate-700 min-w-[140px] text-center">{monthName} {year}</span>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-7 border-b border-slate-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 border-l border-t border-slate-50">
                {calendarDays.map((day, idx) => {
                  const events = day ? getEventsForDay(day) : [];
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                  
                  return (
                    <div 
                      key={idx} 
                      className={`min-h-[100px] md:min-h-[140px] p-2 border-r border-b border-slate-50 transition-colors relative ${day ? 'hover:bg-slate-50/50' : 'bg-slate-50/20'}`}
                    >
                      {day && (
                        <>
                          <span className={`text-sm font-bold inline-flex w-7 h-7 items-center justify-center rounded-lg ${isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-400'}`}>
                            {day}
                          </span>
                          <div className="mt-2 space-y-1">
                            {events.map(event => (
                              <div 
                                key={event.id}
                                className="px-2 py-1 bg-indigo-50 border border-indigo-100 rounded-md text-[9px] font-bold text-indigo-600 truncate cursor-pointer hover:bg-indigo-100 transition-colors"
                                title={event.name}
                              >
                                {event.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon size={20} className="text-indigo-600" />
              Featured This Month
            </h2>
            <div className="space-y-4">
              {MOCK_EVENTS.filter(e => new Date(e.date).getMonth() === month).map(event => (
                <div key={event.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {event.type}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors mb-2 leading-tight">
                    {event.name}
                  </h3>
                  <div className="flex items-center text-slate-400 text-xs mb-4">
                    <MapPin size={12} className="mr-1" />
                    {event.location}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>
              ))}
              {MOCK_EVENTS.filter(e => new Date(e.date).getMonth() === month).length === 0 && (
                <div className="p-8 text-center bg-slate-100/50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-400 font-medium">No events scheduled for this month yet.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
               <h3 className="font-bold text-lg mb-2">Want to host an event?</h3>
               <p className="text-indigo-100 text-xs mb-6 leading-relaxed">Local barangay organizers can submit community events for LGU approval and publishing on the map.</p>
               <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                  Submit Proposal
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCalendarPage;
