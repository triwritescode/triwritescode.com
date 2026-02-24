import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

import config from "@/config/config.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.base_url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen bg-primary font-sans text-white antialiased`}
      >
        {children}
        <VercelAnalytics />
        <VercelSpeedInsights />
      </body>
    </html>
  );
}
