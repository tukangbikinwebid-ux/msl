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
import { X } from "lucide-react";

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
          const { meta_pixel, promo_text: apiPromoText, running_text: apiRunningText } = data.data;

          // Set Meta Pixel ID
          if (meta_pixel && meta_pixel.trim() !== "") {
            setMetaPixelId(meta_pixel);
          } else {
            console.warn("Meta Pixel ID not found in API response, using fallback");
            setMetaPixelId(DUMMY_META_PIXEL_ID);
          }

          // PromoBanner: ambil dari data.data.promo_text
          if (apiPromoText && apiPromoText.trim() !== "") {
            setPromoText(apiPromoText);
          }

          // RunningText: ambil dari data.data.running_text
          if (apiRunningText && apiRunningText.trim() !== "") {
            setRunningText(apiRunningText);
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
      </div>

      {/* LiveChat.com Widget Script - appears at bottom right */}
      {!isLoginPage && (
        <>
          <Script
            id="livechat-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.__lc = window.__lc || {};
                window.__lc.license = 19474474;
                window.__lc.integration_name = "manual_onboarding";
                window.__lc.product_name = "livechat";
                ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
              `,
            }}
          />
          <noscript>
            <a href="https://www.livechat.com/chat-with/19474474/" rel="nofollow">Chat with us</a>, powered by{" "}
            <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
              LiveChat
            </a>
          </noscript>
        </>
      )}
    </LanguageProvider>
  );
}
