"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Code,
  Award,
  ArrowRight,
  Send,
  Server,
  Shield,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";

// --- TIPE DATA TRANSLASI ---
interface TranslationData {
  "col-1-a": string;
  "col-1-b": string;
  "col-1-c": string;
  "col-1-d": string;
  "col-2-a": string;
  "col-2-b": string;
  "col-2-c": string;
  "col-2-d": string;
  "col-2-e": string;
  "col-2-f": string;
  "col-2-g": string;
  "col-3-a": string;
  "col-3-b": string;
  "col-3-c": string;
  "col-3-d": string;
  "col-4-a": string;
  "bottom-1": string;
}

// --- DATA TRANSLASI DUMMY ---
const id: TranslationData = {
  "col-1-a":
    "Solo Coding adalah platform independen yang menyediakan solusi web cepat dan berkualitas, mulai dari template siap pakai hingga pengembangan kustom dengan teknologi modern.",
  "col-1-b": "Kode Bersih & Efisien",
  "col-1-c": "Dukungan Teknis Prioritas",
  "col-1-d": "Desain Berbasis Konversi",
  "col-2-a": "Tautan Cepat",
  "col-2-b": "Beranda",
  "col-2-c": "Tentang Kami",
  "col-2-d": "Lihat Template",
  "col-2-e": "Studi Kasus",
  "col-2-f": "Blog / Artikel",
  "col-2-g": "Cara Order",
  "col-3-a": "Layanan Utama",
  "col-3-b":
    "Dapatkan update terbaru, diskon eksklusif, dan tips coding langsung ke inbox Anda!",
  "col-3-c": "Email Anda",
  "col-3-d": "Langganan Sekarang",
  "col-4-a": "Lihat Semua FAQ",
  "bottom-1": "Ikuti Kami di Media Sosial",
};
const en: TranslationData = {
  // Placeholder data Bahasa Inggris
  "col-1-a":
    "Solo Coding provides quick, quality web solutions, from ready-made templates to custom development with modern technology.",
  "col-1-b": "Clean & Efficient Code",
  "col-1-c": "Priority Technical Support",
  "col-1-d": "Conversion-Driven Design",
  "col-2-a": "Quick Links",
  "col-2-b": "Home",
  "col-2-c": "About Us",
  "col-2-d": "View Templates",
  "col-2-e": "Case Studies",
  "col-2-f": "Blog / Articles",
  "col-2-g": "How to Order",
  "col-3-a": "Main Services",
  "col-3-b":
    "Get the latest updates, exclusive discounts, and coding tips delivered straight to your inbox!",
  "col-3-c": "Your Email",
  "col-3-d": "Subscribe Now",
  "col-4-a": "View All FAQs",
  "bottom-1": "Follow Us On Social Media",
};

// --- DUMMY useTranslation HOOK DENGAN TIPE YANG BENAR ---
const useTranslation = ({
  id,
  en,
}: {
  id: TranslationData;
  en: TranslationData;
}) => ({ ...id, ...en });

export default function Footer() {
  // Panggil useTranslation di dalam fungsi komponen (PERBAIKAN HOOK)
  const t = useTranslation({ id, en });
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  // --- Warna Dasar ---
  const BG_DARK = "#1A376D"; // Dark Blue (Dasar)
  const ACCENT_GOLD = "#C79421"; // Dark Gold
  const ACCENT_BLUE = "#2563EB"; // Bright Blue

  const goTofaqPage = () => {
    router.push("/faq");
  };

  const faqs = [
    {
      question: "Apakah template Solo Coding menggunakan Next.js?",
      answer:
        "Ya! Sebagian besar template kami dibangun menggunakan Next.js dengan Tailwind CSS untuk performa SEO dan kecepatan pengembangan yang optimal.",
    },
    {
      question: "Berapa lama proses pengerjaan custom web?",
      answer:
        "Proses pengerjaan kustom bervariasi, umumnya antara 4 hingga 12 minggu, tergantung kompleksitas fitur yang diminta. Konsultasikan kebutuhan Anda untuk estimasi akurat.",
    },
    {
      question: "Apakah ada dukungan setelah peluncuran?",
      answer:
        "Tentu. Setiap proyek dilengkapi dengan masa garansi bug dan tersedia paket dukungan teknis bulanan untuk pemeliharaan dan penambahan fitur.",
    },
  ];

  const quickLinks = [
    { name: t["col-2-b"], href: "/" },
    { name: t["col-2-c"], href: "/about" },
    { name: t["col-2-d"], href: "/product" },
    { name: t["col-2-e"], href: "/case-studies" },
    { name: t["col-2-f"], href: "/blog" },
    { name: t["col-2-g"], href: "/how-to-order" },
  ];

  const productCategories = [
    { name: "Website Company Profile", href: "/cari-website?category=website-company-profile" },
    { name: "E-Commerce", href: "/cari-website?category=e-commerce" },
    { name: "Web Aplikasi", href: "/cari-website?category=web-aplikasi" },
    { name: "Koperasi", href: "/cari-website?category=koperasi" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{ backgroundColor: BG_DARK }}
    >
      {/* Background Pattern (Disesuaikan ke Gold dan Blue) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-full shadow-2xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-[#EBAD25] to-[#D97706] rounded-full shadow-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#EBAD25] rounded-full shadow-xl"></div>
      </div>

      <div className="relative z-10 bg-black/30">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Company Info (Solo Coding) */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                    <Image
                      src="/favicon.ico" // Ganti dengan logo Solo Coding
                      alt="Logo Solo Coding"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      SOLO CODING
                    </h3>
                    <p className="text-sm text-gray-300">
                      Modern Web Solutions
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {t["col-1-a"]}
                </p>

                {/* Values */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Code className="w-4 h-4" style={{ color: ACCENT_GOLD }} />
                    <span>{t["col-1-b"]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Server
                      className="w-4 h-4"
                      style={{ color: ACCENT_GOLD }}
                    />
                    <span>{t["col-1-c"]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Award className="w-4 h-4" style={{ color: ACCENT_GOLD }} />
                    <span>{t["col-1-d"]}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <MapPin
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: ACCENT_GOLD }}
                    />
                    <span>Jl. Teknologi Digital No. 7, Bandung, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: ACCENT_GOLD }}
                    />
                    <span>+62 812 3456 7890 (WA)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: ACCENT_GOLD }}
                    />
                    <span>support@solocoding.id</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  {t["col-2-a"]}
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors flex items-center group"
                      >
                        <ArrowRight
                          className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: ACCENT_BLUE }}
                        />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Categories & Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  {t["col-3-a"]}
                </h4>
                <ul className="space-y-3 mb-8">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a
                        href={category.href}
                        className="text-gray-300 hover:text-white transition-colors flex items-center group"
                      >
                        <ArrowRight
                          className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: ACCENT_BLUE }}
                        />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {category.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  FAQ Populer
                </h4>
                <div className="space-y-4 mb-4">
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full flex justify-between items-center text-left p-4 text-white hover:bg-white/20 transition-colors"
                        onClick={() =>
                          setActiveIndex(activeIndex === i ? null : i)
                        }
                      >
                        <span className="font-medium text-sm pr-2">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0">
                          {activeIndex === i ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                      {activeIndex === i && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={goTofaqPage}
                    type="button"
                    className="w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: ACCENT_BLUE, color: "white" }}
                  >
                    {t["col-4-a"]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Social Media */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <p className="text-gray-300 text-sm">{t["bottom-1"]}:</p>
                <div className="flex gap-4">
                  <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-[#EBAD25] hover:to-[#2563EB] transition-colors duration-300">
                    <FaInstagram size={18} />
                  </a>
                  <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#2563EB] transition-colors duration-300">
                    <FaFacebookF size={18} />
                  </a>
                  <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-300">
                    <FaYoutube size={18} />
                  </a>
                  <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors duration-300">
                    <FaTiktok size={18} />
                  </a>
                  <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-colors duration-300">
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: ACCENT_GOLD }} />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" style={{ color: ACCENT_GOLD }} />
                  <span>Crafted with Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black/20 border-t border-white/20">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <p>
                  © {new Date().getFullYear()} Solo Coding. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6">
                <a
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/sitemap"
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}