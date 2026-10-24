import { Pillar, Program, GalleryItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_smp_alam_students_1792630626418.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_nature_classroom_1792630626489.jpg';
export const OUTBOUND_IMAGE = '/src/assets/images/pillar_leadership_outbound_1792630628194.jpg';
export const FARMING_IMAGE = '/src/assets/images/pillar_green_science_farming_1792630629826.jpg';

export const SCHOOL_INFO = {
  name: 'SMP ALAM EXCELLENTIA PAMEKASAN',
  shortName: 'SMP Alam Excellentia',
  foundation: 'Yayasan Insan Kamil Pamekasan',
  network: 'Sekolah Alam Indonesia',
  location: 'Pamekasan, Madura, Jawa Timur',
  tagline: 'Belajar dari Alam, Bertumbuh Menjadi Pemimpin Masa Depan',
  description:
    'SMP Alam Excellentia Pamekasan menghadirkan pengalaman belajar yang membentuk generasi berakhlak mulia, cerdas berpikir, mandiri, dan bertanggung jawab.',
  phone: '+62 823-3456-7890',
  whatsapp: '6282334567890',
  email: 'smpalam2024@gmail.com',
  address: 'Jl. Raya Proppo, Pamekasan, Madura, Jawa Timur 69317',
  operationalHours: 'Senin - Jumat: 07.15 - 15.30 WIB',
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

export const FOUR_PILLARS: Pillar[] = [
  {
    id: 'akhlaq',
    number: '01',
    title: 'Akhlaqul Karimah',
    subtitle: 'Pilar Karakter & Spiritual Islam',
    description:
      'Membina pribadi muslim yang berakhlak mulia, berhati bersih, dan meneladani Rasulullah SAW dalam seluruh aktivitas, adab terhadap guru, alam, dan sesama.',
    points: [
      'Pembiasaan Sholat Berjamaah & Sholat Dhuha',
      'Tahsin & Tahfidz Al-Qur’an bersanad mutqin',
      'Adab islami terhadap alam, guru, orang tua, dan teman',
      'Kajian tafsir ayat kauniyah (ayat-ayat alam semesta)',
    ],
    image: ABOUT_IMAGE,
    iconName: 'HeartHandshake',
    highlight: 'Karakter kokoh berakar pada nilai-nilai ketauhidan dan adab luhur.',
  },
  {
    id: 'logika-sains',
    number: '02',
    title: 'Falsafah Logika & Sains Alam',
    subtitle: 'Pilar Intelektual & Riset Eksperimental',
    description:
      'Menjadikan semesta sebagai laboratorium agung tanpa dinding. Siswa diasah berpikir kritis, bernalar analitis, meneliti fenomena alam, dan merumuskan solusi berbasis data.',
    points: [
      'Pembelajaran Sains Terapan & Observasi Ekosistem',
      'Metode Riset Lapangan & Eksperimen Mandiri',
      'Matematika Kontekstual berbasis persoalan nyata',
      'Literasi Lingkungan Hidup & Konservasi Sumber Daya',
    ],
    image: FARMING_IMAGE,
    iconName: 'Microscope',
    highlight: 'Menumbuhkan rasa ingin tahu ilmiah melalui eksplorasi alam langsung.',
  },
  {
    id: 'kepemimpinan',
    number: '03',
    title: 'Kepemimpinan & Survival',
    subtitle: 'Pilar Ketangguhan & Kolaborasi Tim',
    description:
      'Membentuk jiwa ksatria yang berani, tangguh, pantang menyerah, dan cakap memimpin maupun dipimpin melalui ekspedisi alam, outbound terstruktur, dan pemecahan masalah.',
    points: [
      'Outbound Leadership Challenge berkala',
      'Ekspedisi Alam, Trekking & Navigasi Darat',
      'Keterampilan Survival dasar & Tanggap Bencana',
      'Kepemimpinan Projek Sosial & Kolaborasi Kelompok',
    ],
    image: OUTBOUND_IMAGE,
    iconName: 'Compass',
    highlight: 'Melatih keberanian mengambil keputusan dan mengayomi sesama.',
  },
  {
    id: 'kewirausahaan',
    number: '04',
    title: 'Kewirausahaan (Entrepreneurship)',
    subtitle: 'Pilar Kemandirian Finansial & Kreasi Nilai',
    description:
      'Menanamkan mentalitas wirausaha sejak dini melalui praktik bercocok tanam organik (farming/permakultur), mengolah produk, menghitung laba-rugi, dan memasarkan karya secara jujur.',
    points: [
      'Green Farming & Budidaya Tanaman Pangan Organik',
      'Market Day & Festival Bisnis Siswa Sekolah Alam',
      'Manajemen Finansial Sederhana & Pembukuan Transparan',
      'Kreativitas Produk Olahan Pangan & Kerajinan Ramah Lingkungan',
    ],
    image: FARMING_IMAGE,
    iconName: 'Coins',
    highlight: 'Menghasilkan lulusan yang mandiri, produktif, dan berjiwa enterpreneur islami.',
  },
];

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
    title: 'Tahfidzul Qur’an & Tadabbur Alam',
    category: 'Spiritualitas',
    tagline: 'Menghafal firman-Nya sembari merenungi keagungan ciptaan-Nya di alam terbuka.',
    description:
      'Siswa menghafal Al-Qur’an dengan target terukur dan bimbingan ustaz/ustazah, diperkaya sesi tadabbur ayat kauniyah langsung di tengah asrinya alam.',
    outcomes: ['Hafalan Al-Qur’an mutqin', 'Internalisasi adab islami', 'Kecintaan mendalam pada Al-Qur’an'],
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

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Eksplorasi Alam & Belajar Kelompok',
    category: 'outbound',
    image: HERO_IMAGE,
    caption: 'Siswa berdiskusi aktif dan mencatat temuan sains di ruang terbuka hijau kampus.',
    location: 'Area Kampus Alam Pamekasan',
  },
  {
    id: 'gal-2',
    title: 'Kelas Terbuka Pendopo Kayu',
    category: 'sains',
    image: ABOUT_IMAGE,
    caption: 'Suasana kelas alami semi terbuka yang sejuk dan menstimulasi fokus belajar siswa.',
    location: 'Saung Belajar Utama',
  },
  {
    id: 'gal-3',
    title: 'Tantangan Jembatan Tali & Team Building',
    category: 'outbound',
    image: OUTBOUND_IMAGE,
    caption: 'Menumbuhkan keberanian melewati rintangan ketinggian dengan prosedur keamanan lengkap.',
    location: 'Hutan Pinus & Jalur Outbound',
  },
  {
    id: 'gal-4',
    title: 'Praktik Menanam Sayur Organik',
    category: 'pertanian',
    image: FARMING_IMAGE,
    caption: 'Siswa belajar langsung kontak dengan tanah, menanam bibit, dan merawat tanaman pangan.',
    location: 'Kebun Permakultur Sekolah',
  },
];

export const PPDB_STEPS = [
  {
    step: '01',
    title: 'Pendaftaran Online & Observasi',
    desc: 'Mengisi formulir online atau datang langsung ke sekretariat PPDB di Pamekasan.',
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
    a: 'Di SMP Alam Excellentia Pamekasan, alam adalah buku teks utama dan ruang kelas kami tidak bersekat tembok kaku. Pembelajaran berbasis 4 pilar (Akhlak, Logika/Sains, Kepemimpinan, dan Kewirausahaan) dipraktikkan langsung melalui projek riil, ekspedisi, dan riset lingkungan hidup.',
  },
  {
    q: 'Bagaimana kurikulum yang digunakan oleh sekolah?',
    a: 'Kami memadukan Kurikulum Nasional dengan Kurikulum Khas Sekolah Alam serta penguatan nilai-nilai keislaman dari Yayasan Insan Kamil Pamekasan. Siswa tetap siap mengikuti asesmen nasional dengan pemahaman konsep yang mendalam.',
  },
  {
    q: 'Apakah ada program Tahfidz Al-Qur’an?',
    a: 'Ya, Tahfidzul Qur’an merupakan salah satu program unggulan harian dengan target hafalan yang terarah, disertai pembelajaran tadabbur alam sehingga siswa mencintai Al-Qur’an secara utuh.',
  },
  {
    q: 'Bagaimana aspek keamanan selama kegiatan outbound dan ekspedisi alam?',
    a: 'Keselamatan adalah prioritas utama. Seluruh kegiatan outbound dipandu oleh instruktur tersertifikasi, menggunakan perlengkapan standar keamanan (helm, harness, tali statis/dinamis), dan didampingi tim medis serta guru pamong berpengalaman.',
  },
  {
    q: 'Kapan pendaftaran siswa baru dibuka?',
    a: 'Pendaftaran Siswa Baru (PPDB) dibuka dalam beberapa gelombang. Kuota kelas terbatas untuk menjamin rasio guru dan murid yang ideal demi pendampingan personal.',
  },
];
