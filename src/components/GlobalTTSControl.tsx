import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTTS } from '@/contexts/TTSContext';
import { isSpeaking, speak } from '@/lib/tts';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GlobalTTSControl() {
  const { speakAll, cancel } = useTTS();
  const { language } = useLanguage();
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setSpeaking(isSpeaking()), 300);
    return () => clearInterval(i);
  }, []);

  const speakFallback = () => {
    // Fallback: read visible text from the page
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      (node) => {
        const text = node.textContent?.trim() || '';
        if (!text) return NodeFilter.FILTER_REJECT;
        const parent = (node as any).parentElement as HTMLElement | null;
        if (!parent) return NodeFilter.FILTER_SKIP;
        const style = window.getComputedStyle(parent);
        if (style.display === 'none' || style.visibility === 'hidden') return NodeFilter.FILTER_SKIP;
        // skip nav/footers repetitive and controls
        if (parent.closest('nav, footer, button, a, [aria-hidden="true"], [role="img"]')) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    );
    const texts: string[] = [];
    while (walker.nextNode()) {
      const t = walker.currentNode.textContent || '';
      if (t) texts.push(t.replace(/\s+/g, ' ').trim());
    }
    const combined = Array.from(new Set(texts)).join('. ');
    if (combined) speak(combined, language === 'hi' ? 'hi' : 'en');
  };

  const onClick = () => {
    if (speaking) return cancel();
    // Try registered entries first; if nothing queued, fallback to visible text
    speakAll();
    setTimeout(() => {
      if (!isSpeaking()) speakFallback();
    }, 250);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        onClick={onClick}
        className="rounded-full px-3 py-3 shadow-lg bg-gradient-to-r from-saheli-purple to-saheli-pink"
        title={speaking ? 'Stop reading' : 'Read this page'}
      >
        {speaking ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
      </Button>
    </div>
  );
}
