import React, { useState } from 'react';
import {
  X,
  Bell,
  Users,
  Settings as SettingsIcon,
  FileText,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  Sparkles,
  LogOut,
  Image as ImageIcon,
  Eye,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Teacher, SchoolSettings } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const {
    logout,
    settings,
    updateSettings,
    teachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    students,
    paymentProofs,
    verifyPaymentProof,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount,
    activeAdminTab,
    setActiveAdminTab,
  } = useApp();

  // Settings form state
  const [taglineInput, setTaglineInput] = useState(settings.tagline);
  const [waInput, setWaInput] = useState(settings.consultationWhatsapp);
  const [visionInput, setVisionInput] = useState(settings.vision);
  const [missionsInput, setMissionsInput] = useState(settings.missions.join('\n'));
  const [quoteHighlight1, setQuoteHighlight1] = useState(settings.quoteHighlight1);
  const [quoteHighlight2, setQuoteHighlight2] = useState(settings.quoteHighlight2);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Selected proof preview modal
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);

  // Teacher edit modal state
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [tName, setTName] = useState('');
  const [tRole, setTRole] = useState('');
  const [tSubject, setTSubject] = useState('');
  const [tEdu, setTEdu] = useState('');
  const [tImg, setTImg] = useState('');
  const [tBio, setTBio] = useState('');
  const [tSpecs, setTSpecs] = useState('');

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMissions = missionsInput
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    updateSettings({
      tagline: taglineInput.trim() || 'GROWING TOGETHER WITH EXCELLENT.',
      consultationWhatsapp: waInput.trim() || '081919454451',
      vision: visionInput.trim(),
      missions: cleanMissions.length > 0 ? cleanMissions : settings.missions,
      quoteHighlight1: quoteHighlight1.trim() || 'ALAM',
      quoteHighlight2: quoteHighlight2.trim() || 'GURU TERBAIK',
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const openTeacherAdd = () => {
    setEditingTeacherId(null);
    setTName('');
    setTRole('');
    setTSubject('');
    setTEdu('');
    setTImg('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600');
    setTBio('');
    setTSpecs('');
    setIsEditingTeacher(true);
  };

  const openTeacherEdit = (teacher: Teacher) => {
    setEditingTeacherId(teacher.id);
    setTName(teacher.name);
    setTRole(teacher.role);
    setTSubject(teacher.subject);
    setTEdu(teacher.education);
    setTImg(teacher.image);
    setTBio(teacher.bio);
    setTSpecs(teacher.specialties.join(', '));
    setIsEditingTeacher(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName.trim()) return;
    const specs = tSpecs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingTeacherId) {
      updateTeacher(editingTeacherId, {
        name: tName,
        role: tRole,
        subject: tSubject,
        education: tEdu,
        image: tImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        bio: tBio,
        specialties: specs.length > 0 ? specs : ['Pamong Sekolah Alam'],
      });
    } else {
      addTeacher({
        name: tName,
        role: tRole,
        subject: tSubject,
        education: tEdu,
        image: tImg || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        bio: tBio,
        specialties: specs.length > 0 ? specs : ['Pamong Sekolah Alam'],
      });
    }
    setIsEditingTeacher(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-50 rounded-3xl max-w-5xl w-full shadow-2xl border border-stone-200 flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Dashboard Top Header */}
        <div className="bg-gradient-to-r from-forest-950 via-emerald-950 to-forest-900 text-white p-4 sm:p-6 flex items-center justify-between border-b border-emerald-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md shrink-0">
              <img src="/logo-sekolah.png" alt="Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-display text-white">
                  Dasbor Admin Utama
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-forest-950 font-bold text-[10px] uppercase">
                  Hak Akses Edit Penuh
                </span>
              </div>
              <p className="text-[11px] text-emerald-300">
                SMP ALAM EXCELLENTIA PAMEKASAN · Pengelola Website Resmi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-stone-200 hover:text-rose-300 text-xs font-semibold transition-colors border border-white/10"
              title="Keluar dari akun admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white px-4 sm:px-6 border-b border-stone-200 flex items-center gap-2 sm:gap-4 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveAdminTab('summary')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'summary'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bell className="w-4 h-4 text-emerald-700" />
            <span>Ringkasan & Notifikasi</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('registrations')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'registrations'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-sky-600" />
            <span>Pendaftaran & Bukti Transfer</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold">
              {students.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('teachers')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'teachers'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Kelola Guru ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeAdminTab === 'settings'
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <SettingsIcon className="w-4 h-4 text-amber-600" />
            <span>Pengaturan Website & Kontak WA</span>
          </button>
        </div>

        {/* Dashboard Body / Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* TAB 1: SUMMARY & NOTIFICATIONS */}
          {activeAdminTab === 'summary' && (
            <div className="space-y-6">
              {/* Quick Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <p className="text-xs text-stone-500 font-semibold">Total Pendaftar</p>
                  <p className="text-2xl font-black font-display text-emerald-900 mt-1">{students.length}</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Siswa tercatat</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <p className="text-xs text-stone-500 font-semibold">Bukti Pembayaran</p>
                  <p className="text-2xl font-black font-display text-sky-900 mt-1">{paymentProofs.length}</p>
                  <p className="text-[11px] text-sky-700 mt-0.5">Transfer masuk</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <p className="text-xs text-stone-500 font-semibold">Tenaga Pendidik</p>
                  <p className="text-2xl font-black font-display text-amber-900 mt-1">{teachers.length}</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">Guru aktif</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
                  <p className="text-xs text-stone-500 font-semibold">Notifikasi Baru</p>
                  <p className="text-2xl font-black font-display text-rose-900 mt-1">{unreadCount}</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">Belum dibaca</p>
                </div>
              </div>

              {/* Notification Center */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      Pusat Notifikasi Aktivitas
                    </h3>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
                    >
                      Tandai Semua Sudah Dibaca
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        notif.read
                          ? 'bg-stone-50/60 border-stone-200 text-stone-600'
                          : 'bg-emerald-50/50 border-emerald-200 text-stone-900 font-medium shadow-xs'
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${notif.read ? 'bg-stone-300' : 'bg-emerald-600 animate-pulse'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-stone-500">{notif.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGISTRATIONS & PAYMENT PROOFS */}
          {activeAdminTab === 'registrations' && (
            <div className="space-y-6">
              {/* Payment Proofs Table */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      Daftar Bukti Pembayaran Administrasi PPDB
                    </h3>
                    <p className="text-xs text-stone-500">
                      Verifikasi slip transfer calon wali murid untuk membuka tahapan observasi
                    </p>
                  </div>
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
                    {paymentProofs.length} Bukti Terunggah
                  </span>
                </div>

                {paymentProofs.length === 0 ? (
                  <div className="text-center py-10 text-stone-400 text-xs">
                    Belum ada bukti pembayaran yang diunggah.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                          <th className="py-2.5 px-3">Calon Siswa</th>
                          <th className="py-2.5 px-3">Wali Murid / WA</th>
                          <th className="py-2.5 px-3">Bank & Jumlah</th>
                          <th className="py-2.5 px-3">Tanggal</th>
                          <th className="py-2.5 px-3">Bukti</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {paymentProofs.map((proof) => (
                          <tr key={proof.id} className="hover:bg-stone-50/70">
                            <td className="py-3 px-3 font-bold text-stone-900">{proof.studentName}</td>
                            <td className="py-3 px-3">
                              <p className="font-semibold text-stone-800">{proof.parentName}</p>
                              <a
                                href={`https://wa.me/62${proof.parentPhone.replace(/^0+/, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{proof.parentPhone}</span>
                              </a>
                            </td>
                            <td className="py-3 px-3">
                              <p className="text-stone-700">{proof.bankName}</p>
                              <p className="font-extrabold text-emerald-800">Rp {proof.amount}</p>
                            </td>
                            <td className="py-3 px-3 text-stone-500">{proof.submittedAt}</td>
                            <td className="py-3 px-3">
                              {proof.proofImageUrl ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedProofUrl(proof.proofImageUrl)}
                                  className="inline-flex items-center gap-1 text-sky-700 hover:underline font-semibold"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Lihat Bukti</span>
                                </button>
                              ) : (
                                <span className="text-stone-400">Tidak ada</span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                proof.status === 'verified'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : proof.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {proof.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              {proof.status !== 'verified' ? (
                                <button
                                  onClick={() => verifyPaymentProof(proof.id, 'verified')}
                                  className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold text-[11px] shadow-xs"
                                >
                                  Verifikasi
                                </button>
                              ) : (
                                <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-end gap-1">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Valid</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Registered Students Table */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      Data Formulir Lengkap Pendaftar Siswa Baru
                    </h3>
                    <p className="text-xs text-stone-500">
                      Daftar siswa yang telah menyelesaikan registrasi online
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                    {students.length} Pendaftar
                  </span>
                </div>

                {students.length === 0 ? (
                  <div className="text-center py-10 text-stone-400 text-xs">
                    Belum ada siswa yang mengisi formulir lengkap.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[11px]">
                          <th className="py-2.5 px-3">No. Registrasi</th>
                          <th className="py-2.5 px-3">Nama Siswa</th>
                          <th className="py-2.5 px-3">Asal Sekolah</th>
                          <th className="py-2.5 px-3">Wali Murid / HP</th>
                          <th className="py-2.5 px-3">Peminatan</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {students.map((student) => (
                          <tr key={student.id} className="hover:bg-stone-50/70">
                            <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                              {student.regCode}
                            </td>
                            <td className="py-3 px-3 font-bold text-stone-900">
                              {student.data.studentName}
                              <span className="block text-[11px] text-stone-500 font-normal">
                                {student.data.gender} · {student.data.birthPlaceDate}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-stone-700">{student.data.originSchool}</td>
                            <td className="py-3 px-3">
                              <p className="font-semibold text-stone-800">{student.data.parentName}</p>
                              <p className="font-mono text-[11px] text-emerald-700">{student.data.parentPhone}</p>
                            </td>
                            <td className="py-3 px-3 text-stone-600 text-[11px]">
                              {student.data.programInterest}
                            </td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                                Menunggu Observasi
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE TEACHERS (INFORMASI GURU) */}
          {activeAdminTab === 'teachers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      Kelola Daftar Guru & Tenaga Pendidik
                    </h3>
                    <p className="text-xs text-stone-500">
                      Tambahkan fasilitator baru, perbarui mata pelajaran, atau ubah biodata
                    </p>
                  </div>
                  <button
                    onClick={openTeacherAdd}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all uppercase tracking-wider"
                  >
                    <Plus className="w-4 h-4 text-emerald-300" />
                    <span>Tambah Guru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="p-4 rounded-xl border border-stone-200 flex items-start gap-4 hover:border-emerald-300 transition-colors bg-stone-50/50"
                    >
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-stone-900 truncate">{teacher.name}</h4>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => openTeacherEdit(teacher)}
                              className="p-1.5 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 rounded"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTeacher(teacher.id)}
                              className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-amber-700 mt-0.5">{teacher.role}</p>
                        <p className="text-xs text-stone-600">{teacher.subject}</p>
                        <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{teacher.education}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & WHATSAPP CONSULTATION */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="mb-6">
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    Pengaturan Website, Kontak Konsultasi & Falsafah
                  </h3>
                  <p className="text-xs text-stone-500">
                    Satu akun admin ini dapat mengedit perkembangan website secara langsung
                  </p>
                </div>

                {saveSuccess && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Perubahan berhasil disimpan dan langsung diterapkan ke seluruh website!</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-5 text-xs sm:text-sm">
                  {/* Nomor WhatsApp Konsultasi */}
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <label className="block font-bold text-emerald-950 mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-700" />
                      <span>Nomor WhatsApp Konsultasi (Tamu Pengunjung) *</span>
                    </label>
                    <p className="text-xs text-emerald-800/80 mb-2">
                      Nomor ini yang akan dihubungi oleh pengunjung saat mengklik fitur konsultasi WhatsApp di dasbor tamu.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={waInput}
                        onChange={(e) => setWaInput(e.target.value)}
                        placeholder="081919454451"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white font-mono font-bold text-emerald-950"
                      />
                      <a
                        href={`https://wa.me/62${waInput.replace(/^0+/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold flex items-center gap-1.5 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Tes Link WA</span>
                      </a>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Tagline Sekolah *
                    </label>
                    <input
                      type="text"
                      required
                      value={taglineInput}
                      onChange={(e) => setTaglineInput(e.target.value)}
                      placeholder="GROWING TOGETHER WITH EXCELLENT."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none font-bold"
                    />
                  </div>

                  {/* Visi */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      VISI Sekolah *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={visionInput}
                      onChange={(e) => setVisionInput(e.target.value)}
                      placeholder="MEWUJUDKAN GENERASI ISLAMI..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>

                  {/* 5 Misi */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      MISI Sekolah (Satu per baris) *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={missionsInput}
                      onChange={(e) => setMissionsInput(e.target.value)}
                      placeholder="Masukkan 5 misi sekolah..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none leading-relaxed"
                    />
                  </div>

                  {/* Tulisan Filosofi Warna Khusus */}
                  <div className="p-4 rounded-xl bg-stone-100 border border-stone-200">
                    <p className="font-bold text-stone-800 mb-2">
                      Falsafah: PENG[ALAM]AN ADALAH [GURU TERBAIK]
                    </p>
                    <p className="text-xs text-stone-600 mb-3">
                      Warna tulisan hijau dengan penekanan kata kuning (sesuai permintaan).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Kata Kuning 1 (Di dalam PENGALAMAN):
                        </label>
                        <input
                          type="text"
                          value={quoteHighlight1}
                          onChange={(e) => setQuoteHighlight1(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold text-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Kata Kuning 2:
                        </label>
                        <input
                          type="text"
                          value={quoteHighlight2}
                          onChange={(e) => setQuoteHighlight2(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs font-bold text-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold shadow-md transition-all uppercase tracking-wider"
                    >
                      SIMPAN PERKEMBANGAN WEBSITE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal Preview Bukti Transfer */}
      {selectedProofUrl && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 relative">
            <button
              onClick={() => setSelectedProofUrl(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-stone-900 mb-3">Pratinjau Bukti Transfer Pembayaran</h4>
            <div className="max-h-[70vh] overflow-y-auto rounded-xl bg-stone-100 flex items-center justify-center p-2">
              <img src={selectedProofUrl} alt="Bukti Transfer" className="max-w-full h-auto rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit Teacher from within Dashboard */}
      {isEditingTeacher && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditingTeacher(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-base font-bold text-stone-900 font-display mb-4">
              {editingTeacherId ? 'Edit Biodata Guru' : 'Tambah Guru Baru'}
            </h4>
            <form onSubmit={handleSaveTeacher} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama & Gelar *</label>
                <input
                  type="text"
                  required
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  placeholder="Ust. Ahmad Fauzi, M.Pd."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Peran / Jabatan *</label>
                <input
                  type="text"
                  required
                  value={tRole}
                  onChange={(e) => setTRole(e.target.value)}
                  placeholder="Kepala Sekolah / Guru Riset"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Mata Pelajaran *</label>
                <input
                  type="text"
                  required
                  value={tSubject}
                  onChange={(e) => setTSubject(e.target.value)}
                  placeholder="Green Science & Riset Alam"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Pendidikan</label>
                <input
                  type="text"
                  value={tEdu}
                  onChange={(e) => setTEdu(e.target.value)}
                  placeholder="S1 Biologi"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">URL Foto</label>
                <input
                  type="url"
                  value={tImg}
                  onChange={(e) => setTImg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Keahlian (koma)</label>
                <input
                  type="text"
                  value={tSpecs}
                  onChange={(e) => setTSpecs(e.target.value)}
                  placeholder="Outbound, Riset, Tahfidz"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 outline-none"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditingTeacher(false)}
                  className="px-4 py-2 border rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
