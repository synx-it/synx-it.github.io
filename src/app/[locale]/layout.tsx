"use client";

import React, { useEffect } from "react";
import Providers from '../providers';
import MainLayout from '../main-layout';
import { SupportedLocale } from "@/i18n";

// Type for the params prop
interface WebsiteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: SupportedLocale }>;
}

export default function WebsiteLayout({
  children,
  params,
}: WebsiteLayoutProps) {
  // Use React.use() to unwrap the params Promise as recommended by Next.js
  const { locale } = React.use(params as Promise<{ locale: SupportedLocale }>);

  // Set the lang attribute on the html element using a side effect
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <Providers>
      <MainLayout locale={locale}>{children}</MainLayout>
    </Providers>
  );
}
