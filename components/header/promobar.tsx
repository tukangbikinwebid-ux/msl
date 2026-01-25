// components/PromoBar.tsx
"use client";

import React from "react";
import { useTranslation } from "@/hooks/use-translation";
import id from "@/translations/promobar/id";
import en from "@/translations/promobar/en";
import ms from "@/translations/promobar/ms";
import zh from "@/translations/promobar/zh";

const PromoBar: React.FC = () => {
  const t = useTranslation({ en, id, ms, zh });

  // Data untuk pesan yang berjalan - sesuai brand My Solution Lending dengan i18n
  const scrollingMessages = [
    t["message-1"],
    t["message-2"],
    t["message-3"],
    t["message-4"],
    t["message-5"],
    t["message-6"],
  ];

  // Duplikasi teks untuk memastikan panjangnya cukup dan efek berjalan terus menerus
  const scrollingText = scrollingMessages.join(" • ");
  const repeatedText = `${scrollingText} • ${scrollingText} • `;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Container utama bar promo dengan warna gold My Solution Lending */}
      <div className="bg-[#EBAD25] text-white shadow-xl py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Bagian Kiri: Promo Code Fixed */}
          <div className="flex-shrink-0 font-bold tracking-wider text-sm md:text-base pr-4">
            <span className="text-yellow-200">{t["promo-label"]}</span>{" "}
            <span className="text-white">{t["promo-text"]}</span>{" "}
            <span className="text-yellow-200">{t["promo-subtext"]}</span>
          </div>

          {/* Bagian Kanan: Teks Berjalan (Marquee) */}
          <div className="flex-grow min-w-0 overflow-hidden text-sm">
            {/* Menggabungkan kelas Tailwind dengan kelas dari CSS Module */}
            <div className={`whitespace-nowrap marquee`}>
              {repeatedText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;