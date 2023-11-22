import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./shared-components/root/Navbar";
import Footer from "./shared-components/root/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DirectED quiz app",
  description: "Designed for speed and fun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="80vh p-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
