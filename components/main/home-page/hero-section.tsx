import React from "react";
import { motion, Variants } from "framer-motion";

interface HeroSectionProps {
  personImageUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const HeroSection: React.FC<HeroSectionProps> = ({ personImageUrl }) => {
  const whiteGold = "#EBAD25";
  const blue = "#2563EB";

  return (
    <motion.section
      className="relative overflow-hidden bg-white min-h-[600px] py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        
        {/* === KONTEN KIRI (TEXT & COPYWRITING) === */}
        <div className="md:w-3/5 w-full mb-12 md:mb-0 space-y-6 z-20">
          <motion.div variants={itemVariants} className="inline-block px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm">
            🚀 Solusi Digital Anti-Ghosting
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900"
            variants={itemVariants}
          >
            Bangun Website <span style={{ color: blue }}>Tanpa Drama,</span> Fokus Besarkan Bisnis Anda.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
            variants={itemVariants}
          >
            Bukan sekadar website jadi. Kami membangun <b>mesin pertumbuhan bisnis</b> yang terintegrasi dengan Meta Pixel, Google Analytics, hingga Payment Gateway. Cepat, Terukur, dan <span className="text-slate-900 font-bold underline decoration-yellow-400">Anti-Ghosting.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row w-full max-w-xl gap-4 pt-4"
            variants={itemVariants}
          >
            <a
              href="https://wa.me/yournumber" // Sesuaikan link WA
              className="flex-1 px-8 py-4 font-bold text-white text-center rounded-xl transition duration-300 hover:scale-105 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              style={{ backgroundColor: blue }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48s3.481 5.229 3.481 8.404c0 6.556-5.332 11.888-11.888 11.888-2.01 0-3.988-.511-5.741-1.482l-6.243 1.637zm6.402-3.717c1.527.906 3.13 1.383 4.774 1.383 5.076 0 9.208-4.131 9.208-9.208 0-2.458-.957-4.77-2.693-6.505s-4.047-2.692-6.505-2.692c-5.076 0-9.208 4.131-9.208 9.208 0 1.747.494 3.454 1.431 4.939l-1.018 3.715 3.811-1.001z"/></svg>
              Konsultasi Gratis
            </a>
            <a
              href="/katalog"
              className="flex-1 px-8 py-4 font-bold text-white text-center rounded-xl transition duration-300 hover:scale-105 shadow-lg shadow-yellow-100"
              style={{ backgroundColor: whiteGold }}
            >
              Lihat Katalog Web
            </a>
          </motion.div>

          {/* Value Points */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6" variants={itemVariants}>
            {[
              "Tracking Meta Pixel & GA4",
              "Integrasi Payment Gateway",
              "Notifikasi WA & Email Otomatis",
              "SEO Friendly & High Performance"
            ].map((text, i) => (
              <div key={i} className="flex items-center text-slate-700 font-medium">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* === KONTEN KANAN (VISUAL ASSETS) === */}
        <div className="md:w-2/5 w-full flex justify-center relative">
          {/* Background Gradient Blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: blue }}
          ></div>

          {/* Gambar Orang Utama */}
          <motion.img
            src={personImageUrl}
            alt="mysolutionlending Professional Developer"
            className="relative w-full max-w-[320px] md:max-w-md object-contain z-10 filter drop-shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1.2 }}
          />

          {/* Floating Asset 1: Sales/Conversion */}
          <motion.div
            className="absolute top-10 -right-4 p-4 bg-white shadow-2xl rounded-2xl z-20 border border-slate-50"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Conversion Rate</p>
                <p className="text-lg font-bold text-slate-800">+42.5%</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Asset 2: Integrasi Icon */}
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