import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "./components/shared/notify/notify-context";
import HeaderContainer from "./components/shared/header-components/headerContainer";
import { Suspense } from "react";
import LoadingApp from "./components/shared/loading/loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  // اگر بعداً خواستی از API بگیری، اینجا بگیر
  // const res = await fetch("https://your-api.com/metadata");
  // const data = await res.json();

  const title = "همراه هوشمند کسب‌و‌کار آنلاین شما |  فرداد سیستم مهام";
  const description = `به سایت ما خوش اومدید!
جایی که مشکلات وردپرس، پرستاشاپ، گزارش‌گیری و تعامل با مشتری، دیگه مشکل نیست!
با ابزارهای هوشمند، پشتیبانی حرفه‌ای و خدمات اختصاصی، رشد آنلاین فروشگاهتون رو با ما تجربه کنید.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const image = `${siteUrl}/images/logo-fav.webp`;

  return {
    title,
    description,
    keywords: [
      "وردپرس",
      "پرستاشاپ",
      "پشتیبانی سایت",
      "تحلیل و گزارش‌گیری",
      "وفاداری مشتری",
      "اتوماسیون فروشگاه",
      "ابزار رشد دیجیتال",
    ],
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "فرداد سیستم مهام",
      type: "website",
      locale: "fa_IR",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: " فرداد سیستم مهام",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    authors: [{ name: "تیم فنی  فرداد سیستم مهام", url: siteUrl }],
    icons: {
      icon: "/images/meta-images/favicon.ico",
      shortcut: "/images/meta-images/favicon-32x32.png",
      apple: "/images/meta-images/apple-touch-icon.png",
    },
  };
}

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
        <Suspense fallback={<LoadingApp />}>
          <NotificationProvider>
            <HeaderContainer />
            {children}
          </NotificationProvider>
        </Suspense>
      </body>
    </html>
  );
}
