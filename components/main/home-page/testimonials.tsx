import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  animate,
  useMotionValue,
  useTransform,
  Variants,
} from "framer-motion";

// --- Tipe Data Dummy ---
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

// --- DATA DUMMY SOLO CODING ---
const STATS: StatItem[] = [
  { id: 1, endValue: 12000, label: "Web Project Telah Dipublish", suffix: "+" },
  { id: 2, endValue: 89, label: "Efisiensi Waktu Meningkat", suffix: "%" },
  { id: 3, endValue: 95, label: "Klien Merasa Puas", suffix: "%" },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Kevin Atmanda",
    excerpt:
      "Sejauh ini selama kurang lebih 3 tahun, penggunaannya memuaskan. Masalah selalu terselesaikan dengan cepat.",
    siteUrl: "https://atmanda.dev",
    avatarUrl: "/avatars/kevin.jpg",
  },
  {
    id: 2,
    name: "David Richards",
    excerpt:
      "Solo Coding memberikan layanan yang sangat baik, tidak hanya memberikan produk mereka saja, tapi juga konsultasi.",
    siteUrl: "https://richards.id",
    avatarUrl: "/avatars/david.jpg",
  },
  {
    id: 3,
    name: "Husein Izza",
    excerpt:
      "Web yang dibuat responsif, setiap kendala langsung dijawab dengan cepat. Proses migrasi juga sangat mulus!",
    siteUrl: "https://izzainc.com",
    avatarUrl: "/avatars/husein.jpg",
  },
  {
    id: 4,
    name: "Qori Iramana",
    excerpt:
      "Senang banget sih pakai template dari Solo Coding, tinggal ganti konten. Jadi hemat biaya dan waktu banget.",
    siteUrl: "https://qori.net",
    avatarUrl: "/avatars/qori.jpg",
  },
  {
    id: 5,
    name: "Siti Rahma",
    excerpt:
      "Aplikasi yang dikerjakan sangat rapi, sesuai dengan brief awal, dan harganya kompetitif. Rekomendasi!",
    siteUrl: "https://siti.com",
    avatarUrl: "/avatars/siti.jpg",
  },
  {
    id: 6,
    name: "Arief Chandra",
    excerpt:
      "Proyek besar berjalan lancar berkat komunikasi yang baik dan kualitas kode yang solid. Sangat profesional.",
    siteUrl: "https://arief.co",
    avatarUrl: "/avatars/arief.jpg",
  },
];

// --- VARIAN ANIMASI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- KOMPONEN CUSTOM COUNTER ---
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

// --- KOMPONEN UTAMA TESTIMONIALS SECTION ---
const TestimonialsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // Default items per page adalah 1 untuk mobile-first approach, nanti diupdate via useEffect
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Constants
  const GAP_SIZE = 32; // Sesuai dengan gap-8 Tailwind (32px)

  // 1. Deteksi Ukuran Layar (Responsive Logic)
  useEffect(() => {
    const handleResize = () => {
      // Jika lebar layar < 768px (Tablet/Mobile) tampilkan 1, jika lebih tampilkan 3
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(3);
      }
    };

    // Jalankan saat mount
    handleResize();

    // Tambahkan listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hitung total halaman berdasarkan data dan items per page saat ini
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage);

  // 2. Pastikan currentPage tidak melebihi totalPages saat resize
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  // 3. Logika Animasi Slide
  useEffect(() => {
    if (carouselRef.current) {
      // Kita ambil lebar card pertama untuk referensi pergeseran
      const firstCard = carouselRef.current.children[0] as HTMLElement;
      
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        // Total lebar per item (lebar card + gap)
        const itemTotalWidth = cardWidth + GAP_SIZE;
        
        // Geser sejauh: Halaman Aktif * Jumlah Item Per Halaman * Lebar Per Item
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
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dan Judul Utama */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2 border px-4 py-1 rounded-full">
            Testimonial
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {STATS[0].endValue.toLocaleString()}
            <span className="text-[#2563EB]">+</span> Klien Telah Bergabung
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Lebih dari {STATS[0].endValue.toLocaleString()}+ Klien telah
            mempercayakan kami untuk membantu mereka berkembang secara digital.
          </p>
        </motion.div>

        {/* --- CAROUSEL TESTIMONIALS --- */}
        <div className="overflow-hidden relative py-4">
          <motion.div
            ref={carouselRef}
            className="flex"
            style={{ gap: `${GAP_SIZE}px` }} // Menggunakan gap inline style agar konsisten dengan perhitungan JS
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col flex-shrink-0"
                style={{
                  // Kalkulasi Lebar Card yang Dinamis:
                  // (100% lebar container - (Total Gap)) / Jumlah Item
                  // Rumus Gap: (Jumlah Item - 1) * Ukuran Gap
                  width: `calc((100% - ${(itemsPerPage - 1) * GAP_SIZE}px) / ${itemsPerPage})`,
                }}
                variants={itemVariants}
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

        {/* Carousel Pagination Indicators */}
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
        {/* --- END CAROUSEL --- */}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;