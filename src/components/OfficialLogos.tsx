import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Upload, Check } from 'lucide-react';

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
        // Fallback to /logo-sekolah.png if relative path fails
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
        alt="Logo Yayasan Insan Kamil Pamekasan"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`${className} relative rounded-xl bg-gradient-to-br from-sky-900 to-indigo-950 p-1 flex items-center justify-center text-sky-300 shadow-sm border border-sky-500/40 shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Islamic Octagram Star Background */}
        <path d="M50 6 L62 18 L78 18 L78 34 L90 46 L82 60 L87 76 L72 82 L64 96 L48 91 L34 96 L27 82 L12 76 L18 60 L9 46 L21 34 L21 18 L37 18 Z" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
        
        {/* Dome Motif */}
        <path d="M50 28 C40 28 36 38 36 50 L64 50 C64 38 60 28 50 28 Z" fill="#F0FDF4" />
        <path d="M50 22 L51.5 26 L50 28 L48.5 26 Z" fill="#FBBF24" />
        <circle cx="50" cy="21" r="2" fill="#FBBF24" />
        
        {/* Open Hands / Crescent */}
        <path d="M30 62 C38 72 62 72 70 62 C64 76 36 76 30 62 Z" fill="#38BDF8" />
        
        {/* Text Indicator */}
        <text x="50" y="85" textAnchor="middle" fill="#BAE6FD" fontSize="6.5" fontWeight="bold">INSAN KAMIL</text>
      </svg>
    </div>
  );
};

export const NatureSchoolNetworkLogo: React.FC<{ customSrc?: string | null; className?: string }> = ({ customSrc, className = 'w-10 h-10' }) => {
  if (customSrc) {
    return (
      <img
        src={customSrc}
        alt="Logo Identitas Sekolah Alam"
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className={`${className} relative rounded-xl bg-gradient-to-br from-emerald-900 to-stone-900 p-1 flex items-center justify-center text-emerald-400 shadow-sm border border-emerald-500/40 shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Organic Natural Leaf Silhouette */}
        <circle cx="50" cy="50" r="44" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
        
        {/* Big Leaf & Earth */}
        <path d="M50 18 C30 28 26 58 50 82 C74 58 70 28 50 18 Z" fill="#10B981" />
        <path d="M50 18 L50 82" stroke="#A7F3D0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 36 Q38 42 34 50" stroke="#A7F3D0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M50 48 Q62 54 66 62" stroke="#A7F3D0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M50 60 Q40 66 38 72" stroke="#A7F3D0" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Sun badge */}
        <circle cx="68" cy="28" r="8" fill="#FBBF24" />
        
        {/* Text */}
        <text x="50" y="94" textAnchor="middle" fill="#D1FAE5" fontSize="7" fontWeight="bold">SEKOLAH ALAM</text>
      </svg>
    </div>
  );
};

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
    <div className="bg-white border-y border-stone-200 py-3 px-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Info Label */}
        <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Lembaga Pendidikan Resmi Berizin & Di Bawah Naungan:</span>
        </div>

        {/* Center: The 3 official logos with titles */}
        <div className="flex items-center flex-wrap justify-center gap-6 md:gap-8">
          {/* Logo 1: SMP Alam Excellentia */}
          <div className="flex items-center gap-2.5">
            <OfficialSchoolLogo customSrc={logos.schoolLogo} className="w-9 h-9" />
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 leading-tight">SMP ALAM EXCELLENTIA</p>
              <p className="text-[10px] text-emerald-700 font-medium">Sekolah Penggerak Alam</p>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-stone-200" />

          {/* Logo 2: Yayasan Insan Kamil */}
          <div className="flex items-center gap-2.5">
            <FoundationLogo customSrc={logos.foundationLogo} className="w-9 h-9" />
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 leading-tight">YAYASAN INSAN KAMIL</p>
              <p className="text-[10px] text-sky-700 font-medium">Pamekasan, Madura</p>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-stone-200" />

          {/* Logo 3: Jaringan Sekolah Alam */}
          <div className="flex items-center gap-2.5">
            <NatureSchoolNetworkLogo customSrc={logos.networkLogo} className="w-9 h-9" />
            <div className="text-left">
              <p className="text-xs font-bold text-stone-900 leading-tight">SEKOLAH ALAM</p>
              <p className="text-[10px] text-stone-600 font-medium">Identitas & Kurikulum Alam</p>
            </div>
          </div>
        </div>

        {/* Right: Upload tool button */}
        {onOpenManager && (
          <button
            onClick={onOpenManager}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-md px-2.5 py-1 transition-colors shrink-0"
            title="Unggah logo resmi PNG/SVG asli sekolah jika sudah tersedia"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-700" />
            <span>Unggah Logo Resmi</span>
          </button>
        )}
      </div>
    </div>
  );
};
