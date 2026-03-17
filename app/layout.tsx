import type { Metadata } from "next";
import "../styles/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Inter } from 'next/font/google';
import Header from "@/components/Header/Header";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className={'grid grid-cols-[auto_1fr]'}>
          <Sidebar />
          <div className={'flex flex-col h-screen'}>
            <Header />
            <div className={'flex-1 overflow-hidden'}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
