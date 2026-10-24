import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, Eye, EyeOff, Sparkles, LogIn, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAsAdmin, loginAsGuest, setOpenAdminDashboard } = useApp();

  const [activeTab, setActiveTab] = useState<'admin' | 'guest'>('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAsAdmin(username, password);
    if (success) {
      setSuccessMsg('Login Admin berhasil! Membuka Dasbor Admin...');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
        setOpenAdminDashboard(true);
      }, 700);
    } else {
      setErrorMsg('Username/Email atau Password salah. Gunakan username: admin dan password: admin123');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  const fillDefaultCredentials = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Branding Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-forest-950 p-1 mx-auto mb-3 shadow-md flex items-center justify-center">
            <img
              src="/logo-sekolah.png"
              alt="Logo SMP Alam Excellentia"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
            Portal Akses Sistem
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display mt-0.5">
            SMP ALAM EXCELLENTIA
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Silakan pilih metode masuk sebagai Admin Pengelola atau Tamu Pengunjung.
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'admin'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Admin Utama</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('guest');
              setErrorMsg('');
            }}
            className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'guest'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4 text-sky-600" />
            <span>Tamu Pengunjung</span>
          </button>
        </div>

        {/* Tab Content: Admin Login */}
        {activeTab === 'admin' && (
          <div>
            {/* Admin Credential Helper Box */}
            <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Akun Resmi Admin Utama:</span>
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-amber-900">
                    Username: <strong className="text-amber-950">admin</strong> · Password: <strong className="text-amber-950">admin123</strong>
                  </p>
                  <p className="mt-0.5 text-[10px] text-amber-800">
                    Akun ini memiliki hak akses penuh untuk mengedit perkembangan website, data guru, nomor WA, dan PPDB.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fillDefaultCredentials}
                  className="px-2.5 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 rounded font-semibold text-[10px] shrink-0 transition-colors"
                >
                  Isi Cepat
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Username atau Email Admin *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan admin atau email"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Password Admin *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs sm:text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>MASUK SEBAGAI ADMIN UTAMA</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Content: Guest Login */}
        {activeTab === 'guest' && (
          <div className="text-center py-2">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-stone-50 border border-sky-100 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                Akses Tamu Pengunjung
              </h3>
              <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                Anda dapat melihat seluruh profil sekolah, 4 pilar pendidikan, informasi guru, galeri aktivitas, melakukan pendaftaran PPDB, dan berkonsultasi via WhatsApp tanpa perlu login berulang.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 text-stone-700 text-[11px] font-semibold">
                <span>Mode View-Only (Hanya Lihat)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs sm:text-sm"
            >
              <span>MASUK SEBAGAI TAMU SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
