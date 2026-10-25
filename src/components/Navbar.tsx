import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, User, Phone, Sparkles, LogIn } from 'lucide-react';
import { OfficialSchoolLogo } from './OfficialLogos';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenPaymentProof: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, onOpenPaymentProof }) => {
  const {
    isAdmin,
    currentUser,
    setOpenLoginModal,
    setOpenAdminDashboard,
    setOpenGuestDashboard,
    settings,
    unreadCount,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Visi & Misi', href: '#visi-misi' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: '4 Pilar', href: '#pilar' },
    { label: 'Informasi Guru', href: '#informasi-guru' },
    { label: 'PPDB Siswa Baru', href: '#ppdb' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const handleConsultation = () => {
    const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');
    window.open(`https://wa.me/62${cleanWa}?text=${encodeURIComponent("Assalamu'alaikum Admin SMP Alam Excellentia, saya ingin berkonsultasi seputar pendaftaran sekolah.")}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-blue-950/95 backdrop-blur-md shadow-lg border-b border-blue-900/60 py-2.5'
          : 'bg-gradient-to-b from-black/80 via-black/45 to-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand Wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-3 group text-left shrink-0"
            aria-label="SMP ALAM EXCELLENTIA PAMEKASAN Beranda"
          >
            <OfficialSchoolLogo
              customSrc={settings.schoolLogo}
              className="w-10 h-10 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white font-display leading-tight whitespace-nowrap">
                SMP ALAM EXCELLENTIA
              </span>
              <span className="text-[10px] font-semibold text-green-300 tracking-wider uppercase whitespace-nowrap">
                SAE · PAMEKASAN
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-stone-200">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap hover:text-orange-300 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons Zone */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Consultation WA Quick Button */}
            <button
              onClick={handleConsultation}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-green-200 hover:text-white bg-green-900/60 hover:bg-green-800/80 border border-green-700/60 rounded-xl transition-colors"
              title={`Konsultasi via WA: ${settings.consultationWhatsapp}`}
            >
              <Phone className="w-3.5 h-3.5 text-green-400" />
              <span>Konsultasi WA</span>
            </button>

            {/* Login / Dashboard Button */}
            {isAdmin ? (
              <button
                onClick={() => setOpenAdminDashboard(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-400 rounded-xl shadow-xs transition-all uppercase tracking-wider"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Dasbor Admin</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setOpenLoginModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-orange-300" />
                <span>Login / Tamu</span>
              </button>
            )}

            {/* Register CTA */}
            <button
              onClick={onOpenPaymentProof}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 active:scale-98 rounded-xl shadow-md transition-all uppercase tracking-wider"
            >
              <span>PPDB 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setOpenLoginModal(true)}
              className="px-2.5 py-1.5 text-[11px] font-bold text-white bg-orange-500 rounded-lg whitespace-nowrap"
            >
              {isAdmin ? 'Admin' : 'Login'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-blue-900/60 pb-4 space-y-2 text-sm bg-blue-950/98 rounded-2xl p-4 shadow-xl">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg text-slate-200 hover:text-orange-300 hover:bg-white/5 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleConsultation();
                }}
                className="w-full py-2.5 rounded-xl bg-green-900 text-green-200 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Konsultasi WA ({settings.consultationWhatsapp})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) setOpenAdminDashboard(true);
                  else setOpenLoginModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                {isAdmin ? <ShieldCheck className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                <span>{isAdmin ? 'Buka Dasbor Admin' : 'Login / Akses Tamu'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPaymentProof();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs uppercase"
              >
                Pendaftaran Siswa Baru (PPDB)
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
