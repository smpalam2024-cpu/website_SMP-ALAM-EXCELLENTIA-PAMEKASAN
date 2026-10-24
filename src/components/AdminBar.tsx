import React from 'react';
import { ShieldCheck, Bell, Settings, Users, LogOut, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, unreadCount, setOpenAdminDashboard, setActiveAdminTab, logout } = useApp();

  if (!isAdmin) return null;

  return (
    <div className="bg-emerald-950 text-white text-xs px-4 py-2 border-b border-emerald-800/80 sticky top-0 z-50 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-extrabold text-amber-300 font-display flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>MODE ADMIN AKTIF</span>
        </span>
        <span className="hidden md:inline text-stone-300">·</span>
        <span className="hidden md:inline text-stone-300">
          Anda memiliki hak penuh untuk mengedit perkembangan website, guru, nomor WA, dan PPDB
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            setActiveAdminTab('summary');
            setOpenAdminDashboard(true);
          }}
          className="relative px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 font-semibold text-emerald-200"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Notifikasi</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveAdminTab('settings');
            setOpenAdminDashboard(true);
          }}
          className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-forest-950 font-bold transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dasbor Admin</span>
        </button>

        <button
          onClick={logout}
          className="p-1 text-stone-400 hover:text-rose-300 transition-colors"
          title="Keluar dari mode admin"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
