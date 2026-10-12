import React, { useState } from 'react';
import { Copy, Check, QrCode, Package, CreditCard } from 'lucide-react';

export default function GiftSection({ data }) {
  const { gifts } = data;
  const [selectedGiftType, setSelectedGiftType] = useState('bca');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const bcaGift = gifts.find(g => g.id === 'bca');
  const mandiriGift = gifts.find(g => g.id === 'mandiri');
  const qrisGift = gifts.find(g => g.type === 'qris');
  const physicalGift = gifts.find(g => g.type === 'physical');

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-4 pb-24 bg-neutral-50 text-neutral-800 flex flex-col justify-between items-center text-center select-none">
      {/* Top Header */}
      <div className="pt-2" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-0.5 block">
          Tanda Kasih
        </span>
        <h2 className="font-serif text-2xl font-bold text-neutral-950">
          Amplop Digital & Kado
        </h2>
      </div>

      {/* Main Container Card (Strictly fits 100vh) */}
      <div 
        className="w-full max-w-xs bg-white rounded-3xl p-4 shadow-sm border border-neutral-200 flex flex-col items-center my-auto"
        data-aos="zoom-in"
        data-aos-duration="750"
      >
        {/* Method Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1 w-full bg-neutral-100 p-1 rounded-2xl mb-3">
          {[
            { id: 'bca', label: 'BCA' },
            { id: 'mandiri', label: 'Mandiri' },
            { id: 'qris', label: 'QRIS' },
            { id: 'physical', label: 'Kado' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedGiftType(tab.id);
                setCopied(false);
              }}
              className={`py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all ${
                selectedGiftType === tab.id
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content: Bank BCA */}
        {selectedGiftType === 'bca' && bcaGift && (
          <div className="w-full flex flex-col items-center animate-fade-in py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 uppercase mb-2">
              <CreditCard size={15} className="text-neutral-800" />
              <span>{bcaGift.bankName}</span>
            </div>
            <span className="text-[10.5px] text-neutral-400">Nomor Rekening</span>
            <div className="font-mono text-lg font-bold text-neutral-950 tracking-wider my-0.5">
              {bcaGift.accountNumber}
            </div>
            <span className="text-xs text-neutral-600 font-medium mb-3">
              a.n. {bcaGift.accountHolder}
            </span>
            <button
              onClick={() => handleCopy(bcaGift.accountNumber)}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                copied ? 'bg-neutral-700 text-white' : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Nomor Rekening Disalin!' : 'Salin Nomor Rekening'}</span>
            </button>
          </div>
        )}

        {/* Content: Bank Mandiri */}
        {selectedGiftType === 'mandiri' && mandiriGift && (
          <div className="w-full flex flex-col items-center animate-fade-in py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 uppercase mb-2">
              <CreditCard size={15} className="text-neutral-800" />
              <span>{mandiriGift.bankName}</span>
            </div>
            <span className="text-[10.5px] text-neutral-400">Nomor Rekening</span>
            <div className="font-mono text-lg font-bold text-neutral-950 tracking-wider my-0.5">
              {mandiriGift.accountNumber}
            </div>
            <span className="text-xs text-neutral-600 font-medium mb-3">
              a.n. {mandiriGift.accountHolder}
            </span>
            <button
              onClick={() => handleCopy(mandiriGift.accountNumber)}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                copied ? 'bg-neutral-700 text-white' : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Nomor Rekening Disalin!' : 'Salin Nomor Rekening'}</span>
            </button>
          </div>
        )}

        {/* Content: QRIS */}
        {selectedGiftType === 'qris' && qrisGift && (
          <div className="w-full flex flex-col items-center animate-fade-in py-1">
            <div className="flex items-center gap-1 text-xs font-bold text-neutral-900 uppercase mb-1.5">
              <QrCode size={14} className="text-neutral-800" />
              <span>{qrisGift.title}</span>
            </div>
            <div className="w-36 h-36 rounded-2xl p-1 bg-neutral-50 border border-neutral-200 flex items-center justify-center mb-2">
              <img src={qrisGift.qrImage} alt="QRIS" className="w-full h-full object-contain" />
            </div>
            <p className="text-[10px] text-neutral-500 leading-tight px-2">
              {qrisGift.description}
            </p>
          </div>
        )}

        {/* Content: Physical Gift */}
        {selectedGiftType === 'physical' && physicalGift && (
          <div className="w-full flex flex-col text-left animate-fade-in py-1">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Package size={14} className="text-neutral-800" />
              <h4 className="font-semibold text-xs text-neutral-900 uppercase">
                {physicalGift.title}
              </h4>
            </div>
            <p className="text-[11px] font-semibold text-neutral-800 mb-0.5">
              Penerima: {physicalGift.recipient}
            </p>
            <p className="text-[10px] text-neutral-500 mb-1">
              Telp: {physicalGift.phone}
            </p>
            <p className="bg-neutral-50 p-2 rounded-xl border border-neutral-200 text-[10.5px] text-neutral-700 leading-tight mb-2.5">
              {physicalGift.address}
            </p>
            <button
              onClick={() => handleCopy(physicalGift.address)}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                copied ? 'bg-neutral-700 text-white' : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Alamat Disalin!' : 'Salin Alamat Lengkap'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <p className="text-[10px] text-neutral-400 italic" data-aos="fade-up" data-aos-duration="600">
        Pilih tab di atas untuk melihat rekening BCA, Mandiri, QRIS atau Kado Fisik
      </p>
    </div>
  );
}
