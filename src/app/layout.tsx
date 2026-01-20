import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
        <div className="flex">
          <Sidebar />
          <main className="ml-72 flex-1 min-h-screen p-12 pt-10 pb-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
