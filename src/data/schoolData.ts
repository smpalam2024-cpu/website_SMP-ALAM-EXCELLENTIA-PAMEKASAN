import { Pillar, Program, GalleryItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_smp_alam_students_1792630626418.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_nature_classroom_1792630626489.jpg';
export const OUTBOUND_IMAGE = '/src/assets/images/pillar_leadership_outbound_1792630628194.jpg';
export const FARMING_IMAGE = '/src/assets/images/pillar_green_science_farming_1792630629826.jpg';

export const SCHOOL_INFO = {
  name: 'SMP ALAM EXCELLENTIA PAMEKASAN',
  shortName: 'SMP Alam Excellentia',
  foundation: 'Yayasan Insan Kamil',
  network: 'JSAN – Jaringan Sekolah Alam Nusantara',
  location: 'Pademawu, Pamekasan, Madura, Jawa Timur',
  tagline: 'Growing Together With Excellent',
  description:
    'SMP Alam Excellentia Pamekasan menghadirkan pengalaman belajar yang membentuk generasi berakhlak mulia, cerdas berpikir, mandiri, dan bertanggung jawab di bawah naungan Yayasan Insan Kamil – anggota JSAN (Jaringan Sekolah Alam Nusantara).',
  phone: '+62 819 1945 4451',
  whatsapp: '6281919454451',
  email: 'smpalam2024@gmail.com',
  address: 'Jl. Lawangan Daya No.114 Pademawu Pamekasan',
  operationalHours: 'Senin – Jumat: 07.15 – 15.30 WIB',
};

export const THREE_ADVANTAGES = [
  {
    id: 'experiential',
    title: 'Belajar Melalui Pengalaman Langsung',
    description:
      'Siswa mengamati, menyentuh, bereksperimen, dan memecahkan masalah langsung di alam terbuka. Teori diintegrasikan dengan fenomena lingkungan hidup nyata.',
    iconName: 'Compass',
  },
  {
    id: 'character',
    title: 'Pembentukan Karakter & Kemandirian',
    description:
      'Menanamkan adab islami, ketangguhan mental, kepemimpinan tim, serta kemandirian hidup sehari-hari melalui kebiasaan disiplin positif dan tantangan survival terukur.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'reallife',
    title: 'Menghubungkan Ilmu dengan Kehidupan Nyata',
    description:
      'Setiap cabang ilmu sains, matematika, sosial, dan agama diaplikasikan untuk menjawab kebutuhan nyata seperti agribisnis ramah lingkungan dan inovasi sosial.',
    iconName: 'Sprout',
  },
];

// ===== PILLAR PROGRAMS =====
export interface PillarProgram {
  id: string;
  name: string;
  description: string;
}

export interface PillarWithPrograms extends Pillar {
  programs: PillarProgram[];
}

export const FOUR_PILLARS: PillarWithPrograms[] = [
  {
    id: 'akhlak',
    number: '01',
    title: 'AKHLAK',
    subtitle: 'Pilar Karakter & Spiritual Islam',
    description:
      'Membina pribadi muslim yang berakhlak mulia, berhati bersih, dan meneladani Rasulullah SAW dalam seluruh aktivitas, adab terhadap guru, alam, dan sesama.',
    points: [
      'Tahsin – Tahfidz – Taklim harian',
      'Pembiasaan Doa & Hadits setiap hari',
      'PHBI (Peringatan Hari Besar Islam)',
      'Kultum rutin oleh siswa',
    ],
    programs: [
      { id: 'akhlak-1', name: 'Tahsin – Tahfidz – Taklim', description: 'Program harian untuk memperbaiki bacaan Al-Qur\'an (Tahsin), menghafal Al-Qur\'an (Tahfidz), dan pembelajaran ilmu agama Islam (Taklim) yang terstruktur dan terukur dengan pendampingan ustaz/ustazah berpengalaman.' },
      { id: 'akhlak-2', name: 'Pembiasaan Doa & Hadits', description: 'Pembiasaan membaca doa-doa harian dan hafalan hadits Rasulullah SAW setiap pagi sebagai pondasi akhlak dan karakter Islami siswa dalam kehidupan sehari-hari.' },
      { id: 'akhlak-3', name: 'PHBI (Peringatan Hari Besar Islam)', description: 'Kegiatan memperingati hari-hari besar Islam seperti Maulid Nabi, Isra\' Mi\'raj, dan lainnya melalui berbagai kegiatan edukatif, lomba, dan refleksi keagamaan yang melibatkan seluruh warga sekolah.' },
      { id: 'akhlak-4', name: 'Kultum', description: 'Latihan menyampaikan kuliah tujuh menit (Kultum) secara bergantian oleh siswa untuk mengembangkan kemampuan berbicara di depan umum sekaligus memperdalam pemahaman agama Islam.' },
    ],
    image: ABOUT_IMAGE,
    iconName: 'HeartHandshake',
    highlight: 'Karakter kokoh berakar pada nilai-nilai ketauhidan dan adab luhur.',
  },
  {
    id: 'logika',
    number: '02',
    title: 'LOGIKA',
    subtitle: 'Pilar Intelektual & Riset Eksperimental',
    description:
      'Menjadikan semesta sebagai laboratorium agung tanpa dinding. Siswa diasah berpikir kritis, bernalar analitis, meneliti fenomena alam, dan merumuskan solusi berbasis data.',
    points: [
      'Science Project & Outing Class',
      'English Club & ICT',
      'Learning From Maestro',
      'Public Speaking & Kelas Minat Bakat',
    ],
    programs: [
      { id: 'logika-1', name: 'Science Project', description: 'Proyek sains berbasis riset nyata di mana siswa merancang eksperimen, melakukan observasi lapangan, menganalisis data, dan mempresentasikan temuan ilmiah mereka secara sistematis.' },
      { id: 'logika-2', name: 'Outing Class', description: 'Pembelajaran di luar kelas yang membawa siswa langsung ke lingkungan alam, museum, industri, atau komunitas lokal untuk mengintegrasikan teori dengan pengalaman nyata.' },
      { id: 'logika-3', name: 'English Club', description: 'Wadah pengembangan kemampuan bahasa Inggris aktif melalui conversation practice, storytelling, debate, dan presentasi berbahasa Inggris dalam suasana menyenangkan dan kontekstual.' },
      { id: 'logika-4', name: 'ICT (Information & Communication Technology)', description: 'Pembelajaran teknologi informasi dan komunikasi meliputi literasi digital, pemrograman dasar, penggunaan perangkat lunak produktivitas, dan pengembangan konten digital yang kreatif.' },
      { id: 'logika-5', name: 'Learning From Maestro', description: 'Program belajar langsung dari para ahli dan praktisi di bidangnya – pengusaha, ilmuwan, seniman, atau tokoh masyarakat – sebagai sumber inspirasi dan pembelajaran kontekstual dunia nyata.' },
      { id: 'logika-6', name: 'Public Speaking', description: 'Pelatihan kemampuan berbicara di depan umum, mengorganisir argumen, membangun kepercayaan diri, dan menyampaikan pesan secara efektif dalam berbagai konteks dan bahasa.' },
      { id: 'logika-7', name: 'Kelas Minat Bakat', description: 'Kelas khusus yang disesuaikan dengan potensi dan minat unik setiap siswa, memungkinkan mereka mengeksplorasi dan mengembangkan bakat secara mendalam dengan bimbingan fasilitator.' },
    ],
    image: FARMING_IMAGE,
    iconName: 'Microscope',
    highlight: 'Menumbuhkan rasa ingin tahu ilmiah melalui eksplorasi alam langsung.',
  },
  {
    id: 'bisnis',
    number: '03',
    title: 'BISNIS',
    subtitle: 'Pilar Kemandirian Finansial & Kreasi Nilai',
    description:
      'Menanamkan mentalitas wirausaha sejak dini melalui praktik bisnis nyata, magang, dan pengelolaan usaha produktif yang mengintegrasikan nilai-nilai Islam.',
    points: [
      'Market Day & Tes Mental Bisnis',
      'Magang di dunia usaha nyata',
      'Green Lab Agropreneurship',
      'Manajemen finansial sederhana',
    ],
    programs: [
      { id: 'bisnis-1', name: 'Market Day', description: 'Hari pasar simulasi bisnis nyata di mana siswa merencanakan produk, menentukan harga, memasarkan, dan melayani pembeli. Melatih jiwa wirausaha, kemampuan negosiasi, dan literasi finansial secara praktis.' },
      { id: 'bisnis-2', name: 'Tes Mental Bisnis', description: 'Serangkaian tantangan dan simulasi yang dirancang untuk menguji dan membentuk mental wirausaha siswa – ketahanan menghadapi kegagalan, kreativitas menemukan solusi, dan keberanian mengambil risiko terukur.' },
      { id: 'bisnis-3', name: 'Magang', description: 'Program magang di UMKM, lembaga, atau usaha mitra untuk memberikan pengalaman kerja nyata kepada siswa, belajar etos kerja profesional, dan memahami ekosistem bisnis dari dalam.' },
      { id: 'bisnis-4', name: 'Green Lab', description: 'Laboratorium hijau berbasis agropreneurship di mana siswa bercocok tanam organik, mengolah hasil panen, mengembangkan produk ramah lingkungan, hingga memasarkan hasil produksi sekolah.' },
    ],
    image: FARMING_IMAGE,
    iconName: 'Coins',
    highlight: 'Menghasilkan lulusan yang mandiri, produktif, dan berjiwa enterpreneur Islami.',
  },
  {
    id: 'kepemimpinan',
    number: '04',
    title: 'KEPEMIMPINAN',
    subtitle: 'Pilar Ketangguhan & Jiwa Pemimpin',
    description:
      'Membentuk jiwa ksatria yang berani, tangguh, pantang menyerah, dan cakap memimpin maupun dipimpin melalui ekspedisi alam, outbound, dan pengembangan organisasi.',
    points: [
      'Survival, Backpacker & Tracking',
      'Live In bersama komunitas lokal',
      'OSIS & SASS (Student Activity)',
      'Kepemimpinan Proyek Sosial',
    ],
    programs: [
      { id: 'lead-1', name: 'Survival', description: 'Pelatihan ketahanan hidup di alam bebas yang mengajarkan siswa keterampilan dasar seperti navigasi, membuat api, mencari air, pertolongan pertama, dan membangun shelter – menempa mental tangguh dan tidak mudah menyerah.' },
      { id: 'lead-2', name: 'Backpacker', description: 'Perjalanan mandiri dengan ransel yang melatih kemandirian, perencanaan perjalanan, manajemen keuangan terbatas, dan kemampuan berinteraksi dengan lingkungan baru secara adaptif.' },
      { id: 'lead-3', name: 'Tracking', description: 'Kegiatan penelusuran jalur alam (hiking/trekking) yang membangun ketahanan fisik, membaca peta dan kompas, mengenal flora-fauna, serta melatih kerja sama tim dalam kondisi menantang.' },
      { id: 'lead-4', name: 'Live In', description: 'Program tinggal bersama keluarga di komunitas pedesaan atau pesantren selama beberapa hari – menumbuhkan empati sosial, kesederhanaan, kecintaan pada kearifan lokal, dan kepekaan terhadap kehidupan masyarakat.' },
      { id: 'lead-5', name: 'OSIS', description: 'Organisasi Siswa Intra Sekolah sebagai wadah kepemimpinan terstruktur, di mana siswa belajar berorganisasi, merencanakan program, mengambil keputusan, dan bertanggung jawab atas jalannya kegiatan sekolah.' },
      { id: 'lead-6', name: 'SASS', description: 'Student Activity & Social Service – kegiatan layanan sosial dan aksi nyata siswa di masyarakat, melatih kepekaan sosial, semangat berkontribusi, dan kemampuan berkolaborasi dengan komunitas luar sekolah.' },
    ],
    image: OUTBOUND_IMAGE,
    iconName: 'Compass',
    highlight: 'Melatih keberanian mengambil keputusan dan mengayomi sesama.',
  },
];

// ===== EXTRACURRICULAR =====
export const EXTRACURRICULAR = [
  { id: 'ekstra-1', name: 'Literasi', icon: 'BookOpen', description: 'Program pengembangan budaya membaca, menulis, dan literasi informasi. Siswa mengeksplorasi berbagai genre bacaan, membuat karya tulis, dan membangun kebiasaan literasi sebagai fondasi belajar sepanjang hayat.' },
  { id: 'ekstra-2', name: 'Banjari', icon: 'Music', description: 'Kesenian Islami banjari (hadroh) yang melatih seni musik perkusi, syair shalawat, dan kekompakan tim. Menjaga dan melestarikan tradisi seni budaya Islam yang indah dan penuh nilai spiritual.' },
  { id: 'ekstra-3', name: 'Renang', icon: 'Waves', description: 'Olahraga renang yang mengembangkan kemampuan fisik, teknik berenang yang benar, dan ketahanan di air. Mengikuti ajaran Rasulullah SAW tentang keterampilan berenang sebagai bekal kehidupan.' },
  { id: 'ekstra-4', name: 'Memanah', icon: 'Target', description: 'Olahraga memanah (archery) sebagai sunnah Rasulullah SAW yang melatih konsentrasi, ketenangan jiwa, koordinasi mata-tangan, kedisiplinan, dan ketepatan dalam mengambil keputusan.' },
];

// ===== PROGRAMS (Legacy – for ProgramsSection) =====
export const PROGRAMS: Program[] = [
  {
    id: 'outbound-expedition',
    title: 'Ekspedisi Alam & Outbound Leadership',
    category: 'Kepemimpinan',
    tagline: 'Menempa ketangguhan mental, keberanian fisik, dan kepemimpinan di alam bebas.',
    description:
      'Program terprogram berkala di mana siswa diajak menjelajah bentang alam, melatih navigasi, survival, pendakian ramah alam, dan problem-solving tim nyata.',
    outcomes: ['Ketahanan fisik & mental', 'Ketangkasan kerja tim', 'Kemandirian saat menghadapi tantangan'],
    icon: 'Mountain',
    badge: 'Program Wajib Tiap Semester',
  },
  {
    id: 'tahfidz-tadabbur',
    title: 'Tahfidzul Qur\'an & Tadabbur Alam',
    category: 'Spiritualitas',
    tagline: 'Menghafal firman-Nya sembari merenungi keagungan ciptaan-Nya di alam terbuka.',
    description:
      'Siswa menghafal Al-Qur\'an dengan target terukur dan bimbingan ustaz/ustazah, diperkaya sesi tadabbur ayat kauniyah langsung di tengah asrinya alam.',
    outcomes: ['Hafalan Al-Qur\'an mutqin', 'Internalisasi adab islami', 'Kecintaan mendalam pada Al-Qur\'an'],
    icon: 'BookOpen',
    badge: 'Pendampingan Harian',
  },
  {
    id: 'green-science',
    title: 'Riset Alam & Green Science Lab',
    category: 'Intelektual',
    tagline: 'Laboratorium alam untuk meneliti tanaman, air, tanah, dan energi terbarukan.',
    description:
      'Pendekatan hands-on sains di mana siswa melakukan uji coba mikroskopik, pemantauan cuaca mini, pengomposan, serta penelitian keanekaragaman hayati.',
    outcomes: ['Daya nalar analitis', 'Metode ilmiah sistematis', 'Kepekaan pelestarian ekosistem'],
    icon: 'Atom',
    badge: 'Berbasis Riset Nyata',
  },
  {
    id: 'agropreneurship',
    title: 'Farming & Agropreneurship',
    category: 'Kewirausahaan',
    tagline: 'Dari benih hingga pasar: belajar siklus pertanian organik dan bisnis berkelanjutan.',
    description:
      'Siswa merawat bedengan kebun, belajar siklus nutrisi tanah, memanen sayuran segar, merancang kemasan ramah lingkungan, dan menjual hasil panen.',
    outcomes: ['Keahlian agrikultur dasar', 'Mental wirausaha jujur', 'Apresiasi terhadap sumber pangan'],
    icon: 'Trees',
    badge: 'Praktik Lapangan Langsung',
  },
  {
    id: 'bilingual-comm',
    title: 'Language Club (English & Arabic)',
    category: 'Komunikasi',
    tagline: 'Komunikasi aktif multibahasa dengan pendekatan kontekstual dan percakapan alam.',
    description:
      'Praktek bahasa Arab dan Inggris dalam aktivitas harian, presentasi projek sains, dan story telling, membekali siswa berwawasan global.',
    outcomes: ['Kepercayaan diri berbicara', 'Kosa kata tematik alam & sains', 'Wawasan global'],
    icon: 'Globe',
    badge: 'Habituasi Kontekstual',
  },
  {
    id: 'community-project',
    title: 'Projek Sosial & Pengabdian Masyarakat',
    category: 'Sosial',
    tagline: 'Membangun empati dan kontribusi nyata untuk masyarakat Pamekasan dan sekitar.',
    description:
      'Siswa terjun ke desa mitra untuk berkolaborasi, belajar kearifan lokal petani Madura, berbagi edukasi kebersihan lingkungan, dan kegiatan sosial.',
    outcomes: ['Tinggi empati sosial', 'Menghormati kearifan lokal', 'Jiwa kepedulian masyarakat'],
    icon: 'Users',
    badge: 'Pembelajaran Kontekstual',
  },
];

// ===== GALLERY ITEMS with video support =====
export interface GalleryItemExtended extends GalleryItem {
  type: 'photo' | 'video';
  videoUrl?: string;
  thumbnail?: string;
}

export const GALLERY_ITEMS: GalleryItemExtended[] = [
  {
    id: 'gal-1',
    title: 'Eksplorasi Alam & Belajar Kelompok',
    category: 'outbound',
    type: 'photo',
    image: HERO_IMAGE,
    caption: 'Siswa berdiskusi aktif dan mencatat temuan sains di ruang terbuka hijau kampus.',
    location: 'Area Kampus Alam Pamekasan',
  },
  {
    id: 'gal-2',
    title: 'Kelas Terbuka Pendopo Kayu',
    category: 'sains',
    type: 'photo',
    image: ABOUT_IMAGE,
    caption: 'Suasana kelas alami semi terbuka yang sejuk dan menstimulasi fokus belajar siswa.',
    location: 'Saung Belajar Utama',
  },
  {
    id: 'gal-3',
    title: 'Tantangan Jembatan Tali & Team Building',
    category: 'outbound',
    type: 'photo',
    image: OUTBOUND_IMAGE,
    caption: 'Menumbuhkan keberanian melewati rintangan ketinggian dengan prosedur keamanan lengkap.',
    location: 'Hutan Pinus & Jalur Outbound',
  },
  {
    id: 'gal-4',
    title: 'Praktik Menanam Sayur Organik',
    category: 'pertanian',
    type: 'photo',
    image: FARMING_IMAGE,
    caption: 'Siswa belajar langsung kontak dengan tanah, menanam bibit, dan merawat tanaman pangan.',
    location: 'Kebun Permakultur Sekolah',
  },
  {
    id: 'gal-5',
    title: 'Profil SMP Alam Excellentia',
    category: 'sains',
    type: 'video',
    image: HERO_IMAGE,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caption: 'Video profil dan kegiatan belajar SMP Alam Excellentia Pamekasan.',
    location: 'SMP Alam Excellentia Pamekasan',
  },
];

export const PPDB_STEPS = [
  {
    step: '01',
    title: 'Pendaftaran Online & Observasi',
    desc: 'Mengisi formulir online atau datang langsung ke sekretariat PPDB di Jl. Lawangan Daya No.114 Pademawu Pamekasan.',
  },
  {
    step: '02',
    title: 'Observasi Siswa & Wawancara Ortu',
    desc: 'Bukan tes akademis yang menegangkan, melainkan observasi bakat, gaya belajar, dan keselarasan visi orang tua.',
  },
  {
    step: '03',
    title: 'Pengumuman & Registrasi Ulang',
    desc: 'Konfirmasi penerimaan calon siswa dan pemenuhan kelengkapan administrasi peserta didik.',
  },
  {
    step: '04',
    title: 'Orientasi Siswa & Welcoming Camp',
    desc: 'Kegiatan pengenalan budaya sekolah alam, outbound perkenalan teman baru, dan komitmen bersama.',
  },
];

export const FAQS = [
  {
    q: 'Apa perbedaan mendasar SMP Alam Excellentia dengan SMP konvensional?',
    a: 'Di SMP Alam Excellentia Pamekasan, alam adalah buku teks utama dan ruang kelas kami tidak bersekat tembok kaku. Pembelajaran berbasis 4 pilar (Akhlak, Logika, Bisnis, dan Kepemimpinan) dipraktikkan langsung melalui projek riil, ekspedisi, dan riset lingkungan hidup.',
  },
  {
    q: 'Bagaimana kurikulum yang digunakan oleh sekolah?',
    a: 'Kami memadukan Kurikulum Nasional dengan Kurikulum Khas Sekolah Alam serta penguatan nilai-nilai keislaman dari Yayasan Insan Kamil. Kami merupakan anggota JSAN (Jaringan Sekolah Alam Nusantara). Siswa tetap siap mengikuti asesmen nasional dengan pemahaman konsep yang mendalam.',
  },
  {
    q: 'Apakah ada program Tahfidz Al-Qur\'an?',
    a: 'Ya, Tahfidzul Qur\'an merupakan salah satu program unggulan harian dalam pilar Akhlak dengan target hafalan yang terarah, disertai pembelajaran tadabbur alam sehingga siswa mencintai Al-Qur\'an secara utuh.',
  },
  {
    q: 'Bagaimana aspek keamanan selama kegiatan outbound dan ekspedisi alam?',
    a: 'Keselamatan adalah prioritas utama. Seluruh kegiatan outbound dipandu oleh instruktur tersertifikasi, menggunakan perlengkapan standar keamanan (helm, harness, tali statis/dinamis), dan didampingi tim medis serta guru pamong berpengalaman.',
  },
  {
    q: 'Kapan pendaftaran siswa baru dibuka?',
    a: 'Pendaftaran Siswa Baru (PPDB) dibuka dalam beberapa gelombang. Kuota kelas terbatas untuk menjamin rasio guru dan murid yang ideal demi pendampingan personal. Hubungi kami di Jl. Lawangan Daya No.114 Pademawu Pamekasan.',
  },
];
