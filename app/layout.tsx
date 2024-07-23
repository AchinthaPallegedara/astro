import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const basuru = localFont({
  src: "./../fonts/FMBasuru x.ttf",
  variable: "--font-basuru",
});

export const metadata: Metadata = {
  title: "Astro",
  description: "Astro club post generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${basuru.variable}`}>
        <TopBar />
        <div className="px-5  flex w-full  items-center justify-center text-xl text-center sm:hidden">
          This app is not supported on mobile devices.
        </div>
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
