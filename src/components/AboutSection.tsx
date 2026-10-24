import React, { useState } from 'react';
import { Compass, ShieldCheck, Sprout, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { ABOUT_IMAGE, THREE_ADVANTAGES, SCHOOL_INFO } from '../data/schoolData';
import { TourModal } from './TourModal';

interface AboutSectionProps {
  onOpenRegister: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenRegister }) => {
  const [tourOpen, setTourOpen] = useState(false);

  const icons: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />,
    Sprout: <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />,
  };

  return (
    <section id="tentang" className="py-20 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
            <span>Tentang Sekolah Kami</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">Yayasan Insan Kamil Pamekasan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
            Lebih dari Sekadar Sekolah
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            SMP Alam Excellentia Pamekasan adalah ruang tumbuh bagi peserta didik untuk mengenal potensi diri, membangun karakter, mengembangkan kemampuan berpikir, serta belajar menghadapi tantangan kehidupan melalui pengalaman nyata.
          </p>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Visual Photography Frame */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex-1 min-h-[380px] sm:min-h-[440px] bg-stone-100 group">
              <img
                src={ABOUT_IMAGE}
                alt="Suasana kelas alam di saung kayu SMP Alam Excellentia Pamekasan"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle Natural Overlay Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/85 via-forest-950/40 to-transparent p-6 text-white">
                <p className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  Lingkungan Belajar Terbuka
                </p>
                <p className="text-sm font-medium text-stone-100 mt-1 leading-snug">
                  Belajar tanpa sekat tembok kaku, mengasah nalar kritis dan interaksi langsung dengan ciptaan Allah SWT.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Three Key Advantages & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {THREE_ADVANTAGES.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 hover:border-emerald-300 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-white border border-stone-200 shadow-xs shrink-0">
                      {icons[item.iconName] || <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions & Trigger */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setTourOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-sm transition-all uppercase tracking-wider"
              >
                <span>KENALI SEKOLAH KAMI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all uppercase tracking-wider"
              >
                <span>Konsultasi Masuk Siswa</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Modal */}
      <TourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onOpenRegister={onOpenRegister}
      />
    </section>
  );
};
