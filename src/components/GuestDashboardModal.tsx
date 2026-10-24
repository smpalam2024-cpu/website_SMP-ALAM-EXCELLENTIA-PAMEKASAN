import React from 'react';
import {
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight,
  User,
  CreditCard,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface GuestDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentProof: () => void;
  onOpenRegister: () => void;
}

export const GuestDashboardModal: React.FC<GuestDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenPaymentProof,
  onOpenRegister,
}) => {
  const { settings, activePaymentProof, setOpenLoginModal } = useApp();

  if (!isOpen) return null;

  const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');

  const openWhatsApp = (customTopic?: string) => {
    const topicText = customTopic ? ` terkait ${customTopic}` : '';
    const message = encodeURIComponent(
      `Assalamu'alaikum Admin SMP Alam Excellentia Pamekasan, saya pengunjung website ingin berkonsultasi${topicText}. Mohon informasinya. Terima kasih.`
    );
    window.open(`https://wa.me/62${cleanWa}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
                Dasbor Tamu Pengunjung
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold">
                Mode Lihat
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Selamat datang di portal informasi resmi SMP Alam Excellentia Pamekasan
            </p>
          </div>
        </div>

        {/* Prominent WhatsApp Consultation Feature */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-800 via-forest-900 to-forest-950 text-white shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-[at_top_right] from-amber-400/20 via-sky-400/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Layanan Konsultasi Online</span>
            </div>

            <h4 className="text-xl font-extrabold font-display text-white mt-1">
              Konsultasi Langsung via WhatsApp
            </h4>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 leading-relaxed">
              Hubungi panitia penerimaan siswa baru dan tim pamong sekolah kami untuk informasi kurikulum, survei lingkungan sekolah, atau bantuan pendaftaran.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-stone-300 uppercase">Nomor Layanan Panitia:</p>
                <p className="text-base sm:text-lg font-mono font-black text-amber-300">
                  {settings.consultationWhatsapp}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-forest-950" />
                <span>Chat Sekarang</span>
              </button>
            </div>

            {/* Quick Topic Buttons */}
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <button
                onClick={() => openWhatsApp('Alur dan Biaya Administrasi PPDB')}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-stone-100"
              >
                💬 Biaya PPDB
              </button>
              <button
                onClick={() => openWhatsApp('Program Tahfidz & Outbound Alam')}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-stone-100"
              >
                💬 Program Tahfidz
              </button>
              <button
                onClick={() => openWhatsApp('Jadwal Observasi & Kunjungan Kampus')}
                className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-stone-100"
              >
                💬 Kunjungan Kampus
              </button>
            </div>
          </div>
        </div>

        {/* Registration Progress Card for Guest */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>Status Pendaftaran Anda di Perangkat Ini</span>
            </span>
          </div>

          {activePaymentProof ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  ✓ Bukti Pembayaran Terkirim
                </p>
                <p className="text-[11px] text-stone-600">
                  Calon Siswa: <strong>{activePaymentProof.studentName}</strong> (Rp {activePaymentProof.amount})
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs"
              >
                Isi Formulir
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs text-stone-600">
                Anda belum mengirim bukti pembayaran administrasi pendaftaran.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenPaymentProof();
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold text-xs shrink-0"
              >
                Kirim Bukti Pembayaran
              </button>
            </div>
          )}
        </div>

        {/* Switch to Admin Link */}
        <div className="text-center pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span>Apakah Anda pengelola sekolah?</span>
          <button
            onClick={() => {
              onClose();
              setOpenLoginModal(true);
            }}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline"
          >
            Login sebagai Admin Utama
          </button>
        </div>

      </div>
    </div>
  );
};
