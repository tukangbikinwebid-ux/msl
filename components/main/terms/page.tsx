"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/terms/id";
import en from "@/translations/terms/en";
import ms from "@/translations/terms/ms";
import zh from "@/translations/terms/zh";
import {
  FileText,
  UserCheck,
  BookOpen,
  CheckCircle,
  CreditCard,
  DollarSign,
  AlertCircle,
  Shield,
  RefreshCw,
  Scale,
  Mail,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  const t = useTranslation({ en, id, ms, zh });
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const blue = "#2563EB";
  const gold = "#EBAD25";

  const sections = [
    { id: "section-1", icon: CheckCircle, title: t["section-1-title"] },
    { id: "section-2", icon: BookOpen, title: t["section-2-title"] },
    { id: "section-3", icon: UserCheck, title: t["section-3-title"] },
    { id: "section-4", icon: CreditCard, title: t["section-4-title"] },
    { id: "section-5", icon: DollarSign, title: t["section-5-title"] },
    { id: "section-6", icon: CheckCircle, title: t["section-6-title"] },
    { id: "section-7", icon: AlertCircle, title: t["section-7-title"] },
    { id: "section-8", icon: Shield, title: t["section-8-title"] },
    { id: "section-9", icon: RefreshCw, title: t["section-9-title"] },
    { id: "section-10", icon: Scale, title: t["section-10-title"] },
    { id: "section-11", icon: Mail, title: t["section-11-title"] },
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
                <FileText className="w-8 h-8" />
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
                  <nav className="space-y-2 max-h-[600px] overflow-y-auto">
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

                {/* Sections */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
                  const section = sections[num - 1];
                  const Icon = section.icon;
                  const itemCounts: { [key: number]: number } = {
                    2: 4, 3: 5, 4: 5, 5: 4, 6: 4, 7: 3, 8: 3,
                  };
                  const itemCount = itemCounts[num] || 0;

                  return (
                    <section
                      key={num}
                      id={`section-${num}`}
                      className="mb-12 scroll-mt-24"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{ backgroundColor: `${blue}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: blue }} />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {t[`section-${num}-title` as keyof typeof t]}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {t[`section-${num}-desc` as keyof typeof t]}
                          </p>
                          {itemCount > 0 && (
                            <ul className="space-y-3">
                              {Array.from({ length: itemCount }).map((_, i) => {
                                const itemKey = `section-${num}-item-${i + 1}` as keyof typeof t;
                                const itemText = t[itemKey];
                                if (!itemText) return null;
                                return (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-gray-700"
                                  >
                                    <div
                                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                      style={{ backgroundColor: gold }}
                                    />
                                    <span>{itemText}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </section>
                  );
                })}

                {/* Footer Note */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600 text-sm">
                      {t["last-updated"]}: {currentDate}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      Dengan menggunakan layanan My Solution Lending, Anda menyetujui Syarat & Ketentuan ini.
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
