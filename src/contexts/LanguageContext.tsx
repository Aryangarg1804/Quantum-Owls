
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (englishText: string, hindiText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem('saheli-language');
    return (savedLanguage as Language) || 'en';
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Save language preference to localStorage when it changes
    localStorage.setItem('saheli-language', language);
    
    // Update the lang attribute on the HTML element for better accessibility
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => {
      const newLanguage = prevLanguage === 'en' ? 'hi' : 'en';
      
      toast({
        title: newLanguage === 'en' ? "Language Changed" : "भाषा बदली गई",
        description: newLanguage === 'en' ? "Switched to English" : "हिंदी में बदला गया",
      });
      
      return newLanguage;
    });
  };

  const translate = (englishText: string, hindiText: string): string => {
    return language === 'en' ? englishText : hindiText;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
