import React, { useState } from 'react';
import { X, Upload, Trash2, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { OfficialSchoolLogo, FoundationLogo, NatureSchoolNetworkLogo, setStoredLogo, getStoredLogos } from './OfficialLogos';

interface LogoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogosUpdated: () => void;
}

export const LogoManagerModal: React.FC<LogoManagerModalProps> = ({ isOpen, onClose, onLogosUpdated }) => {
  const [logos, setLogos] = useState(getStoredLogos());
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (key: 'schoolLogo' | 'foundationLogo' | 'networkLogo', file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (.png, .jpg, .svg, .webp)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setStoredLogo(key, result);
      setLogos((prev) => ({ ...prev, [key]: result }));
      setMessage(`Berhasil menyimpan file resmi untuk ${key === 'schoolLogo' ? 'SMP Alam' : key === 'foundationLogo' ? 'Yayasan Insan Kamil' : 'Sekolah Alam'}`);
      onLogosUpdated();
      setTimeout(() => setMessage(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (key: 'schoolLogo' | 'foundationLogo' | 'networkLogo') => {
    setStoredLogo(key, null);
    setLogos((prev) => ({ ...prev, [key]: null }));
    onLogosUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Kelola Tiga Logo Resmi Sekolah</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Sesuai instruksi resmi, unggah file logo asli sekolah dalam format PNG transparan, SVG, atau JPG. Sistem akan menjaga proporsi, warna, dan resolusi asli tanpa kompresi distorsi.
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        {/* 3 Upload slots */}
        <div className="space-y-5">
          {/* Slot 1: Logo SMP Alam Excellentia Pamekasan */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:border-emerald-300 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <OfficialSchoolLogo customSrc={logos.schoolLogo} className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">1. Logo SMP ALAM EXCELLENTIA PAMEKASAN</h4>
                  <p className="text-xs text-stone-500">Logo utama institusi sekolah</p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {logos.schoolLogo ? '✓ File kustom aktif' : '• Menggunakan lambang digital resmi'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-initial cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{logos.schoolLogo ? 'Ganti File' : 'Unggah File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload('schoolLogo', e.target.files[0]);
                    }}
                  />
                </label>
                {logos.schoolLogo && (
                  <button
                    onClick={() => handleReset('schoolLogo')}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Kembalikan ke lambang default"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Slot 2: Logo Yayasan Insan Kamil Pamekasan */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:border-sky-300 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <FoundationLogo customSrc={logos.foundationLogo} className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">2. Logo Yayasan Insan Kamil Pamekasan</h4>
                  <p className="text-xs text-stone-500">Yayasan penyelenggara pendidikan</p>
                  <p className="text-[11px] text-sky-700 font-medium mt-0.5">
                    {logos.foundationLogo ? '✓ File kustom aktif' : '• Menggunakan lambang digital resmi'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-initial cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-sky-700 text-white hover:bg-sky-800 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{logos.foundationLogo ? 'Ganti File' : 'Unggah File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload('foundationLogo', e.target.files[0]);
                    }}
                  />
                </label>
                {logos.foundationLogo && (
                  <button
                    onClick={() => handleReset('foundationLogo')}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Kembalikan ke lambang default"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Slot 3: Logo Identitas Sekolah Alam */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:border-emerald-300 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <NatureSchoolNetworkLogo customSrc={logos.networkLogo} className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">3. Logo Identitas Sekolah Alam</h4>
                  <p className="text-xs text-stone-500">Jaringan & falsafah pendidikan alam nusantara</p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    {logos.networkLogo ? '✓ File kustom aktif' : '• Menggunakan lambang digital resmi'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-initial cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{logos.networkLogo ? 'Ganti File' : 'Unggah File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload('networkLogo', e.target.files[0]);
                    }}
                  />
                </label>
                {logos.networkLogo && (
                  <button
                    onClick={() => handleReset('networkLogo')}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Kembalikan ke lambang default"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-stone-400" />
            <span>Format yang disarankan: PNG transparan resolusi tinggi (min 500x500px).</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
          >
            Selesai & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
