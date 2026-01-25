"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/privacy-policy/id";
import en from "@/translations/privacy-policy/en";
import ms from "@/translations/privacy-policy/ms";
import zh from "@/translations/privacy-policy/zh";
import {
  Shield,
  Database,
  Eye,
  Lock,
  Share2,
  UserCheck,
  Cookie,
  Clock,
  FileText,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  const t = useTranslation({ en, id, ms, zh });
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const blue = "#2563EB";
  const gold = "#EBAD25";

  const sections = [
    { id: "section-1", icon: Database, title: t["section-1-title"] },
    { id: "section-2", icon: Eye, title: t["section-2-title"] },
    { id: "section-3", icon: Lock, title: t["section-3-title"] },
    { id: "section-4", icon: Share2, title: t["section-4-title"] },
    { id: "section-5", icon: UserCheck, title: t["section-5-title"] },
    { id: "section-6", icon: Cookie, title: t["section-6-title"] },
    { id: "section-7", icon: Clock, title: t["section-7-title"] },
    { id: "section-8", icon: FileText, title: t["section-8-title"] },
    { id: "section-9", icon: Mail, title: t["section-9-title"] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                {t["title"]}
              </h1>
              <p className="text-blue-100 text-lg mb-2">
                {t["last-updated"]}: {currentDate}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Daftar Isi
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{section.title}</span>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                {/* Introduction */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t["intro"]}
                  </p>
                </motion.div>

                {/* Section 1 */}
                <section
                  id="section-1"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Database className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-1-title"]}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {t["section-1-desc"]}
                      </p>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4].map((num) => (
                          <li
                            key={num}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: gold }}
                            />
                            <span>{t[`section-1-item-${num}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section
                  id="section-2"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Eye className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-2-title"]}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {t["section-2-desc"]}
                      </p>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <li
                            key={num}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: gold }}
                            />
                            <span>{t[`section-2-item-${num}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section
                  id="section-3"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Lock className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-3-title"]}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {t["section-3-desc"]}
                      </p>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4].map((num) => (
                          <li
                            key={num}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: gold }}
                            />
                            <span>{t[`section-3-item-${num}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section
                  id="section-4"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Share2 className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-4-title"]}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {t["section-4-desc"]}
                      </p>
                      <ul className="space-y-3 mb-4">
                        {[1, 2, 3].map((num) => (
                          <li
                            key={num}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: gold }}
                            />
                            <span>{t[`section-4-item-${num}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                        <p className="text-sm text-blue-800 font-medium">
                          {t["section-4-note"]}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section
                  id="section-5"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <UserCheck className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-5-title"]}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {t["section-5-desc"]}
                      </p>
                      <ul className="space-y-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <li
                            key={num}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: gold }}
                            />
                            <span>{t[`section-5-item-${num}` as keyof typeof t]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section
                  id="section-6"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Cookie className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-6-title"]}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {t["section-6-desc"]}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 7 */}
                <section
                  id="section-7"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Clock className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-7-title"]}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {t["section-7-desc"]}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section
                  id="section-8"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <FileText className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-8-title"]}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {t["section-8-desc"]}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 9 - Contact */}
                <section
                  id="section-9"
                  className="mb-12 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Mail className="w-6 h-6" style={{ color: blue }} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t["section-9-title"]}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {t["section-9-desc"]}
                      </p>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 space-y-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="p-3 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${blue}20` }}
                          >
                            <Mail className="w-5 h-5" style={{ color: blue }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <a
                              href="mailto:privacy@mysolutionlending.com"
                              className="text-blue-700 font-semibold hover:underline"
                            >
                              {t["contact-email"]}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div
                            className="p-3 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${blue}20` }}
                          >
                            <Phone className="w-5 h-5" style={{ color: blue }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Telepon</p>
                            <a
                              href="tel:+6281234567890"
                              className="text-blue-700 font-semibold hover:underline"
                            >
                              {t["contact-phone"]}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div
                            className="p-3 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${blue}20` }}
                          >
                            <MapPin className="w-5 h-5" style={{ color: blue }} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Alamat</p>
                            <p className="text-blue-700 font-semibold">
                              {t["contact-address"]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer Note */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-sm">
                      {t["last-updated"]}: {currentDate}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      My Solution Lending berkomitmen untuk melindungi privasi dan data pribadi Anda.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
