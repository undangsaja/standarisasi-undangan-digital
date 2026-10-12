import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpSection({ guestName }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'wishes'
  const [formData, setFormData] = useState({
    name: guestName || '',
    attendance: 'hadir',
    pax: '2',
    message: ''
  });

  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'Rian Pratama & Keluarga',
      attendance: 'hadir',
      pax: 2,
      message: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khoir. Selamat berbahagia Dimas & Sarah!',
      time: '1 jam lalu'
    },
    {
      id: 2,
      name: 'Dinda Ayu Maharani',
      attendance: 'hadir',
      pax: 1,
      message: 'MasyaAllah lancar sampai hari-H yaa Sarah! Semoga menjadi keluarga sakinah mawaddah warahmah.',
      time: '3 jam lalu'
    },
    {
      id: 3,
      name: 'Bagus Setyawan',
      attendance: 'ragu',
      pax: 1,
      message: 'Selamat bro Dimas! InsyaAllah diusahakan hadir. Sukses selalu untuk kalian berdua.',
      time: 'Kemarin'
    }
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (guestName && guestName !== 'Tamu Undangan') {
      setFormData(prev => ({ ...prev, name: guestName }));
    }
  }, [guestName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    try {
      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#171717', '#525252', '#a3a3a3', '#e5e5e5']
      });
    } catch {
      // ignore
    }

    const newWish = {
      id: Date.now(),
      name: formData.name,
      attendance: formData.attendance,
      pax: parseInt(formData.pax, 10),
      message: formData.message,
      time: 'Baru saja'
    };

    setWishes([newWish, ...wishes]);
    setIsSubmitted(true);
    setFormData(prev => ({ ...prev, message: '' }));

    setTimeout(() => {
      setIsSubmitted(false);
      setActiveTab('wishes');
    }, 2000);
  };

  const getAttendanceBadge = (status) => {
    switch (status) {
      case 'hadir':
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-neutral-900 text-white">Hadir</span>;
      case 'tidak':
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-neutral-100 text-neutral-500 border border-neutral-300">Berhalangan</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-neutral-200 text-neutral-700">Ragu</span>;
    }
  };

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-4 pb-24 bg-neutral-50 text-neutral-800 flex flex-col justify-between items-center text-center select-none">
      {/* Top Header */}
      <div className="pt-2" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-0.5 block">
          Konfirmasi & Doa
        </span>
        <h2 className="font-serif text-2xl font-bold text-neutral-950">
          RSVP & Ucapan
        </h2>
      </div>

      {/* Main Container Card (Strictly fits 100vh) */}
      <div 
        className="w-full max-w-xs bg-white rounded-3xl p-4 shadow-sm border border-neutral-200 flex flex-col my-auto"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        {/* Sub-tab switcher */}
        <div className="grid grid-cols-2 gap-1 w-full bg-neutral-100 p-1 rounded-2xl mb-3">
          <button
            onClick={() => setActiveTab('form')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'form'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Form Kehadiran
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'wishes'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Buku Ucapan ({wishes.length})
          </button>
        </div>

        {/* Tab 1: Form Kehadiran */}
        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama Anda"
                className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5">
                Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'hadir', label: 'Hadir' },
                  { id: 'ragu', label: 'Ragu' },
                  { id: 'tidak', label: 'Tidak' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setFormData({ ...formData, attendance: opt.id })}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-medium border text-center transition-all ${
                      formData.attendance === opt.id
                        ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-sm'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5">
                Pesan / Doa Restu
              </label>
              <textarea
                required
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tulis ucapan tulus Anda..."
                className="w-full px-3 py-1.5 rounded-xl border border-neutral-300 text-xs text-neutral-800 resize-none focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 text-xs font-semibold shadow transition-all"
            >
              <Send size={12} />
              <span>Kirim Konfirmasi</span>
            </button>

            {isSubmitted && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10.5px]">
                <CheckCircle2 size={13} className="text-neutral-900 shrink-0" />
                <span>Terima kasih! Ucapan Anda telah terkirim.</span>
              </div>
            )}
          </form>
        ) : (
          /* Tab 2: Buku Ucapan */
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-0.5" style={{ scrollbarWidth: 'thin' }}>
            {wishes.map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left flex flex-col gap-1 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-bold text-neutral-900 line-clamp-1">
                    {item.name}
                  </span>
                  {getAttendanceBadge(item.attendance)}
                </div>
                <p className="text-[11px] text-neutral-600 leading-snug font-light">
                  {item.message}
                </p>
                <div className="flex items-center gap-1 text-[9.5px] text-neutral-400">
                  <Clock size={9} />
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <p className="text-[10px] text-neutral-400 italic" data-aos="fade-up" data-aos-duration="600">
        {activeTab === 'form' ? 'Lihat doa tamu lainnya di tab Buku Ucapan' : 'Tekan tab Form untuk menulis ucapan baru'}
      </p>
    </div>
  );
}
