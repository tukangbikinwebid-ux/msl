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
import ImageCarousel from "./caraousel-hero";
import Swal from "sweetalert2";
import HeroSection from "./hero-section";
import SoloCodingSection from "./categories";
import TestimonialsSection from "./testimonials";
import ArticleSection from "./article";
import GlobalMarketCta from "./global-market-cta";
import SoloCodingCta from "./solo-coding-cta";

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
        Kembangkan bisnis <br />
        UMKM dan Ekspor <br />
        dengan Website
      </>
    ),
    subtitle: "Dapatkan domain murah dan layanan hosting terpercaya.",
    promoText: "/tahun",
    promoPrice: "Rp97.000",
    discountedPrice: "Rp245.000",
    buttonText: "Cari Domain",
    // Ganti URL ini dengan URL gambar orang pertama yang diupload
    personImageUrl:
      "https://8nc5ppykod.ufs.sh/f/H265ZJJzf6brvez3grUCM8kgym3AN9S2oHUnjfpulaB7hxYP",
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection {...data1} />
      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-sky-400/30 to-[#DFF19D]"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full opacity-80 animate-pulse shadow-lg"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-80 animate-pulse delay-1000 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-lime-500 to-green-500 rounded-full opacity-70 animate-pulse delay-500 shadow-lg"></div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg">
                <Image
                  src="https://8nc5ppykod.ufs.sh/f/H265ZJJzf6brl2xfj3HmgY8fkG9iJeAzFQyqLh5pudMZH7l2"
                  alt="Logo"
                  width={15}
                  height={15}
                />
                <span className={`text-sm font-medium ${sniglet.className}`}>
                  Eco Friendly & Enriching
                </span>
              </div>

              <h1
                className={`${fredoka.className} text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight`}
              >
                {t["hero-title-1"]}
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t["hero-title-2"]}
                </span>
                <span className="block bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {t["hero-title-3"]}
                </span>
              </h1>

              <p
                className={`text-xl text-gray-600 max-w-xl ${sniglet.className}`}
              >
                {t["hero-subtitle"]}
              </p>

              <div className="flex flex-col sm:flex-row pt-4">
                <button
                  onClick={() => router.push("/product")}
                  className="w-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {t["hero-cta"]}
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full border-2 border-white shadow-md"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">
                    1000+ {t["hero-other-1"]}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1 font-semibold">
                    4.9/5 Rating
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <ImageCarousel />
                <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2 text-white">
                    <Image
                      src="https://8nc5ppykod.ufs.sh/f/H265ZJJzf6brUEfLy3BWSPehBoYMr1DQnmd5C42qTFw3NOEk"
                      alt="Leaf"
                      width={20}
                      height={20}
                    />
                    <span
                      className={`font-semibold text-sm ${sniglet.className}`}
                    >
                      Plant Based Colorant
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-white/90">
                    {t["hero-other-2"]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ===================== Categories Section (Dynamic via Service) ===================== */}
      <SoloCodingSection />
      <TestimonialsSection />
      <ArticleSection />
      <GlobalMarketCta />

      {/* CTA Section */}
      <SoloCodingCta />
    </div>
  );
}
