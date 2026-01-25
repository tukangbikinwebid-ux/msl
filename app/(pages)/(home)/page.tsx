"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  X,
  FileText,
  Ghost,
  AlertTriangle,
  TrendingDown,
  ZapOff,
  Zap,
  Settings,
  Code2,
  BarChart3,
  MessageSquare,
  CreditCard,
  Search,
  Server,
  Check,
  Globe,
  Shield,
  Info,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import en from "@/translations/home/en";
import id from "@/translations/home/id";
import ms from "@/translations/home/ms";
import zh from "@/translations/home/zh";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useGetProductMerkListQuery,
  useGetProductMerkBySlugQuery,
} from "@/services/products-merk.service";
import type { ProductMerk } from "@/types/master/product-merk";

import { useGetProductListQuery } from "@/services/product.service";
import type { Product } from "@/types/admin/product";
import DotdLoader from "@/components/loader/3dot";
import { fredoka, sniglet } from "@/lib/fonts";
import ImageCarousel from "@/components/main/home-page/caraousel-hero";
import Swal from "sweetalert2";
import { motion, Variants, AnimatePresence, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility untuk menggabungkan class tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========== COMPONENT: HeroSection (Slider 16:9) ==========
interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection: React.FC = () => {
  const t = useTranslation({ en, id, ms, zh });
  const blue = "#2563EB";
  const whiteGold = "#EBAD25";
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: HeroSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920",
      title: t["hero-title-1"],
      subtitle: t["hero-subtitle"],
      ctaText: t["hero-cta"],
      ctaLink: "#apply",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920",
      title: t["hero-title-2"],
      subtitle: t["hero-subtitle"],
      ctaText: t["hero-cta"],
      ctaLink: "#apply",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920",
      title: t["hero-title-3"],
      subtitle: t["hero-subtitle"],
      ctaText: t["hero-cta"],
      ctaLink: "#apply",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full overflow-hidden" id="hero">
      <div className="relative aspect-video w-full">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="max-w-2xl"
                      >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                          {slide.subtitle}
                        </p>
                        <a
                          href={slide.ctaLink}
                          className="inline-block px-8 py-4 font-bold text-white rounded-xl transition duration-300 hover:scale-105 shadow-lg"
                          style={{ backgroundColor: blue }}
                        >
                          {slide.ctaText}
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <ArrowRight className="w-6 h-6 text-white rotate-180" />
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
};

// ========== COMPONENT: ProblemSection ==========
interface ProjectItem {
  id: number; slug: string; name: string; category: string;
  description: string; status: boolean; imageUrl: string; details: string; price: string;
}

const LOAN_PROGRAMS = [
  { id: 1, name: "Pinjaman Personal", description: "Pinjaman untuk kebutuhan pribadi dengan proses cepat dan mudah", minAmount: 1000000, maxAmount: 50000000, interestRate: 1.5, imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500" },
  { id: 2, name: "Pinjaman Usaha", description: "Pinjaman untuk mengembangkan bisnis Anda dengan bunga kompetitif", minAmount: 5000000, maxAmount: 500000000, interestRate: 1.2, imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500" },
  { id: 3, name: "Pinjaman KPR", description: "Pinjaman untuk membeli rumah impian Anda dengan cicilan ringan", minAmount: 50000000, maxAmount: 2000000000, interestRate: 0.8, imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500" },
  { id: 4, name: "Pinjaman KKB", description: "Pinjaman untuk membeli kendaraan dengan proses mudah dan cepat", minAmount: 10000000, maxAmount: 500000000, interestRate: 1.0, imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=500" },
  { id: 5, name: "Pinjaman Pendidikan", description: "Pinjaman untuk biaya pendidikan dengan bunga rendah", minAmount: 2000000, maxAmount: 100000000, interestRate: 0.9, imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500" },
  { id: 6, name: "Pinjaman Kesehatan", description: "Pinjaman untuk kebutuhan kesehatan dan medis", minAmount: 1000000, maxAmount: 50000000, interestRate: 1.3, imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=500" },
];

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

const ProblemSection = () => {
  const t = useTranslation({ en, id, ms, zh });
  const problems = [
    { icon: <Ghost className="w-8 h-8 text-red-500" />, title: "Pemberi Pinjaman Menghilang", desc: "Proses pinjaman terhenti, pemberi pinjaman tiba-tiba tidak bisa dihubungi setelah janji manis." },
    { icon: <AlertTriangle className="w-8 h-8 text-orange-500" />, title: "Bunga Tinggi Tersembunyi", desc: "Bunga yang dijanjikan rendah, ternyata ada biaya tersembunyi yang membuat total pembayaran membengkak." },
    { icon: <TrendingDown className="w-8 h-8 text-yellow-500" />, title: "Proses Lambat & Ribet", desc: "Dokumen banyak, proses berbelit-belit, dan waktu persetujuan yang tidak jelas." },
    { icon: <ZapOff className="w-8 h-8 text-gray-500" />, title: "Tidak Transparan", desc: "Informasi tidak jelas, syarat berubah-ubah, dan komunikasi yang tidak responsif." },
  ];

  const [width, setWidth] = useState(0);
  const sliderContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderContainer.current) {
      setWidth(sliderContainer.current.scrollWidth - sliderContainer.current.offsetWidth);
    }
    
    const handleResize = () => {
         if (sliderContainer.current) {
            setWidth(sliderContainer.current.scrollWidth - sliderContainer.current.offsetWidth);
         }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  return (
    <section className="py-20 bg-slate-50 overflow-hidden" id="problem">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {t["problem-title"]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic">{t["problem-subtitle"]}</p>
          <p className="text-sm text-gray-400 mt-4 md:hidden">
            (Geser ke samping untuk melihat →)
          </p>
        </div>

        <div 
            ref={sliderContainer} 
            className="cursor-grab active:cursor-grabbing"
        >
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1} 
            className="flex gap-6 md:gap-8 px-4 md:px-0 pb-8" 
          >
            {problems.map((p, i) => (
              <motion.div 
                key={i} 
                className="min-w-[300px] md:min-w-[380px] p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all relative group"
              >
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
        
      </div>
    </section>
  );
};

// ========== COMPONENT: GrowthFeatures (Why Choose Us) ==========
const GrowthFeatures = () => {
  const t = useTranslation({ en, id, ms, zh });
  const features = [
    { icon: <CheckCircle />, title: "Proses Cepat & Mudah", benefit: "Dokumen minimal, proses online, persetujuan dalam 24 jam." },
    { icon: <Shield />, title: "Aman & Terpercaya", benefit: "Berlisensi resmi, data terenkripsi, dan transparan tanpa biaya tersembunyi." },
    { icon: <CreditCard />, title: "Bunga Kompetitif", benefit: "Bunga rendah mulai dari 0.8% per bulan dengan sistem yang fair." },
    { icon: <MessageSquare />, title: "Layanan 24/7", benefit: "Customer service siap membantu kapan saja melalui WhatsApp, Email, dan Telepon." },
    { icon: <BarChart3 />, title: "Fleksibel & Transparan", benefit: "Tenor fleksibel, tidak ada denda pelunasan lebih cepat, dan informasi jelas." },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden" id="why-us">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              {t["why-title-1"]} <br /> <span style={{ color: whiteGold }}>{t["why-title-2"]}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {t["why-subtitle"]}
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

// ========== COMPONENT: CatalogSection (Loan Programs) ==========
const CatalogSection = () => {
  const t = useTranslation({ en, id, ms, zh });
  const [selectedProgram, setSelectedProgram] = useState<typeof LOAN_PROGRAMS[0] | null>(null);

  return (
    <section className="py-24 bg-white" id="catalog">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {t["catalog-title"]} <span style={{ color: blue }}>{t["catalog-subtitle"]}</span>
          </h2>
          <p className="text-gray-600 text-lg">{t["catalog-desc"]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOAN_PROGRAMS.map((program) => (
            <motion.div 
              key={program.id} 
              layout
              className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img 
                  src={program.imageUrl} 
                  alt={program.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setSelectedProgram(program)}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold"
                  >
                    Detail Program
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2">{program.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bunga:</span>
                    <span className="font-bold text-blue-600">{program.interestRate}% / bulan</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Limit:</span>
                    <span className="font-bold">Rp {program.minAmount.toLocaleString("id-ID")} - Rp {program.maxAmount.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.9 }} 
              className="bg-white rounded-2xl max-w-2xl w-full p-8 relative"
            >
              <button onClick={() => setSelectedProgram(null)} className="absolute top-4 right-4"><X /></button>
              <h2 className="text-2xl font-bold mb-4">{selectedProgram.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProgram.description}</p>
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <p className="font-bold text-blue-800 mb-2">Detail Program:</p>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>Bunga: {selectedProgram.interestRate}% per bulan</p>
                  <p>Limit Pinjaman: Rp {selectedProgram.minAmount.toLocaleString("id-ID")} - Rp {selectedProgram.maxAmount.toLocaleString("id-ID")}</p>
                  <p>Tenor: 6, 9, 12, 18, atau 24 bulan</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-slate-900">Mulai dari {selectedProgram.interestRate}% / bulan</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Ajukan Sekarang</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ========== COMPONENT: PricingSection (Loan Simulation) ==========
const PricingSection = () => {
  const t = useTranslation({ en, id, ms, zh });
  const colors = {
    gold: "#EBAD25",
    blue: "#2563EB",
  };

  const [loanAmount, setLoanAmount] = useState(10000000);
  const [selectedTenor, setSelectedTenor] = useState(12);
  const interestRate = 1.2; // 1.2% per bulan

  const tenors = [6, 9, 12, 18, 24];

  // Modal registration state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: "",
    name: "",
    password: "",
  });

  const calculateMonthlyPayment = (amount: number, tenor: number, rate: number) => {
    const monthlyRate = rate / 100;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenor)) / (Math.pow(1 + monthlyRate, tenor) - 1);
    return Math.round(monthlyPayment);
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, selectedTenor, interestRate);
  const totalPayment = monthlyPayment * selectedTenor;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      Swal.fire({
        icon: "success",
        title: t["register-success"],
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "https://mysolutionlending.com/";
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t["register-error"],
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 px-4 md:px-8" id="simulation">
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#2563EB 0.5px, transparent 0.5px), radial-gradient(#2563EB 0.5px, #ffffff 0.5px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-2 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold tracking-wider"
            style={{ color: colors.blue }}
          >
            SIMULASI PINJAMAN
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            {t["simulation-title"]}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {t["simulation-subtitle"]}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-xl p-8">
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Jumlah Pinjaman
              </label>
              <input
                type="range"
                min="1000000"
                max="100000000"
                step="1000000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">Rp 1.000.000</span>
                <span className="text-sm text-gray-500">Rp 100.000.000</span>
              </div>
              <div className="text-center mt-4">
                <span className="text-3xl font-extrabold text-blue-600">
                  Rp {loanAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Tenor Pinjaman
              </label>
              <div className="grid grid-cols-5 gap-4">
                {tenors.map((tenor) => (
                  <button
                    key={tenor}
                    onClick={() => setSelectedTenor(tenor)}
                    className={`py-4 px-4 rounded-xl font-bold transition-all ${
                      selectedTenor === tenor
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tenor} Bulan
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Cicilan Bulanan</p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    Rp {monthlyPayment.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Pembayaran</p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    Rp {totalPayment.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Bunga</p>
                  <p className="text-2xl font-extrabold text-blue-600">
                    {interestRate}% / bulan
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg active:scale-95"
              style={{ backgroundColor: colors.blue }}
            >
              {t["cta-button-1"]}
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {t["register-modal-title"]}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {t["register-modal-subtitle"]}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t["register-whatsapp-label"]}
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder={t["register-whatsapp-placeholder"]}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t["register-name-label"]}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t["register-name-placeholder"]}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t["register-password-label"]}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t["register-password-placeholder"]}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <DialogFooter className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                {t["register-cancel"]}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: colors.blue }}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <DotdLoader />
                    {t["register-button"]}...
                  </span>
                ) : (
                  t["register-button"]
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

// ========== COMPONENT: TestimonialsSection ==========
interface StatItem {
  id: number;
  endValue: number;
  label: string;
  suffix: string;
}

interface TestimonialItem {
  id: number;
  name: string;
  excerpt: string;
  siteUrl: string;
  avatarUrl: string;
}

const STATS: StatItem[] = [
  { id: 1, endValue: 50000, label: "Pinjaman Telah Dicairkan", suffix: "+" },
  { id: 2, endValue: 98, label: "Tingkat Kepuasan Pelanggan", suffix: "%" },
  { id: 3, endValue: 24, label: "Jam Persetujuan Cepat", suffix: " Jam" },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Budi Santoso",
    excerpt:
      "Proses pinjaman sangat cepat, hanya 1 hari sudah cair. Bunga juga kompetitif dan tidak ada biaya tersembunyi. Sangat puas!",
    siteUrl: "#",
    avatarUrl: "/avatars/budi.jpg",
  },
  {
    id: 2,
    name: "Sari Indrawati",
    excerpt:
      "Customer service sangat responsif, membantu dari awal sampai akhir. Pinjaman untuk modal usaha saya sudah cair dan bisnis berkembang.",
    siteUrl: "#",
    avatarUrl: "/avatars/sari.jpg",
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    excerpt:
      "Dokumen minimal, proses online semua. Tidak perlu keluar rumah, pinjaman sudah cair. My Solution Lending memang solusi terbaik!",
    siteUrl: "#",
    avatarUrl: "/avatars/ahmad.jpg",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    excerpt:
      "Bunga rendah dan transparan. Tidak ada biaya tersembunyi seperti tempat lain. Cicilan juga fleksibel sesuai kemampuan.",
    siteUrl: "#",
    avatarUrl: "/avatars/dewi.jpg",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    excerpt:
      "Pinjaman untuk KPR rumah impian saya. Proses mudah, persetujuan cepat, dan cicilan ringan. Terima kasih My Solution Lending!",
    siteUrl: "#",
    avatarUrl: "/avatars/rudi.jpg",
  },
  {
    id: 6,
    name: "Maya Sari",
    excerpt:
      "Layanan 24/7 sangat membantu. Kapan saja ada pertanyaan langsung dijawab. Pinjaman untuk pendidikan anak sudah cair.",
    siteUrl: "#",
    avatarUrl: "/avatars/maya.jpg",
  },
];

const testimonialsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const testimonialsItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface CounterProps {
  endValue: number;
  label: string;
  suffix: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  endValue,
  label,
  suffix,
  duration = 2.5,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const formattedCount = useTransform(count, (latest) => {
    if (endValue >= 1000) {
      const kValue = Math.floor(latest / 100) / 10;
      return kValue.toLocaleString() + "K";
    } else {
      return Math.round(latest).toLocaleString();
    }
  });

  useEffect(() => {
    if (isInView) {
      animate(count, endValue, { duration: duration, ease: "easeOut" });
    }
  }, [isInView, endValue, duration, count]);

  return (
    <div ref={nodeRef} className="text-center">
      <div className="font-extrabold text-4xl sm:text-5xl text-[#2563EB]">
        <motion.span>{formattedCount}</motion.span>
        {suffix}
      </div>
      <p className="text-lg font-medium text-gray-600 mt-2">{label}</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const t = useTranslation({ en, id, ms, zh });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const GAP_SIZE = 32;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  useEffect(() => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.children[0] as HTMLElement;
      
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const itemTotalWidth = cardWidth + GAP_SIZE;
        const offset = currentPage * itemsPerPage * itemTotalWidth;

        animate(
          carouselRef.current,
          { x: -offset },
          { duration: 0.5, type: "spring", damping: 25, stiffness: 120 }
        );
      }
    }
  }, [currentPage, itemsPerPage]);

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <motion.section
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={testimonialsContainerVariants}
      id="testimonial"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={testimonialsItemVariants} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2 border px-4 py-1 rounded-full">
            Testimonial
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {t["testimonial-title"]}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            {t["testimonial-subtitle"]}
          </p>
        </motion.div>

        <div className="overflow-hidden relative py-4">
          <motion.div
            ref={carouselRef}
            className="flex"
            style={{ gap: `${GAP_SIZE}px` }}
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col flex-shrink-0"
                style={{
                  width: `calc((100% - ${(itemsPerPage - 1) * GAP_SIZE}px) / ${itemsPerPage})`,
                }}
                variants={testimonialsItemVariants}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-[#2563EB]"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                      (e.currentTarget.src = `https://ui-avatars.com/api/?name=${t.name
                        .split(" ")
                        .join("+")}&background=2563EB&color=fff`)
                    }
                  />
                  <h3 className="font-bold text-gray-900 text-lg">{t.name}</h3>
                </div>

                <blockquote className="text-gray-700 italic flex-grow">
                  {`"${t.excerpt}"`}
                </blockquote>

                <a
                  href={t.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] mt-4 truncate"
                >
                  {t.siteUrl}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center my-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === currentPage
                  ? "bg-[#2563EB] w-8 h-2.5"
                  : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ========== COMPONENT: SoloCodingCta ==========
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.6, type: "spring", stiffness: 100 },
  },
};

const SoloCodingCta: React.FC = () => {
  const router = useRouter();
  const t = useTranslation({ en, id, ms, zh });
  const GOLD = "#EBAD25";
  const BLUE = "#2563EB";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.section
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={titleVariants}
      id="cta"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}30, #FFFFFF)`,
        }}
      ></div>

      <div
        className="absolute top-10 left-1/4 w-20 h-20 rounded-full opacity-60 animate-pulse shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${GOLD}, ${GOLD}80)`,
        }}
      ></div>

      <div
        className="absolute bottom-10 right-1/4 w-16 h-16 rounded-full opacity-70 animate-pulse delay-[1000ms] shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}, ${BLUE}80)`,
        }}
      ></div>

      <div
        className="absolute top-1/2 right-10 w-12 h-12 rounded-full opacity-50 animate-pulse delay-[500ms] shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}, ${GOLD})`,
        }}
      ></div>

      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className={`max-w-4xl mx-auto ${fredoka.className}`}>
          <motion.h2
            className="text-3xl lg:text-5xl font-extrabold mb-6 text-gray-900"
            variants={titleVariants}
          >
            {t["cta-title-1"]}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${BLUE}, #1E40AF)`,
              }}
            >
              {t["cta-title-2"]}
            </span>{" "}
            {t["cta-title-3"]}
          </motion.h2>

          <motion.p
            className="text-xl mb-10 max-w-3xl mx-auto text-gray-700"
            variants={subtitleVariants}
          >
            {t["cta-subtitle"]}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={ctaVariants}
          >
            <button
              onClick={() => scrollToSection("simulation")}
              className="text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #D97706)`,
              }}
            >
              <Zap className="w-5 h-5" />
              {t["cta-button-1"]}
            </button>

            <button
              onClick={() => scrollToSection("catalog")}
              className="border-2 flex items-center font-bold px-8 py-4 rounded-xl text-lg bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                borderColor: BLUE,
                color: BLUE,
              }}
            >
              <Info className="w-5 h-5 mr-2" />
              {t["cta-button-2"]}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// ========== MAIN PAGE COMPONENT ==========
export default function HomePage() {
  const router = useRouter();
  const t = useTranslation({ en, id, ms, zh });

  // ========== Local UI states ==========
  const [page, setPage] = useState<number>(1);
  const paginate = 8;

  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // ========== Fetch list of categories with pagination ==========
  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
  } = useGetProductMerkListQuery({ page, paginate });

  // mapping hasil ke variabel categories (TETAP)
  const categories: ProductMerk[] = useMemo(
    () => listData?.data ?? [],
    [listData]
  );

  const lastPage = listData?.last_page ?? 1;
  const currentPage = listData?.current_page ?? 1;
  const total = listData?.total ?? 0;

  // ========== Fetch detail by slug when modal open ==========
  const { data: detailData, isLoading: isDetailLoading } =
    useGetProductMerkBySlugQuery(selectedSlug ?? "", {
      skip: !selectedSlug,
    });

  const handleOpenDetail = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setOpenDetail(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setOpenDetail(false);
    setTimeout(() => setSelectedSlug(null), 150);
  }, []);

  // ====== Static content (tidak diubah) ======
  const features = [
    {
      icon: "/images/advantage/advantage-1.png",
      title: "Proses Cepat",
      description: "Persetujuan dalam 24 jam dengan dokumen minimal",
    },
    {
      icon: "/images/advantage/advantage-2.png",
      title: "Bunga Kompetitif",
      description: "Bunga rendah mulai dari 0.8% per bulan",
    },
    {
      icon: "/images/advantage/advantage-3.png",
      title: "Aman & Terpercaya",
      description: "Berlisensi resmi dan data terenkripsi",
    },
    {
      icon: "/images/advantage/advantage-4.png",
      title: "Layanan 24/7",
      description: "Customer service siap membantu kapan saja",
    },
  ];

  // ====== Helper UI ======
  const gradientByIndex = (i: number) => {
    const list = [
      "from-emerald-500 to-teal-500",
      "from-lime-500 to-green-500",
      "from-pink-500 to-rose-500",
      "from-cyan-500 to-blue-500",
      "from-violet-500 to-purple-500",
      "from-amber-500 to-orange-500",
      "from-sky-500 to-indigo-500",
      "from-fuchsia-500 to-pink-500",
    ];
    return list[i % list.length];
  };

  const safeCategoryImg = (img: ProductMerk["image"]) =>
    typeof img === "string" && img.length > 0 ? img : "/kategori.webp";

  const formatIDR = (value: number | string) => {
    const num = typeof value === "string" ? Number(value) : value ?? 0;
    if (!Number.isFinite(num)) return "Rp 0";
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  const safeProductImg = (img: Product["image"]) =>
    typeof img === "string" && img.length > 0 ? img : "/produk-1.webp";

  const makeBadge = (p: Product) =>
    p.terlaris ? "Best Seller" : p.terbaru ? "New" : "Produk";

  const toInt = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // ====== Produk (maks 3) ======
  const {
    data: productList,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductListQuery({ page: 1, paginate: 3 });

  const topProducts: Product[] = useMemo(
    () => productList?.data ?? [],
    [productList]
  );

  // ====== Tambah ke Keranjang (localStorage: "cart-storage") ======
  const CART_KEY = "cart-storage";
  type CartStorage = {
    state: {
      isOpen: boolean;
      cartItems: Array<Product & { quantity: number }>;
    };
    version: number;
  };

  const addToCart = (product: Product, qty: number = 1) => {
    if (typeof window === "undefined") return;

    let cartData: CartStorage = {
      state: { isOpen: false, cartItems: [] },
      version: 0,
    };

    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        cartData = JSON.parse(raw) as CartStorage;
        // fallback ringan jika struktur lama/berbeda
        if (!cartData?.state || !Array.isArray(cartData.state.cartItems)) {
          cartData = { state: { isOpen: false, cartItems: [] }, version: 0 };
        }
      }
    } catch {
      cartData = { state: { isOpen: false, cartItems: [] }, version: 0 };
    }

    const idx = cartData.state.cartItems.findIndex((i) => i.id === product.id);

    if (idx >= 0) {
      // tambah kuantitas pada item yang sudah ada
      cartData.state.cartItems[idx].quantity += qty;
    } else {
      // push full product data + quantity (menyamai contoh struktur)
      cartData.state.cartItems.push({
        ...product,
        quantity: qty,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartData));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // Show SweetAlert at top-right corner with colorful effect
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Produk berhasil ditambahkan ke keranjang",
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "white",
      color: "#333",
      iconColor: "#ff5722",
      customClass: {
        popup: "toast-popup",
      },
      willOpen: (toast) => {
        toast.style.background =
          "linear-gradient(45deg, #ff6ec7, #f7bb97, #f7b7d7, #ff9a8b, #ff8cdd)";
      },
    });
  };

  const data1 = {
    personImageUrl:
      "https://8nc5ppykod.ufs.sh/f/H265ZJJzf6brvez3grUCM8kgym3AN9S2oHUnjfpulaB7hxYP",
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemSection />
      <CatalogSection />
      <GrowthFeatures />
      <PricingSection/>
      <TestimonialsSection />
      <SoloCodingCta />
    </div>
  );
}
