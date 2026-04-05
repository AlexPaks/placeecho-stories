import React, { useState, useEffect, ReactNode } from 'react';

import { content } from '@/content';
import { Language } from '@/content/types';
import { LanguageContext } from '@/contexts/language-context';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const isRTL = language === 'he';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = content[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
