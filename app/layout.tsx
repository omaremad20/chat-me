import { UserContextProvider } from "@/app/_providers/user/UserContextProvider";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import MainLayout from "./_components/ui/mainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 antialiased body-style`}
      >

        <UserContextProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </UserContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
