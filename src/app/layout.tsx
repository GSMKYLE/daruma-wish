import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daruma Wish",
  description: "Your pocket companion for healing, hope, and little moments of magic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${nunito.variable} ${quicksand.variable} font-sans antialiased w-full min-h-screen overflow-x-hidden`}>
        <div id="app-root" className="w-full max-w-[480px] mx-auto min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
