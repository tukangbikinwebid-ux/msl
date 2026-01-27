"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Globe, Code2, ChevronDown, LogIn } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/header/id";
import en from "@/translations/header/en";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import PromoBar from "./promobar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, switchLang } = useLanguage();
  const t = useTranslation({ id, en });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Primary Blue Color
  const primaryBlue = "#2563EB";

  // WhatsApp numbers array untuk rolling system
  const whatsappNumbers = [
    "6281234567890",
    "6281234567891",
    "6281234567892",
    "6281234567893",
    "6281234567894",
  ];

  // State untuk tracking nomor WhatsApp yang sedang aktif
  const [currentWhatsAppIndex, setCurrentWhatsAppIndex] = useState(0);

  // ===== ambil keranjang langsung dari zustand
  const cartItems = useCart((s) => s.cartItems);
  const cartCount = useMemo(
    () => cartItems.reduce((t, item) => t + item.quantity, 0),
    [cartItems]
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Mapping warna hover untuk setiap menu (Updated untuk My Solution Lending)
  const menuItemColors = [
    {
      name: "Program Pinjaman",
      href: "#catalog",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("catalog");
      },
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: "Simulasi",
      href: "#simulation",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("simulation");
      },
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: "Kelebihan",
      href: "#why-us",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("why-us");
      },
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
    {
      name: "Testimonial",
      href: "#testimonial",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection("testimonial");
      },
      hoverBg: "hover:bg-blue-50",
      activeBg: "bg-blue-100",
      textColor: "text-slate-600",
      activeText: "text-blue-700",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  const languages = [
    { code: "ms" as const, name: "Bahasa Malaysia", flag: "🇲🇾" },
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "zh" as const, name: "中文", flag: "🇨🇳" },
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  const handleLanguageChange = (newLang: "en" | "ms" | "zh") => {
    switchLang(newLang);
    setIsLanguageDropdownOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: newLang })
      );
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const handleWhatsAppClick = () => {
    // Ambil nomor WhatsApp yang sedang aktif
    const currentNumber = whatsappNumbers[currentWhatsAppIndex];
    
    // Buka WhatsApp dengan nomor yang sedang aktif
    window.open(`https://wa.me/${currentNumber}`, "_blank");
    
    // Rotate ke nomor berikutnya untuk klik selanjutnya
    setCurrentWhatsAppIndex((prevIndex) => (prevIndex + 1) % whatsappNumbers.length);
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/mysolutionlending", "_blank");
  };

  const handleLoginClick = () => {
    window.location.href = "http://apps.mysolutionlending.com/";
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <PromoBar />
      <nav
        className={`fixed top-8 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-blue-100"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items center gap-2">
                <Image
                  src="/logo-msl.webp"
                  alt="My Solution Lending Logo"
                  width={200}
                  height={100}
                  className="rounded-lg object-contain"
                />
              </div>
            </Link>

            {/* Desktop Menu - Dipindahkan ke kanan sebelum icon */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-end mr-4">
              {menuItemColors.map((item) => {
                const active = isActiveLink(item.href);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick}
                    className={`relative font-semibold transition-all duration-300 py-2.5 px-4 group rounded-lg text-sm cursor-pointer ${
                      active
                        ? `${item.activeBg} ${item.activeText} shadow-sm`
                        : `${item.textColor} ${item.hoverBg} hover:text-blue-600`
                    }`}
                  >
                    {item.name}
                    {/* Active Indicator Dot */}
                    {active && (
                       <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Dropdown - Desktop */}
              <div className="hidden lg:block relative language-dropdown">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-300 border border-blue-200"
                  title={t.switchLanguage}
                >
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold">
                    {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-blue-600 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          lang === language.code
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="flex-1 text-left">{language.name}</span>
                        {lang === language.code && (
                          <span className="text-blue-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Login Button - Desktop */}
              <button
                onClick={handleLoginClick}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Login"
                title="Login ke Aplikasi"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>

              {/* WhatsApp Icon */}
              {/* <button
                onClick={handleWhatsAppClick}
                className="p-2.5 rounded-lg hover:bg-green-50 text-slate-600 hover:text-green-600 transition-all duration-300"
                aria-label="WhatsApp"
                title="Hubungi via WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button> */}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-slate-600 transition-all duration-300"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 z-50 lg:hidden transition-all duration-300 backdrop-blur-sm ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className={`fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="font-bold text-lg leading-tight text-slate-800">
                    My Solution Lending
                  </h2>
                  <p className="text-xs text-slate-500">Solusi Pinjaman Terpercaya</p>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-100"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto bg-slate-50">
            {menuItemColors.map((item, index) => {
              const active = isActiveLink(item.href);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    item.onClick(e);
                    toggleMobileMenu();
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300 group border ${
                    active
                      ? "bg-white text-blue-700 border-blue-200 shadow-sm"
                      : "bg-white text-slate-600 border-transparent hover:border-gray-200"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInRight 0.3s ease-out forwards"
                      : "none",
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      active
                        ? "bg-blue-600"
                        : "bg-gray-300 group-hover:bg-blue-400"
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {active && (
                    <div className="w-1 h-5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Login Button - Mobile */}
            <div className="mt-6">
              <button
                onClick={() => {
                  handleLoginClick();
                  toggleMobileMenu();
                }}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ backgroundColor: primaryBlue }}
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>

            {/* Language Dropdown - Mobile */}
            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold text-gray-500 px-4 mb-2">Pilih Bahasa:</p>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    handleLanguageChange(language.code);
                    toggleMobileMenu();
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300 border ${
                    lang === language.code
                      ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                      : "bg-white text-slate-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="flex-1 text-left">{language.name}</span>
                  {lang === language.code && (
                    <span className="text-blue-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-gray-200 bg-white">
            {/* <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  handleWhatsAppClick();
                  toggleMobileMenu();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white border border-green-500 hover:bg-green-600 transition-all"
                style={{ backgroundColor: "#25D366" }}
              >
                 <FaWhatsapp className="w-5 h-5" /> WhatsApp
              </button>
            </div> */}
            <p className="text-center text-[10px] text-gray-400 mt-4">
              © 2025 My Solution Lending. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}