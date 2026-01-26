import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Solution Lending - Platform Pinjaman Digital Yang Dipercayai | Pinjaman Pantas & Mudah",
  description:
    "My Solution Lending adalah platform pinjaman digital yang dipercayai yang menawarkan pinjaman peribadi, perniagaan, KPR, dan KKB dengan proses pantas 24 jam, faedah kompetitif bermula dari 0.8% sebulan, dan perkhidmatan 24/7. Berlesen rasmi dan diawasi oleh pihak berkuasa.",
  keywords: [
    "pinjaman dalam talian",
    "pinjaman pantas",
    "pinjaman peribadi",
    "pinjaman perniagaan",
    "pinjaman KPR",
    "pinjaman KKB",
    "platform pinjaman",
    "pinjaman digital",
    "My Solution Lending",
    "pinjaman dipercayai",
    "pinjaman berlesen",
    "pinjaman faedah rendah",
    "pinjaman 24 jam",
    "pinjaman Malaysia",
    "pinjaman online Malaysia",
    "platform pinjaman Malaysia",
  ],
  authors: [{ name: "My Solution Lending" }],
  creator: "My Solution Lending",
  publisher: "My Solution Lending",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mysolutionlending.com"),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/id",
      "en-US": "/en",
      "ms-MY": "/ms",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    title: "My Solution Lending - Platform Pinjaman Digital Yang Dipercayai",
    description:
      "Platform pinjaman digital yang dipercayai dengan proses pantas 24 jam, faedah kompetitif, dan perkhidmatan 24/7. Berlesen rasmi dan diawasi oleh pihak berkuasa.",
    url: "https://mysolutionlending.com",
    siteName: "My Solution Lending",
    images: [
      {
        url: "/logo-msl.webp",
        width: 1200,
        height: 630,
        alt: "My Solution Lending - Platform Pinjaman Digital Yang Dipercayai",
      },
    ],
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Solution Lending - Platform Pinjaman Digital Yang Dipercayai",
    description:
      "Platform pinjaman digital yang dipercayai dengan proses pantas 24 jam, faedah kompetitif, dan perkhidmatan 24/7.",
    images: ["/logo-msl.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    // Tambahkan verification codes jika ada
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
