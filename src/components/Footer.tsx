import React from 'react';
import type { SupportedLocale } from '../i18n';
import { t } from '../i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' }
];

interface FooterProps {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const Footer: React.FC<FooterProps> = ({ locale, setLocale }) => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-500 text-center sm:text-left">
          &copy; {new Date().getFullYear()} SynX. {t(locale, 'footer.rights')}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-500" />
          <Select onValueChange={(value) => setLocale(value as SupportedLocale)} defaultValue={locale}>
            <SelectTrigger className="w-[120px] border-gray-300">
              <SelectValue placeholder={t(locale, 'footer.selectLanguage')} />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
