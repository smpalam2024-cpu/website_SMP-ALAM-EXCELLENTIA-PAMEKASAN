import React, { useState } from 'react';
import { Camera, MapPin, X, ZoomIn, Play, Video, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItemExtended } from '../data/schoolData';

type FilterType = 'all' | 'photo' | 'video' | 'outbound' | 'sains' | 'pertanian';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeItem, setActiveItem] = useState<GalleryItemExtended | null>(null);

  const filterOptions: { label: string; value: FilterType; icon?: React.ReactNode }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Foto', value: 'photo', icon: <ImageIcon className="w-3 h-3" /> },
    { label: 'Video', value: 'video', icon: <Video className="w-3 h-3" /> },
    { label: 'Outbound', value: 'outbound' },
    { label: 'Sains & Kelas', value: 'sains' },
    { label: 'Kebun Organik', value: 'pertanian' },
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'photo') return item.type === 'photo';
    if (filter === 'video') return item.type === 'video';
    return item.category === filter;
  });

  return (
    <section id="galeri" className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase mb-3">
              <Camera className="w-4 h-4 text-blue-600" />
              <span>Dokumentasi Kegiatan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
              Galeri <span className="text-orange-500">Foto & Video</span><br />Kegiatan Siswa
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Momen nyata keceriaan, kerja sama, dan pembelajaran otentik siswa SMP Alam Excellentia Pamekasan di alam terbuka.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl self-start md:self-end flex-wrap">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === opt.value
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">Belum ada konten untuk kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Video play overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}
                  {/* Photo zoom overlay */}
                  {item.type === 'photo' && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                  {/* Type badge */}
                  <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    item.type === 'video'
                      ? 'bg-orange-500 text-white'
                      : 'bg-blue-700 text-white'
                  }`}>
                    {item.type === 'video' ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                    {item.type === 'video' ? 'Video' : 'Foto'}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.caption}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin note: Add more via video URL */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700 text-center">
          💡 Admin dapat menambahkan foto dan video kegiatan melalui Dasbor Admin
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-slate-950 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-800 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            {activeItem.type === 'video' && activeItem.videoUrl ? (
              <div className="video-container" style={{ paddingBottom: '56.25%', position: 'relative', height: 0, overflow: 'hidden' }}>
                <iframe
                  src={activeItem.videoUrl}
                  title={activeItem.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            ) : (
              <div className="aspect-[16/9] sm:aspect-[16/10] bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="p-5 sm:p-6 bg-slate-900 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-2 ${
                    activeItem.type === 'video' ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {activeItem.type === 'video' ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                    {activeItem.type}
                  </div>
                  <h4 className="text-lg font-bold font-display">{activeItem.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeItem.caption}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-400 shrink-0">
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
