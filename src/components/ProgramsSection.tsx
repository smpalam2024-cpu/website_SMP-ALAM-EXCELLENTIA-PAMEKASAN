import React, { useState } from 'react';
import { Mountain, BookOpen, Atom, Trees, Globe, Users, ArrowRight, Check, X } from 'lucide-react';
import { PROGRAMS } from '../data/schoolData';
import { Program } from '../types';

interface ProgramsSectionProps {
  onOpenRegister: () => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenRegister }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const getProgramIcon = (iconName: string) => {
    const className = "w-6 h-6";
    switch (iconName) {
      case 'Mountain':
        return <Mountain className={`${className} text-emerald-700`} />;
      case 'BookOpen':
        return <BookOpen className={`${className} text-amber-700`} />;
      case 'Atom':
        return <Atom className={`${className} text-sky-700`} />;
      case 'Trees':
        return <Trees className={`${className} text-emerald-800`} />;
      case 'Globe':
        return <Globe className={`${className} text-indigo-700`} />;
      case 'Users':
        return <Users className={`${className} text-teal-700`} />;
      default:
        return <Trees className={`${className} text-emerald-700`} />;
    }
  };

  return (
    <section id="program" className="py-20 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
            <span>Kurikulum Berbasis Aksi</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">Program Unggulan Sekolah</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
            Program Unggulan Sekolah Alam
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Setiap program dirancang untuk memberikan pengalaman berharga yang tidak ditemukan di sekolah biasa, memadukan kecerdasan spiritual, intelektual, fisik, dan sosial.
          </p>
        </div>

        {/* 6 Grid Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs group-hover:scale-105 transition-transform">
                    {getProgramIcon(program.icon)}
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-800">
                    {program.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display leading-snug group-hover:text-emerald-800 transition-colors">
                  {program.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {program.tagline}
                </p>

                {/* Outcomes list */}
                <div className="mt-5 space-y-2 pt-4 border-t border-stone-200/70">
                  <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                    Hasil Pembelajaran:
                  </p>
                  {program.outcomes.map((out, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="mt-6 pt-4 border-t border-stone-200/70 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">
                  {program.badge}
                </span>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>Detail Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 w-fit mb-4">
              {getProgramIcon(selectedProgram.icon)}
            </div>

            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {selectedProgram.category} · {selectedProgram.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-1">
              {selectedProgram.title}
            </h3>

            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
              {selectedProgram.description}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                Keahlian & Karakter yang Dibentuk:
              </p>
              {selectedProgram.outcomes.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setSelectedProgram(null);
                  onOpenRegister();
                }}
                className="px-5 py-2 text-xs font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors uppercase tracking-wider"
              >
                Daftar Program Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
