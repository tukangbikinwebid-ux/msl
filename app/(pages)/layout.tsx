"use client";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Footer from "@/components/footer/footer";
import TopHeader from "@/components/header/top-header";
import CartSidebar from "@/components/main/product-page/cart-sidebar";
import ScrollToTopButton from "@/components/ui/scroll-top-button";
import useCart from "@/hooks/use-cart";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Script from "next/script";
import { MessageCircle, X } from "lucide-react";

// Dummy/fallback Meta Pixel ID jika API tidak tersedia
const DUMMY_META_PIXEL_ID = "1234567890123456";

interface SettingsResponse {
  code: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    meta_pixel?: string;
    promo_text?: string | null;
    running_text?: string | null;
    landing_page?: {
      why_content?: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
  };
}

// LiveChat Widget Component
const LiveChatWidget = ({ phone }: { phone: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const whatsappNumber = phone.replace(/[^0-9]/g, "");
    const formattedNumber = whatsappNumber.startsWith("0") 
      ? "60" + whatsappNumber.substring(1) 
      : whatsappNumber;
    const message = encodeURIComponent("Halo, saya ingin bertanya tentang pinjaman di My Solution Lending");
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">My Solution Lending</h3>
                  <p className="text-xs text-white/80">Customer Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-4">
            <div className="bg-gray-100 rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-700">
                Hai! Ada yang bisa kami bantu? Klik tombol di bawah untuk chat dengan tim kami via WhatsApp.
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat via WhatsApp
            </button>
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-100 p-3 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Balasan cepat • Senin - Jumat, 09:00 - 18:00
            </p>
          </div>
        </div>
      )}
      
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? "bg-gray-600 hover:bg-gray-700" 
            : "bg-gradient-to-r from-[#2563EB] to-[#1E40AF] hover:shadow-xl"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
      
      {/* Pulse animation when closed */}
      {!isOpen && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      )}
      {!isOpen && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full" />
      )}
    </div>
  );
};

// Running Text Component
const RunningText = ({ text }: { text: string }) => {
  const repeatedText = `${text} • ${text} • ${text} • `;
  
  return (
    <div className="bg-[#EBAD25] text-white py-2 overflow-hidden">
      <div className="marquee whitespace-nowrap">
        <span className="inline-block px-4 text-sm font-medium">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

// Promo Banner Component
const PromoBanner = ({ text, onClose }: { text: string; onClose: () => void }) => {
  return (
    <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white py-3 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-sm font-medium text-center pr-8">{text}</p>
        <button 
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close, cartItems, removeItem } = useCart();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isWisataPage = pathname === "/wisata" || pathname === "/profile";
  
  const [metaPixelId, setMetaPixelId] = useState<string>(DUMMY_META_PIXEL_ID);
  const [isPixelReady, setIsPixelReady] = useState(false);
  const [promoText, setPromoText] = useState<string | null>(null);
  const [runningText, setRunningText] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("081234567890");

  // Fetch Settings dari API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://cms.mysolutionlending.com/api/v1/settings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data: SettingsResponse = await response.json();
        
        if (data.code === 200 && data.data) {
          // Set Meta Pixel ID
          const pixelId = data.data.meta_pixel;
          if (pixelId && pixelId.trim() !== "") {
            setMetaPixelId(pixelId);
          } else {
            console.warn("Meta Pixel ID not found in API response, using fallback");
            setMetaPixelId(DUMMY_META_PIXEL_ID);
          }
          
          // Set Promo Text
          if (data.data.promo_text && data.data.promo_text.trim() !== "") {
            setPromoText(data.data.promo_text);
          }
          
          // Set Running Text
          if (data.data.running_text && data.data.running_text.trim() !== "") {
            setRunningText(data.data.running_text);
          }
          
          // Set Phone Number for LiveChat
          if (data.data.phone) {
            setPhoneNumber(data.data.phone);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch settings, using fallback:", error);
        setMetaPixelId(DUMMY_META_PIXEL_ID);
      } finally {
        setIsPixelReady(true);
      }
    };

    fetchSettings();
  }, []);

  return (
    <LanguageProvider>
      {/* Meta Pixel Script */}
      {isPixelReady && metaPixelId && (
        <>
          <Script
            id="meta-pixel-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      <div className="w-full bg-white">
        {/* Promo Banner */}
        {!isLoginPage && promoText && showPromo && (
          <PromoBanner text={promoText} onClose={() => setShowPromo(false)} />
        )}
        
        {/* Running Text */}
        {!isLoginPage && runningText && (
          <RunningText text={runningText} />
        )}
        
        {!isLoginPage && (
          <header className="sticky top-0 z-50">
            <TopHeader />
          </header>
        )}

        {/* Padding-top untuk menghindari content ketutupan header saat fixed */}
        <main className={clsx(!isLoginPage && isWisataPage && "pt-20")}>
          {children}
        </main>

        {/* Pass all necessary props to CartSidebar */}
        {/* <CartSidebar
          isOpen={isOpen}
          onClose={close}
          items={cartItems} // Changed from 'cartItems' to 'items'
          onRemove={removeItem}
        /> */}

        {!isLoginPage && (
          <>
            <ScrollToTopButton />
            <Footer />
          </>
        )}
        
        {/* LiveChat Widget - appears at bottom right */}
        {!isLoginPage && (
          <LiveChatWidget phone={phoneNumber} />
        )}
      </div>
    </LanguageProvider>
  );
}
