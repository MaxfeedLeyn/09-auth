'use client'
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from '@/components/Footer/Footer';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      {children}
    </>
  );
}