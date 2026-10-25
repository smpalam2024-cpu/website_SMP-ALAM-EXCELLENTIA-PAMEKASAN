import React from 'react';
import { Smartphone, BookX, HeartCrack, Compass, ArrowRight, Phone, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import SplashCursor from './SplashCursor';
import { useApp } from '../context/AppContext';

interface ProblemAgitationSectionProps {
  onOpenRegister?: () => void;
}

export const ProblemAgitationSection: React.FC<ProblemAgitationSectionProps> = ({ onOpenRegister }) => {
  const { settings } = useApp();

  const problems = [
    {
      id: 'screen-addiction',
      icon: <Smartphone className="w-6 h-6 text-rose-400" />,
      badge: 'Tantangan Fisik & Sosial',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      title: 'Kecanduan Layar & Tubuh Pasif',
      description:
        'Remaja hari ini rata-rata menghabiskan 6–8 jam di depan gadget. Fisik kian lemah, postur pasif, dan mereka terasing dari interaksi nyata di alam terbuka.',
      agitation: 'Dampaknya: Anak rentan obesitas, emosi tidak stabil, dan kehilangan kepekaan sosial terhadap lingkungan sekitarnya.',
    },
    {
      id: 'rote-learning',
      icon: <BookX className="w-6 h-6 text-amber-400" />,
      badge: 'Tantangan Nalar & Logika',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      title: 'Hanya Menghafal Tanpa Memahami',
      description:
        'Pendidikan konvensional kerap berfokus pada hafalan demi nilai ujian semata. Saat menghadapi persoalan praktis, anak bingung dan kehilangan nalar kritis.',
      agitation: 'Dampaknya: Ilmu sebatas teori di atas kertas yang lekas terlupakan dan tidak aplikatif untuk menjawab tantangan zaman.',
    },
    {
      id: 'strawberry-generation',
      icon: <HeartCrack className="w-6 h-6 text-orange-400" />,
      badge: 'Tantangan Mental & Adab',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      title: 'Kerapuhan Mental & Krisis Adab',
      description:
        'Fenomena Generasi Strawberry: tampak cerdas dari luar namun rapuh saat menghadapi tekanan, mudah putus asa, dan luntur adab serta rasa hormat.',
      agitation: 'Dampaknya: Anak kurang tangguh menuntaskan tanggung jawab dan tidak mandiri saat berada jauh dari orang tua.',
    },
    {
      id: 'lack-leadership',
      icon: <Compass className="w-6 h-6 text-sky-400" />,
      badge: 'Tantangan Jiwa Mandiri',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      title: 'Kehilangan Jiwa Pemimpin & Inisiatif',
      description:
        'Terbiasa hanya menerima instruksi kaku tanpa pernah diberi ruang untuk mengambil keputusan, memimpin kelompok, atau merancang proyek mandiri.',
      agitation: 'Dampaknya: Anak pasif, takut mengambil risiko terukur, dan tidak memiliki mentalitas wirausaha saat dewasa.',
    },
  ];

  const handleConsultation = () => {
    const cleanWa = settings.consultationWhatsapp.replace(/^0+/, '');
    window.open(
      `https://wa.me/62${cleanWa}?text=${encodeURIComponent(
        "Assalamu'alaikum Admin SMP Alam Excellentia, saya ingin berkonsultasi mengenai solusi pendidikan dan perkembangan ananda kami."
      )}`,
      '_blank'
    );
  };

  return (
    <section
      id="tantangan-generasi"
      className="relative py-20 sm:py-28 bg-slate-950 text-white overflow-hidden border-y border-slate-800"
    >
      {/* Interactive SplashCursor Fluid Canvas inside this section */}
      <SplashCursor
        contained={true}
        rainbow={true}
        size={1}
        force={0.8}
        swirl={3}
        trail={1.2}
        clickSplash={true}
        theme="dark"
        zIndex={1}
      />

      {/* Subtle Atmospheric Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Alert Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
            <span>Kegelisahan Orang Tua di Era Digital</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Apakah Ayah &amp; Bunda Mengkhawatirkan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300">
              4 Hal Ini pada Ananda?
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Mendidik remaja usia SMP di era sekarang penuh tantangan. Dinding sekolah konvensional sering kali terlalu kaku untuk mengasah mental, fitrah belajar, dan kepemimpinan sejati.
          </p>

          <p className="mt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Sentuh atau gerakkan kursor di area ini untuk efek fluida interaktif</span>
          </p>
        </div>

        {/* 4 Agitation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {problems.map((prob, idx) => (
            <div
              key={prob.id}
              className="relative rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-orange-500/50 p-6 sm:p-8 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/20"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 shrink-0 group-hover:scale-105 transition-transform">
                  {prob.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${prob.badgeColor}`}>
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-orange-300 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {prob.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-[11px] sm:text-xs text-rose-200 leading-snug">
                    <span className="font-bold text-rose-300">Peringatan: </span>
                    {prob.agitation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Bridge to Solution Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Solusi Pendidikan Sekolah Alam</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-snug">
              SMP ALAM EXCELLENTIA Hadir Membimbing Ananda Bertumbuh Menjadi Pemimpin Mandiri
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Kami membebaskan anak dari sekat kelas kaku. Melalui metode <strong className="text-orange-400">Experiential Learning</strong> dan <strong className="text-emerald-400">4 Pilar Pendidikan (Akhlak, Logika, Bisnis, Kepemimpinan)</strong> di bawah naungan JSAN &amp; Yayasan Insan Kamil, ananda ditempa menjadi generasi tangguh beradab mulia.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#empat-pilar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 rounded-xl shadow-lg shadow-orange-950/40 transition-all uppercase tracking-wider"
              >
                <span>LIHAT 4 PILAR PENDIDIKAN</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-blue-700/80 hover:bg-blue-600/90 border border-blue-400/40 rounded-xl backdrop-blur-md transition-all"
              >
                <Phone className="w-4 h-4 text-blue-300" />
                <span>Konsultasi Solusi Ananda</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
