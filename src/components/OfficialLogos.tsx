import React, { useState, useEffect } from 'react';
import { Shield, Upload } from 'lucide-react';

interface OfficialLogosProps {
  size?: 'sm' | 'md' | 'lg';
  showNames?: boolean;
  className?: string;
  onOpenManager?: () => void;
}

const STORAGE_KEYS = {
  schoolLogo: 'smp_alam_logo_school',
  foundationLogo: 'smp_alam_logo_foundation',
  networkLogo: 'smp_alam_logo_network',
};

export const getStoredLogos = () => {
  if (typeof window === 'undefined') return { schoolLogo: '/logo-sekolah.png', foundationLogo: null, networkLogo: null };
  const storedSchool = localStorage.getItem(STORAGE_KEYS.schoolLogo);
  return {
    schoolLogo: storedSchool || '/logo-sekolah.png',
    foundationLogo: localStorage.getItem(STORAGE_KEYS.foundationLogo),
    networkLogo: localStorage.getItem(STORAGE_KEYS.networkLogo),
  };
};

export const setStoredLogo = (key: 'schoolLogo' | 'foundationLogo' | 'networkLogo', dataUrl: string | null) => {
  if (typeof window === 'undefined') return;
  if (dataUrl) {
    localStorage.setItem(STORAGE_KEYS[key], dataUrl);
  } else {
    localStorage.removeItem(STORAGE_KEYS[key]);
  }
};

export const OfficialSchoolLogo: React.FC<{ customSrc?: string | null; className?: string }> = ({ customSrc, className = 'w-10 h-10' }) => {
  const imgSrc = customSrc || '/logo-sekolah.png';
  return (
    <img
      src={imgSrc}
      alt="Logo Resmi SMP Alam Excellentia Pamekasan"
      className={`${className} object-contain rounded-full shadow-xs bg-white/95 p-0.5`}
      referrerPolicy="no-referrer"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/logo-sekolah.png';
      }}
    />
  );
};

export const FoundationLogo: React.FC<{ customSrc?: string | null; className?: string }> = ({ customSrc, className = 'w-10 h-10' }) => {
  if (customSrc) {
    return (
      <img
        src={customSrc}
        alt="Logo Yayasan Insan Kamil"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`${className} relative rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 p-1 flex items-center justify-center shadow-sm border border-blue-500/40 shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 6 L62 18 L78 18 L78 34 L90 46 L82 60 L87 76 L72 82 L64 96 L48 91 L34 96 L27 82 L12 76 L18 60 L9 46 L21 34 L21 18 L37 18 Z" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M50 28 C40 28 36 38 36 50 L64 50 C64 38 60 28 50 28 Z" fill="#F0FDF4" />
        <path d="M50 22 L51.5 26 L50 28 L48.5 26 Z" fill="#F97316" />
        <circle cx="50" cy="21" r="2" fill="#F97316" />
        <path d="M30 62 C38 72 62 72 70 62 C64 76 36 76 30 62 Z" fill="#60A5FA" />
        <text x="50" y="85" textAnchor="middle" fill="#BFDBFE" fontSize="6.5" fontWeight="bold">INSAN KAMIL</text>
      </svg>
    </div>
  );
};

export const NatureSchoolNetworkLogo: React.FC<{ customSrc?: string | null; className?: string }> = ({ customSrc, className = 'w-10 h-10' }) => {
  if (customSrc) {
    return (
      <img
        src={customSrc}
        alt="Logo JSAN – Jaringan Sekolah Alam Nusantara"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`${className} relative rounded-xl bg-gradient-to-br from-green-800 to-green-950 p-1 flex items-center justify-center shadow-sm border border-green-500/40 shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" fill="#14532D" stroke="#4ADE80" strokeWidth="2" />
        <path d="M50 18 C30 28 26 58 50 82 C74 58 70 28 50 18 Z" fill="#22C55E" />
        <path d="M50 18 L50 82" stroke="#BBF7D0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 36 Q38 42 34 50" stroke="#BBF7D0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M50 48 Q62 54 66 62" stroke="#BBF7D0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M50 60 Q40 66 38 72" stroke="#BBF7D0" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="68" cy="28" r="8" fill="#F97316" />
        <text x="50" y="94" textAnchor="middle" fill="#DCFCE7" fontSize="5.5" fontWeight="bold">JSAN NUSANTARA</text>
      </svg>
    </div>
  );
};

/**
 * InstitutionalBanner – shows hierarchy from LEFT (largest/JSAN) to RIGHT (smallest/SMP).
 * JSAN > Yayasan Insan Kamil > SMP Alam Excellentia
 */
export const InstitutionalBanner: React.FC<{ onOpenManager?: () => void }> = ({ onOpenManager }) => {
  const [logos, setLogos] = useState<{ schoolLogo: string | null; foundationLogo: string | null; networkLogo: string | null }>({
    schoolLogo: null,
    foundationLogo: null,
    networkLogo: null,
  });

  useEffect(() => {
    setLogos(getStoredLogos());
    const handler = () => setLogos(getStoredLogos());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <div className="bg-white border-y border-blue-100 py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Label */}
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium shrink-0">
          <Shield className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Di Bawah Naungan:</span>
        </div>

        {/* Hierarchy: JSAN (terbesar, kiri) → Yayasan → SMP (terkecil, kanan) */}
        <div className="flex items-center flex-wrap justify-center gap-4 md:gap-6">

          {/* JSAN – terbesar, di kiri */}
          <div className="flex items-center gap-2.5">
            <NatureSchoolNetworkLogo customSrc={logos.networkLogo} className="w-11 h-11" />
            <div className="text-left">
              <p className="text-xs font-extrabold text-slate-900 leading-tight">JSAN</p>
              <p className="text-[10px] text-green-700 font-semibold">Jaringan Sekolah Alam Nusantara</p>
            </div>
          </div>

          {/* Divider with arrow */}
          <div className="hidden sm:flex flex-col items-center gap-0.5">
            <span className="text-slate-300 text-base">›</span>
          </div>

          {/* Yayasan Insan Kamil – menengah */}
          <div className="flex items-center gap-2.5">
            <FoundationLogo customSrc={logos.foundationLogo} className="w-9 h-9" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">YAYASAN INSAN KAMIL</p>
              <p className="text-[10px] text-blue-700 font-medium">Pamekasan, Madura</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:flex flex-col items-center gap-0.5">
            <span className="text-slate-300 text-base">›</span>
          </div>

          {/* SMP Alam Excellentia – terkecil, di kanan */}
          <div className="flex items-center gap-2">
            <OfficialSchoolLogo customSrc={logos.schoolLogo} className="w-8 h-8" />
            <div className="text-left">
              <p className="text-[11px] font-bold text-slate-900 leading-tight">SMP ALAM EXCELLENTIA</p>
              <p className="text-[9px] text-orange-600 font-semibold">Pamekasan</p>
            </div>
          </div>
        </div>

        {/* Admin upload button */}
        {onOpenManager && (
          <button
            onClick={onOpenManager}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-md px-2.5 py-1 transition-colors shrink-0"
            title="Unggah logo resmi PNG/SVG asli sekolah jika sudah tersedia"
          >
            <Upload className="w-3.5 h-3.5 text-blue-700" />
            <span>Unggah Logo Resmi</span>
          </button>
        )}
      </div>
    </div>
  );
};
