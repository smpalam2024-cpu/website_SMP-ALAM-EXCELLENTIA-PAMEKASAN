import React, { useState } from 'react';
import { MessageCircle, X, Phone, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, isGuest, setOpenGuestDashboard } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');

  const handleClick = () => {
    const message = encodeURIComponent(
      `Assalamu'alaikum Admin SMP Alam Excellentia Pamekasan, saya ingin berkonsultasi seputar informasi sekolah dan pendaftaran siswa baru.`
    );
    window.open(`https://wa.me/62${cleanWa}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 p-3 bg-white rounded-2xl shadow-xl border border-stone-200 max-w-xs text-xs animate-bounce-slow flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 animate-ping" />
          <div className="flex-1">
            <p className="font-bold text-stone-900">Butuh Bantuan Konsultasi?</p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Hubungi kami di WA: <span className="font-mono font-bold text-emerald-700">{settings.consultationWhatsapp}</span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-stone-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main floating circle button */}
      <button
        onClick={handleClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-full shadow-2xl shadow-emerald-950/30 transition-all duration-300"
        aria-label="Konsultasi via WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline">
          Konsultasi WA
        </span>
      </button>
    </div>
  );
};
