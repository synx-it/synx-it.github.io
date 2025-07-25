'use client';

import React, { useEffect } from 'react';
import Providers from "../../providers";
import MainLayout from "../../main-layout";
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
  // Use React.use() to unwrap the params Promise
  const { locale } = React.use<{ locale: SupportedLocale }>(params);
  
  // Handle hash-based navigation and set language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Set the language
      document.documentElement.lang = locale;
      
      // Handle hash-based navigation
      const handleHashChange = () => {
        const { hash } = window.location;
        if (hash) {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            // Use setTimeout to ensure the DOM is fully rendered
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 0);
          }
        }
      };

      // Initial check for hash
      if (window.location.hash) {
        handleHashChange();
      }

      // Add event listener for hash changes
      window.addEventListener('hashchange', handleHashChange, false);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [locale]);

  return (
    <Providers>
      <MainLayout locale={locale}>
        {children}
      </MainLayout>
    </Providers>
  );
}
