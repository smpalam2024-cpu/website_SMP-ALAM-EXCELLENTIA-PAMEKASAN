import React from 'react';
import { Phone, ArrowRight, Target, MapPin } from 'lucide-react';
import { HERO_IMAGE, SCHOOL_INFO } from '../data/schoolData';
import { useApp } from '../context/AppContext';
import { HexagonalVault } from './HexagonalVault';

interface HeroProps {
  onOpenRegister: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onExplore }) => {
  const { settings, isGuest, setOpenGuestDashboard } = useApp();

  const handleConsultation = () => {
    const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');
    window.open(`https://wa.me/62${cleanWa}?text=${encodeURIComponent("Assalamu'alaikum Admin SMP Alam Excellentia, saya ingin berkonsultasi seputar pendaftaran sekolah.")}`, '_blank');
  };

  return (
    <section id="hero" className="relative min-h-[94vh] flex flex-col justify-end text-white overflow-hidden pt-28 pb-12 sm:pb-16">
      {/* Background Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Siswa SMP Alam Excellentia Pamekasan belajar aktif di alam terbuka"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Blue-tinted dark overlay for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/60 to-blue-950/95" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-orange-500/15 via-sky-500/10 to-transparent pointer-events-none" />
        <HexagonalVault
          className="absolute inset-0 w-full h-full"
          hexColor="rgba(74, 222, 128, 0.15)"
          glowColor="rgba(249, 115, 22, 0.55)"
          glowRadius={200}
          maxOpacity={0.85}
          cols={22}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-white/95 p-1 shadow-md border border-white/20 shrink-0">
              <img
                src={settings.schoolLogo || '/logo-sekolah.png'}
                alt="Logo SMP Alam Excellentia"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-xs font-bold text-orange-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
              <span>{settings.tagline}</span>
            </div>
          </div>

          {/* JSAN Hierarchy Info */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] font-semibold text-white/70">
            <span className="px-2 py-0.5 rounded-md bg-green-500/20 border border-green-400/30 text-green-300">JSAN – Jaringan Sekolah Alam Nusantara</span>
            <span className="text-white/40">›</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300">Yayasan Insan Kamil</span>
            <span className="text-white/40">›</span>
            <span className="px-2 py-0.5 rounded-md bg-orange-500/20 border border-orange-400/30 text-orange-300">SMP Alam Excellentia</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12] mb-4 [text-wrap:balance]">
            GROWING TOGETHER<br />
            <span className="text-orange-400">WITH EXCELLENT</span>
          </h1>

          {/* Address */}
          <div className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
            <MapPin className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span>Jl. Lawangan Daya No.114 Pademawu Pamekasan</span>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal mb-8 max-w-2xl">
            {SCHOOL_INFO.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 active:scale-98 rounded-xl shadow-lg shadow-orange-950/30 transition-all uppercase tracking-wider"
            >
              <span>PENDAFTARAN SISWA BARU</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleConsultation}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700/80 hover:bg-blue-600/90 active:scale-98 border border-blue-400/40 rounded-xl backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-blue-300" />
              <span>Konsultasi WA ({settings.consultationWhatsapp})</span>
            </button>

            <a
              href="#visi-misi"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 active:scale-98 border border-white/20 rounded-xl backdrop-blur-md transition-all"
            >
              <Target className="w-4 h-4 text-green-300" />
              <span>Visi &amp; Misi</span>
            </a>
          </div>
        </div>

        {/* Value Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/15">
          <div className="bg-blue-900/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-green-300 font-medium">Kurikulum Unggul</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">4 Pilar Pendidikan</p>
            <p className="text-[11px] text-white/60 mt-1">Akhlak, Logika, Bisnis & Leadership</p>
          </div>

          <div className="bg-blue-900/50 backdrop-blur-sm border border-orange-400/20 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-orange-300 font-medium">Metode Belajar</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Experiential Learning</p>
            <p className="text-[11px] text-white/60 mt-1">Eksplorasi &amp; riset nyata</p>
          </div>

          <div className="bg-blue-900/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-blue-300 font-medium">Karakter &amp; Spiritual</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Tahfidz &amp; Adab</p>
            <p className="text-[11px] text-white/60 mt-1">Tadabbur ayat kauniyah</p>
          </div>

          <div className="bg-blue-900/50 backdrop-blur-sm border border-green-400/20 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-green-300 font-medium">Lokasi</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Pamekasan, Madura</p>
            <p className="text-[11px] text-white/60 mt-1">Kampus hijau tanpa sekat</p>
          </div>
        </div>
      </div>
    </section>
  );
};
