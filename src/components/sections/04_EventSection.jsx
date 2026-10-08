import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';

export default function EventSection({ data }) {
  const { events } = data;
  const [selectedEventId, setSelectedEventId] = useState('akad');

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];

  const createCalendarUrl = (ev) => {
    const title = encodeURIComponent(`${ev.type}: ${data.couple.groom.nickName} & ${data.couple.bride.nickName}`);
    const details = encodeURIComponent(`Pernikahan ${data.couple.groom.fullName} & ${data.couple.bride.fullName}\nLokasi: ${ev.venue}`);
    const location = encodeURIComponent(`${ev.venue}, ${ev.address}`);
    const startIso = "20261225T010000Z";
    const endIso = "20261225T080000Z";
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-4 pb-24 text-stone-800 flex flex-col justify-between items-center text-center select-none">
      {/* Top Header */}
      <div className="pt-2" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-amber-700/80 mb-0.5 block">
          Agenda Istimewa
        </span>
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Rangkaian Acara
        </h2>
      </div>

      {/* Main Event Card (Strictly fits 100vh) */}
      <div 
        className="w-full max-w-xs bg-white rounded-3xl p-4 shadow-sm border border-stone-200/90 flex flex-col items-center my-auto"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        {/* Event Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 w-full bg-stone-100 p-1 rounded-2xl mb-3">
          {events.map((ev) => (
            <button
              key={ev.id}
              onClick={() => setSelectedEventId(ev.id)}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                selectedEventId === ev.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {ev.type}
            </button>
          ))}
        </div>

        {/* Date & Time */}
        <div className="mb-2">
          <h3 className="font-serif text-base font-bold text-stone-900 mb-0.5">
            {currentEvent.day}, {currentEvent.date}
          </h3>
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <Clock size={13} className="text-amber-600" />
            <span>{currentEvent.time}</span>
          </div>
        </div>

        <div className="w-14 h-px bg-stone-200 my-1" />

        {/* Venue & Address */}
        <div className="my-2 flex flex-col items-center">
          <h4 className="font-semibold text-stone-800 text-xs mb-0.5 flex items-center gap-1">
            <MapPin size={13} className="text-amber-600 shrink-0" />
            <span>{currentEvent.venue}</span>
          </h4>
          <p className="text-[11px] text-stone-500 leading-relaxed px-1">
            {currentEvent.address}
          </p>
        </div>

        {/* Embed Map Preview Mini */}
        {currentEvent.embedMapsUrl && (
          <div className="w-full h-24 my-2 rounded-xl overflow-hidden border border-stone-200 shadow-inner">
            <iframe
              title={`Peta ${currentEvent.type}`}
              src={currentEvent.embedMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        {/* Actions */}
        <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-stone-100">
          <a
            href={currentEvent.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-medium transition-all shadow-sm"
          >
            <ExternalLink size={12} />
            <span>Google Maps</span>
          </a>

          <a
            href={createCalendarUrl(currentEvent)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-[11px] font-medium transition-all border border-amber-300/60"
          >
            <CalendarPlus size={12} />
            <span>Kalender</span>
          </a>
        </div>
      </div>

      {/* Bottom Hint */}
      <p className="text-[10px] text-stone-400 italic" data-aos="fade-up" data-aos-duration="600">
        Tekan tab di atas untuk beralih antara Akad & Resepsi
      </p>
    </div>
  );
}
