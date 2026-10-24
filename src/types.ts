export interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  image: string;
  iconName: string;
  highlight: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  outcomes: string[];
  icon: string;
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'outbound' | 'sains' | 'pertanian' | 'spiritual';
  image: string;
  caption: string;
  location: string;
}

export interface RegistrationFormData {
  studentName: string;
  gender: string;
  birthPlaceDate: string;
  originSchool: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  programInterest: string;
  notes?: string;
  paymentProofId?: string;
  paymentProofUrl?: string;
  paymentAmount?: string;
}

export interface PaymentProof {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  amount: string;
  bankName: string;
  transferDate: string;
  proofImageUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}

export interface RegisteredStudent {
  id: string;
  regCode: string;
  data: RegistrationFormData;
  submittedAt: string;
  paymentStatus: 'unpaid' | 'pending_verification' | 'verified' | 'rejected';
  paymentProof?: PaymentProof;
  status: 'menunggu_observasi' | 'observasi_selesai' | 'diterima';
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  education: string;
  image: string;
  bio: string;
  specialties: string[];
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'payment' | 'registration' | 'consultation' | 'system' | 'teachers';
  targetTab?: 'registrations' | 'teachers' | 'settings';
}

export interface SchoolSettings {
  tagline: string;
  quoteFirst: string;
  quoteHighlight1: string;
  quoteMiddle: string;
  quoteHighlight2: string;
  vision: string;
  missions: string[];
  consultationWhatsapp: string;
  schoolLogo: string;
}

export interface User {
  role: 'admin' | 'guest';
  username?: string;
  name: string;
}

export interface OfficialLogos {
  schoolLogo: string | null;
  foundationLogo: string | null;
  networkLogo: string | null;
}
