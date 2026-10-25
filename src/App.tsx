/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminBar } from './components/AdminBar';
import { Navbar } from './components/Navbar';
import { InstitutionalBanner } from './components/OfficialLogos';
import { Hero } from './components/Hero';
import { VisionMissionSection } from './components/VisionMissionSection';
import { AboutSection } from './components/AboutSection';
import { FourPillarsSection } from './components/FourPillarsSection';
import { TeachersSection } from './components/TeachersSection';
import { ProgramsSection } from './components/ProgramsSection';
import { GallerySection } from './components/GallerySection';
import { PPDBSection } from './components/PPDBSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { PaymentProofModal } from './components/PaymentProofModal';
import { LoginModal } from './components/LoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { GuestDashboardModal } from './components/GuestDashboardModal';
import { LogoManagerModal } from './components/LogoManagerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function AppContent() {
  const {
    openLoginModal,
    setOpenLoginModal,
    openAdminDashboard,
    setOpenAdminDashboard,
    openGuestDashboard,
    setOpenGuestDashboard,
  } = useApp();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [paymentProofModalOpen, setPaymentProofModalOpen] = useState(false);
  const [logoManagerOpen, setLogoManagerOpen] = useState(false);
  const [logoUpdateCounter, setLogoUpdateCounter] = useState(0);

  const handleExplore = () => {
    const el = document.getElementById('visi-misi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogosUpdated = () => {
    setLogoUpdateCounter((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-500 selection:text-white antialiased flex flex-col">
      {/* Admin Quick Action Strip (only visible when logged in as admin) */}
      <AdminBar />

      {/* Dynamic Navigation Bar with Login/Guest/WhatsApp triggers */}
      <Navbar
        onOpenRegister={() => setRegisterModalOpen(true)}
        onOpenPaymentProof={() => setPaymentProofModalOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Hero with official logo badge, tagline, & direct CTA */}
        <Hero
          onOpenRegister={() => setPaymentProofModalOpen(true)}
          onExplore={handleExplore}
        />

        {/* Institutional Banner (Official Logos of School, Foundation, & Network) */}
        <InstitutionalBanner
          key={logoUpdateCounter}
          onOpenManager={() => setLogoManagerOpen(true)}
        />

        {/* Section 2: Beranda Awal VISI & 5 MISI, TAGLINE, and PENGALAMAN ADALAH GURU TERBAIK */}
        <VisionMissionSection />

        {/* Section 3: Tentang Kami & 3 Keunggulan Belajar di Alam */}
        <AboutSection
          onOpenRegister={() => setPaymentProofModalOpen(true)}
        />

        {/* Section 4: Empat Pilar Pendidikan Sekolah Alam */}
        <FourPillarsSection
          onOpenRegister={() => setPaymentProofModalOpen(true)}
        />

        {/* Section 5: Informasi Guru & Fasilitator (Editable by Admin, View-only for Visitors) */}
        <TeachersSection />

        {/* Section 6: Program Unggulan */}
        <ProgramsSection
          onOpenRegister={() => setPaymentProofModalOpen(true)}
        />

        {/* Section 7: Galeri Aktivitas Belajar */}
        <GallerySection />

        {/* Section 8: Alur PPDB & Fitur Daftar Sekarang (Terkunci jika belum kirim bukti pembayaran) */}
        <PPDBSection
          onOpenRegister={() => setRegisterModalOpen(true)}
          onOpenPaymentProof={() => setPaymentProofModalOpen(true)}
        />

        {/* Section 9: Kontak & Konsultasi WhatsApp */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLogoManager={() => setLogoManagerOpen(true)}
        onOpenRegister={() => setPaymentProofModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Modal 1: Login Modal (Admin Utama & Tamu Pengunjung) */}
      <LoginModal
        isOpen={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
      />

      {/* Modal 2: Dasbor Admin Utama (CMS, Notifikasi, Guru, PPDB, Pengaturan WA) */}
      <AdminDashboardModal
        isOpen={openAdminDashboard}
        onClose={() => setOpenAdminDashboard(false)}
      />

      {/* Modal 3: Dasbor Tamu Pengunjung (Konsultasi WA, Status Pendaftaran) */}
      <GuestDashboardModal
        isOpen={openGuestDashboard}
        onClose={() => setOpenGuestDashboard(false)}
        onOpenPaymentProof={() => setPaymentProofModalOpen(true)}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      {/* Modal 4: Kirim Bukti Pembayaran Administrasi PPDB */}
      <PaymentProofModal
        isOpen={paymentProofModalOpen}
        onClose={() => setPaymentProofModalOpen(false)}
        onSuccessOpenRegister={() => setRegisterModalOpen(true)}
      />

      {/* Modal 5: Formulir Lengkap Pendaftaran Siswa Baru */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onOpenPaymentProof={() => setPaymentProofModalOpen(true)}
      />

      {/* Modal 6: Logo Manager Modal */}
      <LogoManagerModal
        isOpen={logoManagerOpen}
        onClose={() => setLogoManagerOpen(false)}
        onLogosUpdated={handleLogosUpdated}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
