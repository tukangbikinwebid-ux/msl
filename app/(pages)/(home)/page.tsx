"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import en from "@/translations/home/en";
import id from "@/translations/home/id";
import { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useGetProductMerkListQuery,
  useGetProductMerkBySlugQuery,
} from "@/services/products-merk.service";
import type { ProductMerk } from "@/types/master/product-merk";

import { useGetProductListQuery } from "@/services/product.service";
import type { Product } from "@/types/admin/product";
import DotdLoader from "@/components/loader/3dot";
import { fredoka, sniglet } from "@/lib/fonts";
import ImageCarousel from "@/components/main/home-page/caraousel-hero";
import Swal from "sweetalert2";
import HeroSection from "@/components/main/home-page/hero-section";
import SoloCodingSection from "@/components/main/home-page/categories";
import TestimonialsSection from "@/components/main/home-page/testimonials";
import ArticleSection from "@/components/main/home-page/article";
import GlobalMarketCta from "@/components/main/home-page/global-market-cta";
import SoloCodingCta from "@/components/main/home-page/solo-coding-cta";
import PricingSection from "@/components/main/home-page/pricing-cards";

export default function HomePage() {
  const router = useRouter();
  const t = useTranslation({ en, id });

  // ========== Local UI states ==========
  const [page, setPage] = useState<number>(1);
  const paginate = 8;

  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // ========== Fetch list of categories with pagination ==========
  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
  } = useGetProductMerkListQuery({ page, paginate });

  // mapping hasil ke variabel categories (TETAP)
  const categories: ProductMerk[] = useMemo(
    () => listData?.data ?? [],
    [listData]
  );

  const lastPage = listData?.last_page ?? 1;
  const currentPage = listData?.current_page ?? 1;
  const total = listData?.total ?? 0;

  // ========== Fetch detail by slug when modal open ==========
  const { data: detailData, isLoading: isDetailLoading } =
    useGetProductMerkBySlugQuery(selectedSlug ?? "", {
      skip: !selectedSlug,
    });

  const handleOpenDetail = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setOpenDetail(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setOpenDetail(false);
    setTimeout(() => setSelectedSlug(null), 150);
  }, []);

  // ====== Static content (tidak diubah) ======
  const features = [
    {
      icon: "/images/advantage/advantage-1.png",
      title: t["sec-3-item-1-title"],
      description: t["sec-3-item-1-content"],
    },
    {
      icon: "/images/advantage/advantage-2.png",
      title: t["sec-3-item-2-title"],
      description: t["sec-3-item-2-content"],
    },
    {
      icon: "/images/advantage/advantage-3.png",
      title: t["sec-3-item-3-title"],
      description: t["sec-3-item-3-content"],
    },
    {
      icon: "/images/advantage/advantage-4.png",
      title: t["sec-3-item-4-title"],
      description: t["sec-3-item-4-content"],
    },
  ];

  // ====== Helper UI ======
  const gradientByIndex = (i: number) => {
    const list = [
      "from-emerald-500 to-teal-500",
      "from-lime-500 to-green-500",
      "from-pink-500 to-rose-500",
      "from-cyan-500 to-blue-500",
      "from-violet-500 to-purple-500",
      "from-amber-500 to-orange-500",
      "from-sky-500 to-indigo-500",
      "from-fuchsia-500 to-pink-500",
    ];
    return list[i % list.length];
  };

  const safeCategoryImg = (img: ProductMerk["image"]) =>
    typeof img === "string" && img.length > 0 ? img : "/kategori.webp";

  const formatIDR = (value: number | string) => {
    const num = typeof value === "string" ? Number(value) : value ?? 0;
    if (!Number.isFinite(num)) return "Rp 0";
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  const safeProductImg = (img: Product["image"]) =>
    typeof img === "string" && img.length > 0 ? img : "/produk-1.webp";

  const makeBadge = (p: Product) =>
    p.terlaris ? "Best Seller" : p.terbaru ? "New" : "Produk";

  const toInt = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  // ====== Produk (maks 3) ======
  const {
    data: productList,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductListQuery({ page: 1, paginate: 3 });

  const topProducts: Product[] = useMemo(
    () => productList?.data ?? [],
    [productList]
  );

  // ====== Tambah ke Keranjang (localStorage: "cart-storage") ======
  const CART_KEY = "cart-storage";
  type CartStorage = {
    state: {
      isOpen: boolean;
      cartItems: Array<Product & { quantity: number }>;
    };
    version: number;
  };

  const addToCart = (product: Product, qty: number = 1) => {
    if (typeof window === "undefined") return;

    let cartData: CartStorage = {
      state: { isOpen: false, cartItems: [] },
      version: 0,
    };

    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        cartData = JSON.parse(raw) as CartStorage;
        // fallback ringan jika struktur lama/berbeda
        if (!cartData?.state || !Array.isArray(cartData.state.cartItems)) {
          cartData = { state: { isOpen: false, cartItems: [] }, version: 0 };
        }
      }
    } catch {
      cartData = { state: { isOpen: false, cartItems: [] }, version: 0 };
    }

    const idx = cartData.state.cartItems.findIndex((i) => i.id === product.id);

    if (idx >= 0) {
      // tambah kuantitas pada item yang sudah ada
      cartData.state.cartItems[idx].quantity += qty;
    } else {
      // push full product data + quantity (menyamai contoh struktur)
      cartData.state.cartItems.push({
        ...product,
        quantity: qty,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartData));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    // Show SweetAlert at top-right corner with colorful effect
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Produk berhasil ditambahkan ke keranjang",
      position: "top-end", // Position it to the top-right
      toast: true, // Makes it appear as a toast
      showConfirmButton: false, // Hides the confirm button for a toast effect
      timer: 3000, // Time for the toast to stay before disappearing (in ms)
      timerProgressBar: true, // Adds a progress bar on the toast
      background: "white", // White background
      color: "#333", // Dark text color for contrast
      iconColor: "#ff5722", // Color for the success icon
      customClass: {
        popup: "toast-popup", // Custom class to style the popup if needed
      },
      willOpen: (toast) => {
        toast.style.background =
          "linear-gradient(45deg, #ff6ec7, #f7bb97, #f7b7d7, #ff9a8b, #ff8cdd)"; // Colorful gradient background
      },
    });
  };

  const data1 = {
    title: (
      <>
        Solusi Web e-Commerce, <br />
        Marketplace & Aplikasi <br />
        Siap Pakai
      </>
    ),
    subtitle: "Surganya web untuk bisnis UMKM dan Programmer. Tersedia juga Company Profile Premium.",
    promoText: "Mulai dari",
    promoPrice: "Rp199.000", // Harga contoh untuk template/source code
    discountedPrice: "Rp550.000",
    buttonText: "Lihat Katalog Web",
    // Ganti URL ini dengan URL gambar orang pertama yang diupload
    personImageUrl:
      "https://8nc5ppykod.ufs.sh/f/H265ZJJzf6brvez3grUCM8kgym3AN9S2oHUnjfpulaB7hxYP",
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection {...data1} />
      <SoloCodingSection />
      <PricingSection/>
      <TestimonialsSection />
      {/* CTA Section */}
      <SoloCodingCta />
    </div>
  );
}