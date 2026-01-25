"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  ShoppingCart,
  Code,
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Quote,
  ArrowRight
} from "lucide-react";

// --- DATA KATEGORI (Ditambah URL Gambar) ---
const CATEGORIES = [
  { 
    id: "all", 
    label: "Semua Topik", 
    icon: <HelpCircle className="w-4 h-4" />,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" // Gambar General/Meeting
  },
  { 
    id: "product", 
    label: "Produk & Lisensi", 
    icon: <Code className="w-4 h-4" />,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop" // Gambar Coding/Laptop
  },
  { 
    id: "order", 
    label: "Cara Order", 
    icon: <ShoppingCart className="w-4 h-4" />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop" // Gambar Payment/Cart
  },
  { 
    id: "support", 
    label: "Garansi & Support", 
    icon: <ShieldCheck className="w-4 h-4" />,
    image: "https://images.unsplash.com/photo-1521791136064-7985c2d1103b?q=80&w=1000&auto=format&fit=crop" // Gambar Handshake/Support
  },
];

// --- DATA PERTANYAAN (FAQ) ---
const FAQ_DATA = [
  {
    id: 1,
    category: "product",
    question: "Apa yang saya dapatkan setelah membeli template?",
    answer: "Anda akan mendapatkan **Full Source Code** (100% akses ke kodingan), Database (SQL), Panduan Instalasi (Dokumentasi), dan akses update gratis jika ada perbaikan bug di versi yang sama.",
  },
  {
    id: 2,
    category: "product",
    question: "Apakah codingannya mudah dipahami untuk pemula?",
    answer: "Tentu! Kami menulis kode dengan struktur yang rapi (Clean Code), komentar penjelas di setiap fungsi penting, dan menggunakan framework populer (Laravel/Next.js/React) yang dokumentasinya melimpah.",
  },
  {
    id: 3,
    category: "order",
    question: "Bagaimana alur pemesanan Jasa Custom Web?",
    answer: "1. Konsultasi via WhatsApp untuk diskusi fitur.\n2. Kami berikan penawaran harga & timeline.\n3. Pembayaran DP (Down Payment) 50%.\n4. Proses pengerjaan & Preview berkala.\n5. Pelunasan & Serah terima file.",
  },
  {
    id: 4,
    category: "order",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (OVO, GoPay, Dana), dan QRIS untuk kemudahan transaksi otomatis.",
  },
  {
    id: 5,
    category: "support",
    question: "Apakah ada garansi jika website error?",
    answer: "Ya, kami memberikan **Garansi Seumur Hidup** untuk error/bug yang berasal dari kesalahan kode kami (bukan karena diubah pihak ketiga atau kesalahan server hosting Anda).",
  },
  {
    id: 6,
    category: "support",
    question: "Apakah bisa minta bantuan instalasi ke hosting?",
    answer: "Bisa banget! Kami menyediakan layanan **Gratis Instalasi** ke hosting cPanel/VPS untuk pembelian pertama Anda. Tim kami akan menyettingkan sampai web live.",
  },
  {
    id: 7,
    category: "product",
    question: "Bolehkan saya menjual ulang template ini ke klien saya?",
    answer: "Boleh (Developer License). Anda diizinkan menggunakan source code ini untuk project klien Anda (re-brand). Namun, Anda **DILARANG** menjual kembali source code mentahnya di marketplace lain.",
  },
];

// --- DATA REVIEW/TESTIMONI ---
const REVIEWS = [
  {
    name: "Andi Saputra",
    role: "Freelance Developer",
    text: "Codingannya rapi banget, gampang dimodif buat klien saya. Hemat waktu development sampai 70%. Recommended buat dev yang lagi dikejar deadline!",
    rating: 5,
  },
  {
    name: "PT. Maju Berkah",
    role: "Corporate Client",
    text: "Pesan custom web company profile, hasilnya sangat profesional. Loading cepat dan desainnya modern sesuai request direksi kami.",
    rating: 5,
  },
  {
    name: "Rina Wijaya",
    role: "Owner Online Shop",
    text: "Awalnya bingung masalah server, tapi tim mysolutionlending bantu install sampai web toko online saya jalan. Supportnya juara!",
    rating: 5,
  },
];

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<number | null>(null);

  // --- WARNA TEMA (BIRU) ---
  const primaryBlue = "#2563EB"; 

  // Filter Logic
  const filteredFAQ = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get Current Active Image
  const currentImage = CATEGORIES.find(cat => cat.id === activeCategory)?.image || CATEGORIES[0].image;

  const toggleAccordion = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-38 pb-10 bg-white overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Ada yang bisa kami <span style={{ color: primaryBlue }}>bantu?</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan jawaban seputar produk, teknis, dan layanan mysolutionlending disini.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FILTER SECTION (STICKY TOP) ================= */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Controls (Tabs) */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm ${
                    activeCategory === cat.id
                        ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-200 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-white hover:shadow"
                    }`}
                >
                    {cat.icon}
                    {cat.label}
                </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT SECTION (GRID LAYOUT) ================= */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* --- LEFT COLUMN: STICKY IMAGE --- */}
            <div className="hidden lg:block lg:col-span-5 relative">
              {/* Sticky Container: Top nya disesuaikan agar tidak tertutup header filter */}
              <div className="sticky top-32">
                 <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeCategory} // Key change triggers animation
                        src={currentImage}
                        alt="Category Illustration"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    
                    {/* Overlay Gradient for Text readability if needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-sm font-medium opacity-90 uppercase tracking-wider mb-1">Kategori</p>
                        <h3 className="text-2xl font-bold">
                            {CATEGORIES.find(c => c.id === activeCategory)?.label}
                        </h3>
                    </div>
                 </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: FAQ LIST --- */}
            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                {filteredFAQ.length > 0 ? (
                  filteredFAQ.map((faq) => (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        openItem === faq.id ? "border-blue-500 shadow-lg ring-1 ring-blue-100" : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className={`font-bold text-lg pr-4 ${openItem === faq.id ? "text-blue-600" : "text-slate-800"}`}>
                          {faq.question}
                        </span>
                        {openItem === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {openItem === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-gray-100 bg-slate-50/50">
                              {/* Render text with basic line breaks support */}
                              {faq.answer.split('\n').map((line, i) => (
                                  <p key={i} className="mb-2 last:mb-0">
                                      {line.includes('**') ? (
                                          <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                                      ) : line}
                                  </p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                    <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Tidak ditemukan pertanyaan yang cocok.</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="mt-2 text-blue-600 hover:underline text-sm"
                    >
                      Reset Pencarian
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Apa Kata Mereka?</h2>
            <p className="text-slate-300">Kepuasan klien adalah bahan bakar utama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-slate-800 p-8 rounded-2xl border border-slate-700 relative group"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-600 group-hover:text-blue-500 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                    <span className="text-xs text-slate-400">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             
             <h2 className="text-3xl md:text-4xl font-extrabold mb-6 relative z-10">
               Masih ada pertanyaan lain?
             </h2>
             <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
               Jangan ragu untuk berdiskusi dengan tim kami. Konsultasi gratis untuk menentukan kebutuhan website Anda.
             </p>
             
             <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg">
                 <MessageCircle className="w-5 h-5" /> Chat WhatsApp Admin
               </button>
               <button className="bg-blue-700 border border-blue-400 text-white hover:bg-blue-800 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                 Lihat Katalog <ArrowRight className="w-5 h-5" />
               </button>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}