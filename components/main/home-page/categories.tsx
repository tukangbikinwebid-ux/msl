import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Tambah AnimatePresence
import { X, FileText, CheckCircle } from "lucide-react";

// --- TIPE DATA ---
interface ProjectItem {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  status: boolean;
  imageUrl: string;
  details: string;
  price: string;
}

// --- DATA KATEGORI ---
const CATEGORIES = [
  "Website Company Profile",
  "E-Commerce",
  "Marketplace",
  "Koperasi",
  "Top-up Store",
  "Web Aplikasi",
];

// --- DUMMY DATA SESUAI REQUEST ---
const DUMMY_PROJECTS: ProjectItem[] = [
  // 1. E-COMMERCE
  {
    id: 1,
    slug: "ecom-beauty",
    name: "Template 1 - Kecantikan (Beauty Store)",
    category: "E-Commerce",
    description: "Desain elegan dan bersih, fokus pada visual produk skincare/kosmetik.",
    status: true,
    imageUrl: "/sample-image.png",
    details: "Fitur: Filter jenis kulit, integrasi review video, bundle product system. Cocok untuk brand lokal.",
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

// --- KOMPONEN MODAL DETAIL (Tidak berubah banyak, hanya styling) ---
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;
  const blue = "#2563EB";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition shadow text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gray-100 h-56 w-full flex items-center justify-center overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {project.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            {project.name}
          </h2>

          <div className="mb-6 space-y-4">
            <div>
              <h3 className="text-md font-semibold text-gray-800 mb-1 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-500" /> Deskripsi:
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
            </div>
            <div>
               <h3 className="text-md font-semibold text-gray-800 mb-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Detail & Fitur:
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{project.details}</p>
            </div>
          </div>

            <div className="pt-4 border-t flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Mulai dari:</p>
              <div className="flex items-end gap-2">
              {project.price && (
                <span className="text-base text-gray-400 line-through font-semibold">
                {/* Contoh harga coret, misal diskon 20% */}
                {(() => {
                  // Ambil angka dari string harga (format: "Rp. 3.500.000")
                  const num = Number(
                  project.price.replace(/[^\d]/g, "")
                  );
                  if (!num) return null;
                  // Harga coret 20% lebih mahal
                  const crossed = num * 1.2;
                  // Format kembali ke "Rp. x.xxx.xxx"
                  return (
                  "Rp. " +
                  crossed
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  );
                })()}
                </span>
              )}
              <p className="text-2xl font-extrabold" style={{ color: blue }}>
                {project.price}
              </p>
              </div>
            </div>
            <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
              Order Sekarang
            </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const SoloCodingSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // STATE KATEGORI AKTIF (Default: E-Commerce)
  const [activeCategory, setActiveCategory] = useState("E-Commerce");

  const blue = "#2563EB";
  const transparentBlue = "#2563EB0F";

  // FILTER LOGIC
  const filteredProjects = DUMMY_PROJECTS.filter(
    (project) => project.category === activeCategory
  );

  const handleOpenDetail = (slug: string) => {
    const project = DUMMY_PROJECTS.find((p) => p.slug === slug);
    setSelectedProject(project || null);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section
        className="pt-16 pb-20 rounded-t-[40px] md:rounded-t-[80px]"
        style={{
          background: `linear-gradient(to bottom, ${transparentBlue} 5%, #FFFFFF 30%)`,
        }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-2 text-slate-900">
              Katalog Proyek <span style={{ color: blue }}>Siap Pakai</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              Pilih kategori bisnis Anda dan temukan solusi web yang tepat.
            </p>

            {/* NAVIGASI KATEGORI (FIXED) */}
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat, index) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(cat)} // Fungsi Ganti Kategori
                    className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all duration-300 transform ${
                      isActive
                        ? "bg-white border-transparent shadow-lg scale-105"
                        : "bg-white/50 border-gray-200 text-gray-600 hover:bg-white hover:border-gray-300"
                    }`}
                    style={isActive ? { color: blue } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* GRID KARTU (DENGAN FILTER & ANIMASI LAYOUT) */}
          <motion.div 
            layout // Framer motion prop agar transisi layout smooth saat filter berubah
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 transform border border-gray-100 bg-white">
                    {/* Gambar */}
                    <div className="h-56 w-full flex items-center justify-center overflow-hidden bg-gray-50">
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-300 mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tombol Aksi */}
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => handleOpenDetail(project.slug)}
                            className="flex items-center text-white bg-transparent border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-all text-sm"
                          >
                            <FileText className="w-4 h-4 mr-1" /> Lihat Detail
                          </button>
                          <button
                            // Tindakan dummy untuk Pilih Template (misalnya langsung ke form order)
                            className="flex items-center text-black bg-white px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
                            style={{ color: blue }}
                          >
                            Pilih Template
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Footer Card */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                            {project.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                        {project.name}
                      </h4>
                        <div className="flex items-end gap-2">
                        <span className="text-xs text-gray-400 line-through font-semibold">
                          {/* Harga coret 20% lebih mahal */}
                          {(() => {
                          const num = Number(project.price.replace(/[^\d]/g, ""));
                          if (!num) return null;
                          const crossed = num * 1.2;
                          return (
                            "Rp. " +
                            crossed
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          );
                          })()}
                        </span>
                        <p className="text-sm font-bold" style={{ color: blue }}>
                          {project.price}
                        </p>
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>Belum ada template untuk kategori ini.</p>
            </div>
          )}

          {/* Tombol Lihat Lebih Banyak */}
          <div className="text-center mt-16">
            <button className="px-8 py-3 font-bold rounded-full text-[#2563EB] border-2 border-[#2563EB] transition duration-300 hover:bg-[#2563EB] hover:text-white hover:shadow-lg">
              Download Katalog Lengkap (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Modal Detail */}
      <AnimatePresence>
        {isModalOpen && (
            <DetailModal
                isOpen={isModalOpen}
                onClose={handleCloseDetail}
                project={selectedProject}
            />
        )}
      </AnimatePresence>
    </>
  );
};

export default SoloCodingSection;