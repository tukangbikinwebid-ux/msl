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
  title: "My Solution Lending - Platform Pinjaman Digital Terpercaya | Pinjaman Cepat & Mudah",
  description:
    "My Solution Lending adalah platform pinjaman digital terpercaya yang menawarkan pinjaman personal, usaha, KPR, dan KKB dengan proses cepat 24 jam, bunga kompetitif mulai dari 0.8% per bulan, dan layanan 24/7. Berlisensi resmi dan diawasi oleh OJK.",
  keywords: [
    "pinjaman online",
    "pinjaman cepat",
    "pinjaman personal",
    "pinjaman usaha",
    "pinjaman KPR",
    "pinjaman KKB",
    "platform pinjaman",
    "pinjaman digital",
    "My Solution Lending",
    "pinjaman terpercaya",
    "pinjaman berlisensi",
    "pinjaman bunga rendah",
    "pinjaman 24 jam",
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
    title: "My Solution Lending - Platform Pinjaman Digital Terpercaya",
    description:
      "Platform pinjaman digital terpercaya dengan proses cepat 24 jam, bunga kompetitif, dan layanan 24/7. Berlisensi resmi dan diawasi oleh OJK.",
    url: "https://mysolutionlending.com",
    siteName: "My Solution Lending",
    images: [
      {
        url: "/logo-msl.webp",
        width: 1200,
        height: 630,
        alt: "My Solution Lending - Platform Pinjaman Digital Terpercaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Solution Lending - Platform Pinjaman Digital Terpercaya",
    description:
      "Platform pinjaman digital terpercaya dengan proses cepat 24 jam, bunga kompetitif, dan layanan 24/7.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
