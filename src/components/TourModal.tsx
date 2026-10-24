import React from 'react';
import { X, Trees, HeartHandshake, Compass, BookOpen, Sun, Clock, CheckCircle2 } from 'lucide-react';
import { ABOUT_IMAGE, SCHOOL_INFO } from '../data/schoolData';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ isOpen, onClose, onOpenRegister }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-700 uppercase mb-2">
          <Trees className="w-4 h-4" />
          <span>Profil & Filosofi Sekolah</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
          Kenali Lebih Dekat SMP Alam Excellentia
        </h3>
        <p className="text-stone-600 text-sm mt-2 leading-relaxed">
          Di bawah naungan Yayasan Insan Kamil Pamekasan, kami meyakini bahwa setiap anak lahir dengan fitrah kebaikan dan potensi kecerdasan unik yang bertumbuh optimal saat berinteraksi harmonis dengan alam semesta.
        </p>

        {/* Hero image preview inside modal */}
        <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] border border-stone-200 relative">
          <img
            src={ABOUT_IMAGE}
            alt="Suasana saung belajar alami SMP Alam Excellentia"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
            <p className="text-white text-xs sm:text-sm font-medium">
              Saung Belajar Alami: Menghilangkan sekat artifisial antara ilmu dan realitas kehidupan.
            </p>
          </div>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="mt-8 space-y-4">
          <h4 className="text-base font-bold text-stone-900 font-display">Tiga Pondasi Belajar Alami</h4>
          
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
            <h5 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Alam Semesta Sebagai Media & Guru Kedua
            </h5>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Pohon, tanah, air, serangga, cuaca, dan ekosistem lokal Madura menjadi sumber belajar autentik untuk fisika, biologi, matematika, maupun sosiologi.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
            <h5 className="font-bold text-amber-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Pendidik Sebagai Fasilitator & Teladan (Guru Pamong)
            </h5>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Guru tidak memposisikan diri sebagai satu-satunya pemilik kebenaran, melainkan pembimbing yang mendampingi proses eksplorasi dan mencontohkan akhlakul karimah.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/50">
            <h5 className="font-bold text-sky-950 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              Kemandirian Hidup & Jiwa Solutif
            </h5>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Siswa dilatih mencuci piring sendiri, merawat kebun bersama, mengatasi rintangan outbound, hingga merancang projek usaha mandiri.
            </p>
          </div>
        </div>

        {/* Daily Rhythm / Ritme Harian Siswa */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <h4 className="text-base font-bold text-stone-900 font-display mb-3">Ritme Harian Pembelajaran</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <p className="font-bold text-emerald-800">Pagi (07.15 - 09.30)</p>
              <p className="text-stone-600 mt-1">Sholat Dhuha, Tahfidz & Tadabbur Qur’an, Morning Briefing Kepemimpinan.</p>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <p className="font-bold text-emerald-800">Siang (09.45 - 12.30)</p>
              <p className="text-stone-600 mt-1">Eksplorasi Sains Alam, Riset Proyek, Matematika Terapan, dan Bahasa.</p>
            </div>
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
              <p className="font-bold text-emerald-800">Sore (13.00 - 15.30)</p>
              <p className="text-stone-600 mt-1">Sholat Dzuhur Berjamaah, Farming & Kebun Organik, Outbound Skill & Evaluasi Harian.</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            Kampus: {SCHOOL_INFO.location}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="flex-1 sm:flex-initial px-5 py-2 text-xs font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors uppercase tracking-wider"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
