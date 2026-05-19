import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NCRJobs",
  description: "NCR-first job portal connecting students, recruiters, and staff teams on one verified hiring workflow.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "NCRJobs",
    description: "NCR-first job portal connecting students, recruiters, and staff teams on one verified hiring workflow.",
    type: "website",
    images: [
      {
        url: "/logo-wordmark.svg",
        width: 1200,
        height: 630,
        alt: "NCRJobs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NCRJobs",
    description: "NCR-first job portal connecting students, recruiters, and staff teams on one verified hiring workflow.",
    images: ["/logo-wordmark.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
