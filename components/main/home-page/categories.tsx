import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, FileText, CheckCircle, Ghost, AlertTriangle, 
  TrendingDown, ZapOff, Zap, Settings, Code2, 
  BarChart3, MessageSquare, CreditCard, Search, Server 
} from "lucide-react";


// --- TYPES & DUMMY DATA (Katalog Kamu) ---
interface ProjectItem {
  id: number; slug: string; name: string; category: string;
  description: string; status: boolean; imageUrl: string; details: string; price: string;
}

const CATEGORIES = ["E-Commerce", "Marketplace", "Koperasi", "Top-up Store", "Web Aplikasi", "Website Company Profile"];

const DUMMY_PROJECTS: ProjectItem[] = [
  {
    id: 1, slug: "ecom-beauty", name: "Template 1 - Kecantikan (Beauty Store)",
    category: "E-Commerce", description: "Desain elegan dan bersih, fokus pada visual produk skincare/kosmetik.",
    status: true,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500",
    details: "Fitur: Filter jenis kulit, integrasi review video, bundle product system.",
    price: "Rp. 3.500.000",
  },
  {
    id: 2,
    slug: "ecom-kids",
    name: "Template 2 - Kerajinan Anak (Kids Craft)",
    category: "E-Commerce",
    description: "Tema playful dan warna-warni untuk produk mainan atau edukasi.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Custom product builder (pilih warna/nama), galeri hasil karya, blog parenting.",
    price: "Rp. 3.200.000",
  },
  {
    id: 3,
    slug: "ecom-fashion",
    name: "Template 3 - Fashion Modern",
    category: "E-Commerce",
    description: "Layout grid masonry modern untuk clothing line dan distro.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Size guide popup, lookbook gallery, integrasi stok varian warna/ukuran.",
    price: "Rp. 3.800.000",
  },

  // 2. MARKETPLACE
  {
    id: 4,
    slug: "market-electro",
    name: "Template 1 - Marketplace Elektronik",
    category: "Marketplace",
    description: "Platform multi-vendor khusus gadget dan komputer.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Komparasi spesifikasi, sistem garansi seller, filter teknis mendalam.",
    price: "Rp. 8.500.000",
  },
  {
    id: 5,
    slug: "market-koperasi-serba",
    name: "Template 2 - Marketplace Koperasi Serba Usaha",
    category: "Marketplace",
    description: "Wadah jual beli antar anggota koperasi atau umum.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Pembayaran potong saldo anggota, sistem royalti koperasi, manajemen UMKM anggota.",
    price: "Rp. 7.500.000",
  },

  // 3. KOPERASI (CORE SYSTEM)
  {
    id: 6,
    slug: "kop-sp",
    name: "Koperasi Simpan Pinjam (KSP)",
    category: "Koperasi",
    description: "Core banking system untuk manajemen simpanan dan pinjaman.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Hitung bunga (flat/anuitas), simulasi pinjaman, laporan neraca & SHU otomatis.",
    price: "Rp. 12.000.000",
  },
  {
    id: 7,
    slug: "kop-serba-usaha",
    name: "Koperasi Serba Usaha & Simpan Pinjam",
    category: "Koperasi",
    description: "Sistem hybrid: Unit dagang/ritel terintegrasi dengan unit simpan pinjam.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: POS Kasir toko, stok opname, integrasi saldo simpanan untuk belanja.",
    price: "Rp. 15.000.000",
  },

  // 4. TOP-UP STORE
  {
    id: 8,
    slug: "topup-gaming",
    name: "Template 1 - Gaming Store",
    category: "Top-up Store",
    description: "Website top-up voucher game otomatis (seperti Turu Store).",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Integrasi API Digiflazz/VipReseller, cek ID game otomatis, flash sale event.",
    price: "Rp. 2.500.000",
  },
  {
    id: 9,
    slug: "topup-ppob",
    name: "Template 2 - PPOB Payment Point",
    category: "Top-up Store",
    description: "Layanan pembayaran tagihan (PLN, PDAM, BPJS) dan Pulsa.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Cetak struk bluetooth, sistem agen/downline, markup harga per level.",
    price: "Rp. 2.800.000",
  },

  // 5. WEB APLIKASI
  {
    id: 10,
    slug: "app-kta",
    name: "Digital KTA (Partai/Komunitas)",
    category: "Web Aplikasi",
    description: "Manajemen anggota organisasi dengan kartu digital QR Code.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Scan QR kehadiran event, database anggota partai/ormas, broadcast info.",
    price: "Rp. 5.000.000",
  },
  {
    id: 11,
    slug: "app-pm",
    name: "Project Management System",
    category: "Web Aplikasi",
    description: "Aplikasi monitoring progress kerja tim (Kanban/Scrum).",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Deadline reminder, time tracking, file sharing, laporan produktivitas.",
    price: "Rp. 4.500.000",
  },
  {
    id: 12,
    slug: "app-siakad-kampus",
    name: "SIAKAD Kampus",
    category: "Web Aplikasi",
    description: "Sistem Informasi Akademik lengkap untuk Universitas/STT.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: KRS/KHS Online, Integrasi Feeder Dikti, modul dosen wali, keuangan mhs.",
    price: "Rp. 25.000.000",
  },
  {
    id: 13,
    slug: "app-siakad-sekolah",
    name: "SIAKAD Sekolah",
    category: "Web Aplikasi",
    description: "Manajemen sekolah (SD/SMP/SMA) dan E-Rapor.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Absensi siswa/guru, E-Rapor Kurikulum Merdeka, Info SPP via WA.",
    price: "Rp. 10.000.000",
  },
  {
    id: 14,
    slug: "app-ujian",
    name: "Ujian Online System",
    category: "Web Aplikasi",
    description: "Platform ujian berbasis web ringan dan anti-cheat dasar.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Bank soal, acak soal/jawaban, timer otomatis, hasil langsung keluar.",
    price: "Rp. 3.000.000",
  },
  {
    id: 15,
    slug: "app-cbt",
    name: "CBT Online (Computer Based Test)",
    category: "Web Aplikasi",
    description: "Sistem ujian standar CBT mirip UNBK untuk skala besar.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 16,
    slug: "company-profile-corporate",
    name: "Company Profile (Corporate)",
    category: "Website Company Profile",
    description: "Website company profile untuk perusahaan.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 17,
    slug: "company-profile-umkm",
    name: "Company Profile (UMKM)",
    category: "Website Company Profile",
    description: "Website company profile untuk UMKM.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 18,
    slug: "company-profile-komunitas",
    name: "Company Profile (Komunitas)",
    category: "Website Company Profile",
    description: "Website company profile untuk komunitas.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 19,
    slug: "company-profile-event",
    name: "Company Profile (Event Organizer)",
    category: "Website Company Profile",
    description: "Website company profile untuk event organizer.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 20,
    slug: "company-profile-fnb",
    name: "Company Profile (Food & Beverage)",
    category: "Website Company Profile",
    description: "Website company profile untuk industri makanan dan minuman.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
  {
    id: 21,
    slug: "company-profile-kecantikan",
    name: "Company Profile (Kecantikan)",
    category: "Website Company Profile",
    description: "Website company profile untuk industri kecantikan.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Lock browser mode, analisis butir soal, support ribuan user serentak.",
    price: "Rp. 6.000.000",
  },
];

const blue = "#2563EB";
const whiteGold = "#EBAD25";

// --- COMPONENT: PROBLEM SECTION ---

const ProblemSection = () => {
  const problems = [
    { icon: <Ghost className="w-8 h-8 text-red-500" />, title: "Programmer Ngilang", desc: "Proyek belum selesai, tiba-tiba developer susah dihubungi (Ghosting)." },
    { icon: <AlertTriangle className="w-8 h-8 text-orange-500" />, title: "Hasil 'Asal Jadi'", desc: "Tampilan berantakan, banyak bug, dan tidak sesuai dengan brand image Anda." },
    { icon: <TrendingDown className="w-8 h-8 text-yellow-500" />, title: "Website Mati Suri", desc: "Website ada, tapi tidak menghasilkan traffic apalagi penjualan." },
    { icon: <ZapOff className="w-8 h-8 text-gray-500" />, title: "Teknologi Jadul", desc: "Lambat, sulit di-update, dan tidak SEO-friendly. Ketinggalan zaman." },
  ];

  // 1. State dan Refs untuk menangani limit drag
  const [width, setWidth] = useState(0);
  const sliderContainer = useRef<HTMLDivElement>(null);

  // 2. Hitung lebar area yang bisa di-drag saat komponen dimuat
  useEffect(() => {
    if (sliderContainer.current) {
      // Total lebar konten dikurangi lebar layar yang terlihat
      setWidth(sliderContainer.current.scrollWidth - sliderContainer.current.offsetWidth);
    }
    
    // Opsional: Tambahkan event listener untuk resize window agar kalkulasi tetap akurat
    const handleResize = () => {
         if (sliderContainer.current) {
            setWidth(sliderContainer.current.scrollWidth - sliderContainer.current.offsetWidth);
         }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Lelah dengan Janji Manis Programmer <br className="hidden md:block" /> yang Akhirnya Menghilang?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">Kami paham rasa frustasi Anda. Di solocoding.id, kami bekerja dengan transparansi dan profesionalisme tinggi.</p>
          {/* Petunjuk visual kecil untuk user desktop */}
          <p className="text-sm text-gray-400 mt-4 md:hidden">
            (Geser ke samping untuk melihat →)
          </p>
        </div>

        {/* --- AREA SLIDER MULAI --- */}
        
        {/* 3. Container Pembungkus: Menyembunyikan overflow dan memberikan kursor 'grab' */}
        <div 
            ref={sliderContainer} 
            className="cursor-grab active:cursor-grabbing"
        >
          {/* 4. Track Slider: Area yang bisa di-drag (motion.div) */}
          <motion.div 
            drag="x"
            // Batas drag: kanan mentok di 0, kiri mentok sejauh negatif width yg dihitung
            dragConstraints={{ right: 0, left: -width }}
            // Efek elastis saat ditarik melebihi batas
            dragElastic={0.1} 
            // Flex agar berjejer horizontal, gap antar kartu, dan padding di awal/akhir agar tidak mepet layar
            className="flex gap-6 md:gap-8 px-4 md:px-0 pb-8" 
          >
            {problems.map((p, i) => (
              // 5. Kartu Individual
              <motion.div 
                key={i} 
                // PENTING: Berikan minimum width agar kartu tidak tergencet
                className="min-w-[300px] md:min-w-[380px] p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all relative group"
              >
                 {/* Efek hover sedikit naik (opsional, kadang agak aneh di mobile saat di-drag) */}
                 <motion.div whileHover={{ y: -5 }} transition={{duration: 0.2}}>
                    <div className="mb-6 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-white transition-colors border border-slate-100">
                        {p.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-slate-800">{p.title}</h4>
                    <p className="text-gray-600 text-base leading-relaxed">{p.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* --- AREA SLIDER SELESAI --- */}
        
      </div>
    </section>
  );
};


// --- COMPONENT: GROWTH FEATURES ---
const GrowthFeatures = () => {
  const features = [
    { icon: <BarChart3 />, title: "Data-Driven", benefit: "Google Analytics & Meta Pixel terpasang untuk tracking konversi iklan." },
    { icon: <MessageSquare />, title: "Otomasi Notifikasi", benefit: "Integrasi WhatsApp & Email API (Kirim invoice & update otomatis)." },
    { icon: <CreditCard />, title: "Payment Gateway", benefit: "Terima pembayaran otomatis via QRIS, Transfer Bank, & E-Wallet." },
    { icon: <Search />, title: "SEO Friendly", benefit: "Struktur coding yang disukai Google agar bisnis Anda mudah ditemukan." },
    { icon: <Server />, title: "Scalable Infrastructure", benefit: "Server yang siap menampung lonjakan traffic saat Anda promo besar." },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Website yang Bekerja <br /> Untuk Anda, <span style={{ color: whiteGold }}>Bukan Sebaliknya.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Jangan biarkan website Anda hanya jadi &quot;brosur digital&quot; yang berdebu. Kami menyuntikkan marketing tools di setiap baris kodenya.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 gap-4">
            {features.map((f, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">{f.icon}</div>
                <div>
                  <h4 className="font-bold text-lg">{f.title}</h4>
                  <p className="text-gray-400 text-sm">{f.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: CATALOG SECTION (MODIFIED FROM YOUR CODE) ---
const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState("E-Commerce");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="py-24 bg-white" id="catalog">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Solusi <span style={{ color: blue }}>Siap Pakai</span></h2>
          <p className="text-gray-600 text-lg">Pilih template terbaik untuk percepatan bisnis retail Anda.</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold border transition-all ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_PROJECTS.filter(p => p.category === activeCategory).map(project => (
            <motion.div layout key={project.id} className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold"
                  >
                    Detail Template
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2">{project.name}</h4>
                <div className="flex justify-between items-end">
                    <p className="text-blue-600 font-extrabold text-xl">{project.price}</p>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold uppercase">{project.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal (Logic as you provided) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl max-w-2xl w-full p-8 relative">
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4"><X /></button>
              <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <p className="font-bold text-blue-800 mb-2">Fitur Unggulan:</p>
                <p className="text-sm text-blue-700">{selectedProject.details}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-slate-900">{selectedProject.price}</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Pesan Sekarang</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- MAIN LANDING PAGE COMPONENT ---
const SolocodingLandingPage = () => {
  return (
    <div className="font-sans antialiased text-slate-900">
      {/* Hero Section (Keep your previous Hero component here) */}
      
      <ProblemSection />
      
      <CatalogSection /> {/* Ini adalah katalog template kamu */}
      
      <GrowthFeatures />
    
    </div>
  );
};

export default SolocodingLandingPage;