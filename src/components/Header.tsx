import React, { useState, useEffect } from "react";
import Image from "next/image";

import { t, SupportedLocale } from "../i18n";

interface HeaderProps {
  locale: SupportedLocale;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-16 w-40"> {/* Container for the logo */}
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo_bg.png`}
              alt="SynX Logo"
              fill
              sizes="160px"
              style={{ objectFit: "contain" }} // Maintain aspect ratio
              priority
            />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <a
              href="#case-studies"
              className="text-base text-gray-600 hover:text-primary font-medium transition-colors"
            >
              {t(locale, "header.caseStudies")}
            </a>
            <a
              href="#contact"
              className="text-base text-gray-600 hover:text-primary font-medium transition-colors"
            >
              {t(locale, "header.contact")}
            </a>
          </nav>
          <a href="#contact" className="bg-primary text-white hover:bg-tertiary font-medium transition-colors text-base rounded-full px-6 py-2">
            {t(locale, "header.cta")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
