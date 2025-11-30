"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Smartphone,
  Globe,
  Briefcase
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- DUMMY DATA: HISTORY ORDER ---
const RECENT_ORDERS = [
  {
    id: 1,
    client: "PT. Sumber Makmur Jaya",
    project: "Sistem ERP Gudang & Stok",
    status: "Deal & Proses Development",
    time: "2 Jam yang lalu",
    value: "Rp 15.xxx.xxx",
    icon: <Database className="w-5 h-5 text-purple-600" />,
    color: "bg-purple-100",
  },
  {
    id: 2,
    client: "CV. Karya Mandiri",
    project: "Web Company Profile Konstruksi",
    status: "Pembayaran DP Masuk",
    time: "5 Jam yang lalu",
    value: "Rp 3.xxx.xxx",
    icon: <Globe className="w-5 h-5 text-blue-600" />,
    color: "bg-blue-100",
  },
  {
    id: 3,
    client: "Kak Bayu (Personal)",
    project: "Aplikasi Top Up Game Otomatis",
    status: "Konsultasi Selesai",
    time: "Kemarin, 14:00 WIB",
    value: "Estimasi Rp 2.xxx.xxx",
    icon: <Smartphone className="w-5 h-5 text-green-600" />,
    color: "bg-green-100",
  },
];

// --- DATA: LAYANAN ---
const SERVICES = [
  {
    title: "Web Aplikasi Bisnis",
    desc: "Sistem manajemen custom (ERP, CRM, POS) untuk efisiensi operasional bisnis Anda.",
    icon: Database,
  },
  {
    title: "E-Commerce Custom",
    desc: "Toko online dengan fitur unik yang tidak dimiliki template biasa. Integrasi payment gateway.",
    icon: Rocket,
  },
  {
    title: "Company Profile Premium",
    desc: "Branding perusahaan lebih profesional dengan desain eksklusif, cepat, dan SEO friendly.",
    icon: Briefcase,
  },
];

export default function CustomWebPage() {
  const router = useRouter();
  const primaryBlue = "#2563EB";

  const handleConsultation = () => {
    // Arahkan ke WhatsApp atau Form Kontak
    window.open("https://wa.me/628xxxxxxxx?text=Halo%20SoloCoding,%20saya%20mau%20konsultasi%20custom%20web...", "_blank");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-34 pb-20 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
              <Code2 className="w-4 h-4" /> Solusi Digital Terpercaya
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 mb-6">
              Wujudkan Sistem & Website <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Sesuai Kebutuhan Bisnis
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Jangan paksa bisnis Anda mengikuti template. Kami bangunkan software yang mengikuti alur bisnis Anda. Cepat, Aman, dan Scalable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleConsultation}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Konsultasi Gratis <MessageSquare className="w-5 h-5" />
              </button>
              <button 
                onClick={() => router.push('/catalog')}
                className="px-8 py-4 bg-white border border-gray-200 text-slate-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Lihat Katalog Template
              </button>
            </div>
          </motion.div>

          {/* Illustration / Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
             <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dashboard Analytics" 
                  className="rounded-xl w-full h-auto object-cover"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3">
                   <div className="bg-green-100 p-2 rounded-full">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                   </div>
                   <div>
                      <p className="text-xs text-gray-500 font-semibold">Jaminan</p>
                      <p className="text-sm font-bold text-slate-800">Garansi Error Seumur Hidup*</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TIMELINE ORDER SECTION (SOCIAL PROOF) ================= */}
      <section className="py-16 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-blue-600 animate-pulse" /> 
              Aktivitas Pesanan Terkini
            </h2>
            <p className="text-slate-500 text-sm mt-2">Bergabunglah dengan mereka yang telah mempercayakan sistemnya pada SoloCoding.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 md:left-1/2 md:-ml-0.5"></div>

              {RECENT_ORDERS.map((order, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  key={order.id}
                  className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Icon Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow bg-white z-10">
                    <div className={`${order.color} p-1.5 rounded-full`}>
                      {order.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-right'}`}>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                        <span className="text-xs font-semibold text-gray-400 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {order.time}
                        </span>
                        <h3 className="font-bold text-slate-800 text-lg">{order.project}</h3>
                        <p className="text-sm text-gray-600 mb-2">{order.client}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded border border-green-100">
                             {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 italic">... dan puluhan project lainnya sedang berjalan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY US & SERVICES ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Mengapa Custom Web di SoloCoding?
            </h2>
            <p className="text-lg text-slate-600">
              Kami menggabungkan estetika desain dengan kode yang bersih dan performa tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((svc, idx) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 hover:bg-blue-600 group transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-blue-600 group-hover:bg-white rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-lg">
                   <svc.icon className="w-8 h-8 text-white group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-600 group-hover:text-blue-100 leading-relaxed transition-colors">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS FLOW ================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Alur Kerja Sederhana & Transparan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-700 -z-10 mx-16"></div>

            {[
              { step: "01", title: "Konsultasi", desc: "Diskusi kebutuhan & fitur via WA/Meet." },
              { step: "02", title: "Penawaran & DP", desc: "Sepakati harga & timeline pengerjaan." },
              { step: "03", title: "Development", desc: "Proses coding dengan update berkala." },
              { step: "04", title: "Serah Terima", desc: "Revisi, Training admin & Pelunasan." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400 mb-6 shadow-xl relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Siap Scale-Up Bisnis Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Jangan tunda lagi. Ide hebat Anda butuh eksekusi yang tepat. Hubungi kami sekarang dan dapatkan penawaran spesial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
               onClick={handleConsultation}
               className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full text-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
             >
                Hubungi Kami via WhatsApp <ArrowRight className="w-5 h-5" />
             </button>
          </div>
          <p className="mt-6 text-sm text-blue-200 opacity-80">
            <CheckCircle2 className="w-4 h-4 inline mr-1" /> Gratis konsultasi awal tanpa komitmen.
          </p>
        </div>
      </section>

    </div>
  );
}