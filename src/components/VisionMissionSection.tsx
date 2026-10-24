import React from 'react';
import { Target, Compass, Sparkles, CheckCircle2, Award, Heart, BookOpen, Lightbulb, TrendingUp, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VisionMissionSection: React.FC = () => {
  const { settings, isAdmin, setOpenAdminDashboard, setActiveAdminTab } = useApp();

  const missionIcons = [
    <Heart className="w-5 h-5 text-emerald-600" />,
    <Target className="w-5 h-5 text-sky-600" />,
    <Lightbulb className="w-5 h-5 text-amber-500" />,
    <TrendingUp className="w-5 h-5 text-emerald-600" />,
    <Leaf className="w-5 h-5 text-teal-600" />,
  ];

  const missionBadgeColors = [
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-sky-50 text-sky-700 border-sky-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
    'bg-teal-50 text-teal-700 border-teal-200',
  ];

  return (
    <section id="visi-misi" className="py-20 sm:py-24 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-b border-stone-200 relative overflow-hidden">
      {/* Decorative Natural Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Special Philosophical Banner & Tagline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-700/20 shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold tracking-wider text-emerald-900 uppercase font-display">
              {settings.tagline}
            </span>
          </div>

          {/* Special Colored Quote: PENGALAMAN ADALAH GURU TERBAIK */}
          <div className="my-5 p-5 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-stone-200/90 shadow-md shadow-emerald-950/5">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">
              Falsafah Pendidikan Sekolah Alam
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-snug">
              <span className="text-emerald-700">{settings.quoteFirst || 'PENG'}</span>
              <span className="text-amber-500 font-extrabold underline decoration-amber-400 decoration-wavy decoration-2">
                {settings.quoteHighlight1 || 'ALAM'}
              </span>
              <span className="text-emerald-700">{settings.quoteMiddle || 'AN ADALAH '}</span>
              <span className="text-amber-500 font-extrabold">
                {settings.quoteHighlight2 || 'GURU TERBAIK'}
              </span>
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
              Belajar tidak terbatas oleh dinding kelas. Alam semesta menjadi laboratorium hidup untuk mengasah akal budi, adab, dan kemandirian.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setActiveAdminTab('settings');
                setOpenAdminDashboard(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 px-3 py-1 rounded-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Edit Visi, Misi & Tagline di Dasbor Admin</span>
            </button>
          )}
        </div>

        {/* 2-Column Split: VISI (Left Banner) & 5 MISI (Right Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: VISI Heroic Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-3xl bg-gradient-to-br from-forest-950 via-emerald-900 to-forest-900 text-white p-8 sm:p-10 shadow-xl border border-emerald-800/40 flex-1 flex flex-col justify-between overflow-hidden group">
              {/* Radial Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial-[at_top_right] from-amber-400/25 via-sky-400/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Visi Utama Sekolah</span>
                </div>

                <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-widest mb-3">
                  SMP ALAM EXCELLENTIA PAMEKASAN
                </h3>

                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white leading-snug tracking-tight text-balance">
                  &ldquo;{settings.vision}&rdquo;
                </blockquote>

                <p className="mt-6 text-xs sm:text-sm text-stone-200/90 leading-relaxed">
                  Visi ini menjadi kompas seluruh aktivitas belajar, memadukan ketauhidan, kemandirian karakter, kecerdasan nalar analitis, dan tanggung jawab sosial berbasis potensi unik setiap anak.
                </p>
              </div>

              {/* Pillars Highlight Pills at Bottom */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/15 grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="block text-xs font-extrabold text-amber-300 font-display">CERDAS</span>
                  <span className="text-[10px] text-stone-300">Nalar & Riset</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="block text-xs font-extrabold text-emerald-300 font-display">MANDIRI</span>
                  <span className="text-[10px] text-stone-300">Jiwa Bisnis</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="block text-xs font-extrabold text-sky-300 font-display">BERAKHLAK</span>
                  <span className="text-[10px] text-stone-300">Karakter Islami</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 5 MISI Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  5 Misi Strategis Pendidikan
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Aksi Nyata & Terarah
              </span>
            </div>

            {settings.missions.map((mission, idx) => {
              // Strip numbering if already included in string
              const cleanMission = mission.replace(/^[0-9]+[.\s\-]+/, '');
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4 group"
                >
                  {/* Number Badge */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black font-display shrink-0 border ${missionBadgeColors[idx % missionBadgeColors.length]} group-hover:scale-105 transition-transform`}>
                    0{idx + 1}
                  </div>

                  {/* Mission Content */}
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                      {cleanMission}
                    </p>
                  </div>

                  {/* Icon Indicator */}
                  <div className="p-1.5 rounded-lg bg-stone-50 group-hover:bg-emerald-50 transition-colors shrink-0">
                    {missionIcons[idx % missionIcons.length]}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
