"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Grid3X3,
  List,
  ShoppingCart,
  Eye,
  CheckCircle,
  X,
  FileText,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image dari Next.js

// --- TIPE DATA ---
interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  status: boolean;
  details: string;
  priceStr: string;
  priceVal: number;
}

// --- DUMMY DATA ---
const DUMMY_PROJECTS: ProjectItem[] = [
  // E-COMMERCE
  {
    id: 1,
    slug: "ecom-beauty",
    name: "Template 1 - Kecantikan (Beauty Store)",
    category: "E-Commerce",
    description: "Desain elegan dan bersih, fokus pada visual produk skincare/kosmetik.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Filter jenis kulit, integrasi review video, bundle product system. Cocok untuk brand lokal.",
    priceStr: "Rp. 3.500.000",
    priceVal: 3500000,
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
    priceStr: "Rp. 3.200.000",
    priceVal: 3200000,
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
    priceStr: "Rp. 3.800.000",
    priceVal: 3800000,
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
    priceStr: "Rp. 8.500.000",
    priceVal: 8500000,
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
    priceStr: "Rp. 7.500.000",
    priceVal: 7500000,
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
    priceStr: "Rp. 12.000.000",
    priceVal: 12000000,
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
    priceStr: "Rp. 15.000.000",
    priceVal: 15000000,
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
    priceStr: "Rp. 2.500.000",
    priceVal: 2500000,
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
    priceStr: "Rp. 2.800.000",
    priceVal: 2800000,
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
    priceStr: "Rp. 5.000.000",
    priceVal: 5000000,
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
    priceStr: "Rp. 4.500.000",
    priceVal: 4500000,
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
    priceStr: "Rp. 25.000.000",
    priceVal: 25000000,
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
    priceStr: "Rp. 10.000.000",
    priceVal: 10000000,
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
    priceStr: "Rp. 3.000.000",
    priceVal: 3000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
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
    priceStr: "Rp. 6.000.000",
    priceVal: 6000000,
  },
];

const CATEGORIES = ["All", "E-Commerce", "Marketplace", "Koperasi", "Top-up Store", "Web Aplikasi"];

type ViewMode = "grid" | "list";
type SortMode = "default" | "price-low" | "price-high";

export default function ProductsPage() {
  const router = useRouter();

  // --- STATE (SEMUA STATE DI TOP LEVEL) ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State (Dipindah ke sini)
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // --- WARNA TEMA (BIRU) ---
  const primaryBlue = "#2563EB"; 

  // --- FILTER & SORT LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = DUMMY_PROJECTS;

    // 1. Filter Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filter Search
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // 3. Sorting
    if (sortMode === "price-low") {
      result = [...result].sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortMode === "price-high") {
      result = [...result].sort((a, b) => b.priceVal - a.priceVal);
    }

    return result;
  }, [searchTerm, selectedCategory, sortMode]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // useEffect untuk Reset Page (DI SINI, bukan di dalam render)
  // Ketika filter/search berubah, reset halaman ke 1
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm, sortMode]);

  // --- HANDLERS ---
  const handleOpenDetail = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleCheckout = (slug: string) => {
    // Arahkan ke halaman checkout dengan query param slug
    router.push(`/checkout?product=${slug}`);
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-4 bg-white overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Katalog <span style={{ color: primaryBlue }}>Website Bisnis</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Temukan template source code website E-commerce, Marketplace, hingga Sistem Informasi yang siap pakai untuk bisnis Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FILTER SECTION ================= */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Cari template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              
              {/* Category Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all w-full"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="w-full sm:w-auto">
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all w-full"
                >
                  <option value="default">Relevansi</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT LIST ================= */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          
          <div className="mb-6 text-sm text-gray-500">
            Menampilkan <span className="font-bold text-gray-800">{filteredProducts.length}</span> template website
          </div>

          <AnimatePresence mode="popLayout">
            {viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {paginatedProducts.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={project.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image Area - FIXED: Pakai Next Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay Hover */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleOpenDetail(project)}
                          className="p-3 bg-white text-slate-900 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                          title="Lihat Detail"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleCheckout(project.slug)}
                          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                          title="Pilih Template"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-700 shadow-sm z-10">
                        {project.category}
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">
                        {project.description}
                      </p>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="font-extrabold text-lg" style={{ color: primaryBlue }}>
                          {project.priceStr}
                        </span>
                        <button
                          onClick={() => handleOpenDetail(project)}
                          className="text-xs font-semibold text-gray-500 hover:text-blue-600 underline"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="space-y-4">
                {paginatedProducts.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={project.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                  >
                    <div className="w-full md:w-64 h-48 md:h-auto relative bg-gray-100 flex-shrink-0">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded z-10">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col md:flex-row flex-grow justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{project.name}</h3>
                        <p className="text-slate-600 mb-3">{project.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {project.details}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-3 min-w-[150px]">
                        <span className="text-2xl font-extrabold" style={{ color: primaryBlue }}>
                          {project.priceStr}
                        </span>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button 
                            onClick={() => handleOpenDetail(project)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
                          >
                            Detail
                          </button>
                          <button 
                            onClick={() => handleCheckout(project.slug)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                          >
                            Pilih Template
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex gap-1" aria-label="Pagination">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 font-semibold disabled:opacity-50"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-2 rounded-lg border font-semibold ${
                          page === i + 1
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 font-semibold disabled:opacity-50"
                    >
                      &gt;
                    </button>
                  </nav>
                </div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 mt-8">
              <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci atau filter kategori Anda.</p>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                className="mt-4 text-blue-600 hover:underline font-medium"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= MODAL DETAIL ================= */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden"
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white text-gray-600 transition shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 bg-gray-100 relative min-h-[300px]">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Right Side: Info */}
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <div className="mb-auto">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-3">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                    {selectedProject.name}
                  </h2>
                  
                  <div className="space-y-4 text-slate-600">
                    <div>
                      <h4 className="flex items-center font-bold text-slate-800 mb-1">
                        <FileText className="w-4 h-4 mr-2 text-blue-500" /> Deskripsi
                      </h4>
                      <p className="text-sm leading-relaxed">{selectedProject.description}</p>
                    </div>
                    <div>
                      <h4 className="flex items-center font-bold text-slate-800 mb-1">
                         <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Fitur Unggulan
                      </h4>
                      <p className="text-sm leading-relaxed">{selectedProject.details}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Harga Lisensi Source Code</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-3xl font-extrabold" style={{ color: primaryBlue }}>
                      {selectedProject.priceStr}
                    </span>
                    <button
                      onClick={() => handleCheckout(selectedProject.slug)}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      Pilih Template <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}