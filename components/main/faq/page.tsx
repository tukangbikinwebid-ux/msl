"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/faq/id";
import en from "@/translations/faq/en";
import ms from "@/translations/faq/ms";
import zh from "@/translations/faq/zh";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  CreditCard,
  FileText,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FaqPage() {
  const t = useTranslation({ en, id, ms, zh });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const blue = "#2563EB";
  const gold = "#EBAD25";

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: t["faq-1-question"],
      answer: t["faq-1-answer"],
      category: "application",
    },
    {
      id: 2,
      question: t["faq-2-question"],
      answer: t["faq-2-answer"],
      category: "application",
    },
    {
      id: 3,
      question: t["faq-3-question"],
      answer: t["faq-3-answer"],
      category: "requirements",
    },
    {
      id: 4,
      question: t["faq-4-question"],
      answer: t["faq-4-answer"],
      category: "general",
    },
    {
      id: 5,
      question: t["faq-5-question"],
      answer: t["faq-5-answer"],
      category: "application",
    },
    {
      id: 6,
      question: t["faq-6-question"],
      answer: t["faq-6-answer"],
      category: "payment",
    },
    {
      id: 7,
      question: t["faq-7-question"],
      answer: t["faq-7-answer"],
      category: "payment",
    },
    {
      id: 8,
      question: t["faq-8-question"],
      answer: t["faq-8-answer"],
      category: "payment",
    },
    {
      id: 9,
      question: t["faq-9-question"],
      answer: t["faq-9-answer"],
      category: "general",
    },
    {
      id: 10,
      question: t["faq-10-question"],
      answer: t["faq-10-answer"],
      category: "application",
    },
    {
      id: 11,
      question: t["faq-11-question"],
      answer: t["faq-11-answer"],
      category: "general",
    },
    {
      id: 12,
      question: t["faq-12-question"],
      answer: t["faq-12-answer"],
      category: "general",
    },
  ];

  const categories = [
    { id: "all", name: t["category-all"], icon: HelpCircle },
    { id: "application", name: t["category-application"], icon: FileText },
    { id: "payment", name: t["category-payment"], icon: CreditCard },
    { id: "requirements", name: t["category-requirements"], icon: Shield },
    { id: "general", name: t["category-general"], icon: MessageCircle },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, faqs]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
                <HelpCircle className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                {t["title"]}
              </h1>
              <p className="text-blue-100 text-lg">
                {t["subtitle"]}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t["search-placeholder"]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openItems.includes(faq.id);
                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl border border-gray-200 p-12 text-center"
                >
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t["no-results"]}
                  </h3>
                  <p className="text-gray-600">
                    {t["no-results-desc"]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-blue-100 mb-6">
              Tim customer service kami siap membantu Anda 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors border border-blue-400"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
