import React, { useState } from 'react';
import { HeartHandshake, Microscope, Compass, Coins, CheckCircle, ArrowRight, ChevronRight, X, BookOpen } from 'lucide-react';
import { FOUR_PILLARS, PillarWithPrograms, PillarProgram } from '../data/schoolData';

interface FourPillarsSectionProps {
  onOpenRegister: () => void;
}

const PILLAR_COLORS = [
  { bg: 'bg-blue-700', ring: 'ring-orange-400/40', text: 'text-orange-400', badge: 'text-orange-300', check: 'text-green-400', highlight: 'bg-green-500/10 border-green-500/30 text-green-100' },
  { bg: 'bg-blue-700', ring: 'ring-blue-400/40', text: 'text-blue-300', badge: 'text-blue-200', check: 'text-blue-300', highlight: 'bg-blue-500/10 border-blue-500/30 text-blue-100' },
  { bg: 'bg-blue-700', ring: 'ring-orange-400/40', text: 'text-orange-300', badge: 'text-orange-200', check: 'text-orange-300', highlight: 'bg-orange-500/10 border-orange-500/30 text-orange-100' },
  { bg: 'bg-blue-700', ring: 'ring-green-400/40', text: 'text-green-300', badge: 'text-green-200', check: 'text-green-300', highlight: 'bg-green-500/10 border-green-500/30 text-green-100' },
];

const getPillarIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'HeartHandshake': return <HeartHandshake className={`${className} text-orange-500`} />;
    case 'Microscope': return <Microscope className={`${className} text-blue-500`} />;
    case 'Coins': return <Coins className={`${className} text-orange-500`} />;
    case 'Compass': return <Compass className={`${className} text-green-500`} />;
    default: return <CheckCircle className={`${className} text-blue-500`} />;
  }
};

// Program detail modal
const ProgramModal: React.FC<{ program: PillarProgram; pillarTitle: string; onClose: () => void }> = ({ program, pillarTitle, onClose }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-5 flex items-start justify-between">
        <div>
          <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider mb-1">Pilar {pillarTitle}</p>
          <h3 className="text-xl font-extrabold text-white font-display">{program.name}</h3>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 ml-3">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Deskripsi Program</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{program.description}</p>
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const FourPillarsSection: React.FC<FourPillarsSectionProps> = ({ onOpenRegister }) => {
  const [activePillarId, setActivePillarId] = useState<string>(FOUR_PILLARS[0].id);
  const [selectedProgram, setSelectedProgram] = useState<{ program: PillarProgram; pillarTitle: string } | null>(null);

  const activePillar: PillarWithPrograms = FOUR_PILLARS.find((p) => p.id === activePillarId) || FOUR_PILLARS[0];
  const pillarIndex = FOUR_PILLARS.findIndex(p => p.id === activePillarId);
  const colors = PILLAR_COLORS[pillarIndex] || PILLAR_COLORS[0];

  return (
    <section id="pilar" className="py-20 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase mb-3">
            <span>Kurikulum Khas Sekolah Alam</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">4 Pilar Pendidikan Menyeluruh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Empat Pilar,{' '}
            <span className="text-orange-500">Satu Tujuan</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Kurikulum kami dirancang secara holistik: Akhlak sebagai fondasi, Logika sebagai penggerak ilmu, Bisnis sebagai kemandirian, dan Kepemimpinan sebagai mahkota karakter.
          </p>
        </div>

        {/* 4 Pillar Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {FOUR_PILLARS.map((pillar, idx) => {
            const isSelected = pillar.id === activePillar.id;
            const c = PILLAR_COLORS[idx];
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? `bg-blue-800 text-white border-blue-800 shadow-md ring-2 ${c.ring}`
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold ${isSelected ? c.text : 'text-blue-600'}`}>
                      Pilar {pillar.number}
                    </span>
                    <div className={`p-1.5 rounded-md ${isSelected ? 'bg-white/10' : 'bg-slate-100'}`}>
                      {getPillarIcon(pillar.iconName)}
                    </div>
                  </div>
                  <h3 className={`text-sm sm:text-base font-extrabold font-display leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>
                </div>
                <p className={`text-[11px] mt-2 line-clamp-1 ${isSelected ? c.badge : 'text-slate-400'}`}>
                  {pillar.programs.length} Program
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detail */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Content */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  <span>Pilar {activePillar.number}</span>
                  <span className="text-slate-300">·</span>
                  <span>{activePillar.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{activePillar.title}</h3>
                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">{activePillar.description}</p>

                {/* Core Points */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Poin Utama Pembelajaran:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRAMS LIST */}
                <div className="mt-7">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Program di Pilar {activePillar.title}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.programs.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => setSelectedProgram({ program: prog, pillarTitle: activePillar.title })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all hover:shadow-xs group"
                      >
                        <span>{prog.name}</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlight */}
                <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm text-orange-900 font-medium">
                  {activePillar.highlight}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 rounded-xl shadow-sm transition-colors uppercase tracking-wider"
                >
                  <span>Daftarkan Putra-Putri Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#program"
                  className="inline-flex items-center justify-center px-4 py-3 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
                >
                  Lihat Program Terkait ↓
                </a>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] bg-slate-100">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <p className="text-orange-300 text-xs font-mono font-semibold">{activePillar.title}</p>
                  <p className="text-white text-sm font-medium mt-0.5">Aktivitas nyata siswa di SMP Alam Excellentia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <ProgramModal
          program={selectedProgram.program}
          pillarTitle={selectedProgram.pillarTitle}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
};
