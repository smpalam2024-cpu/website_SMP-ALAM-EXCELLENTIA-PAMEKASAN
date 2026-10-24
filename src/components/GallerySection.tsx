import React, { useState } from 'react';
import { Camera, MapPin, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'outbound' | 'sains' | 'pertanian'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="galeri" className="py-20 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>Dokumentasi Pembelajaran</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
              Galeri Jejak Aktivitas Siswa
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Momen nyata keceriaan, kerja sama, dan pembelajaran otentik siswa SMP Alam Excellentia Pamekasan di alam terbuka.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button controls allowed per constitution) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/70 rounded-xl self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-forest-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua Foto
            </button>
            <button
              onClick={() => setFilter('outbound')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'outbound'
                  ? 'bg-white text-forest-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Outbound
            </button>
            <button
              onClick={() => setFilter('sains')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'sains'
                  ? 'bg-white text-forest-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sains & Kelas
            </button>
            <button
              onClick={() => setFilter('pertanian')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'pertanian'
                  ? 'bg-white text-forest-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kebun Organik
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-display group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-950 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-800 relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] sm:aspect-[16/10] bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 sm:p-6 bg-stone-900 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold font-display">{activeItem.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1">{activeItem.caption}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeItem.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
