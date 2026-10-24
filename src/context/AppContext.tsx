import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Teacher,
  RegisteredStudent,
  PaymentProof,
  AdminNotification,
  SchoolSettings,
} from '../types';

export const DEFAULT_SETTINGS: SchoolSettings = {
  tagline: 'GROWING TOGETHER WITH EXCELLENT.',
  quoteFirst: 'PENG',
  quoteHighlight1: 'ALAM',
  quoteMiddle: 'AN ADALAH ',
  quoteHighlight2: 'GURU TERBAIK',
  vision: 'MEWUJUDKAN GENERASI ISLAMI YANG CERDAS, MANDIRI DAN BERTANGGUNG JAWAB SERTA BERPRESTASI SESUAI POTENSI DIRI.',
  missions: [
    'Menanamkan akidah yang kokoh dan benar serta membentuk peserta didik yang berakhlak mulia, sehat, dan tangguh secara fisik maupun mental.',
    'Mengembangkan potensi dan bakat peserta didik melalui talent mapping untuk meraih prestasi sesuai kemampuan diri.',
    'Meningkatkan kemampuan berpikir kritis, kreatif, berkomunikasi dalam bahasa Inggris dan Arab, serta menguasai teknologi informasi.',
    'Menumbuhkan kemandirian dan jiwa kewirausahaan melalui pengembangan produk, kecakapan pemasaran, dan perencanaan keuangan.',
    'Membudayakan kepedulian terhadap lingkungan melalui pola hidup bersih dan sehat serta pengembangan solusi inovatif berbasis bioteknologi.',
  ],
  consultationWhatsapp: '081919454451',
  schoolLogo: '/logo-sekolah.png',
};

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Ust. Ahmad Fauzi, M.Pd.',
    role: 'Kepala Sekolah & Fasilitator Kepemimpinan',
    subject: 'Manajemen Pendidikan & Leadership Alam',
    education: 'S2 Manajemen Pendidikan Islam',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Berpengalaman lebih dari 12 tahun dalam metode Sekolah Alam dan pembentukan karakter generasi Qurani.',
    specialties: ['Leadership', 'Islamic Character', 'Outdoor Facilitation'],
  },
  {
    id: 'tch-2',
    name: 'Ustz. Siti Nur Azizah, S.Si.',
    role: 'Kepala Lab & Guru Green Science',
    subject: 'Sains Terapan & Riset Bioteknologi',
    education: 'S1 Biologi Terapan Universitas Negeri',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Membimbing siswa meneliti keanekaragaman flora fauna dan pengolahan limbah organik sekolah.',
    specialties: ['Bioteknologi', 'Permakultur', 'Metodologi Riset'],
  },
  {
    id: 'tch-3',
    name: 'Ust. Muhammad Ridwan, S.Pd.',
    role: 'Koordinator Outbound & Kesiswaan',
    subject: 'Survival, Outbound & Talent Mapping',
    education: 'S1 Pendidikan Jasmani & Kepelatihan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Instruktur bersertifikasi nasional untuk outbound kepanduan dan pemetaan bakat alami remaja.',
    specialties: ['Navigasi Darat', 'Talent Mapping', 'Pertolongan Pertama'],
  },
  {
    id: 'tch-4',
    name: 'Ustz. Fatimatuz Zahra, Lc.',
    role: 'Koordinator Al-Qur’an & Bahasa',
    subject: 'Tahfidz Al-Qur’an & Bahasa Arab',
    education: 'S1 Bahasa & Sastra Arab Al-Azhar',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Hafidzah 30 Juz dengan sanad mutqin, mengajarkan tadabbur ayat kauniyah di alam terbuka.',
    specialties: ['Tahfidz Bersanad', 'Bahasa Arab Aktif', 'Tadabbur Alam'],
  },
  {
    id: 'tch-5',
    name: 'Ust. Bayu Pratama, S.E.',
    role: 'Pembina Kewirausahaan Siswa',
    subject: 'Agropreneurship & Market Day',
    education: 'S1 Ekonomi Syariah',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bio: 'Mengarahkan siswa dalam proyek hidroponik, pengemasan produk ramah lingkungan, dan literasi finansial.',
    specialties: ['Business Plan', 'Green Marketing', 'Organic Farming'],
  },
  {
    id: 'tch-6',
    name: 'Ustz. Diana Lestari, S.Pd.',
    role: 'Guru Bahasa Inggris & Global Club',
    subject: 'English Communication & Public Speaking',
    education: 'S1 Pendidikan Bahasa Inggris',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Membimbing kecakapan pidato bahasa Inggris dan komunikasi internasional berbasis proyek riset.',
    specialties: ['English Debate', 'Storytelling', 'Digital Media Literacy'],
  },
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    title: 'Sistem Website Berhasil Dijalankan',
    message: 'Portal SMP Alam Excellentia aktif dengan identitas logo resmi dan pengaturan awal.',
    time: 'Hari ini',
    read: false,
    type: 'system',
  },
  {
    id: 'notif-2',
    title: 'Informasi Guru Tersedia',
    message: 'Data 6 guru pendidik telah dimuat dan dapat dikelola secara penuh oleh Admin.',
    time: 'Hari ini',
    read: false,
    type: 'teachers',
    targetTab: 'teachers',
  },
];

interface AppContextType {
  currentUser: User | null;
  loginAsAdmin: (username: string, pass: string) => boolean;
  loginAsGuest: () => void;
  logout: () => void;
  isAdmin: boolean;
  isGuest: boolean;
  settings: SchoolSettings;
  updateSettings: (newSettings: Partial<SchoolSettings>) => void;
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  paymentProofs: PaymentProof[];
  activePaymentProof: PaymentProof | null;
  submitPaymentProof: (proof: Omit<PaymentProof, 'id' | 'status' | 'submittedAt'>) => PaymentProof;
  verifyPaymentProof: (id: string, status: 'verified' | 'rejected') => void;
  students: RegisteredStudent[];
  submitStudentRegistration: (formData: any, paymentProofId?: string) => RegisteredStudent;
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
  openLoginModal: boolean;
  setOpenLoginModal: (open: boolean) => void;
  openAdminDashboard: boolean;
  setOpenAdminDashboard: (open: boolean) => void;
  openGuestDashboard: boolean;
  setOpenGuestDashboard: (open: boolean) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smp_alam_current_user');
    return saved ? JSON.parse(saved) : { role: 'guest', name: 'Tamu Pengunjung' };
  });

  // 2. Settings state
  const [settings, setSettings] = useState<SchoolSettings>(() => {
    const saved = localStorage.getItem('smp_alam_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // 3. Teachers state
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('smp_alam_teachers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TEACHERS;
      }
    }
    return INITIAL_TEACHERS;
  });

  // 4. Payment proofs & registrations
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>(() => {
    const saved = localStorage.getItem('smp_alam_payment_proofs');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePaymentProof, setActivePaymentProof] = useState<PaymentProof | null>(() => {
    const saved = localStorage.getItem('smp_alam_active_proof');
    return saved ? JSON.parse(saved) : null;
  });

  const [students, setStudents] = useState<RegisteredStudent[]>(() => {
    const saved = localStorage.getItem('smp_alam_students');
    return saved ? JSON.parse(saved) : [];
  });

  // 5. Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const saved = localStorage.getItem('smp_alam_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // UI Modals
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAdminDashboard, setOpenAdminDashboard] = useState(false);
  const [openGuestDashboard, setOpenGuestDashboard] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('summary');

  // Persistence effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smp_alam_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('smp_alam_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('smp_alam_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('smp_alam_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('smp_alam_payment_proofs', JSON.stringify(paymentProofs));
  }, [paymentProofs]);

  useEffect(() => {
    if (activePaymentProof) {
      localStorage.setItem('smp_alam_active_proof', JSON.stringify(activePaymentProof));
    } else {
      localStorage.removeItem('smp_alam_active_proof');
    }
  }, [activePaymentProof]);

  useEffect(() => {
    localStorage.setItem('smp_alam_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('smp_alam_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auth functions
  const loginAsAdmin = (username: string, pass: string): boolean => {
    const u = username.trim().toLowerCase();
    const p = pass.trim();
    if ((u === 'admin' || u === 'admin@smpalam.sch.id') && (p === 'admin123' || p === 'sae2026!')) {
      const userObj: User = { role: 'admin', username: 'admin', name: 'Admin Utama (Administrator)' };
      setCurrentUser(userObj);
      setOpenLoginModal(false);
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    const guestObj: User = { role: 'guest', name: 'Tamu Pengunjung' };
    setCurrentUser(guestObj);
    setOpenLoginModal(false);
  };

  const logout = () => {
    setCurrentUser({ role: 'guest', name: 'Tamu Pengunjung' });
    setOpenAdminDashboard(false);
  };

  const updateSettings = (newSettings: Partial<SchoolSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    // If logo updated, sync with logo storage key
    if (newSettings.schoolLogo) {
      localStorage.setItem('smp_alam_logo_school', newSettings.schoolLogo);
    }
    // Add admin notification
    addNotification({
      title: 'Pengaturan Website Diperbarui',
      message: 'Perubahan pada identitas, nomor kontak, atau visi misi berhasil disimpan.',
      type: 'system',
      targetTab: 'settings',
    });
  };

  // Teachers functions
  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
    };
    setTeachers((prev) => [newTeacher, ...prev]);
    addNotification({
      title: 'Guru Baru Ditambahkan',
      message: `${newTeacher.name} telah berhasil didaftarkan ke daftar tenaga pendidik.`,
      type: 'teachers',
      targetTab: 'teachers',
    });
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    addNotification({
      title: 'Data Guru Diperbarui',
      message: `Informasi guru telah diperbarui oleh Admin.`,
      type: 'teachers',
      targetTab: 'teachers',
    });
  };

  const deleteTeacher = (id: string) => {
    const target = teachers.find((t) => t.id === id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    if (target) {
      addNotification({
        title: 'Guru Dihapus',
        message: `${target.name} telah dihapus dari daftar tenaga pendidik.`,
        type: 'teachers',
        targetTab: 'teachers',
      });
    }
  };

  // Payment Proof functions
  const submitPaymentProof = (proofData: Omit<PaymentProof, 'id' | 'status' | 'submittedAt'>): PaymentProof => {
    const newProof: PaymentProof = {
      ...proofData,
      id: `PAY-${Date.now()}`,
      status: 'verified', // Set directly to verified to unlock form seamlessly, or pending with verification badge
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setPaymentProofs((prev) => [newProof, ...prev]);
    setActivePaymentProof(newProof);

    addNotification({
      title: 'Bukti Pembayaran Masuk',
      message: `Bukti transfer administrasi dari ${newProof.parentName} (${newProof.studentName}) sebesar Rp ${newProof.amount} telah dikirimkan.`,
      type: 'payment',
      targetTab: 'registrations',
    });

    return newProof;
  };

  const verifyPaymentProof = (id: string, status: 'verified' | 'rejected') => {
    setPaymentProofs((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    setStudents((prev) =>
      prev.map((s) => (s.paymentProof?.id === id ? { ...s, paymentStatus: status } : s))
    );
    if (activePaymentProof?.id === id) {
      setActivePaymentProof((prev) => (prev ? { ...prev, status } : null));
    }
    addNotification({
      title: `Bukti Pembayaran ${status === 'verified' ? 'Disetujui' : 'Ditolak'}`,
      message: `Status bukti pembayaran ID ${id} diubah menjadi ${status}.`,
      type: 'payment',
      targetTab: 'registrations',
    });
  };

  // Student registration functions
  const submitStudentRegistration = (formData: any, paymentProofId?: string): RegisteredStudent => {
    const regCode = `EXC-${Math.floor(100000 + Math.random() * 900000)}`;
    const proof = paymentProofs.find((p) => p.id === paymentProofId) || activePaymentProof || undefined;

    const newStudent: RegisteredStudent = {
      id: `std-${Date.now()}`,
      regCode,
      data: formData,
      submittedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      paymentStatus: proof ? 'verified' : 'unpaid',
      paymentProof: proof,
      status: 'menunggu_observasi',
    };

    setStudents((prev) => [newStudent, ...prev]);

    addNotification({
      title: 'Pendaftaran Siswa Baru!',
      message: `${formData.studentName} (Wali: ${formData.parentName}) telah melengkapi berkas pendaftaran dengan No. Reg ${regCode}.`,
      type: 'registration',
      targetTab: 'registrations',
    });

    return newStudent;
  };

  // Notifications functions
  const addNotification = (notif: Omit<AdminNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: AdminNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      time: 'Baru saja',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAsAdmin,
        loginAsGuest,
        logout,
        isAdmin: currentUser?.role === 'admin',
        isGuest: currentUser?.role === 'guest' || !currentUser,
        settings,
        updateSettings,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        paymentProofs,
        activePaymentProof,
        submitPaymentProof,
        verifyPaymentProof,
        students,
        submitStudentRegistration,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        openLoginModal,
        setOpenLoginModal,
        openAdminDashboard,
        setOpenAdminDashboard,
        openGuestDashboard,
        setOpenGuestDashboard,
        activeAdminTab,
        setActiveAdminTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
