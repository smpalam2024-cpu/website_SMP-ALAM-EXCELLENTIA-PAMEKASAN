import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, FileText, HelpCircle, Phone, Calendar, UserCheck, Lock, Unlock, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { PPDB_STEPS, FAQS } from '../data/schoolData';
import { useApp } from '../context/AppContext';

interface PPDBSectionProps {
  onOpenRegister: () => void;
  onOpenPaymentProof: () => void;
}

export const PPDBSection: React.FC<PPDBSectionProps> = ({ onOpenRegister, onOpenPaymentProof }) => {
  const { activePaymentProof, settings } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleRegisterClick = () => {
    if (!activePaymentProof) {
      alert('Perhatian: Anda belum mengirim bukti pembayaran administrasi. Anda akan diarahkan untuk mengunggah bukti pembayaran terlebih dahulu agar formulir pendaftaran dapat dibuka.');
      onOpenPaymentProof();
    } else {
      onOpenRegister();
    }
  };

  return (
    <section id="ppdb" className="py-20 sm:py-24 bg-white border-b border-stone-200 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Penerimaan Peserta Didik Baru (PPDB)</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">Tahun Ajaran Baru</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
            Alur Pendaftaran & Registrasi Siswa
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Pendaftaran dirancang transparan dan terarah: dimulai dari administrasi awal, observasi minat bakat alami (talent mapping), wawancara orang tua, hingga pengenalan budaya sekolah alam.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PPDB_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                idx === 0
                  ? 'border-emerald-300 bg-emerald-50/40 shadow-sm'
                  : 'border-stone-200 bg-stone-50/60 hover:border-emerald-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-display text-emerald-700">
                    {item.step}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? 'bg-emerald-600 text-white' : 'bg-white border border-stone-200 text-stone-600'
                  }`}>
                    {idx === 0 ? <CreditCard className="w-4 h-4" /> : `✓`}
                  </div>
                </div>
                <h3 className="text-base font-bold text-stone-900 font-display leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span>Tahap {idx + 1}</span>
                {idx === 0 && <span className="text-amber-600 font-bold">Kirim Bukti Pembayaran</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Verification Status & Action Card */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-50 via-white to-stone-100 border border-stone-200 shadow-md">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Left: Status info */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                {activePaymentProof ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bukti Pembayaran Terverifikasi ({activePaymentProof.studentName})</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Langkah Wajib Sebelum Isi Formulir</span>
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                {activePaymentProof
                  ? 'Administrasi Lengkap · Formulir Pendaftaran Siap Diisi'
                  : 'Tahap Pembayaran Administrasi Pendaftaran'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activePaymentProof
                  ? 'Terima kasih, Anda telah mengunggah bukti pembayaran. Silakan klik tombol "Daftar Sekarang" untuk mengisi biodata lengkap calon siswa.'
                  : 'Sesuai prosedur, silakan lakukan pembayaran administrasi pendaftaran (Rp 150.000) dan unggah bukti transfer. Fitur formulir "Daftar Sekarang" akan otomatis terbuka setelah bukti dikirim.'}
              </p>
            </div>

            {/* Right: Dual Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              
              {/* Button 1: Kirim Bukti Pembayaran */}
              <button
                onClick={onOpenPaymentProof}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                <CreditCard className="w-4 h-4 text-emerald-300" />
                <span>{activePaymentProof ? 'Lihat / Kirim Bukti Baru' : 'Kirim Bukti Pembayaran'}</span>
              </button>

              {/* Button 2: Daftar Sekarang (Conditionally Unlocked) */}
              <button
                onClick={handleRegisterClick}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all uppercase tracking-wider ${
                  activePaymentProof
                    ? 'bg-amber-400 hover:bg-amber-300 text-forest-950 active:scale-98 shadow-amber-950/15'
                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300 border border-stone-300'
                }`}
              >
                {activePaymentProof ? (
                  <>
                    <Unlock className="w-4 h-4 text-emerald-800" />
                    <span>DAFTAR SEKARANG (TERBUKA)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-stone-500" />
                    <span>DAFTAR SEKARANG (TERKUNCI)</span>
                  </>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

        {/* Action Banner Card */}
        <div className="rounded-3xl bg-gradient-to-br from-forest-950 via-emerald-900 to-forest-900 text-white p-8 sm:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-[at_top_right] from-amber-400/20 via-sky-400/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Kuota Terbatas Demi Pendampingan Personal & Nyaman
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-2 leading-tight">
              Ingin Berkonsultasi Terlebih Dahulu?
            </h3>
            <p className="text-sm sm:text-base text-stone-200 mt-3 leading-relaxed">
              Tim pamong kami siap menyambut pertanyaan Anda seputar kurikulum, sistem belajar di alam terbuka, dan jadwal observasi siswa.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleRegisterClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                <span>PENDAFTARAN SISWA BARU</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dynamic Consultation WhatsApp Button using settings */}
              <a
                href={`https://wa.me/62${settings.consultationWhatsapp.replace(/^0+/, '')}?text=${encodeURIComponent("Assalamu'alaikum Panitia PPDB SMP Alam Excellentia Pamekasan, saya ingin berkonsultasi seputar pendaftaran siswa baru.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Konsultasi WA ({settings.consultationWhatsapp})</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-display text-stone-900">
              Pertanyaan yang Sering Diajukan (FAQ PPDB)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Informasi lengkap seputar pembelajaran dan alur penerimaan
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm font-display hover:text-emerald-800"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
