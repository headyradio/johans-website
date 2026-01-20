import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Johan Moreno | Blog",
  description: "Thoughts on life, technology, and building meaningful things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <div className="flex flex-col md:flex-row min-h-screen">
          <MobileHeader />
          <Sidebar />
          <main className="flex-1 min-h-screen p-6 pt-20 md:p-12 md:pt-10 md:ml-72 pb-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
