import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/contexts";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Newcomers Canada Hub",
  description:
    "Your vibrant guide to settling in Canada - Find essential services, navigate with ease, and connect with resources tailored for newcomers.",
  keywords:
    "Canada, newcomers, immigration, services, map, resources, settlement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          defer
        ></script>
      </head>
      <body className={` antialiased`}>
        {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
