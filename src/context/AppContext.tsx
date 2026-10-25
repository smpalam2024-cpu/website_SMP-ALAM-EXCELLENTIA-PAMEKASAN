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
    name: 'Ust. SHOHIBUL KAHFI, M.Pd',
    role: 'Kepala Sekolah',
    subject: 'PAI, Bhs. Madura, Taklim, Bhs. Arab',
    education: 'S2 Pendidikan Islam',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Kepala Sekolah SMP Alam Excellentia Pamekasan. Fasilitator Pendidikan Agama Islam, Bahasa Madura, Taklim, dan Bahasa Arab. Berpengalaman dalam metode pendidikan berbasis alam dan karakter Islami.',
    specialties: ['Kepala Sekolah', 'PAI', 'Bahasa Madura', 'Taklim', 'Bahasa Arab'],
  },
  {
    id: 'tch-2',
    name: 'Ustdz. SITTI NOERJANNAH, S.Pd',
    role: 'Bendahara',
    subject: 'Bhs. Indonesia, Konseling, SASS',
    education: 'S1 Pendidikan Bahasa Indonesia',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Bendahara sekolah sekaligus fasilitator Bahasa Indonesia, Konseling siswa, dan pembina program SASS (Student Activity & Social Service). Berdedikasi dalam pendampingan karakter dan pengembangan diri siswa.',
    specialties: ['Bendahara', 'Bahasa Indonesia', 'Konseling', 'SASS'],
  },
  {
    id: 'tch-3',
    name: 'Ustdz. MAGHFIROH AGUSTINASARI S, M.Pd',
    role: 'Admin',
    subject: 'Bhs. Inggris, ICT, PKN',
    education: 'S2 Pendidikan Bahasa Inggris',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Admin sekolah dan fasilitator Bahasa Inggris, ICT (Information & Communication Technology), dan Pendidikan Kewarganegaraan. Berpengalaman dalam integrasi teknologi dalam pembelajaran.',
    specialties: ['Admin', 'Bahasa Inggris', 'ICT', 'PKN'],
  },
  {
    id: 'tch-4',
    name: 'Ust. MOH. BADRIT TAMAM, S.Mat',
    role: 'Fasilitator',
    subject: 'Matematika, IPS, Green Lab',
    education: 'S1 Matematika',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    bio: 'Fasilitator Matematika, Ilmu Pengetahuan Sosial, dan Green Lab agropreneurship. Menggabungkan pendekatan kontekstual matematika dengan praktik lingkungan hidup nyata.',
    specialties: ['Matematika', 'IPS', 'Green Lab'],
  },
  {
    id: 'tch-5',
    name: 'Ustdz. ZAHRA NAJMA ATIKA, S.T',
    role: 'Fasilitator',
    subject: 'IPA, Seni Budaya',
    education: 'S1 Teknik',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    bio: 'Fasilitator Ilmu Pengetahuan Alam dan Seni Budaya. Memadukan pendekatan saintifik dengan kecintaan terhadap seni dan alam dalam setiap proses pembelajaran.',
    specialties: ['IPA', 'Seni Budaya'],
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
    message: 'Data 5 guru pendidik telah dimuat dan dapat dikelola secara penuh oleh Admin.',
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
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smp_alam_current_user');
    return saved ? JSON.parse(saved) : { role: 'guest', name: 'Tamu Pengunjung' };
  });

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

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const saved = localStorage.getItem('smp_alam_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAdminDashboard, setOpenAdminDashboard] = useState(false);
  const [openGuestDashboard, setOpenGuestDashboard] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('summary');

  useEffect(() => {
    localStorage.setItem('smp_alam_current_user', JSON.stringify(currentUser));
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
    localStorage.setItem('smp_alam_active_proof', JSON.stringify(activePaymentProof));
  }, [activePaymentProof]);

  useEffect(() => {
    localStorage.setItem('smp_alam_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('smp_alam_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const loginAsAdmin = (username: string, pass: string): boolean => {
    if (username === 'admin' && pass === 'smpalam2024') {
      const user: User = { role: 'admin', username, name: 'Admin SMP Alam' };
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    setCurrentUser({ role: 'guest', name: 'Tamu Pengunjung' });
  };

  const logout = () => {
    setCurrentUser({ role: 'guest', name: 'Tamu Pengunjung' });
    setOpenAdminDashboard(false);
    setOpenGuestDashboard(false);
  };

  const updateSettings = (newSettings: Partial<SchoolSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = { ...teacher, id: `tch-${Date.now()}` };
    setTeachers((prev) => [...prev, newTeacher]);
    addNotification({
      title: 'Guru Baru Ditambahkan',
      message: `${teacher.name} telah berhasil ditambahkan ke daftar tenaga pendidik.`,
      type: 'teachers',
      targetTab: 'teachers',
    });
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const submitPaymentProof = (proof: Omit<PaymentProof, 'id' | 'status' | 'submittedAt'>): PaymentProof => {
    const newProof: PaymentProof = {
      ...proof,
      id: `proof-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setPaymentProofs((prev) => [...prev, newProof]);
    setActivePaymentProof(newProof);
    addNotification({
      title: 'Bukti Pembayaran Masuk',
      message: `Bukti pembayaran dari ${proof.studentName} (${proof.parentName}) telah diterima dan menunggu verifikasi.`,
      type: 'payment',
      targetTab: 'registrations',
    });
    return newProof;
  };

  const verifyPaymentProof = (id: string, status: 'verified' | 'rejected') => {
    setPaymentProofs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    if (activePaymentProof?.id === id) {
      setActivePaymentProof((prev) => (prev ? { ...prev, status } : null));
    }
    setStudents((prev) =>
      prev.map((s) =>
        s.paymentProof?.id === id
          ? { ...s, paymentStatus: status === 'verified' ? 'verified' : 'rejected' }
          : s
      )
    );
  };

  const submitStudentRegistration = (formData: any, paymentProofId?: string): RegisteredStudent => {
    const proof = paymentProofId ? paymentProofs.find((p) => p.id === paymentProofId) : undefined;
    const newStudent: RegisteredStudent = {
      id: `std-${Date.now()}`,
      regCode: `SAE-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, '0')}`,
      data: formData,
      submittedAt: new Date().toISOString(),
      paymentStatus: proof ? 'pending_verification' : 'unpaid',
      paymentProof: proof,
      status: 'menunggu_observasi',
    };
    setStudents((prev) => [...prev, newStudent]);
    addNotification({
      title: 'Pendaftar Baru',
      message: `${formData.studentName} telah mendaftar dengan kode ${newStudent.regCode}.`,
      type: 'registration',
      targetTab: 'registrations',
    });
    return newStudent;
  };

  const addNotification = (notif: Omit<AdminNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: AdminNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      time: 'Baru saja',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isAdmin = currentUser?.role === 'admin';
  const isGuest = currentUser?.role === 'guest';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAsAdmin,
        loginAsGuest,
        logout,
        isAdmin,
        isGuest,
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

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
