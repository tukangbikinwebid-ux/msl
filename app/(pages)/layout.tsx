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

// Dummy/fallback Meta Pixel ID jika API tidak tersedia
const DUMMY_META_PIXEL_ID = "1234567890123456";

interface ConfigurationResponse {
  data?: {
    meta_pixel_id?: string;
    facebook_pixel_id?: string;
    pixel_id?: string;
  };
  meta_pixel_id?: string;
  facebook_pixel_id?: string;
  pixel_id?: string;
}

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

  // Fetch Meta Pixel ID dari API
  useEffect(() => {
    const fetchConfiguration = async () => {
      try {
        const response = await fetch("https://cms.mysolutionlending.com/api/v1/configuration", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data: ConfigurationResponse = await response.json();
        
        // Cek berbagai kemungkinan struktur response untuk pixel ID
        const pixelId = 
          data?.data?.meta_pixel_id || 
          data?.data?.facebook_pixel_id || 
          data?.data?.pixel_id ||
          data?.meta_pixel_id || 
          data?.facebook_pixel_id || 
          data?.pixel_id;

        if (pixelId && pixelId.trim() !== "") {
          setMetaPixelId(pixelId);
        } else {
          // Gunakan dummy jika tidak ada pixel ID di response
          console.warn("Meta Pixel ID not found in API response, using fallback");
          setMetaPixelId(DUMMY_META_PIXEL_ID);
        }
      } catch (error) {
        // Gunakan dummy jika API error
        console.warn("Failed to fetch configuration, using fallback Meta Pixel ID:", error);
        setMetaPixelId(DUMMY_META_PIXEL_ID);
      } finally {
        setIsPixelReady(true);
      }
    };

    fetchConfiguration();
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
    </LanguageProvider>
  );
}
