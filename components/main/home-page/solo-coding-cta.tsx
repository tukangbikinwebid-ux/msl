import React from "react";
import { ShoppingBag, Zap, Info } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Dummy implementation for router.push and font class
const dummyRouter = {
  push: (path: string) => console.log(`Navigating to: ${path}`),
};
const FredokaClass = "font-sans"; // Placeholder for font class

// Warna
const GOLD = "#EBAD25";
const BLUE = "#2563EB";

// --- VARIAN ANIMASI FRAMER MOTION ---
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
  return (
    <motion.section
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={titleVariants}
    >
      {/* Background Gradient & Animated Shapes */}
      {/* Latar Belakang Gradient (Pudar Biru ke Putih) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}30, #FFFFFF)`,
        }}
      ></div>

      {/* Shape 1: Gold */}
      <div
        className="absolute top-10 left-1/4 w-20 h-20 rounded-full opacity-60 animate-pulse shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${GOLD}, ${GOLD}80)`,
        }}
      ></div>

      {/* Shape 2: Blue */}
      <div
        className="absolute bottom-10 right-1/4 w-16 h-16 rounded-full opacity-70 animate-pulse delay-[1000ms] shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}, ${BLUE}80)`,
        }}
      ></div>

      {/* Shape 3: Blue-Gold Blend */}
      <div
        className="absolute top-1/2 right-10 w-12 h-12 rounded-full opacity-50 animate-pulse delay-[500ms] shadow-xl"
        style={{
          background: `linear-gradient(to bottom right, ${BLUE}, ${GOLD})`,
        }}
      ></div>

      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <div className={`max-w-4xl mx-auto ${FredokaClass}`}>
          <motion.h2
            className="text-3xl lg:text-5xl font-extrabold mb-6 text-gray-900"
            variants={titleVariants}
          >
            Siap Memulai Proyek{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${BLUE}, #1E40AF)`,
              }}
            >
              Coding Pertama
            </span>{" "}
            Anda?
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${GOLD}, #D97706)`,
              }}
            >
              Konsultasi Sekarang!
            </span>
          </motion.h2>

          <motion.p
            className="text-xl mb-10 max-w-3xl mx-auto text-gray-700"
            variants={subtitleVariants}
          >
            Jangan biarkan ide hebat hanya menjadi wacana. Temukan *template*
            yang tepat atau dapatkan layanan kustom untuk meluncurkan *website*
            dan aplikasi impian Anda dengan cepat dan efisien.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={ctaVariants}
          >
            {/* CTA 1: Primary Action (Gold) */}
            <button
              onClick={() => dummyRouter.push("/product")}
              className="text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #D97706)`,
              }}
            >
              <Zap className="w-5 h-5" />
              Lihat Template Siap Pakai
            </button>

            {/* CTA 2: Secondary Action (Blue Outline) */}
            <button
              onClick={() => dummyRouter.push("/about")}
              className="border-2 flex items-center font-bold px-8 py-4 rounded-xl text-lg bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                borderColor: BLUE,
                color: BLUE,
              }}
            >
              <Info className="w-5 h-5 mr-2" />
              Konsultasi Gratis
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SoloCodingCta;