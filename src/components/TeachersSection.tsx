import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, Plus, Edit2, Trash2, X, Check, Sparkles, User, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Teacher } from '../types';

export const TeachersSection: React.FC = () => {
  const { teachers, isAdmin, addTeacher, updateTeacher, deleteTeacher } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formEducation, setFormEducation] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formSpecialties, setFormSpecialties] = useState('');

  const openAddModal = () => {
    setEditingTeacher(null);
    setFormName('');
    setFormRole('');
    setFormSubject('');
    setFormEducation('');
    setFormImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600');
    setFormBio('');
    setFormSpecialties('');
    setModalOpen(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormName(teacher.name);
    setFormRole(teacher.role);
    setFormSubject(teacher.subject);
    setFormEducation(teacher.education);
    setFormImage(teacher.image);
    setFormBio(teacher.bio);
    setFormSpecialties(teacher.specialties.join(', '));
    setModalOpen(true);
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) return;

    const specs = formSpecialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        name: formName,
        role: formRole,
        subject: formSubject,
        education: formEducation,
        image: formImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        bio: formBio,
        specialties: specs.length > 0 ? specs : ['Pendidikan Karakter', 'Sekolah Alam'],
      });
    } else {
      addTeacher({
        name: formName,
        role: formRole,
        subject: formSubject,
        education: formEducation,
        image: formImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        bio: formBio,
        specialties: specs.length > 0 ? specs : ['Pendidikan Karakter', 'Sekolah Alam'],
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus guru ${name} dari daftar?`)) {
      deleteTeacher(id);
    }
  };

  return (
    <section id="informasi-guru" className="py-20 sm:py-24 bg-stone-50 border-b border-stone-200 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Admin Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Tenaga Pendidik & Fasilitator Unggul</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500 font-normal">Sahabat Belajar Siswa</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
              Informasi Guru & Fasilitator
            </h2>
            <p className="mt-3 text-base sm:text-lg text-stone-600 leading-relaxed">
              Didampingi oleh para ustadz dan ustadzah berdedikasi tinggi, bersertifikasi, dan berjiwa pamong yang membimbing dengan keteladanan akhlak dan kehangatan hati.
            </p>
          </div>

          {/* Admin Control Badge / Add Button */}
          {isAdmin ? (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                <Plus className="w-4 h-4 text-emerald-300" />
                <span>Tambah Guru Baru</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Fasilitator Berpengalaman</span>
            </div>
          )}
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
            >
              {/* Card Top: Image + Role Badge */}
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Subject Tag in bottom left of image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-800/90 backdrop-blur-md text-[11px] font-bold text-emerald-100 tracking-wide">
                      {teacher.subject}
                    </span>
                  </div>

                  {/* Admin Direct Actions on Card */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-lg">
                      <button
                        onClick={() => openEditModal(teacher)}
                        className="p-1.5 text-white hover:text-amber-400 hover:bg-white/10 rounded transition-colors"
                        title="Edit Data Guru"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher.id, teacher.name)}
                        className="p-1.5 text-white hover:text-rose-400 hover:bg-white/10 rounded transition-colors"
                        title="Hapus Guru"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 mb-1">
                    <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{teacher.education}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display leading-snug group-hover:text-emerald-800 transition-colors">
                    {teacher.name}
                  </h3>

                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mt-1">
                    {teacher.role}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer: Specialties Badges */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-stone-100 flex flex-wrap gap-1.5">
                {teacher.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-stone-100 text-[10px] font-medium text-stone-700"
                  >
                    #{spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add / Edit Teacher (Admin Only) */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Panel Kelola Guru (Admin)
                </span>
                <h3 className="text-xl font-extrabold text-stone-900 font-display mt-1">
                  {editingTeacher ? 'Edit Informasi Guru' : 'Tambah Guru / Fasilitator Baru'}
                </h3>
              </div>

              <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Lengkap & Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Ust. Ahmad Fauzi, M.Pd."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Jabatan / Peran *
                    </label>
                    <input
                      type="text"
                      required
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="Contoh: Kepala Sekolah / Guru Riset"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Mata Pelajaran / Bidang *
                    </label>
                    <input
                      type="text"
                      required
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="Contoh: Sains Terapan & Green Lab"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Pendidikan Terakhir / Kampus
                  </label>
                  <input
                    type="text"
                    value={formEducation}
                    onChange={(e) => setFormEducation(e.target.value)}
                    placeholder="Contoh: S1 Biologi Universitas Negeri Malang"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    URL Foto Guru (Opsional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Bio Singkat / Profil Pengajaran
                  </label>
                  <textarea
                    rows={3}
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    placeholder="Membimbing siswa dalam pengembangan karakter, riset sains, dan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Keahlian Khusus (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formSpecialties}
                    onChange={(e) => setFormSpecialties(e.target.value)}
                    placeholder="Contoh: Outbound, Robotik, Tahfidz"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 transition-colors font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold transition-all shadow-md"
                  >
                    {editingTeacher ? 'Simpan Perubahan' : 'Tambahkan Guru'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
