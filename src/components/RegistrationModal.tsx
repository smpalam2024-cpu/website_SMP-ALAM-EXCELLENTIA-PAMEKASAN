import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Download, Phone, ShieldCheck, User, Calendar, MapPin, School, AlertCircle } from 'lucide-react';
import { RegistrationFormData } from '../types';
import { useApp } from '../context/AppContext';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPaymentProof: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onOpenPaymentProof,
}) => {
  const { activePaymentProof, submitStudentRegistration, settings } = useApp();

  const [formData, setFormData] = useState<RegistrationFormData>({
    studentName: '',
    gender: 'Laki-laki',
    birthPlaceDate: '',
    originSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    programInterest: 'Sekolah Alam Reguler & Kepemimpinan',
    notes: '',
  });

  const [submittedData, setSubmittedData] = useState<{ regCode: string; date: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initial names from payment proof if available
  useEffect(() => {
    if (activePaymentProof && isOpen) {
      setFormData((prev) => ({
        ...prev,
        studentName: prev.studentName || activePaymentProof.studentName,
        parentName: prev.parentName || activePaymentProof.parentName,
        parentPhone: prev.parentPhone || activePaymentProof.parentPhone,
      }));
    }
  }, [activePaymentProof, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.studentName.trim()) errs.studentName = 'Nama calon siswa wajib diisi';
    if (!formData.birthPlaceDate.trim()) errs.birthPlaceDate = 'Tempat & tanggal lahir wajib diisi';
    if (!formData.originSchool.trim()) errs.originSchool = 'Asal sekolah (SD/MI) wajib diisi';
    if (!formData.parentName.trim()) errs.parentName = 'Nama orang tua/wali wajib diisi';
    if (!formData.parentPhone.trim() || formData.parentPhone.length < 9) {
      errs.parentPhone = 'Nomor WhatsApp valid wajib diisi (minimal 9 digit)';
    }
    if (!formData.address.trim()) errs.address = 'Alamat domisili wajib diisi';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newStudent = submitStudentRegistration(formData, activePaymentProof?.id);
    const submissionDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setSubmittedData({ regCode: newStudent.regCode, date: submissionDate });
  };

  const handleSendWhatsApp = () => {
    if (!submittedData) return;
    const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');
    const message = encodeURIComponent(
      `Assalamu'alaikum Panitia PPDB SMP Alam Excellentia Pamekasan.\n\n` +
      `Saya bermaksud mengonfirmasi formulir pendaftaran PPDB online:\n` +
      `• No. Registrasi: ${submittedData.regCode}\n` +
      `• Nama Calon Siswa: ${formData.studentName}\n` +
      `• Asal Sekolah: ${formData.originSchool}\n` +
      `• Orang Tua/Wali: ${formData.parentName}\n` +
      `• No. WA: ${formData.parentPhone}\n` +
      `• Program Peminatan: ${formData.programInterest}\n` +
      `• Alamat: ${formData.address}\n` +
      `• Status Administrasi: Bukti Pembayaran Terverifikasi\n\n` +
      `Mohon petunjuk tahapan observasi selanjutnya. Terima kasih.`
    );
    window.open(`https://wa.me/62${cleanWa}?text=${message}`, '_blank');
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      studentName: '',
      gender: 'Laki-laki',
      birthPlaceDate: '',
      originSchool: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      address: '',
      programInterest: 'Sekolah Alam Reguler & Kepemimpinan',
      notes: '',
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedData ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Tahap 2: Formulir Lengkap Siswa Baru
                </span>
                {activePaymentProof ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Administrasi Lunas</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Bukti Belum Dikirim</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                Pendaftaran Siswa Baru (PPDB)
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-stone-600">
                Silakan lengkapi biodata calon peserta didik untuk persiapan jadwal observasi minat bakat dan wawancara.
              </p>
            </div>

            {/* Warning if payment proof not present */}
            {!activePaymentProof && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Anda belum mengirim bukti pembayaran administrasi. Sebaiknya unggah bukti terlebih dahulu.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPaymentProof();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold text-xs shrink-0"
                >
                  Kirim Bukti Pembayaran
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Data Siswa */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Data Calon Siswa</span>
                </h3>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Lengkap Calon Siswa *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Sesuai Akta Kelahiran / Ijazah"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.studentName ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                    } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                  />
                  {errors.studentName && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.studentName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Jenis Kelamin *
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Tempat & Tanggal Lahir *
                    </label>
                    <input
                      type="text"
                      value={formData.birthPlaceDate}
                      onChange={(e) => setFormData({ ...formData, birthPlaceDate: e.target.value })}
                      placeholder="Pamekasan, 12 Mei 2013"
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.birthPlaceDate ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                    />
                    {errors.birthPlaceDate && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.birthPlaceDate}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Asal Sekolah (SD / MI) *
                  </label>
                  <input
                    type="text"
                    value={formData.originSchool}
                    onChange={(e) => setFormData({ ...formData, originSchool: e.target.value })}
                    placeholder="SDN Barurambat 1 / MI Al-Hikmah"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.originSchool ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                    } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                  />
                  {errors.originSchool && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.originSchool}</span>
                  )}
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Data Orang Tua / Wali</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Orang Tua / Wali *
                    </label>
                    <input
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="Nama lengkap Ayah/Ibu"
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.parentName ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                    />
                    {errors.parentName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.parentName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp Orang Tua *
                    </label>
                    <input
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      placeholder="081234567890"
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.parentPhone ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                      } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                    />
                    {errors.parentPhone && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.parentPhone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Alamat Tempat Tinggal Lengkap *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Jalan, Desa/Kelurahan, Kecamatan, Kabupaten Pamekasan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.address ? 'border-rose-400 bg-rose-50/50' : 'border-stone-300'
                    } focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.address}</span>
                  )}
                </div>
              </div>

              {/* Peminatan */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <label className="block font-semibold text-stone-700 mb-1">
                  Peminatan Program Unggulan
                </label>
                <select
                  value={formData.programInterest}
                  onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                >
                  <option value="Sekolah Alam Reguler & Kepemimpinan">
                    Sekolah Alam Reguler & Kepemimpinan
                  </option>
                  <option value="Kelas Intensif Tahfidz & Tadabbur Alam">
                    Kelas Intensif Tahfidz & Tadabbur Alam
                  </option>
                  <option value="Green Science & Riset Lingkungan Hidup">
                    Green Science & Riset Lingkungan Hidup
                  </option>
                  <option value="Agropreneurship & Kemandirian">
                    Agropreneurship & Kemandirian Wirausaha
                  </option>
                </select>
              </div>

              {/* Tombol Submit */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium"
                >
                  Tutup
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold shadow-md transition-all uppercase tracking-wider"
                >
                  KIRIM FORMULIR PENDAFTARAN
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Halaman Bukti Sukses */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Formulir Sukses Dikirim
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-display mt-1">
              Pendaftaran Berhasil Tercatat!
            </h2>

            <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-950 to-forest-900 text-white max-w-md mx-auto text-left shadow-xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                <div>
                  <p className="text-[10px] text-emerald-300 uppercase font-semibold">Nomor Registrasi PPDB</p>
                  <p className="text-xl font-mono font-black text-amber-300 tracking-wider">
                    {submittedData.regCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-stone-300">Tanggal Pengajuan</p>
                  <p className="text-xs font-medium text-white">{submittedData.date}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-200">
                <p>
                  <strong className="text-white">Nama Calon Siswa:</strong> {formData.studentName}
                </p>
                <p>
                  <strong className="text-white">Asal Sekolah:</strong> {formData.originSchool}
                </p>
                <p>
                  <strong className="text-white">Orang Tua / Wali:</strong> {formData.parentName}
                </p>
                <p>
                  <strong className="text-white">Status Biaya:</strong>{' '}
                  <span className="text-emerald-300 font-bold">Terverifikasi (Lunas)</span>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
              Silakan konfirmasikan nomor registrasi ini langsung ke WhatsApp Panitia PPDB kami untuk penjadwalan observasi minat bakat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold shadow-lg transition-all text-xs uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Konfirmasi via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
