import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Award, MapPin, Users, Phone, Target } from 'lucide-react';
import { HERO_IMAGE, SCHOOL_INFO } from '../data/schoolData';
import { useApp } from '../context/AppContext';

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
      {/* Background Photography with High Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Siswa SMP Alam Excellentia Pamekasan belajar aktif di alam terbuka"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/85 via-forest-950/50 to-forest-950/95" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-amber-500/15 via-sky-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          
          {/* Logo & Tagline Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-white/95 p-1 shadow-md border border-white/20 shrink-0">
              <img
                src={settings.schoolLogo || '/logo-sekolah.png'}
                alt="Logo Sekolah"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{settings.tagline}</span>
            </div>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12] mb-5 [text-wrap:balance]"
          >
            BELAJAR DARI ALAM, BERTUMBUH MENJADI PEMIMPIN MASA DEPAN
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-stone-200/95 leading-relaxed font-normal mb-8 max-w-2xl">
            {SCHOOL_INFO.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-lg shadow-amber-950/20 transition-all uppercase tracking-wider"
            >
              <span>PENDAFTARAN SISWA BARU</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleConsultation}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800/80 hover:bg-emerald-700/90 active:scale-98 border border-emerald-500/40 rounded-xl backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Konsultasi WA ({settings.consultationWhatsapp})</span>
            </button>

            <a
              href="#visi-misi"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-200 bg-white/10 hover:bg-white/20 active:scale-98 border border-white/20 rounded-xl backdrop-blur-md transition-all"
            >
              <Target className="w-4 h-4 text-amber-300" />
              <span>Visi & Misi</span>
            </a>
          </div>
        </div>

        {/* 4-Item Proof / Value Strip Below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/15">
          <div className="bg-forest-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-emerald-300 font-medium">Kurikulum Unggul</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">4 Pilar Pendidikan</p>
            <p className="text-[11px] text-stone-300 mt-1">Akhlak, Logika, Lead & Bisnis</p>
          </div>

          <div className="bg-forest-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-amber-300 font-medium">Metode Belajar</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Experiential Learning</p>
            <p className="text-[11px] text-stone-300 mt-1">Eksplorasi & riset nyata</p>
          </div>

          <div className="bg-forest-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-sky-300 font-medium">Karakter & Spiritual</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Tahfidz & Adab</p>
            <p className="text-[11px] text-stone-300 mt-1">Tadabbur ayat kauniyah</p>
          </div>

          <div className="bg-forest-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 sm:p-4">
            <p className="text-xs text-emerald-300 font-medium">Lingkungan Asri</p>
            <p className="text-base sm:text-lg font-bold text-white font-display mt-0.5">Pamekasan, Madura</p>
            <p className="text-[11px] text-stone-300 mt-1">Kampus hijau tanpa sekat</p>
          </div>
        </div>
      </div>
    </section>
  );
};
