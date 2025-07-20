import type { Metadata } from "next";
import Head from 'next/head'
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import AOSProvider from "@/components/providers/AOSProvider";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@/app/utilities.css";
import "@/app/homepage.css";
import "@/app/complete-checkout.css";
import "@/app/sign-in.css";
import "@/app/sign-up.css";
import "@/app/404-not-found.css";
import "@/app/transactions.css";
import "@/app/transactions-detail.css";
import "@/app/edit-profile.css";
import "@/app/navbar-log-in.css";
import "@/app/sidebar.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LouBiShop",
  description: "Made by Alia",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/icon/favicon.ico"/>
      </Head>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <AOSProvider>
            <Toaster/>
            <CheckoutProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </CheckoutProvider>
          </AOSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}