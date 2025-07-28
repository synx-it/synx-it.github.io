'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check localStorage first (ma solo se esiste davvero)
    const savedLocale = localStorage.getItem('user-locale');
    
    // Se c'è una preferenza salvata E coincide con la lingua del browser, usala
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'it')) {
      const browserLang = navigator.language?.toLowerCase();
      const browserMatches = savedLocale === 'it' 
        ? browserLang?.startsWith('it') 
        : browserLang?.startsWith('en');
      
      // Solo se il browser corrisponde ancora alla preferenza salvata
      if (browserMatches) {
        router.replace(`/${savedLocale}`);
        return;
      } else {
        // Se il browser è cambiato, rimuovi la vecchia preferenza
        localStorage.removeItem('user-locale');
      }
    }

    // Detect browser language - PRIORITÀ ALLA LINGUA PRINCIPALE
    let detectedLocale = 'en'; // default
    
    // Check primary language FIRST (più importante)
    const primaryLang = navigator.language?.toLowerCase();
    
    if (primaryLang?.startsWith('it')) {
      detectedLocale = 'it';
    } else if (primaryLang?.startsWith('en')) {
      detectedLocale = 'en';
    } else {
      // Solo se la lingua principale non è né inglese né italiano,
      // allora controlla le lingue secondarie
      const languages = navigator.languages || [];
      for (const lang of languages) {
        if (lang.toLowerCase().startsWith('it')) {
          detectedLocale = 'it';
          break;
        }
      }
    }

    // Save preference for next visit
    localStorage.setItem('user-locale', detectedLocale);
    
    // Immediate redirect
    router.replace(`/${detectedLocale}`);
  }, [router]);

  // Invisible loading (same background as site)
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      zIndex: 9999
    }} />
  );
}
