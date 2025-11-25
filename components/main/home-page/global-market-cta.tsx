import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Mesh } from "three";

// --- KONSTANTA GLOBE ---
const GLOBE_RADIUS = 3.0; // Radius efektif (args[0] * scale)
const POINT_SIZE = 0.05; // Ukuran titik koordinat

// --- FUNGSI UTILITY: Konversi Lat/Lon ke Kartesius ---
/**
 * Mengkonversi koordinat lintang (latitude) dan bujur (longitude)
 * ke posisi 3D (x, y, z) pada permukaan bola dengan radius tertentu.
 * @param {number} lat - Latitude (derajat)
 * @param {number} lon - Longitude (derajat)
 * @param {number} radius - Radius bola
 * @returns {[number, number, number]} Posisi Kartesius [x, y, z]
 */
const latLonToCartesian = (
  lat: number,
  lon: number,
  radius: number
): [number, number, number] => {
  // Konversi derajat ke radian
  const latRad = lat * (Math.PI / 180);
  const lonRad = lon * (Math.PI / 180);

  // Menghitung posisi (x, y, z)
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lonRad);

  // Membalik sumbu Z agar rotasi bekerja lebih intuitif
  return [x, y, -z];
};

// --- DATA TITIK KOORDINAT UTAMA ---
const POINTS: { lat: number; lon: number; name: string }[] = [
  { lat: 40.71, lon: -74.01, name: "New York" },
  { lat: 51.51, lon: 0.13, name: "London" },
  { lat: 35.68, lon: 139.69, name: "Tokyo" },
  { lat: -33.87, lon: 151.21, name: "Sydney" },
  { lat: -22.91, lon: -43.2, name: "Rio de Janeiro" },
  { lat: 25.2, lon: 55.27, name: "Dubai" },
  { lat: 1.35, lon: 103.82, name: "Singapore" },
  { lat: 39.9, lon: 116.4, name: "Beijing" },
  { lat: -6.2, lon: 106.84, name: "Jakarta" }, // Contoh Indonesia
];

// --- Komponen Titik Koordinat ---
const CoordinatePoints: React.FC = () => {
  const pointColor = "#2563EB"; 

  return (
    <>
      {POINTS.map((point, index) => {
        // Hitung posisi 3D berdasarkan radius globe
        const position = latLonToCartesian(point.lat, point.lon, GLOBE_RADIUS);

        // Gunakan meshBasicMaterial agar titik tidak dipengaruhi oleh pencahayaan
        return (
          <Sphere
            key={index}
            args={[POINT_SIZE, 16, 16]}
            position={position}
            // Tambahkan sedikit scale (0.001) agar titik selalu tampak di atas wireframe
            scale={1.001}
          >
            <meshBasicMaterial color={pointColor} />
          </Sphere>
        );
      })}
    </>
  );
};

// --- Komponen Globe 3D yang Ditingkatkan ---
const Globe: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);

  // Rotasi mesh setiap frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Kecepatan rotasi
    }
  });

  return (
    // Radius base 1, dikali scale 3.0 -> radius efektif 3.0
    <Sphere ref={meshRef} args={[1, 128, 128]} scale={GLOBE_RADIUS}>
      {/* Material Putih Dominan dengan Wireframe Abu-abu (Serat) */}
      <meshStandardMaterial
        color="white"
        metalness={0.0} // Kurangi metalness
        roughness={1.0} // Tingkatkan roughness agar tampak lebih matte
        emissive="white" // Biarkan emissive tetap putih
        emissiveIntensity={0.1}
        wireframe={true} // Gunakan wireframe untuk efek 'serat' abu-abu
        wireframeLinewidth={0.5} // Ketebalan garis
      />
      {/* Tambahkan Titik Koordinat di Permukaan Globe */}
      <CoordinatePoints />
    </Sphere>
  );
};

// --- VARIAN ANIMASI FRAMER MOTION ---
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

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.8 },
  },
};

// --- KOMPONEN UTAMA GLOBAL MARKET CTA ---
const GlobalMarketCta: React.FC = () => {
  const blue = "#2563EB";

  return (
    <motion.section
      className="relative py-20 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between z-10 relative">
        {/* Konten Teks Kanan */}
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <motion.span
            variants={textVariants}
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-4 py-1 rounded-full border"
            style={{ borderColor: blue, color: blue }}
          >
            Menuju Pasar Global
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Buat Website untuk Capai <br className="hidden md:inline" /> Pasar
            Global
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-lg text-gray-700 max-w-lg mx-auto lg:mx-0 mb-8"
          >
            Perluas jangkauan bisnis Anda ke seluruh dunia dengan memiliki
            website profesional. Dengan website yang menarik dan mudah diakses,
            Anda bisa menjangkau lebih banyak pelanggan internasional dan
            meningkatkan penjualan. Wujudkan peluang bisnis baru di pasar global
            dengan langkah sederhana: buat website Anda sekarang!
          </motion.p>
          <motion.button
            variants={buttonVariants}
            className="px-8 py-3 rounded-lg text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ backgroundColor: blue }}
          >
            Buat Website Sekarang
          </motion.button>
        </div>

        {/* Globe 3D di Sisi Kiri (Desktop) / Atas (Mobile) */}
        <div className="lg:w-1/2 w-full absolute lg:relative h-[500px] lg:h-[700px] lg:mt-0 mt-10 lg:order-first">
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0, 10], fov: 40 }}
          >
            {/* Pencahayaan */}
            <ambientLight intensity={1.5} />
            {/* Tambahkan light yang lebih kuat untuk melihat titik dengan jelas */}
            <pointLight position={[10, 10, 10]} intensity={2} color="#FFFFFF" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#AAAAAA"
            />

            {/* Globe dan Titik Koordinat */}
            <Globe />
          </Canvas>
          {/* Efek grid dot di background (Tetap) */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(#C5CAE9 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default GlobalMarketCta;