"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { SupportedLocale } from '../i18n';
import { t } from '../i18n';

import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' }
];

interface FooterProps {
  locale: SupportedLocale;
}

const Footer: React.FC<FooterProps> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Get the current path without the locale and hash
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(/|$)`), '/');
    const [pathWithoutHash, hash = ''] = pathWithoutLocale.split('#');
    
    // Construct the new URL with the new locale and preserve the hash if it exists
    let newPath = pathWithoutHash === '/' ? '' : pathWithoutHash;
    if (hash) {
      newPath = `${newPath}#${hash}`;
    }
    
    // Use replace instead of push to prevent adding a new history entry
    router.replace(`/${newLocale}${newPath}`);
  };
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-500 text-center sm:text-left">
          &copy; {new Date().getFullYear()} SynX. {t(locale, 'footer.rights')}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            className="w-[120px] bg-white border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
