import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { useApp } from '../context/AppContext';

export const ContactSection: React.FC = () => {
  const { settings } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Mohon isi semua data pesan');
      return;
    }
    // Direct WhatsApp dispatch option using dynamic settings.consultationWhatsapp
    const waText = encodeURIComponent(
      `Assalamu'alaikum SMP Alam Excellentia Pamekasan.\n\n` +
      `Saya: ${name}\n` +
      `No. Telp/WA: ${phone}\n` +
      `Pesan/Pertanyaan: ${message}`
    );
    window.open(`https://wa.me/62${cleanWa}?text=${waText}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="kontak" className="py-20 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase mb-3">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Hubungi Kami</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">Pademawu, Pamekasan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
            Kunjungi Kampus & Konsultasi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Pintu kami selalu terbuka untuk orang tua dan calon siswa yang ingin melihat langsung suasana belajar di alam terbuka dan berdiskusi dengan tim kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Address Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 bg-white shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                      Alamat Kampus
                    </h3>
                    <p className="text-sm text-stone-700 mt-1 font-medium">
                      {SCHOOL_INFO.name}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      {SCHOOL_INFO.address}
                    </p>
                    <p className="text-xs font-semibold text-blue-700 mt-2">
                      Yayasan Insan Kamil · JSAN Nusantara
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 bg-white shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                      Kontak WhatsApp & Telepon
                    </h3>
                    <p className="text-sm font-bold text-stone-800 mt-1">
                      {settings.consultationWhatsapp}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Layanan konsultasi PPDB & administrasi sekolah
                    </p>
                    <a
                      href={`https://wa.me/62${cleanWa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-900 mt-2"
                    >
                      Chat WhatsApp Resmi ({settings.consultationWhatsapp}) →
                    </a>
                  </div>
                </div>
              </div>

              {/* Email & Hours */}
              <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 bg-white shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-sky-50 text-sky-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                      Waktu Operasional & Email
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-stone-800 mt-1">
                      {SCHOOL_INFO.operationalHours}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Email: {SCHOOL_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
                Kirim Pesan / Permintaan Kunjungan
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Isi form berikut untuk mengirim pesan langsung ke panitia penerimaan siswa baru.
              </p>

              {submitted ? (
                <div className="my-8 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-emerald-950 text-base">Pesan Anda Telah Terkirim</h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Terima kasih telah menghubungi SMP Alam Excellentia Pamekasan. Tim kami akan segera merespons via WhatsApp atau telepon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Bapak/Ibu atau Calon Siswa"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Pesan atau Pertanyaan *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tuliskan pertanyaan seputar pendaftaran, biaya, kunjungan saung belajar, atau kurikulum..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold text-forest-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-sm transition-all uppercase tracking-wider"
                    >
                      <span>KIRIM VIA WHATSAPP</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 text-[11px] text-stone-400">
              * Data Anda dijamin kerahasiaannya dan hanya digunakan untuk keperluan komunikasi pendidikan sekolah.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
