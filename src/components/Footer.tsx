import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Shield, Upload } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { OfficialSchoolLogo, FoundationLogo, NatureSchoolNetworkLogo, getStoredLogos } from './OfficialLogos';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onOpenLogoManager?: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogoManager, onOpenRegister }) => {
  const { settings } = useApp();
  const [logos, setLogos] = useState(getStoredLogos());

  useEffect(() => {
    const handler = () => setLogos(getStoredLogos());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-950 text-white border-t border-emerald-900/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer: Institutional Crests and Branding */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60 items-start">
          {/* Col 1: Main School & Foundation identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <OfficialSchoolLogo customSrc={logos.schoolLogo} className="w-12 h-12" />
              <div>
                <h3 className="text-lg font-bold font-display text-white tracking-tight">
                  SMP ALAM EXCELLENTIA
                </h3>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Pamekasan · Madura
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              Lembaga pendidikan Islam berbasis alam dan pengalaman nyata di bawah naungan Yayasan Insan Kamil Pamekasan. Membentuk generasi berakhlak mulia, cerdas berpikir, mandiri, dan bertanggung jawab.
            </p>

            {/* The 3 Official Institutional Badges */}
            <div className="pt-2 flex items-center gap-3">
              <div className="p-1 rounded-lg bg-emerald-900/40 border border-emerald-800/80" title="SMP Alam Excellentia Pamekasan">
                <OfficialSchoolLogo customSrc={logos.schoolLogo} className="w-8 h-8" />
              </div>
              <div className="p-1 rounded-lg bg-sky-950/40 border border-sky-800/80" title="Yayasan Insan Kamil Pamekasan">
                <FoundationLogo customSrc={logos.foundationLogo} className="w-8 h-8" />
              </div>
              <div className="p-1 rounded-lg bg-emerald-950/40 border border-emerald-700/80" title="Sekolah Alam Indonesia">
                <NatureSchoolNetworkLogo customSrc={logos.networkLogo} className="w-8 h-8" />
              </div>
              {onOpenLogoManager && (
                <button
                  onClick={onOpenLogoManager}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-md transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  <span>Unggah Logo</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#hero" className="hover:text-amber-300 transition-colors">Beranda</a>
              </li>
              <li>
                <a href="#visi-misi" className="hover:text-amber-300 transition-colors">Visi & Misi</a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-amber-300 transition-colors">Tentang Kami</a>
              </li>
              <li>
                <a href="#pilar" className="hover:text-amber-300 transition-colors">4 Pilar Pendidikan</a>
              </li>
              <li>
                <a href="#informasi-guru" className="hover:text-amber-300 transition-colors">Informasi Guru</a>
              </li>
              <li>
                <a href="#program" className="hover:text-amber-300 transition-colors">Program Unggulan</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-amber-300 transition-colors">Galeri Aktivitas</a>
              </li>
              <li>
                <a href="#ppdb" className="hover:text-amber-300 transition-colors">Informasi PPDB</a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-amber-300 transition-colors">Lokasi & Kontak</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sekretariat & PPDB Action */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Sekretariat & Konsultasi
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {SCHOOL_INFO.address}
            </p>
            <p className="text-xs text-stone-300">
              WhatsApp Konsultasi: <span className="text-amber-300 font-mono font-bold">{settings.consultationWhatsapp}</span>
            </p>
            <p className="text-xs text-stone-300">
              Email: <span className="text-white">{SCHOOL_INFO.email}</span>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors uppercase tracking-wider"
              >
                DAFTAR SISWA BARU (PPDB)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 SMP ALAM EXCELLENTIA PAMEKASAN · Yayasan Insan Kamil. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-300 hover:text-white transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
