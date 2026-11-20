import React, { useState } from 'react';
import { SiteHeader, SectionHead, useReveal, Toast } from '../components/layout/SiteChrome';
import { DEFAULT_DRAFT, getTemplate, saveDraft, TEMPLATES, isRedElegants } from '../data/templates';
import RedElegantDefs from '../components/ornaments/RedElegantDefs';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'create', label: 'Create' },
];

export default function CreatePage({ onNavigate, draft, onDraftChange, selectedTemplate }) {
  const rootRef = useReveal([]);
  const [form, setForm] = useState(() => ({
    ...DEFAULT_DRAFT,
    ...(draft || {}),
    groom: { ...DEFAULT_DRAFT.groom, ...(draft?.groom || {}) },
    bride: { ...DEFAULT_DRAFT.bride, ...(draft?.bride || {}) },
    akad: { ...DEFAULT_DRAFT.akad, ...(draft?.akad || {}) },
    reception: { ...DEFAULT_DRAFT.reception, ...(draft?.reception || {}) },
  }));
  const [toast, setToast] = useState(false);
  const templateId = (selectedTemplate || form.templateId || TEMPLATES[0].id);
  const template = getTemplate(
    TEMPLATES.find((t) => t.id === templateId && t.status === 'active')?.id || TEMPLATES[0].id
  );

  const update = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        cur[parts[i]] = { ...cur[parts[i]] };
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      templateId: template.id,
      dateLabel: form.dateLabel || `${form.weekday} · ${form.day} ${form.monthSide}`,
    };
    saveDraft(payload);
    onDraftChange?.(payload);
    setToast(true);
    setTimeout(() => {
      setToast(false);
      onNavigate('invitation');
    }, 900);
  };

  return (
    <div ref={rootRef} className="relative min-h-dvh">
      <SiteHeader
        nav={NAV}
        active="create"
        onNavigate={onNavigate}
        right={
          <span className="text-[10px] tracking-[.24em] uppercase text-gold-deep border border-gold px-3 py-2">
            {template.name}
          </span>
        }
      />

      <section className="px-6 pt-12 pb-28">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            eyebrow="02 — Buat"
            title={
              <>
                Rancang undangan <em>pernikahan</em>
              </>
            }
            lead="Isi detail mempelai dan acara. Semua data disimpan lokal dan langsung tampil di kartu undangan beranimasi."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-14 grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-start"
          >
            {/* Form card */}
            <div className="card-ivory reveal p-7 md:p-9">
              <div className="absolute inset-[11px] border border-line/70 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <svg width="28" height="18" viewBox="0 0 340 20"><use href="#div-line" /></svg>
                  <h3 className="font-label text-[12px] tracking-[.28em] uppercase text-gold-deep">
                    Data Pernikahan
                  </h3>
                  <svg width="28" height="18" viewBox="0 0 340 20" className="scale-x-[-1]"><use href="#div-line" /></svg>
                </div>

                {/* Couple */}
                <p className="text-[10px] tracking-[.34em] uppercase text-ink-soft mb-4">Mempelai</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="field-label">Nama Mempelai Pria</span>
                    <input
                      className="field-input"
                      value={form.groom.fullName}
                      onChange={(e) => update('groom.fullName', e.target.value)}
                      placeholder="Muhammad Najah Yuga"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Nama Panggilan</span>
                    <input
                      className="field-input"
                      value={form.groom.short}
                      onChange={(e) => update('groom.short', e.target.value)}
                      placeholder="Muhammad"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="field-label">Orang Tua Mempelai Pria</span>
                    <input
                      className="field-input"
                      value={form.groom.parents}
                      onChange={(e) => update('groom.parents', e.target.value)}
                      placeholder="Mr. … & Mrs. …"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Nama Mempelai Wanita</span>
                    <input
                      className="field-input"
                      value={form.bride.fullName}
                      onChange={(e) => update('bride.fullName', e.target.value)}
                      placeholder="Irania Dhamayanti"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Nama Panggilan</span>
                    <input
                      className="field-input"
                      value={form.bride.short}
                      onChange={(e) => update('bride.short', e.target.value)}
                      placeholder="Irania"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="field-label">Orang Tua Mempelai Wanita</span>
                    <input
                      className="field-input"
                      value={form.bride.parents}
                      onChange={(e) => update('bride.parents', e.target.value)}
                      placeholder="Mr. … & Mrs. …"
                    />
                  </label>
                </div>

                <div className="h-px bg-line my-7" />

                {/* Date & place */}
                <p className="text-[10px] tracking-[.34em] uppercase text-ink-soft mb-4">Waktu &amp; Tempat</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="field-label">Hari</span>
                    <input
                      className="field-input"
                      value={form.weekday}
                      onChange={(e) => update('weekday', e.target.value)}
                      placeholder="Wednesday"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Tanggal (angka)</span>
                    <input
                      className="field-input"
                      value={form.day}
                      onChange={(e) => update('day', e.target.value)}
                      placeholder="23"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Bulan &amp; Tahun</span>
                    <input
                      className="field-input"
                      value={form.monthSide}
                      onChange={(e) => update('monthSide', e.target.value)}
                      placeholder="December 2026"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Jam Acara</span>
                    <input
                      className="field-input"
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      placeholder="10.00 AM — Finish"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Kota</span>
                    <input
                      className="field-input"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Surabaya"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Lokasi</span>
                    <input
                      className="field-input"
                      value={form.venue}
                      onChange={(e) => update('venue', e.target.value)}
                      placeholder="Keputih, Sukolilo"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Target Countdown (ISO)</span>
                    <input
                      className="field-input"
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      placeholder="2026-12-23"
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Label Tanggal</span>
                    <input
                      className="field-input"
                      value={form.dateLabel}
                      onChange={(e) => update('dateLabel', e.target.value)}
                      placeholder="Wednesday · 23 December 2026"
                    />
                  </label>
                </div>

                <div className="h-px bg-line my-7" />

                {/* Events */}
                <p className="text-[10px] tracking-[.34em] uppercase text-ink-soft mb-4">Rangkaian Acara</p>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="field-label">Akad — Waktu</span>
                    <input
                      className="field-input"
                      value={form.akad.time}
                      onChange={(e) => update('akad.time', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Akad — Tempat</span>
                    <input
                      className="field-input"
                      value={form.akad.place}
                      onChange={(e) => update('akad.place', e.target.value)}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="field-label">Akad — Alamat</span>
                    <input
                      className="field-input"
                      value={form.akad.address}
                      onChange={(e) => update('akad.address', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Resepsi — Waktu</span>
                    <input
                      className="field-input"
                      value={form.reception.time}
                      onChange={(e) => update('reception.time', e.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="field-label">Resepsi — Tempat</span>
                    <input
                      className="field-input"
                      value={form.reception.place}
                      onChange={(e) => update('reception.place', e.target.value)}
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="field-label">Resepsi — Alamat</span>
                    <input
                      className="field-input"
                      value={form.reception.address}
                      onChange={(e) => update('reception.address', e.target.value)}
                    />
                  </label>
                </div>

                <label className="block mt-5">
                  <span className="field-label">Kutipan</span>
                  <textarea
                    className="field-input resize-y min-h-[92px] leading-[1.7]"
                    value={form.quote}
                    onChange={(e) => update('quote', e.target.value)}
                  />
                </label>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="submit" className="btn-gold flex-1 min-w-[200px]">
                    Simpan &amp; Lihat Kartu
                  </button>
                  <button type="button" className="btn-outline" onClick={() => onNavigate('templates')}>
                    Ganti Template
                  </button>
                </div>
              </div>
            </div>

            {/* Live preview card */}
            <div className="reveal lg:sticky lg:top-6" style={{ '--d': '.12s' }}>
              <div className="relative mx-auto max-w-[380px]">
                <svg className="corner absolute -top-6 -left-8 w-[58%] pointer-events-none" viewBox="0 0 480 360">
                  <use href="#cluster-a" />
                </svg>
                <svg className="corner absolute -bottom-6 -right-8 w-[52%] pointer-events-none scale-[-1,-1]" viewBox="0 0 480 360">
                  <use href="#cluster-b" />
                </svg>

                <div className="relative z-10 bg-gradient-to-b from-ivory-50 to-ivory-300 border border-gold/45 px-7 py-12 text-center shadow-[0_30px_70px_rgba(120,92,48,.18)]">
                  {isRedElegants(template.id) && (
                    <>
                      <RedElegantDefs />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg,#7c1220,#4a0a12)' }} />
                      <div className="relative z-10 text-[#f6e8ce]">
                        <svg className="w-20 h-20 mx-auto animate-floaty" viewBox="0 0 160 160">
                          <use href="#re-monogram" />
                        </svg>
                        <div className="text-[10px] tracking-[.5em] uppercase text-[#e9cb8c] mt-4 font-mono">
                          The Wedding Of
                        </div>
                        <div className="text-[28px] leading-tight text-[#f2e3c8] mt-3" style={{ fontFamily: 'Cinzel, serif' }}>
                          {form.groom.short || 'Groom'}
                        </div>
                        <div className="text-[#e9cb8c] text-2xl my-0.5" style={{ fontFamily: 'Great Vibes, cursive' }}>
                          and
                        </div>
                        <div className="text-[28px] leading-tight text-[#f2e3c8]" style={{ fontFamily: 'Cinzel, serif' }}>
                          {form.bride.short || 'Bride'}
                        </div>
                        <svg width="180" height="24" viewBox="0 0 520 90" className="mt-4 mx-auto">
                          <use href="#re-div-fleuron" />
                        </svg>
                        <div className="text-4xl text-[#f2e3c8] mt-4 px-4 border-x border-[#b98a35] inline-block" style={{ fontFamily: 'Cinzel, serif' }}>
                          {form.day || '23'}
                        </div>
                        <div className="font-mono text-[11px] tracking-[.28em] uppercase text-[#e9cb8c]/90 mt-3">
                          {form.weekday} · {form.monthSide}
                        </div>
                        <div className="italic text-[#e9cb8c]/85 mt-4 text-[15px]">
                          {form.city} · {form.venue}
                        </div>
                        <svg width="120" height="68" viewBox="0 0 320 180" className="mt-5 mx-auto">
                          <use href="#re-rings" />
                        </svg>
                      </div>
                    </>
                  )}
                  {!isRedElegants(template.id) && (
                    <>
                      <div className="absolute inset-2.5 border border-gold/25 pointer-events-none" />
                      <svg className="w-20 h-20 mx-auto animate-floaty" viewBox="0 0 160 160">
                        <use href="#monogram" />
                      </svg>
                      <div className="font-label text-[10px] tracking-[.5em] uppercase text-gold-deep mt-4">
                        The Wedding Of
                      </div>
                      <div className="font-display text-[28px] leading-tight text-ink-deep mt-3">
                        {form.groom.short || 'Groom'}
                      </div>
                      <div className="font-display italic text-gold text-2xl my-0.5">and</div>
                      <div className="font-display text-[28px] leading-tight text-ink-deep">
                        {form.bride.short || 'Bride'}
                      </div>
                      <svg width="180" height="14" viewBox="0 0 340 20" className="mt-4 mx-auto">
                        <use href="#div-line" />
                      </svg>
                      <div className="font-display text-4xl text-ink-deep mt-4 px-4 border-x border-gold inline-block">
                        {form.day || '23'}
                      </div>
                      <div className="font-label text-[11px] tracking-[.28em] uppercase text-ink-soft mt-3">
                        {form.weekday} · {form.monthSide}
                      </div>
                      <div className="font-display italic text-ink-soft mt-4 text-[15px]">
                        {form.city} · {form.venue}
                      </div>
                      <svg width="72" height="44" viewBox="0 0 132 78" className="mt-5 mx-auto">
                        <use href="#rings" />
                      </svg>
                    </>
                  )}
                </div>

                <p className="text-center mt-6 font-display italic text-ink-soft text-[15px]">
                  Preview langsung dari data form
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Toast show={toast}>Undangan tersimpan — membuka kartu…</Toast>
    </div>
  );
}
