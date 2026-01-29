"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/footer/id";
import en from "@/translations/footer/en";
import ms from "@/translations/footer/ms";
import zh from "@/translations/footer/zh";

export default function Footer() {
  const t = useTranslation({ en, id, ms, zh });
  const router = useRouter();

  const blue = "#2563EB";
  const gold = "#EBAD25";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const quickLinks = [
    { name: t["link-home"], href: "/", onClick: null },
    { name: t["link-programs"], href: "#catalog", onClick: () => scrollToSection("catalog") },
    { name: t["link-simulation"], href: "#simulation", onClick: () => scrollToSection("simulation") },
    { name: t["link-why-us"], href: "#why-us", onClick: () => scrollToSection("why-us") },
    { name: t["link-testimonial"], href: "#testimonial", onClick: () => scrollToSection("testimonial") },
  ];

  const services = [
    { name: t["service-personal"], href: "#catalog" },
    { name: t["service-business"], href: "#catalog" },
    { name: t["service-mortgage"], href: "#catalog" },
    { name: t["service-vehicle"], href: "#catalog" },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: "https://instagram.com", color: "hover:bg-gradient-to-r hover:from-[#EBAD25] hover:to-[#2563EB]" },
    { icon: FaFacebookF, href: "https://facebook.com", color: "hover:bg-[#2563EB]" },
    { icon: FaYoutube, href: "https://youtube.com", color: "hover:bg-red-600" },
    { icon: FaTiktok, href: "https://tiktok.com", color: "hover:bg-black" },
    // { icon: FaWhatsapp, href: "https://wa.me/", color: "hover:bg-green-500" },
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: gold }}>
                  My Solution Lending
                </h3>
                <p className="text-gray-400 text-sm">
                  {t["tagline"]}
                </p>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {t["description"]}
              </p>

              {/* Key Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4" style={{ color: gold }} />
                  <span>{t["feature-1"]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4" style={{ color: gold }} />
                  <span>{t["feature-2"]}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4" style={{ color: gold }} />
                  <span>{t["feature-3"]}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                {/* <a
                  href="https://wa.me/6281234567890"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: gold }} />
                  <span>{t["phone"]}</span>
                </a> */}
                <a
                  href="mailto:support@mysolutionlending.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: gold }} />
                  <span>support@mysolutionlending.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t["quick-links"]}
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t["services"]}
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("catalog");
                      }}
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Operating Hours */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: gold }} />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{t["operating-hours"]}</p>
                    <p className="text-xs text-gray-400">{t["hours-detail"]}</p>
                    <p className="text-xs text-gray-400">{t["hours-detail-2"]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {t["legal-support"]}
              </h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                    {t["privacy-policy"]}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                    {t["terms"]}
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                    {t["faq"]}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue transition-colors"></span>
                    {t["contact"]}
                  </a>
                </li>
              </ul>

              {/* Trust Badge */}
              {/* <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5" style={{ color: gold }} />
                  <span className="text-sm font-semibold">{t["licensed"]}</span>
                </div>
                <p className="text-xs text-gray-400">{t["licensed-desc"]}</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Media */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-gray-400 text-sm">{t["follow-us"]}:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} My Solution Lending. {t["all-rights"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
