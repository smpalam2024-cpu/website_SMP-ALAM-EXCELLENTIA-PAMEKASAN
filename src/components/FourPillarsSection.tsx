import React, { useState } from 'react';
import { HeartHandshake, Microscope, Compass, Coins, CheckCircle, ArrowRight } from 'lucide-react';
import { FOUR_PILLARS } from '../data/schoolData';
import { Pillar } from '../types';

interface FourPillarsSectionProps {
  onOpenRegister: () => void;
}

export const FourPillarsSection: React.FC<FourPillarsSectionProps> = ({ onOpenRegister }) => {
  const [activePillarId, setActivePillarId] = useState<string>(FOUR_PILLARS[0].id);

  const activePillar: Pillar = FOUR_PILLARS.find((p) => p.id === activePillarId) || FOUR_PILLARS[0];

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
      case 'Microscope':
        return <Microscope className="w-5 h-5 text-sky-600" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-600" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-emerald-700" />;
      default:
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="pilar" className="py-20 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
            <span>Kurikulum Khas Sekolah Alam</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">Pondasi Pendidikan Menyeluruh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
            Empat Pilar, Satu Tujuan: Generasi Excellent
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Kurikulum kami dirancang secara holistik untuk menyeimbangkan spiritualitas, intelektualitas ilmiah, kepemimpinan lapangan, dan kemandirian finansial.
          </p>
        </div>

        {/* 4 Interactive Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {FOUR_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-forest-950 text-white border-forest-950 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-amber-400' : 'text-emerald-700'
                      }`}
                    >
                      Pilar {pillar.number}
                    </span>
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected ? 'bg-white/10 text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {getPillarIcon(pillar.iconName)}
                    </div>
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-bold font-display leading-snug ${
                      isSelected ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <p
                  className={`text-[11px] mt-2 line-clamp-1 ${
                    isSelected ? 'text-emerald-200' : 'text-stone-500'
                  }`}
                >
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Pillar */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Col: Explanatory Content & Points */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                  <span>Pilar {activePillar.number}</span>
                  <span className="text-stone-300">·</span>
                  <span>{activePillar.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
                  {activePillar.title}
                </h3>
                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                  {activePillar.description}
                </p>

                {/* Core Curriculum Points */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Penerapan Dalam Pembelajaran:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePillar.points.map((pt, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-xs text-stone-700"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="mt-6 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium">
                  {activePillar.highlight}
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors uppercase tracking-wider"
                >
                  <span>Daftarkan Putra-Putri Anda</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#program"
                  className="inline-flex items-center justify-center px-4 py-3 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors"
                >
                  Lihat Program Terkait ↓
                </a>
              </div>
            </div>

            {/* Right Col: High Quality Visual Asset */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] bg-stone-100">
              <img
                src={activePillar.image}
                alt={activePillar.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent flex items-end p-6">
                <div>
                  <p className="text-amber-300 text-xs font-mono font-semibold">
                    {activePillar.title}
                  </p>
                  <p className="text-white text-sm font-medium mt-0.5">
                    Aktivitas nyata siswa di SMP Alam Excellentia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
