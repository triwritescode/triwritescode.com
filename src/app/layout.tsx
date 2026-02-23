import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tri Denda — Software Engineer & Technical Lead",
    template: "%s | Tri Denda",
  },
  description:
    "Personal portfolio of Tri Denda, a software engineer and technical lead based in Indonesia.",
  metadataBase: new URL("https://triwritescode.com"),
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
      </body>
    </html>
  );
}
