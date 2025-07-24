"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { SupportedLocale } from '@/i18n';

export default function HomePage() {
  const [locale, setLocale] = useState<SupportedLocale>('en');

  return (
    <div className="bg-white dark:bg-background">
      <Header locale={locale} />
      <main id="main-content">
        <Hero locale={locale} />
        <CaseStudies locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} setLocale={setLocale} />
    </div>
  );
}
