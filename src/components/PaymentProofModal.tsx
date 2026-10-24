import React, { useState } from 'react';
import { X, Upload, CheckCircle2, ShieldCheck, AlertCircle, Copy, Check, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessOpenRegister: () => void;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  isOpen,
  onClose,
  onSuccessOpenRegister,
}) => {
  const { submitPaymentProof, settings } = useApp();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [amount, setAmount] = useState('150.000');
  const [bankName, setBankName] = useState('BSI (Bank Syariah Indonesia)');
  const [proofImage, setProofImage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentName.trim() || !parentPhone.trim()) {
      setErrorMsg('Mohon lengkapi nama calon siswa, orang tua, dan nomor WhatsApp.');
      return;
    }

    if (!proofImage) {
      setErrorMsg('Harap lampirkan foto/screenshot bukti transfer pembayaran.');
      return;
    }

    submitPaymentProof({
      studentName,
      parentName,
      parentPhone,
      amount,
      bankName,
      transferDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      proofImageUrl: proofImage,
    });

    setSubmitted(true);
  };

  const handleContinueToForm = () => {
    setSubmitted(false);
    onClose();
    onSuccessOpenRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Tahap 1: Administrasi Pendaftaran</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-display">
                Kirim Bukti Pembayaran PPDB
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-stone-600">
                Sesuai ketentuan, formulir pendaftaran siswa baru akan otomatis terbuka setelah Anda mengunggah bukti pembayaran administrasi.
              </p>
            </div>

            {/* Official Bank Account Information */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900 to-forest-950 text-white shadow-md mb-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between text-xs text-emerald-200 font-semibold mb-2">
                  <span>Rekening Resmi Panitia PPDB</span>
                  <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-300/30">
                    BSI Syariah
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                  <div>
                    <p className="text-[11px] text-stone-300">Nomor Rekening (BSI):</p>
                    <p className="text-lg font-mono font-black text-white tracking-wider">
                      7182 9384 75
                    </p>
                    <p className="text-xs text-amber-300 font-medium mt-0.5">
                      a.n. SMP ALAM EXCELLENTIA
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('7182938475')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-forest-950 text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedAccount ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedAccount ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-200">
                  <span>Biaya Administrasi & Observasi:</span>
                  <span className="font-extrabold text-amber-300 text-sm">Rp 150.000,-</span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Calon Siswa *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nama lengkap anak"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Nama ayah / ibu"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Bank / Metode Pengirim *
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                  >
                    <option value="BSI (Bank Syariah Indonesia)">BSI (Bank Syariah Indonesia)</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank Jatim">Bank Jatim / Syariah</option>
                    <option value="QRIS / E-Wallet (GoPay/ShopeePay)">QRIS / E-Wallet</option>
                    <option value="Lainnya">Metode Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Upload Input */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Upload Foto / Screenshot Bukti Transfer *
                </label>
                <div className="mt-1 border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-xl p-4 text-center transition-colors bg-stone-50/60">
                  <input
                    type="file"
                    id="proof-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-emerald-600 mb-2" />
                    <span className="text-xs font-bold text-emerald-800">
                      {fileName ? fileName : 'Klik untuk memilih foto struk / tangkapan layar transfer'}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5">
                      Format JPG, PNG, atau screenshot HP (Maks. 5MB)
                    </span>
                  </label>
                </div>
                {proofImage && (
                  <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <span className="text-xs text-emerald-800 font-semibold truncate max-w-xs">
                      ✓ Bukti siap dikirim ({fileName || 'Struk Transfer'})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setProofImage('');
                        setFileName('');
                      }}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Ganti
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold shadow-md transition-all uppercase tracking-wider"
                >
                  Kirim Bukti Pembayaran
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Bukti Pembayaran Terkirim
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 font-display mt-1">
              Alhamdulillah! Bukti Berhasil Diterima
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Bukti administrasi atas nama <strong>{studentName}</strong> telah tercatat di sistem kami dan diteruskan ke Dasbor Admin.
            </p>

            <div className="my-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1">
                <span>Status Pembayaran:</span>
                <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  TERKONFIRMASI
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Formulir Pendaftaran Siswa Baru (PPDB) Anda sekarang telah <strong>AKTIF</strong> dan siap diisi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleContinueToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold shadow-lg transition-all uppercase tracking-wider text-xs sm:text-sm"
              >
                <span>LANJUT KE FORMULIR PENDAFTARAN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
