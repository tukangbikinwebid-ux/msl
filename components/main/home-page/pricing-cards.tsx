// components/sections/PricingCards.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Server, Globe, Shield } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility untuk menggabungkan class tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data Pricing (Domain & Server)
const pricingPlans = [
  {
    type: "Domain",
    tag: ".com",
    title: "Global Identity",
    description: "Bangun reputasi internasional untuk portofolio coding Anda.",
    price: "145.000",
    originalPrice: "185.000",
    badge: "POPULER",
    icon: Globe,
    features: [
      "Full DNS Control",
      "Privacy Protection",
      "Gratis Email Forwarding",
    ],
    isBestValue: false,
  },
  {
    type: "VPS",
    tag: "Cloud NVMe",
    title: "Solo Coding Pro",
    description:
      "Server performa tinggi untuk deploy aplikasi Next.js & Docker.",
    price: "850.000",
    originalPrice: "1.200.000",
    badge: "HEMAT 30%",
    icon: Server,
    features: [
      "4 vCPU & 8GB RAM",
      "NVMe SSD Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
    ],
    isBestValue: true, // Akan menggunakan warna Gold
  },
  {
    type: "Domain",
    tag: ".id",
    title: "Local Presence",
    description: "Tunjukkan identitas kreator Indonesia yang profesional.",
    price: "220.000",
    originalPrice: "250.000",
    badge: "TERPERCAYA",
    icon: Shield,
    features: [
      "SEO Friendly (Lokal)",
      "Persyaratan Mudah",
      "Instant Activation",
    ],
    isBestValue: false,
  },
];

export default function PricingCards() {
  // Warna custom
  const colors = {
    gold: "#EBAD25",
    blue: "#2563EB",
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 px-4 md:px-8">
      {/* Background decoration (Subtle dots) */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#2563EB 0.5px, transparent 0.5px), radial-gradient(#2563EB 0.5px, #ffffff 0.5px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-2 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold tracking-wider"
            style={{ color: colors.blue }}
          >
            PAKET HARGA SOLIDER
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Solusi Tepat,{" "}
            <span style={{ color: colors.blue }}>Code Melesat!</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Pilihan domain dan server terbaik untuk mendukung perjalanan solo
            coding Anda. Tanpa biaya tersembunyi, performa maksimal.
          </p>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger animation
              className={cn(
                "group relative flex flex-col rounded-3xl border bg-white p-8 transition-all hover:shadow-2xl",
                plan.isBestValue
                  ? "border-2 shadow-xl scale-105 z-10"
                  : "border-gray-200 hover:-translate-y-2"
              )}
              style={{
                borderColor: plan.isBestValue ? colors.gold : undefined,
              }}
            >
              {/* Badge Top Left (Domain/Type) */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                  <span className="rounded-full bg-white p-1 shadow-sm">
                    <plan.icon size={14} className="text-gray-700" />
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {plan.type}{" "}
                    <span style={{ color: colors.blue }}>{plan.tag}</span>
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-2 flex items-baseline gap-2">
                <h3 className="text-4xl font-extrabold text-gray-900">
                  Rp {plan.price}
                </h3>
                <span className="text-sm font-medium text-gray-500">/thn</span>
              </div>

              {/* Discount / Strikethrough */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm text-gray-400 line-through decoration-red-500">
                  Rp {plan.originalPrice}
                </span>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                  style={{ backgroundColor: colors.gold }}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Plan Title & Desc */}
              <div className="mb-8">
                <h4 className="mb-2 text-xl font-bold text-gray-900">
                  {plan.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-500">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: plan.isBestValue
                          ? colors.gold
                          : "#E0E7FF",
                      }} // Light blue or Gold
                    >
                      <Check
                        size={12}
                        className={
                          plan.isBestValue ? "text-white" : "text-blue-600"
                        }
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="relative w-full overflow-hidden rounded-xl py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg active:scale-95"
                style={{ backgroundColor: colors.blue }}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative z-10">Pilih Paket Ini</span>
              </button>

              {/* Special Glow for Best Value */}
              {plan.isBestValue && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg"
                  style={{ backgroundColor: colors.gold }}
                >
                  BEST CHOICE
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}