import React from "react";
import { motion, Variants } from "framer-motion";

// --- Tipe Data Dummy ---
interface ArticleItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

// --- DATA DUMMY ARTIKEL SOLO CODING ---
const DUMMY_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    category: "Full-Stack",
    title: "Mengembangkan Web E-commerce dengan Next.js",
    excerpt:
      "Panduan lengkap membuat toko online modern dan berkinerja tinggi...",
    date: "25 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/2563EB/FFFFFF?text=E-commerce+Study",
  },
  {
    id: 2,
    category: "Website",
    title: "Tips Desain Company Profile yang Menjual",
    excerpt:
      "Pelajari elemen kunci dalam desain web yang meningkatkan kredibilitas bisnis Anda...",
    date: "24 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Meeting+Room+Web",
  },
  {
    id: 3,
    category: "Mobile App",
    title: "Membangun Aplikasi Padel/Sports dengan React Native",
    excerpt:
      "Studi kasus implementasi fitur pemesanan lapangan dan manajemen jadwal...",
    date: "23 Nov 2025",
    imageUrl:
      "https://via.placeholder.com/600x400/10B981/FFFFFF?text=Mobile+App+Padel",
  },
];

// --- VARIAN ANIMASI FRAMER MOTION ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const ArticleSection: React.FC = () => {
  const blue = "#2563EB";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header dan Judul Utama */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-4 py-1 rounded-full border"
            style={{ borderColor: blue, color: blue }}
          >
            Artikel Solo Coding
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Pelajaran dari Pengalaman Nyata
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Temukan solusi praktis yang lahir dari situasi dunia nyata, serta
            pelajaran berharga yang dapat membantu Anda menghadapi tantangan
            serupa. Mari belajar dari pengalaman untuk menciptakan solusi hebat!
          </p>
        </motion.div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Gambar Atas */}
              <div className="h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/600x400/A0A0A0/FFFFFF?text=Placeholder")
                  }
                />
              </div>

              {/* Konten Bawah */}
              <div className="p-6">
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 inline-block"
                  style={{ backgroundColor: `${blue}15`, color: blue }} // Biru pudar untuk background kategori
                >
                  {article.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                  {article.title}: {article.excerpt.substring(0, 35)}...
                </h3>

                <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t mt-4">
                  <span>{article.date}</span>
                  <span className="font-semibold" style={{ color: blue }}>
                    Baca Selengkapnya
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            className="px-6 py-3 border rounded-lg text-lg font-medium transition duration-300 hover:bg-gray-50"
            style={{ borderColor: blue, color: blue }}
          >
            Lihat Semua
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleSection;