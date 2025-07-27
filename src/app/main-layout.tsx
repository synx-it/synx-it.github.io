"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SupportedLocale } from "@/i18n";

export default function MainLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: SupportedLocale;
}) {
  // Add smooth scrolling to HTML element
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="bg-white dark:bg-background">
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
