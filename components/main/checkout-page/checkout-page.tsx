"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from "@paypal/react-paypal-js"; // Import PayPal
import { 
  ShoppingBag,
  CreditCard,
  User,
  MapPin,
  Truck,
  Gift,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Sparkles,
  Shield,
  Package,
  Heart,
  Edit3,
  TicketPercent,
  XCircle
} from "lucide-react";

// --- INTERFACES ---
interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

export default function CheckoutPage() {
  // --- KONFIGURASI PAYPAL ---
  const paypalOptions: ReactPayPalScriptOptions = {
    clientId: "ATHZHj3Se_yg5pLJMDBudBQRRBH5m0r9ofDnhiUJqnuzCq2cbHsGbk_0M1yplEgg1lRwtm3e0LGafVXU",
    currency: "USD",
    intent: "capture",
  };

  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false); // State status pembayaran
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "Soni Setiawan", email: "soni.setiawan.it07@gmail.com", phone: "082112879521", address: "Toli-toli", city: "Toli Toli", postalCode: "95411", province: ""
  });
  const [selectedShipping, setSelectedShipping] = useState("regular");
  
  // Voucher States
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, amount: number} | null>(null);
  const [voucherError, setVoucherError] = useState("");

  // --- DATA DUMMY ---
  const checkoutItems: CheckoutItem[] = [
    {
      id: 1,
      name: "Eco Paint Set Premium",
      price: 10000,
      image: "/api/placeholder/300/300",
      quantity: 1,
      category: "Art Supplies",
    },
  ];

  const shippingOptions = [
    { id: "regular", name: "Pengiriman Reguler", duration: "5-7 hari kerja", price: 3000, description: "JNE, TIKI, J&T" },
    { id: "express", name: "Pengiriman Express", duration: "2-3 hari kerja", price: 3000, description: "Same day delivery" },
    { id: "free", name: "Gratis Ongkir", duration: "5-7 hari kerja", price: 0, description: "Min. belanja Rp 250rb" }
  ];

  const steps = [
    { id: 1, title: "Informasi", icon: <User className="w-5 h-5" /> },
    { id: 2, title: "Pengiriman", icon: <Truck className="w-5 h-5" /> },
    { id: 3, title: "Pembayaran", icon: <CreditCard className="w-5 h-5" /> }, // PayPal Step
    { id: 4, title: "Selesai", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  // --- CALCULATIONS ---
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= 250000 ? 0 : shippingOptions.find(opt => opt.id === selectedShipping)?.price || 0;
  const discountAmount = appliedVoucher ? appliedVoucher.amount : 0;
  
  // Total dalam IDR
  const totalIDR = Math.max(0, subtotal + shippingCost - discountAmount);
  
  // Konversi kasar ke USD untuk PayPal (karena Sandbox default sering USD)
  // Dalam production, gunakan currency IDR jika akun PayPal Anda mendukungnya
  const exchangeRate = 16000; 
  const totalUSD = (totalIDR / exchangeRate).toFixed(2);

  // --- HANDLERS ---
  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyVoucher = () => {
    setVoucherError("");
    if (!voucherCode) {
      setVoucherError("Masukkan kode voucher");
      return;
    }
    if (voucherCode.toUpperCase() === "HEMAT50") {
      setAppliedVoucher({ code: "HEMAT50", amount: 50000 });
      setVoucherCode("");
    } else {
      setVoucherError("Kode voucher tidak valid");
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1: return !!(shippingInfo.fullName && shippingInfo.email && shippingInfo.phone);
      case 2: return !!(shippingInfo.address && shippingInfo.city);
      case 3: return isPaid; // Step 3 valid jika sudah bayar
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-gradient-to-br from-white to-[#DFF19D]/10 pt-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 pb-12">
          
          {/* Header */}
          <div className="mb-8">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#A3B18A] transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" /> Kembali
            </button>
            <div className="text-center">
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                Selesaikan <span className="text-[#A3B18A]">Pesanan</span>
              </h1>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl p-6 shadow-lg mx-auto max-w-4xl">
              <div className="flex items-center justify-between relative">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10 w-1/4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentStep >= step.id ? "bg-[#A3B18A] text-white shadow-lg" : "bg-gray-100 text-gray-500"
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.icon}
                    </div>
                    <span className={`text-xs md:text-sm font-medium mt-2 text-center ${
                      currentStep >= step.id ? "text-[#A3B18A]" : "text-gray-400"
                    }`}>{step.title}</span>
                  </div>
                ))}
                {/* Line */}
                <div className="absolute top-5 md:top-6 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full">
                  <div className="h-full bg-[#A3B18A] transition-all duration-500 rounded-full" style={{ width: `${((currentStep - 1) / 3) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMN 1: FORM */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                
                {/* Step 1: Informasi */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#A3B18A]" /> Informasi Kontak
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" value={shippingInfo.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Nama Lengkap" />
                      <input type="email" value={shippingInfo.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Email" />
                      <input type="tel" value={shippingInfo.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Nomor Telepon" />
                    </div>
                  </div>
                )}

                {/* Step 2: Pengiriman */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#A3B18A]" /> Alamat Pengiriman
                    </h2>
                    <textarea value={shippingInfo.address} onChange={(e) => handleInputChange("address", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Alamat Lengkap" rows={2} />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" value={shippingInfo.city} onChange={(e) => handleInputChange("city", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Kota" />
                      <input type="text" value={shippingInfo.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-[#A3B18A]" placeholder="Kode Pos" />
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mt-4">Pilih Kurir</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <div key={option.id} onClick={() => setSelectedShipping(option.id)}
                          className={`p-4 border-2 rounded-2xl cursor-pointer flex justify-between items-center ${
                            selectedShipping === option.id ? "border-[#A3B18A] bg-[#A3B18A]/5" : "border-gray-100"
                          }`}>
                          <div>
                            <p className="font-bold">{option.name}</p>
                            <p className="text-xs text-gray-500">{option.duration}</p>
                          </div>
                          <span className="font-bold text-[#A3B18A]">{option.price === 0 ? "GRATIS" : `Rp ${option.price.toLocaleString('id-ID')}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Pembayaran PayPal */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                     <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-[#A3B18A]" /> Pembayaran Aman
                    </h2>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                       <p className="text-sm text-blue-800">
                         Pilih tombol kuning untuk <b>PayPal</b> atau tombol hitam/putih untuk <b>Debit/Credit Card</b>. Transaksi Anda diamankan oleh PayPal.
                       </p>
                    </div>

                    {/* KOMPONEN PAYPAL BUTTONS */}
                    <div className="w-full max-w-md mx-auto relative z-0">
                      <PayPalButtons 
                        style={{ layout: "vertical", shape: "rect", borderRadius: 10 }}
                        forceReRender={[totalUSD]} // Re-render jika harga berubah
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                description: "Checkout Turu Store",
                                amount: {
                                  currency_code: "USD", // Gunakan USD untuk Sandbox, atau IDR jika akun live support
                                  value: totalUSD, 
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          setIsProcessing(true);
                          if (actions.order) {
                            const order = await actions.order.capture();
                            console.log("Order Successful:", order);
                            
                            // Simulasi sukses
                            setTimeout(() => {
                              setIsPaid(true);
                              setIsProcessing(false);
                              setCurrentStep(4); // Pindah ke halaman sukses
                            }, 1000);
                          }
                        }}
                        onError={(err) => {
                          console.error("PayPal Error:", err);
                          alert("Terjadi kesalahan pada pembayaran.");
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Sukses / Receipt */}
                {currentStep === 4 && (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
                    <p className="text-gray-500 mb-8">Terima kasih, pesanan Anda sedang kami proses.</p>
                    
                    <div className="bg-gray-50 rounded-2xl p-6 text-left max-w-md mx-auto">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">ID Pesanan</span>
                        <span className="font-mono font-bold">#ORD-{Math.floor(Math.random() * 10000)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Metode Bayar</span>
                        <span className="font-bold text-blue-600">PayPal / CC</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-200">
                        <span className="font-bold text-gray-900">Total Dibayar</span>
                        <span className="font-bold text-[#A3B18A]">Rp {totalIDR.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    
                    <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all font-bold">
                      Belanja Lagi
                    </button>
                  </div>
                )}

                {/* Navigation Buttons (Sembunyikan di Step 3 karena PayPal Button mengambil alih, dan Step 4 karena sudah selesai) */}
                {currentStep !== 3 && currentStep !== 4 && (
                  <div className="flex justify-between pt-8 mt-4 border-t border-gray-100">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 disabled:opacity-50 font-medium"
                    >
                      <ArrowLeft className="w-5 h-5" /> Kembali
                    </button>

                    <button
                      onClick={nextStep}
                      disabled={!validateStep()}
                      className="flex items-center gap-2 px-8 py-3 bg-[#A3B18A] text-white rounded-2xl hover:bg-[#A3B18A]/90 shadow-lg font-bold"
                    >
                      Selanjutnya <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
                
                {/* Tombol Back khusus untuk Step 3 (Posisi custom karena tombol Next dihilangkan) */}
                {currentStep === 3 && (
                   <div className="mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={prevStep}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 font-medium"
                      >
                        <ArrowLeft className="w-5 h-5" /> Ganti Metode Pengiriman
                      </button>
                   </div>
                )}
              </div>
            </div>

            {/* COLUMN 2: SIDEBAR */}
            <div className="space-y-6 sticky top-24">
              {/* Voucher & Summary Logic tetap sama seperti kode Anda sebelumnya */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#A3B18A]/20">
                <div className="flex items-center gap-2 mb-4">
                  <TicketPercent className="w-5 h-5 text-[#A3B18A]" />
                  <h3 className="font-bold text-gray-900">Voucher</h3>
                </div>
                {appliedVoucher ? (
                  <div className="bg-green-50 text-green-700 p-3 rounded-xl flex justify-between items-center">
                    <span>{appliedVoucher.code}</span>
                    <button onClick={() => setAppliedVoucher(null)}><XCircle className="w-5 h-5"/></button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} placeholder="Kode" className="flex-1 border p-2 rounded-xl" />
                    <button onClick={handleApplyVoucher} className="bg-gray-900 text-white px-4 rounded-xl">Pakai</button>
                  </div>
                )}
                {voucherError && <p className="text-red-500 text-xs mt-2">{voucherError}</p>}
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                   <ShoppingBag className="w-5 h-5 text-[#A3B18A]"/> Ringkasan
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                  <div className="flex justify-between"><span>Ongkir</span><span>Rp {shippingCost.toLocaleString('id-ID')}</span></div>
                  {appliedVoucher && <div className="flex justify-between text-green-600"><span>Diskon</span><span>-Rp {discountAmount.toLocaleString('id-ID')}</span></div>}
                  <div className="border-t pt-3 flex justify-between items-center font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span className="text-[#A3B18A]">Rp {totalIDR.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                     (Estimasi USD: ${totalUSD})
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}