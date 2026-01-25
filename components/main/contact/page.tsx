"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/contact/id";
import en from "@/translations/contact/en";
import ms from "@/translations/contact/ms";
import zh from "@/translations/contact/zh";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function ContactPage() {
  const t = useTranslation({ en, id, ms, zh });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blue = "#2563EB";
  const gold = "#EBAD25";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        icon: "success",
        title: t["form-submit-success"],
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: FaInstagram, href: "https://instagram.com", color: "hover:bg-gradient-to-r hover:from-[#EBAD25] hover:to-[#2563EB]" },
    { icon: FaFacebookF, href: "https://facebook.com", color: "hover:bg-[#2563EB]" },
    { icon: FaYoutube, href: "https://youtube.com", color: "hover:bg-red-600" },
    { icon: FaTiktok, href: "https://tiktok.com", color: "hover:bg-black" },
    { icon: FaWhatsapp, href: "https://wa.me/6281234567890", color: "hover:bg-green-500" },
  ];

  const quickLinks = [
    { name: t["quick-link-1"], href: "#catalog", onClick: () => scrollToSection("catalog") },
    { name: t["quick-link-2"], href: "#simulation", onClick: () => scrollToSection("simulation") },
    { name: t["quick-link-3"], href: "/cek-order" },
    { name: t["quick-link-4"], href: "#" },
  ];

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
                <MessageCircle className="w-8 h-8" />
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t["form-title"]}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t["form-name"]}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t["form-name-placeholder"]}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t["form-email"]}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t["form-email-placeholder"]}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t["form-phone"]}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t["form-phone-placeholder"]}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t["form-subject"]}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      >
                        <option value="">{t["form-subject-placeholder"]}</option>
                        <option value="general">{t["form-subject-option-1"]}</option>
                        <option value="application">{t["form-subject-option-2"]}</option>
                        <option value="payment">{t["form-subject-option-3"]}</option>
                        <option value="complaint">{t["form-subject-option-4"]}</option>
                        <option value="partnership">{t["form-subject-option-5"]}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t["form-message"]}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t["form-message-placeholder"]}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg font-bold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: blue }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t["form-submit"]}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t["contact-info-title"]}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: blue }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t["contact-address"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-address-value"]}
                      </p>
                    </div>
                  </div>

                  <a
                    href="tel:+6281234567890"
                    className="flex items-start gap-4 hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Phone className="w-5 h-5" style={{ color: blue }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t["contact-phone"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-phone-value"]}
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:support@mysolutionlending.com"
                    className="flex items-start gap-4 hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Mail className="w-5 h-5" style={{ color: blue }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t["contact-email"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-email-value"]}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${blue}15` }}
                    >
                      <Clock className="w-5 h-5" style={{ color: blue }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {t["contact-hours"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-hours-value"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-hours-value-2"]}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t["contact-hours-value-3"]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t["quick-links-title"]}
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors group"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          {link.name}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors group"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t["social-title"]}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} text-white`}
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
