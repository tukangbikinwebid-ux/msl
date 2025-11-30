"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  Globe,
  Layout,
  Loader2,
  MoreHorizontal,
  Smartphone,
  Trophy,
  User,
  Zap
} from "lucide-react";

// --- DATA STATISTIK ---
const STATS = [
  { label: "Total Proyek Selesai", value: "150+", icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
  { label: "Sedang Dikerjakan", value: "8", icon: <Activity className="w-6 h-6 text-blue-500" /> },
  { label: "Klien Puas", value: "98%", icon: <User className="w-6 h-6 text-green-500" /> },
];

// --- DATA ACTIVE PROJECTS (ON GOING) ---
const ACTIVE_PROJECTS = [
  {
    id: 1,
    client: "PT. S**** Makmur",
    type: "Sistem ERP Gudang Custom",
    progress: 75,
    status: "Development Phase",
    desc: "Integrasi modul stok opname dan laporan keuangan.",
    category: "Web App",
    icon: <Database className="w-5 h-5" />,
    updated: "Update: 2 jam yang lalu",
  },
  {
    id: 2,
    client: "Kak Bayu (Personal)",
    type: "Top Up Game Store (Vip Reseller)",
    progress: 40,
    status: "UI/UX Design",
    desc: "Slicing design halaman checkout dan integrasi API Digiflazz.",
    category: "Top Up",
    icon: <Smartphone className="w-5 h-5" />,
    updated: "Update: 5 jam yang lalu",
  },
  {
    id: 3,
    client: "CV. K**** Konstruksi",
    type: "Company Profile Premium",
    progress: 90,
    status: "Final Testing (QC)",
    desc: "Pengecekan responsif mobile dan optimasi SEO.",
    category: "Compro",
    icon: <Layout className="w-5 h-5" />,
    updated: "Update: Kemarin",
  },
];

// --- DATA HISTORY (COMPLETED) ---
const HISTORY_LOGS = [
  {
    date: "28 Nov 2025",
    client: "Bpk. Rendra",
    project: "E-Commerce Fashion Distro",
    category: "E-Commerce",
    tag: "Selesai",
  },
  {
    date: "25 Nov 2025",
    client: "Yayasan Al-Ikhlas",
    project: "SIAKAD Sekolah & PPDB Online",
    category: "Web App",
    tag: "Selesai",
  },
  {
    date: "20 Nov 2025",
    client: "Toko Berkah Jaya",
    project: "Aplikasi Kasir (POS) Cloud",
    category: "Web App",
    tag: "Selesai",
  },
  {
    date: "15 Nov 2025",
    client: "Komunitas G*** Indonesia",
    project: "Web Membership & Digital KTA",
    category: "Web App",
    tag: "Selesai",
  },
  {
    date: "10 Nov 2025",
    client: "Ibu Siska",
    project: "Landing Page Skincare",
    category: "Landing Page",
    tag: "Selesai",
  },
];

export default function TimelineOrderPage() {
  const primaryBlue = "#2563EB";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* ================= HERO & STATS ================= */}
      <section className="relative pt-32 pb-16 bg-white border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6 border border-green-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Live Activity Tracker
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Transparansi Kerja <br />
              <span style={{ color: primaryBlue }}>Real-Time & Terpercaya</span>
            </h1>
            <p className="text-lg text-slate-600">
              Lihat apa yang sedang kami kerjakan saat ini. Kami tidak hanya janji manis, tapi bukti nyata progress kodingan yang terus berjalan.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, idx) => (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform"
              >
                <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION: ON PROGRESS (ACTIVE) ================= */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" /> 
              Sedang Dikerjakan (Live)
            </h2>
            <span className="text-sm text-slate-500 animate-pulse">
              Update data otomatis...
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVE_PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 relative overflow-hidden group hover:shadow-xl transition-all"
              >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:bg-blue-100 transition-colors"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      {project.icon}
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{project.type}</h3>
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                    <User className="w-3 h-3" /> {project.client}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-blue-600">{project.status}</span>
                      <span className="text-slate-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-blue-600 h-2 rounded-full relative"
                      >
                         {/* Shimmer Effect on Bar */}
                         <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer w-full h-full"></div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {project.updated}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Banner Queue */}
          <div className="mt-8 bg-slate-900 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
             <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                   <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <div>
                   <h4 className="font-bold text-lg">Antrian Penuh Semangat!</h4>
                   <p className="text-slate-300 text-sm">Masih ada 3 slot kosong untuk pengerjaan bulan ini.</p>
                </div>
             </div>
             <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-colors whitespace-nowrap">
                Ambil Slot Sekarang
             </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION: HISTORY (TIMELINE) ================= */}
      <section className="py-16 bg-slate-50 border-t border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900">Riwayat Pengerjaan</h2>
              <p className="text-slate-500">Jejak digital karya yang telah kami selesaikan dengan sukses.</p>
           </div>

           <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 lg:left-1/2"></div>

              <div className="space-y-8">
                 {HISTORY_LOGS.map((log, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`relative flex items-center lg:justify-between ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                       {/* Center Dot */}
                       <div className="absolute left-4 lg:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-md z-10"></div>

                       {/* Spacer for Mobile/Desktop Logic */}
                       <div className="hidden lg:block lg:w-5/12"></div>

                       {/* Content Card */}
                       <div className="ml-12 lg:ml-0 w-full lg:w-5/12">
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                             <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                   {log.date}
                                </span>
                                <div className="flex items-center text-green-600 text-xs font-bold gap-1">
                                   <CheckCircle2 className="w-3 h-3" /> {log.tag}
                                </div>
                             </div>
                             <h4 className="font-bold text-slate-800 text-lg">{log.project}</h4>
                             <p className="text-sm text-slate-500 mb-2">{log.client}</p>
                             <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                {log.category}
                             </span>
                          </div>
                       </div>
                    </motion.div>
                 ))}
              </div>
              
              <div className="text-center mt-12">
                 <button className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors">
                    <MoreHorizontal className="w-5 h-5" /> Load More History
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-6">
           <Globe className="w-16 h-16 text-blue-200 mx-auto mb-6 opacity-50" />
           <h2 className="text-3xl font-extrabold mb-4">Giliran Anda Sekarang!</h2>
           <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Bergabunglah dengan ratusan klien yang telah memiliki website profesional. Jangan biarkan ide bisnis Anda hanya menjadi wacana.
           </p>
           <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all">
              Mulai Project Anda
           </button>
        </div>
      </section>

      {/* Styles for Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}