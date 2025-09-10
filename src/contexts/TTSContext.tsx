import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { cancel, isSpeaking, speak, TTSLang } from '@/lib/tts';
import { useLanguage } from './LanguageContext';

type Entry = { id: string; en: string; hi: string };

type TTSContextType = {
  register: (entry: Omit<Entry, 'id'>) => string;
  unregister: (id: string) => void;
  speakAll: () => void;
  cancel: () => void;
};

const Ctx = createContext<TTSContextType | null>(null);

let nextId = 1;

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const entriesRef = useRef<Map<string, Entry>>(new Map());
  const { language } = useLanguage();

  const register = useCallback((entry: Omit<Entry,'id'>) => {
    const id = String(nextId++);
    entriesRef.current.set(id, { id, ...entry });
    return id;
  }, []);

  const unregister = useCallback((id: string) => {
    entriesRef.current.delete(id);
  }, []);

  const speakAll = useCallback(() => {
    const lang: TTSLang = language === 'hi' ? 'hi' : 'en';
    // Concatenate texts in registration order
    const text = Array.from(entriesRef.current.values())
      .map(e => (lang === 'hi' ? e.hi : e.en))
      .join('. ');
    if (text.trim().length) speak(text, lang);
  }, [language]);

  const value = useMemo(() => ({ register, unregister, speakAll, cancel }), [register, unregister, speakAll]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useTTS = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTTS must be used within TTSProvider');
  return ctx;
};
