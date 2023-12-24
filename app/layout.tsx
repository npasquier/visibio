import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fermes bio en France",
  description: "Carte des fermes bio en France",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/farm.svg" />
      </head>
      <body className={inter.className}>
        <header className=" flex bg-green-800 text-gray-50 p-2 gap-3 align-middle shadow-lg rounded-b-full">
          <Link href="/" className="flex gap-4 mx-auto">
            <Image src="/farm.svg" alt="farm" width={40} height={40} />
            <h1 className="text-xl font-bold my-auto">VisiBio</h1>
          </Link>
        </header>
        <div className="flex flex-col min-h-screen">{children}</div>
        <footer className="bg-gray-200 text-center p-4">
          <p>© 2023 Bio Farm Analytics</p>
        </footer>
      </body>
    </html>
  );
}
