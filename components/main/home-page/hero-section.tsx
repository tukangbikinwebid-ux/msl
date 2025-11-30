import React from "react";
import { motion, Variants } from "framer-motion"; // Pastikan Variants diimpor di sini

// Definisikan props untuk membuat komponen bisa digunakan ulang
interface HeroSectionProps {
  title: React.ReactNode; // Mengizinkan elemen/HTML (misalnya <b>)
  subtitle: string;
  promoText: string;
  promoPrice: string;
  discountedPrice: string;
  buttonText: string;
  personImageUrl: string; // URL gambar orang
}

// Varian Animasi untuk Framer Motion
// **PERBAIKAN:** Berikan tipe 'Variants' secara eksplisit
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda kecil antara animasi child
      delayChildren: 0.3,
    },
  },
};

// **PERBAIKAN:** Berikan tipe 'Variants' secara eksplisit
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  promoText,
  promoPrice,
  discountedPrice,
  buttonText,
  personImageUrl,
}) => {
  const whiteGold = "#EBAD25";
  const blue = "#2563EB";

  return (
    // Gunakan 'whileInView' untuk trigger animasi saat di-scroll
    <motion.section
      className="relative overflow-hidden bg-white min-h-[500px] py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }} // Animasi hanya sekali saat 40% terlihat
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* === KONTEN KIRI (TEXT DAN FORM) === */}
        <div className="md:w-1/2 w-full mb-12 md:mb-0 space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold"
            style={{ color: blue }}
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Promo Price */}
            <motion.div
            className="flex items-center space-x-4 bg-blue-50 rounded-xl px-5 py-4 shadow-md w-fit"
            variants={itemVariants}
            >
            <span className="text-base md:text-lg font-medium text-gray-700 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-300">
              {promoText}
            </span>
            <span
              className="text-lg md:text-xl font-semibold line-through text-gray-400"
            >
              {discountedPrice}
            </span>
            <span
              className="text-3xl md:text-5xl font-extrabold"
              style={{ color: blue }}
            >
              {promoPrice}
            </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex w-full max-w-lg space-x-4"
              variants={itemVariants}
            >
              <a
              href="/cari-website"
              className="flex-1 p-3 font-bold text-white text-center rounded-lg transition duration-300 hover:opacity-90"
              style={{ backgroundColor: whiteGold }}
              >
              Cari Website
              </a>
              <a
              href="/custom-web"
              className="flex-1 p-3 font-bold text-white text-center rounded-lg transition duration-300 hover:opacity-90"
              style={{ backgroundColor: blue }}
              >
              Custom Web
              </a>
            </motion.div>

            {/* Tagline Bullet Points */}
            <motion.ul
              className="mt-6 space-y-2"
              variants={itemVariants}
            >
              <li className="flex items-center text-gray-700 text-base">
              <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: blue }}></span>
              Fokus pada&nbsp;<b>Quality</b>
              </li>
              <li className="flex items-center text-gray-700 text-base">
              <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: blue }}></span>
              <b>Customize</b>&nbsp;sesuai kebutuhan Anda
              </li>
              <li className="flex items-center text-gray-700 text-base">
              <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: blue }}></span>
              <b>Easy to Use&nbsp;</b>&amp; user friendly
              </li>
            </motion.ul>
        </div>

        {/* === KONTEN KANAN (GAMBAR ORANG DAN ASSETS) === */}
        <div className="md:w-1/2 w-full flex justify-center relative">
          {/* Background Shape (Warna White Gold) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full opacity-60"
            style={{ backgroundColor: whiteGold }}
          ></div>

          {/* Gambar Orang */}
          <motion.img
            src={personImageUrl}
            alt="Pebisnis Sukses"
            className="relative w-full max-w-sm md:max-w-md object-contain z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
          />

          {/* Floating Assets (Animasi Sederhana) */}
          {/* Asset 1: Pencarian Google */}
          <motion.div
            className="absolute top-8 right-0 p-3 bg-white shadow-xl rounded-lg z-20"
            style={{ minWidth: "200px" }}
            animate={{ y: [0, -10, 0] }} // Animasi naik-turun lembut
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <p className="font-semibold text-sm text-gray-500">
              Q Pencarian #1 di Google
            </p>
            <div className="w-full h-2 bg-gray-200 mt-1 rounded"></div>
            <div className="w-3/4 h-2 bg-gray-200 mt-1 rounded"></div>
          </motion.div>

          {/* Asset 2: Customer Review */}
          <motion.div
            className="absolute bottom-10 left-0 p-3 bg-white shadow-xl rounded-lg z-20"
            style={{ minWidth: "200px" }}
            animate={{ y: [0, 10, 0] }} // Animasi turun-naik lembut
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <p className="font-bold text-lg" style={{ color: blue }}>
              Peningkatan SEO
            </p>
            {/* Placeholder untuk grafik (Gunakan CSS sederhana) */}
            <div className="h-16 w-full bg-gray-100 mt-2 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <polyline
                  points="0,40 25,20 50,30 75,10 100,5"
                  fill="none"
                  stroke={blue}
                  strokeWidth="3"
                />
                <circle cx="25" cy="20" r="3" fill={whiteGold} />
                <circle cx="75" cy="10" r="3" fill={whiteGold} />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;